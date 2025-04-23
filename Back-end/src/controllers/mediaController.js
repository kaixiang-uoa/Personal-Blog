const Media = require('../models/Media');
const asyncHandler = require('express-async-handler');
const { success, paginate, createError } = require('../utils/responseHandler');
const path = require('path');
const fs = require('fs');

/**
 * @desc    Get all media files
 * @route   GET /api/v1/media
 * @access  Private/Admin
 */
exports.getAllMedia = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, type } = req.query;

  // Build query conditions
  const query = {};

  // If media type is specified
  if (type) {
    query.type = type;
  }

  // Use paginate utility for consistent pagination
  return paginate(res, {
    model: Media,
    query,
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    dataKey: 'media'
  });
});

/**
 * @desc    Get a single media file by ID
 * @route   GET /api/v1/media/:id
 * @access  Private/Admin
 */
exports.getMediaById = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    throw createError('Media file does not exist', 404);
  }

  return success(res, { media });
});

/**
 * @desc    Delete a media file
 * @route   DELETE /api/v1/media/:id
 * @access  Private/Admin
 */
exports.deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    throw createError('Media file does not exist', 404);
  }

  // Delete file from filesystem
  const filePath = path.join(__dirname, '../..', media.path);
  
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error('File deletion failed:', err);
    // Continue with database deletion even if file deletion fails
  }

  // Delete from database
  await media.remove();

  return success(res, null, 200, 'Media file deleted successfully');
});