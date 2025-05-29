import { BaseEntity } from './common';

export interface Tag extends BaseEntity {
  name: string;
  slug: string;
  postCount: number;
  _id: string;
}

export interface TagFormData {
  name: string;
  slug: string;
}

export interface TagParams {
  id: string;
}

// For backward compatibility
export type TagType = Tag;