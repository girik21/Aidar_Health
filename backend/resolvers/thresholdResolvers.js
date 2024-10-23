const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const thresholdResolvers = {
    Query: {
        patientThreshold: async (_, { id }) => {
            return await prisma.patientThreshold.findUnique({
                where: { id: parseInt(id) },
                include: { patient: true },
            });
        },
        patientThresholds: async () => {
            return await prisma.patientThreshold.findMany({
                include: { patient: true },
            });
        },
    },

    Mutation: {
        createPatientThreshold: async (_, { patientThresholdInput }) => {
            const { patientId, metricType, minValue, maxValue, notes } = patientThresholdInput;
            return await prisma.patientThreshold.create({
                data: {
                    patientId,
                    metricType,
                    minValue,
                    maxValue,
                    notes,
                },
                include: { patient: true },
            });
        },

        updatePatientThreshold: async (_, { id, patientThresholdInput }) => {
            const { metricType, minValue, maxValue, notes } = patientThresholdInput;
            return await prisma.patientThreshold.update({
                where: { id: parseInt(id) },
                data: {
                    metricType,
                    minValue,
                    maxValue,
                    notes,
                },
                include: { patient: true },
            });
        },
    },

    PatientThreshold: {
        patient: async (parent) => {
            return await prisma.patient.findUnique({ where: { id: parent.patientId } });
        },
    },
};

module.exports = thresholdResolvers;
