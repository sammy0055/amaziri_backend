import { Document } from "mongoose";
import { Profile, SessionCache } from "../../types/common/users";
import {
  Assistant,
  Document as DocumentType,
  Files,
  KnowledgeVault,
} from "../../types/common/organization";
import { WhatSappAccount, XAccount } from "../../types/integrations";

export interface IProfile extends Document, Profile {}
export interface ISessionCache extends Document, SessionCache {}
export interface IFiles extends Document, Files {}
export interface IKnowledgeVault extends Document, KnowledgeVault {}
export interface IDocuments extends Document, DocumentType {}
export interface IAssistant extends Document, Assistant {}
export interface IXAccount extends Document, XAccount {}
export interface IWhatSappAccount extends Document, WhatSappAccount {}
