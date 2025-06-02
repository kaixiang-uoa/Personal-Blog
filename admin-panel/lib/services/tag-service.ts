import apiClient from './api-client';
import type { Tag, TagFormData, TagApiData } from '@/types/tags';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export const tagService = {
  getAll: async (): Promise<PaginatedResponse<Tag[]>> => {
    return apiClient.get("/tags");
  },

  create: async (data: TagApiData): Promise<ApiResponse<{ tag: Tag }>> => {
    return apiClient.post("/tags", data);
  },

  update: async (id: string, data: TagApiData): Promise<ApiResponse<Tag>> => {
    return apiClient.put(`/tags/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/tags/${id}`);
  }
}; 