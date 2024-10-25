import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientAlert from '../components/PatientAlert/PatientAlert';
import PatientCarousel from '../components/PatientCarousel/PatientCarousel';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { GET_CURRENT_DOCTOR, GET_DOCTOR } from '../graphql/queries';

// Define interfaces for the GraphQL response types
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

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState<number | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);

    // Query to get the doctor based on userId
    const { data: doctorData, loading: doctorLoading, error: doctorError } = useQuery<CurrentDoctorData>(GET_CURRENT_DOCTOR, {
        variables: { userId: userId },
        skip: !userId
    });

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userIdFromToken = decodedToken.id;

            console.log("Decoded Token:", decodedToken);
            console.log("Extracted User ID:", userIdFromToken);

            setUserId(userIdFromToken);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (doctorData) {
            console.log("Doctor Data:", doctorData.currentDoctor);
            if (doctorData.currentDoctor) {
                setDoctorId(Number(doctorData.currentDoctor.id));
            }
        }

        if (doctorError) {
            console.error("Error fetching doctor data:", doctorError);
        }
    }, [doctorData, doctorError]);

    // Query the doctor details with doctorId if available
    const { data, loading, error } = useQuery<DoctorData>(GET_DOCTOR, {
        variables: { id: doctorId },
        skip: !doctorId
    });

    useEffect(() => {
        console.log("Doctor ID for query:", doctorId);
    }, [doctorId]);

    // Check loading states
    if (doctorLoading || loading) {
        return <LoadingSpinner 
            size="large" 
            message="Loading" 
        />
    }

    // Handle error for GET_DOCTOR query
    if (error) {
        return <div>Error fetching doctor details: {error.message}</div>;
    }

    // Handle case where data is undefined
    if (!data) {
        return <div>No doctor data available</div>;
    }

    // Dummy data for patients
    const criticalPatients = [
        { name: "John Doe", condition: "Heart rate abnormal", testDate: "2024-10-20" },
        { name: "Jane Smith", condition: "High blood pressure", testDate: "2024-10-19" }
    ];

    const patientProfiles = data.doctor.patients.map((patient: Patient) => ({
        name: patient.user.username,
        medicalHistory: patient.medicalHistory,
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