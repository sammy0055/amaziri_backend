import EventEmitter from "events";
import { ActionNames, Workflow } from "../../types";
import {
  GenerateTextWithkowledgeBaseAssistant,
  SendWhatSappMessage,
} from "../../actions";

type ActionRegistry = {
  [key in ActionNames]: any;
};

class WorkflowEngine extends EventEmitter {
  protected actionRegistry: ActionRegistry = {
    [ActionNames.SEND_MESSAGES]: SendWhatSappMessage,
    [ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT]:
      GenerateTextWithkowledgeBaseAssistant,
  };

  executeWorkflow = async (workflow: Workflow): Promise<void> => {
    let stepData: any = null;
    const sortedSteps = workflow.steps.sort(
      (a, b) => a.stepOrder - b.stepOrder
    );

    for (const step of sortedSteps) {
      const ActionClass = this.actionRegistry[step.actionName];
      if (!ActionClass) {
        throw new Error(`Action type ${step.actionName} not supported.`);
      }

      const action = ActionClass(step.actionParameters as any);
      if (!action.validateParameters()) {
        throw new Error(
          `Invalid parameters for action type ${step.actionType}.`
        );
      }

      // Execute the action and pass the result to the next step
      stepData = await action.execute(stepData); // Pass data between steps if needed

      // Emit an event with the step result
      this.emit("stepResult", {
        stepOrder: step.stepOrder,
        result: stepData,
        actionName: step.actionName,
      });
    }
  };
}

export { WorkflowEngine };
