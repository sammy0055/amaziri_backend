import path from "path";
import { DocumentEntry, KnowledgeVaultEntry } from "../services/mongodb/schema";
import {
  Document,
  InputDocumentData,
  KnowledgeVault as KnowledgeVaultType,
} from "../types/common/organization";
import { SessionCache } from "./manage-session-cache";
import { v4 as uuid } from "uuid";

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

  removeKnowledgeVault = async (vaultId: string) => {
    const doc = (await KnowledgeVaultEntry.findById(vaultId)
      .populate("documents")
      .exec()) as KnowledgeVaultType;
    await KnowledgeVaultEntry.findByIdAndDelete(vaultId);
    await DocumentEntry.deleteMany({ _id: { $in: doc.documents } });
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

    return document as Document & { _id: string };
  };

  getDocument = async (documentId: string) => {
    return await DocumentEntry.findById(documentId).lean();
  };

  removeDocumentFromMongoDB = async (documentId: string) => {
    return await DocumentEntry.findByIdAndDelete(documentId).exec();
  };
}
