/**
 * Image SEO utility functions
 * Provides tools for optimizing images for search engines
 */

/**
 * Generate optimized image filename for SEO
 * @param originalName - Original image filename
 * @param width - Image width
 * @param height - Image height
 * @param quality - Image quality (1-100)
 * @returns Optimized filename
 */
export function generateSeoImageName(
  originalName: string,
  width?: number,
  height?: number,
  quality = 85
): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';

  let seoName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (width && height) {
    seoName += `-${width}x${height}`;
  }

  if (quality !== 85) {
    seoName += `-q${quality}`;
  }

  return `${seoName}.${ext}`;
}

/**
 * Generate responsive image srcset for different screen sizes
 * @param baseUrl - Base image URL
 * @param widths - Array of image widths
 * @returns Responsive srcset string
 */
export function generateResponsiveSrcset(
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280]
): string {
  return widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ');
}

/**
 * Generate picture element sources for different formats
 * @param imageUrl - Base image URL
 * @param formats - Array of image formats
 * @returns Array of source objects
 */
export function generatePictureSources(
  imageUrl: string,
  formats: string[] = ['webp', 'avif', 'jpg']
): Array<{ srcset: string; type: string }> {
  const baseUrl = imageUrl.split('?')[0];

  return formats.map(format => ({
    srcset: `${baseUrl}.${format}`,
    type: `image/${format}`,
  }));
}

/**
 * Generate structured data for images
 * @param imageUrl - Image URL
 * @param altText - Alt text
 * @param caption - Image caption
 * @param width - Image width
 * @param height - Image height
 * @returns JSON-LD structured data
 */
interface ImageStructuredData {
  '@context': string;
  '@type': string;
  contentUrl: string;
  name: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function generateImageStructuredData(
  imageUrl: string,
  altText: string,
  caption?: string,
  width?: number,
  height?: number
): ImageStructuredData {
  const structuredData: ImageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    name: altText,
  };

  if (caption) {
    structuredData.caption = caption;
  }

  if (width && height) {
    structuredData.width = width;
    structuredData.height = height;
  }

  return structuredData;
}

/**
 * Validate image dimensions for optimal SEO
 * @param width - Image width
 * @param height - Image height
 * @param aspectRatio - Expected aspect ratio
 * @returns Validation result
 */
export function validateImageDimensions(
  width: number,
  height: number,
  aspectRatio?: number
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check minimum dimensions
  if (width < 200) {
    issues.push('Image width should be at least 200px for good SEO');
  }

  if (height < 200) {
    issues.push('Image height should be at least 200px for good SEO');
  }

  // Check aspect ratio if provided
  if (aspectRatio) {
    const actualRatio = width / height;
    const tolerance = 0.1;

    if (Math.abs(actualRatio - aspectRatio) > tolerance) {
      issues.push(`Image aspect ratio should be close to ${aspectRatio}:1`);
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Generate image optimization recommendations
 * @param imageUrl - Image URL
 * @param currentSize - Current file size in bytes
 * @param targetSize - Target file size in bytes
 * @returns Optimization recommendations
 */
export function generateImageOptimizationRecommendations(
  imageUrl: string,
  currentSize: number,
  targetSize: number = 200 * 1024 // 200KB default
): string[] {
  const recommendations: string[] = [];
  const currentSizeKB = currentSize / 1024;
  const targetSizeKB = targetSize / 1024;

  if (currentSize > targetSize) {
    recommendations.push(
      `Reduce image size from ${currentSizeKB.toFixed(1)}KB to under ${targetSizeKB}KB`
    );
  }

  // Check file extension for optimization opportunities
  const extension = imageUrl.split('.').pop()?.toLowerCase();

  if (extension === 'png' && !imageUrl.includes('transparent')) {
    recommendations.push('Consider converting PNG to JPEG for better compression');
  }

  if (extension === 'jpg' || extension === 'jpeg') {
    recommendations.push('Consider using WebP format for better compression');
  }

  if (!imageUrl.includes('w=') && !imageUrl.includes('width=')) {
    recommendations.push('Use responsive images with width parameters');
  }

  return recommendations;
}

/**
 * Generate image alt text based on context
 * @param context - Image context (article, banner, avatar, etc.)
 * @param title - Related title or description
 * @param author - Author name if applicable
 * @returns SEO-optimized alt text
 */
export function generateContextualAltText(
  context: string,
  title?: string,
  author?: string
): string {
  switch (context.toLowerCase()) {
    case 'article':
      return title ? `Featured image for article: ${title}` : 'Article featured image';

    case 'banner':
      return title ? `Banner image: ${title}` : 'Page banner image';

    case 'avatar':
      return author ? `Profile picture of ${author}` : 'User profile picture';

    case 'logo':
      return 'Website logo';

    case 'thumbnail':
      return title ? `Thumbnail for: ${title}` : 'Image thumbnail';

    case 'gallery':
      return title ? `Gallery image: ${title}` : 'Gallery image';

    default:
      return title || 'Image';
  }
}
