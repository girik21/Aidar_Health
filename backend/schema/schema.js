const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  enum UserRole {
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
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Doctor {
    id: ID!
    user: User!
    specialization: String!
  }

  input DoctorInput {
    specialization: String!
  }

  type Patient {
    id: ID!
    user: User!
    doctor: Doctor!
  }
  
  input PatientInput {
    userId: ID!
    doctorId: ID!
  }

  type Query {
    getAllUsers: [User!]!
    getAllPatients: [Patient!]!
    getAllDoctors: [Doctor!]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User!
    createPatient(patitentInput: PatientInput): Patient!
    assignRole(userId: ID!, role: UserRole!): User!
    createDoctor(doctorInput: DoctorInput): Doctor!
  }
`);
