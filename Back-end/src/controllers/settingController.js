import Setting from '../models/Setting.js';
import asyncHandler from 'express-async-handler';
import {  success, createError  } from '../utils/responseHandler.js';

/**
 * @desc    Get all settings
 * @route   GET /api/v1/settings
 * @access  Private/Admin
 */
export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find();

  // Use unified success response
  return success(res, { settings });
});

/**
 * @desc    Get a single setting by ID
 * @route   GET /api/v1/settings/:id
 * @access  Private/Admin
 */
export const getSettingById = asyncHandler(async (req, res) => {
  const setting = await Setting.findById(req.params.id);

  if (!setting) {
    throw createError('Setting not found', 404);
  }

  // Use unified success response
  return success(res, { setting });
});

/**
 * @desc    Update a setting
 * @route   PUT /api/v1/settings/:id
 * @access  Private/Admin
 */
export const updateSetting = asyncHandler(async (req, res) => {
  let setting = await Setting.findById(req.params.id);

  if (!setting) {
    throw createError('Setting not found', 404);
  }

  // Add updater information
  req.body.updatedBy = req.user._id;

  // Update setting
  setting = await Setting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  // Use unified success response
  return success(res, { setting });
});

/**
 * @desc    Create a setting
 * @route   POST /api/v1/settings
 * @access  Private/Admin
 */
export const createSetting = asyncHandler(async (req, res) => {
  // Check if setting ID already exists
  const existingSetting = await Setting.findById(req.body._id);

  if (existingSetting) {
    throw createError('Setting ID already exists', 400);
  }

  // Add creator/updater information (assuming createdBy is not needed, using updatedBy)
  req.body.updatedBy = req.user._id;

  // Create setting
  const setting = await Setting.create(req.body);

  // Use unified success response with 201 status code
  return success(res, { setting }, 201);
});