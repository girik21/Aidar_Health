import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect to login if not authorized
        }
    }, [token, navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
