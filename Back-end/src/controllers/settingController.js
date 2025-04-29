import Setting from '../models/Setting.js';
import { success, error } from '../utils/responseHandler.js';

// 获取所有设置
export const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    
    // 转换为键值对格式
    const settingsMap = {};
    settings.forEach(setting => {
      settingsMap[setting.key] = setting.value;
    });
    
    return success(res, settingsMap, 200, 'setting.listSuccess');
  } catch (err) {
    return error(res, 'setting.listFailed', 500, err.message);
  }
};

// 获取单个设置
export const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ key });
    
    if (!setting) {
      return error(res, 'setting.notFound', 404);
    }
    
    return success(res, setting, 200);
  } catch (err) {
    return error(res, 'setting.getFailed', 500, err.message);
  }
};

// 更新或创建设置
export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;
    
    // 使用upsert选项，如果不存在则创建
    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, description },
      { new: true, upsert: true }
    );
    
    return success(res, setting, 200, 'setting.updated');
  } catch (err) {
    return error(res, 'setting.updateFailed', 500, err.message);
  }
};

// 批量更新设置
export const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    
    if (!Array.isArray(settings)) {
      return error(res, 'setting.invalidFormat', 400);
    }
    
    const updatePromises = settings.map(({ key, value, description }) => {
      return Setting.findOneAndUpdate(
        { key },
        { value, description },
        { new: true, upsert: true }
      );
    });
    
    const updatedSettings = await Promise.all(updatePromises);
    
    return success(res, updatedSettings, 200, 'setting.batchUpdated');
  } catch (err) {
    return error(res, 'setting.batchUpdateFailed', 500, err.message);
  }
};

// 删除设置
export const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOneAndDelete({ key });
    
    if (!setting) {
      return error(res, 'setting.notFound', 404);
    }
    
    return success(res, null, 200, 'setting.deleted');
  } catch (err) {
    return error(res, 'setting.deleteFailed', 500, err.message);
  }
};