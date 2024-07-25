import { ActionParametersType } from "../../types";

const SendWhatSappMessage = (
  parameters: ActionParametersType["SEND_WHATSAPP_MESSAGES"]
) => {
  const validateParameters = (): boolean => {
    return true;
  };

  const execute = async (data: any, previousResult:any): Promise<any> => {
    // const phoneNumberId = parameters.whatsappPhoneNumberId;
    // const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    // await fetch(url);
    return previousResult;
  };

  return {
    validateParameters,
    execute,
  };
};

const GenerateTextWithkowledgeBaseAssistant = (
  params: ActionParametersType["GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT"]
) => {
  const validateParameters = (): boolean => {
    return true;
  };

  const execute = async (data: any, previousResult:any): Promise<any> => {
    return previousResult;
  };

  return {
    validateParameters,
    execute,
  };
};

export { SendWhatSappMessage, GenerateTextWithkowledgeBaseAssistant };
