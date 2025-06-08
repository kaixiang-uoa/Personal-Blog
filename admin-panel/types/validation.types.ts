/**
 * Validation error object
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation result object
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validation rules object
 */
export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  isEmail?: boolean;
  isUrl?: boolean;
  isNumeric?: boolean;
  min?: number;
  max?: number;
  custom?: (value: unknown) => boolean | string;
}

/**
 * Field validation configuration
 */
export interface FieldValidation {
  [fieldName: string]: ValidationRules;
} 