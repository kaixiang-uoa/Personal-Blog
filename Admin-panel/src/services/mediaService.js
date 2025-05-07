import api from '../lib/api';

/**
 * 媒体服务 - 处理媒体文件的操作
 */
export const mediaService = {
  /**
   * 获取所有媒体文件
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>} 媒体文件列表
   */
  getMedia: async (params = {}) => {
    try {
      const response = await api.get('/media', { params });
      return response.data || [];
    } catch (error) {
      console.error('Get media error:', error);
      throw error;
    }
  },

  /**
   * 根据ID获取单个媒体文件
   * @param {string} id - 媒体文件ID
   * @returns {Promise<Object>} 媒体文件对象
   */
  getMediaById: async (id) => {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get media by ID ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 上传媒体文件
   * @param {FormData} formData - 包含文件的FormData对象
   * @returns {Promise<Object>} 上传的媒体文件对象
   */
  uploadMedia: async (formData) => {
    try {
      // 使用自定义配置进行上传，因为需要设置不同的Content-Type
      const response = await api.post('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload media error:', error);
      throw error;
    }
  },

  /**
   * 更新媒体文件信息
   * @param {string} id - 媒体文件ID
   * @param {Object} mediaData - 更新的媒体文件数据
   * @returns {Promise<Object>} 更新后的媒体文件对象
   */
  updateMedia: async (id, mediaData) => {
    try {
      const response = await api.put(`/media/${id}`, mediaData);
      return response.data;
    } catch (error) {
      console.error(`Update media ${id} error:`, error);
      throw error;
    }
  },

  /**
   * 删除媒体文件
   * @param {string} id - 媒体文件ID
   * @returns {Promise<Object>} 删除操作响应
   */
  deleteMedia: async (id) => {
    try {
      const response = await api.delete(`/media/${id}`);
      return response;
    } catch (error) {
      console.error(`Delete media ${id} error:`, error);
      throw error;
    }
  }
}; 