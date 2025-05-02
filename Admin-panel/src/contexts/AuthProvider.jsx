import React, { createContext, useState, useEffect } from 'react';
import { AuthContext } from './auth-utils';
import { api } from '../services/api';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 新增访客模式状态
  const [isGuestMode, setIsGuestMode] = useState(false);

  // 检查用户是否已登录
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 从本地存储获取令牌
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // 验证令牌有效性
          // 这里可以调用后端API验证令牌
          // 暂时模拟一个用户
          setCurrentUser({
            id: 1,
            name: '管理员',
            email: 'admin@example.com',
            avatar: null,
            role: 'admin'
          });
        }
      } catch (err) {
        console.error('验证用户状态失败:', err);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // 登录函数
  const login = async (email, password) => {
    setError(null);
    try {
      // 调用登录API
      // const response = await api.login({ email, password });
      
      // 模拟登录成功
      if (email === 'example@gmail.com' && password === 'test123456') {
        const mockUser = {
          id: 1,
          name: '管理员',
          email: email,
          avatar: null,
          role: 'admin'
        };
        
        // 保存令牌到本地存储
        localStorage.setItem('authToken', 'mock-token-12345');
        setCurrentUser(mockUser);
        return mockUser;
      } else {
        throw new Error('邮箱或密码不正确');
      }
    } catch (err) {
      setError(err.message || '登录失败，请稍后再试');
      throw err;
    }
  };

  // 访客登录函数
  const loginAsGuest = async () => {
    setError(null);
    try {
      const guestUser = {
        id: 'guest',
        name: '访客用户',
        email: 'guest@example.com',
        avatar: null,
        role: 'guest'
      };
      
      // 设置访客模式标志
      setIsGuestMode(true);
      setCurrentUser(guestUser);
      
      // 不保存到localStorage，保持临时性
      return guestUser;
    } catch (err) {
      setError('访客登录失败，请稍后再试');
      throw err;
    }
  };

  // 修改登出函数，清除访客模式
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
    setIsGuestMode(false);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    loginAsGuest,
    isGuestMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}