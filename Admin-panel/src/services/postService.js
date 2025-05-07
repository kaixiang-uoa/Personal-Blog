import api from '../lib/api';

/**
 * 文章服务 - 处理文章的CRUD操作
 */
export const postService = {
  /**
   * 获取文章列表
   * @param {Object} params - 查询参数，如分页、过滤等
   * @returns {Promise<Array>} 文章列表
   */
  getPosts: async (params = {}) => {
    try {
      const response = await api.get('/posts', { params });
      return response.data || [];
    } catch (error) {
      console.error('Get posts error:', error);
      throw error;
    }
  },

  /**
   * 根据ID获取单个文章
   * @param {string} id - 文章ID
   * @returns {Promise<Object>} 文章对象
   */
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get post by ID ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 根据别名获取单个文章
   * @param {string} slug - 文章别名
   * @returns {Promise<Object>} 文章对象
   */
  getPostBySlug: async (slug) => {
    try {
      const response = await api.get(`/posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Get post by slug ${slug} error:`, error);
      throw error;
    }
  },

  /**
   * 创建新文章
   * @param {Object} postData - 文章数据
   * @returns {Promise<Object>} 创建的文章对象
   */
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  },

  /**
   * 更新文章
   * @param {string} id - 文章ID
   * @param {Object} postData - 更新的文章数据
   * @returns {Promise<Object>} 更新后的文章对象
   */
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Update post ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 删除文章
   * @param {string} id - 文章ID
   * @returns {Promise<Object>} 删除操作响应
   */
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response;
    } catch (error) {
      console.error(`Delete post ${id} error:`, error);
      throw error;
    }
  }
}; 