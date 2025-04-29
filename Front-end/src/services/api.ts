import axios from 'axios';
import type { Article, Category, Tag, Comment, SortOrder } from './interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 文章相关 API
export const postApi = {
  getAllPosts: async (
    page: number,
    limit: number,
    tag?: string,
    category?: string,
    search?: string,
    sort?: SortOrder
  ): Promise<{ data: Article[]; total: number }> => {
    const response = await api.get('/posts', {
      params: { page, limit, tag, category, search, sort },
    });
    return response.data;
  },
  
  getPostBySlug: async (slug: string) => {
    const response = await api.get<{ data: { post: Article } }>(`/posts/${slug}`);
    return response.data;
  }
};

// 分类相关 API
export const categoryApi = {
  getAllCategories: async () => {
    const response = await api.get<{ data: Category[] }>('/categories');
    return response.data;
  }
};

// 标签相关 API
export const tagApi = {
  getAllTags: async () => {
    const response = await api.get<{ data: Tag[] }>('/tags');
    return response.data;
  }
};

// 评论相关 API
export const commentApi = {
  getCommentsByPostId: async (postId: string) => {
    const response = await api.get<{ data: Comment[] }>(`/comments/post/${postId}`);
    return response.data;
  },
  
  createComment: async (postId: string, content: string) => {
    const response = await api.post<{ data: Comment }>('/comments', {
      postId,
      content
    });
    return response.data;
  }
};
