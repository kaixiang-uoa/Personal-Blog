import winston from "winston";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Custom log levels to provide more granularity
const logLevels = {
  fatal: 0, // Application is about to abort
  error: 1, // Serious issues, needs immediate attention
  warn: 2, // Issues that should be looked at soon
  info: 3, // Normal operational messages
  http: 4, // HTTP request logging
  debug: 5, // Detailed debugging information
  trace: 6, // Very detailed tracing information
};

// Define custom colors for log levels
const logColors = {
  fatal: "red blackBG",
  error: "red",
  warn: "yellow",
  info: "green",
  http: "cyan",
  debug: "blue",
  trace: "magenta",
};

// Add custom colors to winston
winston.addColors(logColors);

// Custom formatter to improve log readability in console
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp, requestId, ...meta }) => {
    // Format requestId if available
    const reqId = requestId ? `[${requestId}] ` : "";

    // Handle meta data
    let metaStr = "";
    if (Object.keys(meta).length > 0) {
      // Remove stack trace from console output unless in debug mode
      const metaCopy = { ...meta };
      if (level !== "debug" && level !== "trace" && metaCopy.stack) {
        delete metaCopy.stack;
      }

      if (Object.keys(metaCopy).length > 0) {
        metaStr = "\n" + JSON.stringify(metaCopy, null, 2);
      }
    }

    return `${timestamp} [${level}] ${reqId}${message}${metaStr}`;
  })
);

// JSON format for file output (better for log processing tools)
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  levels: logLevels,
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === "production" ? "info" : "debug"),
  format: fileFormat,
  defaultMeta: { service: "personal-blog-api" },
  transports: [
    // Write all logs to combined.log
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      tailable: true,
    }),
    // Write error logs to error.log
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      tailable: true,
    }),
    // Write HTTP logs to access.log
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/access.log"),
      level: "http",
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      tailable: true,
    }),
  ],
  // Exit on error (can be caught by process.on('uncaughtException'))
  exitOnError: false,
});

// If not production environment, also output to console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

// Add stream support for Morgan integration if needed
logger.stream = {
  write: message => {
    logger.http(message.trim());
  },
};

// Export a wrapper with convenience methods
export default logger;
