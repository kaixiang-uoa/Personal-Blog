import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import type { LoginError } from "@/types/api";

class ApiClient {
  private static instance: ApiClient;
  private axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3001/api/v1",
      timeout: 30000,
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
        
        // 处理 500 错误
        if (error.response?.status === 500) {
          console.error("Server error:", error.response.data);
          return Promise.reject(new Error(error.response.data?.message || "Internal server error"));
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.get(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (!(data instanceof FormData)) {
      if (!config) config = {};
      if (!config.headers) config.headers = {};
      config.headers["Content-Type"] = "application/json";
    }
    return this.axios.post(url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.put(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.delete(url, config);
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.patch(url, data, config);
  }
}

export default ApiClient.getInstance(); 