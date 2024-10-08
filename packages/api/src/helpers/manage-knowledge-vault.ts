import path from "path";
import {
  AssistantEntry,
  DocumentEntry,
  KnowledgeVaultEntry,
} from "../services/mongodb/schema";
import {
  Document,
  InputDocumentData,
  KnowledgeVault as KnowledgeVaultType,
  ObjectId,
} from "../types/common/organization";
import { SessionCache } from "./manage-session-cache";
import { v4 as uuid } from "uuid";
import { VectorStore } from "./vector_store";
import { ManageS3Storage } from "../services/aws/simple-storage";

export class KnowledgeVault {
  protected userEmail: string;
  constructor(userEmail: string) {
    this.userEmail = userEmail;
  }

  createKnowledgeVault = async ({ name }: Pick<KnowledgeVaultType, "name">) => {
    const { getSessionCache } = new SessionCache(this.userEmail);
    const { organizationProfileId } = await getSessionCache();
    const data = {
      name,
      organization: organizationProfileId,
    };
    return await KnowledgeVaultEntry.create(data);
  };

  updateKnowledgeVault = async (data: { _id: string; name: string }) => {
    return await KnowledgeVaultEntry.findByIdAndUpdate(
      data._id,
      {
        $set: { ...data },
      },
      { new: true }
    );
  };

  removeKnowledgeVault = async (vaultId: string) => {
    const { removeDocumentFromVectoreStore } = new VectorStore(this.userEmail);
    const { deleteObjects } = new ManageS3Storage();

    const doc = (await KnowledgeVaultEntry.findById(vaultId)
      .populate("documents")
      .exec()) as KnowledgeVaultType;

    if (!doc) throw new Error("knowledgebase does not exist");
    await AssistantEntry.updateMany(
      { knowledgeVault: vaultId },
      {
        $pull: { knowledgeVault: vaultId },
      }
    );

    await removeDocumentFromVectoreStore(vaultId, "knowledgeVault");
    await DocumentEntry.deleteMany({ _id: { $in: doc.documents } });
    await KnowledgeVaultEntry.findByIdAndDelete(vaultId);

    // remove from s3
    const _doc = doc;
    if (!Array.isArray(_doc.documents)) throw new Error("no document");
    if (_doc?.documents?.length !== 0) {
      const keys = _doc.documents.map((item) => item.newFileName);
      await deleteObjects(keys);
    }

    return doc as KnowledgeVaultType & { _id: string };
  };

  getVault = async (vaultId: string) => {
    return await KnowledgeVaultEntry.findById(vaultId).lean();
  };

  getVaults = async () => {
    const { getSessionCache } = new SessionCache(this.userEmail);
    const { organizationProfileId } = await getSessionCache();
    return await KnowledgeVaultEntry.find({
      organization: organizationProfileId,
    }).lean();
  };

  addDocument = async ({ fileName, knowledgeVault }: InputDocumentData) => {
    const vault = await KnowledgeVaultEntry.findById(knowledgeVault);
    if (!vault) throw new Error("knowledgeVault does not exist");
    const extension = path.extname(fileName);
    const newFileName = `${uuid()}${extension}`;
    const { getSessionCache } = new SessionCache(this.userEmail);
    const data = await getSessionCache();
    const document = await DocumentEntry.create({
      organization: data.organizationProfileId,
      knowledgeVault: knowledgeVault,
      originalFileName: fileName,
      newFileName: newFileName,
    });

    await KnowledgeVaultEntry.findByIdAndUpdate(knowledgeVault, {
      $push: { documents: document._id },
    });

    return document as Document & { _id: ObjectId };
  };

  getDocument = async (documentId: string) => {
    return await DocumentEntry.findById(documentId).lean();
  };

  removeDocumentFromMongoDB = async (documentId: string) => {
    return await DocumentEntry.findByIdAndDelete(documentId).exec();
  };
}
