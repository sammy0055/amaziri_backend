import { ActionNames, Workflow } from "../types/workflow";
import {
  GetUnreadMessages,
  SendWhatSappMessages,
} from "./actions/whatsapp-manager";

export abstract class BaseAction {
  constructor(public parameters: any) {}

  abstract execute(data: any): Promise<any>;
  abstract validateParameters(): boolean;
}

export class WorkflowEngine {
  protected actionRegistry: { [key in ActionNames]: any };

  constructor() {
    this.actionRegistry = {
      [ActionNames.GET_UNREAD_MESSAGES]: GetUnreadMessages,
      [ActionNames.SEND_MESSAGES]: SendWhatSappMessages,
    };
    this.executeWorkflow = this.executeWorkflow.bind(this);
  }

  async executeWorkflow(workflow: Workflow): Promise<void> {
    let stepData: any = null;
    const sortedSteps = workflow.steps.sort(
      (a, b) => a.stepOrder - b.stepOrder
    );

       for (const step of sortedSteps) {
         const ActionClass = this.actionRegistry[step.actionName];
         if (!ActionClass) {
           throw new Error(`Action type ${step.actionType} not supported.`);
         }

         const action = new ActionClass(step.actionParameters);
         if (!action.validateParameters()) {
           throw new Error(
             `Invalid parameters for action type ${step.actionType}.`
           );
         }

         // Execute the action and pass the result to the next step
         stepData = await action.execute(stepData); // Pass data between steps if needed
         console.log(`Step ${step.stepOrder} result:`, stepData);
       }
 
  }
}
