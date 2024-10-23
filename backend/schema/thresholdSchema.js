const { gql } = require('apollo-server-express');

const thresholdSchema = gql`
    enum MetricType {
        HEART_RATE
        BLOOD_PRESSURE_SYSTOLIC
        BLOOD_PRESSURE_DIASTOLIC
        TEMPERATURE
        OXYGEN_SATURATION
    }

    type PatientThreshold {
        id: ID!
        patientId: Int!
        metricType: MetricType!
        minValue: Float!
        maxValue: Float!
        updatedAt: DateTime!
        notes: String
        patient: Patient!
    }

    input PatientThresholdInput {
        patientId: Int!
        metricType: MetricType!
        minValue: Float!
        maxValue: Float!
        notes: String
    }

    extend type Query {
        patientThreshold(id: Int!): PatientThreshold
        patientThresholds: [PatientThreshold!]!
    }

    extend type Mutation {
        createPatientThreshold(patientThresholdInput: PatientThresholdInput!): PatientThreshold!
        updatePatientThreshold(id: Int!, patientThresholdInput: PatientThresholdInput!): PatientThreshold!
    }
`;

module.exports = thresholdSchema;
