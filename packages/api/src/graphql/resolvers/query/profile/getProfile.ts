import { ProfileEntry } from "amazir_data_model";
import { errorHandler } from "../../../../helpers/error-handler";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";

export const getProfile = async (
  _: unknown,
  __: unknown,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const data = await ProfileEntry.findOne({ email: email });
    return {
      code: 200,
      success: true,
      message: "successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
