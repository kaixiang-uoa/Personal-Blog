import Setting from '../models/Setting.js';
import SettingHistory from '../models/SettingHistory.js';
import { success, error } from '../utils/responseHandler.js';

// 获取所有设置
export const getAllSettings = async (req, res) => {
  try {
    const { group } = req.query;
    
    // 如果提供了group参数，按group过滤
    const filter = group ? { group } : {};
    const settings = await Setting.find(filter);
    
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
    const { value, description, group } = req.body;
    
    // 准备更新的数据，处理可能为undefined的值
    const updateData = {
      value: value === undefined ? '' : value,
    };
    
    // 只在提供时添加可选字段
    if (description !== undefined) updateData.description = description;
    if (group !== undefined) updateData.group = group;
    
    // 查找现有的设置以获取旧值
    const existingSetting = await Setting.findOne({ key });
    const isCreate = !existingSetting;
    
    // 使用upsert选项，如果不存在则创建
    const setting = await Setting.findOneAndUpdate(
      { key },
      updateData,
      { new: true, upsert: true }
    );
    
    // 记录历史
    await SettingHistory.create({
      key,
      oldValue: existingSetting ? existingSetting.value : null,
      newValue: setting.value,
      changedBy: req.user ? req.user._id : null,
      action: isCreate ? 'create' : 'update',
      description: `Setting ${isCreate ? 'created' : 'updated'} via API`
    });
    
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
    
    const historyRecords = [];
    const updatePromises = settings.map(async ({ key, value, description, group }) => {
      // 准备更新的数据，处理可能为undefined的值
      const updateData = {
        value: value === undefined ? '' : value,
      };
      
      // 只在提供时添加可选字段
      if (description !== undefined) updateData.description = description;
      if (group !== undefined) updateData.group = group;
      
      // 查找现有的设置以获取旧值
      const existingSetting = await Setting.findOne({ key });
      const isCreate = !existingSetting;
      
      // 使用upsert更新
      const result = await Setting.findOneAndUpdate(
        { key },
        updateData,
        { new: true, upsert: true }
      );
      
      // 准备历史记录
      historyRecords.push({
        key,
        oldValue: existingSetting ? existingSetting.value : null,
        newValue: result.value,
        changedBy: req.user ? req.user._id : null,
        action: isCreate ? 'create' : 'update',
        description: `Setting ${isCreate ? 'created' : 'updated'} via batch update`
      });
      
      return result;
    });
    
    const updatedSettings = await Promise.all(updatePromises);
    
    // 批量创建历史记录
    await SettingHistory.insertMany(historyRecords);
    
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
    
    // 记录删除历史
    await SettingHistory.create({
      key,
      oldValue: setting.value,
      newValue: null,
      changedBy: req.user ? req.user._id : null,
      action: 'delete',
      description: 'Setting deleted via API'
    });
    
    return success(res, null, 200, 'setting.deleted');
  } catch (err) {
    return error(res, 'setting.deleteFailed', 500, err.message);
  }
};

// 获取设置历史记录
export const getSettingHistory = async (req, res) => {
  try {
    const { key } = req.params;
    const { limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // 如果提供了key参数，按key过滤
    const filter = key ? { key } : {};
    
    // 查询历史记录
    const history = await SettingHistory.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('changedBy', 'name email');
    
    // 获取总记录数
    const total = await SettingHistory.countDocuments(filter);
    
    return success(res, {
      history,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    }, 200, 'setting.historySuccess');
  } catch (err) {
    return error(res, 'setting.historyFailed', 500, err.message);
  }
};

// 获取特定键的最近历史版本
export const getSettingVersions = async (req, res) => {
  try {
    const { key } = req.params;
    const { limit = 5 } = req.query;
    
    // 查询特定键的历史记录
    const versions = await SettingHistory.find({ key })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('changedBy', 'name email');
    
    return success(res, versions, 200, 'setting.versionsSuccess');
  } catch (err) {
    return error(res, 'setting.versionsFailed', 500, err.message);
  }
};

// 回滚到特定历史版本
export const rollbackSetting = async (req, res) => {
  try {
    const { historyId } = req.params;
    
    // 查找历史记录
    const historyRecord = await SettingHistory.findById(historyId);
    
    if (!historyRecord) {
      return error(res, 'setting.historyNotFound', 404);
    }
    
    // 查找当前设置
    const currentSetting = await Setting.findOne({ key: historyRecord.key });
    
    if (!currentSetting) {
      return error(res, 'setting.notFound', 404);
    }
    
    // 获取要恢复的值
    const valueToRestore = historyRecord.oldValue;
    
    // 更新设置
    const updatedSetting = await Setting.findOneAndUpdate(
      { key: historyRecord.key },
      { value: valueToRestore },
      { new: true }
    );
    
    // 记录回滚历史
    await SettingHistory.create({
      key: historyRecord.key,
      oldValue: currentSetting.value,
      newValue: valueToRestore,
      changedBy: req.user ? req.user._id : null,
      action: 'update',
      description: `Setting rolled back to version from ${new Date(historyRecord.createdAt).toLocaleString()}`
    });
    
    return success(res, updatedSetting, 200, 'setting.rollbackSuccess');
  } catch (err) {
    return error(res, 'setting.rollbackFailed', 500, err.message);
  }
};