const express = require("express");
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')
const dotenv = require('dotenv').config();
const schema = require('./schema/schema')
const resolvers = require('./resolvers/resolvers')


// Initialize Express & Port & data with JSON

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3200;


// Setup endpoint for the graphQl

app.use('/graphql', graphqlHTTP((req) => ({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}))
);


// Listening port of the app

app.listen((PORT), () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
