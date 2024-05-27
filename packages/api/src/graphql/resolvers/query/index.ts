import { queryAssistant } from "./assistant/query-assistant";
import { getDocument } from "./knowledge_vault/get-document";
import { getKnowledgeVault, getKnowledgeVaults } from "./knowledge_vault/get-knowledgevault";
import { organization } from "./organization";

export const queries = {
  organization,
  getDocument,
  getKnowledgeVault,
  getKnowledgeVaults,
  queryAssistant
};
