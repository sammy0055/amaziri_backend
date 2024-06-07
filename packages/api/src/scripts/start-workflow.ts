import { generateTextWithKnowledgeBaseAssistantData } from "../data/workflow/actionsData/text-generator";
import { sendWhatSappMessagesData } from "../data/workflow/actionsData/whatsapp";
import { WorkflowEngine, Workflow } from "amaziri_workflow";

const generateTextData = {
  ...generateTextWithKnowledgeBaseAssistantData,
  stepOrder: 1,
};
const sendMessageData = { ...sendWhatSappMessagesData, stepOrder: 0 };
const workflowData: Workflow = {
  organization: "43243212rewr",
  workflowName: "test work flow",
  createdAt: new Date(),
  updatedAt: new Date(),
  steps: [sendMessageData, generateTextData],
};

const fun = async () => {
  const engine = new WorkflowEngine();
  // const data = await executeWorkflow(workflowData);

  engine.on("stepResult", (result) => {
    console.log("====================================");
    console.log("result", result);
    console.log("====================================");
  });

  await engine.executeWorkflow(workflowData);
};

fun();
