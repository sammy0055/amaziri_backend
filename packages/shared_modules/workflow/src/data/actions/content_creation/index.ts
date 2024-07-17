import { Action, ActionNames } from "../../../types";

const ContentSuggestion: Action<ActionNames.Content_Generation> = {
  actionName: ActionNames.Content_Generation,
  description: "Use AI to recommend content topics based on industry trends",
  actionType: "ASSISTANTS",
  category: "Content Creation and Curation",
  stepOrder: 0,
  actionParameters: {
    input: [],
    assistantId: "",
    contentType: "text",
    prompt: "",
  },
};

const ContentGeneration: Action<ActionNames.Content_Generation> = {
  actionName: ActionNames.Content_Generation,
  description: "Use AI to create engaging posts",
  actionType: "ASSISTANTS",
  category: "Content Creation and Curation",
  stepOrder: 0,
  actionParameters: {
    assistantId: "",
    contentType: "text",
    input: [],
    prompt: "",
  },
};

const ContentApproval: Action<ActionNames.Content_Approval> = {
  actionName: ActionNames.Content_Approval,
  description: "Route created content for review and approval",
  actionType: "TOOLING",
  category: "Content Creation and Curation",
  stepOrder: 0,
  actionParameters: {
    approvers: [],
    contentType: "text",
    input: "",
    notificationChannel: "email",
  },
};

export const actions = [ContentApproval, ContentGeneration, ContentSuggestion];
