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
  workflowInput: Workflow & { _id: ObjectId };
}

export const updateWorkflow = async (
  _: unknown,
  { workflowInput }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const workfow = (await validateWorkflowInput(workflowInput)) as Workflow & {
      _id: ObjectId;
    };
    const { updateWorkflow } = new ManageWorkflow(email);
    const data = await updateWorkflow(workfow);
    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
