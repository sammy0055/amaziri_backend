import { BaseAction } from "..";
import {
  Action,
  ActionNames,
  ActionParametersType,
} from "../../types/workflow";

const accessToken =
  "EAAGu0w0jKycBO6NfPznktGHaZCb0lTX2IIk0jddDFcKRJ8xxunP18pcRtUtqfZCUuXsTyGe7SDFnVsQ0t02EnYwlrLhLT48GWA2HTfzwQcNfGF7Yf51RNpZC7zgTIweTHlbtkPIMwwtZC3fUorYtMbo2kwhkHoEZC3zaZAL20qIi00vvd8e0p5tZA9VtscXgjuLqnX9mOZBUzBY7JZCO0WQL9h7V2sWUByoH5QZBbs8MLsvASIZBCZAaTOTZBycuMRnbWgOffx8u9XVZB1bAZDZD";
// export class WhatSappWorkflowAtions extends BaseAction {
//   private actionRegistry: { [key in ActionNames]: any } = {
//     [ActionNames.GET_UNREAD_MESSAGES]: null,
//     [ActionNames.SEND_MESSAGES]: null,
//   };
//   async execute(data: Action<ActionNames>): Promise<any> {
//     const action = this.actionRegistry[data.actionName];
//     const res = await action(data.actionParameters);
//     return res;
//   }

//   validateParameters(): boolean {
//     // Validate parameters specific to responding with knowledgebase
//     return true;
//   }
// }

export const getWhatSappMessagesData: Action<ActionNames.GET_UNREAD_MESSAGES> =
  {
    actionId: "0",
    actionName: ActionNames.GET_UNREAD_MESSAGES,
    stepOrder: 1,
    category: "",
    actionType: "WHATSAPP_MANAGER",
    actionParameters: {
      whatsappPhoneNumberId: "305654869305326",
      whatsappBusinessId: "",
    },
  };

export const sendWhatSappMessagesData: Action<ActionNames.SEND_MESSAGES> = {
  actionId: "1",
  actionName: ActionNames.SEND_MESSAGES,
  stepOrder: 2,
  category: "",
  actionType: "WHATSAPP_MANAGER",
  actionParameters: {
    whatsappBusinessId: "",
    whatsappPhoneNumberId: "",
    messages: [{}],
  },
};

export class GetUnreadMessages {
  private args: ActionParametersType["GET_UNREAD_MESSAGES"];
  constructor(public parameters: any) {
    this.args = this.parameters;
  }
  validateParameters(): boolean {
    return true;
  }

  async execute(): Promise<any> {
    const phoneNumberId = this.args.whatsappPhoneNumberId;
    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    const res = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData: any = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }
    return phoneNumberId;
  }
}

export class SendWhatSappMessages {
  private args: ActionParametersType["GET_UNREAD_MESSAGES"];
  constructor(public parameters: any) {
    this.args = this.parameters;
  }
  validateParameters(): boolean {
    return true;
  }

  async execute(data: any): Promise<any> {
    const phoneNumberId = this.args.whatsappPhoneNumberId;
    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    // await fetch(url);
    return this.args;
  }
}
