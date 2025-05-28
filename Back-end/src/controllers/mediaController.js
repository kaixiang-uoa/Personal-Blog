import Media from '../models/Media.js';
import { success, error } from '../utils/responseHandler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取所有媒体文件
export const getAllMedia = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const query = {};
    
    // 如果指定了类型，添加到查询条件
    if (type) {
      query.fileType = type;
    }
    
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: { path: 'uploadedBy', select: 'username' }
    };
    
    const media = await Media.find(query)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort(options.sort)
      .populate(options.populate);
      
    const total = await Media.countDocuments(query);
    
    return success(res, {
      media,
      pagination: {
        total,
        page: options.page,
        limit: options.limit,
        pages: Math.ceil(total / options.limit)
      }
    }, 200, 'media.listSuccess');
  } catch (err) {
    return error(res, 'media.listFailed', 500, err.message);
  }
};

// 获取单个媒体文件
export const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id).populate('uploadedBy', 'username');
    
    if (!media) {
      return error(res, 'media.notFound', 404);
    }
    
    return success(res, media, 200);
  } catch (err) {
    return error(res, 'media.getFailed', 500, err.message);
  }
};

// 上传媒体文件
export const uploadMedia = async (req, res) => {
  try {
    // 检查是否有文件上传
    if (!req.files || req.files.length === 0) {
      return error(res, 'media.noFile', 400);
    }
    
    // 处理多个文件上传
    const mediaFiles = [];
    
    // 为每个文件创建媒体记录
    for (const file of req.files) {
      const { originalname, filename, path: filePath, size, mimetype } = file;
      const fileType = mimetype.split('/')[0];
      
      // 创建媒体记录
      const media = await Media.create({
        filename,
        originalName: originalname,
        filePath: `/uploads/${filename}`,
        fileSize: size,
        fileType,
        mimeType: mimetype,
        uploadedBy: req.user.id
      });
      
      mediaFiles.push(media);
    }
    
    return success(res, { media: mediaFiles }, 201, 'media.uploaded');
  } catch (err) {
    return error(res, 'media.uploadFailed', 500, err.message);
  }
};

// 更新媒体文件信息
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, altText } = req.body;
    
    const media = await Media.findById(id);
    
    if (!media) {
      return error(res, 'media.notFound', 404);
    }
    
    // 更新字段
    if (title) media.title = title;
    if (description) media.description = description;
    if (altText) media.altText = altText;
    
    await media.save();
    
    return success(res, media, 200, 'media.updated');
  } catch (err) {
    return error(res, 'media.updateFailed', 500, err.message);
  }
};

// 删除媒体文件
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    
    if (!media) {
      return error(res, 'media.notFound', 404);
    }
    
    // 删除物理文件
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadDir, path.basename(media.filePath));
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // 删除数据库记录
    await Media.findByIdAndDelete(id);
    
    return success(res, null, 200, 'media.deleted');
  } catch (err) {
    return error(res, 'media.deleteFailed', 500, err.message);
  }
};