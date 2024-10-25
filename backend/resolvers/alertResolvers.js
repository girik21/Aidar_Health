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
    createAlert: async (_, { alertInput }, { pubsub }) => {
      const { healthRecordId, doctorId, message, severity } = alertInput;
      const newAlert = await prisma.alert.create({
        data: {
          healthRecordId,
          doctorId,
          message,
          severity,
        },
        include: { healthRecord: true, doctor: true },
      });

      // Publish the new alert
      pubsub.publish('ALERT_CREATED', { alertCreated: newAlert });
      return newAlert;
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

  Subscription: {
    alertCreated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['ALERT_CREATED']),
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
