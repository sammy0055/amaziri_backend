import { ActionType, Action, Workflow } from "../../types/workflow";

abstract class BaseAction {
  constructor(public parameters: any) {}

  abstract execute(data: any): Promise<any>;
  abstract validateParameters(): boolean;
}

class SocialAccountIntegration extends BaseAction {
  async execute(data: Action): Promise<any> {
    // Implementation for social account integration
    console.log("Integrating social account with parameters:", this.parameters);
    return data;
  }

  validateParameters(): boolean {
    // Validate parameters specific to social account integration
    this.parameters;
    return true;
  }
}

class MonitorInbox extends BaseAction {
  async execute(data: any): Promise<any> {
    // Implementation for monitoring inbox
    console.log("Monitoring inbox with parameters:", this.parameters);
    return data;
  }

  validateParameters(): boolean {
    // Validate parameters specific to monitoring inbox
    return true;
  }
}

class ResponseWithKnowledgebase extends BaseAction {
  async execute(data: any): Promise<any> {
    // Implementation for responding with knowledgebase
    console.log(
      "Responding with knowledgebase with parameters:",
      this.parameters
    );
    return data;
  }

  validateParameters(): boolean {
    // Validate parameters specific to responding with knowledgebase
    return true;
  }
}

class AddXAccount extends BaseAction {
  async execute(data: any): Promise<any> {
    // Implementation for responding with knowledgebase
    console.log(
      "Responding with knowledgebase with parameters:",
      this.parameters
    );
    return data;
  }

  validateParameters(): boolean {
    // Validate parameters specific to responding with knowledgebase
    return true;
  }
}

class WorkflowEngine {
  private actionRegistry: { [key in ActionType]: any } = {
    [ActionType.Trigger]: null, // Implement trigger action if needed
    [ActionType.Integration]: SocialAccountIntegration,
    [ActionType.Monitor]: MonitorInbox,
    [ActionType.Response]: ResponseWithKnowledgebase,
    [ActionType.addXAccount]: AddXAccount,
  };


  async executeWorkflow(workflow: Workflow): Promise<void> {
    for (const step of workflow.steps) {
      const ActionClass = this.actionRegistry[step.actionType];
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
      const result = await action.execute(null); // Pass data between steps if needed
      console.log(`Step ${step.stepOrder} result:`, result);
    }
  }
}
