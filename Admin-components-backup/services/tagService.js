import api from '../lib/api';

/**
 * 标签服务 - 处理标签的CRUD操作
 */
export const tagService = {
  /**
   * 获取所有标签
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>} 标签列表
   */
  getTags: async (params = {}) => {
    try {
      const response = await api.get('/tags', { params });
      // 提取响应中的tags数组
      if (response && response.success && response.data && Array.isArray(response.data.tags)) {
        return response.data.tags;
      }
      // 如果数据结构与预期不符，返回空数组
      console.warn('Tags API返回的数据结构不符合预期:', response);
      return [];
    } catch (error) {
      console.error('Get tags error:', error);
      throw error;
    }
  },

  /**
   * 根据ID获取单个标签
   * @param {string} id - 标签ID
   * @returns {Promise<Object>} 标签对象
   */
  getTagById: async (id) => {
    try {
      const response = await api.get(`/tags/${id}`);
      return response;
    } catch (error) {
      console.error(`Get tag by ID ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 根据别名获取单个标签
   * @param {string} slug - 标签别名
   * @returns {Promise<Object>} 标签对象
   */
  getTagBySlug: async (slug) => {
    try {
      const response = await api.get(`/tags/slug/${slug}`);
      return response;
    } catch (error) {
      console.error(`Get tag by slug ${slug} error:`, error);
      throw error;
    }
  },

  /**
   * 创建新标签
   * @param {Object} tagData - 标签数据
   * @returns {Promise<Object>} 创建的标签对象
   */
  createTag: async (tagData) => {
    try {
      const response = await api.post('/tags', tagData);
      return response;
    } catch (error) {
      console.error('Create tag error:', error);
      throw error;
    }
  },

  /**
   * 更新标签
   * @param {string} id - 标签ID
   * @param {Object} tagData - 更新的标签数据
   * @returns {Promise<Object>} 更新后的标签对象
   */
  updateTag: async (id, tagData) => {
    try {
      const response = await api.put(`/tags/${id}`, tagData);
      return response;
    } catch (error) {
      console.error(`Update tag ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 删除标签
   * @param {string} id - 标签ID
   * @returns {Promise<Object>} 删除操作响应
   */
  deleteTag: async (id) => {
    try {
      const response = await api.delete(`/tags/${id}`);
      return response;
    } catch (error) {
      console.error(`Delete tag ${id} error:`, error);
      throw error;
    }
  }
}; 