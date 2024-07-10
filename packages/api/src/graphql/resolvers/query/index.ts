import { getAssistants } from "./assistant/get-assistants";
import { queryAssistant } from "./assistant/query-assistant";
import { getDocument } from "./knowledge_vault/get-document";
import {
  getKnowledgeVault,
  getKnowledgeVaults,
} from "./knowledge_vault/get-knowledgevault";
import { organization } from "./organization";
import { getProfile } from "./profile/getProfile";

export const queries = {
  getProfile,
  organization,
  getDocument,
  getKnowledgeVault,
  getKnowledgeVaults,
  queryAssistant,
  getAssistants,
};
