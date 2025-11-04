import axios from 'axios';

// Define the base URL for Spring Boot backend API
const API_BASE_URL = 'http://localhost:8181/api/v1';

// Create an Axios instance with the base URL
// All request will automatically prepend this base URL 
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to automatically include JWT token in headers
api.interceptors.request.use((config) => {
    // Skip token for authentication endpoints
    const isAuthEndpoint = config.url?.includes('/user/login') || config.url?.includes('/user/register');
    
    if (!isAuthEndpoint) {
        // Get the JWT token from the browser's local storage
        const token = localStorage.getItem('token');
        // If token exists, set it in the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    // Return the modified config
    return config;
});

export default api;