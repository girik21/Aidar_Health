const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const healthRecordResolvers = {
    Query: {
        healthRecord: async (_, { id }) => {
            return await prisma.healthRecord.findUnique({
                where: { id: parseInt(id) },
                include: { patient: true },
            });
        },
        healthRecords: async () => {
            return await prisma.healthRecord.findMany({
                include: { patient: true },
            });
        },
    },

    Mutation: {
        createHealthRecord: async (_, { healthRecordInput }) => {
            const { patientId, heartRate, bloodPressureSystolic, bloodPressureDiastolic, temperature, oxygenSaturation } = healthRecordInput;
            return await prisma.healthRecord.create({
                data: {
                    patientId,
                    heartRate,
                    bloodPressureSystolic,
                    bloodPressureDiastolic,
                    temperature,
                    oxygenSaturation,
                },
                include: { patient: true },
            });
        },
    },

    HealthRecord: {
        patient: async (parent) => {
            return await prisma.patient.findUnique({ where: { id: parent.patientId } });
        },
    },
};

module.exports = healthRecordResolvers;
