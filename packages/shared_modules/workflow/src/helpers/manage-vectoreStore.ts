import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MongoClient, ObjectId } from "mongodb";
import { loadQAMapReduceChain, RetrievalQAChain } from "langchain/chains";

const getEnv = (name: string) => process.env[name];
const namespace = "test.vectorestore";
const [dbName, collectionName] = namespace.split(".");
export class VectorStore {
  embeddingInstance = (
    model: string,
    dimensions: number,
    provider = "OpenAI"
  ) => {
    if (provider === "OpenAI")
      return new OpenAIEmbeddings({ model, dimensions });
  };

  chatModelInstance = (
    model = "gpt-3.5-turbo-1106",
    temperature = 0,
    provider = "OpenAI"
  ) => {
    if (provider === "OpenAI") return new ChatOpenAI({ temperature, model });
  };

  queryVectorStore = async (
    queryText: string,
    filter: { knowledgeVault: ObjectId[] }
  ) => {
    const client = new MongoClient(getEnv("MONGO_URI") || "");
    const collection = client.db(dbName).collection(collectionName);
    const chatModel = this.chatModelInstance();
    const embeddings = this.embeddingInstance("text-embedding-3-large", 1024);
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings!, {
      collection,
      indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
      textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
      embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    });
    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAMapReduceChain(chatModel!),
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
