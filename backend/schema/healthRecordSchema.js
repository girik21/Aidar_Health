const { gql } = require('apollo-server-express');

const healthRecordSchema = gql`
    type HealthRecord {
        id: ID!
        patientId: Int!
        heartRate: Float
        bloodPressureSystolic: Float
        bloodPressureDiastolic: Float
        temperature: Float
        oxygenSaturation: Float
        timestamp: DateTime!
        patient: Patient!
    }

    input HealthRecordInput {
        patientId: Int!
        heartRate: Float
        bloodPressureSystolic: Float
        bloodPressureDiastolic: Float
        temperature: Float
        oxygenSaturation: Float
    }

    extend type Query {
        healthRecord(id: Int!): HealthRecord
        healthRecords: [HealthRecord!]!
    }

    extend type Mutation {
        createHealthRecord(healthRecordInput: HealthRecordInput!): HealthRecord!
    }
`;

module.exports = healthRecordSchema;
