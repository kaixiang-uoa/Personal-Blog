import apiClient from './api-client';
import type { Category, CategoryFormData } from '@/types/category';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export interface CategoryFilters {
  searchQuery?: string;
  sortField?: keyof Category;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export const categoryService = {
  getAll: async (filters?: CategoryFilters): Promise<PaginatedResponse<Category[]>> => {
    return apiClient.get("/categories", { 
      params: {
        search: filters?.searchQuery,
        sortField: filters?.sortField,
        sortDirection: filters?.sortDirection,
        page: filters?.page,
        pageSize: filters?.pageSize,
      }
    });
  },

  getById: async (id: string, lang: string = 'en'): Promise<ApiResponse<Category>> => {
    return apiClient.get(`/categories/${id}`, { params: { lang } });
  },

  create: async (data: CategoryFormData): Promise<ApiResponse<Category>> => {
    return apiClient.post("/categories", data);
  },

  update: async (id: string, data: CategoryFormData): Promise<ApiResponse<Category>> => {
    return apiClient.put(`/categories/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/categories/${id}`);
  }
}; 