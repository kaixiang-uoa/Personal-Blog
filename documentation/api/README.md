# API Documentation Index

## Documentation Structure
```
api/
├── README.md           # API Documentation Index (Current File)
├── auth.md            # Authentication APIs
├── posts.md           # Post Management APIs
└── media.md           # Media Management APIs
```

## API Categories

### 1. Authentication APIs (`auth.md`)
- Login (POST /api/v1/auth/login)
- Refresh Token (POST /api/v1/auth/refresh)
- Logout (POST /api/v1/auth/logout)
- Password Reset (POST /api/v1/auth/request-password-reset, POST /api/v1/auth/reset-password)

### 2. Post Management APIs (`posts.md`)
- Post List (GET /api/v1/posts)
- Post Details (GET /api/v1/posts/:id)
- Create Post (POST /api/v1/posts)
- Update Post (PUT /api/v1/posts/:id)
- Delete Post (DELETE /api/v1/posts/:id)
- Category Management
- Tag Management

### 3. Media Management APIs (`media.md`)
- Media Upload (POST /api/v1/media/upload)
- Media List (GET /api/v1/media)
- Media Details (GET /api/v1/media/:id)
- Update Media Info (PUT /api/v1/media/:id)
- Delete Media (DELETE /api/v1/media/:id)
- Batch Operations

## General Information

### Request Format
- All requests use JSON format
- Authentication via Authorization header
- CSRF protection via X-CSRF-Token header
- File uploads use multipart/form-data format

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```

### Error Handling
- 400: Invalid Request Parameters
- 401: Unauthorized
- 403: Forbidden
- 404: Resource Not Found
- 413: File Too Large
- 415: Unsupported File Type
- 429: Too Many Requests
- 500: Server Error

### Pagination Parameters
```typescript
interface PaginationParams {
  page?: number;    // Page number, default 1
  limit?: number;   // Items per page, default 10
  sort?: string;    // Sort field
  order?: 'asc' | 'desc'; // Sort direction
}
```

### Search Parameters
```typescript
interface SearchParams {
  search?: string;  // Search keyword
  status?: string;  // Status filter
  type?: string;    // Type filter
  folder?: string;  // Folder filter
}
```

## Version Control
- Current Version: v1
- API Path Prefix: /api/v1
- Version Update Strategy: Backward Compatible

## Security Notes
1. All API requests must use HTTPS
2. Sensitive operations require secondary verification
3. File uploads have type and size restrictions
4. Request rate limiting is implemented
5. CSRF protection is supported

## Changelog
- 2024-03-21: Initial Version
  - Completed Authentication API documentation
  - Completed Post Management API documentation
  - Completed Media Management API documentation
  - Added detailed error handling documentation
  - Added security notes 