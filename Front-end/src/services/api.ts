import axios, { AxiosInstance } from 'axios';
import type { ApiResponse } from '@/types/dto/commonDto';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
export const INTERNAL_API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API错误处理拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 记录错误
    console.error('API Error:', error.response || error);
    
    // 让错误继续传播
    return Promise.reject(error);
  }
);

// 创建内部API服务 (通过Next.js API路由)
const internalAxios = axios.create({
  baseURL: INTERNAL_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 内部API错误处理
internalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Internal API Error:', error.response || error);
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
export const externalApi = createApiRequest(api);
export const internalApi = createApiRequest(internalAxios);

// 为了向后兼容，保留原来的函数名
export const getApiData = externalApi.get;
export const postApiData = externalApi.post;
export const getInternalApiData = internalApi.get;
export const postInternalApiData = internalApi.post;

export default api;


