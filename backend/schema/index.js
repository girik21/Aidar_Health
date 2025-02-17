const { mergeTypeDefs } = require('@graphql-tools/merge');
const { DateTimeResolver } = require('graphql-scalars');
const userSchema = require('./userSchema');
const doctorSchema = require('./doctorSchema');
const patientSchema = require('./patientSchema');
const healthRecordSchema = require('./healthRecordSchema');
const thresholdSchema = require('./thresholdSchema');
const alertSchema = require('./alertSchema');
const authSchema = require('../auth/authSchema')

const baseSchema = `
    scalar DateTime
`;

const typeDefs = mergeTypeDefs([baseSchema, userSchema, doctorSchema, patientSchema, healthRecordSchema, thresholdSchema, alertSchema, authSchema]);

module.exports = typeDefs;
