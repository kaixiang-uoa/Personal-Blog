/**
 * safely try to parse JSON string
 * @param jsonString the JSON string to parse
 * @param defaultValue the default value to return if parsing fails
 * @returns parsed result or default value
 */
export function tryParseJSON<T>(jsonString: string | undefined | null, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return defaultValue;
  }
}
