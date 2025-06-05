/**
 * check if URL is valid
 * @param url the URL string to validate
 * @returns true if URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return false;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return true;
  }
  
  return false;
} 