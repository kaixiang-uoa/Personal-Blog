// 封装API请求的服务模块

import axios from "axios"

// 创建axios实例
const apiClient = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器 - 添加认证信息
apiClient.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
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

// 响应拦截器 - 统一处理错误
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除本地认证信息
      localStorage.removeItem("authToken")
      // 重定向到登录页
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// API服务类
export const ApiService = {
  // 认证相关
  auth: {
    login: async (credentials: { username: string; password: string; rememberMe: boolean }) => {
      return apiClient.post("/auth/login", credentials)
    },
    logout: async () => {
      return apiClient.post("/auth/logout")
    },
    getCurrentUser: async () => {
      return apiClient.get("/auth/user")
    },
  },

  // 文章相关
  posts: {
    getAll: async (params?: any) => {
      return apiClient.get("/posts", { params })
    },
    getById: async (id: string) => {
      return apiClient.get(`/posts/${id}`)
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
      return apiClient.get("/posts/stats")
    },
  },

  // 分类相关
  categories: {
    getAll: async () => {
      return apiClient.get("/categories")
    },
    getById: async (id: string) => {
      return apiClient.get(`/categories/${id}`)
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

  // 标签相关
  tags: {
    getAll: async () => {
      return apiClient.get("/tags")
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

  // 媒体相关
  media: {
    getAll: async (params?: any) => {
      return apiClient.get("/media", { params })
    },
    getById: async (id: string) => {
      return apiClient.get(`/media/${id}`)
    },
    upload: async (formData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
      return apiClient.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      })
    },
    delete: async (id: string) => {
      return apiClient.delete(`/media/${id}`)
    },
  },

  // 设置相关
  settings: {
    getAll: async () => {
      return apiClient.get("/settings")
    },
    update: async (section: string, data: any) => {
      return apiClient.patch(`/settings/${section}`, data)
    },
  },
}

export default ApiService
