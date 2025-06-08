# API 文档

本文档详细说明了博客系统的REST API接口，包括请求参数、响应格式和错误处理。主要用于前后端开发人员对接和API参考。

## 1. 通用规范

### 1.1 基础URL

所有API都以以下基础URL开头：

```
/api/v1
```

### 1.2 请求与响应格式

- 请求体使用JSON格式
- 响应数据使用统一的JSON格式
- 所有请求都需要设置`Content-Type: application/json`

### 1.3 通用响应格式

所有API响应都遵循以下统一格式：

```json
{
  "success": true|false,
  "message": "Success message or error description",
  "data": { ... },
  "requestId": "unique-request-id"
}
```

### 1.4 错误响应格式

错误响应遵循以下格式：

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "type": "ERROR_TYPE",
    "requestId": "unique-request-id",
    "code": "ERROR_CODE",
    "statusCode": 400|401|403|404|500
  }
}
```

### 1.5 标准HTTP状态码

| 状态码 | 描述 |
|-------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

### 1.6 身份验证

部分API需要JWT身份验证，在请求头中添加：

```
Authorization: Bearer {token}
```

## 2. 文章API

### 2.1 获取文章列表

- **端点**: `GET /api/v1/posts`
- **描述**: 获取文章列表，支持分页、排序和筛选
- **认证**: 不需要
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| page | number | 否 | 页码，默认为1 | 1 |
| limit | number | 否 | 每页条数，默认为10 | 10 |
| tagSlug | string | 否 | 标签slug，多个用逗号分隔 | "tag1,tag2" |
| categorySlug | string | 否 | 分类slug | "category1" |
| search | string | 否 | 搜索关键词 | "javascript" |
| sort | string | 否 | 排序方式 | "publishedAt-desc" |
| lang | string | 否 | 语言 | "en" |

- **排序选项**:
  - `publishedAt-desc`: 最新发布（与`latest`等价）
  - `publishedAt-asc`: 最早发布（与`oldest`等价）
  - `updatedAt-desc`: 最近更新
  - `updatedAt-asc`: 最早更新
  - `popular`: 按阅读量排序

- **响应**:

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "post-id",
        "title": "文章标题",
        "slug": "article-slug",
        "excerpt": "文章摘要",
        "author": {
          "_id": "author-id",
          "username": "作者用户名",
          "displayName": "作者显示名"
        },
        "categories": [...],
        "tags": [...],
        "featuredImage": "图片URL",
        "viewCount": 100,
        "publishedAt": "2023-01-01T00:00:00.000Z",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-02T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 100,
      "totalPages": 10,
      "currentPage": 1,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 2.2 获取文章详情

- **端点**: `GET /api/v1/posts/slug/:slug`
- **描述**: 通过slug获取文章详情
- **认证**: 不需要
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| slug | string | 是 | 文章slug | "article-slug" |
| lang | string | 否 | 语言 | "en" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "post": {
      "_id": "post-id",
      "title": "文章标题",
      "slug": "article-slug",
      "content": "文章内容",
      "excerpt": "文章摘要",
      "author": {...},
      "categories": [...],
      "tags": [...],
      "featuredImage": "图片URL",
      "viewCount": 100,
      "publishedAt": "2023-01-01T00:00:00.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z"
    }
  }
}
```

### 2.3 创建文章

- **端点**: `POST /api/v1/posts`
- **描述**: 创建新文章
- **认证**: 需要（admin或author角色）
- **请求体**:

```json
{
  "title": "文章标题",
  "content": "文章内容",
  "excerpt": "文章摘要",
  "categories": ["category-id-1", "category-id-2"],
  "tags": ["tag-id-1", "tag-id-2"],
  "featuredImage": "图片URL",
  "status": "draft|published|archived",
  "allowComments": true
}
```

- **响应**:

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      "_id": "new-post-id",
      "title": "文章标题",
      "slug": "auto-generated-slug",
      ...
    }
  }
}
```

### 2.4 更新文章

- **端点**: `PUT /api/v1/posts/:id`
- **描述**: 更新现有文章
- **认证**: 需要（admin或作者本人）
- **请求体**: 与创建文章相同，字段可选
- **响应**:

```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "post": {
      "_id": "post-id",
      ...更新后的文章数据
    }
  }
}
```

### 2.5 删除文章

- **端点**: `DELETE /api/v1/posts/:id`
- **描述**: 删除文章
- **认证**: 需要（admin或作者本人）
- **响应**:

```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

## 3. 分类API

### 3.1 获取所有分类

- **端点**: `GET /api/v1/categories`
- **描述**: 获取所有分类
- **认证**: 不需要
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| lang | string | 否 | 语言 | "en" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "_id": "category-id",
        "name": "分类名称",
        "slug": "category-slug",
        "description": "分类描述",
        "parentCategory": null
      }
    ],
    "count": 10
  }
}
```

### 3.2 获取分类详情

- **端点**: `GET /api/v1/categories/slug/:slug`
- **描述**: 通过slug获取分类详情
- **认证**: 不需要
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| slug | string | 是 | 分类slug | "category-slug" |
| lang | string | 否 | 语言 | "en" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "category": {
      "_id": "category-id",
      "name": "分类名称",
      "slug": "category-slug",
      "description": "分类描述",
      "parentCategory": null
    }
  }
}
```

### 3.3 创建分类

- **端点**: `POST /api/v1/categories`
- **描述**: 创建新分类
- **认证**: 需要（admin角色）
- **请求体**:

```json
{
  "name": "分类名称",
  "description": "分类描述",
  "parentCategory": "父分类ID"
}
```

