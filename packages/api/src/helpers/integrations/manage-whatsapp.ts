import { WhatSappAccountEntry } from "../../services/mongodb/schema";
import { WhatSappAccount, WhatSappLoginInput } from "../../types/integrations";
import { getEnv } from "../getEnv";
import { SessionCache } from "../manage-session-cache";

const AppId = getEnv("META_APP_ID");
const AppSecret = getEnv("META_APP_SECRET");
export class WhatSappAccountManager {
  protected userEmail: string;
  constructor(userEmail: string) {
    this.userEmail = userEmail;
  }

  exchangeCodeForAccessToken = async ({
    code,
    redirect_uri,
  }: WhatSappLoginInput) => {
    const params = {
      client_id: AppId,
      client_secret: AppSecret,
      redirect_uri,
      code,
    };
    const encoded = new URLSearchParams(params);
    const url = `https://graph.facebook.com/v18.0/oauth/access_token?${encoded.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error}`);
    }

    const data = await res.json();
    return data as { access_token: string; token_type: string };
  };

  getWhatSappAccountFromMeta = async (accessToken: string, whatsappId) => {
    const url = `https://graph.facebook.com/v20.0/${whatsappId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error}`);
    }

    const data = await res.json();
    return data;
  };

  inspectAcessToken = async (accessToken: string) => {
    const params = new URLSearchParams({
      input_token: accessToken,
      access_token: `${AppId}|${AppSecret}`,
    });

    const url = `https://graph.facebook.com/debug_token?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const data = await res.json();
    return data;
  };

  addWhatSappDetailsToDB = async (data: WhatSappLoginInput) => {
    const { getSessionCache } = new SessionCache(this.userEmail);
    const { organizationProfileId } = await getSessionCache();
    if (!organizationProfileId) throw new Error("organization is not found");
    const { access_token, token_type } = await this.exchangeCodeForAccessToken(
      data
    );
    const isTokenValid = access_token ? true : false;
    await WhatSappAccountEntry.create({
      organization: organizationProfileId,
      accessToken: access_token,
      tokenType: token_type,
      isValid: isTokenValid,
    });
  };

  updateWhatsappAccount = async (data: WhatSappAccount & { _id: string }) => {
    const accountData = await WhatSappAccountEntry.findByIdAndUpdate(
      data._id,
      {
        $set: { ...data },
      },
      { new: true }
    );

    if (!accountData) throw new Error("whatsapp account does not exist");

    return accountData;
  };

  getPhoneNumbers = async (
    data: Pick<WhatSappAccount, "accessToken" | "whatsappId">
  ) => {
    const url = `https://graph.facebook.com/v20.0/${data.whatsappId}/phone_numbers`;
    const res = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const phone_numbers = (await res.json()) as any;
    if (!phone_numbers.data)
      throw new Error("no phone number was found in your whatsapp account");
    return phone_numbers.data[0] as {
      id: string;
      verified_name: string;
      code_verification_status: string;
      display_phone_number: string;
    };
  };

  subScribeToWebhook = async (data: WhatSappAccount) => {
    const url = `https://graph.facebook.com/v20.0/${data.whatsappId}/subscribed_apps`;
    const res = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const resData = (await res.json()) as { success: boolean };
    if (!resData.success) throw new Error(`webhook subscription failed`);
  };

  registerPhoneNumber = async (data: WhatSappAccount & { _id: string }) => {
    const whatsappData = (await WhatSappAccountEntry.findById(
      data._id
    )) as WhatSappAccount;
    const phone_number = await this.getPhoneNumbers({
      whatsappId: data.whatsappId,
      accessToken: whatsappData.accessToken,
    });

    const MFAPIN = "005500";
    const registrationUrl = `https://graph.facebook.com/v20.0/${phone_number.id}/register`;
    const res = await fetch(registrationUrl, {
      method: "post",
      headers: {
        Authorization: `Bearer ${whatsappData.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        pin: MFAPIN,
      }),
    });
    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

     await this.subScribeToWebhook(whatsappData);
    const updatedData = await WhatSappAccountEntry.findByIdAndUpdate(
      data._id,
      {
        $set: {
          mfaPin: MFAPIN,
          isSubscribedToWebhook: true,
          phoneNumber: {
            id: phone_number.id,
            isRegistered: true,
            isVerified: phone_number.code_verification_status,
          },
        },
      },
      { new: true }
    );

    return updatedData;
  };

  sendTestMessage = async (_id: string) => {
    const whatsapp = (await WhatSappAccountEntry.findById(
      _id
    )) as WhatSappAccount;
    const phoneNumberId = whatsapp.phoneNumber.id;
    if (!whatsapp.phoneNumber.isRegistered)
      throw new Error("phone number is not reqistered");

    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    const res = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${whatsapp.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "2348171727284",
        text: { body: "sammy the code finally worked" },
      }),
    });

    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    console.log("====================================");
    console.log(await res.json());
    console.log("====================================");
  };
}
