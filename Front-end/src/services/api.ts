import axios, { AxiosInstance} from 'axios';
import type { ApiResponse } from '@/types/dto/commonDto';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
export const INTERNAL_API_BASE_URL = '/api';

// Create axios instance for external API
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Handle global errors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Only log server errors and network errors, avoid logging client expected errors (like 401/404)
    if (!error.response || error.response.status >= 500) {
      console.error('API Error:', error.response || error);
    }
    return Promise.reject(error);
  }
);

// Create axios instance for internal API
const internalAxiosInstance = axios.create({
  baseURL: INTERNAL_API_BASE_URL,
  timeout: 10000,
});

// Handle global errors
internalAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Only log server errors and network errors, avoid logging client expected errors
    if (!error.response || error.response.status >= 500) {
      console.error('Internal API Error:', error.response || error);
    }
    return Promise.reject(error);
  }
);

// Create generic request functions
function createApiRequest(axiosInstance: AxiosInstance) {
  return {
    get: async <T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> => {
      const res = await axiosInstance.get<ApiResponse<T>>(url, { params });
      return res.data.data;
    },
    post: async <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
      const res = await axiosInstance.post<ApiResponse<T>>(url, data);
      return res.data.data;
    },
    put: async <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
      const res = await axiosInstance.put<ApiResponse<T>>(url, data);
      return res.data.data;
    },
    delete: async <T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> => {
      const res = await axiosInstance.delete<ApiResponse<T>>(url, { params });
      return res.data.data;
    }
  };
}

// Create API clients
export const externalApi = createApiRequest(axiosInstance);
export const internalApi = createApiRequest(internalAxiosInstance);

/**
 * Legacy API Functions Migration Guide
 * ===================================
 * 
 * The following functions will be marked as deprecated in v1.0.0 and planned for removal in v2.0.0.
 * Please use the new API client objects instead of these individual functions:
 * 
 * Old method -> New method mapping:
 * - getApiData -> externalApi.get
 * - postApiData -> externalApi.post
 * - getInternalApiData -> internalApi.get
 * - postInternalApiData -> internalApi.post
 * 
 * Migration example:
 * Old: const data = await getApiData<UserData>('/users');
 * New: const data = await externalApi.get<UserData>('/users');
 */

/**
 * @deprecated Please use externalApi.get instead. Will be removed in v2.0.0.
 */
export const getApiData = <T>(url: string, params?: Record<string, string | number | boolean>) => {
  // Show warning in development environment
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Deprecation Warning] getApiData is deprecated, please use externalApi.get instead.');
  }
  return externalApi.get<T>(url, params);
};

/**
 * @deprecated Please use externalApi.post instead. Will be removed in v2.0.0.
 */
export const postApiData = <T>(url: string, data?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Deprecation Warning] postApiData is deprecated, please use externalApi.post instead.');
  }
  return externalApi.post<T>(url, data);
};

/**
 * @deprecated Please use internalApi.get instead. Will be removed in v2.0.0.
 */
export const getInternalApiData = <T>(url: string, params?: Record<string, string | number | boolean>) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Deprecation Warning] getInternalApiData is deprecated, please use internalApi.get instead.');
  }
  return internalApi.get<T>(url, params);
};

/**
 * @deprecated Please use internalApi.post instead. Will be removed in v2.0.0.
 */
export const postInternalApiData = <T>(url: string, data?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Deprecation Warning] postInternalApiData is deprecated, please use internalApi.post instead.');
  }
  return internalApi.post<T>(url, data);
};

export default axiosInstance;


