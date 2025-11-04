import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../service/authService.jsx';

// Create a context for authentication
// This will allow us to provide authentication state and methods throughout the app
const AuthContext = createContext();

// Custom hook to use the AuthContext
// This is a helper function that makes it easier to access the auth data in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component that wraps the application
// It provides the authentication state and methods to its children components
export const AuthProvider = ({ children }) => {
  // State to store user information (null = not logged in, object = logged in)
  const [user, setUser] = useState(null);

  // State to manage loading state while checking authentication
  const [loading, setLoading] = useState(true);

  // Effect to check if the user is authenticated on initial render
  useEffect(() => {
    // Check if a both token and user data exists in local storage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    // If both exist, restore the user session
    if (token && userData) {
      try {
        // Parse the stored user data and set it in state
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } catch (error) {
        // If parsing fails, clear corrupted data
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }

    // Set loading to false after checking authentication
    setLoading(false);
  }, []); // Empty dependency array means this effect runs once on mount

  // Login function - called when user submits login form
  const login = async (credentials) => {
    const result = await authService.login(credentials);
    if (result.success) {
      // Store the complete user data (your backend should return user info + token)
      setUser(result.data.user || result.data); // Adjust based on your backend response structure
      
      // Store user data in localStorage for persistence
      localStorage.setItem('userData', JSON.stringify(result.data.user || result.data));
    }
    return result;
  };

  // Logout function - called when user clicks logout
  const logout = () => {
    authService.logout();
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem('userData');
  };

  // Register function - called when user submits registration form
  const register = async (userData) => {
    return await authService.register(userData);
  };

  // Create the value object that will be shared with all components
  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    loading
  };

  // Provide the AuthContext to children components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};