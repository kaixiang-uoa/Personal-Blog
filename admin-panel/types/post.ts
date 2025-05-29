import { BaseEntity, PostStatus, Author } from './common';
import { Category } from './category';
import { TagType } from './tags';

export interface Post extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categories?: Category[];
  tags: string[];
  status: PostStatus;
  featured: boolean;
  featuredImage: string;
  author?: Author;
  publishDate?: string;
  viewCount?: number;
}

export interface PostData extends Omit<Post, 'category' | 'tags'> {
  categoryData: Category[];
  displayTags: string[];
  originalTags: TagType[];
  tempTags?: string[];
  tagsToRemove?: TagType[];
}

export interface PostParams {
  id: string;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: PostStatus;
  featured: boolean;
  featuredImage: string;
}
  