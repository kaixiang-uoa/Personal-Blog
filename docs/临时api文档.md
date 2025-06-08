# 临时API文档：admin-panel 与 Back-end API 对比分析

## 概述

本文档对比分析了 admin-panel 前端组件需要的 API 和 Back-end 后端提供的 API，重点关注数据类型结构的差异。解决这些差异将有助于统一前后端的数据交互。

## 1. 认证相关 API

### 1.1 登录 API

**前端请求 (admin-panel):**
```typescript
// 请求类型
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// 响应类型
interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: UserInfo;
  message?: string;
}

interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  avatar?: string;
  displayName?: string;
  permissions?: string[];
}
```

**后端实现 (Back-end):**
```javascript
// POST /auth/login
{
  success: true,
  token: string,
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  }
}
```

**差异:**
1. 后端响应中没有 `refreshToken` 字段
2. 后端响应的 user 对象不包含 `permissions` 和 `displayName` 字段

### 1.2 刷新令牌 API

**前端请求:**
刷新令牌 API 在前端定义了，但后端路由文件中不存在该 API。

**差异:**
1. 后端未实现 `/auth/refresh` 刷新令牌端点

## 2. 文章相关 API

### 2.1 获取文章列表

**前端请求 (admin-panel):**
```typescript
interface PostQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  status?: string;
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  [key: string]: string | number | boolean | undefined;
}

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
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string; 
  tags: TagType[];
  status: PostStatus;
  featured: boolean;
  featuredImage: string;
  author?: Author;
  publishDate?: string;
  viewCount?: number;
}
```

**后端实现 (Back-end):**
```javascript
// GET /posts
{
  success: true,
  posts: [
    {
      _id: string,
      title: string,
      slug: string,
      excerpt: string,
      content: string,
      categories: [{ _id: string, name: string, slug: string }],
      tags: [{ _id: string, name: string, slug: string }],
      status: string,
      featuredImage: string,
      author: { 
        _id: string, 
        username: string, 
        displayName: string, 
        avatar?: string 
      },
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
      viewCount: number
    }
  ],
  total: number,
  totalPages: number,
  currentPage: number
}
```

**差异:**
1. 前端的 `Post` 对象有 `category` 字段(单数)，后端返回 `categories` 数组(复数)
2. 前端的 `Post` 中 `tags` 类型与后端的结构不一致
3. 后端返回的字段名称有差异：`publishedAt` vs `publishDate`
4. 前端的 `featured` 字段在后端不存在
5. 后端响应的 `posts` 与前端期望的 `data.posts` 路径不同

### 2.2 获取单篇文章

**前端请求:**
```typescript
interface PostDetailResponse {
  success: boolean;
  message: string;
  data: Post;
}
```

**后端实现:**
```javascript
// GET /posts/:id 或 GET /posts/slug/:slug
{
  success: true,
  post: {
    _id: string,
    title: string,
    // 其他字段同上
  }
}
```

**差异:**
1. 后端返回的是 `post` 字段，而前端期望的是 `data` 字段

## 3. 分类相关 API

### 3.1 获取分类列表

**前端请求 (admin-panel):**
```typescript
interface CategoryFilters {
  searchQuery?: string;
  sortField?: keyof Category;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

interface Category {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  postCount?: number;
}
```

**后端实现 (Back-end):**
```javascript
// GET /categories
{
  success: true,
  categories: [
    {
      _id: string,
      name: string,
      name_en: string,
      name_zh: string,
      slug: string,
      description: string,
      description_en: string,
      description_zh: string,
      parentCategory: string | null,
      featuredImage: string,
      createdAt: string,
      updatedAt: string
    }
  ],
  count: number
}
```

**差异:**
1. 后端的分类有多语言支持 (`name_en`, `name_zh` 等)，前端缺少相应字段
2. 后端使用 `parentCategory` 字段，前端使用 `parentId`
3. 后端分类没有 `isActive` 和 `postCount` 字段
4. 前端没有处理 `featuredImage` 字段

### 3.2 创建/更新分类

**前端请求:**
```typescript
interface CategoryApiData {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}
```

