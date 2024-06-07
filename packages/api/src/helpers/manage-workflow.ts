import { OrganizationProfileEntry, WorkflowEntry } from "amazir_data_model";
import { Workflow, WorkflowEngine } from "amaziri_workflow";
import { SessionCache } from "./manage-session-cache";
import { ObjectId } from "../types/common/organization";

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
    engine: WorkflowEngine,
    _id: ObjectId
  ) => {
    const workflow = await WorkflowEntry.findById(_id).exec();
    if (!workflow) throw new Error("workflow does not exist");
    return;
  };
}
