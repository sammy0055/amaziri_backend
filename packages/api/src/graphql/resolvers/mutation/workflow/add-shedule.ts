import { errorHandler } from "../../../../helpers/error-handler";
import { ManageWorkflow } from "../../../../helpers/manage-workflow";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { ScheduleRecurrenceType } from "../../../../types";
import {
  ObjectId,
  RESPONSE_STATUS,
} from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
  workflowScheduleData: {
    workflow: ObjectId;
    scheduledTime: Date;
    recurrence?: {
      type: `${ScheduleRecurrenceType}`;
      interval: number;
      endDate?: Date;
    };
  };
}

export const addWorkflowSchedule = async (
  _: unknown,
  { workflowScheduleData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { addWorkflowSchedule } = new ManageWorkflow(email);
    await addWorkflowSchedule(workflowScheduleData);
    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
