import { errorHandler } from "../../../../helpers/error-handler";
import { AuthUserData } from "../../../../types/common/users";
import { Assistant as Assistanttype } from "../../../../types/common/organization";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { Assistant } from "../../../../helpers/manage-assistant";
import { Schema, Types } from "mongoose";

interface UserInput {
  AssistantInputData: Assistanttype & { _id: string };
}
export const updateAssistant = async (
  _: unknown,
  { AssistantInputData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { updateAssistant } = new Assistant(email);
    const data = await updateAssistant(AssistantInputData);
    return {
      code: 200,
      success: true,
      message: "assistant created successfully",
      data,
    };
  } catch (error) {
    errorHandler(error);
  }
};
