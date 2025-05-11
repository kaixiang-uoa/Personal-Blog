// API service module encapsulation

import axios from "axios"
import type { LoginRequest, LoginResponse, UserInfo } from "@/types/auth"
import type { ApiResponse } from "@/types/api"
// 扩展Error类型以支持自定义属性
declare global {
  interface Error {
    loginError?: boolean;
    originalMessage?: string;
    isLoginError?: boolean;
  }
}

// Create axios instance
const apiClient = axios.create({
  // baseURL: "http://localhost:3001/api/v1",
  baseURL: "https://personal-blog-w2y9.onrender.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor - add authentication information
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - unified error handling
apiClient.interceptors.response.use(
  (response) => {
    // Directly return response.data, no need to parse another layer
    return response.data
  },
  (error) => {
    // Handle 401 unauthorized error
    if (error.response && error.response.status === 401) {
      // 检查当前路径是否为登录页面
      const isLoginPage = window.location.pathname.includes('/login')
      
      // 如果不是登录页面才进行重定向
      if (!isLoginPage) {
        // Clear local authentication information
      localStorage.removeItem("authToken")
        // Redirect to login page
      window.location.href = "/login"
      } else {
        // 在登录页面，保留错误信息和响应内容以便显示给用户
        if (error.response.data) {
          error.loginError = true
          // 添加原始错误信息以便前端显示，只保留必要信息
          error.originalMessage = error.response.data.message || "用户名或密码不正确"
          
          // 防止错误显示在控制台
          error.isLoginError = true
          
          // 清理不必要的错误信息，避免控制台信息过多
          const cleanError = new Error(error.originalMessage)
          cleanError.loginError = true
          cleanError.originalMessage = error.originalMessage
          cleanError.isLoginError = true
          return Promise.reject(cleanError)
        }
      }
    }
    return Promise.reject(error)
  },
)

// API service class
export const ApiService = {
  // Authentication related
  auth: {
    login: async (credentials: { email: string; password: string; rememberMe: boolean }): Promise<LoginResponse> => {
      // Convert to format expected by backend: map username to email
      const loginData: LoginRequest = {
        email: credentials.email, // Field mapping
        password: credentials.password
      };
      // Since the response interceptor already returns the data part, the return value is already of LoginResponse type
      return apiClient.post("/auth/login", loginData) as unknown as LoginResponse
    },
    logout: async (): Promise<ApiResponse> => {
      return apiClient.post("/auth/logout") as unknown as ApiResponse
    },
    getCurrentUser: async (): Promise<UserInfo> => {
      // Note: backend route is "/auth/me" not "/auth/user"
      const response = await apiClient.get("/auth/me") as ApiResponse<UserInfo>
      // According to backend API return structure, data field contains user information
      return response.data as UserInfo
    },
  },

  // Posts related
  posts: {
    getAll: async (params?: any) => {
      return apiClient.get("/posts", { params })
    },
    getById: async (id: string, lang: string = 'en') => {
      try {
        const response = await apiClient.get(`/posts/${id}`, { params: { lang } });
        return response;
      } catch (error: any) {
        console.error('Error fetching post:', {
          id,
          lang,
          error: error.response?.data || error.message,
          status: error.response?.status,
          url: error.config?.url
        });
        throw error;
      }
    },
    getBySlug: async (slug: string, lang: string = 'en') => {
      return apiClient.get(`/posts/slug/${slug}`, { params: { lang } })
    },
    create: async (data: any) => {
      return apiClient.post("/posts", data)
    },
    update: async (id: string, data: any) => {
      return apiClient.put(`/posts/${id}`, data)
    },
    delete: async (id: string) => {
      return apiClient.delete(`/posts/${id}`)
    },
    getDashboardStats: async () => {
      try {
        const response = await Promise.all([
          apiClient.get("/posts?limit=1&count=true"),
          apiClient.get("/categories?limit=1&count=true"),
          // apiClient.get("/comments?limit=1&count=true")
        ]);
        
        return {
          success: true,
          data: {
            postCount: response[0].data?.total || 0,
            categoryCount: response[1].data?.total || 0,
            // commentCount: response[2].data?.total || 0,
            viewCount: 0
          }
        };
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
          success: false,
          data: {
            postCount: 0,
            viewCount: 0,
            commentCount: 0,
            categoryCount: 0
          }
        };
      }
    },
  },

  // Categories related
  categories: {
    getAll: async (lang: string = 'en') => {
      return apiClient.get("/categories", { params: { lang } })
    },
    getById: async (id: string, lang: string = 'en') => {
      return apiClient.get(`/categories/${id}`, { params: { lang } })
    },
    create: async (data: any) => {
      return apiClient.post("/categories", data)
    },
    update: async (id: string, data: any) => {
      return apiClient.put(`/categories/${id}`, data)
    },
    delete: async (id: string) => {
      return apiClient.delete(`/categories/${id}`)
    },
  },

  // Tags related
  tags: {
    getAll: async (lang: string = 'en') => {
      return apiClient.get("/tags", { params: { lang } })
    },
    create: async (data: any) => {
      return apiClient.post("/tags", data)
    },
    update: async (id: string, data: any) => {
      return apiClient.put(`/tags/${id}`, data)
    },
    delete: async (id: string) => {
      return apiClient.delete(`/tags/${id}`)
    },
  },

  // Users related
  users: {
    getAll: async (params?: any) => {
      return apiClient.get("/users", { params })
    },
    getById: async (id: string) => {
      return apiClient.get(`/users/${id}`)
    },
    create: async (data: any) => {
      return apiClient.post("/users", data)
    },
    update: async (id: string, data: any) => {
      return apiClient.put(`/users/${id}`, data)
    },
    updateProfile: async (data: any) => {
      return apiClient.put("/users/profile", data)
    },
    delete: async (id: string) => {
      return apiClient.delete(`/users/${id}`)
    },
  },

  // Comments related
  comments: {
    getByPost: async (postId: string) => {
      return apiClient.get(`/comments/post/${postId}`)
    },
    create: async (postId: string, data: any) => {
      return apiClient.post(`/comments/post/${postId}`, data)
    },
    update: async (commentId: string, data: any) => {
      return apiClient.put(`/comments/${commentId}`, data)
    },
    delete: async (commentId: string) => {
      return apiClient.delete(`/comments/${commentId}`)
    },
  },

  // Media related
  media: {
    getAll: async (params?: any) => {
      return apiClient.get("/media", { params })
    },
    getById: async (id: string) => {
      return apiClient.get(`/media/${id}`)
    },
    upload: async (formData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
      return apiClient.post("/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      })
    },
    update: async (id: string, data: any) => {
      return apiClient.put(`/media/${id}`, data)
    },
    delete: async (id: string) => {
      return apiClient.delete(`/media/${id}`)
    },
  },

  // Settings related
  settings: {
    getAll: async () => {
      return apiClient.get("/settings")
    },
    getByKey: async (key: string) => {
      return apiClient.get(`/settings/${key}`)
    },
    create: async (data: any) => {
      return apiClient.post("/settings", data)
    },
    batchUpdate: async (data: any) => {
      return apiClient.post("/settings/batch", data)
    },
    update: async (key: string, data: any) => {
      return apiClient.put(`/settings/${key}`, data)
    },
    delete: async (key: string) => {
      return apiClient.delete(`/settings/${key}`)
    },
  },

  // Internationalization related
  i18n: {
    getLanguages: async () => {
      return apiClient.get("/i18n/languages")
    },
    getTranslations: async (lang: string) => {
      return apiClient.get(`/i18n/translations/${lang}`)
    },
  },

  // Contact related
  contact: {
    sendMessage: async (data: any) => {
      return apiClient.post("/contact", data)
    },
  },
}

export default ApiService
