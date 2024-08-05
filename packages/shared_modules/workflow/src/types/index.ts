import {
  ContentApprovalParams,
  ContentGenerationParams,
  ContentSuggestionParams,
  SubmitedContentType,
} from "./content_creation";

export {
  ContentApprovalParams,
  ContentGenerationParams,
  ContentSuggestionParams,
  SubmitedContentType,
};

// User model
export interface User {
  userId: string;
  username: string;
  email: string;
  passwordHash: string;
}

export interface WorkflowData {
  organization: any;
  _id: string;
}

// Workflow model
export interface Workflow {
  organization: any;
  workflowName: string;
  createdAt: Date;
  updatedAt: Date;
  steps: {
    nodes: ActionNode[];
    edges: ActionEdge[];
  };
}

// ActionNode
export interface ActionNode {
  id: string;
  type?: string;
  measured?: { width?: number; height?: number };
  position: { x: number; y: number };
  data: Action<keyof ActionParametersType>;
}

//ActionEdge
export interface ActionEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

// Step model
export interface Action<T extends keyof ActionParametersType> {
  actionName: T;
  description: string;
  trigger?: boolean;
  isInputRequired: boolean;
  result?: any;
  category: ActioCategoryUnion;
  actionType: ActionTypeUnion;
  actionParameters: ActionParametersType[T]; // Use appropriate types or interfaces for action parameters
}

export interface ReactFlowTypes {
  id: string;
  type?: string;
  measured?: { width: number; height: number };
  position: { x: number; y: number };
  data: Action<any>;
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
  TOOLING = "TOOLING",
}

export enum ActionCategory {
  GENERAL = "GENERAL",
  INTEGRATIONS = "INTEGRATIONS",
  Content_Creation_and_Curation = "Content Creation and Curation",
  Campaign_Planning = "Campaign Planning",
  Scheduling_and_Publishing = "Scheduling and Publishing",
  Engagement_and_Interaction = "Engagement and Interaction",
  Analytics_and_Reporting = "Analytics and Reporting",
}

export enum ActionNames {
  SEND_MESSAGES = "SEND_WHATSAPP_MESSAGES",
  GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT = "GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT",
  Content_Suggestion = "Content Suggestion",
  Content_Generation = "Content Generation",
  Content_Approval = "Content Approval",
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
  [ActionNames.Content_Suggestion]: ContentSuggestionParams;
  [ActionNames.Content_Generation]: ContentGenerationParams;
  [ActionNames.Content_Approval]: ContentApprovalParams;
};

export type WorkflowActionMethods = {
  SendWhatSappMessage: (parameters: any) => WorkflowActionType;
};

interface WorkflowActionType {
  validateParameters: () => boolean;
  execute: (data: any) => Promise<any>;
}
