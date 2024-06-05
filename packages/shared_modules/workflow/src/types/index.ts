// User model
export interface User {
  userId: string;
  username: string;
  email: string;
  passwordHash: string;
}

// Workflow model
export interface Workflow {
  organization: any;
  workflowName: string;
  createdAt: Date;
  updatedAt: Date;
  steps: Action<keyof ActionParametersType>[];
}

// Step model
export interface Action<T extends keyof ActionParametersType> {
  actionName: T;
  stepOrder: number;
  category: ActioCategoryUnion;
  actionType: ActionTypeUnion;
  actionParameters: ActionParametersType[T]; // Use appropriate types or interfaces for action parameters
}

type ActionTypeUnion = `${ActionType}`;
type ActioCategoryUnion = `${ActionCategory}`;

export enum ActionType {
  TRIGGER = "TRIGGER",
  WHATSAPP_MANAGER = "WHATSAPP_MANAGER",
  ACTIONS = "ACTIONS",
  DATA = "DATA",
  ASSISTANTS = "ASSISTANTS",
  AI = "AI",
}

export enum ActionCategory {
  GENERAL = "GENERAL",
  INTEGRATIONS = "INTEGRATIONS",
}

export enum ActionNames {
  SEND_MESSAGES = "SEND_WHATSAPP_MESSAGES",
  GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT = "GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT",
}

interface SendMessagesParams {
  whatsappPhoneNumberId: string;
  whatsappBusinessId: string;
  messages: string[];
}

interface KnowledgeBaseAssitantParams {
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  assistantId: string;
}

export type ActionParametersType = {
  [ActionNames.SEND_MESSAGES]: SendMessagesParams;
  [ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT]: KnowledgeBaseAssitantParams;
};

export type WorkflowActionMethods = {
  SendWhatSappMessage: (parameters: any) => WorkflowActionType;
};

interface WorkflowActionType {
  validateParameters: () => boolean;
  execute: (data: any) => Promise<any>;
}
