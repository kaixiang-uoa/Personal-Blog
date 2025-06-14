/**
 * Request Logger Middleware
 * Provides request tracking, performance monitoring, and enhanced logging
 */
import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger.js";

/**
 * Assigns a unique request ID and logs request/response details
 * Tracks request duration for performance monitoring
 */
export const requestLogger = (req, res, next) => {
  // Generate unique request ID
  const requestId = uuidv4();
  req.requestId = requestId;

  // Store request start time for calculating duration
  const startTime = process.hrtime();

  // Log request details
  logger.info("Request received", {
    requestId,
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get("user-agent"),
    referer: req.get("referer") || "-",
    query: Object.keys(req.query || {}).length ? req.query : undefined,
    params: Object.keys(req.params || {}).length ? req.params : undefined,
  });

  // Create a function to log response on completion
  const logResponse = () => {
    // Calculate request duration
    const hrDuration = process.hrtime(startTime);
    const duration = hrDuration[0] * 1000 + hrDuration[1] / 1000000; // Convert to ms

    // Define log level based on status code
    const statusCode = res.statusCode;
    const logLevel =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";

    // Log response details
    logger[logLevel]("Request completed", {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode,
      duration: `${duration.toFixed(2)}ms`,
      contentLength: res.get("content-length") || 0,
    });

    // For slow requests, add a performance warning
    if (duration > 1000) {
      // Threshold of 1000ms = 1s
      logger.warn("Slow request detected", {
        requestId,
        method: req.method,
        url: req.originalUrl || req.url,
        duration: `${duration.toFixed(2)}ms`,
      });
    }

    // Clean up event listeners to prevent memory leaks
    res.removeListener("finish", logResponse);
    res.removeListener("close", logResponse);
    res.removeListener("error", logError);
  };

  // Handle errors during response
  const logError = (err) => {
    logger.error("Response error", {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      error: err.message,
      stack: err.stack,
    });

    // Clean up event listeners
    res.removeListener("finish", logResponse);
    res.removeListener("close", logResponse);
    res.removeListener("error", logError);
  };

  // Attach listeners to log when response completes
  res.on("finish", logResponse);
  res.on("close", logResponse);
  res.on("error", logError);

  // Add a requestId header to the response
  res.setHeader("X-Request-ID", requestId);

  // Continue to the next middleware
  next();
};

/**
 * Error logger middleware to enhance error logging with request context
 */
export const errorLogger = (err, req, res, next) => {
  logger.error("Unhandled error", {
    requestId: req.requestId || "unknown",
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip || req.socket.remoteAddress,
    error: err.message,
    stack: err.stack,
    status: err.status || 500,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  next(err);
};
