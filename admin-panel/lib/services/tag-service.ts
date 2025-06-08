import { apiClient } from './api-client';
import { adaptTag, adaptTagListResponse, adaptTagForApiRequest } from '../adapters/apiAdapters';
import { csrfService } from './csrf-service';
import type { Tag, TagFormData, TagApiData } from '@/types/tags.types';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';

// 后端响应类型
interface TagResponse {
  success: boolean;
  message?: string;
  tag: any;
  [key: string]: any;
}

export const tagService = {
  getAll: async (): Promise<PaginatedResponse<Tag[]>> => {
    const response = await apiClient.get("/tags");
    return adaptTagListResponse(response);
  },

  create: async (data: TagApiData): Promise<ApiResponse<Tag>> => {
    const protectedData = csrfService.protectForm(data);
    const response = await apiClient.post("/tags", protectedData) as TagResponse;
    if (!response.success || !response.tag) {
      return {
        success: false,
        message: response.message || 'Failed to create tag',
        data: undefined
      };
    }
    
    return {
      success: response.success,
      message: response.message,
      data: adaptTag(response.tag)
    };
  },

  update: async (id: string, data: TagApiData): Promise<ApiResponse<Tag>> => {
    const protectedData = csrfService.protectForm(data);
    const response = await apiClient.put(`/tags/${id}`, protectedData) as TagResponse;
    if (!response.success || !response.tag) {
      return {
        success: false,
        message: response.message || 'Failed to update tag',
        data: undefined
      };
    }
    
    return {
      success: response.success,
      message: response.message,
      data: adaptTag(response.tag)
    };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {   
    const csrfData = csrfService.protectForm({});
    return apiClient.delete(`/tags/${id}`, { data: csrfData });
  }
}; 