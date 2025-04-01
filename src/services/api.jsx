import axios from 'axios';

// Use environment variable for API base URL with fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

// Authentication APIs
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    console.log('Sending login request with data:', userData); // Log the data being sent
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Trading APIs
export const buyStock = async (token, orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trade/buy`, orderData, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Buy Stock Error:", error.response?.data || error.message);
    throw error;
  }
};

export const sellStock = async (token, orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trade/sell`, orderData, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Sell Stock Error:", error.response?.data || error.message);
    throw error;
  }
};

// Portfolio & Leaderboard APIs
export const getPortfolio = async (token, userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trade/portfolio/${userId}`, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Get Portfolio Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getLeaderboard = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trade/leaderboard`, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Get Leaderboard Error:", error.response?.data || error.message);
    throw error;
  }
};

// Stocks API
export const getStocks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks`);
    return response.data;
  } catch (error) {
    console.error("Get Stocks Error:", error.response?.data || error.message);
    throw error;
  }
};