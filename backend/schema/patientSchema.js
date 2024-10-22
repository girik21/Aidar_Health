const { gql } = require('apollo-server-express');

const patientSchema = gql`
    type Patient {
        id: ID!
        userId: Int!
        medicalHistory: String!
        doctorId: Int!
        user: User!
        doctor: Doctor!
    }

    input PatientInput {
        userId: Int!
        medicalHistory: String!
        doctorId: Int!
    }

    extend type Query {
        patient(id: Int!): Patient
        patients: [Patient!]!
    }

    extend type Mutation {
        createPatient(patientInput: PatientInput!): Patient!
    }
`;

module.exports = patientSchema;
