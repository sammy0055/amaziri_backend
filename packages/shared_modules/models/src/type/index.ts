import { Document } from "mongoose";

import {
  Profile,
  SessionCache,
  Assistant,
  Document as DocumentType,
  Files,
  KnowledgeVault,
  WhatSappAccount,
  XAccount,
} from "./common";

import { Workflow, Action } from "amaziri_workflow";

export interface IProfile extends Document, Profile {}
export interface ISessionCache extends Document, SessionCache {}
export interface IFiles extends Document, Files {}
export interface IKnowledgeVault extends Document, KnowledgeVault {}
export interface IDocuments extends Document, DocumentType {}
export interface IAssistant extends Document, Assistant {}
export interface IXAccount extends Document, XAccount {}
export interface IWhatSappAccount extends Document, WhatSappAccount {}
export interface IWorkflowAtion
  extends Document,
    Action<any> {}
export interface IWorkflow extends Document, Workflow {}
