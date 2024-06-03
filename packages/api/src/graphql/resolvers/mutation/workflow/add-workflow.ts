import { errorHandler } from "../../../../helpers/error-handler";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { RESPONSE_STATUS } from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
  workflowInput: any;
}

export const addWorkflow = async (
  _: unknown,
  { workflowInput }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    // const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    // console.log("resolve args", workflowInput);

    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
