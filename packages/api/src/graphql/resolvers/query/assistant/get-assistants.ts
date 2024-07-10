import { errorHandler } from "../../../../helpers/error-handler";
import { Assistant } from "../../../../helpers/manage-assistant";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";

export const getAssistants = async (
  _: unknown,
  __: unknown,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { getAssistants } = new Assistant(email);
    const data = await getAssistants();
    return {
      code: 200,
      success: true,
      message: "assistant retrieved successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
