const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const healthRecordResolvers = {
    Query: {
        healthRecords: async (_, { sortOrder = 'DESC' }) => {
            return await prisma.healthRecord.findMany({
                orderBy: { timestamp: sortOrder === 'DESC' ? 'desc' : 'asc' },
                include: { patient: true },
            });
        },
    },

    Mutation: {
        createHealthRecord: async (_, { healthRecordInput }, { pubsub }) => {
            const newRecord = await prisma.healthRecord.create({
                data: healthRecordInput,
                include: { patient: true },
            });

            console.log("New Health Record Created:", newRecord);

            const patientId = healthRecordInput.patientId;

            // Retrieve patient thresholds for the patient
            const patientThresholds = await prisma.patientThreshold.findMany({
                where: { patientId },
            });

            console.log("Patient Thresholds:", patientThresholds);

            // Check each threshold against the new health record
            for (const threshold of patientThresholds) {
                let metricValue;

                // Determine which metric to check
                switch (threshold.metricType) {
                    case 'HEART_RATE':
                        metricValue = newRecord.heartRate;
                        break;
                    case 'BLOOD_PRESSURE_SYSTOLIC':
                        metricValue = newRecord.bloodPressureSystolic;
                        break;
                    case 'BLOOD_PRESSURE_DIASTOLIC':
                        metricValue = newRecord.bloodPressureDiastolic;
                        break;
                    case 'TEMPERATURE':
                        metricValue = newRecord.temperature;
                        break;
                    case 'OXYGEN_SATURATION':
                        metricValue = newRecord.oxygenSaturation;
                        break;
                    default:
                        console.warn(`Unknown metric type: ${threshold.metricType}`);
                        continue; // Skip to the next threshold
                }

                console.log(`Checking ${threshold.metricType} value ${metricValue} against thresholds: min ${threshold.minValue}, max ${threshold.maxValue}`);

                // Check if the metric value is out of range
                if (metricValue < threshold.minValue || metricValue > threshold.maxValue) {
                    const alertMessage = `${threshold.metricType} needs to be: ${metricValue}`;
                    const severity = Math.abs(metricValue - threshold.minValue) > 10 ||
                        Math.abs(metricValue - threshold.maxValue) > 10
                        ? "HIGH" : "MEDIUM";

                    const newAlert = await prisma.alert.create({
                        data: {
                            healthRecordId: newRecord.id,
                            doctorId: newRecord.patient.doctorId,
                            message: alertMessage,
                            severity,
                        },
                    });

                    pubsub.publish("ALERT_CREATED", { alertCreated: newAlert });
                }
            }

            return newRecord;
        },
    },



    HealthRecord: {
        patient: async (parent) => {
            return await prisma.patient.findUnique({ where: { id: parent.patientId } });
        },
    },
};

module.exports = healthRecordResolvers;
