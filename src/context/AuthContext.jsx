import React, { createContext, useState, useEffect } from 'react';
import { registerUser, loginUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (e.g., email or username)
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null); // Store userId

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    if (userId) localStorage.setItem('userId', userId);
    else localStorage.removeItem('userId');
  }, [token, userId]);

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      console.log(response.data.message);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);
      const { token, userId } = response.data; // Ensure userId is returned from the backend
      setToken(token);
      setUserId(userId); // Store userId
      setUser(userData.email); // Optionally store user info
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);