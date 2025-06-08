/**
 * API Client Module
 * 
 * A singleton class that provides methods for making HTTP requests to the API.
 * Handles authentication, request/response interceptors, and error handling.
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import type { LoginError, ApiErrorResponse } from "@/types/api.types";
import { TokenManager } from "./token-manager";
import { csrfService } from "./csrf-service";
import { errorService, ErrorCategory, ErrorSeverity } from "./error-service";

// CSRF Token header name
const CSRF_HEADER = 'X-CSRF-Token';

/**
 * ApiClient class using Singleton pattern
 */
class ApiClient {
  private static instance: ApiClient;
  private axios: AxiosInstance;
  private baseUrl: string;
  private csrfToken: string | null = null;

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {
    // Use API proxy in development to avoid CORS issues
    this.baseUrl = typeof window !== 'undefined' 
      ? '/api' // Use Next.js proxy in browser
      : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1"); // Direct API URL in SSR
    
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Initialize CSRF token
    this.initCsrfToken();
    
    this.setupInterceptors();
  }

  /**
   * Get the singleton instance of ApiClient
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
  
  /**
   * Initialize CSRF token from service
   */
  private initCsrfToken(): void {
    if (typeof window !== 'undefined') {
      this.csrfToken = csrfService.getToken();
    }
  }
  
  /**
   * Set CSRF token
   */
  public setCsrfToken(token: string): void {
    this.csrfToken = token;
    csrfService.updateToken(token);
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axios.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = TokenManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add CSRF token if available for mutation operations
        if (this.csrfToken && (config.method === 'post' || config.method === 'put' || config.method === 'delete' || config.method === 'patch')) {
          config.headers[CSRF_HEADER] = this.csrfToken;
          
          // For JSON requests, also add CSRF token to request body
          if (config.headers['Content-Type'] === 'application/json' && config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
            config.data = {
              ...config.data,
              _csrf: this.csrfToken
            };
          }
        }
        
        return config;
      },
      (error) => {
        const appError = errorService.handleApiError(error);
        return Promise.reject(appError);
      }
    );

    // Response interceptor
    this.axios.interceptors.response.use(
      (response) => {
        // Check for CSRF token in response headers
        const csrfToken = response.headers[CSRF_HEADER.toLowerCase()];
        if (csrfToken) {
          this.setCsrfToken(csrfToken);
        }
        
        return response.data;
      },
      async (error: AxiosError<ApiErrorResponse>) => {
        // Use error service to log request errors
        const appError = errorService.handleApiError(error);
        errorService.logError(appError);
        
        // Handle 401 authentication errors
        if (error.response?.status === 401) {
          const isAuthRelatedUrl = this.isAuthRelatedUrl(error.config?.url || '');
          
          // Don't handle 401 errors for auth-related APIs like login or token refresh
          if (!isAuthRelatedUrl) {
            if (TokenManager.hasRefreshToken() && !this.isRefreshTokenRequest(error.config?.url || '')) {
              try {
                // Original request configuration for retry after token refresh
                const originalRequest = error.config;
                
                // Use error handling import mechanism to avoid circular dependencies
                const { authService } = await import('./auth-service');
                const refreshed = await authService.refreshToken();
                
                if (refreshed && originalRequest) {
                  // Token refresh successful, retry request
                  const token = TokenManager.getToken();
                  if (token && originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return this.axios(originalRequest);
                  }
                } else {
                  // Refresh failed, clear auth data
                  TokenManager.clearAllAuthData();
                  this.redirectToLogin();
                }
              } catch (refreshError) {
                const refreshAppError = errorService.handleApiError(refreshError);
                errorService.logError({
                  ...refreshAppError,
                  message: 'Token refresh failed',
                  category: ErrorCategory.AUTHENTICATION
                });
                
                TokenManager.clearAllAuthData();
                this.redirectToLogin();
              }
            } else {
              // No refresh token or is a refresh token request, logout directly
              TokenManager.clearAllAuthData();
              this.redirectToLogin();
            }
          } else {
            // Login related error, use unified error format
            if (error.response?.data) {
              return Promise.reject(
                errorService.createError(
                  error.response.data.message || "Authentication failed",
                  ErrorCategory.AUTHENTICATION,
                  ErrorSeverity.ERROR,
                  { originalResponse: error.response.data },
                  error,
                  'LOGIN_FAILED'
                )
              );
            }
          }
        }
        
        // Handle 403 CSRF validation errors
        if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
          // Refresh CSRF token
          const newToken = csrfService.generateToken();
          this.setCsrfToken(newToken);
          
          return Promise.reject(
            errorService.createError(
              "Security validation failed, please try again",
              ErrorCategory.PERMISSION,
              ErrorSeverity.WARNING,
              { csrfError: true },
              error,
              'CSRF_VALIDATION_FAILED'
            )
          );
        }
        
        // Return uniformly processed error
        return Promise.reject(appError);
      }
    );
  }
  
  /**
   * Check if URL is related to authentication
   */
  private isAuthRelatedUrl(url: string): boolean {
    return url.includes('/auth/login') || 
           url.includes('/auth/refresh') || 
           url.includes('/auth/logout');
  }
  
  /**
   * Check if this is a refresh token request
   */
  private isRefreshTokenRequest(url: string): boolean {
    return url.includes('/auth/refresh');
  }
  
  /**
   * Redirect to login page
   */
  private redirectToLogin(): void {
    if (typeof window !== 'undefined' && 
        !window.location.pathname.includes('/login') && 
        !window.location.pathname.includes('/register') && 
        !window.location.pathname.includes('/forgot-password')) {
      window.location.href = '/login';
    }
  }

  /**
   * Make a GET request
   * @param url - API endpoint
   * @param config - Axios request configuration
   * @returns API response
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return errorService.withErrorHandling(async () => {
      return await this.axios.get(url, config);
    }, { showToast: false, rethrow: true });
  }

  /**
   * Make a POST request with CSRF protection
   * @param url - API endpoint
   * @param data - Request body data
   * @param config - Axios request configuration
   * @returns API response
   */
  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return errorService.withErrorHandling(async () => {
      if (!(data instanceof FormData)) {
        if (!config) config = {};
        if (!config.headers) config.headers = {};
        config.headers["Content-Type"] = "application/json";
      }
      return await this.axios.post(url, data, config);
    }, { showToast: false, rethrow: true });
  }

  /**
   * Make a PUT request with CSRF protection
   * @param url - API endpoint
   * @param data - Request body data
   * @param config - Axios request configuration
   * @returns API response
   */
  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return errorService.withErrorHandling(async () => {
      return await this.axios.put(url, data, config);
    }, { showToast: false, rethrow: true });
  }

  /**
   * Make a DELETE request with CSRF protection
   * @param url - API endpoint
   * @param config - Axios request configuration
   * @returns API response
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return errorService.withErrorHandling(async () => {
      return await this.axios.delete(url, config);
    }, { showToast: false, rethrow: true });
  }

  /**
   * Make a PATCH request with CSRF protection
   * @param url - API endpoint
   * @param data - Request body data
   * @param config - Axios request configuration
   * @returns API response
   */
  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return errorService.withErrorHandling(async () => {
      return await this.axios.patch(url, data, config);
    }, { showToast: false, rethrow: true });
  }
}

// Create instance
const apiClientInstance = ApiClient.getInstance();

// Named export
export { apiClientInstance as apiClient };