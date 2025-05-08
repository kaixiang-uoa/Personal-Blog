"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"

// 创建应用上下文
const AppContext = createContext()

// 导出上下文提供者组件
export function AppProvider({ children }) {
  // 当前活动页面状态
  const [activePage, setActivePage] = useState("dashboard")

  // 当前活动标签页状态（用于仪表盘页面内部的标签页）
  const [activeTab, setActiveTab] = useState("overview")

  // 侧边栏状态
  const [showSidebar, setShowSidebar] = useState(true)
  
  // 添加认证状态
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // 文章编辑状态
  const [currentArticle, setCurrentArticle] = useState(null)
  const [isEditingArticle, setIsEditingArticle] = useState(false)
  
  // 导航到文章编辑器页面
  const navigateToArticleEditor = (article = null) => {
    setCurrentArticle(article)
    setIsEditingArticle(!!article) // 如果传入文章，则为编辑模式，否则为新增模式
    setActivePage("articleEditor")
  }
  
  // 返回到内容管理页面
  const returnToContentPage = () => {
    setActivePage("content")
    setCurrentArticle(null)
  }
  
  // 检查用户是否已认证
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const userData = await authService.getCurrentUser()
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        localStorage.removeItem('auth_token')
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])
  
  // 登录函数
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      localStorage.setItem('auth_token', response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }
  
  // 登出函数
  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem('auth_token')
    }
  }

  // 返回上下文提供的值
  const value = {
    // 现有状态
    activePage,
    setActivePage,
    activeTab,
    setActiveTab,
    showSidebar,
    setShowSidebar,
    
    // 认证状态
    user,
    isAuthenticated, 
    isLoading,
    login, 
    logout,
    
    // 文章编辑状态
    currentArticle,
    setCurrentArticle,
    isEditingArticle,
    navigateToArticleEditor,
    returnToContentPage
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// 导出使用上下文的Hook
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext必须在AppProvider内部使用")
  }
  return context
}
