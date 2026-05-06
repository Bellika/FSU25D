import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  withCredentials: true, // Send cookies with requests
});

// Request interceptor - körs innan varje request
api.interceptors.request.use(
  (config) => {
    // No need to add Authorization header - JWT is sent via HTTP-only cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - körs efter varje response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global felhantering
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
