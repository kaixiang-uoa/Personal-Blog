import axios, { AxiosInstance } from 'axios';
import type { ApiResponse } from '@/types/dto/commonDto';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
export const INTERNAL_API_BASE_URL = '/api';

// 为外部API创建axios实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// 处理全局错误
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // 只记录服务器错误和网络错误，避免记录客户端预期错误（如401/404）
    if (!error.response || error.response.status >= 500) {
      console.error('API Error:', error.response || error);
    }
    return Promise.reject(error);
  }
);

// 为内部API创建axios实例
const internalAxiosInstance = axios.create({
  baseURL: INTERNAL_API_BASE_URL,
  timeout: 10000,
});

// 处理全局错误
internalAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    // 只记录服务器错误和网络错误，避免记录客户端预期错误
    if (!error.response || error.response.status >= 500) {
      console.error('Internal API Error:', error.response || error);
    }
    return Promise.reject(error);
  }
);

// 创建通用的请求函数
function createApiRequest(axiosInstance: AxiosInstance) {
  return {
    get: async <T>(url: string, params?: any): Promise<T> => {
      const res = await axiosInstance.get<ApiResponse<T>>(url, { params });
      return res.data.data;
    },
    post: async <T>(url: string, data?: any): Promise<T> => {
      const res = await axiosInstance.post<ApiResponse<T>>(url, data);
      return res.data.data;
    },
    put: async <T>(url: string, data?: any): Promise<T> => {
      const res = await axiosInstance.put<ApiResponse<T>>(url, data);
      return res.data.data;
    },
    delete: async <T>(url: string, params?: any): Promise<T> => {
      const res = await axiosInstance.delete<ApiResponse<T>>(url, { params });
      return res.data.data;
    }
  };
}

// 创建API客户端
export const externalApi = createApiRequest(axiosInstance);
export const internalApi = createApiRequest(internalAxiosInstance);

/**
 * 旧API函数的迁移指南
 * =====================
 * 
 * 以下函数将在版本v1.0.0中被标记为废弃，并计划在v2.0.0中移除。
 * 请使用新的API客户端对象来替代这些单独的函数：
 * 
 * 旧方法 -> 新方法映射：
 * - getApiData -> externalApi.get
 * - postApiData -> externalApi.post
 * - getInternalApiData -> internalApi.get
 * - postInternalApiData -> internalApi.post
 * 
 * 迁移示例:
 * 旧: const data = await getApiData<UserData>('/users');
 * 新: const data = await externalApi.get<UserData>('/users');
 */

/**
 * @deprecated 请使用 externalApi.get 代替。将在v2.0.0版本中移除。
 */
export const getApiData = (url: string, params?: any) => {
  // 在开发环境显示警告
  if (process.env.NODE_ENV === 'development') {
    console.warn('[废弃警告] getApiData 已废弃，请使用 externalApi.get 替代。');
  }
  return externalApi.get(url, params);
};

/**
 * @deprecated 请使用 externalApi.post 代替。将在v2.0.0版本中移除。
 */
export const postApiData = (url: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[废弃警告] postApiData 已废弃，请使用 externalApi.post 替代。');
  }
  return externalApi.post(url, data);
};

/**
 * @deprecated 请使用 internalApi.get 代替。将在v2.0.0版本中移除。
 */
export const getInternalApiData = (url: string, params?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[废弃警告] getInternalApiData 已废弃，请使用 internalApi.get 替代。');
  }
  return internalApi.get(url, params);
};

/**
 * @deprecated 请使用 internalApi.post 代替。将在v2.0.0版本中移除。
 */
export const postInternalApiData = (url: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[废弃警告] postInternalApiData 已废弃，请使用 internalApi.post 替代。');
  }
  return internalApi.post(url, data);
};

export default axiosInstance;


