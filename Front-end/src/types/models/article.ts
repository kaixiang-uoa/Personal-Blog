import type { Author } from './author';
import type { Category } from './category';
import type { Tag } from './tag';
import type { SEO } from './seo';
export interface Article {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  publishedAt: string;
  status?: 'draft' | 'published';
  commentCount?: number;
  allowComments?: boolean;
  createdAt: string;
  updatedAt: string;
  author?: Author;
  categories?: Category[];
  tags: Tag[];
  seo?: SEO;
  category: { slug: string };
  viewCount: number;
}
