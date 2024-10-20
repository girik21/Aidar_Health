// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv').config();
const userSchema = require('./schema/userSchema'); 
const userResolvers = require('./resolvers/userResolvers');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Setup endpoint for GraphQL
app.use('/graphql', graphqlHTTP({
    schema: userSchema,
    rootValue: userResolvers,
    graphiql: true,
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
