import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GET_CURRENT_DOCTOR } from '../../graphql/queries';
import Sidebar from '../Sidebar/Sidebar';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const MainLayout = () => {
  const [userId, setUserId] = useState<number | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userIdFromToken = decodedToken.id;
      setUserId(userIdFromToken);
    }
  }, [token]);

  // Query to get the current doctor's details
  const { data, loading, error } = useQuery(GET_CURRENT_DOCTOR, {
    variables: { userId: userId },
    skip: !userId
  });

  if (loading) return <LoadingSpinner size="large" message="Loading doctor information..." />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-screen bg-white rounded-3xl">
      {/* Sidebar with doctor data */}
      <Sidebar doctor={data?.currentDoctor || null} />

      {/* Main content that changes dynamically based on route */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
