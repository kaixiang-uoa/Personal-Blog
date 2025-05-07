import api from '../lib/api';

/**
 * 认证服务 - 处理用户登录、登出和获取用户信息
 */
export const authService = {
  /**
   * 用户登录
   * @param {Object} credentials - 包含用户凭证的对象 {email, password}
   * @returns {Promise<Object>} 登录响应，含token和用户信息
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * 用户登出
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
      // 即使API调用失败，仍需要清除本地令牌
      localStorage.removeItem('auth_token');
      throw error;
    }
  },

  /**
   * 获取当前用户信息
   * @returns {Promise<Object>} 当前用户信息
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }
}; 