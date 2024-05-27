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
  steps: Action[];
}

// Step model
export interface Action {
  actionId: string;
  actionName: string;
  stepOrder: number;
  category: string;
  actionType: ActionType;
  actionParameters: any; // Use appropriate types or interfaces for action parameters
}

export enum ActionType {
  Trigger = "trigger",
  Integration = "integration",
  Monitor = "monitor",
  Response = "response",
  addXAccount = "addxaccount",
}
