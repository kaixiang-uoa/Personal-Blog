import Media from '../models/Media.js';
import { success, error } from '../utils/responseHandler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all media files
export const getAllMedia = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const query = {};
    
    // Add type to query if specified
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

// Get single media file
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

// Upload media files
export const uploadMedia = async (req, res) => {
  try {
    // Add debug logs
    console.log('Upload request received:');
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      console.log('No files found in request');
      return error(res, 'media.noFile', 400);
    }
    
    // Handle multiple file uploads
    const mediaFiles = [];
    
    // Create media records for each file
    for (const file of req.files) {
      console.log('Processing file:', {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      });
      
      const { originalname, filename, path: filePath, size, mimetype } = file;
      const fileType = mimetype.split('/')[0];
      
      // Create media record, ensure field names match model definition
      const media = await Media.create({
        filename,
        originalname,
        mimetype,
        size,
        path: filePath,
        url: `/uploads/${filename}`,  // Add url field
        uploadedBy: req.user.id
      });
      
      mediaFiles.push(media);
    }
    
    return success(res, { media: mediaFiles }, 201, 'media.uploaded');
  } catch (err) {
    console.error('Upload error:', err);
    return error(res, 'media.uploadFailed', 500, err.message);
  }
};

// Update media file information
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, altText } = req.body;
    
    const media = await Media.findById(id);
    
    if (!media) {
      return error(res, 'media.notFound', 404);
    }
    
    // Update fields
    if (title) media.title = title;
    if (description) media.description = description;
    if (altText) media.altText = altText;
    
    await media.save();
    
    return success(res, media, 200, 'media.updated');
  } catch (err) {
    return error(res, 'media.updateFailed', 500, err.message);
  }
};

// Delete media file
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { ids } = req.body;

    // Handle batch deletion
    if (ids && Array.isArray(ids)) {
      const mediaItems = await Media.find({ _id: { $in: ids } });
      
      // Delete physical files
      for (const media of mediaItems) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(media.path));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      // Delete database records
      await Media.deleteMany({ _id: { $in: ids } });
      
      return success(res, null, 200, 'media.deleted');
    }
    
    // Single deletion
    const media = await Media.findById(id);
    
    if (!media) {
      return error(res, 'media.notFound', 404);
    }
    
    // Delete physical file
    const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(media.path));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete database record
    await Media.findByIdAndDelete(id);
    
    return success(res, null, 200, 'media.deleted');
  } catch (err) {
    return error(res, 'media.deleteFailed', 500, err.message);
  }
};