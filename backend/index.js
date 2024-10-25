const { ApolloServer } = require('apollo-server-express');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const express = require('express');
const http = require('http');
const { verifyToken } = require('./auth/auth');
const typeDefs = require('./schema/index');
const resolvers = require('./resolvers/index');


const PORT = process.env.PORT || 3000;
const pubsub = new PubSub(); // To publish and subscribe to events

const app = express();

// Create the schema for ApolloServer
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create HTTP server to handle both HTTP and WebSocket connections
const httpServer = http.createServer(app);

// Set up Apollo Server with subscriptions
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;

    if (token) {
      try {
        user = verifyToken(token);
      } catch (err) {
        console.error("Token verification error:", err);
      }
    }
    return { user, pubsub }; // Pass pubsub to the context
  },
});

// Start Apollo server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Set up WebSocket Server for GraphQL Subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  // Start the HTTP server with WebSocket support
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => {
  console.error("Error starting the server:", err);
});
