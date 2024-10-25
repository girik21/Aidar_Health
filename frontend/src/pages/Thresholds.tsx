import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
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

    useEffect(() => {
        if (data) {
            console.log('Data fetched:', data);
            setThresholds(data.patientThresholds);
        }
    }, [data]);

    if (loading) return <LoadingSpinner size="large" message="Loading thresholds..." />;
    if (error) return <div>Error fetching thresholds: {error.message}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Patient Thresholds</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left">Patient Username</th>
                        <th className="border-b p-4 text-left">Metric Type</th>
                        <th className="border-b p-4 text-left">Min Value</th>
                        <th className="border-b p-4 text-left">Max Value</th>
                        <th className="border-b p-4 text-left">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {thresholds.map((threshold) => {
                        const username = threshold.patient?.user?.username || 'N/A'; // Fallback to 'N/A'
                        console.log(`Threshold ID: ${threshold.id}, Username: ${username}`); // Log threshold and username
                        return (
                            <tr key={threshold.id}>
                                <td className="border-b p-4">{username}</td>
                                <td className="border-b p-4">{threshold.metricType}</td>
                                <td className="border-b p-4">{threshold.minValue}</td>
                                <td className="border-b p-4">{threshold.maxValue}</td>
                                <td className="border-b p-4">{threshold.notes}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
