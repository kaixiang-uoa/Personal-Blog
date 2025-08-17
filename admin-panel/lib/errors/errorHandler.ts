import { AxiosError } from "axios";

import { ApiError } from "./ApiError";

/**
 * Centralized error handler for API requests
 */
export const errorHandler = {
  /**
   * Convert any error to ApiError
   */
  handle(error: unknown): ApiError {
    // If it's already an ApiError, return as is
    if (error instanceof ApiError) {
      return error;
    }

    // Handle Axios errors (most common)
    if (this.isAxiosError(error)) {
      return this.handleAxiosError(error);
    }

    // Handle network errors
    if (this.isNetworkError(error)) {
      return new ApiError(
        0,
        "NETWORK_ERROR",
        "Network connection failed. Please check your internet connection."
      );
    }

    // Handle generic errors
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return new ApiError(500, "UNKNOWN_ERROR", errorMessage, error);
  },

  /**
   * Handle Axios errors specifically
   */
  handleAxiosError(error: AxiosError): ApiError {
    const response = error.response;

    if (!response) {
      return new ApiError(0, "NETWORK_ERROR", "Network connection failed.");
    }

    const { status, data } = response;
    const errorData = data as Record<string, unknown>;

    // Extract error information
    const message =
      (errorData?.message as string) ||
      (errorData?.error as string) ||
      error.message ||
      "Request failed";
    const code = (errorData?.code as string) || `HTTP_${status}`;
    const details = errorData?.details || errorData;

    return new ApiError(status, code, message, details);
  },

  /**
   * Get user-friendly error message
   */
  getUserMessage(error: ApiError | unknown): string {
    if (error instanceof ApiError) {
      return error.getUserMessage();
    }

    // Fallback for non-ApiError instances
    const apiError = this.handle(error);
    return apiError.getUserMessage();
  },

  /**
   * Check if error is an Axios error
   */
  isAxiosError(error: unknown): error is AxiosError {
    return (
      error &&
      typeof error === "object" &&
      "isAxiosError" in error &&
      error.isAxiosError === true
    );
  },

  /**
   * Check if error is a network error
   */
  isNetworkError(error: unknown): boolean {
    if (!error || typeof error !== "object") return false;
    const err = error as Record<string, unknown>;
    return (
      err.code === "NETWORK_ERROR" ||
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      (typeof err.message === "string" && err.message.includes("Network Error"))
    );
  },

  /**
   * Log error for debugging (development only)
   */
  logError(error: ApiError | unknown, context?: string): void {
    if (process.env.NODE_ENV === "development") {
      const prefix = context ? `[${context}]` : "[API Error]";
      const err = error as Record<string, unknown>;
      console.error(prefix, {
        message: err.message,
        status: err.status,
        code: err.code,
        details: err.details,
        stack: err.stack,
      });
    }
  },

  /**
   * Create validation error for missing required fields
   */
  createValidationError(field: string, message?: string): ApiError {
    return new ApiError(
      400,
      "VALIDATION_ERROR",
      message || `${field} is required`,
      { field, type: "required" }
    );
  },

  /**
   * Create duplicate error
   */
  createDuplicateError(resource: string, field: string): ApiError {
    return new ApiError(
      409,
      "DUPLICATE_ERROR",
      `${resource} with this ${field} already exists`,
      { resource, field, type: "duplicate" }
    );
  },
};
