const Setting = require('../models/Setting');
const asyncHandler = require('express-async-handler');
const { success, createError } = require('../utils/responseHandler');

/**
 * @desc    获取所有设置
 * @route   GET /api/v1/settings
 * @access  Private/Admin
 */
exports.getAllSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find();
  
  // 使用统一成功响应
  return success(res, { settings });
});

/**
 * @desc    获取单个设置
 * @route   GET /api/v1/settings/:id
 * @access  Private/Admin
 */
exports.getSettingById = asyncHandler(async (req, res) => {
  const setting = await Setting.findById(req.params.id);
  
  if (!setting) {
    throw createError('设置不存在', 404);
  }
  
  // 使用统一成功响应
  return success(res, { setting });
});

/**
 * @desc    更新设置
 * @route   PUT /api/v1/settings/:id
 * @access  Private/Admin
 */
exports.updateSetting = asyncHandler(async (req, res) => {
  let setting = await Setting.findById(req.params.id);
  
  if (!setting) {
    throw createError('设置不存在', 404);
  }
  
  // 添加更新者信息
  req.body.updatedBy = req.user._id;
  
  // 更新设置
  setting = await Setting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  // 使用统一成功响应
  return success(res, { setting });
});

/**
 * @desc    创建设置
 * @route   POST /api/v1/settings
 * @access  Private/Admin
 */
exports.createSetting = asyncHandler(async (req, res) => {
  // 检查设置ID是否已存在
  const existingSetting = await Setting.findById(req.body._id);
  
  if (existingSetting) {
    throw createError('该设置ID已存在', 400);
  }
  
  // 添加更新者信息
  req.body.updatedBy = req.user._id;
  
  // 创建设置
  const setting = await Setting.create(req.body);
  
  // 使用统一成功响应
  return success(res, { setting }, 201);
});