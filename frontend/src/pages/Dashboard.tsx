import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientAlert from '../components/PatientAlert/PatientAlert'; // Import your PatientAlert component
import PatientCarousel from '../components/PatientCarousel/PatientCarousel';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { GET_CRITICAL_ALERTS, GET_CURRENT_DOCTOR, GET_DOCTOR } from '../graphql/queries';

interface User {
    username: string;
}

interface Patient {
    user: User;
    id: string;
    medicalHistory?: string;
}

interface Doctor {
    id: string;
    userId: number;
    patients: Patient[];
}

interface DoctorData {
    doctor: Doctor;
}

interface CurrentDoctorData {
    currentDoctor: Doctor;
}

interface Alert {
    id: string;
    message: string;
    severity: string;
    isRead: boolean;
    timestamp: string;
    healthRecord: {
        patient: {
            user: User;
        };
    };
}

interface AlertsData {
    alerts: Alert[];
}

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState<number | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [alerts, setAlerts] = useState<Alert[]>([]); // State to hold alerts

    // Fetch alerts
    const { data: alertData, loading: alertLoading, error: alertError } = useQuery<AlertsData>(GET_CRITICAL_ALERTS, {
        fetchPolicy: 'network-only', // Always fetch fresh data
    });

    // Query to get the doctor based on userId
    const { data: doctorData, loading: doctorLoading, error: doctorError } = useQuery<CurrentDoctorData>(GET_CURRENT_DOCTOR, {
        variables: { userId: userId },
        skip: !userId,
    });

    // Query the doctor details with doctorId if available
    const { data, loading, error } = useQuery<DoctorData>(GET_DOCTOR, {
        variables: { id: doctorId },
        skip: !doctorId,
    });

    // Use effect for token validation and setting userId
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userIdFromToken = decodedToken.id;
            setUserId(userIdFromToken);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }, [token, navigate]);

    // Update alerts state when alertData changes
    useEffect(() => {
        if (alertData) {
            setAlerts(alertData.alerts);
        }
    }, [alertData]);

    // Handle doctor data update and ID setting
    useEffect(() => {
        if (doctorData) {
            if (doctorData.currentDoctor) {
                setDoctorId(Number(doctorData.currentDoctor.id));
            }
        }

        if (doctorError) {
            console.error("Error fetching doctor data:", doctorError);
        }
    }, [doctorData, doctorError]);

    // Check loading states for alerts and doctor
    if (alertLoading || doctorLoading || loading) {
        return <LoadingSpinner size="large" message="Loading..." />;
    }

    // Handle errors
    if (alertError) {
        return <div>Error Loading Alerts: {alertError.message}</div>;
    }

    if (error) {
        return <div>Error fetching doctor details: {error.message}</div>;
    }

    // Handle case where data is undefined
    if (!data) {
        return <div>No doctor data available</div>;
    }

    const patientProfiles = data.doctor.patients.map((patient: Patient) => ({
        name: patient.user.username,
        medicalHistory: patient.medicalHistory,
    }));

    const criticalPatients = alerts.map(alert => ({
        name: alert.healthRecord.patient.user.username,
        condition: alert.message, // Alert message as condition
        testDate: alert.timestamp, // Timestamp as test date
    }));

    return (
        <div className="flex h-screen bg-white rounded-3xl">
            <main className="flex-1 p-6">
                {/* Active Patient Alerts */}
                <PatientAlert criticalPatients={criticalPatients} />

                {/* Patient Profile Carousel */}
                <PatientCarousel patientProfiles={patientProfiles} />
            </main>
        </div>
    );
}
