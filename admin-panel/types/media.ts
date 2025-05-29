import { BaseEntity } from './common';

export interface Media extends BaseEntity {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  type: "image" | "document" | "video" | "other";
  dimensions?: { width: number; height: number };
  uploadDate: string;
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