import { AuthUserData } from "../../../../types/common/users";
import {
  ObjectId,
  RESPONSE_STATUS,
} from "../../../../types/common/organization";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { ManageWorkflow } from "../../../../helpers/manage-workflow";
import { errorHandler } from "../../../../helpers/error-handler";
import { WorkflowEngine } from "amaziri_workflow";
import { postCreated } from "../../subscription/test-sub";

interface UserInput {
  workflowId: ObjectId;
}

export const runWorkflow = async (
  _: unknown,
  { workflowId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { executeWorkflow } = new ManageWorkflow(email);
    const engine = new WorkflowEngine();
    // await executeWorkflow(engine, workflowId);
    postCreated();
    return RESPONSE_STATUS.WORKFLOW_STARTED;
  } catch (error: any) {
    errorHandler(error);
  }
};
