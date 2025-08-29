# Media APIs

## 1. Upload Media File
### Request
```typescript
interface UploadMediaRequest {
  file: File;           // File object
  type?: string;        // File type (image/video/document)
  folder?: string;      // Storage folder
  metadata?: {          // Optional metadata
    title?: string;
    description?: string;
    alt?: string;
    tags?: string[];
  };
}
```

### Response
```typescript
interface UploadMediaResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    url: string;
    thumbnailUrl?: string;
    type: string;
    name: string;
    size: number;
    mimeType: string;
    metadata: {
      title?: string;
      description?: string;
      alt?: string;
      tags?: string[];
    };
    createdAt: string;
  };
}
```

### Example
```http
POST /api/v1/media/upload
Content-Type: multipart/form-data

file: [binary]
type: image
folder: blog
metadata: {
  "title": "My Image",
  "description": "Image description",
  "alt": "Alternative text"
}
```

## 2. Get Media File List
### Request Parameters
```typescript
interface MediaQueryParams {
  page?: number;        // Page number, default 1
  limit?: number;       // Items per page, default 20
  type?: string;        // File type filter
  folder?: string;      // Folder filter
  search?: string;      // Search keyword
  sort?: string;        // Sort field
  order?: 'asc' | 'desc'; // Sort direction
}
```

### Response
```typescript
interface MediaListResponse {
  success: boolean;
  message: string;
  data: {
    currentPage: number;
    files: MediaFile[];
    total: number;
    totalPages: number;
  };
}

interface MediaFile {
  id: string;
  url: string;
  thumbnailUrl?: string;
  type: string;
  name: string;
  size: number;
  mimeType: string;
  folder: string;
  metadata: {
    title?: string;
    description?: string;
    alt?: string;
    tags?: string[];
  };
  createdAt: string;
  updatedAt: string;
}
```

### Example
```http
GET /api/v1/media?page=1&limit=20&type=image&folder=blog
```

## 3. Get Single Media File
### Request
```typescript
interface MediaDetailParams {
  id: string;
}
```

### Response
```typescript
interface MediaDetailResponse {
  success: boolean;
  message: string;
  data: MediaFile;
}
```

### Example
```http
GET /api/v1/media/123
```

## 4. Update Media File Information
### Request
```typescript
interface UpdateMediaRequest {
  title?: string;
  description?: string;
  alt?: string;
  tags?: string[];
  folder?: string;
}
```

### Response
```typescript
interface UpdateMediaResponse {
  success: boolean;
  message: string;
  data: MediaFile;
}
```

### Example
```http
PUT /api/v1/media/123
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["nature", "landscape"]
}
```

## 5. Delete Media File
### Request
```typescript
interface DeleteMediaParams {
  id: string;
}
```

### Response
```typescript
interface DeleteMediaResponse {
  success: boolean;
  message: string;
}
```

### Example
```http
DELETE /api/v1/media/123
```

## 6. Batch Operations
### Batch Delete
```typescript
interface BatchDeleteRequest {
  ids: string[];
}
```

### Batch Update
```typescript
interface BatchUpdateRequest {
  ids: string[];
  data: {
    folder?: string;
    tags?: string[];
  };
}
```

## Error Handling
### Common Errors
- 400: Invalid Request Parameters
- 401: Unauthenticated
- 403: Permission Denied
- 404: File Not Found
- 413: File Too Large
- 415: Unsupported File Type

### Error Response Example
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds the limit"
  }
}
```

## Notes
1. Supported File Types:
   - Images: jpg, jpeg, png, gif, webp
   - Videos: mp4, webm, mov
   - Documents: pdf, doc, docx, xls, xlsx

2. File Size Limits:
   - Images: Maximum 10MB
   - Videos: Maximum 100MB
   - Documents: Maximum 20MB

3. Image Processing:
   - Automatic thumbnail generation
   - Image compression support
   - Image cropping support

4. Security Measures:
   - File type validation
   - File size restrictions
   - Virus scanning
   - Access control 