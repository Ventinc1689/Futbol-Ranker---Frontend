import api from '../api/config.js';

export const authService = {
    // Function to handle user login
    login: async (credentials) => {
        try {
            // Send a POST request to the backend for login using username/password
            const response = await api.post('/user/login', credentials);
            // If the response contains a token, store it in local storage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            // Store user data in localStorage 
            if (response.data.user) {
                localStorage.setItem('userData', JSON.stringify(response.data.user));
            }

            // Return success status and user data
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    },

    // Function to handle user registration
    register: async (userData) => {
        try {
            // Send a POST request to the backend for user registration
            const response = await api.post('/user/register', userData);
            // Return success status and user data
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed' 
            };
        }
    },

     // Function to get current user data from localStorage
    getCurrentUser: () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },

    // Function to handle user logout
    logout: () => {
        // Remove both token and user data
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    },

    // Function to check if the user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};