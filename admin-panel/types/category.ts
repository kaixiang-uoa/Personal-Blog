import { BaseEntity } from './common';

export interface Category extends BaseEntity {
  name: { zh: string; en: string };
  slug: string;
  description: { zh: string; en: string };
  postCount: number;
}

export interface CategoryFormData {
  name: { zh: string; en: string };
  slug: string;
  description?: { zh: string; en: string };
}

// API请求数据类型，与后端API匹配
export interface CategoryApiData {
  name: string;
  name_zh: string;
  name_en: string;
  slug: string;
  description?: string;
  description_zh?: string;
  description_en?: string;
  parent?: string;
  featuredImage?: string;
}

export interface CategoryParams {
  id: string;
}

export interface CategorySelection {
  mode: 'select' | 'create'
  selectedId?: string
  newCategory?: {
    name: { zh: string; en: string }
    slug: string
  }
}

export interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  defaultValues?: Partial<CategoryFormData>;
}

export interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: Category[];
  onChange: (categories: Category[]) => void;
  multiple?: boolean;
  displayMode?: string;
  size?: string;
  showSelected?: boolean;
  placeholder?: string;
  disabled?: boolean;
}