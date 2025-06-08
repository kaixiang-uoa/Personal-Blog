/**
 * Validation Service Module
 * 
 * Provides utilities for validating user input before sending to the server.
 * Helps prevent malicious input and ensures data consistency.
 */
import type { 
  ValidationError, 
  ValidationResult, 
  ValidationRules, 
  FieldValidation 
} from '@/types/validation.types';

/**
 * Common validation patterns
 */
export const ValidationPatterns = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
  ALPHA: /^[a-zA-Z]+$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC: /^[0-9]+$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
};

/**
 * Validation service object
 */
export const validationService = {
  /**
   * Validate a single field
   * @param fieldName Field name
   * @param value Field value
   * @param rules Validation rules
   * @returns Validation result
   */
  validateField(fieldName: string, value: unknown, rules: ValidationRules): ValidationError | null {
    // Check if required but empty
    if (rules.required && (value === undefined || value === null || value === '')) {
      return { field: fieldName, message: `${fieldName} is required` };
    }
    
    // Skip remaining validation if value is empty and not required
    if (value === undefined || value === null || value === '') {
      return null;
    }
    
    // String validations
    if (typeof value === 'string') {
      // Check min length
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        return { 
          field: fieldName, 
          message: `${fieldName} must be at least ${rules.minLength} characters` 
        };
      }
      
      // Check max length
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        return { 
          field: fieldName, 
          message: `${fieldName} must be at most ${rules.maxLength} characters` 
        };
      }
      
      // Check pattern
      if (rules.pattern && !rules.pattern.test(value)) {
        return { 
          field: fieldName, 
          message: `${fieldName} has an invalid format` 
        };
      }
      
      // Check email format
      if (rules.isEmail && !ValidationPatterns.EMAIL.test(value)) {
        return { 
          field: fieldName, 
          message: `${fieldName} must be a valid email address` 
        };
      }
      
      // Check URL format
      if (rules.isUrl && !ValidationPatterns.URL.test(value)) {
        return { 
          field: fieldName, 
          message: `${fieldName} must be a valid URL` 
        };
      }
      
      // Check numeric format
      if (rules.isNumeric && !ValidationPatterns.NUMERIC.test(value)) {
        return { 
          field: fieldName, 
          message: `${fieldName} must contain only numbers` 
        };
      }
    }
    
    // Number validations
    if (typeof value === 'number') {
      // Check min value
      if (rules.min !== undefined && value < rules.min) {
        return { 
          field: fieldName, 
          message: `${fieldName} must be at least ${rules.min}` 
        };
      }
      
      // Check max value
      if (rules.max !== undefined && value > rules.max) {
        return { 
          field: fieldName, 
          message: `${fieldName} must be at most ${rules.max}` 
        };
      }
    }
    
    // Custom validation
    if (rules.custom) {
      const customResult = rules.custom(value);
      if (customResult !== true) {
        const errorMessage = typeof customResult === 'string' 
          ? customResult 
          : `${fieldName} is invalid`;
        return { field: fieldName, message: errorMessage };
      }
    }
    
    return null;
  },
  
  /**
   * Validate an entire form against a schema
   * @param data Form data
   * @param schema Validation schema
   * @returns Validation result
   */
  validateForm<T extends Record<string, unknown>>(data: T, schema: FieldValidation): ValidationResult {
    const errors: ValidationError[] = [];
    
    // Validate each field in the schema
    for (const [fieldName, rules] of Object.entries(schema)) {
      const error = this.validateField(fieldName, data[fieldName], rules);
      if (error) {
        errors.push(error);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  /**
   * Get first error message for a specific field
   * @param errors List of validation errors
   * @param fieldName Field name to get error for
   * @returns Error message or undefined if no error
   */
  getFieldError(errors: ValidationError[], fieldName: string): string | undefined {
    const error = errors.find(err => err.field === fieldName);
    return error?.message;
  },
  
  /**
   * Generate validation schema for common entities
   */
  schemas: {
    /**
     * Login form validation schema
     */
    login: {
      email: {
        required: true,
        isEmail: true,
        maxLength: 100
      },
      password: {
        required: true,
        minLength: 6,
        maxLength: 100
      }
    },
    
    /**
     * Registration form validation schema
     */
    registration: {
      username: {
        required: true,
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z0-9_]+$/
      },
      email: {
        required: true,
        isEmail: true,
        maxLength: 100
      },
      password: {
        required: true,
        minLength: 8,
        maxLength: 100,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        custom: (value: unknown) => {
          if (typeof value !== 'string') return 'Password must be a string';
          if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
          if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
          if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
          if (!/[@$!%*?&]/.test(value)) return 'Password must contain at least one special character';
          return true;
        }
      },
      confirmPassword: {
        required: true
      }
    },
    
    /**
     * Post form validation schema
     */
    post: {
      title: {
        required: true,
        minLength: 3,
        maxLength: 200
      },
      content: {
        required: true,
        minLength: 10
      },
      slug: {
        required: false,
        pattern: /^[a-z0-9-]+$/,
        minLength: 3,
        maxLength: 100
      },
      excerpt: {
        required: false,
        maxLength: 500
      }
    },
    
    /**
     * Comment form validation schema
     */
    comment: {
      content: {
        required: true,
        minLength: 3,
        maxLength: 1000
      },
      authorName: {
        required: false,
        minLength: 2,
        maxLength: 100
      },
      authorEmail: {
        required: false,
        isEmail: true
      }
    }
  }
}; 