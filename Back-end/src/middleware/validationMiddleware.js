/**
 * Validation middleware
 * Provides unified validation error handling for all routes
 */
import { validationResult } from 'express-validator';

/**
 * Validation error handler
 * Standardizes validation error responses across the API
 *
 * This middleware runs all provided express-validator validations.
 * Conditional validation (e.g., only require title if status is 'published')
 * should be handled in the validation rules, not here.
 *
 * @returns {Function} Express middleware function
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    for (let validation of validations) {
      await validation.run(req);
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format validation errors
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }));

    // Return standardized error response
    return res.status(400).json({
      success: false,
      errors: formattedErrors,
      message: 'Validation failed',
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
