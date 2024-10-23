import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/AuthScreen/Login';
import Signup from './components/AuthScreen/SignUp';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
}

export default App;
