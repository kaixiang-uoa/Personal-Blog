const Media = require('../models/Media');
const asyncHandler = require('express-async-handler');
const { success, paginate, createError } = require('../utils/responseHandler');
const path = require('path');
const fs = require('fs');

/**
 * @desc    获取所有媒体文件
 * @route   GET /api/v1/media
 * @access  Private/Admin
 */
exports.getAllMedia = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, type } = req.query;
  
  // 构建查询条件
  const query = {};
  
  // 如果指定了媒体类型
  if (type) {
    query.type = type;
  }
  
  // 计算分页
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  // 查询媒体文件
  const media = await Media.find(query)
    .populate('uploadedBy', 'username displayName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  
  // 获取总数
  const total = await Media.countDocuments(query);
  
  // 使用统一分页响应
  return paginate(res, media, page, limit, total);
});

/**
 * @desc    获取单个媒体文件
 * @route   GET /api/v1/media/:id
 * @access  Private/Admin
 */
exports.getMediaById = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)
    .populate('uploadedBy', 'username displayName');
  
  if (!media) {
    throw createError('媒体文件不存在', 404);
  }
  
  // 使用统一成功响应
  return success(res, { media });
});

/**
 * @desc    删除媒体文件
 * @route   DELETE /api/v1/media/:id
 * @access  Private/Admin
 */
exports.deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  
  if (!media) {
    throw createError('媒体文件不存在', 404);
  }
  
  // 删除文件系统中的文件
  // 注意：这里假设文件存储在本地，如果使用云存储需要修改此逻辑
  try {
    const filePath = path.join(__dirname, '../../uploads', media.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('删除文件失败:', error);
  }
  
  // 从数据库中删除记录
  await media.deleteOne();
  
  // 使用统一成功响应
  return success(res, { message: '媒体文件已删除' });
});

// 后续可以添加更多功能，如批量删除、更新媒体信息等