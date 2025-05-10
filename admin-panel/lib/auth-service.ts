// Authentication service

import ApiService from "./api-service"
import type { LoginResponse, UserInfo } from "@/types/api"

export const AuthService = {
  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },

  // Login
  login: async (credentials: { email: string; password: string; rememberMe: boolean }): Promise<UserInfo> => {
    try {
      const response = await ApiService.auth.login(credentials) as LoginResponse
      // Save authentication token
      localStorage.setItem("authToken", response.token)

      if (credentials.rememberMe) {
        // If "Remember me" is checked, save user information
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      return response.user
    } catch (error) {
      throw error
    }
  },

  // Logout
  logout: async () => {
    try {
      await ApiService.auth.logout()
    } catch (error) {
      console.error("Logout API error:", error)
    } finally {
      // Always clear local storage regardless of API success
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
    }
  },

  // Get current logged-in user information
  getCurrentUser: async (): Promise<UserInfo | null> => {
    // First try to get from localStorage
    const cachedUser = localStorage.getItem("user")
    if (cachedUser) {
      return JSON.parse(cachedUser) as UserInfo
    }

    // If no cache, get from API
    try {
      const user = await ApiService.auth.getCurrentUser()
      return user
    } catch (error) {
      console.error("Failed to get current user:", error)
      return null
    }
  },

  // Check permission
  hasPermission: (permission: string): boolean => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return false

    try {
      const user = JSON.parse(userStr) as UserInfo
      return user.permissions?.includes(permission) || false
    } catch (error) {
      return false
    }
  },
}

export default AuthService
