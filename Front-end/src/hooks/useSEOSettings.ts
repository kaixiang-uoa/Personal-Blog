import { useSetting } from '@/contexts/SettingsContext';
import { SocialLinks } from '@/types/models';
import { tryParseJSON } from '@/utils';

/**
 * Hook for getting SEO-related settings
 * @returns Object containing SEO settings with proper fallbacks
 */
export function useSEOSettings() {
  // Get social links from settings
  const socialLinksRaw = useSetting('about.social', '{}');

  // Parse social links with fallback
  const socialLinks: SocialLinks = tryParseJSON<SocialLinks>(socialLinksRaw, {});

  // Filter out empty or invalid social links
  const validSocialLinks = Object.entries(socialLinks).reduce((acc, [key, url]) => {
    if (url && typeof url === 'string' && url.trim() !== '') {
      acc[key as keyof SocialLinks] = url;
    }
    return acc;
  }, {} as SocialLinks);

  // Get other SEO-related settings
  const siteName = useSetting('general.siteName', 'Personal Blog');
  const siteDescription = useSetting(
    'general.siteDescription',
    'A trendy blog for web development enthusiasts'
  );
  const authorName = useSetting('general.authorName', 'Blog Author');

  return {
    socialLinks: validSocialLinks,
    siteName,
    siteDescription,
    authorName,
    hasSocialLinks: Object.keys(validSocialLinks).length > 0,
  };
}
