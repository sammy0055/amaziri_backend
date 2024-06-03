import { Workflow } from "amaziri_workflow";

interface UserInput {
  workflowInput: Workflow;
}

let sendWhatsappMessagesDataCache: any = null;

const getSendWhatsappMessagesData = async () => {
  if (!sendWhatsappMessagesDataCache) {
    const module = await import("../data/workflow/actionsData/whatsapp");
    sendWhatsappMessagesDataCache = module.sendWhatSappMessagesData;
  }
  return sendWhatsappMessagesDataCache;
};

export const validateWorkflowInput = async ({ workflowInput }: UserInput) => {
  for (const step in workflowInput.steps) {
    const action = workflowInput.steps[step];

    switch (action.actionName) {
      case "SEND_WHATSAPP_MESSAGES":
        const sendWhatSappMessagesData = await getSendWhatsappMessagesData();
        const requiredKeys = Object.keys(
          sendWhatSappMessagesData.actionParameters
        );
        const hasAllKeys = requiredKeys.every(
          (key) => key in action.actionParameters
        );

        if (!hasAllKeys) {
          throw new Error(
            `"Invalid action parameters for SEND_WHATSAPP_MESSAGES required keys" ${requiredKeys.join(
              ","
            )}`
          );
        }
        break;

      default:
        break;
    }
  }
};
