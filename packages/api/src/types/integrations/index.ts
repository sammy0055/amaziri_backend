import { ObjectId } from "../common/organization";

export interface XAccount {
  organization: ObjectId;
  scope: string[];
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface WhatSappAccount {
  organization: ObjectId;
  accessToken: String;
  whatsappId: string;
  isValid: boolean;
  isSubscribedToWebhook: boolean;
  tokenType: string;
  mfaPin: string;
  phoneNumber: {
    id: string;
    isRegistered: boolean;
    isVerified: string;
  };
}

export interface WhatSappLoginInput {
  code: string;
  redirect_uri: string;
}
