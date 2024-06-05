import { Action, ActionNames } from "amaziri_workflow";

export const sendWhatSappMessagesData: Action<ActionNames.SEND_MESSAGES> = {
  actionName: ActionNames.SEND_MESSAGES,
  stepOrder: 0,
  category: "INTEGRATIONS",
  actionType: "WHATSAPP_MANAGER",
  actionParameters: {
    whatsappBusinessId: "",
    whatsappPhoneNumberId: "",
    messages: [],
  },
};
