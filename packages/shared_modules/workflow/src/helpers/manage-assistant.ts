import { AssistantEntry } from "amazir_data_model";
import { VectorStore } from "./manage-vectoreStore";
export class AssistantManager {
  assistantQuery = async ({ _id, prompt }: { _id: string; prompt: string }) => {
    const assistantDoc = await AssistantEntry.findById(_id);
    if (!assistantDoc) throw new Error("assistant does not exist");

    const { queryVectorStore } = new VectorStore();
    const filters = {
      knowledgeVault: assistantDoc.knowledgeVault,
    };
    return await queryVectorStore(prompt, filters);
  };
}
