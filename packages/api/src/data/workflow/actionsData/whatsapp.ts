import { Action, ActionNames } from "amaziri_workflow";

export const sendWhatSappMessagesData: Action<ActionNames.SEND_MESSAGES> = {
  actionId: "0",
  actionName: ActionNames.SEND_MESSAGES,
  stepOrder: 0,
  category: "",
  actionType: "WHATSAPP_MANAGER",
  actionParameters: {
    whatsappBusinessId: "",
    whatsappPhoneNumberId: "",
    messages: [],
  },
};
