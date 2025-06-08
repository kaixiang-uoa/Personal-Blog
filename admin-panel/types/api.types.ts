/**
 * API Types - Centralized API related type definitions
 */
import { UserInfo } from "./auth.types";

// Common response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error response types
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Pagination types
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

// API specific response types
export interface AuthResponse extends ApiResponse<UserInfo> {
  token?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface LoginError extends Error {
  loginError: boolean;
  originalMessage?: string;
  isLoginError: boolean;
}

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}