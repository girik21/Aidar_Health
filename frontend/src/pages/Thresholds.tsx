import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";
import { UPDATE_PATIENT_THRESHOLD } from "../graphql/mutations";
import { GET_PATIENT_THRESHOLDS } from "../graphql/queries";

enum MetricType {
    HEART_RATE = 'HEART_RATE',
    BLOOD_PRESSURE_SYSTOLIC = 'BLOOD_PRESSURE_SYSTOLIC',
    BLOOD_PRESSURE_DIASTOLIC = 'BLOOD_PRESSURE_DIASTOLIC',
    TEMPERATURE = 'TEMPERATURE',
    OXYGEN_SATURATION = 'OXYGEN_SATURATION'
}

interface MetricConfig {
    label: string;
    min: number;
    max: number;
    unit: string;
}

const metricConfigs: Record<MetricType, MetricConfig> = {
    [MetricType.HEART_RATE]: {
        label: 'Heart Rate',
        min: 40,
        max: 200,
        unit: 'bpm'
    },
    [MetricType.BLOOD_PRESSURE_SYSTOLIC]: {
        label: 'Blood Pressure (Systolic)',
        min: 70,
        max: 190,
        unit: 'mmHg'
    },
    [MetricType.BLOOD_PRESSURE_DIASTOLIC]: {
        label: 'Blood Pressure (Diastolic)',
        min: 40,
        max: 130,
        unit: 'mmHg'
    },
    [MetricType.TEMPERATURE]: {
        label: 'Temperature',
        min: 35,
        max: 42,
        unit: '°C'
    },
    [MetricType.OXYGEN_SATURATION]: {
        label: 'Oxygen Saturation',
        min: 70,
        max: 100,
        unit: '%'
    }
};

interface User {
    username: string;
}

interface Patient {
    id: string;
    user: User;
}

interface PatientThreshold {
    id: string;
    metricType: MetricType;
    minValue: number;
    maxValue: number;
    updatedAt: string;
    notes: string;
    patient: Patient;
}

export default function Thresholds() {
    const { data, loading, error } = useQuery(GET_PATIENT_THRESHOLDS);
    const [thresholds, setThresholds] = useState<PatientThreshold[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentThreshold, setCurrentThreshold] = useState<PatientThreshold | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [updateThreshold] = useMutation(UPDATE_PATIENT_THRESHOLD);

    useEffect(() => {
        if (data) {
            setThresholds(data.patientThresholds);
        }
    }, [data]);

    const validateThreshold = (threshold: PatientThreshold): boolean => {
        const errors: Record<string, string> = {};
        const config = metricConfigs[threshold.metricType as MetricType];

        if (threshold.minValue < config.min) {
            errors.minValue = `Minimum value cannot be less than ${config.min} ${config.unit}`;
        }
        if (threshold.maxValue > config.max) {
            errors.maxValue = `Maximum value cannot exceed ${config.max} ${config.unit}`;
        }
        if (threshold.minValue >= threshold.maxValue) {
            errors.minValue = 'Minimum value must be less than maximum value';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEditClick = (threshold: PatientThreshold) => {
        setCurrentThreshold(threshold);
        setEditMode(true);
        setValidationErrors({});
    };

    const handleUpdateThreshold = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentThreshold && validateThreshold(currentThreshold)) {
            const { id, patient } = currentThreshold;
            const patientId = parseInt(patient.id);

            try {
                await updateThreshold({
                    variables: {
                        id: parseInt(id),
                        patientThresholdInput: {
                            patientId,
                            metricType: currentThreshold.metricType,
                            minValue: parseFloat(currentThreshold.minValue.toString()),
                            maxValue: parseFloat(currentThreshold.maxValue.toString()),
                            notes: currentThreshold.notes
                        }
                    },
                    refetchQueries: [{ query: GET_PATIENT_THRESHOLDS }]
                });

                setEditMode(false);
                setCurrentThreshold(null);
            } catch (error) {
                console.error("Error updating threshold:", error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (currentThreshold) {
            const updatedThreshold = { ...currentThreshold, [name]: value };
            if (name === 'metricType') {
                const config = metricConfigs[value as MetricType];
                updatedThreshold.minValue = config.min;
                updatedThreshold.maxValue = config.max;
            }
            setCurrentThreshold(updatedThreshold);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
    </div>;
    
    if (error) return <div className="p-4 text-red-500 bg-red-50 rounded">Error fetching thresholds: {error.message}</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Thresholds</h2>

            {editMode && currentThreshold && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <form onSubmit={handleUpdateThreshold}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit Threshold</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Metric Type
                                </label>
                                <select
                                    name="metricType"
                                    value={currentThreshold.metricType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.entries(metricConfigs).map(([key, config]) => (
                                        <option key={key} value={key}>
                                            {config.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Value ({metricConfigs[currentThreshold.metricType as MetricType].unit})
                                </label>
                                <input
                                    type="number"
                                    name="minValue"
                                    value={currentThreshold.minValue}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        ${validationErrors.minValue ? 'border-red-500' : 'border-gray-300'}`}
                                    min={metricConfigs[currentThreshold.metricType as MetricType].min}
                                    max={currentThreshold.maxValue}
                                    step="0.1"
                                />
                                {validationErrors.minValue && (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.minValue}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Value ({metricConfigs[currentThreshold.metricType as MetricType].unit})
                                </label>
                                <input
                                    type="number"
                                    name="maxValue"
                                    value={currentThreshold.maxValue}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        ${validationErrors.maxValue ? 'border-red-500' : 'border-gray-300'}`}
                                    min={currentThreshold.minValue}
                                    max={metricConfigs[currentThreshold.metricType as MetricType].max}
                                    step="0.1"
                                />
                                {validationErrors.maxValue && (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.maxValue}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes
                                </label>
                                <input
                                    type="text"
                                    name="notes"
                                    value={currentThreshold.notes}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    setValidationErrors({});
                                }}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient Username
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Metric Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Min Value
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Max Value
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notes
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {thresholds.map((threshold) => {
                                const username = threshold.patient?.user?.username || 'N/A';
                                const config = metricConfigs[threshold.metricType as MetricType];
                                return (
                                    <tr key={threshold.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {config.label}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {threshold.minValue} {config.unit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {threshold.maxValue} {config.unit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {threshold.notes}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleEditClick(threshold)}
                                                className="text-white font-extrabold bg-blue-600 rounded-xl px-2 py-2"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}