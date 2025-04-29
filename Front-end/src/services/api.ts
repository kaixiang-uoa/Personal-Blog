import axios from 'axios';
import type { Article, Category, Tag, Comment } from './interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 文章相关 API
export const postApi = {
  getAllPosts: async (
    page: number = 1,
    limit: number = 10,
    tags?: string,
    category?: string,
    search?: string,
    sort?: string
  ) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (tags) params.append('tags', tags);
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);
    
    const response = await api.get<{ data: Article[]; total: number }>(`/posts?${params.toString()}`);
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
