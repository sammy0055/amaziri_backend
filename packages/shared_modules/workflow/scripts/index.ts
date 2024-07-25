import { PromptTemplate } from "@langchain/core/prompts";
import {
  WorkflowActionEntry,
  SubmitedContentEntry,
  connect,
  WorkflowEntry,
} from "amazir_data_model";
import { actions } from "../src/data/actions/content_creation";
import { connectToMongoDB } from "./mongo";
import { WorkflowEngine } from "../src/engine/wokflowEngine";
const test = async () => {
  // await SubmitedContentEntry.create(actions);
  const workflow = await WorkflowEntry.findById("66a20dba8e044cfede3c842c");
  const engine = new WorkflowEngine();
  engine.on("success", (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  });

  await engine.workflowRunner({ workflow });
};
connectToMongoDB();
test();
