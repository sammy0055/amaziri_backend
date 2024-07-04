import { ManageS3Storage } from "../../services/aws/simple-storage";
import {
  Assistant,
  Document,
  DocumentQueryInput,
  InputDocumentData,
  ObjectId,
} from "../../types/common/organization";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { ChatOpenAI, OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DocumentEntry } from "../../services/mongodb/schema";
import { getEnv } from "../getEnv";
import { KnowledgeVault } from "../manage-knowledge-vault";

import { loadQAMapReduceChain, RetrievalQAChain } from "langchain/chains";

const namespace = "test.vectorestore";
const [dbName, collectionName] = namespace.split(".");

export class VectorStore {
  protected userEmail: string;
  protected profileId: string;
  constructor(userEmail: string) {
    this.userEmail = userEmail;
  }

  addDocument = async ({ fileName, knowledgeVault }: InputDocumentData) => {
    const { addDocument } = new KnowledgeVault(this.userEmail);
    const { newFileName, _id, updateAt, createdAt } = await addDocument({
      fileName,
      knowledgeVault,
    });
    const { createPresignedUrl } = new ManageS3Storage();
    const url = await createPresignedUrl(newFileName, String(_id));
    return {
      _id,
      uploadUrl: url,
      knowledgeVault: knowledgeVault,
      originalFileName: fileName,
      newFileName: newFileName,
      updateAt,
      createdAt,
    };
  };

  removeDocumentFromVectoreStore = async (
    _id: string,
    type: "document" | "knowledgeVault"
  ) => {
    let filter = {};
    if (type === "document") filter = { document: _id };
    else if (type === "knowledgeVault") filter = { knowledgeVault: _id };
    else throw new Error(`_id "${_id}" is not recognised`);
    const client = new MongoClient(getEnv("MONGO_URI") || "");
    await client.db(dbName).collection(collectionName).deleteMany(filter);
  };

  getDocumentFromS3 = async ({
    fileName,
  }: Pick<InputDocumentData, "fileName">) => {
    const { downloadPresignedUrl } = new ManageS3Storage();
    const downloadUrl = await downloadPresignedUrl(fileName);
    const res = await fetch(downloadUrl);
    if (!res.ok)
      throw {
        code: "bucket-download-error",
        message: "error occured while downloading file from s3",
      };

    const file = await res.blob();
    const loader = new WebPDFLoader(file);
    const docs = await loader.load();

    return docs;
  };

  embeddingInstance = (model: string, dimensions: number) => {
    return new OpenAIEmbeddings({ model, dimensions });
  };

  chatModelInstance = (
    model = "gpt-3.5-turbo-1106",
    temperature = 0,
    provider = "OpenAI"
  ) => {
    if (provider === "OpenAI") return new ChatOpenAI({ temperature, model });
  };
  createEmbeddings = async (document: DocumentQueryInput) => {
    const file = (await DocumentEntry.findById(document._id)) as Document & {
      _id: string;
    };

    if (!file) throw new Error("document does not exist");
    const embeddings = this.embeddingInstance("text-embedding-3-large", 1024);
    const chunkSize = 1000;
    const chunkOverlap = 150;
    const recursive_spliter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });

    const client = new MongoClient(getEnv("MONGO_URI") || "");
    const collection = client.db(dbName).collection(collectionName);

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection,
      indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
      textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
      embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    });

    const docs = await this.getDocumentFromS3(document);
    const splited = await recursive_spliter.splitDocuments(docs);
    const enrichedDocs = splited.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        document: file._id,
        knowledgeVault: file.knowledgeVault,
      },
    }));

    await vectorStore.addDocuments(enrichedDocs);
  };

  queryVectorStore = async (
    queryText: string,
    filter: { knowledgeVault: ObjectId[] }
  ) => {
    const client = new MongoClient(getEnv("MONGO_URI") || "");
    const collection = client.db(dbName).collection(collectionName);
    const chatModel = this.chatModelInstance();
    const embeddings = this.embeddingInstance("text-embedding-3-large", 1024);
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection,
      indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
      textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
      embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    });
    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAMapReduceChain(chatModel),
      retriever: vectorStore.asRetriever({
        filter,
        searchType: "mmr",
        searchKwargs: {
          fetchK: 3,
          lambda: 0,
        },
      }),
    });
    const res = await chain.invoke({
      query: queryText,
    });

    await client.close();
    return res;
  };
}
