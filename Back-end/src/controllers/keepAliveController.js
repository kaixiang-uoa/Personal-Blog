import asyncHandler from "express-async-handler";
import { success, createError } from "../utils/responseHandler.js";
import keepAliveService from "../services/keepAlive/index.js";
import ConfigManager from "../services/keepAlive/config.js";

/**
 * @desc    Start Keep-Alive service
 * @route   POST /api/keep-alive/start
 * @access  Private
 */
export const startService = asyncHandler(async (req, res) => {
  await keepAliveService.start();
  
  return success(res, {
    message: "Keep-Alive service started successfully",
    status: keepAliveService.getStatus()
  });
});

/**
 * @desc    Stop Keep-Alive service
 * @route   POST /api/keep-alive/stop
 * @access  Private
 */
export const stopService = asyncHandler(async (req, res) => {
  await keepAliveService.stop();
  
  return success(res, {
    message: "Keep-Alive service stopped successfully",
    status: keepAliveService.getStatus()
  });
});

/**
 * @desc    Get Keep-Alive service status
 * @route   GET /api/keep-alive/status
 * @access  Private
 */
export const getStatus = asyncHandler(async (req, res) => {
  const status = keepAliveService.getStatus();
  
  return success(res, {
    status
  });
});

/**
 * @desc    Update Keep-Alive service interval
 * @route   PUT /api/keep-alive/interval
 * @access  Private
 * @param   {number} req.body.minutes - New interval in minutes (1-14)
 */
export const updateInterval = asyncHandler(async (req, res) => {
  const { minutes } = req.body;
  
  if (!minutes || typeof minutes !== 'number') {
    throw createError('Minutes parameter is required and must be a number', 400);
  }
  
  // 验证时间间隔是否在有效范围内
  if (!ConfigManager.isValidInterval(minutes)) {
    throw createError('Interval must be between 1 and 14 minutes to avoid Render sleep state', 400);
  }
  
  await keepAliveService.updateInterval(minutes);
  
  return success(res, {
    message: `Interval updated to ${minutes} minutes successfully`,
    status: keepAliveService.getStatus()
  });
}); 