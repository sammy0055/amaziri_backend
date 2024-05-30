import { ActionParametersType } from "../../types";

const SendWhatSappMessage = (
  parameters: ActionParametersType["SEND_WHATSAPP_MESSAGES"]
) => {
  const validateParameters = (): boolean => {
    return true;
  };

  const execute = async (data: any): Promise<any> => {
    const phoneNumberId = parameters.whatsappPhoneNumberId;
    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    // await fetch(url);
    return parameters;
  };

  return {
    validateParameters,
    execute,
  };
};

export { SendWhatSappMessage };
