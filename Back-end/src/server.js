import dotenv from 'dotenv';

// Load environment variables FIRST - before any other imports
dotenv.config();

import connectDB from './config/db.js';
import app from './app.js';
import { logger } from './utils/logger.js';
import { validateSettings } from './scripts/initSettings.js';
import { validateEnvironmentOrExit } from './utils/envValidator.js';

// Async function to start the server
const startServer = async () => {
  try {
    // validate necessary environment variables
    logger.info('Starting server...');
    validateEnvironmentOrExit();
    
    // Connect to database
    await connectDB();
    
    // Validate settings, ensure all default settings exist (silent mode)
    await validateSettings(true);
    
    // get expected port
    let PORT = parseInt(process.env.PORT || '3002', 10);
    let maxRetries = 5;
    let retries = 0;
    
    const startAppWithRetry = () => {
      // create server but not listen immediately
      const server = app.listen(PORT)
        .on('listening', () => {
          logger.info(`Server is running on port ${PORT}`);
          console.log(`
====================================
🚀 Server is running!
📡 Local: http://localhost:${PORT}
✅ Security enhancements active
====================================
          `);
        })
        .on('error', (err) => {
          if (err.code === 'EADDRINUSE' && retries < maxRetries) {
            PORT++;
            retries++;
            logger.warn(`Port ${PORT-1} is already in use, trying port ${PORT}...`);
            // close current server and retry
            server.close();
            startAppWithRetry();
          } else {
            logger.error(`Failed to start server: ${err.message}`);
            process.exit(1);
          }
        });
    };
    
    // start trying to start server
    console.log(`Trying to start server, initial port: ${PORT}`);
    startAppWithRetry();
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error.message}`, { stack: error.stack });
  // give the process a little time to record the error and then exit
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled promise rejection', { 
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : 'No stack trace available'
  });
  // don't exit immediately, just record, avoid interrupting other normal operations
});

// Start the server
startServer(); 