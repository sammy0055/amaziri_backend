import { ActionNames, Workflow, WorkflowActions } from "../types/workflow";
import { SendWhatSappMessage } from "./actions/whatsapp";

type ActionRegistry = {
  [key in ActionNames]: WorkflowActions;
};

export const WorkflowEngine = () => {
  const actionRegistry = {
    [ActionNames.SEND_MESSAGES]: SendWhatSappMessage,
  };

  const executeWorkflow = async (workflow: Workflow): Promise<void> => {
    let stepData: any = null;
    const sortedSteps = workflow.steps.sort(
      (a, b) => a.stepOrder - b.stepOrder
    );

    for (const step of sortedSteps) {
      const ActionClass = actionRegistry[step.actionName];
      if (!ActionClass) {
        throw new Error(`Action type ${step.actionName} not supported.`);
      }

      const action = ActionClass(step.actionParameters);
      if (!action.validateParameters()) {
        throw new Error(
          `Invalid parameters for action type ${step.actionType}.`
        );
      }

      // Execute the action and pass the result to the next step
      stepData = await action.execute(stepData); // Pass data between steps if needed
      console.log(`Step ${step.stepOrder} result:`, stepData);
    }
  };

  return {
    executeWorkflow,
  };
};
