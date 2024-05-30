import { sendWhatSappMessagesData } from "../data/workflow/actionsData/whatsapp";
import { WorkflowEngine, Workflow } from "amaziri_workflow";

const workflowData: Workflow = {
  workflowId: "0",
  organization: "43243212rewr",
  workflowName: "test work flow",
  createdAt: new Date(),
  updatedAt: new Date(),
  steps: [sendWhatSappMessagesData],
};

const { executeWorkflow } = WorkflowEngine();
executeWorkflow(workflowData);
