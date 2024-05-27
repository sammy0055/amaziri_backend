import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
const server = new ApolloServer({
  typeDefs,
  resolvers,
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
