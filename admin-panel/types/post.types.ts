/**
 * Post related type definitions
 */
import { BaseEntity, Author } from './common.types';
import { Category } from './category.types';

// Define PostStatus as an enum so it can be used as a value
export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export interface TagType {
  _id: string;
  name: string;
  slug: string;
}

export interface Post extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string; 
  tags: TagType[];
  status: PostStatus;
  featured: boolean;
  featuredImage: string;
  author?: Author;
  publishDate?: string;
  viewCount?: number;
}

// API Response interfaces
export interface ApiPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  status: string;
  featuredImage: string;
  author: {
    _id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  viewCount?: number;
  [key: string]: any;
}

export interface PostData extends Omit<Post, 'category' | 'tags'> {
  categoryData: Category[];
  displayTags: string[];
  originalTags: TagType[];
  tempTags?: string[];
  tagsToRemove?: TagType[];
}

export interface PostParams {
  id: string;
}

export interface PostFormData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  categories?: string[];
  tags?: string[];
  status: PostStatus;
  featured: boolean;
  featuredImage?: string;
  publishDate?: string;
}

// API Response interfaces
export interface PostListResponse {
  success: boolean;
  message: string;
  data: {
    currentPage: number;
    posts: Post[];
    total: number;
    totalPages: number;
  };
}

export interface PostDetailResponse {
  success: boolean;
  message: string;
  data: Post;
}

export interface PostStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
  };
}
  