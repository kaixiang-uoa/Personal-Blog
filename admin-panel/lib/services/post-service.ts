import apiClient from './api-client';
import type { 
  Post, 
  PostData, 
  PostFormData,
  PostListResponse,
  PostDetailResponse,
  PostStatsResponse
} from '@/types/post';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export const postService = {
  getAll: async (params?: any): Promise<PaginatedResponse<Post[]>> => {
    const response = await apiClient.get<PostListResponse>("/posts", { params });
    console.log('response', response.data.posts);
    return {
      success: response.success,
      message: response.message,
      data: response.data.posts,
      pagination: {
        total: response.data.total,
        page: response.data.currentPage,
        limit: 20, // Default page size
        pages: response.data.totalPages
      }
    };
  },

  getById: async (id: string, lang: string = 'en'): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(`/posts/${id}`, { params: { lang } }) as { data: any };
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching post:', {
        id,
        lang,
        error: error.response?.data || error.message,
        status: error.response?.status,
        url: error.config?.url
      });
      throw error;
    }
  },

  getBySlug: async (slug: string, lang: string = 'en'): Promise<ApiResponse<Post>> => {
    return apiClient.get<PostDetailResponse>(`/posts/slug/${slug}`, { params: { lang } });
  },

  create: async (data: PostFormData): Promise<ApiResponse<Post>> => {
    return apiClient.post<PostDetailResponse>("/posts", data);
  },

  update: async (id: string, data: PostFormData): Promise<ApiResponse<Post>> => {
    return apiClient.put<PostDetailResponse>(`/posts/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/posts/${id}`);
  },

  getDashboardStats: async (): Promise<ApiResponse<{
    postCount: number;
    categoryCount: number;
    viewCount: number;
  }>> => {
    try {
      const [postsResponse, categoriesResponse] = await Promise.all([
        apiClient.get<PostStatsResponse>("/posts?limit=1&count=true"),
        apiClient.get<PostStatsResponse>("/categories?limit=1&count=true"),
      ]);
      return {
        success: true,
        data: {
          postCount: postsResponse.data.total || 0,
          categoryCount: categoriesResponse.data.total || 0,
          viewCount: 0
        }
      };
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      return {
        success: false,
        data: {
          postCount: 0,
          viewCount: 0,
          categoryCount: 0
        }
      };
    }
  }
}; 