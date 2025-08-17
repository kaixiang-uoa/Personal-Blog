import { Category, Tag } from "./index";

// Form data types
export interface CategoryFormData {
  name: {
    en: string;
    zh: string;
  };
  slug: string;
  description: {
    en: string;
    zh: string;
  };
}

export interface TagFormData {
  name: {
    en: string;
    zh: string;
  };
  slug: string;
}

// Categories toolbar component props
export interface CategoriesToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateCategory: () => void;
  onCreateTag: () => void;
}

// Category grid component props
export interface CategoryGridProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onCreateNew: () => void;
}

// Tag grid component props
export interface TagGridProps {
  tags: Tag[];
  loading: boolean;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
  onCreateNew: () => void;
}
