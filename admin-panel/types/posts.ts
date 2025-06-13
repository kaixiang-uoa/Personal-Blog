import { Tag, Category } from './index';

// Post status enum
export enum PostStatus {
  ALL = 'all',
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

// Post type
export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: PostStatus;
  featured?: boolean;
  featuredImage?: string;
  categories?: string[] | Category[];
  tags?: string[] | Tag[];
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  viewCount?: number;
}

export interface TagSelectorProps {
  tags?: Tag[];
  selectedTags?: Tag[];
  onChange: (tags: Tag[]) => void;
  multiple?: boolean;
  displayMode?: 'default' | 'minimal';
  size?: 'default' | 'sm';
  showSelected?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface CategorySelectorProps {
  categories?: Category[];
  selectedCategories?: Category[];
  onChange: (categories: Category[]) => void;
  multiple?: boolean;
  displayMode?: 'default' | 'minimal';
  size?: 'default' | 'sm';
  showSelected?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface PostQueryParams {
  status?: PostStatus;
  allStatus?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}