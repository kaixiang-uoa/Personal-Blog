// 身份验证服务

import ApiService from "./api-service"

export const AuthService = {
  // 检查是否已登录
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },

  // 登录
  login: async (credentials: { username: string; password: string; rememberMe: boolean }) => {
    try {
      const response = await ApiService.auth.login(credentials)

      // 保存认证token
      localStorage.setItem("authToken", response.token)

      if (credentials.rememberMe) {
        // 如果勾选了"记住我"，保存用户信息
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      return response.user
    } catch (error) {
      throw error
    }
  },

  // 登出
  logout: async () => {
    try {
      await ApiService.auth.logout()
    } catch (error) {
      console.error("Logout API error:", error)
    } finally {
      // 无论API是否成功，都清除本地存储
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
    }
  },

  // 获取当前登录用户信息
  getCurrentUser: async () => {
    // 先尝试从localStorage获取
    const cachedUser = localStorage.getItem("user")
    if (cachedUser) {
      return JSON.parse(cachedUser)
    }

    // 如果没有缓存，则从API获取
    try {
      const user = await ApiService.auth.getCurrentUser()
      return user
    } catch (error) {
      console.error("Failed to get current user:", error)
      return null
    }
  },

  // 检查权限
  hasPermission: (permission: string) => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return false

    try {
      const user = JSON.parse(userStr)
      return user.permissions?.includes(permission) || false
    } catch (error) {
      return false
    }
  },
}

export default AuthService
