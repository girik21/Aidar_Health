const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./userResolvers');
const doctorResolvers = require('./doctorResolvers');
const patientResolvers = require('./patientResolvers');

// Merge all resolvers into one
const resolvers = mergeResolvers([userResolvers, doctorResolvers, patientResolvers]);

module.exports = resolvers;
