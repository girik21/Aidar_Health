const { gql } = require('apollo-server-express');

const doctorSchema = gql`
    type Doctor {
        id: ID!
        userId: Int!
        specialty: String!
        user: User!
        patients: [Patient!]!
    }

    input DoctorInput {
        userId: Int!
        specialty: String!
    }

    extend type Query {
        doctor(id: Int!): Doctor
        doctors: [Doctor!]!
    }

    extend type Mutation {
        createDoctor(doctorInput: DoctorInput!): Doctor!
    }
`;

module.exports = doctorSchema;
