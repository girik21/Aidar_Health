const { buildSchema } = require('graphql');

const userSchema = buildSchema(`

    enum Roles {
        ADMIN
        DOCTOR
        PATIENT
        UNASSIGNED
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        role: Roles
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getAllUsers: [User!]!
    }

    type Mutation {
        createUser(userInput: UserInput!): User!
    }
`);

module.exports = userSchema;
