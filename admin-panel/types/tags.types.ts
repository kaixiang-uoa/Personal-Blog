/**
 * Tag Type Definitions
 */
import { BaseEntity } from './common.types';

export interface Tag {
  _id: string;
  name: string | { en: string; zh: string };
  slug: string;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TagFormData {
  name: { zh: string; en: string };
  slug: string;
}

// API请求数据类型，与后端API匹配
export interface TagApiData {
  name: string;
  name_zh: string;
  name_en: string;
  slug: string;
}

export interface TagParams {
  id: string;
}

export interface TagListItem extends Omit<Tag, 'description'> {
  postCount: number;
}

// For backward compatibility
export type TagType = Tag;

export interface TagSelectorProps {
  tags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
  multiple?: boolean;
  displayMode?: string;
  removable?: boolean;
  maxDisplay?: number;
  showCount?: boolean;
  inputPlaceholder?: string;
  disabled?: boolean;
  collapsible?: boolean;
}

export interface TagResponse {
  success: boolean;
  data: {
    tags: Tag[];
  };
}