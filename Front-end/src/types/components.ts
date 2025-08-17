import { Tag } from './models/tag';
import { Category } from './models/category';
import { SortOrder } from './models/common';

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  isHorizontal?: boolean;
  showLabel?: boolean;
}

export interface FilterSidebarProps {
  tags: Tag[];
  activeTags: string[];
  categories: Category[];
  activeCategory: string | null;
  sortOrder: SortOrder;
  currentLocale: string;
  isHorizontal?: boolean;
  onFilterChangeAction: (params: {
    type: 'tags' | 'category' | 'sort';
    value: string | string[] | SortOrder;
  }) => void;
  onClearFiltersAction: () => void;
}

export interface PageBannerProps {
  bannerKey: string;
  title: string;
  subtitle?: string;
  height?: 'default' | 'large';
  defaultImage?: string;
}
