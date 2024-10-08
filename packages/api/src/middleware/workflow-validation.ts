import { AssistantEntry } from "amazir_data_model";
import { Workflow, Action, ActionNames } from "amaziri_workflow";
import { Types, isValidObjectId } from "mongoose";

let sendWhatsappMessagesDataCache: any = null;

const getSendWhatsappMessagesData = async () => {
  if (!sendWhatsappMessagesDataCache) {
    const module = await import("../data/workflow/actionsData/whatsapp");
    sendWhatsappMessagesDataCache = module.sendWhatSappMessagesData;
  }
  return sendWhatsappMessagesDataCache;
};

const validateParametersKeys = (data: any, action: Action<any>) => {
  const requiredKeys = Object.keys(data.actionParameters);
  const hasAllKeys = requiredKeys.every(
    (key) => key in action.actionParameters
  );

  if (!hasAllKeys) {
    throw new Error(
      `Invalid action parameters for ${
        action.actionName
      }, required keys: ${requiredKeys.join(",")}`
    );
  }
};

// const validators: { [key in ActionNames]: any } = {
//   SEND_WHATSAPP_MESSAGES: async (action: Action<ActionNames.SEND_MESSAGES>) => {
//     const sendWhatSappMessagesData = await getSendWhatsappMessagesData();
//     validateParametersKeys(sendWhatSappMessagesData, action);
//     return action;
//   },
//   GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT: async (
//     action: Action<ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT>
//   ) => {
//     const genetateTextData = await import(
//       "../data/workflow/actionsData/text-generator"
//     ).then((item) => item.generateTextWithKnowledgeBaseAssistantData);
//     validateParametersKeys(genetateTextData, action);
//     if (!action.actionParameters.userPrompt)
//       throw new Error("userPrompt most not be empty");
//     const assistantId = action.actionParameters.assistantId;
//     if (!isValidObjectId(assistantId)) throw new Error("invalid assistantId");
//     const isAssistant = await AssistantEntry.findById(assistantId).exec();
//     if (!isAssistant) throw new Error("assistantId does not exist");
//     action.actionParameters.assistantId = new Types.ObjectId(
//       assistantId
//     ) as any;
//     return action;
//   },
// };

// Main validation function
export const validateWorkflowInput = async (workflowInput: Workflow) => {

  // Run all validations concurrently
  workflowInput.steps
  return workflowInput;
};
