import { pubsub } from "../..";
import { ObjectId } from "../../../types/common/organization";
import { withFilter } from "graphql-subscriptions";
import { isSubscriptionValid } from "../../../utils/equality-check";
import { WorkflowSubscription } from "../../../types";

interface UserInput {
  workflowId: ObjectId;
}

export const subscriptions = {
  workflowProcess: {
    subscribe: withFilter(
      () => {
        console.log("Subscribed to WorkflowSubscription");
        return pubsub.asyncIterator([WorkflowSubscription.PROCESS_RUNNING]);
      },
      (payload, variables: UserInput) => {
        const idOne = payload.workflowProcess.metaData.workflowId;
        const idTwo = variables.workflowId;
        return isSubscriptionValid(idOne, idTwo);
      }
    ),
  },
};
