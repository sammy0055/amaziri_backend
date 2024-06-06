import { Workflow } from "amaziri_workflow";
import { errorHandler } from "../../../../helpers/error-handler";
import { ManageWorkflow } from "../../../../helpers/manage-workflow";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { validateWorkflowInput } from "../../../../middleware/workflow-validation";
import {
  ObjectId,
  RESPONSE_STATUS,
} from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
    workflowId: ObjectId;
}

export const removeWorkflow = async (
  _: unknown,
  { workflowId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { deleteWorkflow } = new ManageWorkflow(email);
    const data = await deleteWorkflow(workflowId);
    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
