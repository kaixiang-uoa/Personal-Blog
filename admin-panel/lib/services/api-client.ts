import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import type { LoginError } from "@/types/api";

class ApiClient {
  private static instance: ApiClient;
  private axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3001/api/v1",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
    // Request interceptor
    this.axios.interceptors.request.use(
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

    // Response interceptor
    this.axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        // 处理 401 认证错误
        if (error.response?.status === 401) {
          const isLoginPage = window.location.pathname.includes('/login');
          
          if (!isLoginPage) {
            // 非登录页面收到 401 - 清除 token 并重定向
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          } else {
            // 登录页面收到 401 - 返回更友好的错误
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
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.get(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.post(url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.put(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.delete(url, config);
  }
}

export default ApiClient.getInstance(); 