import {
  AssistantEntry,
  KnowledgeVaultEntry,
} from "../services/mongodb/schema";
import {
  AssistantQueryInput,
  Assistant as Assistanttype,
  ObjectId,
} from "../types/common/organization";
import { SessionCache } from "./manage-session-cache";
import { VectorStore } from "./vector_store";

export class Assistant {
  protected email: string;
  constructor(email: string) {
    this.email = email;
  }

  createAssistant = async (assistantData: Assistanttype) => {
    if (assistantData.knowledgeVault.length) {
      const allExist = await KnowledgeVaultEntry.countDocuments({
        _id: { $in: assistantData.knowledgeVault },
      });
      if (allExist !== assistantData.knowledgeVault.length)
        throw new Error("one or more knowledgeVault does not exist");
    }
    const { getSessionCache } = new SessionCache(this.email);
    const { organizationProfileId } = await getSessionCache();
    const assistant = await AssistantEntry.create({
      ...assistantData,
      organization: organizationProfileId,
    });
    return assistant;
  };

  updateAssistant = async (assistantData: Assistanttype & { _id: string }) => {
    if (assistantData.knowledgeVault.length) {
      const allExist = await KnowledgeVaultEntry.countDocuments({
        _id: { $in: assistantData.knowledgeVault },
      });
      if (allExist !== assistantData.knowledgeVault.length)
        throw new Error("one or more knowledgeVault does not exist");
    }
    return await AssistantEntry.findByIdAndUpdate(
      assistantData._id,
      {
        $set: { ...assistantData },
      },
      { new: true }
    );
  };

  removeAssistant = async (assistantId: ObjectId) => {
    return await AssistantEntry.findByIdAndDelete(assistantId);
  };

  assistantQuery = async ({ _id, queryText }: AssistantQueryInput) => {
    const assistantDoc = await AssistantEntry.findById(_id) as Assistanttype;
    if (!assistantDoc) throw new Error("assistant does not exist");

    const { queryVectorStore } = new VectorStore(this.email);
    const filters = {
        knowledgeVault: assistantDoc.knowledgeVault,
    }
    return await queryVectorStore(queryText, filters);
  };
}
