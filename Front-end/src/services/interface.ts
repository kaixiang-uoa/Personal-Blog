

export interface Article {
  _id: string;
  title: string;
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

  export interface TagsApiResponse {
    success: boolean
    count: number
    tags: Tag[]
  }
  
  export interface CategoriesApiResponse {
    categories: Category[]
  }
  
  export interface PostsApiResponse {
    data: Article[]
    total?: number
    meta?: {
      total?: number
    }
  }