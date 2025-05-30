// Base entity interface
import type { Category } from '@/types/category';
import type { Post } from '@/types/post';
import type { Tag } from '@/types/tags';

export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Common status types
export type PostStatus = 'draft' | 'published' | 'archived';

// Common response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Common pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Common author type
export interface Author {
  name: string;
  avatar?: string;
  email?: string;
}

// Dashboard types
export interface DashboardStats {
  postCount: number;
  viewCount: number;
  commentCount: number;
  categoryCount: number;
}

export interface DashboardData extends DashboardStats {
  recentPosts: {
    id: string;
    title: string;
    publishDate: string;
    status: PostStatus;
    viewCount: number;
  }[];
}

// API Response types
export interface PaginatedData<T> {
  items: T[];
  count: number;
}

export interface CategoryResponse {
  categories: Category[];
  count: number;
}

export interface PostResponse {
  posts: Post[];
  count: number;
}

export interface TagResponse {
  tags: Tag[];
  count: number;
} 