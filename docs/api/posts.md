# Post APIs

## 1. Get Post List
### Request Parameters
```typescript
interface PostQueryParams {
  page?: number;        // Page number, default 1
  limit?: number;       // Items per page, default 10
  sort?: string;        // Sort field
  status?: string;      // Post status
  search?: string;      // Search keyword
  category?: string;    // Category ID
  tag?: string;         // Tag ID
  featured?: boolean;   // Featured flag
}
```

### Response
```typescript
interface PostListResponse {
  success: boolean;
  message: string;
  data: {
    currentPage: number;
    posts: Post[];
    total: number;
    totalPages: number;
  };
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: Tag[];
  status: PostStatus;
  featured: boolean;
  featuredImage: string;
  author: Author;
  publishDate?: string;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
}

type PostStatus = 'draft' | 'published' | 'archived';
```

### Example
```http
GET /api/v1/posts?page=1&limit=10&status=published&category=tech
```

## 2. Get Single Post
### Request
```typescript
interface PostDetailParams {
  id?: string;    // Post ID
  slug?: string;  // Post slug
}
```

### Response
```typescript
interface PostDetailResponse {
  success: boolean;
  message: string;
  data: Post;
}
```

### Example
```http
GET /api/v1/posts/123
GET /api/v1/posts/slug/my-article
```

## 3. Create Post
### Request
```typescript
interface CreatePostRequest {
  title: string;
  slug?: string;        // Optional, auto-generated if not provided
  excerpt?: string;     // Optional
  content: string;
  category: string;     // Category ID
  tags?: string[];      // Tag ID array
  status: PostStatus;
  featured?: boolean;
  featuredImage?: string;
  publishDate?: string; // Optional, scheduled publishing
}
```

### Response
```typescript
interface CreatePostResponse {
  success: boolean;
  message: string;
  data: Post;
}
```

### Example
```http
POST /api/v1/posts
Content-Type: application/json

{
  "title": "My New Article",
  "content": "Article content...",
  "category": "tech",
  "tags": ["javascript", "react"],
  "status": "draft"
}
```

## 4. Update Post
### Request
```typescript
interface UpdatePostRequest {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  status?: PostStatus;
  featured?: boolean;
  featuredImage?: string;
  publishDate?: string;
}
```

### Response
```typescript
interface UpdatePostResponse {
  success: boolean;
  message: string;
  data: Post;
}
```

### Example
```http
PUT /api/v1/posts/123
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "published"
}
```

## 5. Delete Post
### Request
```typescript
interface DeletePostParams {
  id: string;
}
```

### Response
```typescript
interface DeletePostResponse {
  success: boolean;
  message: string;
}
```

### Example
```http
DELETE /api/v1/posts/123
```

## 6. Post Categories
### Get Category List
```typescript
interface CategoryListResponse {
  success: boolean;
  data: {
    categories: Category[];
    total: number;
  };
}
```

### Create Category
```typescript
interface CreateCategoryRequest {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
}
```

### Update Category
```typescript
interface UpdateCategoryRequest {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
}
```

## 7. Post Tags
### Get Tag List
```typescript
interface TagListResponse {
  success: boolean;
  data: {
    tags: Tag[];
    total: number;
  };
}
```

### Create Tag
```typescript
interface CreateTagRequest {
  name: string;
  slug?: string;
  description?: string;
}
```

### Update Tag
```typescript
interface UpdateTagRequest {
  name?: string;
  slug?: string;
  description?: string;
}
```

## Error Handling
### Common Errors
- 400: Request parameter error
- 401: Unauthenticated
- 403: Permission denied
- 404: Post not found
- 409: Post slug already exists

### Error Response Example
```json
{
  "success": false,
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "Article not found"
  }
}
```

## Notes
1. Post slug must be unique
2. Deleting a post will also delete related comments
3. Updating a post status to published will automatically set the publish date
4. Post content supports Markdown format
5. Image upload requires calling the media API first 