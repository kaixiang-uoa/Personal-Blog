import { BaseEntity } from './common.types';

export interface Media {
  _id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  url: string;
  altText?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaResponse {
  success: boolean;
  data: {
    media: Media[];
  };
}

export interface MediaFormData {
  alt?: string;
  description?: string;
  [key: string]: any;
}

export interface MediaParams {
  id: string;
}

export interface MediaFilters {
  searchQuery?: string;
  mimeType?: string;
  postId?: string;
  sortField?: keyof Media;
  sortDirection?: "asc" | "desc";
}

/**
 * Interface for media query parameters
 */
export interface MediaQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  type?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Media list response interface
 */
export interface MediaListResponse {
  success: boolean;
  message?: string;
  data: {
    media: Media[];
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Media upload progress event interface
 */
export interface UploadProgressEvent {
  loaded: number;
  total: number;
  progress: number;
  bytes: number;
  rate?: number;
  estimated?: number;
}

/**
 * Media API response interface
 */
export interface MediaApiResponse {
  success: boolean;
  message?: string;
  media?: any;
  [key: string]: any;
} 