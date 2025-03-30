import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Leaderboard from './pages/Leaderboard';
import AuthForm from './components/AuthForm'; // Import the login/register form
import { AuthProvider, useAuth } from './context/AuthContext';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar is only visible for protected routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthForm type="login" />} /> {/* Default login form */}
          <Route path="/register" element={<AuthForm type="register" />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trade"
            element={
              <ProtectedRoute>
                <Trade />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect to Login if no route matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;