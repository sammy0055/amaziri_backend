import { pubsub } from "../..";
import { ObjectId } from "../../../types/common/organization";
import { withFilter } from "graphql-subscriptions";
import { isSubscriptionValid } from "../../../utils/equality-check";

interface UserInput {
  workflowId: ObjectId;
}

export const subscriptions = {
  postCreated: {
    subscribe: withFilter(
      () => {
        console.log("Subscribed to POST_CREATED");
        return pubsub.asyncIterator(["POST_CREATED"]);
      },
      (payload, variables: UserInput) => {
        const idOne = payload.postCreated.metaData.workflowId;
        const idTwo = variables.workflowId;
        return isSubscriptionValid(idOne, idTwo);
      }
    ),
  },
};
