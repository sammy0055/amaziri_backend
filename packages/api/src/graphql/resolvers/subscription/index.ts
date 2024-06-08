import { pubsub } from "./test-sub";
import { withFilter } from "graphql-subscriptions";

export const subscriptions = {
  postCreated: {
    subscribe: withFilter(
      () => {
        console.log("Subscribed to POST_CREATED");
        return pubsub.asyncIterator(["POST_CREATED"]);
      },
      (payload, variables) => {
        console.log("====================================");
        console.log(payload);
        console.log("====================================");
        return true;
      }
    ),
  },
};
