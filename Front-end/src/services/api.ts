import axios, { AxiosError, AxiosResponse } from "axios";
import type {
  ApiResponse,
  PostApiResponse,
  PostsApiResponse,
  CategoriesApiResponse,
  TagsApiResponse,
  ApiErrorResponse
} from "./interface";

// --- API Base URL ---
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- Axios Instance ---
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取当前语言
const getCurrentLanguage = (): string => {
  // 如果在浏览器环境中
  if (typeof window !== 'undefined') {
    // 从 URL 路径中提取语言
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 1 && (pathSegments[1] === 'en' || pathSegments[1] === 'zh')) {
      return pathSegments[1];
    }
  }
  // 默认返回中文
  return 'zh';
};

// --- 请求拦截器：添加语言参数 ---
api.interceptors.request.use(
  (config) => {
    // 获取当前语言
    const lang = getCurrentLanguage();
    
    // 确保 params 对象存在
    config.params = config.params || {};
    
    // 添加语言参数
    config.params.lang = lang;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- 统一的响应拦截器 ---
api.interceptors.response.use(
  (response: AxiosResponse): any => {
    // 检查响应是否符合标准格式
    const data = response.data;
    
    // 如果已经是标准格式，直接返回
    if (data && typeof data === 'object' && 'success' in data) {
      return data;
    }
    
    // 如果是旧格式，转换为标准格式
    // 处理分页数据
    if (data && data.posts) {
      return {
        success: true,
        data: {
          posts: data.posts,
          total: data.total || 0,
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || 1
        },
        message: '获取数据成功'
      };
    }
    
    // 处理单个实体数据
    if (data && (data.post || data.tag || data.category)) {
      return {
        success: true,
        data: data,
        message: '获取数据成功'
      };
    }
    
    // 处理数组数据
    if (Array.isArray(data)) {
      return {
        success: true,
        data: { items: data },
        message: '获取数据成功'
      };
    }
    
    // 其他情况，包装为标准格式
    return {
      success: true,
      data: data,
      message: '操作成功'
    };
  },
  (error: AxiosError): Promise<ApiErrorResponse> => {
    console.error('API 请求错误:', error);
    
    // 构建标准错误响应
    const errorResponse: ApiErrorResponse = {
      success: false,
      data: null,
      message: '服务暂时不可用'
    };
    
    // 尝试从错误响应中提取更详细的信息
    if (error.response?.data) {
      const responseData = error.response.data as any;
      if (responseData.message) {
        errorResponse.message = responseData.message;
      }
    }
    
    // 添加HTTP状态码信息
    if (error.response?.status) {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        errorResponse.message = '请求的资源不存在';
      } else if (statusCode === 401) {
        errorResponse.message = '未授权，请先登录';
      } else if (statusCode === 403) {
        errorResponse.message = '没有权限执行此操作';
      } else if (statusCode >= 500) {
        errorResponse.message = '服务器错误，请稍后再试';
      }
    }
    
    // 保存原始错误以便调试
    errorResponse.originalError = error;
    
    return Promise.reject(errorResponse);
  }
);

// ----------------------
// 📦 API Function Modules
// ----------------------

/**
 * 文章相关API
 */
export const postApi = {
  /**
   * 获取所有文章，支持过滤和分页
   * @param page 页码
   * @param limit 每页数量
   * @param tag 标签slug（多个用逗号分隔）
   * @param category 分类slug
   * @param search 搜索关键词
   * @param startDate 开始日期（ISO字符串或YYYY-MM-DD）
   * @param endDate 结束日期（ISO字符串或YYYY-MM-DD）
   * @param lang 语言（可选，默认从 URL 获取）
   * @returns Promise<PostsApiResponse>
   */
  getAllPosts: async (
    page = 1,
    limit = 10,
    tag = "",
    category = "",
    search = "",
    sort = "",
    // startDate = "",
    // endDate = "",
    lang = ""
  ): Promise<PostsApiResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (tag) params.append("tagSlug", tag);
    if (category) params.append("categorySlug", category);
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    // if (startDate) params.append("startDate", startDate);
    // if (endDate) params.append("endDate", endDate);
    if (lang) params.append("lang", lang);
    return await api.get(`/posts?${params.toString()}`);
  },

  /**
   * 通过slug获取单篇文章
   * @param slug 文章的唯一slug
   * @param lang 语言（可选，默认从 URL 获取）
   * @returns Promise<PostApiResponse>
   */
  getPostBySlug: async (slug: string, lang = ""): Promise<PostApiResponse> => {
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return await api.get(`/posts/slug/${encodeURIComponent(slug)}${queryString}`);
  },
};

/**
 * 分类相关API
 */
export const categoryApi = {
  /**
   * 获取所有分类
   * @param lang 语言（可选，默认从 URL 获取）
   * @returns Promise<CategoriesApiResponse>
   */
  getAllCategories: async (lang = ""): Promise<CategoriesApiResponse> => {
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';

    return await api.get(`/categories${queryString}`);
  },
};

/**
 * 标签相关API
 */
export const tagApi = {
  /**
   * 获取所有标签
   * @param lang 语言（可选，默认从 URL 获取）
   * @returns Promise<TagsApiResponse>
   */
  getAllTags: async (lang = ""): Promise<TagsApiResponse> => {
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return await api.get(`/tags${queryString}`);
  },
};
