import { Workflow } from "../types/workflow";
import { WorkflowEngine } from "../workflow";
import {
  getWhatSappMessagesData,
  sendWhatSappMessagesData,
} from "../workflow/actions/whatsapp-manager";

const workflowData: Workflow = {
  workflowId: "0",
  organization: "43243212rewr",
  workflowName: "test work flow",
  createdAt: new Date(),
  updatedAt: new Date(),
  steps: [sendWhatSappMessagesData, getWhatSappMessagesData],
};

const { executeWorkflow } = new WorkflowEngine();
executeWorkflow(workflowData);
