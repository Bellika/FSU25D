import { createContext, useContext, useEffect, useRef, useState } from 'react';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const refreshIntervalRef = useRef(null)

  const startTokenRefresh = () => {
    if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
    }

    refreshIntervalRef.current = setInterval(async () => {
        try {
            const data = await userService.refreshToken()
            if (data.success) {
                setUser(data.data)
                console.log('Token refreshed automatically')
            }
        } catch (error) {
            console.error('Auto refresh failed', error)
            logout()
        }
    }, 14 * 60 * 1000)
  }

  const stopTokenRefresh = () => {
    if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
        refreshIntervalRef.current = null
    }
  }

  const login = async (username, password) => {
    try {
      const data = await userService.login(username, password);

      if (data.success) {
        // JWT is now stored in HTTP-only cookie by the backend
        // No need to store anything in localStorage
        setUser(data.data);
        setIsAuthenticated(true);
        startTokenRefresh()
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to connect to server' };
    }
  };

  const logout = async () => {
    try {
      // Call backend to clear the HTTP-only cookie
      await userService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API result
      startTokenRefresh()
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    return () => stopTokenRefresh()
  })

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
