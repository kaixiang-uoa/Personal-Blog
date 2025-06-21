import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

// Import routers
import postRouter from "./routers/postRouters.js";
import userRouter from "./routers/userRouters.js";
import categoryRouter from "./routers/categoryRouters.js";
import tagRouter from "./routers/tagRouters.js";
import commentRouter from "./routers/commentRouters.js";
import mediaRouter from "./routers/mediaRouters.js";
import settingRouter from "./routers/settingRouters.js";
import authRouter from "./routers/authRouters.js";
import i18nRouters from "./routers/i18nRouters.js";
import contactRouter from "./routers/contactRouters.js";
import healthRouter from './routers/healthRouters.js';
import keepAliveRouter from "./routers/keepAliveRouters.js";

// Import middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { i18nMiddleware } from "./middleware/i18nMiddleware.js";
import {
  requestLogger,
  errorLogger,
} from "./middleware/requestLoggerMiddleware.js";
import {
  enableQueryMonitoring,
  getQueryStats,
} from "./middleware/queryMonitorMiddleware.js";
// import { csrfProtection } from "./middleware/csrfMiddleware.js";
import {
  configureSecureHeaders,
  apiLimiter,
  sensitiveApiLimiter,
  addRequestId,
  sanitizeInputMiddleware,
  setHSTS,
} from "./middleware/securityMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Request-ID",
    "X-CSRF-Token",
  ],
  credentials: true,
  exposedHeaders: [
    "Content-Type",
    "Content-Length",
    "Content-Disposition",
    "X-Request-ID",
    "X-CSRF-Token",
  ],
};

const app = express();

// support cloud deployment proxy, correctly identify X-Forwarded-For
app.set('trust proxy', 1); 

// Add request ID before all other middleware
app.use(addRequestId());

// Enable database query monitoring in development mode
if (process.env.NODE_ENV !== "production") {
  app.use(
    enableQueryMonitoring({
      slowQueryThreshold: 100, // ms
      logAllQueries: process.env.LOG_ALL_QUERIES === "true",
    }),
  );
}

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Apply security middleware
app.use(configureSecureHeaders());
app.use(setHSTS());
app.use(sanitizeInputMiddleware());

// Apply CSRF protection middleware (after body parser and before routes)
// app.use(
//   csrfProtection({
//     enforceInDevelopment: process.env.NODE_ENV === "production", // Only enforce in production
//   }),
// );

// Apply request logging and tracking middleware
app.use(requestLogger);

// Apply internationalization middleware
app.use(i18nMiddleware);

// Apply global rate limiting
app.use(apiLimiter());

app.use(express.static(path.join(__dirname, "..", "public")));

// API prefix
const API_PREFIX = "/api/v1";

// Add Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
  }),
);

// Register routes
app.use(`${API_PREFIX}/posts`, postRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/categories`, categoryRouter);
app.use(`${API_PREFIX}/tags`, tagRouter);
app.use(`${API_PREFIX}/comments`, commentRouter);
app.use(`${API_PREFIX}/media`, mediaRouter);
app.use(`${API_PREFIX}/settings`, settingRouter);

// Apply sensitive API rate limiting for authentication routes
app.use(`${API_PREFIX}/auth`, sensitiveApiLimiter(), authRouter);

app.use(`${API_PREFIX}/i18n`, i18nRouters);
app.use(`${API_PREFIX}/contact`, contactRouter);
app.use(`${API_PREFIX}/health`, healthRouter);
app.use(`${API_PREFIX}/keep-alive`, keepAliveRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Blog API server is running");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});

// Database query stats endpoint (development only)
if (process.env.NODE_ENV !== "production") {
  app.get("/db-stats", getQueryStats);
}

// 404 handler
app.use(notFound);

// Enhanced error logging middleware
app.use(errorLogger);

// Error handler
app.use(errorHandler);

export default app;
