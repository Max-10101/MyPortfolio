import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyAuth, login as authLogin, logout as authLogout, handleBeforeUnload } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await verifyAuth();
      setIsAuthenticated(isValid);
    };

    checkAuth();
  }, []);

  // Effet pour gérer la déconnexion automatique
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isAuthenticated) {
        handleBeforeUnload();
        setIsAuthenticated(false);
      }
    };

    const handleUnload = () => {
      if (isAuthenticated) {
        handleBeforeUnload();
      }
    };

    if (isAuthenticated) {
      window.addEventListener('beforeunload', handleUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      await authLogin(username, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
