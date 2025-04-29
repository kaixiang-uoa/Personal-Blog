export interface Author {
  _id: string;
  username: string;
  displayName?: string;
  avatar?: string;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  publishedAt: string;
  status?: 'draft' | 'published';
  viewCount?: number;
  commentCount?: number;
  allowComments?: boolean;
  createdAt?: string;
  updatedAt?: string;
  author?: Author;
  categories?: Category[];
  tags?: Tag[];
  seo?: SEO;
  category: Category;
  views: number;
}

export interface Tag {
  _id: string;
  name: string;
  name_en?: string;
  name_zh?: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  name_en?: string;
  name_zh?: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 统一的API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// 分页数据接口
export interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  limit?: number;
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

// 评论信息
export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  postId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

// 评论列表响应
export interface CommentsData {
  comments: Comment[];
}

// API响应类型
export type TagsApiResponse = ApiResponse<TagsData>;
export type CategoriesApiResponse = ApiResponse<CategoriesData>;
export type PostsApiResponse = ApiResponse<PostsData>;
export type PostApiResponse = ApiResponse<PostData>;
export type CommentsApiResponse = ApiResponse<CommentsData>;

// 通用错误响应
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  data: null;
  originalError?: import('axios').AxiosError;
}

export type SortOrder = 'latest' | 'oldest' | 'popular';
