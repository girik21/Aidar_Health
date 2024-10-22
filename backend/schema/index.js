const { mergeTypeDefs } = require('@graphql-tools/merge');
const userSchema = require('./userSchema');
// const doctorSchema = require('./doctorSchema'); // For doctor schema later
// const patientSchema = require('./patientSchema'); // For patient schema later

// Merge all schemas into one
const typeDefs = mergeTypeDefs([userSchema]);

module.exports = typeDefs;
