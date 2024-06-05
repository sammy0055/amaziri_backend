
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
  steps: Action<ActionNamesUnion>[];
}

// Step model
export interface Action<T extends ActionNamesUnion> {
  actionName: T;
  stepOrder: number;
  category: ActioCategoryUnion;
  actionType: ActionTypeUnion;
  actionParameters: ActionParametersType[ActionNamesUnion]; // Use appropriate types or interfaces for action parameters
}

type ActionTypeUnion = `${ActionType}`;
type ActionNamesUnion = `${ActionNames}`;
type ActioCategoryUnion = `${ActioCategory}`

export enum ActionType {
  Trigger = "trigger",
  WHATSAPP_MANAGER = "WHATSAPP_MANAGER",
}

export enum ActioCategory {
  GENERAL = "GENERAL",
  INTEGRATIONS = "INTEGRATIONS",
}

export enum ActionNames {
  // AMAZIRI_ASSISSTANT = "AMAZIRI_ASSISSTANT",
  SEND_MESSAGES = "SEND_WHATSAPP_MESSAGES",
}

interface SendMessagesParams {
  whatsappPhoneNumberId: string;
  whatsappBusinessId: string;
  messages: string[];
}

export type ActionParametersType = {
  [ActionNames.SEND_MESSAGES]: SendMessagesParams;
};

export type WorkflowActionMethods = {
  SendWhatSappMessage: (parameters: any) => WorkflowActionType;
};

interface WorkflowActionType {
  validateParameters: () => boolean;
  execute: (data: any) => Promise<any>;
}
