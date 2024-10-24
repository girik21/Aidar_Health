const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./userResolvers');
const doctorResolvers = require('./doctorResolvers');
const patientResolvers = require('./patientResolvers');
const healthRecordResolvers = require('./healthRecordResolvers');
const patientThresholdResolvers = require('./thresholdResolvers');
const alertResolvers = require('./alertResolvers');
const authResolvers = require('../auth/authResolvers')

const resolvers = mergeResolvers([
    userResolvers,
    doctorResolvers,
    patientResolvers,
    healthRecordResolvers,
    patientThresholdResolvers,
    alertResolvers,
    authResolvers
]);

module.exports = resolvers;
