import { errorHandler } from "../../../../helpers/error-handler";
import { Assistant } from "../../../../helpers/manage-assistant";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { Assistant as Assistanttype } from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
  AssistantInputData: Assistanttype;
}
export const createAssistant = async (
  _: unknown,
  { AssistantInputData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { createAssistant } = new Assistant(email);
    const data = await createAssistant(AssistantInputData);
    return {
      code: 200,
      success: true,
      message: "assistant created successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
