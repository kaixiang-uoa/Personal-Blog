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