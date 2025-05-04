export interface Category {
    _id: string;
    name: string;
    name_en?: string;
    name_zh?: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }

export type CategorySlug = Category['slug'];