const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const doctorResolvers = {
    Query: {
        doctor: async (_, { id }) => {
            return await prisma.doctor.findUnique({
                where: { id: parseInt(id) },
                include: { user: true, patients: true },
            });
        },
        doctors: async () => {
            return await prisma.doctor.findMany({
                include: { user: true, patients: true },
            });
        },
    },

    Mutation: {
        createDoctor: async (_, { doctorInput }) => {
            const { userId, specialty } = doctorInput;
            return await prisma.doctor.create({
                data: {
                    userId,
                    specialty,
                },
                include: { user: true },
            });
        },
    },

    Doctor: {
        user: async (parent) => {
            return await prisma.user.findUnique({ where: { id: parent.userId } });
        },
        patients: async (parent) => {
            return await prisma.patient.findMany({ where: { doctorId: parent.id } });
        },
    },
};

module.exports = doctorResolvers;
