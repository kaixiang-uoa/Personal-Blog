/**
 * Category Type Definitions
 * 
 * This file contains type definitions related to categories.
 */
import { BaseEntity } from './common.types';

/**
 * Category interface
 * Represents a content category
 */
export interface Category {
  _id: string;
  name: string | { en: string; zh: string };
  description: string | { en: string; zh: string };
  slug: string;
  parentCategory?: string;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Form data used for creating or updating a category
 */
export interface CategoryFormData {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

/**
 * API data structure for category
 */
export interface CategoryApiData {
  name: string;
  name_en?: string;
  name_zh?: string;
  slug: string;
  description?: string;
  description_en?: string;
  description_zh?: string;
  parentId?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  searchQuery?: string;
  sortField?: keyof Category;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface CategoryResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

export interface CategoryDetailResponse {
  success: boolean;
  message?: string;
  category: any;
  [key: string]: any;
} 