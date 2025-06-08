import { apiClient } from './api-client';
import { TokenManager } from './token-manager';
import { csrfService } from './csrf-service';
import { validationService } from './validation-service';
import { auditLogService, LogSeverity, LogCategory } from './audit-log-service';
import type { LoginRequest, LoginResponse, RefreshTokenResponse, User, UserInfo } from '@/types/auth.types';
import type { ApiResponse } from '@/types/api.types';
import axios from 'axios';

// Flag to track if a token refresh is in progress
let isRefreshingToken = false;
// Promise to await while token refresh is in progress
let refreshTokenPromise: Promise<boolean> | null = null;

/**
 * Authentication Service
 * 
 * Provides authentication-related functionality including login, logout, token refresh, and session management.
 */
export const authService = {
  /**
   * Log in a user
   * @param credentials User login credentials
   * @returns Login response containing user data and tokens
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // 验证登录凭据
      const validationResult = validationService.validateForm(
        credentials as unknown as Record<string, unknown>, 
        validationService.schemas.login
      );
      if (!validationResult.valid) {
        throw new Error(validationResult.errors[0].message);
      }
      
      // Clear any existing auth data before login
      TokenManager.clearAllAuthData();
      
      // Generate a new CSRF token for the login request
      const csrfToken = csrfService.generateToken();
      
      // Add CSRF token to credentials
      const protectedCredentials = csrfService.protectForm(credentials);
      
      const response = await apiClient.post<LoginResponse>(
        "/auth/login", 
        protectedCredentials
      );
      
      // Save auth data
      TokenManager.setToken(response.token);
      TokenManager.setRefreshToken(response.refreshToken);
      TokenManager.setUserData(response.user);
      
      // 记录登录活动
      await auditLogService.logAuthActivity(
        'user_login', 
        LogSeverity.INFO, 
        { userId: response.user.id, username: response.user.username }
      );
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      
      // 记录登录失败
      if (credentials.email) {
        await auditLogService.logAuthActivity(
          'login_failure', 
          LogSeverity.WARNING, 
          { email: credentials.email }
        );
      }
      
      throw error;
    }
  },

  /**
   * Log out the current user
   * @returns True if logout was successful
   */
  async logout(): Promise<boolean> {
    try {
      const user = TokenManager.getUserData();
      
      // 只有在有令牌的情况下才尝试向服务器发送登出请求
      if (TokenManager.hasToken()) {
        // 使用CSRF保护登出请求
        const logoutData = csrfService.protectForm({});
        
        try {
          // 尝试服务器端登出
          await apiClient.post("/auth/logout", logoutData);
        } catch (error) {
          // 即使服务器端登出失败，我们仍然会在客户端清除数据
          console.error("Server logout failed, but proceeding with client-side logout:", error);
        }
      }
      
      // 记录登出活动
      if (user) {
        await auditLogService.logAuthActivity(
          'user_logout', 
          LogSeverity.INFO, 
          { userId: user.id, username: user.username }
        );
      }
      
      // 无论服务器请求是否成功，都清除本地存储的认证数据
      TokenManager.clearAllAuthData();
      
      // 清除CSRF令牌
      csrfService.clearToken();
      
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      
      // 即使发生错误，也尝试清除本地数据
      TokenManager.clearAllAuthData();
      csrfService.clearToken();
      
      return false;
    }
  },

  /**
   * Refresh the authentication token
   * @returns True if token was successfully refreshed
   */
  async refreshToken(): Promise<boolean> {
    // 如果已经在刷新令牌，则返回正在进行的刷新过程
    if (isRefreshingToken && refreshTokenPromise) {
      return refreshTokenPromise;
    }
    
    // 没有刷新令牌则无法刷新
    if (!TokenManager.hasRefreshToken()) {
      return false;
    }
    
    // 设置刷新令牌标志
    isRefreshingToken = true;
    
    // 创建刷新令牌的Promise
    refreshTokenPromise = (async () => {
      try {
        const refreshToken = TokenManager.getRefreshToken();
        const user = TokenManager.getUserData();
        
        // 添加CSRF保护
        const refreshData = csrfService.protectForm({ refreshToken });
        
        const response = await apiClient.post<RefreshTokenResponse>(
          "/auth/refresh", 
          refreshData
        );
        
        // 更新令牌
        if (response.token) {
          TokenManager.setToken(response.token);
          
          // 如果有新的刷新令牌，也更新它
          if (response.refreshToken) {
            TokenManager.setRefreshToken(response.refreshToken);
          }
          
          // 记录令牌刷新活动
          if (user) {
            await auditLogService.logAuthActivity(
              'token_refresh', 
              LogSeverity.INFO, 
              { userId: user.id, username: user.username }
            );
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error("Token refresh failed:", error);
        
        // 记录令牌刷新失败
        await auditLogService.logAuthActivity(
          'token_refresh_failure', 
          LogSeverity.WARNING
        );
        
        return false;
      } finally {
        // 重置刷新状态
        isRefreshingToken = false;
        refreshTokenPromise = null;
      }
    })();
    
    return refreshTokenPromise;
  },

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Registration response
   */
  async register(userData: Record<string, unknown>): Promise<LoginResponse> {
    try {
      // 验证注册数据
      const validationResult = validationService.validateForm(userData, validationService.schemas.registration);
      if (!validationResult.valid) {
        throw new Error(validationResult.errors[0].message);
      }
      
      // 添加CSRF保护
      const protectedUserData = csrfService.protectForm(userData);
      
      const response = await apiClient.post<LoginResponse>("/auth/register", protectedUserData);
      
      // Save auth data
      TokenManager.setToken(response.token);
      TokenManager.setRefreshToken(response.refreshToken);
      TokenManager.setUserData(response.user);
      
      // 记录注册活动
      await auditLogService.logAuthActivity(
        'user_register', 
        LogSeverity.INFO, 
        { userId: response.user.id, username: response.user.username }
      );
      
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      
      // 记录注册失败
      const email = typeof userData.email === 'string' ? userData.email : 'unknown';
      await auditLogService.logAuthActivity(
        'register_failure', 
        LogSeverity.WARNING, 
        { email }
      );
      
      throw error;
    }
  },

  /**
   * Get the current authenticated user
   * @returns The current user or null if not authenticated
   */
  getCurrentUser(): User | null {
    return TokenManager.getUserData();
  },
  
  /**
   * Check if the current user is authenticated
   * @returns True if the user is authenticated
   */
  isAuthenticated(): boolean {
    return TokenManager.hasToken() && !TokenManager.isTokenExpiredOrExpiring();
  },
  
  /**
   * Verify the current authentication status with the server
   * @returns True if authentication is valid
   */
  async verifyAuth(): Promise<boolean> {
    try {
      if (!this.isAuthenticated()) {
        return false;
      }
      
      const response = await apiClient.get<{ valid: boolean }>("/auth/verify");
      return response.valid;
    } catch (error) {
      console.error("Auth verification failed:", error);
      return false;
    }
  },
  
  /**
   * Request a password reset
   * @param email User's email address
   * @returns True if the reset request was successful
   */
  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      // 验证邮箱格式
      const validationResult = validationService.validateField('email', email, { 
        required: true, 
        isEmail: true 
      });
      
      if (validationResult) {
        throw new Error(validationResult.message);
      }
      
      // 添加CSRF保护
      const resetData = csrfService.protectForm({ email });
      
      await apiClient.post("/auth/request-reset", resetData);
      
      // 记录密码重置请求
      await auditLogService.logSecurityActivity(
        'password_reset_request', 
        LogSeverity.INFO, 
        { email }
      );
      
      return true;
    } catch (error) {
      console.error("Password reset request failed:", error);
      
      // 记录密码重置请求失败
      await auditLogService.logSecurityActivity(
        'password_reset_request_failure', 
        LogSeverity.WARNING, 
        { email }
      );
      
      return false;
    }
  },
  
  /**
   * Complete the password reset process
   * @param token Reset token from email
   * @param newPassword New password
   * @returns True if the password was successfully reset
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      // 验证密码格式
      const validationResult = validationService.validateField('password', newPassword, {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      });
      
      if (validationResult) {
        throw new Error(validationResult.message);
      }
      
      // 添加CSRF保护
      const resetData = csrfService.protectForm({ token, newPassword });
      
      await apiClient.post("/auth/reset-password", resetData);
      
      // 记录密码重置完成
      await auditLogService.logSecurityActivity(
        'password_reset_complete', 
        LogSeverity.INFO
      );
      
      return true;
    } catch (error) {
      console.error("Password reset failed:", error);
      
      // 记录密码重置失败
      await auditLogService.logSecurityActivity(
        'password_reset_failure', 
        LogSeverity.WARNING
      );
      
      return false;
    }
  },
  
  /**
   * Change the current user's password
   * @param currentPassword Current password
   * @param newPassword New password
   * @returns True if the password was successfully changed
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = TokenManager.getUserData();
      
      // 验证新密码格式
      const validationResult = validationService.validateField('password', newPassword, {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      });
      
      if (validationResult) {
        throw new Error(validationResult.message);
      }
      
      // 添加CSRF保护
      const passwordData = csrfService.protectForm({ currentPassword, newPassword });
      
      await apiClient.post("/auth/change-password", passwordData);
      
      // 记录密码更改
      if (user) {
        await auditLogService.logSecurityActivity(
          'password_change', 
          LogSeverity.INFO, 
          { userId: user.id, username: user.username }
        );
      }
      
      return true;
    } catch (error) {
      console.error("Password change failed:", error);
      
      // 记录密码更改失败
      const user = TokenManager.getUserData();
      if (user) {
        await auditLogService.logSecurityActivity(
          'password_change_failure', 
          LogSeverity.WARNING, 
          { userId: user.id, username: user.username }
        );
      }
      
      throw error;
    }
  },

  /**
   * Get current user information
   */
  getCurrentUserInfo: async (): Promise<ApiResponse<UserInfo>> => {
    try {
      // 检查令牌是否即将过期，如果是，尝试刷新
      if (TokenManager.isTokenExpiredOrExpiring()) {
        await authService.refreshToken();
      }
      
      return await apiClient.get<ApiResponse<UserInfo>>("/auth/me");
    } catch (error) {
      console.error('Failed to get user info:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   */
  registerUser: async (data: { username: string; email: string; password: string }): Promise<ApiResponse<void>> => {
    try {
      return await apiClient.post<ApiResponse<void>>("/auth/register", data);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Validate reset password token
   */
  validateResetToken: async (token: string): Promise<ApiResponse<boolean>> => {
    try {
      return await apiClient.get<ApiResponse<boolean>>(`/auth/reset-password/${token}/validate`);
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  },

  /**
   * Get seconds until token expiration
   * @returns Seconds until expiration, or null if no token/expiry
   */
  getSecondsUntilExpiry: (): number | null => {
    const expiry = TokenManager.getTokenExpiry();
    if (!expiry) return null;
    
    const now = Math.floor(Date.now() / 1000);
    const remaining = expiry - now;
    
    return remaining > 0 ? remaining : null;
  }
};

// Maintain named export, remove default export