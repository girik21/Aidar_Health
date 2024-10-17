const express = require("express");
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')


const app = express();

// Parse the data with JSON

app.use(bodyParser.json())

// Setup endpoint for the graphQl

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(
        `
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery,
            mutation: RootMutation
        }
        `
    ),
    rootValue: {
        events: () => {
            return ["Romantic", "Sailing", "All Night"]
        },

        createEvent: (args) => {
            const eventName = args.name
            return eventName
        }
    },
    graphiql:  true
}))


// Listening port of the app
app.listen(3200);
