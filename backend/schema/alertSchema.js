const { gql } = require('apollo-server-express');

const alertSchema = gql`
    type Alert {
        id: ID!
        healthRecordId: Int!
        doctorId: Int!
        message: String!
        timestamp: DateTime!
        isRead: Boolean!
        severity: String!
        healthRecord: HealthRecord!
        doctor: Doctor!
    }

    input AlertInput {
        healthRecordId: Int!
        doctorId: Int!
        message: String!
        severity: String!
    }

    extend type Query {
        alert(id: Int!): Alert
        alerts: [Alert!]!
    }

    extend type Mutation {
        createAlert(alertInput: AlertInput!): Alert!
        markAlertAsRead(id: Int!): Alert!
    }
`;

module.exports = alertSchema;
