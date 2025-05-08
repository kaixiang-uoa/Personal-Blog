import api from '../lib/api';

/**
 * 设置服务 - 处理系统设置的操作
 */
export const settingService = {
  /**
   * 获取所有设置
   * @returns {Promise<Array>} 设置列表
   */
  getAllSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data || [];
    } catch (error) {
      console.error('Get all settings error:', error);
      throw error;
    }
  },

  /**
   * 根据键获取单个设置
   * @param {string} key - 设置键
   * @returns {Promise<Object>} 设置对象
   */
  getSettingByKey: async (key) => {
    try {
      const response = await api.get(`/settings/${key}`);
      return response.data;
    } catch (error) {
      console.error(`Get setting by key ${key} error:`, error);
      throw error;
    }
  },

  /**
   * 创建或更新设置
   * @param {Object} settingData - 设置数据 {key, value, description}
   * @returns {Promise<Object>} 更新后的设置对象
   */
  updateSetting: async (settingData) => {
    try {
      const response = await api.post('/settings', settingData);
      return response.data;
    } catch (error) {
      console.error(`Update setting ${settingData.key} error:`, error);
      throw error;
    }
  },

  /**
   * 通过键更新设置
   * @param {string} key - 设置键
   * @param {Object} settingData - 设置数据
   * @returns {Promise<Object>} 更新后的设置对象
   */
  updateSettingByKey: async (key, settingData) => {
    try {
      const response = await api.put(`/settings/${key}`, settingData);
      return response.data;
    } catch (error) {
      console.error(`Update setting ${key} error:`, error);
      throw error;
    }
  },

  /**
   * 批量更新设置
   * @param {Array} settingsData - 设置数据数组
   * @returns {Promise<Array>} 更新后的设置对象数组
   */
  updateSettingsBatch: async (settingsData) => {
    try {
      const response = await api.post('/settings/batch', settingsData);
      return response.data;
    } catch (error) {
      console.error('Batch update settings error:', error);
      throw error;
    }
  },

  /**
   * 删除设置
   * @param {string} key - 设置键
   * @returns {Promise<Object>} 删除操作响应
   */
  deleteSetting: async (key) => {
    try {
      const response = await api.delete(`/settings/${key}`);
      return response;
    } catch (error) {
      console.error(`Delete setting ${key} error:`, error);
      throw error;
    }
  }
}; 