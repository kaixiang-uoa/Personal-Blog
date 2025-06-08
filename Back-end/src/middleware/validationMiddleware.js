/**
 * Validation middleware
 * Provides unified validation error handling for all routes
 */
import { validationResult } from 'express-validator';

/**
 * Validation error handler
 * Standardizes validation error responses across the API
 * 
 * @returns {Function} Express middleware function
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format validation errors
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    // Return standardized error response
    return res.status(400).json({
      success: false,
      errors: formattedErrors,
      message: 'Validation failed'
    });
  };
};

/**
 * Creates a validation chain for a specific route
 * 
 * @param {Array} validations - Array of express-validator validations
 * @returns {Function} Express middleware
 */
export const validateRequest = (validations) => {
  return validate(validations);
}; 