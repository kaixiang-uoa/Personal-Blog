import axios from "axios";

import type { ApiResponse } from "@/types/api";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Enable sending cookies
});

// Flag to prevent infinite refresh token loops
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

/**
 * Utility function to check if current path is auth-related
 * Used to prevent redirects when already on auth pages
 */
const isAuthRelatedPath = (): boolean => {
  if (typeof window === "undefined") return false;

  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  return authPaths.some(path => window.location.pathname.includes(path));
};

// Process queued requests
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token as string);
    }
  });
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  config => {
    // Only access localStorage in browser environment
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Get CSRF token from cookie
    if (typeof window !== "undefined") {
      const csrfToken = document.cookie
        .split("; ")
        .find(row => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  async error => {
    const originalRequest = error.config;

    // Check if error is due to an expired token (401 status)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      // Mark as retrying to prevent infinite loops
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get refresh token
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // No refresh token, clear auth but don't force redirect on login page
          localStorage.removeItem("token");

          // Only redirect if not already on auth-related pages
          if (typeof window !== "undefined" && !isAuthRelatedPath()) {
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        if (response.data?.success && response.data?.token) {
          // Store new tokens
          const { token, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem("token", token);

          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          // Update Authorization header on original request
          originalRequest.headers.Authorization = `Bearer ${token}`;

          // Process queued requests
          processQueue(null, token);

          // Retry original request
          return api(originalRequest);
        } else {
          // Invalid refresh response
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");

          // Only redirect if not already on auth-related pages
          if (typeof window !== "undefined" && !isAuthRelatedPath()) {
            window.location.href = "/login";
          }

          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Handle refresh failure - clear tokens and redirect if appropriate
        processQueue(
          refreshError instanceof Error
            ? refreshError
            : new Error(String(refreshError))
        );
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Only redirect if not already on auth-related pages
        if (typeof window !== "undefined" && !isAuthRelatedPath()) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Log API errors but don't log 401s which are handled above
    if (error.response?.status !== 401) {
      console.error("API Error:", error);
    }

    return Promise.reject(error);
  }
);

// Export CRUD functions
export const apiService = {
  // General CRUD operations
  get: <T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<ApiResponse<T>> => api.get(url, { params }),

  post: <T>(
    url: string,
    data?: Record<string, unknown> | FormData
  ): Promise<ApiResponse<T>> => {
    if (!(data instanceof FormData)) {
      return api.post(url, data);
    }
    // Handle FormData specially for file uploads
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const csrfToken =
      typeof window !== "undefined"
        ? document.cookie
            .split("; ")
            .find(row => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1]
        : null;

    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
          "X-CSRF-Token": csrfToken || "",
        },
        withCredentials: true,
      })
      .then(response => response.data);
  },

  put: <T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<ApiResponse<T>> => api.put(url, data),

  delete: <T>(url: string): Promise<ApiResponse<T>> => api.delete(url),

  // Authentication related
  login: (credentials: Record<string, unknown>) =>
    api.post("/auth/login", credentials),

  logout: () => api.post("/auth/logout"),

  register: (userData: Record<string, unknown>) =>
    api.post("/auth/register", userData),

  // Posts related
  getPosts: (params?: Record<string, unknown>) => api.get("/posts", { params }),

  getPostById: (id: string) => api.get(`/posts/${id}`),

  createPost: (data: Record<string, unknown>) => api.post("/posts", data),

  updatePost: (id: string, data: Record<string, unknown>) =>
    api.put(`/posts/${id}`, data),

  deletePost: (id: string) => api.delete(`/posts/${id}`),

  // Categories related
  getCategories: () => api.get("/categories", { params: { fullLang: true } }),

  getCategoryById: (id: string) =>
    api.get(`/categories/${id}`, { params: { fullLang: true } }),

  createCategory: (data: Record<string, unknown>) =>
    api.post("/categories", data),

  updateCategory: (id: string, data: Record<string, unknown>) =>
    api.put(`/categories/${id}`, data),

  deleteCategory: (id: string) => api.delete(`/categories/${id}`),

  // Tags related
  getTags: () => api.get("/tags", { params: { fullLang: true } }),

  getTagById: (id: string) =>
    api.get(`/tags/${id}`, { params: { fullLang: true } }),

  createTag: (data: Record<string, unknown>) => api.post("/tags", data),

  updateTag: (id: string, data: Record<string, unknown>) =>
    api.put(`/tags/${id}`, data),

  deleteTag: (id: string) => api.delete(`/tags/${id}`),

  // Media related
  getMedia: <T = unknown>(
    params?: Record<string, unknown>
  ): Promise<ApiResponse<T>> => api.get("/media", { params }),

  uploadMedia: <T = unknown>(formData: FormData): Promise<ApiResponse<T>> => {
    return api.post("/media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteMedia: <T = unknown>(id: string): Promise<ApiResponse<T>> =>
    api.delete(`/media/${id}`),

  updateMedia: <T = unknown>(
    id: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T>> => api.put(`/media/${id}`, data),

  getMediaByUrl: <T = unknown>(url: string): Promise<ApiResponse<T>> =>
    api.get("/media/url", { params: { url } }),
};

export default api;
