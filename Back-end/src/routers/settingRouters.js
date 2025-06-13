import express from 'express';
import { 
    getAllSettings, 
    getSettingByKey, 
    updateSetting, 
    updateSettings, 
    deleteSetting,
    getSettingHistory,
    getSettingVersions,
    rollbackSetting
} from '../controllers/settingController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

const router = express.Router();

// get all settings
router.get('/', getAllSettings);

// get single setting
router.get('/:key', getSettingByKey);

// routes that require admin privileges
router.put('/:key', protect, restrictTo('admin'), updateSetting);
router.post('/', protect, restrictTo('admin'), updateSetting);
router.post('/batch', protect, restrictTo('admin'), updateSettings);
router.delete('/:key', protect, restrictTo('admin'), deleteSetting);

// setting history related routes
router.get('/history/all', protect, restrictTo('admin'), getSettingHistory);
router.get('/history/:key', protect, restrictTo('admin'), getSettingHistory);
router.get('/versions/:key', protect, restrictTo('admin'), getSettingVersions);
router.post('/rollback/:historyId', protect, restrictTo('admin'), rollbackSetting);

/**
 * @swagger
 * /settings/db/status:
 *   get:
 *     summary: Get database status
 *     description: Get current database connection status and statistics (admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Database status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: object
 *                   properties:
 *                     host:
 *                       type: string
 *                       example: "localhost:27017"
 *                     connected:
 *                       type: boolean
 *                       example: true
 *                     connectionState:
 *                       type: string
 *                       example: "connected"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/db/status', protect, restrictTo('admin'), (req, res) => {
  const conn = mongoose.connection;
  
  const status = {
    host: conn.host || 'N/A',
    port: conn.port || 'N/A',
    name: conn.name || 'N/A',
    connected: conn.readyState === 1,
    connectionState: getConnectionState(conn.readyState),
    models: Object.keys(mongoose.models).length,
    collections: Object.keys(conn.collections).length,
    connectionTime: conn._hasOpened ? 'Connected' : 'Not connected'
  };
  
  res.status(200).json({
    success: true,
    status
  });
});

/**
 * Get connection state string
 * @param {number} state - Mongoose connection state code
 * @returns {string} Connection state description
 */
function getConnectionState(state) {
  switch (state) {
    case 0: return 'disconnected';
    case 1: return 'connected';
    case 2: return 'connecting';
    case 3: return 'disconnecting';
    default: return 'unknown';
  }
}

export default router;