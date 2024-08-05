import Agenda, { Job, JobAttributesData } from "agenda";

import {
  GenerateTextWithkowledgeBaseAssistant,
  SendWhatSappMessage,
} from "../../actions";
import {
  ContentApproval,
  ContentGeneration,
  ContentSuggestion,
} from "../../actions/content_creation";
import { ActionNames, ActionNode, Workflow } from "../../types";
import { getEnv } from "../../utils";
import EventEmitter from "events";

const agenda = new Agenda({ db: { address: getEnv("MONGO_URI")! } });

type ActionRegistry = {
  [key in ActionNames]: any;
};

interface JobWorkflowParams extends JobAttributesData {
  workflow: Workflow;
  node: ActionNode;
  previousResult: any;
}

const actionRegistry: ActionRegistry = {
  [ActionNames.SEND_MESSAGES]: SendWhatSappMessage,
  [ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT]:
    GenerateTextWithkowledgeBaseAssistant,
  [ActionNames.Content_Suggestion]: ContentSuggestion,
  [ActionNames.Content_Generation]: ContentGeneration,
  [ActionNames.Content_Approval]: ContentApproval,
};

agenda.define("process node", async (job: Job<JobWorkflowParams>) => {
  const { workflow, node, previousResult } = job.attrs.data;
  const { nodes, edges } = workflow.steps;
  const nodeTaskRunner = actionRegistry[node.data.actionName];
  let action = await nodeTaskRunner(node.data.actionParameters);
  // if (!action.validateParameters()) {
  //   throw new Error(
  //     `Invalid parameters for action type ${node.data.actionName}.`
  //   );
  // }
  const result = await action.execute(node, previousResult);
  nodes?.forEach((_node) => {
    if (_node.id === node.id) node.data.result = result || null;
  });

  const nextEdges = edges?.filter((edge) => edge.source === node.id);
  if (nextEdges)
    for (const edge of nextEdges) {
      const nextNode = nodes?.find(({ id }) => id === edge.target);
      if (nextNode)
        // normaly you will add task to the queue here
        await agenda.schedule("in 1 second", "process node", {
          workflow: workflow,
          node: nextNode,
          previousResult: result,
        });
    }
});

agenda.on("error", (job) => {
  console.log("Job %s error", job.attrs.name);
});

agenda.on("complete", async (job) => {
  await job.remove();
});

const workflowExecution = async (workflow: Workflow) => {
  // add actionNode to queue
  const { nodes, edges } = workflow?.steps;
  const triggerNode = nodes.find((node) => node.data.trigger);
  if (!triggerNode) throw new Error("trigger node was not found");
  await agenda.now("process node", {
    workflow: workflow,
    node: triggerNode,
    previousResult: null,
  });
};

export class RunWorkflow extends EventEmitter {
  workflowRunner = async ({ workflow }: { workflow: Workflow }) => {
    await workflowExecution(workflow);
    console.log("Initial trigger nodes enqueued.");
    await agenda.start();
    console.log("Agenda started.");
  };
}

export class WorkflowEngine extends EventEmitter {
  workflowRunner = async ({ workflow }: { workflow: Workflow }) => {
    await workflowExecution(workflow);
    console.log("Initial trigger nodes enqueued.");
    await agenda.start();
    console.log("Agenda started.");

    agenda.on("success", (job) => {
      const { workflow, node, previousResult } = job.attrs.data;
      console.log(`Job ${job.attrs.name} finished`);
      this.emit("success", {
        data: { node, previousResult },
      });
    });

    agenda.on("fail", (err, job) => {
      const { workflow, node, previousResult } = job.attrs.data;
      this.emit("success", {
        error: { node, previousResult },
      });
    });
  };
}
