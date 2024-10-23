const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv').config();
const { verifyToken } = require('./auth/auth')

const typeDefs = require('./schema/index'); // combined schemas
const resolvers = require('./resolvers/index'); // combined resolvers

const app = express();
const PORT = process.env.PORT || 3000;


// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
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

        return { user }; // Include user info in context
    },
});

// Apply Apollo middleware to Express app
server.start().then(res => {
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
