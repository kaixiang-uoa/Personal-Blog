import apiClient from './api-client';
import type { Post, PostData, PostFormData } from '@/types/post';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export const postService = {
  getAll: async (params?: any): Promise<PaginatedResponse<Post[]>> => {
    return apiClient.get("/posts", { params });
  },

  getById: async (id: string, lang: string = 'en'): Promise<ApiResponse<PostData>> => {
    try {
      const response = await apiClient.get(`/posts/${id}`, { params: { lang } });
      // 转换响应数据为 PostData 类型
      const post = response.data as Post;
      const postData: PostData = {
        ...post,
        categoryData: Array.isArray(post.categories) ? post.categories : [],
        displayTags: Array.isArray(post.tags) ? post.tags : [],
        originalTags: [],
        tempTags: [],
        tagsToRemove: []
      };
      return {
        success: true,
        data: postData
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
    return apiClient.get(`/posts/slug/${slug}`, { params: { lang } });
  },

  create: async (data: PostFormData): Promise<ApiResponse<Post>> => {
    return apiClient.post("/posts", data);
  },

  update: async (id: string, data: PostFormData): Promise<ApiResponse<Post>> => {
    return apiClient.put(`/posts/${id}`, data);
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
      const response = await Promise.all([
        apiClient.get("/posts?limit=1&count=true"),
        apiClient.get("/categories?limit=1&count=true"),
      ]);
      
      return {
        success: true,
        data: {
          postCount: response[0].data?.total || 0,
          categoryCount: response[1].data?.total || 0,
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