import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Backend URL

// Helper function to include JWT token in headers
const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Auth APIs
export const registerUser = (userData) => axios.post(`${API_BASE_URL}/api/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/api/auth/login`, userData);

// Trading APIs
export const buyStock = (token, orderData) => axios.post(`${API_BASE_URL}/api/trade/buy`, orderData, getHeaders(token));
export const sellStock = (token, orderData) => axios.post(`${API_BASE_URL}/api/trade/sell`, orderData, getHeaders(token));

// Portfolio APIs
export const getPortfolio = (token, userId) => axios.get(`${API_BASE_URL}/api/trade/portfolio/${userId}`, getHeaders(token));
export const getLeaderboard = (token) => axios.get(`${API_BASE_URL}/api/trade/leaderboard`, getHeaders(token));

// Stock APIs
export const getStocks = () => axios.get(`${API_BASE_URL}/api/stocks`); // Assuming you have a GET endpoint for stocks