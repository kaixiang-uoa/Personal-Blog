import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth-utils';

export function ProtectedRoute() {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // 如果正在加载认证状态，显示加载中
  if (loading) {
    return <div className="flex h-screen items-center justify-center">加载中...</div>;
  }

  // 如果用户未登录，重定向到登录页面，并记住当前尝试访问的URL
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 用户已登录，渲染子路由
  return <Outlet />;
}