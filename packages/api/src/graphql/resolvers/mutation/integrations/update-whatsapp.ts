import { errorHandler } from "../../../../helpers/error-handler";
import { WhatSappAccountManager } from "../../../../helpers/integrations/manage-whatsapp";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { RESPONSE_STATUS } from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";
import { WhatSappAccount } from "../../../../types/integrations";

interface UserInput {
  whatsappData: WhatSappAccount & { _id: string };
}
export const updateWhatSappAccount = async (
  _: unknown,
  { whatsappData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { updateWhatsappAccount } = new WhatSappAccountManager(email);
    const data = await updateWhatsappAccount(whatsappData);

    return {
      code: 200,
      message: "updated successfully",
      success: true,
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};

export const registerWhatSappPhoneNumber = async (
  _: unknown,
  { whatsappData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { registerPhoneNumber } = new WhatSappAccountManager(email);
    const data = await registerPhoneNumber(whatsappData);

    return {
      code: 200,
      message: "updated successfully",
      success: true,
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};

export const testWhatsappMessaging = async (
  _: unknown,
  { whatsappData }: UserInput,
) => {
  try {
    const { sendTestMessage } = new WhatSappAccountManager("email");
    await sendTestMessage(whatsappData._id)
    return RESPONSE_STATUS.SUCCESSFUL
  } catch (error: any) {
    errorHandler(error);
  }
};
