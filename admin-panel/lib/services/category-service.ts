import { apiClient } from './api-client';
import { adaptCategory, adaptCategoryListResponse } from '../adapters/apiAdapters';
import type { 
  Category, 
  CategoryApiData, 
  CategoryFilters, 
  CategoryDetailResponse 
} from '@/types/category.types';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { csrfService } from './csrf-service';

export const categoryService = {
  getAll: async (filters?: CategoryFilters): Promise<PaginatedResponse<Category[]>> => {
    const response = await apiClient.get("/categories", { 
      params: {
        search: filters?.searchQuery,
        sortField: filters?.sortField,
        sortDirection: filters?.sortDirection,
        page: filters?.page,
        pageSize: filters?.pageSize,
      }
    });
    
    // Use the adapter to convert the response
    return adaptCategoryListResponse(response);
  },

  getById: async (id: string): Promise<ApiResponse<Category>> => {
    const response = await apiClient.get(`/categories/${id}`) as CategoryDetailResponse;
    
    if (!response.success || !response.category) {
      return {
        success: false,
        message: response.message || 'Failed to fetch category',
        data: undefined
      };
    }
    
    return {
      success: response.success,
      message: response.message,
      data: adaptCategory(response.category)
    };
  },

  create: async (data: CategoryApiData): Promise<ApiResponse<Category>> => {
    const apiData = {
      name: data.name,
      name_en: data.name, 
      name_zh: data.name, 
      slug: data.slug,
      description: data.description,
      description_en: data.description, 
      description_zh: data.description, 
      parent: data.parentId 
    };
    
    const protectedData = csrfService.protectForm(apiData);
    
    const response = await apiClient.post("/categories", protectedData) as CategoryDetailResponse;
    
    if (!response.success || !response.category) {
      return {
        success: false,
        message: response.message || 'Failed to create category',
        data: undefined
      };
    }
    
    return {
      success: response.success,
      message: response.message,
      data: adaptCategory(response.category)
    };
  },

  update: async (id: string, data: CategoryApiData): Promise<ApiResponse<Category>> => {
    const apiData = {
      name: data.name,
      name_en: data.name, 
      name_zh: data.name, 
      slug: data.slug,
      description: data.description,
      description_en: data.description, 
      description_zh: data.description, 
      parent: data.parentId 
    };
    
    const protectedData = csrfService.protectForm(apiData);
    
    const response = await apiClient.put(`/categories/${id}`, protectedData) as CategoryDetailResponse;
    
    if (!response.success || !response.category) {
      return {
        success: false,
        message: response.message || 'Failed to update category',
        data: undefined
      };
    }
    
    return {
      success: response.success,
      message: response.message,
      data: adaptCategory(response.category)
    };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const csrfData = csrfService.protectForm({});
    return apiClient.delete(`/categories/${id}`, { data: csrfData });
  }
}; 