import apiClient from './api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type { Media, MediaFormData } from '@/types/media';

interface MediaListResponse {
  media: Media[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const mediaService = {
  getAll: async (params?: any): Promise<ApiResponse<MediaListResponse>> => {
    return apiClient.get("/media", { params });
  },

  getById: async (id: string): Promise<ApiResponse<Media>> => {
    return apiClient.get(`/media/${id}`);
  },

  upload: async (formData: FormData, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<MediaListResponse>> => {
    return apiClient.post("/media", formData, {
      onUploadProgress,
    });
  },

  update: async (id: string, data: Partial<MediaFormData>): Promise<ApiResponse<Media>> => {
    return apiClient.put(`/media/${id}`, data);
  },

  delete: async (ids: string | string[]): Promise<ApiResponse<void>> => {
    if (Array.isArray(ids)) {
      return apiClient.delete("/media", { data: { ids } });
    }
    return apiClient.delete(`/media/${ids}`);
  }
}; 