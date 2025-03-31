import React, { createContext, useState, useEffect, useContext } from 'react';
import { registerUser, loginUser } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    if (userId) localStorage.setItem('userId', userId);
    else localStorage.removeItem('userId');

    if (user) localStorage.setItem('user', user);
    else localStorage.removeItem('user');
  }, [token, userId, user]);

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
      const { token, userId } = response.data;
      setToken(token);
      setUserId(userId);
      setUser(userData.email);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export correctly
export { AuthProvider, AuthContext };
export const useAuth = () => useContext(AuthContext);
