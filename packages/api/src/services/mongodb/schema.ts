// import { Schema, model, models } from "mongoose";
// import {
//   IAssistant,
//   IDocuments,
//   IKnowledgeVault,
//   IProfile,
//   ISessionCache,
//   IWhatSappAccount,
//   IXAccount,
// } from "./types";
// const ObjectId = Schema.Types.ObjectId;
// const Profile = new Schema<IProfile>({
//   email: { type: String, unique: true, required: true }, //index field
//   firstName: { type: String, required: false },
//   lastName: { type: String, required: false },
// });

// const Organization = new Schema({
//   creator: { type: ObjectId, ref: "Profile", required: true }, //index
//   name: { type: String, unique: true, required: true },
//   description: { type: String },
//   knowledgeVaults: { type: [ObjectId], ref: "KnowledgeVault" },
//   xaccount: { type: ObjectId, ref: "XAccount" },
// });

// const KnowledgeVault = new Schema<IKnowledgeVault>({
//   name: { type: String, unique: true, required: true },
//   documents: { type: [ObjectId], ref: "Documents", required: false },
//   organization: { type: ObjectId, ref: "Organization", required: true }, //index
// });

// const Documents = new Schema<IDocuments>({
//   organization: { type: ObjectId, ref: "Organization", required: true },
//   knowledgeVault: { type: ObjectId, ref: "KnowledgeVault", required: true }, //index
//   originalFileName: { type: String, required: true },
//   newFileName: { type: String, unique: true, required: true },
// });

// const Assistant = new Schema<IAssistant>({
//   name: { type: String, required: true },
//   organization: { type: ObjectId, ref: "Organization", required: true },
//   description: { type: String },
//   type: { type: String, default: "NONE" },
//   brandVoice: { type: String },
//   knowledgeVault: { type: [ObjectId], ref: "KnowledgeVault" },
//   instructions: { type: [String] },
// });

// export const XAccount = new Schema<IXAccount>(
//   {
//     organization: { type: ObjectId, ref: "Organization", required: true },
//     scope: { type: [String] },
//     tokenType: { type: String },
//     expiresIn: { type: Number, required: true },
//     accessToken: { type: String, required: true },
//     refreshToken: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// const WhatSappAccountPhoneNumber = new Schema({
//   id: String,
//   isRegistered: { type: Boolean, default: false },
//   isVerified: { type: String, default: "" },
// });

// export const WhatSappAccount = new Schema<IWhatSappAccount>(
//   {
//     organization: { type: ObjectId, ref: "Organization", required: true },
//     accessToken: { type: String, required: true },
//     whatsappId: { type: String, default: "" },
//     isValid: { type: Boolean, default: true },
//     tokenType: { type: String },
//     mfaPin: { type: String },
//     phoneNumber: { type: WhatSappAccountPhoneNumber },
//   },
//   {
//     timestamps: true,
//   }
// );

// const sessionCache = new Schema<ISessionCache>(
//   {
//     userEmail: { type: String, required: true }, //index field
//     profileId: { type: ObjectId, ref: "Profile", required: true }, //index field
//     organizationProfileId: {
//       type: ObjectId,
//       ref: "Organization",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const SessionCacheEntry =
//   models.sessionCache || model<ISessionCache>("sessionCache", sessionCache);
// export const ProfileEntry =
//   models.profile || model<IProfile>("profile", Profile);
// export const OrganizationProfileEntry =
//   models.Organization || model("Organization", Organization);
// export const KnowledgeVaultEntry =
//   models.KnowledgeVault ||
//   model<IKnowledgeVault>("KnowledgeVault", KnowledgeVault);
// export const DocumentEntry =
//   models.Documents || model<IDocuments>("Documents", Documents);
// export const AssistantEntry =
//   models.Assistant || model<IAssistant>("Assistant", Assistant);
// export const XAccountEntry = models.XAccount || model("XAccount", XAccount);
// export const WhatSappAccountEntry =
//   models.WhatSappAccount || model("WhatSappAccount", WhatSappAccount);

export * from "amazir_data_model";
