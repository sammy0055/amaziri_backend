import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId;

export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
}

export interface OrganizationProfile {
  name: string;
  description: string;
}

export interface Organization extends OrganizationProfile {
  creator: ObjectId;
  knowledgeVaults: ObjectId[];
  xaccount: ObjectId;
}

export interface Files {
  originalFileName: string;
  newFileName: string;
}

export interface KnowledgeVault {
  name: string;
  documents: ObjectId | Document[];
  organization: ObjectId;
}

export interface Document {
  organization: ObjectId;
  knowledgeVault: ObjectId;
  originalFileName: string;
  newFileName: string;
}

export interface DocumentQueryInput {
  fileName: string;
  _id: string;
}

export interface InputDocumentData {
  fileName: string;
  knowledgeVault: string;
}

export interface FileMetaData {
  originalFileName: string;
  newFileName: string;
}

export interface Assistant {
  name: string;
  description: string;
  type: "Q&A" | "NONE";
  brandVoice: string;
  knowledgeVault: ObjectId[];
  instructions: string[];
  organization: ObjectId;
}

export interface AssistantQueryInput {
  _id: ObjectId;
  queryText: string;
}

interface workflow {
  name: string;
  description: string;
  trigger: string;
}

export interface XAccount {
  organization: ObjectId;
  scope: string[];
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface WhatSappAccount {
  organization: ObjectId;
  accessToken: String;
  whatsappId: string;
  isValid: boolean;
  isSubscribedToWebhook: boolean;
  tokenType: string;
  mfaPin: string;
  phoneNumber: {
    id: string;
    isRegistered: boolean;
    isVerified: string;
  };
}

export interface SessionCache {
  userEmail: string;
  profileId: ObjectId;
  organizationProfileId: ObjectId;
}

export interface WorkflowAtion {
  actionName: string;
  stepOrder: number;
  category: string;
  actionType: string;
  actionParameters: any;
}

export interface Workflow {
  organization: ObjectId;
  workflowName: string;
  createdAt: Date;
  updatedAt: Date;
  steps: WorkflowAtion[];
}
