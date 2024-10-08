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
updatedAt: Date
createdAt: Date
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

const ActionData = `
actionName: WorkflowActionName!
description: String!
isInputRequired: Boolean!
trigger: Boolean
result: JSONScalar
category: WorkflowActionCategory!
actionType: WorkflowActionType!
actionParameters: JSONScalar 
`;

const ActionMeasured = `
  width: Float
  height: Float
`;

const ActionPosition = `
x: Float
y: Float
`;

const ActionEdge = `
  id:String 
  source: String 
  target: String 
  type: String
`;
export const typeDefs = `#graphql
scalar Date
scalar FileName
scalar AssistantType
scalar UNIQUEID
scalar WorkflowActionName
scalar WorkflowActionCategory
scalar WorkflowActionType
scalar JSONScalar

enum StatusResponse {
  SUCCESSFUL
  WORKFLOW_STARTED_SUCCESSFULLY
}

enum ScheduleRecurrenceType {
  DAILY
  WEEKLY
  YEARLY
}
type SignUp {
  ${AuthCredentials}
}

type Login {
  ${AuthCredentials}
}

type Profile {
  email: String
  organizations: [String]
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
  _id: UNIQUEID!
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
  name: String!
  description: String!
  type: AssistantType!
  brandVoice: String
  knowledgeVault: [UNIQUEID]
  instructions: [String]
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


type ActionMeasured {
  ${ActionMeasured}
}

type ActionPosition {
  ${ActionPosition}
}

type ActionNodeData {
  ${ActionData}
}
type ActionNode {
  id: String!
  type: String
  measured: ActionMeasured!
  position: ActionPosition!
  data: ActionNodeData!
}

type ActionEdge {
  ${ActionEdge}
}

type WorkflowAction {
  nodes: [ActionNode]
  edges: [ActionEdge]
}



type Workflow {
  _id: UNIQUEID!
  workflowName: String
  steps: WorkflowAction
}

type SignUpResponse {
  data: SignUp
  ${ResponseStatus}
}

type LoginResponse {
  data: Login
  ${ResponseStatus}
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

type AssistantsResponse {
  data: [Assistant]
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

type WorkflowProcessResponse {
  node: ActionNode!
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

input KnowledgeVaultUpdateInput {
  _id: UNIQUEID!
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

input ActionMeasuredInput {
  ${ActionMeasured}
}

input ActionPositionInput {
  ${ActionPosition}
}

input ActionNodeDataInput {
  ${ActionData}
}

input ActionNodeInput {
  id: String!
  type: String
  measured: ActionMeasuredInput!
  position: ActionPositionInput!
  data: ActionNodeDataInput!
}

input ActionEdgeInput {
  ${ActionEdge}
}

input WorkflowActionInput {
  nodes: [ActionNodeInput]
  edges:[ActionEdgeInput]
}

input WorkflowInput {
  workflowName: String
  steps: WorkflowActionInput
}

input WorkflowUpdateInput {
  _id: UNIQUEID!
  workflowName: String
  steps: WorkflowActionInput
}

input WorkflowScheduleRecurrenceInput {
  type: ScheduleRecurrenceType!
  interval: Int!
  endDate: Date
}

input WorkflowScheduleInput {
  workflow: UNIQUEID!
  scheduledTime: Date!
  recurrence: WorkflowScheduleRecurrenceInput
}

type OrganizationQuery {
  selectOrganization(organizationId:UNIQUEID!):OrganizationProfileResponse
}

type Query {
  getProfile: ProfileResponse!
  organization:OrganizationQuery
  getDocument(DocumentId: UNIQUEID!): DocumentResponse!
  getKnowledgeVault(VaultId: UNIQUEID!): KnowledgeVaultResponse!
  getKnowledgeVaults: KnowledgeVaultsResponse!
  queryAssistant(assistantQueryInput: AssistantQueryInput!): AssistantQueryResponse
  getAssistants: AssistantsResponse!
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
  updateKnowledgeVault(knowledgeVaultInputData: KnowledgeVaultUpdateInput): KnowledgeVaultResponse!
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
  addWorkflow(workflowInput: WorkflowInput!): StatusResponse
  updateWorkflow(workflowInput: WorkflowUpdateInput!): StatusResponse
  removeWorkflow(workflowId: UNIQUEID!): StatusResponse
  runWorkflow(workflowId: UNIQUEID!): StatusResponse
  addWorkflowSchedule(workflowScheduleData: WorkflowScheduleInput!): StatusResponse!
}


type Subscription {
  workflowProcess(workflowId: UNIQUEID!): WorkflowProcessResponse
  }

`;

// WorkflowProcessResponse