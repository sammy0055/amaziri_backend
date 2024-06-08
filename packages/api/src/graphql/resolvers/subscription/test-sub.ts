import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

export const postCreated = () => {
  console.log("Publishing POST_CREATED event");
  pubsub.publish("POST_CREATED", {
    postCreated: {
      author: "Ali Baba",
      comment: "Open sesame",
    },
  });
};
