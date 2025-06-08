/**
 * Post Service Module
 * 
 * Handles all API operations related to blog posts including
 * creating, reading, updating, and deleting posts.
 */
import { apiClient } from './api-client';
import { csrfService } from './csrf-service';
import { validationService } from './validation-service';
import { auditLogService } from './audit-log-service';
import { adaptPostListResponse, adaptPostDetailResponse } from '../adapters/apiAdapters';
import type { 
  Post, 
 
  PostFormData,

  PostStatsResponse
} from '@/types/post.types';
import type { ApiResponse, PaginatedResponse, ApiErrorResponse } from '@/types/api.types';
import axios, { AxiosError } from 'axios';

/**
 * Interface for post query parameters
 */
export interface PostQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  status?: string;
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Post service object with methods for post-related API operations
 */
export const postService = {
  /**
   * Get all posts with optional filtering parameters
   * 
   * @param params - Query parameters for filtering, sorting, and pagination
   * @returns Paginated list of posts
   */
  getAll: async (params?: PostQueryParams): Promise<PaginatedResponse<Post[]>> => {
    try {
      const response = await apiClient.get("/posts", { params });
      return adaptPostListResponse(response);
    } catch (error: unknown) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  /**
   * Get a post by its unique identifier
   * 
   * @param id - Post unique identifier
   * @param lang - Language code (default: 'en')
   * @returns Post details
   */
  getById: async (id: string, lang: string = 'en'): Promise<ApiResponse<Post>> => {
    try {
      const response = await apiClient.get(`/posts/${id}`, { params: { lang } });
      return adaptPostDetailResponse(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error('Error fetching post:', {
          id,
          lang,
          error: axiosError.response?.data || axiosError.message,
          status: axiosError.response?.status,
          url: axiosError.config?.url
        });
      } else {
        console.error('Error fetching post:', error);
      }
      throw error;
    }
  },

  /**
   * Get a post by its URL slug
   * 
   * @param slug - Post URL slug
   * @param lang - Language code (default: 'en')
   * @returns Post details
   */
  getBySlug: async (slug: string, lang: string = 'en'): Promise<ApiResponse<Post>> => {
    try {
      const response = await apiClient.get(`/posts/slug/${slug}`, { params: { lang } });
      return adaptPostDetailResponse(response);
    } catch (error: unknown) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  },

  /**
   * Create a new post
   * 
   * @param data - Post form data including title, content, etc.
   * @returns Created post details
   */
  create: async (data: PostFormData): Promise<ApiResponse<Post>> => {
    try {
      const validationResult = validationService.validateForm(
        data as unknown as Record<string, unknown>, 
        validationService.schemas.post
      );
      
      if (!validationResult.valid) {
        throw new Error(validationResult.errors[0].message);
      }
      
      const apiData = {
        ...data,
        categories: data.category ? [data.category] : []
      };
      
      const protectedData = csrfService.protectForm(apiData);
      
      const response = await apiClient.post("/posts", protectedData);
      
      const adaptedResponse = adaptPostDetailResponse(response);
      
      if (adaptedResponse.success && adaptedResponse.data) {
        await auditLogService.logDataActivity(
          'post_create',
          'post',
          adaptedResponse.data._id,
          { 
            title: adaptedResponse.data.title,
            status: adaptedResponse.data.status
          }
        );
      }
      
      return adaptedResponse;
    } catch (error: unknown) {
      console.error('Error creating post:', error);
      
      await auditLogService.logDataActivity(
        'post_create_failure',
        'post',
        'unknown',
        { title: data.title }
      );
      
      throw error;
    }
  },

  /**
   * Update an existing post
   * 
   * @param id - Post unique identifier
   * @param data - Updated post data
   * @returns Updated post details
   */
  update: async (id: string, data: PostFormData): Promise<ApiResponse<Post>> => {
    try {
      const validationResult = validationService.validateForm(
        data as unknown as Record<string, unknown>, 
        validationService.schemas.post
      );
      
      if (!validationResult.valid) {
        throw new Error(validationResult.errors[0].message);
      }
      
      const apiData = {
        ...data,
        categories: data.category ? [data.category] : []
      };
      
      const protectedData = csrfService.protectForm(apiData);
      
      const response = await apiClient.put(`/posts/${id}`, protectedData);
      
      const adaptedResponse = adaptPostDetailResponse(response);
      
      if (adaptedResponse.success && adaptedResponse.data) {
        await auditLogService.logDataActivity(
          'post_update',
          'post',
          id,
          { 
            title: adaptedResponse.data.title,
            status: adaptedResponse.data.status
          }
        );
      }
      
      return adaptedResponse;
    } catch (error: unknown) {
      console.error('Error updating post:', error);
      await auditLogService.logDataActivity(
        'post_update_failure',
        'post',
        id,
        { title: data.title }
      );
      
      throw error;
    }
  },

  /**
   * Delete a post
   * 
   * @param id - Post unique identifier
   * @returns API response
   */
  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      let postInfo = null;
      try {
        const post = await postService.getById(id);
        if (post.success && post.data) {
          postInfo = {
            title: post.data.title,
            status: post.data.status
          };
        }
      } catch (error) {
        console.error('Failed to fetch post details before deletion:', error);
      }
      const csrfData = csrfService.protectForm({});
      const response = await apiClient.delete<ApiResponse<void>>(`/posts/${id}`, { data: csrfData });
      await auditLogService.logDataActivity(
        'post_delete',
        'post',
        id,
        postInfo || { id }
      );
      
      return response;
    } catch (error: unknown) {
      console.error('Error deleting post:', error);
      await auditLogService.logDataActivity(
        'post_delete_failure',
        'post',
        id,
        { id }
      );
      
      throw error;
    }
  },

  /**
   * Get dashboard statistics
   * 
   * @returns Statistics including post count, category count and view count
   */
  getDashboardStats: async (): Promise<ApiResponse<{
    postCount: number;
    categoryCount: number;
    viewCount: number;
    commentCount?: number;
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
          viewCount: 0,
          commentCount: 0
        }
      };
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch dashboard stats";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      console.error("Failed to fetch dashboard stats:", error);
      return {
        success: false,
        message: errorMessage,
        data: {
          postCount: 0,
          viewCount: 0,
          categoryCount: 0,
          commentCount: 0
        }
      };
    }
  }
}; 