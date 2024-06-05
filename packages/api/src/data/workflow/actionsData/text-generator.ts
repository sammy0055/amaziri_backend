import { Action, ActionNames } from "amaziri_workflow";

export const generateTextWithKnowledgeBaseAssistantData: Action<ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT> =
  {
    actionName: ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT,
    stepOrder: 0,
    category: "GENERAL",
    actionType: "AI",
    actionParameters: {
      systemPrompt: "",
      userPrompt: "",
      temperature: 1,
      assistantId: "",
    },
  };
