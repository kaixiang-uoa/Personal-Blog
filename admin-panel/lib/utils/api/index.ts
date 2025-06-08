/**
 * API-related utility functions
 */

/**
 * Convert object to query string
 * @param params - Object to convert
 * @returns Query string
 */
export function objectToQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item))
      } else {
        searchParams.append(key, String(value))
      }
    }
  })

  return searchParams.toString()
}

/**
 * Build URL with query parameters
 * @param baseUrl - Base URL
 * @param params - Query parameters
 * @returns URL with query string
 */
export function buildUrl(baseUrl: string, params?: Record<string, any>): string {
  if (!params) return baseUrl
  
  const queryString = objectToQueryString(params)
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Handle API error response
 * @param error - Error object
 * @returns Formatted error message
 */
export function handleApiError(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error.message) {
    return error.message
  }
  
  return "An unexpected error occurred"
}

/**
 * Check if response is successful
 * @param status - HTTP status code
 * @returns Boolean indicating if status is successful
 */
export function isSuccessfulResponse(status: number): boolean {
  return status >= 200 && status < 300
} 