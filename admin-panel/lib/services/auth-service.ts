import apiClient from './api-client';
import type { LoginRequest, LoginResponse, UserInfo } from '@/types/auth';
import type { ApiResponse } from '@/types/common';

/**
 * 认证服务 - 处理与后端认证相关的 API 调用
 */
export const authService = {
  /**
   * 用户登录
   */
  login: async (credentials: { email: string; password: string; rememberMe: boolean }): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return response;
  },

  /**
   * 用户登出
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>("/auth/logout");
    return response;
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: async (): Promise<ApiResponse<UserInfo>> => {
    const response = await apiClient.get<ApiResponse<UserInfo>>("/auth/me");
    return response;
  },

  /**
   * 注册新用户
   */
  register: async (data: { username: string; email: string; password: string }): Promise<ApiResponse<void>> => {
    return apiClient.post("/auth/register", data);
  },

  /**
   * 检查用户权限
   */
  hasPermission: (permission: string): boolean => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return false;

    try {
      const user = JSON.parse(userStr) as UserInfo;
      return user.permissions?.includes(permission) || false;
    } catch (error) {
      return false;
    }
  }
};

export default authService; 