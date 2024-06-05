const ResponseStatus = `
  code: Int!
  success: Boolean!
  message: String!
`;

const AuthCredentials = `
  email: String!
  IdToken: String!
  exp: Int!
`;

const Profile = `
  firstName: String
  lastName: String
`;

const Organization = `
  name: String!
  description: String
`;

const Document = `
knowledgeVault: UNIQUEID!
originalFileName: FileName!
newFileName: FileName!
`;

const Assistant = `
name: String!
description: String!
type: AssistantType!
brandVoice: String
knowledgeVault: [UNIQUEID]!
instructions: [String]
`;

const XAccount = `
scope: [String]
tokenType: String
expiresIn: Int!
accessToken: String!
refreshToken: String!
`;
export const typeDefs = `#graphql
scalar FileName
scalar AssistantType
scalar UNIQUEID
scalar WorkflowActionName
scalar WorkflowActionCategory
scalar WorkflowActionType
scalar JSONScalar

enum StatusResponse {
  SUCCESSFUL
}
type SignUp {
  ${AuthCredentials}
}

type Profile {
  email: String
  ${Profile}
}

type OrganizationProfile {
  _id: UNIQUEID
  ${Organization}
}

type Document {
  _id: UNIQUEID!
  ${Document}
}

type DocumentUpload {
  uploadUrl: String!
  ${Document}
}

type KnowledgeVault {
  _id: UNIQUEID!
  name:String!
  organization:UNIQUEID
  documents: [Document]
}

type Assistant {
  _id: UNIQUEID!
  organization: UNIQUEID!
  ${Assistant}
}

type XAccount {
  _id: UNIQUEID!
  organization: UNIQUEID
  ${XAccount}
}

type WhatSappAccount {
  _id: UNIQUEID,
  isValid: Boolean
  whatsappId: String
  phoneNumber: WhatSappAccountPhoneNumber
}

type WhatSappAccountPhoneNumber {
  isRegistered: Boolean
  isVerified: String
}

type WorkflowAction {
  actionName: WorkflowActionName!
  stepOrder: Int
  category: String
  actionType: String
  actionParameters: JSONScalar 
}



type Workflow {
  workflowName: String
  steps: [WorkflowAction]
}

input WorkflowActionInput {
  actionName: WorkflowActionName!
  stepOrder: Int
  category: WorkflowActionCategory!
  actionType: WorkflowActionType!
  actionParameters: JSONScalar 
}

input WorkflowInput {
  workflowName: String
  steps: [WorkflowActionInput]
}


type SignUpResponse {
  data: SignUp
  ${ResponseStatus}
}

type LoginResponse {
  ${AuthCredentials}
}

type ProfileResponse {
  data: Profile
  ${ResponseStatus}
}

type OrganizationProfileResponse {
  data: OrganizationProfile
  ${ResponseStatus}
}

type DocumentUploadResponse {
  data: DocumentUpload
  ${ResponseStatus}
}

type DocumentResponse {
  data: Document
  ${ResponseStatus}
}

type KnowledgeVaultResponse {
  data: KnowledgeVault
  ${ResponseStatus}
}

type KnowledgeVaultsResponse {
  data: [KnowledgeVault]
  ${ResponseStatus}
}

type AssistantResponse {
  data: Assistant
  ${ResponseStatus}
}

type AssistantQueryResponse {
  data: String!
  ${ResponseStatus}
}

type XAccountResponse {
  data: XAccount
  ${ResponseStatus}
}

type WhatSappAccountResponse {
  data: WhatSappAccount
  ${ResponseStatus}
}

input ProfileInput {
  ${Profile}
}

input OrganizationProfileInput {
  ${Organization}
}

input EmailAndPasswordInput {
  email: String!
  password: String!
}

input DocumentInput {
  fileName: FileName!
  knowledgeVault: UNIQUEID!
}

input KnowledgeVaultInput {
  name: String!
}

input DocumentQueryInput {
  _id: UNIQUEID!
  fileName: FileName!
}

input AssistantInput {
  ${Assistant}
}

input AssistantUpdateInput {
_id: UNIQUEID!
 ${Assistant}
}

input AssistantQueryInput {
  _id: UNIQUEID!
  queryText: String!
}

input XAccountInput {
  ${XAccount}
}

input WhatSappAccountInput {
  code: String!
  redirect_uri: String!
}

input WhatSappAccountUpdataInput {
  _id: UNIQUEID!
  whatsappId: String
  mfaPin: String
}

input TestWhatsappMessagingInput {
  _id: UNIQUEID!
}

type OrganizationQuery {
  selectOrganization(organizationId:UNIQUEID!):OrganizationProfileResponse
}

type Query {
  organization:OrganizationQuery
  getDocument(DocumentId: UNIQUEID!): DocumentResponse!
  getKnowledgeVault(VaultId: UNIQUEID!): KnowledgeVaultResponse!
  getKnowledgeVaults: KnowledgeVaultsResponse!
  queryAssistant(assistantQueryInput: AssistantQueryInput!): AssistantQueryResponse
}

type OrganizationMutation {
  createOrganizationProfile(organizationProfileInputData: OrganizationProfileInput!): OrganizationProfileResponse
  updateOrganizationProfile(organizationProfileInputData: OrganizationProfileInput!): OrganizationProfileResponse
}

type Mutation {
  signUp(signUpInputData:EmailAndPasswordInput!): SignUpResponse!
  emailAndPasswordLogin(loginInputData:EmailAndPasswordInput!): LoginResponse!
  updateProfile(profileInputData: ProfileInput!): ProfileResponse
  organization:OrganizationMutation
  createKnowledgeVault(knowledgeVaultInputData:KnowledgeVaultInput!): KnowledgeVaultResponse!
  removeKnowledgeVault(KnowledgeVaultId:UNIQUEID!): StatusResponse!
  "provide document metadata to get document upload url, etc"
  uploadDocument(uploadDocumentInputData:DocumentInput!): DocumentUploadResponse!
  addDocumentToVectorStore(Document:DocumentQueryInput!): StatusResponse!
  removeDocument(DocumentId: UNIQUEID!): StatusResponse!
  createAssistant(AssistantInputData:AssistantInput!): AssistantResponse!
  updateAssistant(AssistantInputData: AssistantUpdateInput!): AssistantResponse!
  removeAssistant(AssistantId:UNIQUEID!): AssistantResponse
  addXAccount(Xcredentials: XAccountInput!): XAccountResponse
  addwhatSappAccount(AuthCredentials: WhatSappAccountInput!): StatusResponse!
  updateWhatSappAccount(whatsappData: WhatSappAccountUpdataInput!): WhatSappAccountResponse!
  registerWhatSappPhoneNumber(whatsappData: WhatSappAccountUpdataInput!): WhatSappAccountResponse!
  "testWhatsappMessaging is to be deleted"
  testWhatsappMessaging(whatsappData: TestWhatsappMessagingInput!): StatusResponse
  addWorkflow(workflowInput: WorkflowInput): StatusResponse
}

`;
