"use client"

/**
 * Authentication Context - Provides app-wide user authentication state management
 */
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authService } from '@/lib/services/auth-service';
import { TokenManager } from '@/lib/services/token-manager';
import type { UserInfo } from '@/types/auth.types';


// Token refresh interval (milliseconds)
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Authentication context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (credentials: { email: string; password: string; rememberMe: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isLoading: boolean; // Loading state
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Authentication Provider Component - Manages authentication state and provides auth methods
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Token refresh function
  const refreshAuth = useCallback(async () => {
    if (!isAuthenticated) return;
    
    // Refresh token if it's about to expire
    if (TokenManager.isTokenExpiredOrExpiring() && TokenManager.hasRefreshToken()) {
      console.log('Token is expiring soon, refreshing...');
      const success = await authService.refreshToken();
      
      if (success) {
        // Refresh successful, update user data
        const userData = TokenManager.getUserData();
        if (userData) {
          setUser(userData);
        }
      } else {
        // Refresh failed, log out user
        console.warn('Token refresh failed, logging out user');
        handleAuthFailure();
      }
    }
  }, [isAuthenticated]);

  // Initialize: Check authentication status on load
  useEffect(() => {
    const token = TokenManager.getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    // Check if token is expired
    if (TokenManager.isTokenExpiredOrExpiring()) {
      // Try to use refresh token
      if (TokenManager.hasRefreshToken()) {
        refreshAuth().finally(() => setIsLoading(false));
      } else {
        // No refresh token, force logout
        handleAuthFailure();
        setIsLoading(false);
      }
    } else {
      // Token is valid, check user info
      checkAuth();
    }
  }, [refreshAuth]);

  // Set up periodic token refresh
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Refresh token periodically
    const refreshInterval = setInterval(refreshAuth, TOKEN_REFRESH_INTERVAL);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, [isAuthenticated, refreshAuth]);

  // Validate if the current token is valid
  const checkAuth = async () => {
    try {
      // Get current user info
      const userData = await authService.getCurrentUserInfo();
      if (userData && userData.success && userData.data) {
        setIsAuthenticated(true);
        setUser(userData.data);
      } else {
        handleAuthFailure();
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      handleAuthFailure();
    } finally {
      setIsLoading(false);
    }
  };

  // Handle authentication failure
  const handleAuthFailure = () => {
    setIsAuthenticated(false);
    setUser(null);
    TokenManager.clearAllAuthData();
    
    // Only redirect on non-login pages
    if (typeof window !== 'undefined' && 
        !window.location.pathname.includes('/login') && 
        !window.location.pathname.includes('/register') && 
        !window.location.pathname.includes('/forgot-password')) {
      window.location.href = '/login';
    }
  };

  // Login method
  const login = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.token) {
        // Save authentication information
        setIsAuthenticated(true);
        setUser(response.user as UserInfo);
        // TokenManager handles token storage in authService
        return;
      }
      
      // Login failed but no exception was thrown
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      TokenManager.clearAllAuthData();
    }
  };

  // Refresh token method
  const refreshToken = async () => {
    try {
      setIsLoading(true);
      const success = await authService.refreshToken();
      
      if (success) {
        setIsAuthenticated(true);
        const userData = TokenManager.getUserData();
        if (userData) {
          setUser(userData);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or return a loading indicator
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Authentication hook - Access auth context in components
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 