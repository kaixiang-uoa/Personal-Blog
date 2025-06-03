import Setting from '../models/Setting.js';
import SettingHistory from '../models/SettingHistory.js';
import { success, error } from '../utils/responseHandler.js';

// get all settings
export const getAllSettings = async (req, res) => {
  try {
    const { group } = req.query;
    
    // if group parameter is provided, filter by group
    const filter = group ? { group } : {};
    const settings = await Setting.find(filter);
    
    // convert to key-value format
    const settingsMap = {};
    settings.forEach(setting => {
      settingsMap[setting.key] = setting.value;
    });
    
    return success(res, settingsMap, 200, 'setting.listSuccess');
  } catch (err) {
    return error(res, 'setting.listFailed', 500, err.message);
  }
};

// get single setting
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

// update or create setting
export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description, group } = req.body;
    
    // prepare update data, handle possible undefined values
    const updateData = {
      value: value === undefined ? '' : value,
    };
    
    // add optional fields only when provided
    if (description !== undefined) updateData.description = description;
    if (group !== undefined) updateData.group = group;
    
    // find existing setting to get old value
    const existingSetting = await Setting.findOne({ key });
    const isCreate = !existingSetting;
    
    // use upsert option, create if not exists
    const setting = await Setting.findOneAndUpdate(
      { key },
      updateData,
      { new: true, upsert: true }
    );
    
    // record history
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

// batch update settings
export const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    
    if (!Array.isArray(settings)) {
      return error(res, 'setting.invalidFormat', 400);
    }
    
    const historyRecords = [];
    const updatePromises = settings.map(async ({ key, value, description, group }) => {
      // prepare update data, handle possible undefined values
      const updateData = {
        value: value === undefined ? '' : value,
      };
      
      // add optional fields only when provided
      if (description !== undefined) updateData.description = description;
      if (group !== undefined) updateData.group = group;
      
      // find existing setting to get old value
      const existingSetting = await Setting.findOne({ key });
      const isCreate = !existingSetting;
      
      // use upsert to update
      const result = await Setting.findOneAndUpdate(
        { key },
        updateData,
        { new: true, upsert: true }
      );
      
      // prepare history record
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
    
    // batch create history records
    await SettingHistory.insertMany(historyRecords);
    
    return success(res, updatedSettings, 200, 'setting.batchUpdated');
  } catch (err) {
    return error(res, 'setting.batchUpdateFailed', 500, err.message);
  }
};

// delete setting
export const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOneAndDelete({ key });
    
    if (!setting) {
      return error(res, 'setting.notFound', 404);
    }
    
    // record delete history
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

// get setting history
export const getSettingHistory = async (req, res) => {
  try {
    const { key } = req.params;
    const { limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // if key parameter is provided, filter by key
    const filter = key ? { key } : {};
    
    // query history records
    const history = await SettingHistory.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('changedBy', 'name email');
    
    // get total number of records
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

// get recent history versions of a specific key
export const getSettingVersions = async (req, res) => {
  try {
    const { key } = req.params;
    const { limit = 5 } = req.query;
    
    // query history records of a specific key
    const versions = await SettingHistory.find({ key })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('changedBy', 'name email');
    
    return success(res, versions, 200, 'setting.versionsSuccess');
  } catch (err) {
    return error(res, 'setting.versionsFailed', 500, err.message);
  }
};

// rollback to a specific history version
export const rollbackSetting = async (req, res) => {
  try {
    const { historyId } = req.params;
    
    // find history record
    const historyRecord = await SettingHistory.findById(historyId);
    
    if (!historyRecord) {
      return error(res, 'setting.historyNotFound', 404);
    }
    
    // find current setting
    const currentSetting = await Setting.findOne({ key: historyRecord.key });
    
    if (!currentSetting) {
      return error(res, 'setting.notFound', 404);
    }
    
    // get value to restore
    const valueToRestore = historyRecord.oldValue;
    
    // update setting
    const updatedSetting = await Setting.findOneAndUpdate(
      { key: historyRecord.key },
      { value: valueToRestore },
      { new: true }
    );
    
    // record rollback history
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