import apiClient from './api-client';
import type { UserInfo } from '@/types/auth';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export interface UserFormData {
  username: string;
  email: string;
  password?: string;
  role?: string;
  avatar?: string;
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  getAll: async (params?: any): Promise<PaginatedResponse<UserInfo[]>> => {
    return apiClient.get("/users", { params });
  },

  getById: async (id: string): Promise<ApiResponse<UserInfo>> => {
    return apiClient.get(`/users/${id}`);
  },

  create: async (data: UserFormData): Promise<ApiResponse<UserInfo>> => {
    return apiClient.post("/users", data);
  },

  update: async (id: string, data: UserFormData): Promise<ApiResponse<UserInfo>> => {
    return apiClient.put(`/users/${id}`, data);
  },

  updateProfile: async (data: Partial<UserFormData>): Promise<ApiResponse<UserInfo>> => {
    return apiClient.put("/users/profile", data);
  },

  updatePassword: async (data: PasswordUpdateData): Promise<ApiResponse<UserInfo>> => {
    return apiClient.put("/users/password", data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/users/${id}`);
  }
}; 