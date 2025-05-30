"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth-service';
import type { UserInfo } from '@/types/auth';

// Token 管理函数 - 集中处理 token 存取逻辑
const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

const getToken = () => typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
const setToken = (token: string) => typeof window !== 'undefined' && localStorage.setItem(TOKEN_KEY, token);
const removeToken = () => typeof window !== 'undefined' && localStorage.removeItem(TOKEN_KEY);

const setUserData = (user: UserInfo) => {
  typeof window !== 'undefined' && localStorage.setItem(USER_KEY, JSON.stringify(user));
};
const removeUserData = () => typeof window !== 'undefined' && localStorage.removeItem(USER_KEY);

// 认证上下文类型
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (credentials: { email: string; password: string; rememberMe: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时检查认证状态
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    checkAuth();
  }, []);

  // 验证当前 token 是否有效
  const checkAuth = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success && response.data) {
        setIsAuthenticated(true);
        setUser(response.data as UserInfo);
      } else {
        handleAuthFailure();
      }
    } catch (error) {
      handleAuthFailure();
    } finally {
      setIsLoading(false);
    }
  };

  // 处理认证失败
  const handleAuthFailure = () => {
    setIsAuthenticated(false);
    setUser(null);
    removeToken();
    removeUserData();
    
    // 仅在非登录页面重定向
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  };

  // 登录方法
  const login = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.token) {
        // 保存认证信息
        setIsAuthenticated(true);
        setUser(response.user as UserInfo);
        setToken(response.token);
        setUserData(response.user as UserInfo);
        return;
      }
      
      // 登录失败但没有抛出异常
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  // 登出方法
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      removeToken();
      removeUserData();
    }
  };

  // 刷新 token 方法
  const refreshToken = async () => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    await checkAuth();
  };

  if (isLoading) {
    return null; // 或者返回一个加载指示器
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 