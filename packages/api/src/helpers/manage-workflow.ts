import {
  OrganizationProfileEntry,
  WorkflowEntry,
  WorkflowScheduleEntry,
} from "amazir_data_model";
import { Workflow, WorkflowEngine } from "amaziri_workflow";
import { SessionCache } from "./manage-session-cache";
import { ObjectId } from "../types/common/organization";
import { pubsub } from "../graphql";

export class ManageWorkflow {
  protected email: string;
  constructor(email: string) {
    this.email = email;
  }

  addWorkflow = async (workflow: Workflow) => {
    const { getSessionCache } = new SessionCache(this.email);
    const { organizationProfileId } = await getSessionCache();
    const data = await WorkflowEntry.create({
      ...workflow,
      organization: organizationProfileId,
    });

    await OrganizationProfileEntry.findByIdAndUpdate(data.organization, {
      $push: { workflows: data._id },
    });
    return data;
  };

  updateWorkflow = async (workflow: Workflow & { _id: ObjectId }) => {
    const data = WorkflowEntry.findByIdAndUpdate(workflow._id, {
      $set: { ...workflow },
    });
    return data;
  };

  deleteWorkflow = async (_id: ObjectId) => {
    const data = await WorkflowEntry.findByIdAndDelete(_id).exec();
    if (!data) throw new Error("wordflow not longer exist");
    await OrganizationProfileEntry.findByIdAndUpdate(data.organization, {
      $pull: { workflows: _id },
    }).exec();
    return data;
  };

  executeWorkflowAndNotifyUser = async (
    engine: any,
    workflow: Workflow & { _id: string }
  ) => {
    engine.on("sucess", (result) => {
      pubsub.publish("POST_CREATED", {
        postCreated: {
          author: "Ali Baba",
          comment: "Open sesame",
          metaData: {
            workflowId: workflow?._id,
          },
        },
      });
    });
    await engine.executeWorkflow(workflow);
  };

  executeWorkflow = async (engine: WorkflowEngine, _id: ObjectId) => {
    const workflow = await WorkflowEntry.findById(_id).exec();
    if (!workflow) throw new Error("workflow does not exist");
    this.executeWorkflowAndNotifyUser(engine, workflow);

    return workflow as Workflow;
  };

  addWorkflowSchedule = async (data: any) => {
    const { getSessionCache } = new SessionCache(this.email);
    const { organizationProfileId } = await getSessionCache();
    await WorkflowScheduleEntry.create({
      ...data,
      organization: organizationProfileId,
    });
  };
}
