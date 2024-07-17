import { PromptTemplate } from "@langchain/core/prompts";
import { WorkflowActionEntry, SubmitedContentEntry, connect } from "amazir_data_model";
import { actions } from "../src/data/actions/content_creation";
import { connectToMongoDB } from "./mongo";

const content = {
    
}
const test = async () => {
  await SubmitedContentEntry.create(actions);
};
// connectToMongoDB();
test();
// disconnectFromMongoDB()
