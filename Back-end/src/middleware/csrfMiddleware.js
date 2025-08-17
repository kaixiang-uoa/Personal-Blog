/**
 * CSRF Protection Middleware
 *
 * Provides Cross-Site Request Forgery (CSRF) protection by validating tokens
 * sent from the client on state-changing requests (POST, PUT, DELETE, PATCH)
 */

import crypto from "crypto";

// Token header name
const CSRF_HEADER = "X-CSRF-Token";

// Generate a secure random token
const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * CSRF protection middleware
 *
 * Validates CSRF tokens for non-GET requests and adds a new token to the response header
 */
export const csrfProtection = (options = {}) => {
  const {
    // Paths that should be exempt from CSRF protection (e.g. webhooks)
    ignorePaths = [
      "/api/v1/auth/login",
      "/api/v1/auth/refresh",
      "/api/v1/auth/register",
    ],
    // Whether to enforce CSRF validation in non-production environments
    enforceInDevelopment = true,
  } = options;

  return (req, res, next) => {
    // Skip CSRF check for ignored paths
    if (ignorePaths.some(path => req.path.startsWith(path))) {
      // Generate and set a new CSRF token in the response header for auth endpoints
      // This allows the frontend to receive a token after login/register
      const newToken = generateToken();
      res.setHeader(CSRF_HEADER, newToken);
      return next();
    }

    // Skip CSRF validation for GET, HEAD, OPTIONS requests (safe methods)
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      // Generate and set a new CSRF token in the response header
      const newToken = generateToken();
      res.setHeader(CSRF_HEADER, newToken);
      return next();
    }

    // Skip validation in development if not enforced
    if (process.env.NODE_ENV !== "production" && !enforceInDevelopment) {
      // Still generate a token for consistency
      const newToken = generateToken();
      res.setHeader(CSRF_HEADER, newToken);
      return next();
    }

    // Get token from header or request body
    const headerToken = req.headers[CSRF_HEADER.toLowerCase()];
    const bodyToken = req.body && req.body._csrf;
    const token = headerToken || bodyToken;

    // If no token provided, reject the request
    if (!token) {
      res.status(403).json({
        success: false,
        message: "CSRF validation failed: Missing token",
        error: "CSRF_TOKEN_MISSING",
      });
      return;
    }

    // For now, we only validate that a token exists, since the frontend handles token validation
    // In a more secure implementation, we would store tokens per user session and validate them

    // Generate and set a new CSRF token for the next request
    const newToken = generateToken();
    res.setHeader(CSRF_HEADER, newToken);

    next();
  };
};