- **响应**:

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "category": {
      "_id": "new-category-id",
      "name": "分类名称",
      "slug": "auto-generated-slug",
      ...
    }
  }
}
```

## 4. 标签API

### 4.1 获取所有标签

- **端点**: `GET /api/v1/tags`
- **描述**: 获取所有标签
- **认证**: 不需要
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| lang | string | 否 | 语言 | "en" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "tags": [
      {
        "_id": "tag-id",
        "name": "标签名称",
        "slug": "tag-slug"
      }
    ],
    "count": 20
  }
}
```

### 4.2 获取标签详情

- **端点**: `GET /api/v1/tags/slug/:slug`
- **描述**: 通过slug获取标签详情
- **认证**: 不需要
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| slug | string | 是 | 标签slug | "tag-slug" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "tag": {
      "_id": "tag-id",
      "name": "标签名称",
      "slug": "tag-slug"
    }
  }
}
```

## 5. 用户API

### 5.1 用户登录

- **端点**: `POST /api/v1/auth/login`
- **描述**: 用户登录
- **认证**: 不需要
- **请求体**:

```json
{
  "username": "用户名",
  "password": "密码"
}
```

- **响应**:

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "_id": "user-id",
      "username": "用户名",
      "displayName": "显示名",
      "role": "admin|author|user"
    }
  }
}
```

### 5.2 获取当前用户信息

- **端点**: `GET /api/v1/users/me`
- **描述**: 获取当前登录用户信息
- **认证**: 需要
- **响应**:

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user-id",
      "username": "用户名",
      "displayName": "显示名",
      "email": "邮箱",
      "role": "admin|author|user",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

## 6. 设置API

### 6.1 获取所有设置

- **端点**: `GET /api/v1/settings`
- **描述**: 获取所有站点设置
- **认证**: 不需要（公开设置）/ 需要（私有设置）
- **参数**: 无
- **响应**:

```json
{
  "success": true,
  "data": {
    "settings": {
      "general.siteName": "站点名称",
      "general.siteDescription": "站点描述",
      "appearance.theme": "dark",
      "posts.perPage": 10
    }
  }
}
```

### 6.2 获取分组设置

- **端点**: `GET /api/v1/settings?group=groupName`
- **描述**: 获取特定分组的设置
- **认证**: 不需要（公开设置）/ 需要（私有设置）
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| group | string | 是 | 设置分组 | "general" |
| lang | string | 否 | 语言 | "en" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "settings": {
      "general.siteName": "站点名称",
      "general.siteDescription": "站点描述"
    }
  }
}
```

### 6.3 更新设置

- **端点**: `PUT /api/v1/settings/:key`
- **描述**: 更新特定设置
- **认证**: 需要（admin角色）
- **请求体**:

```json
{
  "value": "新设置值"
}
```

- **响应**:

```json
{
  "success": true,
  "message": "Setting updated successfully",
  "data": {
    "setting": {
      "key": "setting-key",
      "value": "新设置值",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

## 7. 媒体API

### 7.1 上传文件

- **端点**: `POST /api/v1/media`
- **描述**: 上传媒体文件
- **认证**: 需要（admin或author角色）
- **请求体**: 使用`multipart/form-data`格式
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 |
|-------|------|---------|------|
| file | file | 是 | 要上传的文件 |

- **响应**:

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "media": {
      "_id": "media-id",
      "filename": "stored-filename.jpg",
      "originalname": "original.jpg",
      "path": "/uploads/2023/01/stored-filename.jpg",
      "mimetype": "image/jpeg",
      "size": 123456,
      "uploadedBy": "user-id",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### 7.2 获取媒体列表

- **端点**: `GET /api/v1/media`
- **描述**: 获取媒体文件列表
- **认证**: 需要（admin或author角色）
- **参数**:

| 参数名 | 类型 | 是否必须 | 描述 | 示例 |
|-------|------|---------|------|------|
| page | number | 否 | 页码，默认为1 | 1 |
| limit | number | 否 | 每页条数，默认为20 | 20 |
| type | string | 否 | 媒体类型 | "image" |

- **响应**:

```json
{
  "success": true,
  "data": {
    "media": [...],
    "pagination": {
      "total": 100,
      "totalPages": 5,
      "currentPage": 1,
      "limit": 20
    }
  }
}
```

## 8. 前后端对接注意事项

### 8.1 排序参数映射

前端排序参数与后端的对应关系：

| 前端参数 | 后端参数 | 描述 |
|---------|---------|------|
| latest | publishedAt-desc | 最新发布 |
| oldest | publishedAt-asc | 最早发布 |
| popular | popular | 按阅读量排序 |

### 8.2 参数兼容性

为保证API向后兼容性，以下参数将被支持：

| 旧参数 | 新参数 | 描述 |
|-------|-------|------|
| tag | tagSlug | 标签筛选 |
| category | categorySlug | 分类筛选 |

### 8.3 国际化参数

所有支持国际化的API都接受`lang`参数，可选值：

- `en`: 英文
- `zh`: 中文

### 8.4 错误处理最佳实践

前端处理API错误的建议方式：

```javascript
try {
  const response = await api.get('/posts');
  if (response.success) {
    // 处理成功响应
    const posts = response.data.posts;
  } else {
    // 处理错误响应
    console.error(response.error.message);
    // 根据错误类型和代码进行不同处理
    if (response.error.code === 'RESOURCE_NOT_FOUND') {
      // 处理资源不存在错误
    }
  }
} catch (error) {
  // 处理网络错误
  console.error('Network error:', error);
}
```

## 9. API变更历史

| 日期 | 变更内容 |
|------|---------|
| 2023-10-15 | 初始版本 |
| 2023-11-01 | 添加标签和分类的slug端点 |
| 2023-12-10 | 更新分页响应格式 |
| 2024-01-20 | 添加参数映射支持 |
| 2024-02-15 | 统一错误响应格式 | 