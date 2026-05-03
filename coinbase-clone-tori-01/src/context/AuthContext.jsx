import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking existing session

  // On mount: check if user has a valid session (cookie or localStorage token)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authAPI.getProfile();
        if (data.success) {
          setUser(data.user);
        }
      } catch {
        // No valid session — user is not logged in
        setUser(null);
        localStorage.removeItem('cb_token');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await authAPI.register({ name, email, password });
    if (data.success) {
      // Store token in localStorage as a fallback for cross-origin deployments
      if (data.token) localStorage.setItem('cb_token', data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authAPI.login({ email, password });
    if (data.success) {
      if (data.token) localStorage.setItem('cb_token', data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // Silently fail — still clear local state
    } finally {
      localStorage.removeItem('cb_token');
      setUser(null);
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
