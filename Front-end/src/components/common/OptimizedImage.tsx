'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage Component
 *
 * A Next.js Image component wrapper that provides SEO-optimized image rendering
 * with lazy loading, proper alt attributes, and responsive sizing.
 *
 * @component
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/article.jpg"
 *   alt="Article featured image"
 *   width={800}
 *   height={400}
 *   priority={true}
 * />
 * ```
 *
 * @returns {JSX.Element} The optimized image component
 */
export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate optimized alt text if not provided
  const optimizedAlt = alt || 'Image';

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Fallback for error state
  if (hasError) {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width: width, height: height }}
      >
        <div className="text-muted-foreground text-center">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={optimizedAlt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
        }}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width: width, height: height }}
        />
      )}
    </div>
  );
}

/**
 * Generate optimized image filename for SEO
 * @param originalName - Original image filename
 * @param width - Image width
 * @param height - Image height
 * @returns Optimized filename
 */
export function generateOptimizedImageName(
  originalName: string,
  width?: number,
  height?: number
): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const ext = originalName.split('.').pop() || 'jpg';

  if (width && height) {
    return `${nameWithoutExt}-${width}x${height}.${ext}`;
  }

  return `${nameWithoutExt}-optimized.${ext}`;
}

/**
 * Generate responsive image sizes for different screen sizes
 * @param baseWidth - Base image width
 * @returns Responsive sizes string
 */
export function generateResponsiveSizes(baseWidth: number): string {
  return `(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, ${baseWidth}px`;
}

/**
 * Generate alt text for different image types
 * @param type - Image type (article, avatar, banner, etc.)
 * @param context - Context information
 * @returns SEO-optimized alt text
 */
export function generateAltText(type: string, context?: string): string {
  switch (type) {
    case 'article':
      return context ? `Featured image for article: ${context}` : 'Article featured image';
    case 'avatar':
      return context ? `Profile picture of ${context}` : 'User profile picture';
    case 'banner':
      return context ? `Banner image: ${context}` : 'Page banner image';
    case 'logo':
      return 'Website logo';
    default:
      return context || 'Image';
  }
}
