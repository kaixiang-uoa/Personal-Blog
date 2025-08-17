/**
 * Authentication Service
 * Handles all authentication-related API calls and business logic
 */

import { apiService } from "@/lib/api";
import { errorHandler } from "@/lib/errors";
import { AuthResponse, User, LoginFormValues, ApiResponse } from "@/types";

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginFormValues): Promise<AuthResponse> {
    try {
      const response = await apiService.login(credentials);
      return response as unknown as AuthResponse;
    } catch (error: unknown) {
      const apiError = errorHandler.handle(error);
      throw new Error(apiError.message);
    }
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // Call logout API if needed
      await apiService.logout();
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  },

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await apiService.get<User>("/auth/me");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>("/auth/refresh", {
        refreshToken,
      });
      return response as unknown as AuthResponse;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  },

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  },

  /**
   * Store authentication data
   */
  storeAuthData(token: string, refreshToken?: string): void {
    localStorage.setItem("token", token);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  },

  /**
   * Clear authentication data
   */
  clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};
