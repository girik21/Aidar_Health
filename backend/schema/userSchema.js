const { gql } = require('apollo-server-express');

const userSchema = gql`
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
        roles: Roles
        doctor: Doctor
        patient: Patient
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input AssignRoleInput {
        userId: ID!
        role: Roles!
    }

    type Query {
        getAllUsers: [User!]!
    }

    type Mutation {
        createUser(userInput: UserInput!): User!
        assignRole(assignRoleInput: AssignRoleInput): User!
    }
`;

module.exports = userSchema;
