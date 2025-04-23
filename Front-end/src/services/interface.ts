export interface Author {
  _id: string;
  username: string;
  displayName?: string;
}

export interface Article {
  _id: string;
  title: string;
  content: string; 
  excerpt: string;
  slug: string;
  featuredImage?: string;
  publishedAt: string;
  author?: {
    _id: string;
    username: string;
    displayName?: string;
  };
  categories?: Category[];
  tags?: Tag[];
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

// 统一的API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// 分页数据接口
export interface PaginationData<T> {
  items: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// 特定业务接口
export interface TagsData {
  tags: Tag[];
  count?: number;
}

export interface CategoriesData {
  categories: Category[];
  count?: number;
}

export interface PostsData {
  posts: Article[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PostData {
  post: Article;
}

// API响应类型
export type TagsApiResponse = ApiResponse<TagsData>;
export type CategoriesApiResponse = ApiResponse<CategoriesData>;
export type PostsApiResponse = ApiResponse<PostsData>;
export type PostApiResponse = ApiResponse<PostData>;

// 通用错误响应
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  data: null;
  originalError?: any;
}

export type SortOrder =
  | "publishedAt-desc"
  | "publishedAt-asc"
  | "updatedAt-desc"
  | "updatedAt-asc";