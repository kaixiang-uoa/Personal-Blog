export interface LoginError extends Error {
  loginError: boolean;
  originalMessage: string;
  isLoginError: boolean;
}

// Base entity interface
export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Common status types
export type PostStatus = "draft" | "published" | "archived";

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
