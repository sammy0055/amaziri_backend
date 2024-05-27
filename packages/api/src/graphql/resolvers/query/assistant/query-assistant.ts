import { errorHandler } from "../../../../helpers/error-handler";
import { Assistant } from "../../../../helpers/manage-assistant";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AssistantQueryInput } from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
    assistantQueryInput: AssistantQueryInput;
}
export const queryAssistant = async (
  _: unknown,
  { assistantQueryInput }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { assistantQuery } = new Assistant(email);
    const data = await assistantQuery(assistantQueryInput);
    return {
      code: 200,
      success: true,
      message: "successful",
      data:data.text,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
