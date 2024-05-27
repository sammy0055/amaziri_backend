import { type IncomingMessage, type ServerResponse } from "http";
import { Schema } from "mongoose";

type ObjectId = Schema.Types.ObjectId;

export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
}

export interface OrganizationProfile {
  name: string;
  description: string;
}

export interface AuthUserInput {
  email: string;
  password: string;
}

export interface DecodedIdToken {
  aud: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  exp: number;
  firebase: {
    identities: {
      [key: string]: any;
    };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
    tenant?: string;
    [key: string]: any;
  };
}

export interface AuthUserData {
  authUser?: DecodedIdToken;
  ContextFunctionArgument: {
    req: IncomingMessage;
    res: ServerResponse;
  };
}

export interface SessionCache {
  userEmail: string;
  profileId: ObjectId;
  organizationProfileId: ObjectId;
}
