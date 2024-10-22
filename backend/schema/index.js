const { mergeTypeDefs } = require('@graphql-tools/merge');
const userSchema = require('./userSchema');
const doctorSchema = require('./doctorSchema');
const patientSchema = require('./patientSchema');

// Merge all schemas into one
const typeDefs = mergeTypeDefs([userSchema, doctorSchema, patientSchema]);

module.exports = typeDefs;
