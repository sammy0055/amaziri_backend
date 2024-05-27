import queryString from "query-string";
import { getEnv } from "../utils/getEnv";

const AppId = getEnv("META_APP_ID");
const AppSecret = getEnv("META_APP_SECRET");
export class ManageWhatsapp {
  protected whatsappId: number;
  protected accessToken: string;
  constructor(whatsappId: number) {
    this.whatsappId = whatsappId;
    this.accessToken = "";
  }

  getWhatSappAccount = async (accessToken: string) => {
    const url = `https://graph.facebook.com/v20.0/${this.whatsappId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const data = await res.json();
    return data;
  };

  inspectAcessToken = async () => {
    const stringifiedParams = queryString.stringify({
      input_token: this.accessToken,
      access_token: `${AppId}|${AppSecret}`,
    });

    const params = new URLSearchParams({
      input_token: this.accessToken,
      access_token: `${AppId}|${AppSecret}`,
    });

    const url = `https://graph.facebook.com/debug_token?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const data = await res.json();
    return data;
  };
}
