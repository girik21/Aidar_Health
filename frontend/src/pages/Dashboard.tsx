import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientAlert from '../components/PatientAlert/PatientAlert';
import PatientCarousel from '../components/PatientCarousel/PatientCarousel';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { GET_CURRENT_DOCTOR, GET_DOCTOR } from '../graphql/queries';

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState<number | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);

    // Query to get the doctor based on userId
    const { data: doctorData, loading: doctorLoading, error: doctorError } = useQuery(GET_CURRENT_DOCTOR, {
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
    const { data, loading, error } = useQuery(GET_DOCTOR, {
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

    // Dummy data for patients
    const criticalPatients = [
        { name: "John Doe", condition: "Heart rate abnormal", testDate: "2024-10-20" },
        { name: "Jane Smith", condition: "High blood pressure", testDate: "2024-10-19" }
    ];

    const patientProfiles = [
        { name: "John Doe", lastTest: "2024-10-20", status: "Critical" },
        { name: "Jane Smith", lastTest: "2024-10-19", status: "Critical" },
        { name: "Sam Wilson", lastTest: "2024-10-15", status: "Stable" },
        { name: "Emma Brown", lastTest: "2024-10-14", status: "Stable" },
    ];

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
