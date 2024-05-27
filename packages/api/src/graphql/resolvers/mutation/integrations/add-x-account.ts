import { errorHandler } from "../../../../helpers/error-handler";
import { XAccountManager } from "../../../../helpers/integrations/manage-xaccount";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";
import { XAccount } from "../../../../types/integrations";

interface UserInput {
  Xcredentials: XAccount;
}
export const addXAccount = async (
  _: unknown,
  { Xcredentials }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { addXAccount } = new XAccountManager(email);
    const data = await addXAccount(Xcredentials);
    return {
      code: 200,
      success: true,
      message: "added xaccount successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
