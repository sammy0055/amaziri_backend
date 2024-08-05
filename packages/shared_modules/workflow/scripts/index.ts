import { PromptTemplate } from "@langchain/core/prompts";
import {
  WorkflowActionEntry,
  SubmitedContentEntry,
  connect,
  WorkflowEntry,
} from "amazir_data_model";
import { actions } from "../src/data/actions/content_creation";
import { connectToMongoDB, disconnectFromMongoDB } from "./mongo";
import { WorkflowEngine } from "../src/engine/wokflowEngine";
const test = async () => {
  // await SubmitedContentEntry.create(actions);
  const workflow = await WorkflowEntry.findById("66a20dba8e044cfede3c842c");
  const engine = new WorkflowEngine();
  engine.on("success", ({ data }) => {
    console.log("====================================");
    console.log(data.node.data);
    console.log("previous result");
    console.log(data.previousResult);
    console.log("====================================");
  });

  await engine.workflowRunner({ workflow });
};
connectToMongoDB();
test();
disconnectFromMongoDB();
