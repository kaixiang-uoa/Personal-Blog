import { BaseEntity } from './common';

export interface Media extends BaseEntity {
  url: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedBy: string;
  title?: string;
  description?: string;
  altText?: string;
}

export interface MediaFormData {
  file: File;
  alt?: string;
  description?: string;
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