import Link from 'next/link';
import { Article } from '@/types';
import { OptimizedImage } from '@/components/common';
import { generateAltText } from '@/components/common/OptimizedImage';

/**
 * Props interface for the ArticleCard component
 * @interface ArticleCardProps
 * @property {Article} article - The article data to be displayed
 */
interface ArticleCardProps {
  article: Article;
}

/**
 * ArticleCard Component
 *
 * A card component that displays an article's featured image, title, and author.
 * Implements responsive design and hover effects for better user interaction.
 *
 * @component
 * @example
 * ```tsx
 * <ArticleCard article={articleData} />
 * ```
 *
 * @param {ArticleCardProps} props - The component props
 * @returns {JSX.Element} A card displaying article information with hover effects
 */
export default function ArticleCard({ article }: ArticleCardProps) {
  // Extract and validate article data with fallback values
  const slug = article?.slug || '';
  const title = article?.title || 'Untitled Article';
  const featuredImage = article?.featuredImage || '/images/default-image.jpg';
  const authorName = article?.author
    ? article.author.username || article.author.displayName
    : 'Unknown Author';

  return (
    <div className="flex flex-col gap-3 pb-4 h-full">
      {/* Article featured image container with hover effect */}
      <div className="w-full aspect-[16/10] rounded-lg overflow-hidden relative group">
        <OptimizedImage
          src={featuredImage}
          alt={generateAltText('article', title)}
          width={400}
          height={250}
          className="w-full h-full transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
        />
        <Link href={`/article/${slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">{title}</span>
        </Link>
      </div>
      {/* Article title and author information */}
      <div className="flex-1 flex flex-col">
        <p className="text-foreground text-base font-medium leading-normal mb-1">
          <Link
            href={`/article/${slug}`}
            className="hover:text-cyan-600 hover:underline line-clamp-2"
          >
            {title}
          </Link>
        </p>
        <p className="text-muted-foreground text-sm font-normal leading-normal mt-auto">
          By {authorName}
        </p>
      </div>
    </div>
  );
}
