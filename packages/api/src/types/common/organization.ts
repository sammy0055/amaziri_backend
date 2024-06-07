import { Schema } from "mongoose";
import { OrganizationProfile } from "./users";

export type ObjectId = Schema.Types.ObjectId;

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

export enum RESPONSE_STATUS {
  SUCCESSFUL = "SUCCESSFUL",
  WORKFLOW_STARTED = "WORKFLOW_STARTED_SUCCESSFULLY"
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
