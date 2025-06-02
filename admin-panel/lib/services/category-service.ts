import apiClient from './api-client';
import type { Category, CategoryFormData, CategoryApiData } from '@/types/category';
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

  getById: async (id: string): Promise<ApiResponse<Category>> => {
    return apiClient.get(`/categories/${id}`);
  },

  create: async (data: CategoryApiData): Promise<ApiResponse<{ category: Category }>> => {
    return apiClient.post("/categories", data);
  },

  update: async (id: string, data: CategoryApiData): Promise<ApiResponse<Category>> => {
    return apiClient.put(`/categories/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/categories/${id}`);
  }
}; 