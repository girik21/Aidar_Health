const { gql } = require('apollo-server-express');

const authSchema = gql`
    extend type Mutation {
        signup(userInput: UserInput!): AuthResponse!
        login(email: String!, password: String!): AuthResponse!
    }

    type AuthResponse {
        user: User!
        token: String!
    }
`;

module.exports = authSchema;
