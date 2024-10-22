const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const patientResolvers = {
    Query: {
        patient: async (_, { id }) => {
            return await prisma.patient.findUnique({
                where: { id: parseInt(id) },
                include: { user: true, doctor: true },
            });
        },
        patients: async () => {
            return await prisma.patient.findMany({
                include: { user: true, doctor: true },
            });
        },
    },

    Mutation: {
        createPatient: async (_, { patientInput }) => {
            const { userId, medicalHistory, doctorId } = patientInput;
            return await prisma.patient.create({
                data: {
                    userId,
                    medicalHistory,
                    doctorId,
                },
                include: { user: true, doctor: true },
            });
        },
    },

    Patient: {
        user: async (parent) => {
            return await prisma.user.findUnique({ where: { id: parent.userId } });
        },
        doctor: async (parent) => {
            return await prisma.doctor.findUnique({ where: { id: parent.doctorId } });
        },
    },
};

module.exports = patientResolvers;
