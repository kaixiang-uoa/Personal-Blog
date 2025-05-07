"use client"

import { useEffect } from "react"
import { useAppContext } from "../context/AppContext"
import LoginPage from "../pages/auth/LoginPage"

/**
 * 保护路由组件 - 确保用户已经认证
 * 如果用户未认证，则显示登录页面
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAppContext()

  if (isLoading) {
    // 正在检查认证状态，显示加载界面
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // 未认证，显示登录页面
    return <LoginPage />
  }

  // 已认证，显示受保护的内容
  return children
} 