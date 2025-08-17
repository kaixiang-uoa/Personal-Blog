// API Data Hook Types
export interface UseApiDataOptions<T> {
  endpoint: string;
  params?: Record<string, unknown>;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
  toastMessage?: string;
}

export interface UseApiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setData: (data: T | null) => void;
}

// Posts Hook Types
export interface PostsData {
  posts: any[];
  total: number;
  page: number;
  limit: number;
}

export interface UsePostsOptions {
  status?: any; // Will be properly typed when we import PostStatus
  limit?: number;
  page?: number;
  search?: string;
  sort?: string;
  dependencies?: any[];
}

export interface UsePostsReturn {
  posts: any[];
  total: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UsePostsReturn {
  posts: any[];
  total: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Taxonomies Hook Types
export interface TaxonomiesData {
  categories: any[];
  tags: any[];
}

export interface UseTaxonomiesReturn {
  categories: any[];
  tags: any[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Settings Hook Types
export interface UseSettingsReturn {
  settings: any;
  loading: boolean;
  isSaving: boolean;
  error: Error | null;
  fetchSettings: () => Promise<void>;
  saveSettings: (
    group: string,
    values: Record<string, unknown>
  ) => Promise<boolean>;
}
