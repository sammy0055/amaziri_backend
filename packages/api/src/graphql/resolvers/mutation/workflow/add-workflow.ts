import { errorHandler } from "../../../../helpers/error-handler";
import { ManageWorkflow } from "../../../../helpers/manage-workflow";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { validateWorkflowInput } from "../../../../middleware/workflow-validation";
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
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    await validateWorkflowInput(workflowInput);
    const { addWorkflow } = new ManageWorkflow(email);
    const data = await addWorkflow(workflowInput);

    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
