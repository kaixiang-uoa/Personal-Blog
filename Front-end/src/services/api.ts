// import axios, { AxiosError } from 'axios'; // Import AxiosError for better typing in interceptor
// import type { Article } from "./article";
// import type { Tag } from "./tag";
// import type { Category } from "./category";


// interface ApiErrorResponse {
//   message: string;
//   // Add other potential error fields if your API returns them
// }

// // Create axios instance
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
//   timeout: 30000, // Increase timeout to 30 seconds (30000ms)
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json', // Often good to include Accept header
//   }
// });

// // Response interceptor -统一处理错误
// api.interceptors.response.use(
//   (response) => response.data, // Return data on success
//   (error: AxiosError<ApiErrorResponse>) => { // Type the error parameter
//     // Try to get a specific message from the API response, otherwise use a generic one
//     const message = error.response?.data?.message || error.message || '请求失败，请稍后再试';

//     // Log the error details for debugging
//     console.error('API Error:', {
//         message: message,
//         url: error.config?.url,
//         method: error.config?.method,
//         status: error.response?.status,
//         responseData: error.response?.data,
//     });

//     // Reject with the original error object so calling code can handle it further if needed
//     return Promise.reject(error);
//   }
// );

// // --- API Function Groups ---

// // Article related API
// export const postApi = {
//   /**
//    * Gets all posts with optional filtering and pagination.
//    * @param page - Page number (default: 1)
//    * @param limit - Items per page (default: 10)
//    * @param tag - Filter by tag slug/name (optional)
//    * @param category - Filter by category slug/name (optional)
//    * @param search - Search term (optional)
//    * @param startDate - Filter by start date (optional)
//    * @param endDate - Filter by end date (optional)
//    * @returns Promise resolving to the list of posts or API response structure
//    */
//   getAllPosts: (page = 1, limit = 10, tag = '', category = '', search = '', startDate = '', endDate = '') => {
//     // Use URLSearchParams for robust query parameter handling and encoding
//     const params = new URLSearchParams({
//       page: String(page),
//       limit: String(limit),
//     });
    
//     if (tag) params.append('tagSlug', tag);
//     if (category) params.append('categorySlug', category);
//     if (search) params.append('search', search);
//     if (startDate) params.append('startDate', startDate);
//     if (endDate) params.append('endDate', endDate);

//     // Construct URL with encoded parameters
//     const url = `/posts?${params.toString()}`;
//     return api.get(url);
//   },

//   /**
//    * Gets a single post by its slug.
//    * @param slug - The unique slug of the post
//    * @returns Promise resolving to the post data or API response structure
//    */
//   getPostBySlug: (slug: string) => // Keep ': string' for TypeScript
//     api.get(`/posts/slug/${encodeURIComponent(slug)}`), // Encode slug just in case it contains special chars
// };

// // Category related API
// export const categoryApi = {
//   /**
//    * Gets all categories.
//    * @returns Promise resolving to the list of categories or API response structure
//    */
//   getAllCategories: () =>
//     api.get('/categories'),
// };

// export interface TagsApiResponse {
//     success: boolean;
//     count: number;
//     tags: Tag[];
// }
// // Tag related API
// export const tagApi = {
//   /**
//    * Gets all tags.
//    * @returns Promise resolving to the list of tags or API response structure
//    */
//   getAllTags: (): Promise<TagsApiResponse> =>
//     api.get("/tags"),
// };

// // --- Named Exports ---
// // Export the function groups instead of the raw instance for better usability
// // export default api; // Remove this default export

// // If you still need to export the raw instance for some reason:
// // export { api };

// src/services/api.ts

import axios, { AxiosError } from "axios";
import type {
  Article,
  PostsApiResponse,
  CategoriesApiResponse,
  TagsApiResponse,
} from "./interface";

// --- 通用错误结构 ---
interface ApiErrorResponse {
  message: string;
}

// --- Axios 实例 ---
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// --- 响应拦截器 ---
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message || error.message || "请求失败，请稍后再试";
    console.error("API Error:", {
      message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

// ----------------------
// 📦 API 函数模块
// ----------------------

/**
 * 文章相关 API
 */
export const postApi = {
  getAllPosts: async (
    page = 1,
    limit = 10,
    tag = "",
    category = "",
    search = "",
    startDate = "",
    endDate = ""
  ): Promise<PostsApiResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (tag) params.append("tagSlug", tag);
    if (category) params.append("categorySlug", category);
    if (search) params.append("search", search);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return await api.get(`/posts?${params.toString()}`);
  },

  getPostBySlug: async (slug: string): Promise<Article> => {
    return await api.get(`/posts/slug/${encodeURIComponent(slug)}`);
  },
};

/**
 * 分类相关 API
 */
export const categoryApi = {
  getAllCategories: async (): Promise<CategoriesApiResponse> => {
    return await api.get("/categories");
  },
};

/**
 * 标签相关 API
 */
export const tagApi = {
  getAllTags: async (): Promise<TagsApiResponse> => {
    return await api.get("/tags");
  },
};
