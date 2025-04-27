import axios from 'axios';
import { 
  ApiResponse, 
  PostsData, 
  PostData, 
  TagsData, 
  CategoriesData,
  CommentsData,
  SortOrder,
  ApiErrorResponse
} from './interface';

// API 基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 处理API错误
const handleApiError = (error: any): ApiErrorResponse => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.response?.data?.message || '请求失败，请稍后再试',
    data: null,
    originalError: error
  };
};

// 文章相关API
export const postApi = {
  // 获取所有文章
  getAllPosts: async (
    page: number = 1,
    limit: number = 10,
    tags?: string,
    category?: string,
    search?: string,
    sort: SortOrder = 'publishedAt-desc'
  ): Promise<ApiResponse<PostsData> | ApiErrorResponse> => {
    try {
      const params = { page, limit, tags, category, search, sort };
      const response = await apiClient.get('/posts', { params });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // 根据slug获取文章
  getPostBySlug: async (slug: string): Promise<ApiResponse<PostData> | ApiErrorResponse> => {
    try {
      const response = await apiClient.get(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// 分类相关API
export const categoryApi = {
  // 获取所有分类
  getAllCategories: async (locale: string = 'zh'): Promise<ApiResponse<CategoriesData> | ApiErrorResponse> => {
    try {
      const response = await apiClient.get('/categories', { params: { locale } });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// 标签相关API
export const tagApi = {
  // 获取所有标签
  getAllTags: async (): Promise<ApiResponse<TagsData> | ApiErrorResponse> => {
    try {
      const response = await apiClient.get('/tags');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// 评论相关API
export const commentApi = {
  // 获取文章评论
  getCommentsByPost: async (postId: string): Promise<ApiResponse<CommentsData> | ApiErrorResponse> => {
    try {
      const response = await apiClient.get(`/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // 添加评论
  addComment: async (postId: string, content: string, parentId?: string): Promise<ApiResponse<any> | ApiErrorResponse> => {
    try {
      const response = await apiClient.post('/comments', { postId, content, parentId });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};