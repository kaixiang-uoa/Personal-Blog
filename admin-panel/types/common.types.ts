/**
 * Common Type Definitions
 * 
 * This file contains shared types used across the application
 */
import type { Category } from '@/types/category.types';
import type { Post } from '@/types/post.types';
import type { Tag } from '@/types/tags.types';
import type { ApiResponse, PaginationParams, PaginatedResponse } from '@/types/api.types';

// Base entity interface
export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Common status types - now defined as enum in post.types.ts
export type PostStatus = 'draft' | 'published' | 'archived';

// Re-export API types for backward compatibility
export type { ApiResponse, PaginationParams, PaginatedResponse };

// Common author type
export interface Author {
  username: string;
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