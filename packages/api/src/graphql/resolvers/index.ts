import {
  AssistantType,
  JSONScalar,
  UniqueID,
  WorkflowActionNames,
  documentFileNameScalar,
} from "../scalars";
import { mutations } from "./mutation";
import { queries } from "./query";
import { getKnowledgeVaultDocuments } from "./query/knowledge_vault/get-knowledgevault";

export const resolvers = {
  FileName: documentFileNameScalar(),
  AssistantType: AssistantType(),
  WorkflowActionName: WorkflowActionNames(),
  JSONScalar,
  UNIQUEID: UniqueID(),
  Query: queries,
  Mutation: mutations,
  KnowledgeVault: {
    documents: getKnowledgeVaultDocuments,
  },
};
