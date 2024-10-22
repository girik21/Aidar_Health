const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./userResolvers');
const doctorResolvers = require('./doctorResolvers'); // For doctor resolvers later
const patientResolvers = require('./patientResolvers'); // For patient resolvers later

// Merge all resolvers into one

const resolvers = mergeResolvers([userResolvers, doctorResolvers, patientResolvers]);

module.exports = resolvers;
