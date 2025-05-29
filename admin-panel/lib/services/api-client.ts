import axios from "axios";
import type { ApiConfig } from "@/types/api";

// 定义自定义错误类型
interface LoginError extends Error {
  loginError: boolean;
  originalMessage?: string;
  isLoginError: boolean;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  // baseURL: "https://personal-blog-w2y9.onrender.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add authentication information
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - unified error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname.includes('/login');
      
      if (!isLoginPage) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      } else {
        if (error.response.data) {
          const cleanError = new Error(error.response.data.message || "Invalid credentials") as LoginError;
          cleanError.loginError = true;
          cleanError.originalMessage = error.response.data.message;
          cleanError.isLoginError = true;
          return Promise.reject(cleanError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient; 