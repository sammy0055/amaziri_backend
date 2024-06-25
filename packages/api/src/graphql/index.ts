import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import http from "http";
import express from "express";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { PubSub } from "graphql-subscriptions";
import { verifyUserIdToken } from "../middleware/verifyIdToken";

// import { MongoClient } from "mongodb";
// import { MongodbPubSub } from 'graphql-mongodb-subscriptions';
// import { getEnv } from "../helpers/getEnv";

// const client = new MongoClient(getEnv("MONGO_URI") || "");
export const pubsub = new PubSub();

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = http.createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});

const serverCleanup = useServer(
  {
    schema,
    onConnect: async (ctx) => {
      const token = ctx.connectionParams?.Authorization || "";
      await verifyUserIdToken(token as string);
    },
    onDisconnect: async (ctx) => {
      // console.log("====================================");
      // console.log(`disconnected to web-socket`, ctx);
      // console.log("====================================");
    },
  },
  wsServer
);
const server = new ApolloServer<any>({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const startApolloServer = async () => {
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { ContextFunctionArgument: { req, res } };
      },
    })
  );

  const PORT = 4000;
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, () => {
      console.log(`Server is now running on http://localhost:${PORT}/`);
      return resolve;
    })
  );
};

export default startApolloServer;
