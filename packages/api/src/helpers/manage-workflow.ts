import { WorkflowEntry } from "amazir_data_model";
import { Workflow } from "amaziri_workflow";
import { SessionCache } from "./manage-session-cache";

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
    return data;
  };
}
