import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const register = async (credentials) => {
  const response = await api.post('/register', credentials);
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export { register, login, getProfile, setAuthToken }; 