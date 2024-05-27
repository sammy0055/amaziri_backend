import { errorHandler } from "../../../../helpers/error-handler";
import { Assistant } from "../../../../helpers/manage-assistant";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { ObjectId } from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
  AssistantId: ObjectId;
}
export const removeAssistant = async (
  _: unknown,
  { AssistantId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { removeAssistant } = new Assistant(email);
    const data = await removeAssistant(AssistantId);
    if (!data) throw new Error("assistant does not exist");

    return {
      code: 200,
      success: true,
      message: "assistant delete successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
