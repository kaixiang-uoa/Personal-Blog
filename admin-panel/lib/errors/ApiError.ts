/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * Check if error is a validation error
   */
  isValidationError(): boolean {
    return this.status === 400 || this.code === "VALIDATION_ERROR";
  }

  /**
   * Check if error is an authentication error
   */
  isAuthError(): boolean {
    return this.status === 401 || this.code === "AUTH_ERROR";
  }

  /**
   * Check if error is a not found error
   */
  isNotFoundError(): boolean {
    return this.status === 404 || this.code === "NOT_FOUND";
  }

  /**
   * Check if error is a server error
   */
  isServerError(): boolean {
    return this.status >= 500 || this.code === "SERVER_ERROR";
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    // Handle specific validation errors
    if (this.isValidationError() && this.details) {
      const validationMessage = this.extractValidationMessage();
      if (validationMessage) return validationMessage;
    }

    // Default messages based on status code
    const statusMessages: Record<number, string> = {
      400: "Invalid request data. Please check your input.",
      401: "Authentication required. Please log in again.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      409: "This resource already exists.",
      422: "The data provided is invalid.",
      429: "Too many requests. Please try again later.",
      500: "Server error. Please try again later.",
      502: "Service temporarily unavailable.",
      503: "Service temporarily unavailable.",
    };

    return (
      statusMessages[this.status] ||
      this.message ||
      "An unexpected error occurred."
    );
  }

  /**
   * Extract meaningful validation message from error details
   */
  private extractValidationMessage(): string | null {
    if (!this.details) return null;

    // Handle MongoDB validation errors
    if (this.message.includes("validation failed")) {
      if (this.message.includes("name: Path `name` is required")) {
        return "Name is required. Please provide either English or Chinese name.";
      }
      if (this.message.includes("slug") && this.message.includes("duplicate")) {
        return "This URL slug is already taken. Please choose a different one.";
      }
    }

    // Handle duplicate key errors
    if (
      this.message.includes("duplicate key error") ||
      this.message.includes("E11000")
    ) {
      return "This item already exists. Please choose a different name or slug.";
    }

    return null;
  }
}
