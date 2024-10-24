// src/App.tsx
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/AuthScreen/Login';
import Signup from './components/AuthScreen/SignUp';
import Layout from './components/Layout';
import MainLayout from './components/mainLayout/MainLayout'; // Import the MainLayout
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Patients from './pages/Patients'; // Import your new pages
import Records from './pages/Records';
import Thresholds from './pages/Thresholds';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />

        {/* Protected Routes (with sidebar) */}
        <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="records" element={<Records />} />
          <Route path="thresholds" element={<Thresholds />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
