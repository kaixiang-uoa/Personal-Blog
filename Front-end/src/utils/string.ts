/**
 * get string value from URL query parameter
 * @param param query parameter value (string, string array, or null/undefined)
 * @param defaultValue default value
 * @returns processed string value
 */
export function getStringParam(param: string | string[] | null | undefined, defaultValue = ''): string {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] || defaultValue : param;
}

/**
 * get string array from URL query parameter
 * @param param query parameter value (string, string array, or null/undefined)
 * @returns processed string array
 */
export function getArrayParam(param: string | string[] | null | undefined): string[] {
  if (!param) return [];
  const str = Array.isArray(param) ? param[0] : param;
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

export type SortOrder = 'publishedAt-desc' | 'publishedAt-asc' | 'updatedAt-desc' | 'updatedAt-asc' | 'latest' | 'oldest' | 'popular';

/**
 * Safely validates if a value is a valid SortOrder
 * @param value The value to validate
 * @param defaultValue The default value to return if validation fails
 * @returns A valid SortOrder value
 */
export function validateSortOrder(
  value: string | null | undefined, 
  defaultValue: SortOrder = 'latest'
): SortOrder {
  if (!value) return defaultValue;
  
  // Check if value is one of the allowed sort orders
  const validSortOrders = ['publishedAt-desc', 'publishedAt-asc', 'updatedAt-desc', 'updatedAt-asc', 'latest', 'oldest', 'popular'] as const;
  return validSortOrders.includes(value as typeof validSortOrders[number]) 
    ? (value as SortOrder) 
    : defaultValue;
}

/**
 * Generic function to validate that a string value is one of a set of allowed values
 * @param value The value to validate
 * @param allowedValues Array of allowed values
 * @param defaultValue Default value to return if validation fails
 * @returns A validated value from the allowed set
 */
export function validateEnum<T extends string>(
  value: string | null | undefined,
  allowedValues: readonly T[],
  defaultValue: T
): T {
  if (!value) return defaultValue;
  return allowedValues.includes(value as T) 
    ? (value as T) 
    : defaultValue;
} 