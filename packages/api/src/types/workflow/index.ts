import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId;

// User model
export interface User {
  userId: string;
  username: string;
  email: string;
  passwordHash: string;
}

// Workflow model
export interface Workflow {
  workflowId: string;
  organization: string;
  workflowName: string;
  createdAt: Date;
  updatedAt: Date;
  steps: Action<ActionNamesUnion>[];
}

// Step model
export interface Action<T extends ActionNamesUnion> {
  actionId: string;
  actionName: T;
  stepOrder: number;
  category: string;
  actionType: ActionTypeUnion;
  actionParameters: ActionParametersType[ActionNamesUnion]; // Use appropriate types or interfaces for action parameters
}

type ActionTypeUnion = `${ActionType}`;
type ActionNamesUnion = `${ActionNames}`;

export enum ActionType {
  Trigger = "trigger",
  WHATSAPP_MANAGER = "WHATSAPP_MANAGER",
}

export enum ActionNames {
  GET_UNREAD_MESSAGES = "GET_UNREAD_MESSAGES",
  SEND_MESSAGES = "SEND_MESSAGES",
}

export interface GetUnreadMessagesParams {
  whatsappPhoneNumberId: string;
  whatsappBusinessId: string;
}

interface SendMessagesParams {
  whatsappPhoneNumberId: string;
  whatsappBusinessId: string;
  messages: {}[];
}

export type ActionParametersType = {
  [ActionNames.GET_UNREAD_MESSAGES]: GetUnreadMessagesParams;
  [ActionNames.SEND_MESSAGES]: SendMessagesParams;
};
