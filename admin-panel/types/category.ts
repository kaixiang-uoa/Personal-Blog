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

export interface CategorySelection {
  mode: 'select' | 'create'
  selectedId?: string
  newCategory?: {
    name: string
    slug: string
  }
}

export interface CategorySelectorProps {
  value?: string
  onChange: (categoryId: string) => void
}