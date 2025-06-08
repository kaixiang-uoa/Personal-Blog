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
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  postCount?: number;
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
  slug?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
} 