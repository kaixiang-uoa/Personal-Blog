/**
 * Comment Service Module
 * 
 * Handles all API operations related to comments including
 * creating, reading, updating, and deleting comments.
 */
import { apiClient } from './api-client';
import { csrfService } from './csrf-service';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { Comment, CommentFormData, CommentQueryParams, CommentListResponse } from '@/types/comment.types';

/**
 * Comment service with methods for managing comments
 */
export const commentService = {
  /**
   * Get comments for a post
   * @param postId - Post ID to get comments for
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated list of comments
   */
  getByPost: async (postId: string, params?: CommentQueryParams): Promise<PaginatedResponse<Comment[]>> => {
    try {
      const response = await apiClient.get<CommentListResponse>(`/comments/post/${postId}`, { params });
      
      return {
        success: response.success,
        message: response.message,
        data: response.data.comments,
        pagination: {
          total: response.data.total,
          page: response.data.currentPage,
          limit: response.data.limit,
          pages: response.data.totalPages
        }
      };
    } catch (error: unknown) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  /**
   * Create a new comment
   * @param postId - Post ID to comment on
   * @param data - Comment content
   * @returns Created comment
   */
  create: async (postId: string, data: Omit<CommentFormData, 'postId'>): Promise<ApiResponse<Comment>> => {
    try {
      // 添加CSRF保护
      const protectedData = csrfService.protectForm({
        ...data,
        postId // 添加postId到表单数据
      });
      
      return await apiClient.post<ApiResponse<Comment>>(`/comments/post/${postId}`, protectedData);
    } catch (error: unknown) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  /**
   * Update a comment
   * @param commentId - Comment ID
   * @param data - Updated comment content
   * @returns Updated comment
   */
  update: async (commentId: string, data: Pick<CommentFormData, 'content'>): Promise<ApiResponse<Comment>> => {
    try {
      // 添加CSRF保护
      const protectedData = csrfService.protectForm(data);
      
      return await apiClient.put<ApiResponse<Comment>>(`/comments/${commentId}`, protectedData);
    } catch (error: unknown) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },
  
  /**
   * Delete a comment
   * @param commentId - Comment ID
   * @returns Success response
   */
  delete: async (commentId: string): Promise<ApiResponse<void>> => {
    try {
      // 添加CSRF保护（空对象，令牌会在请求头中）
      const csrfData = csrfService.protectForm({});
      
      return await apiClient.delete<ApiResponse<void>>(`/comments/${commentId}`, { data: csrfData });
    } catch (error: unknown) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
  
  /**
   * Approve a comment
   * @param commentId - Comment ID
   * @returns Updated comment
   */
  approve: async (commentId: string): Promise<ApiResponse<Comment>> => {
    try {
      // 添加CSRF保护
      const protectedData = csrfService.protectForm({
        status: 'approved'
      });
      
      return await apiClient.put<ApiResponse<Comment>>(`/comments/${commentId}/status`, protectedData);
    } catch (error: unknown) {
      console.error('Error approving comment:', error);
      throw error;
    }
  },
  
  /**
   * Reject a comment
   * @param commentId - Comment ID
   * @returns Updated comment
   */
  reject: async (commentId: string): Promise<ApiResponse<Comment>> => {
    try {
      // 添加CSRF保护
      const protectedData = csrfService.protectForm({
        status: 'rejected'
      });
      
      return await apiClient.put<ApiResponse<Comment>>(`/comments/${commentId}/status`, protectedData);
    } catch (error: unknown) {
      console.error('Error rejecting comment:', error);
      throw error;
    }
  }
}; 