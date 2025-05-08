import api from '../lib/api';

/**
 * 分类服务 - 处理分类的CRUD操作
 */
export const categoryService = {
  /**
   * 获取所有分类
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>} 分类列表
   */
  getCategories: async (params = {}) => {
    try {
      const response = await api.get('/categories', { params });
      // 提取响应中的categories数组
      if (response && response.success && response.data && Array.isArray(response.data.categories)) {
        return response.data.categories;
      }
      // 如果数据结构与预期不符，返回空数组
      console.warn('Categories API返回的数据结构不符合预期:', response);
      return [];
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  },

  /**
   * 根据ID获取单个分类
   * @param {string} id - 分类ID
   * @returns {Promise<Object>} 分类对象
   */
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error(`Get category by ID ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 根据别名获取单个分类
   * @param {string} slug - 分类别名
   * @returns {Promise<Object>} 分类对象
   */
  getCategoryBySlug: async (slug) => {
    try {
      const response = await api.get(`/categories/slug/${slug}`);
      return response;
    } catch (error) {
      console.error(`Get category by slug ${slug} error:`, error);
      throw error;
    }
  },

  /**
   * 创建新分类
   * @param {Object} categoryData - 分类数据
   * @returns {Promise<Object>} 创建的分类对象
   */
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', categoryData);
      return response;
    } catch (error) {
      console.error('Create category error:', error);
      throw error;
    }
  },

  /**
   * 更新分类
   * @param {string} id - 分类ID
   * @param {Object} categoryData - 更新的分类数据
   * @returns {Promise<Object>} 更新后的分类对象
   */
  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      return response;
    } catch (error) {
      console.error(`Update category ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 删除分类
   * @param {string} id - 分类ID
   * @returns {Promise<Object>} 删除操作响应
   */
  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error(`Delete category ${id} error:`, error);
      throw error;
    }
  }
}; 