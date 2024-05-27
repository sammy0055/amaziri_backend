import { GraphQLError } from "graphql";
export const errorHandler = (error: any) => {
  console.log(error);
  const message = error.message || "somthing went wrong";
  throw new GraphQLError(message, {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};
