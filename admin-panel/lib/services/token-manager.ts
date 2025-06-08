/**
 * Token Manager - Handles storage and retrieval of authentication tokens and user data
 */

import type { UserInfo } from '@/types/auth.types';
import { jwtDecode } from 'jwt-decode';

// Storage key constants
const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';

// Token expiry buffer (in seconds) - refresh token if it expires within this time
const TOKEN_EXPIRY_BUFFER = 300; // 5 minutes

/**
 * JWT token payload interface
 */
interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: unknown;
}

/**
 * Token Manager - Provides methods for handling authentication related data
 */
export const TokenManager = {
  /**
   * Get authentication token
   */
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Set authentication token and extract/store expiration time
   */
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(TOKEN_KEY, token);
    
    try {
      // Decode token to get expiration time
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        localStorage.setItem(TOKEN_EXPIRY_KEY, decoded.exp.toString());
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  },

  /**
   * Get refresh token
   */
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Set refresh token
   */
  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Get user data
   */
  getUserData: (): UserInfo | null => {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData) as UserInfo;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  /**
   * Set user data
   */
  setUserData: (user: UserInfo): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Check if token is expired or will expire soon
   * @returns true if token is expired or will expire within buffer time
   */
  isTokenExpiredOrExpiring: (): boolean => {
    if (typeof window === 'undefined') return true;
    
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return true;
    
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) {
      // If we don't have expiry info, try to decode the token
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return true;
        
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp - now < TOKEN_EXPIRY_BUFFER;
      } catch (error) {
        console.error('Error checking token expiry:', error);
        return true;
      }
    }

    const expiryTime = parseInt(expiry, 10);
    const now = Math.floor(Date.now() / 1000);
    
    // Check if token is expired or will expire within the buffer time
    return isNaN(expiryTime) || expiryTime - now < TOKEN_EXPIRY_BUFFER;
  },

  /**
   * Check if refresh token is available
   */
  hasRefreshToken: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Get token expiration time
   * @returns Expiration time in seconds since epoch, or null if not available
   */
  getTokenExpiry: (): number | null => {
    if (typeof window === 'undefined') return null;
    
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (expiry) {
      const expiryTime = parseInt(expiry, 10);
      return isNaN(expiryTime) ? null : expiryTime;
    }
    
    // If expiry not stored, try to decode token
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp || null;
    } catch (error) {
      console.error('Error getting token expiry:', error);
      return null;
    }
  },

  /**
   * Remove authentication token
   */
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  /**
   * Remove refresh token
   */
  removeRefreshToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Remove user data
   */
  removeUserData: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Clear all authentication data
   */
  clearAllAuthData: (): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  /**
   * Check if a token exists
   * @returns True if token exists
   */
  hasToken: (): boolean => {
    return !!TokenManager.getToken();
  },

  /**
   * Get user data (alias for getUserData)
   * @returns The stored user data or null if not found
   */
  getUser: (): UserInfo | null => {
    return TokenManager.getUserData();
  },

  /**
   * Set user data (alias for setUserData)
   * @param user The user data to store
   */
  setUser: (user: UserInfo): void => {
    TokenManager.setUserData(user);
  }
};

// Maintain named export, remove default export