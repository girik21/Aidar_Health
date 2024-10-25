import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { UPDATE_PATIENT_THRESHOLD } from '../graphql/mutations';
import { GET_PATIENT_THRESHOLDS } from '../graphql/queries';

interface User {
    username: string;
}

interface Patient {
    id: string;
    user: User;
}

interface PatientThreshold {
    id: string;
    metricType: string;
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
    const [updateThreshold] = useMutation(UPDATE_PATIENT_THRESHOLD);

    useEffect(() => {
        if (data) {
            console.log('Data fetched:', data);
            setThresholds(data.patientThresholds);
        }
    }, [data]);

    const handleEditClick = (threshold: PatientThreshold) => {
        setCurrentThreshold(threshold);
        setEditMode(true);
    };

    const handleUpdateThreshold = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentThreshold) {
            const { id, patient } = currentThreshold;
            const patientId = parseInt(patient.id);

            const { metricType, minValue, maxValue, notes } = currentThreshold;

            // Prepare the patientThresholdInput object
            const patientThresholdInput = {
                patientId,
                metricType,
                minValue: parseFloat(minValue.toString()), 
                maxValue: parseFloat(maxValue.toString()),
                notes,
            };

            try {
                await updateThreshold({
                    variables: { id: parseInt(id), patientThresholdInput },
                    refetchQueries: [{ query: GET_PATIENT_THRESHOLDS }],
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
            setCurrentThreshold({ ...currentThreshold, [name]: value });
        }
    };

    if (loading) return <LoadingSpinner size="large" message="Loading thresholds..." />;
    if (error) return <div>Error fetching thresholds: {error.message}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Patient Thresholds</h2>

            {editMode && currentThreshold && (
                <form onSubmit={handleUpdateThreshold} className="mb-6">
                    <h3 className="text-xl mb-2">Edit Threshold</h3>
                    <div>
                        <label>Metric Type:</label>
                        <input
                            type="text"
                            name="metricType"
                            value={currentThreshold.metricType}
                            onChange={handleChange}
                            className="border p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Min Value:</label>
                        <input
                            type="number"
                            name="minValue"
                            value={currentThreshold.minValue}
                            onChange={handleChange}
                            className="border p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Max Value:</label>
                        <input
                            type="number"
                            name="maxValue"
                            value={currentThreshold.maxValue}
                            onChange={handleChange}
                            className="border p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Notes:</label>
                        <input
                            type="text"
                            name="notes"
                            value={currentThreshold.notes}
                            onChange={handleChange}
                            className="border p-2 mb-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2">Update</button>
                    <button type="button" onClick={() => setEditMode(false)} className="ml-2 p-2">Cancel</button>
                </form>
            )}

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left">Patient Username</th>
                        <th className="border-b p-4 text-left">Metric Type</th>
                        <th className="border-b p-4 text-left">Min Value</th>
                        <th className="border-b p-4 text-left">Max Value</th>
                        <th className="border-b p-4 text-left">Notes</th>
                        <th className="border-b p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {thresholds.map((threshold) => {
                        const username = threshold.patient?.user?.username || 'N/A';
                        return (
                            <tr key={threshold.id}>
                                <td className="border-b p-4">{username}</td>
                                <td className="border-b p-4">{threshold.metricType}</td>
                                <td className="border-b p-4">{threshold.minValue}</td>
                                <td className="border-b p-4">{threshold.maxValue}</td>
                                <td className="border-b p-4">{threshold.notes}</td>
                                <td className="border-b p-4">
                                    <button onClick={() => handleEditClick(threshold)} className="text-blue-500">Edit</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
