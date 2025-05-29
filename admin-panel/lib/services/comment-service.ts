import apiClient from './api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export interface Comment {
  _id: string;
  content: string;
  postId: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CommentFormData {
  content: string;
  postId: string;
}

export const commentService = {
  getByPost: async (postId: string, params?: any): Promise<PaginatedResponse<Comment[]>> => {
    return apiClient.get(`/comments/post/${postId}`, { params });
  },

  create: async (postId: string, data: Omit<CommentFormData, 'postId'>): Promise<ApiResponse<Comment>> => {
    return apiClient.post(`/comments/post/${postId}`, data);
  },

  update: async (commentId: string, data: Pick<CommentFormData, 'content'>): Promise<ApiResponse<Comment>> => {
    return apiClient.put(`/comments/${commentId}`, data);
  },

  delete: async (commentId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/comments/${commentId}`);
  }
}; 