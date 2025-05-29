import apiClient from './api-client';
import type { LoginRequest, LoginResponse, UserInfo } from '@/types/auth';
import type { ApiResponse } from '@/types/common';

export const authService = {
  login: async (credentials: { email: string; password: string; rememberMe: boolean }): Promise<ApiResponse<LoginResponse>> => {
    console.log('Sending login request:', {
      url: '/auth/login',
      credentials: { ...credentials, password: '***' }
    });
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", credentials);
    console.log('Login response:', response);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>("/auth/logout");
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<UserInfo>> => {
    const response = await apiClient.get<ApiResponse<UserInfo>>("/auth/me");
    return response.data;
  },

  register: async (data: { username: string; email: string; password: string }): Promise<ApiResponse<void>> => {
    return apiClient.post("/auth/register", data);
  }
};

export default authService; 