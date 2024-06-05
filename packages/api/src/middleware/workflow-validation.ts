import { Workflow, Action, ActionNames } from "amaziri_workflow";

let sendWhatsappMessagesDataCache: any = null;

const getSendWhatsappMessagesData = async () => {
  if (!sendWhatsappMessagesDataCache) {
    const module = await import("../data/workflow/actionsData/whatsapp");
    sendWhatsappMessagesDataCache = module.sendWhatSappMessagesData;
  }
  return sendWhatsappMessagesDataCache;
};

const validateParameters = (data: any, action: Action<any>) => {
  const requiredKeys = Object.keys(data.actionParameters);
  const hasAllKeys = requiredKeys.every(
    (key) => key in action.actionParameters
  );

  if (!hasAllKeys) {
    throw new Error(
      `Invalid action parameters for SEND_WHATSAPP_MESSAGES, required keys: ${requiredKeys.join(
        ","
      )}`
    );
  }
};

const validators: { [key in ActionNames]: any } = {
  SEND_WHATSAPP_MESSAGES: async (action: Action<any>) => {
    const sendWhatSappMessagesData = await getSendWhatsappMessagesData();
    validateParameters(sendWhatSappMessagesData, action);
  },
  // Add other action validators here...
};

// Main validation function
export const validateWorkflowInput = async (workflowInput: Workflow) => {
  const actionOrderSet = new Set();
  const validationPromises = workflowInput.steps.map(async (step) => {
    if (!Number.isInteger(step.stepOrder)) {
      throw new Error(
        `stepOrder must be an integer, but got: ${step.stepOrder}`
      );
    }

    if (actionOrderSet.has(step.stepOrder)) {
      throw new Error(`Duplicate stepOrder found: ${step.stepOrder}`);
    }

    actionOrderSet.add(step.stepOrder);

    const validator = validators[step.actionName];
    if (validator) {
      await validator(step);
    }
  });

  // Run all validations concurrently
  await Promise.all(validationPromises);
};
