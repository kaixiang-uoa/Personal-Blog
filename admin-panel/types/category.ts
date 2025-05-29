import { BaseEntity } from './common';

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryParams {
  id: string;
}