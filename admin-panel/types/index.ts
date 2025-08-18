/**
 * Simplified Type Definitions
 * Consolidated type definitions for the Admin Panel
 */

import { z, AnyZodObject } from "zod";

// ====================
// Base API Types
// ====================

// API Response type
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// Pagination response type
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
}

// ====================
// Authentication Types
// ====================

// User type
export interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "editor" | "user";
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Auth response from API
export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: "admin" | "editor" | "user";
  };
}

// ====================
// Content Types
// ====================

// Category type
export interface Category {
  _id: string;
  name: string;
  name_en: string;
  name_zh: string;
  slug: string;
  description?: string;
  description_en?: string;
  description_zh?: string;
  postCount?: number; // For statistics
  createdAt?: string;
  updatedAt?: string;
}

// Tag type
export interface Tag {
  _id: string;
  name: string;
  name_en: string;
  name_zh: string;
  slug: string;
  description?: string;
  description_en?: string;
  description_zh?: string;
  postCount?: number; // For statistics
  createdAt?: string;
  updatedAt?: string;
}

// Post type (basic)
export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string; // ObjectId as string
  status: "draft" | "published";
  categories: string[]; // ObjectId array as string array
  tags: string[]; // ObjectId array as string array
  featuredImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  viewCount: number;
  commentCount: number;
  allowComments: boolean;
  publishedAt?: string; // Date as ISO string
  createdAt?: string;
  updatedAt?: string;
}

// Post type with populated fields (for detailed views)
export interface PopulatedPost
  extends Omit<Post, "categories" | "tags" | "author"> {
  author?: User; // Populated author
  categories: Category[]; // Populated categories
  tags: Tag[]; // Populated tags
}

// Media type
export interface Media {
  _id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
  alt?: string;
  alt_en?: string;
  alt_zh?: string;
  caption?: string;
  caption_en?: string;
  caption_zh?: string;
  uploadedBy: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

// common field item type
export interface FieldItem {
  [key: string]: any;
}

// ====================
// Form Types and Hooks
// ====================

// Login form schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Reset password form schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// ====================
// UI Related Types
// ====================

// Internationalized string
export interface I18nString {
  zh: string;
  en: string;
}

// Combobox select props
export interface ComboboxSelectProps<T> {
  items: T[];
  selectedItems: T[];
  onSelect: (item: T) => void;
  onCreate?: (name: string) => Promise<T>;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  label?: string;
  disabled?: boolean;
  width?: number | string;
  className?: string;
  getItemLabel: (item: T) => string | I18nString;
  getItemValue: (item: T) => string;
}

// Form field definition
export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox";
  placeholder?: string;
  required?: boolean;
  isI18n?: boolean;
  options?: { label: string; value: string }[];
}

// Entity form dialog props
export interface EntityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  defaultValues?: Record<string, any>;
  schema: AnyZodObject;
  onSubmit: (values: any) => Promise<void>;
  fields: FormField[];
  loading?: boolean;
  submitText?: string;
}

// ====================
// Dashboard Types
// ====================

// Dashboard data type
export interface DashboardData {
  postCount: number;
  viewCount: number;
  commentCount: number;
  categoryCount: number;
  recentPosts: Array<{
    id: string;
    title: string;
    publishDate: string;
    status: string;
    viewCount: number;
  }>;
}

// Re-export types from other files
export * from "./posts";
