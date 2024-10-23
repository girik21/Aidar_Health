const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const alertResolvers = {
    Query: {
        alert: async (_, { id }) => {
            return await prisma.alert.findUnique({
                where: { id: parseInt(id) },
                include: { healthRecord: true, doctor: true },
            });
        },
        alerts: async () => {
            return await prisma.alert.findMany({
                include: { healthRecord: true, doctor: true },
            });
        },
    },

    Mutation: {
        createAlert: async (_, { alertInput }) => {
            const { healthRecordId, doctorId, message, severity } = alertInput;
            return await prisma.alert.create({
                data: {
                    healthRecordId,
                    doctorId,
                    message,
                    severity,
                },
                include: { healthRecord: true, doctor: true },
            });
        },

        markAlertAsRead: async (_, { id }) => {
            return await prisma.alert.update({
                where: { id: parseInt(id) },
                data: {
                    isRead: true,
                },
                include: { healthRecord: true, doctor: true },
            });
        },
    },

    Alert: {
        healthRecord: async (parent) => {
            return await prisma.healthRecord.findUnique({ where: { id: parent.healthRecordId } });
        },
        doctor: async (parent) => {
            return await prisma.doctor.findUnique({ where: { id: parent.doctorId } });
        },
    },
};

module.exports = alertResolvers;
