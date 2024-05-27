import { errorHandler } from "../../../../helpers/error-handler";
import { WhatSappAccountManager } from "../../../../helpers/integrations/manage-whatsapp";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";
import { WhatSappLoginInput } from "../../../../types/integrations";
import { RESPONSE_STATUS } from "../../../../types/common/organization";

interface UserInput {
  AuthCredentials: WhatSappLoginInput;
}
export const addwhatSappAccount = async (
  _: unknown,
  { AuthCredentials }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { addWhatSappDetailsToDB } = new WhatSappAccountManager(email);
    await addWhatSappDetailsToDB(AuthCredentials);
    return RESPONSE_STATUS.SUCCESSFUL
  } catch (error: any) {
    errorHandler(error);
  }
};
