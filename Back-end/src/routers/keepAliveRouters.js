import express from "express";
const router = express.Router();
import {
  startService,
  stopService,
  getStatus,
  updateInterval,
} from "../controllers/keepAliveController.js";
import { protect } from "../middleware/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Keep-Alive
 *   description: Keep-Alive service management
 */

/**
 * @swagger
 * /keep-alive/start:
 *   post:
 *     summary: Start Keep-Alive service
 *     description: Start the Keep-Alive service that pings the target URL periodically
 *     tags: [Keep-Alive]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service started successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/start", protect, startService);

/**
 * @swagger
 * /keep-alive/stop:
 *   post:
 *     summary: Stop Keep-Alive service
 *     description: Stop the Keep-Alive service
 *     tags: [Keep-Alive]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service stopped successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/stop", protect, stopService);

/**
 * @swagger
 * /keep-alive/status:
 *   get:
 *     summary: Get Keep-Alive service status
 *     description: Get the current status of the Keep-Alive service
 *     tags: [Keep-Alive]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service status
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/status", protect, getStatus);

/**
 * @swagger
 * /keep-alive/interval:
 *   put:
 *     summary: Update Keep-Alive service interval
 *     description: Update the ping interval of the Keep-Alive service
 *     tags: [Keep-Alive]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - minutes
 *             properties:
 *               minutes:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 14
 *                 example: 10
 *                 description: New interval in minutes (1-14 to avoid Render sleep state)
 *     responses:
 *       200:
 *         description: Interval updated successfully
 *       400:
 *         description: Invalid minutes parameter
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/interval", protect, updateInterval);

export default router; 