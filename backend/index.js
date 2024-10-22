const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv').config();

const typeDefs = require('./schema/index'); // combined schemas
const resolvers = require('./resolvers/index'); // combined resolvers

const app = express();
const PORT = process.env.PORT || 3000;


// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Context can to be used for authentication here, etc.
        return { user: req.user };
    },
});

// Apply Apollo middleware to Express app
server.start().then(res => {
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
