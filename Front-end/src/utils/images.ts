import { isValidUrl } from './isValidUrl';

/**
 * get valid image url, if input is invalid, use default url
 * @param url image url to validate
 * @param defaultUrl default image url
 * @returns valid image url
 */
export function getValidImageUrl(url: string | null | undefined, defaultUrl: string): string {
  if (!url) return defaultUrl;
  return isValidUrl(url) ? url : defaultUrl;
}

/**
 * get valid image url based on device type
 * @param desktopUrl desktop image url
 * @param mobileUrl mobile image url
 * @param defaultUrl default image url
 * @returns object containing valid image urls for desktop and mobile
 */
export function getResponsiveImageUrls(
  desktopUrl: string | null | undefined,
  mobileUrl: string | null | undefined,
  defaultUrl: string
): { desktop: string; mobile: string } {
  return {
    desktop: getValidImageUrl(desktopUrl, defaultUrl),
    mobile: getValidImageUrl(mobileUrl || desktopUrl, defaultUrl),
  };
}
