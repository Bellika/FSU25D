import axios from 'axios';

// Skapa en axios instance med bas-konfiguration
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 sekunder timeout
});

// Request interceptor - körs före varje request
apiClient.interceptors.request.use(
  (config) => {
    // Här kan du lägga till auth tokens, logging, etc.
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - körs efter varje response
apiClient.interceptors.response.use(
  (response) => {
    // Logga framgångsrika responses
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Centraliserad error handling
    if (error.response) {
      // Servern svarade med error status (4xx, 5xx)
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request skickades men inget svar mottogs
      console.error('❌ Network Error: No response received');
    } else {
      // Något annat gick fel
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
