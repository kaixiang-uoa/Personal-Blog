# Blog API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## API Endpoints

### Posts ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/posts` | Get all posts | No | ✅ 已实现 |
| GET | `/posts/slug/:slug` | Get post by slug | No | ✅ 已实现 |
| GET | `/posts/:id` | Get post by ID | No | ✅ 已实现 |
| POST | `/posts` | Create new post | Yes (Admin) | ✅ 已实现 |
| PUT | `/posts/:id` | Update post | Yes (Admin) | ✅ 已实现 |
| DELETE | `/posts/:id` | Delete post | Yes (Admin) | ✅ 已实现 |

### Users ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/users` | Get all users | Yes (Admin) | ✅ 已实现 |
| GET | `/users/:id` | Get user by ID | Yes (Admin) | ✅ 已实现 |
| POST | `/users` | Create new user | Yes (Admin) | ✅ 已实现 |
| PUT | `/users/:id` | Update user | Yes (Admin) | ✅ 已实现 |
| PUT | `/users/profile` | Update current user profile | Yes | ✅ 已实现 |
| DELETE | `/users/:id` | Delete user | Yes (Admin) | ✅ 已实现 |

### Categories ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/categories` | Get all categories | No | ✅ 已实现 |
| GET | `/categories/:id` | Get category by ID | No | ✅ 已实现 |
| GET | `/categories/slug/:slug` | Get category by slug | No | ✅ 已实现 |
| POST | `/categories` | Create new category | Yes (Admin) | ✅ 已实现 |
| PUT | `/categories/:id` | Update category | Yes (Admin) | ✅ 已实现 |
| DELETE | `/categories/:id` | Delete category | Yes (Admin) | ✅ 已实现 |

### Tags ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/tags` | Get all tags | No | ✅ 已实现 |
| GET | `/tags/:id` | Get tag by ID | No | ✅ 已实现 |
| GET | `/tags/slug/:slug` | Get tag by slug | No | ✅ 已实现 |
| POST | `/tags` | Create new tag | Yes (Admin) | ✅ 已实现 |
| PUT | `/tags/:id` | Update tag | Yes (Admin) | ✅ 已实现 |
| DELETE | `/tags/:id` | Delete tag | Yes (Admin) | ✅ 已实现 |

### Comments ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/comments/post/:postId` | Get comments by post | No | ✅ 已实现 |
| POST | `/comments/post/:postId` | Create new comment | Yes | ✅ 已实现 |
| PUT | `/comments/:commentId` | Update comment | Yes | ✅ 已实现 |
| DELETE | `/comments/:commentId` | Delete comment | Yes | ✅ 已实现 |

### Media ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/media` | Get all media files | Yes | ✅ 已实现 |
| GET | `/media/:id` | Get media file by ID | Yes | ✅ 已实现 |
| POST | `/media` | Upload media file | Yes | ✅ 已实现 |
| PUT | `/media/:id` | Update media info | Yes | ✅ 已实现 |
| DELETE | `/media/:id` | Delete media file | Yes (Admin/Editor) | ✅ 已实现 |

### Settings ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/settings` | Get all settings | No | ✅ 后端已实现 |
| GET | `/settings/:key` | Get setting by key | No | ✅ 后端已实现 |
| POST | `/settings` | Create/update setting | Yes (Admin) | ✅ 后端已实现 |
| POST | `/settings/batch` | Batch update settings | Yes (Admin) | ✅ 后端已实现 |
| PUT | `/settings/:key` | Update setting | Yes (Admin) | ✅ 后端已实现 |
| DELETE | `/settings/:key` | Delete setting | Yes (Admin) | ✅ 后端已实现 |

### Authentication ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| POST | `/auth/login` | User login | No | ✅ 已实现 |
| POST | `/auth/register` | User registration | No | ✅ 已实现 |
| POST | `/auth/logout` | User logout | Yes | ✅ 已实现 |
| GET | `/auth/me` | Get current user | Yes | ✅ 已实现 |

### Internationalization ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| GET | `/i18n/languages` | Get supported languages | No | ✅ 已实现 |
| GET | `/i18n/translations/:lang` | Get translations by language | No | ✅ 已实现 |

### Contact ✅
| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| POST | `/contact` | Send contact message | No | ✅ 已实现 |

## 实现状态说明
- ✅ 已实现：API 已在后端完成实现
- ⏳ 前端待实现：后端 API 已完成，前端界面待实现
- 📅 计划实现：计划在未来版本中开发

## 当前版本开发计划

### 系统设置功能（预计1天）
- 基础UI实现
- 设置管理实现
- 数据持久化

## 技术注意事项

1. API基础URL配置
   - 当前配置为 `http://localhost:3000/api/v1`
   - 需要确保与后端API版本匹配

2. 认证机制
   - 已正确实现JWT token认证
   - 需要在所有需要认证的请求中正确携带token

3. 错误处理
   - 已实现基本的错误处理机制
   - 建议增加更详细的错误类型处理

4. 文件上传
   - 已实现基本的文件上传功能
   - 已在后端实现文件类型验证和大小限制（10MB）

## Error Responses
The API uses conventional HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Response Format
All responses are in JSON format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```
