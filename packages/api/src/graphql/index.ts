import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { ValidateActionParametersDirective } from "./directives/workflow";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithDirectives =
  ValidateActionParametersDirective("actionParameters")(schema);

const server = new ApolloServer({
  schema: schemaWithDirectives,
});

const startApolloServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return { ContextFunctionArgument: { req, res } };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

export default startApolloServer;
