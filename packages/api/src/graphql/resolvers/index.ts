import {
  AssistantType,
  JSONScalar,
  UniqueID,
  WorkflowActionCategory,
  WorkflowActionNames,
  WorkflowActionType,
  documentFileNameScalar,
} from "../scalars";
import { mutations } from "./mutation";
import { queries } from "./query";
import { getKnowledgeVaultDocuments } from "./query/knowledge_vault/get-knowledgevault";
import { subscriptions } from "./subscription";

export const resolvers = {
  FileName: documentFileNameScalar(),
  AssistantType: AssistantType(),
  WorkflowActionName: WorkflowActionNames(),
  JSONScalar,
  UNIQUEID: UniqueID(),
  WorkflowActionCategory: WorkflowActionCategory(),
  WorkflowActionType: WorkflowActionType(),
  Query: queries,
  Mutation: mutations,
  Subscription: subscriptions,
  KnowledgeVault: {
    documents: getKnowledgeVaultDocuments,
  },
};
