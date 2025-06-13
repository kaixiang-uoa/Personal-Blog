/**
 * Simplified Type Definitions
 * Consolidated type definitions for the Admin Panel
 */

import { z } from "zod";
import { useForm, UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  role: 'admin' | 'editor' | 'user';
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
    role: 'admin' | 'editor' | 'user';
  }
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
  createdAt?: string;
  updatedAt?: string;
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

// Typed form hook
export function useTypedForm<TSchema extends z.ZodType<any, any, any>, TValues extends FieldValues = z.infer<TSchema>>(
  schema: TSchema,
  defaultValues?: DefaultValues<TValues>
): UseFormReturn<TValues> {
  return useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues
  });
}

// Login form schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
  rememberMe: z.boolean().default(false)
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Reset password form schema
export const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
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
  isI18n?: boolean; // Whether supports multilingual
  options?: { label: string; value: string }[];
}

// Entity form dialog props
export interface EntityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  defaultValues?: any;
  schema: z.ZodType<any>;
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
export * from './auth';
export * from './posts'; 