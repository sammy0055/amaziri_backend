import mongoose, { Schema, model, models } from "mongoose";
import {
  IAssistant,
  IDocuments,
  IKnowledgeVault,
  IProfile,
  ISessionCache,
  IWhatSappAccount,
  IWorkflowAtion,
  IWorkflow,
  IXAccount,
  IWorkflowSchedule,
  ISubmittedContent,
} from "./type";
import { ScheduleRecurrence } from "./type/common";
const ObjectId = Schema.Types.ObjectId;
const Profile = new Schema<IProfile>(
  {
    email: { type: String, unique: true, required: true }, //index field
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    organizations: { type: [ObjectId] },
  },
  {
    timestamps: true,
  }
);

const Organization = new Schema(
  {
    creator: { type: ObjectId, ref: "Profile", required: true }, //index
    name: { type: String, unique: true, required: true },
    description: { type: String },
    knowledgeVaults: { type: [ObjectId], ref: "KnowledgeVault" },
    xaccount: { type: ObjectId, ref: "XAccount" },
    workflows: { type: [ObjectId], ref: "Workflow" },
  },
  {
    timestamps: true,
  }
);

const KnowledgeVault = new Schema<IKnowledgeVault>(
  {
    name: { type: String, unique: true, required: true },
    documents: { type: [ObjectId], ref: "Documents", required: false },
    organization: { type: ObjectId, ref: "Organization", required: true }, //index
  },
  {
    timestamps: true,
  }
);

const Documents = new Schema<IDocuments>(
  {
    organization: { type: ObjectId, ref: "Organization", required: true },
    knowledgeVault: { type: ObjectId, ref: "KnowledgeVault", required: true }, //index
    originalFileName: { type: String, required: true },
    newFileName: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Assistant = new Schema<IAssistant>(
  {
    name: { type: String, required: true },
    organization: { type: ObjectId, ref: "Organization", required: true },
    description: { type: String },
    type: { type: String, default: "NONE" },
    brandVoice: { type: String },
    knowledgeVault: { type: [ObjectId], ref: "KnowledgeVault" },
    instructions: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const XAccount = new Schema<IXAccount>(
  {
    organization: { type: ObjectId, ref: "Organization", required: true },
    scope: { type: [String] },
    tokenType: { type: String },
    expiresIn: { type: Number, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const WhatSappAccountPhoneNumber = new Schema({
  id: String,
  isRegistered: { type: Boolean, default: false },
  isVerified: { type: String, default: "" },
});

const WhatSappAccount = new Schema<IWhatSappAccount>(
  {
    organization: { type: ObjectId, ref: "Organization", required: true },
    accessToken: { type: String, required: true },
    whatsappId: { type: String, default: "" },
    isValid: { type: Boolean, default: true },
    isSubscribedToWebhook: { type: Boolean, default: false },
    tokenType: { type: String },
    mfaPin: { type: String },
    phoneNumber: { type: WhatSappAccountPhoneNumber },
  },
  {
    timestamps: true,
  }
);

const WorkflowActionData = new Schema<IWorkflowAtion>({
  actionName: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  actionType: { type: String, required: true },
  actionParameters: { type: Schema.Types.Mixed, required: true },
});

const WorkflowActionNode = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  measured: { type: { width: Number, height: Number } },
  position: { type: { x: Number, y: Number }, required: true },
  data: { type: WorkflowActionData, required: true },
});

const WorkflowActionEdges = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  type: { type: String, required: true },
});

const WorkflowAction = new Schema({
  nodes: { type: [WorkflowActionNode], required: true },
  edges: { type: [WorkflowActionEdges], required: true },
});

const Workflow = new Schema<IWorkflow>(
  {
    organization: { type: ObjectId, ref: "Organization", required: true }, // index
    workflowName: { type: String, required: true },
    steps: { type: WorkflowAction, required: true },
  },
  {
    timestamps: true,
  }
);

const submitedContent = new Schema<ISubmittedContent>({
  organization: { type: String },
  workflowId: { type: String },
  approvals: { type: [String] },
  contentTypes: { type: [String] },
  content: new Schema({
    text: { type: String },
    media: { type: String },
  }),
  approvalState: new Schema({
    approvedBy: { type: String },
    approvedDate: { type: Date },
    isApproved: { type: Boolean, default: false },
  }),
});

const ScheduleRecurrenceType = new Schema<ScheduleRecurrence>({
  type: { type: String, required: true },
  interval: { type: Number, required: true },
  endDate: { type: Date, required: false },
});

const WorkflowSchedule = new Schema<IWorkflowSchedule>(
  {
    organization: { type: ObjectId, ref: "Organization", required: true }, // index
    workflow: { type: ObjectId, ref: "Workflow", required: true },
    scheduledTime: { type: Date, required: true }, // index
    recurrence: { type: ScheduleRecurrenceType },
  },
  {
    timestamps: true,
  }
);

const sessionCache = new Schema<ISessionCache>(
  {
    userEmail: { type: String, required: true }, //index field
    profileId: { type: ObjectId, ref: "Profile", required: true }, //index field
    organizationProfileId: {
      type: ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SessionCacheEntry =
  models.sessionCache || model<ISessionCache>("sessionCache", sessionCache);
const ProfileEntry = models.profile || model<IProfile>("profile", Profile);
const OrganizationProfileEntry =
  models.Organization || model("Organization", Organization);
const KnowledgeVaultEntry =
  models.KnowledgeVault ||
  model<IKnowledgeVault>("KnowledgeVault", KnowledgeVault);
const DocumentEntry =
  models.Documents || model<IDocuments>("Documents", Documents);
const AssistantEntry =
  models.Assistant || model<IAssistant>("Assistant", Assistant);
const XAccountEntry = models.XAccount || model("XAccount", XAccount);
const WhatSappAccountEntry =
  models.WhatSappAccount || model("WhatSappAccount", WhatSappAccount);
const WorkflowActionEntry =
  models.WorkflowAction || model("WorkflowAction", WorkflowAction);
const WorkflowEntry = models.Workflow || model<IWorkflow>("Workflow", Workflow);
const WorkflowScheduleEntry =
  models.WorkflowSchedule || model("WorkflowSchedule", WorkflowSchedule);
const SubmitedContentEntry =
  models.submitedContent || model("submitedContent", submitedContent);
export {
  SessionCacheEntry,
  ProfileEntry,
  OrganizationProfileEntry,
  KnowledgeVaultEntry,
  DocumentEntry,
  AssistantEntry,
  XAccountEntry,
  WhatSappAccountEntry,
  WorkflowActionEntry,
  WorkflowEntry,
  WorkflowScheduleEntry,
  SubmitedContentEntry,
};
