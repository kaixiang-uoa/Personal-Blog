import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建认证上下文
const AuthContext = createContext();

// 使用钩子来获取认证上下文
export function useAuth() {
  return useContext(AuthContext);
}

// 认证提供者组件
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 模拟登录功能
  const login = (email, password) => {
    setError('');
    
    // 硬编码的用户名和密码
    if (email === 'example@gmail.com' && password === 'test123456') {
      const user = {
        email: email,
        name: 'Admin User',
        role: 'admin'
      };
      
      // 存储用户信息到本地存储
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return Promise.resolve(user);
    } else {
      setError('用户名或密码错误');
      return Promise.reject(new Error('用户名或密码错误'));
    }
  };

  // 登出功能
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    return Promise.resolve();
  };

  // 检查用户是否已登录
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // 提供认证上下文的值
  const value = {
    currentUser,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}