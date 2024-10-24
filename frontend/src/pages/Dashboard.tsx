// pages/Dashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientAlert from '../components/PatientAlert/PatientAlert';
import PatientCarousel from '../components/PatientCarousel/PatientCarousel';
import Sidebar from '../components/Sidebar/Sidebar';

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

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
        <div className="flex h-screen bg-white rounded-3xl shadow-lg shadow-gray-400">
            
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6">
                
                {/* Active Patient Alerts */}
                <PatientAlert criticalPatients={criticalPatients} />

                {/* Patient Profile Carousel */}
                <PatientCarousel patientProfiles={patientProfiles} />
            </main>
        </div>
    );
}
