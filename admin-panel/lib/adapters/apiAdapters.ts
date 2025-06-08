/**
 * API适配器
 * 
 * 用于将后端API的响应数据转换为前端组件期望的格式
 */

import { ApiPost, Post } from '@/types/post.types';
import { PostStatus } from '@/types/post.types';
import { Category } from '@/types/category.types';
import { Tag } from '@/types/tags.types';
import { Media } from '@/types/media.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

/**
 * 将后端API返回的文章数据转换为前端需要的格式
 */
export const adaptPost = (apiPost: ApiPost): Post => {
  return {
    _id: apiPost._id,
    title: apiPost.title,
    slug: apiPost.slug,
    excerpt: apiPost.excerpt || '',
    content: apiPost.content || '',
    // 转换分类数组为单个分类ID
    category: apiPost.categories && apiPost.categories.length > 0 
      ? apiPost.categories[0]._id 
      : '',
    // 转换标签
    tags: apiPost.tags || [],
    status: apiPost.status === 'published' ? PostStatus.PUBLISHED : PostStatus.DRAFT,
    featured: Boolean(apiPost.featured), // 可能后端没有此字段，默认false
    featuredImage: apiPost.featuredImage || '',
    author: apiPost.author ? {
      username: apiPost.author.username,
      avatar: apiPost.author.avatar,
      // 后端可能没有email字段
    } : undefined,
    // 字段名转换
    publishDate: apiPost.publishedAt,
    viewCount: apiPost.viewCount || 0,
    createdAt: apiPost.createdAt,
    updatedAt: apiPost.updatedAt
  };
};

/**
 * 将后端API返回的分类数据转换为前端需要的格式
 */
export const adaptCategory = (apiCategory: any): Category => {
  return {
    _id: apiCategory._id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description || '',
    // 字段名转换
    parentId: apiCategory.parentCategory || '',
    isActive: true, // 后端无此字段，默认为true
    postCount: 0, // 后端无此字段，可在UI层计算
    createdAt: apiCategory.createdAt,
    updatedAt: apiCategory.updatedAt
  };
};

/**
 * 将后端API返回的标签数据转换为前端需要的格式
 */
export const adaptTag = (apiTag: any): Tag => {
  return {
    _id: apiTag._id,
    // 将单独的多语言字段合并为对象
    name: {
      zh: apiTag.name_zh || apiTag.name,
      en: apiTag.name_en || apiTag.name
    },
    slug: apiTag.slug,
    postCount: 0, // 后端无此字段，可在UI层计算
    createdAt: apiTag.createdAt,
    updatedAt: apiTag.updatedAt
  };
};

/**
 * 将前端标签数据转换为API请求格式
 */
export const adaptTagForApiRequest = (tag: Tag): any => {
  return {
    name: tag.name.en || tag.name.zh, // 使用英文名或中文名作为主名称
    name_zh: tag.name.zh,
    name_en: tag.name.en,
    slug: tag.slug
  };
};

/**
 * 将后端API返回的媒体数据转换为前端需要的格式
 */
export const adaptMedia = (apiMedia: any): Media => {
  // 创建Media类型对象，添加_id属性
  return {
    _id: apiMedia._id,
    url: apiMedia.url || '',
    filename: apiMedia.filename || '',
    originalname: apiMedia.originalname || '',
    mimetype: apiMedia.mimetype || '',
    size: apiMedia.size || 0,
    path: apiMedia.path || '',
    uploadedBy: typeof apiMedia.uploadedBy === 'object' 
      ? apiMedia.uploadedBy._id 
      : (apiMedia.uploadedBy || ''),
    // 多语言字段映射
    title: apiMedia.caption || '',
    description: apiMedia.caption || '',
    altText: apiMedia.alt || '',
    createdAt: apiMedia.createdAt || '',
    updatedAt: apiMedia.updatedAt || ''
  };
};

/**
 * 转换文章列表响应
 */
export const adaptPostListResponse = (apiResponse: any): PaginatedResponse<Post[]> => {
  // 检查是否有正确的结构
  if (!apiResponse || !Array.isArray(apiResponse.posts)) {
    return {
      success: false,
      message: 'Invalid response structure',
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
      }
    };
  }

  const adaptedPosts = Array.isArray(apiResponse.posts) 
    ? apiResponse.posts.map(adaptPost) 
    : [];

  return {
    success: apiResponse.success,
    message: apiResponse.message || '',
    data: adaptedPosts,
    pagination: {
      total: apiResponse.total || 0,
      page: apiResponse.currentPage || 1,
      limit: 10, // 默认值
      pages: apiResponse.totalPages || 0
    }
  };
};

/**
 * 转换单个文章响应
 */
export const adaptPostDetailResponse = (apiResponse: any): ApiResponse<Post> => {
  // 检查是否有正确的结构
  if (!apiResponse || !apiResponse.post) {
    return {
      success: false,
      message: 'Invalid response structure',
      data: undefined
    };
  }

  return {
    success: apiResponse.success,
    message: apiResponse.message || '',
    data: adaptPost(apiResponse.post)
  };
};

/**
 * 转换分类列表响应
 */
export const adaptCategoryListResponse = (apiResponse: any): PaginatedResponse<Category[]> => {
  // 检查是否有正确的结构
  if (!apiResponse || !Array.isArray(apiResponse.categories)) {
    return {
      success: false,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
      }
    };
  }

  const adaptedCategories = apiResponse.categories.map(adaptCategory);

  return {
    success: apiResponse.success,
    data: adaptedCategories,
    pagination: {
      total: apiResponse.count || 0,
      page: 1,
      limit: adaptedCategories.length || 10,
      pages: Math.ceil((apiResponse.count || 0) / (adaptedCategories.length || 10))
    }
  };
};

/**
 * 转换标签列表响应
 */
export const adaptTagListResponse = (apiResponse: any): PaginatedResponse<Tag[]> => {
  // 检查是否有正确的结构
  if (!apiResponse || !Array.isArray(apiResponse.tags)) {
    return {
      success: false,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
      }
    };
  }

  const adaptedTags = apiResponse.tags.map(adaptTag);

  return {
    success: apiResponse.success,
    data: adaptedTags,
    pagination: {
      total: apiResponse.count || 0,
      page: 1,
      limit: adaptedTags.length || 10,
      pages: Math.ceil((apiResponse.count || 0) / (adaptedTags.length || 10))
    }
  };
};

/**
 * 转换媒体列表响应
 */
export const adaptMediaListResponse = (apiResponse: any): PaginatedResponse<Media[]> => {
  // API 响应可能是 data.media 或直接是 media
  const mediaItems = apiResponse.data?.media || apiResponse.media || [];
  const total = apiResponse.data?.total || apiResponse.total || 0;
  const currentPage = apiResponse.data?.currentPage || apiResponse.currentPage || 1;
  const limit = apiResponse.data?.limit || apiResponse.limit || 10;
  const totalPages = apiResponse.data?.totalPages || apiResponse.totalPages || 1;

  const adaptedMedia = Array.isArray(mediaItems) 
    ? mediaItems.map(adaptMedia) 
    : [];

  return {
    success: apiResponse.success,
    message: apiResponse.message || '',
    data: adaptedMedia,
    pagination: {
      total,
      page: currentPage,
      limit,
      pages: totalPages
    }
  };
}; 