**后端实现:**
```javascript
// POST /categories 或 PUT /categories/:id
{
  name, 
  name_en, 
  name_zh, 
  slug, 
  description, 
  description_en, 
  description_zh, 
  parent, // 注意这里是parent不是parentId或parentCategory
  featuredImage
}
```

**差异:**
1. 前端缺少多语言相关字段
2. 后端的父分类字段名不一致 (`parent` vs `parentId`/`parentCategory`)
3. 后端接收但前端未提供 `featuredImage` 字段

## 4. 标签相关 API

### 4.1 获取标签列表

**前端请求:**
```typescript
interface Tag {
  name: { zh: string; en: string };
  slug: string;
  postCount: number;
  _id: string;
}

interface TagApiData {
  name: string;
  name_zh: string;
  name_en: string;
  slug: string;
}
```

**后端实现:**
```javascript
// GET /tags
{
  success: true,
  tags: [
    {
      _id: string,
      name: string,
      name_en: string,
      name_zh: string,
      slug: string,
      description: string,
      description_en: string,
      description_zh: string,
      createdAt: string,
      updatedAt: string
    }
  ],
  count: number
}
```

**差异:**
1. 前端的 `Tag` 对象中 `name` 是一个包含 `zh` 和 `en` 属性的对象，而后端分别提供 `name`, `name_zh`, `name_en` 字段
2. 后端标签不包含 `postCount` 字段
3. 后端提供了 `description` 相关字段，但前端标签类型中没有

## 5. 媒体相关 API

### 5.1 获取媒体列表

**前端请求:**
```typescript
interface Media {
  url: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedBy: string;
  title?: string;
  description?: string;
  altText?: string;
}
```

**后端实现:**
```javascript
// GET /media
{
  success: true,
  data: {
    media: [
      {
        _id: string,
        filename: string,
        originalname: string,
        mimetype: string,
        size: number,
        path: string,
        url: string,
        alt: string,
        alt_en: string,
        alt_zh: string,
        caption: string,
        caption_en: string,
        caption_zh: string,
        uploadedBy: ObjectId,
        createdAt: string,
        updatedAt: string
      }
    ],
    total: number,
    currentPage: number,
    limit: number,
    totalPages: number
  }
}
```

**差异:**
1. 后端提供多语言支持 (`alt_zh`, `alt_en` 等)，前端只有 `altText`
2. 后端使用 `caption` 系列字段，而前端使用 `description`
3. 前端期望 `title` 字段，但后端未提供

## 6. 设置相关 API

### 6.1 获取设置

**前端请求:**
```typescript
interface SettingsResponse {
  success: boolean;
  message?: string;
  data: Record<string, unknown>;
}
```

**后端实现:**
```javascript
// GET /settings
{
  success: true,
  data: {
    "setting.key": value,
    // ...其他设置
  }
}
```

**差异:**
1. 设置API的数据格式基本一致

## 7. 主要问题和解决方案

### 7.1 主要类型不匹配问题

1. **多语言支持格式不一致**
   - 后端：分别提供 `name`, `name_zh`, `name_en` 等字段
   - 前端：使用 `name: { zh: string, en: string }` 格式

2. **字段命名不一致**
   - 后端分类使用 `parentCategory`，前端使用 `parentId`
   - 后端使用 `publishedAt`，前端使用 `publishDate`
   - 后端用 `categories`(数组)，前端用 `category`(字符串)

3. **缺少字段**
   - 后端没有实现 token 刷新机制
   - 部分统计类字段(如 `postCount`)在后端不存在

4. **响应结构差异**
   - 后端直接返回 `posts`, `post` 等数据，前端期望 `data.posts`, `data` 格式

### 7.2 建议解决方案

1. **创建统一的类型适配器**
   - 在前端创建数据适配器将后端数据转换为前端需要的格式
   - 在API调用层统一处理字段命名和结构转换

2. **更新前端类型定义**
   - 修改前端类型定义，使其与后端数据结构保持一致
   - 调整多语言支持的数据格式

3. **完善后端实现**
   - 添加缺失的API端点(如token刷新)
   - 在控制器层统一响应格式

4. **统一命名约定**
   - 协商统一的字段命名规范
   - 明确多语言字段的表示方式 