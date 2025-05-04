import type { Category } from '@/types/models/category';

export interface CategoriesData {
    categories: Category[];
    count?: number;
  }

export interface GetFallbackRouteParams{
  lang?: string;
}