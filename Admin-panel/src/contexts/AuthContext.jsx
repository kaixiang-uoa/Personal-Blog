import React, { useState, useEffect } from "react";
import { AuthContext } from "./auth-utils";

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 模拟登录功能
  const login = async (email, password) => {
    try {
      setError(null);
      // 这里是模拟登录，实际应用中应该调用真实的API
      if (email === 'example@gmail.com' && password === 'test123456') {
        const user = {
          id: 1,
          name: 'Admin User',
          email: email,
          avatar: null,
          role: 'admin'
        };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        throw new Error('邮箱或密码不正确');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // 登出功能
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // 检查本地存储中是否有用户信息
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
// 注意：不再从这个文件导出 useAuth