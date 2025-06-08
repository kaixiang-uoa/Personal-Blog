/**
 * Query Monitor Middleware
 * 
 * Monitors and logs database queries for performance optimization
 */

import mongoose from 'mongoose';
import logger from '../config/logger.js';

const SLOW_QUERY_THRESHOLD_MS = 100; // Queries taking longer than 100ms are considered slow

/**
 * Enable query monitoring for all mongoose queries
 * 
 * @param {Object} options - Configuration options
 * @returns {Function} Middleware function
 */
export const enableQueryMonitoring = (options = {}) => {
  const {
    slowQueryThreshold = SLOW_QUERY_THRESHOLD_MS,
    logAllQueries = false,
  } = options;
  
  // Track query statistics
  const queryStats = {
    totalQueries: 0,
    slowQueries: 0,
    totalQueryTime: 0,
    slowestQueryTime: 0,
    slowestQuery: null
  };
  
  // Set up Mongoose hooks to monitor queries
  mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
    // Skip internal MongoDB calls
    if (collectionName.startsWith('system.') || methodName === 'createIndex') {
      return;
    }
    
    const startTime = Date.now();
    const queryId = Math.random().toString(36).substring(2, 10);
    
    // Log query start if requested
    if (logAllQueries) {
      logger.debug(`Query ${queryId} started: ${collectionName}.${methodName}`, {
        collection: collectionName,
        operation: methodName,
        args: methodArgs,
      });
    }
    
    // Original method reference
    const origMethod = mongoose.Collection.prototype[methodName];
    
    // Replace the method temporarily to measure its execution time
    mongoose.Collection.prototype[methodName] = function(...args) {
      const result = origMethod.apply(this, args);
      
      // Handle promise completion to measure time
      if (result && typeof result.then === 'function') {
        result.then(() => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Update statistics
          queryStats.totalQueries++;
          queryStats.totalQueryTime += duration;
          
          // Check if this is a slow query
          if (duration > slowQueryThreshold) {
            queryStats.slowQueries++;
            
            // Log slow query
            logger.warn(`Slow query detected (${duration}ms > ${slowQueryThreshold}ms)`, {
              queryId,
              collection: collectionName,
              operation: methodName,
              duration: `${duration}ms`,
              args: methodArgs.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)),
            });
            
            // Track slowest query
            if (duration > queryStats.slowestQueryTime) {
              queryStats.slowestQueryTime = duration;
              queryStats.slowestQuery = {
                collection: collectionName,
                operation: methodName,
                duration: `${duration}ms`,
                args: methodArgs
              };
            }
          } else if (logAllQueries) {
            // Log successful fast query if requested
            logger.debug(`Query ${queryId} completed (${duration}ms)`, {
              collection: collectionName,
              operation: methodName,
              duration: `${duration}ms`,
            });
          }
        })
        .catch(err => {
          // Log query errors
          logger.error(`Query ${queryId} error: ${err.message}`, {
            collection: collectionName,
            operation: methodName,
            error: err.message,
            stack: err.stack,
          });
        });
      }
      
      // Restore original method
      mongoose.Collection.prototype[methodName] = origMethod;
      
      return result;
    };
  });
  
  // Return middleware function (mostly for reporting)
  return (req, res, next) => {
    // Attach query stats to the request for potential use
    req.dbQueryStats = queryStats;
    next();
  };
};

/**
 * Get query statistics endpoint
 * 
 * @returns {Function} Express route handler
 */
export const getQueryStats = (req, res) => {
  const stats = req.dbQueryStats || {
    totalQueries: 0,
    slowQueries: 0,
    totalQueryTime: 0,
    slowestQueryTime: 0,
    slowestQuery: null
  };
  
  // Calculate average query time
  const avgQueryTime = stats.totalQueries > 0 
    ? Math.round(stats.totalQueryTime / stats.totalQueries) 
    : 0;
  
  res.status(200).json({
    success: true,
    queryStats: {
      ...stats,
      avgQueryTime: `${avgQueryTime}ms`,
      slowestQueryTime: `${stats.slowestQueryTime}ms`,
    }
  });
}; 