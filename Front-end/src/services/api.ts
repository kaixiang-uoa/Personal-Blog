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

// 为了向后兼容，保留原来的函数名
export const getApiData = externalApi.get;
export const postApiData = externalApi.post;
export const getInternalApiData = internalApi.get;
export const postInternalApiData = internalApi.post;

export default axiosInstance;


