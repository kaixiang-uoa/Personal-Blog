import apiClient from './api-client';
import type { Tag, TagFormData } from '@/types/tags';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export const tagService = {
  getAll: async (lang: string = 'en'): Promise<PaginatedResponse<Tag[]>> => {
    return apiClient.get("/tags", { params: { lang } });
  },

  create: async (data: TagFormData): Promise<ApiResponse<Tag>> => {
    return apiClient.post("/tags", data);
  },

  update: async (id: string, data: TagFormData): Promise<ApiResponse<Tag>> => {
    return apiClient.put(`/tags/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/tags/${id}`);
  }
}; 