import { Article } from '@/types/models/article';
import { SortOrder } from '@/types/models/common';

export interface PostsData {
    posts: Article[];
    total: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface PostData {
    post: Article;
  }

  export interface GetAllPostsParams { 
    page?: number; 
    limit?: number; 
    tag?: string; 
    category?: string; 
    search?: string; 
    sort?: SortOrder; 
    lang?: string;
  }