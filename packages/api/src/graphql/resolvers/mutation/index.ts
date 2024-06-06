import { emailAndPasswordLogin } from "./profile/login";
import { organization } from "./organization";
import { addDocumentToVectorStore } from "./knowledge_vault/add-document-to-vectorstore";
import { createKnowledgeVault } from "./knowledge_vault/create-knowledge-vault";
import { uploadDocument } from "./knowledge_vault/upload-document";
import { createUser } from "./profile/signup";
import { updateProfile } from "./profile/update-profile";
import { removeDocument } from "./knowledge_vault/remove-document";
import { removeKnowledgeVault } from "./knowledge_vault/remove-knowledgevault";
import { createAssistant } from "./assistant/create-assistant";
import { updateAssistant } from "./assistant/update-assistant";
import { removeAssistant } from "./assistant/remove-assistant";
import { addXAccount } from "./integrations/add-x-account";
import { addwhatSappAccount } from "./integrations/add-whatsapp";
import { registerWhatSappPhoneNumber, testWhatsappMessaging, updateWhatSappAccount } from "./integrations/update-whatsapp";
import { addWorkflow } from "./workflow/add-workflow";
import { updateWorkflow } from "./workflow/update-workflow";
import { removeWorkflow } from "./workflow/delete-workflow";

export const mutations = {
  signUp: createUser,
  emailAndPasswordLogin,
  updateProfile,
  organization,
  createKnowledgeVault,
  uploadDocument,
  addDocumentToVectorStore,
  removeDocument,
  removeKnowledgeVault,
  createAssistant,
  updateAssistant,
  removeAssistant,
  addXAccount,
  addwhatSappAccount,
  updateWhatSappAccount,
  registerWhatSappPhoneNumber,
  testWhatsappMessaging,
  addWorkflow,
  updateWorkflow,
  removeWorkflow
};
