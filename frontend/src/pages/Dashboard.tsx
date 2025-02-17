import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alertSound from '../assets/alert.wav';
import PatientAlert from '../components/PatientAlert/PatientAlert';
import PatientCarousel from '../components/PatientCarousel/PatientCarousel';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { GET_CRITICAL_ALERTS, GET_CURRENT_DOCTOR, GET_DOCTOR } from '../graphql/queries';
import { Alert, AlertsData, CurrentDoctorData, DoctorData, Patient } from '../lib/types';

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState<number | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);  
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const previousAlertsLength = useRef<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio(alertSound);
    }, []);

    // Fetch alerts with polling
    const { data: alertData, loading: alertLoading, error: alertError, refetch: refetchAlerts } = useQuery<AlertsData>(GET_CRITICAL_ALERTS, {
        fetchPolicy: 'network-only',
    });

    const handleAlertResolved = () => {
        refetchAlerts();
    };

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

    // Set up polling interval
    useEffect(() => {
        const pollInterval = setInterval(() => {
            refetchAlerts();
        }, 1000);

        return () => clearInterval(pollInterval);
    }, [refetchAlerts]);

    // Update alerts state and play sound when alertData changes
    useEffect(() => {
        if (alertData) {
            const unreadAlerts = alertData.alerts.filter(alert => !alert.isRead);
            
            // Play sound if there are more unread alerts than before
            if (unreadAlerts.length > previousAlertsLength.current && audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.error('Error playing alert sound:', error);
                });
            }
            
            setAlerts(alertData.alerts);
            previousAlertsLength.current = unreadAlerts.length;
        }
    }, [alertData]);

    // Token validation effect
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

    // Handle doctor data update
    useEffect(() => {
        if (doctorData?.currentDoctor) {
            setDoctorId(Number(doctorData.currentDoctor.id));
        }

        if (doctorError) {
            console.error("Error fetching doctor data:", doctorError);
        }
    }, [doctorData, doctorError]);

    if (alertLoading || doctorLoading || loading) {
        return <LoadingSpinner size="large" message="Loading..." />;
    }

    if (alertError) {
        return <div>Error Loading Alerts: {alertError.message}</div>;
    }

    if (error) {
        return <div>Error fetching doctor details: {error.message}</div>;
    }

    if (!data) {
        return <div>No doctor data available</div>;
    }

    const patientProfiles = data.doctor.patients.map((patient: Patient) => ({
        name: patient.user.username,
        medicalHistory: patient.medicalHistory,
    }));

    const criticalPatients = alerts.filter(alert => !alert.isRead).map(alert => ({
        id: parseInt(alert.id),
        name: alert.healthRecord.patient.user.username,
        condition: alert.message,
        testDate: alert.timestamp,
        severity: alert.severity
    }));

    return (
        <div className="flex h-screen bg-white rounded-3xl">
            <main className="flex-1 p-6">
                <PatientAlert 
                    criticalPatients={criticalPatients}
                    onAlertResolved={handleAlertResolved}
                />
                <PatientCarousel patientProfiles={patientProfiles} />
            </main>
        </div>
    );
}