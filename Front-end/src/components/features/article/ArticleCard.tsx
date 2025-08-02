import Link from 'next/link';
import { Article } from '@/types'; 

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
    ? (article.author.displayName || article.author.username) 
    : 'Unknown Author';

  return (
    <div className="flex flex-col gap-3 pb-4 h-full">
      {/* Article featured image container with hover effect */}
      <div 
        className="w-full bg-center bg-no-repeat aspect-[16/10] bg-cover rounded-lg overflow-hidden relative"
      >
        {/* 
          Using background image for better layout stability and performance
          - Maintains original design while optimizing image loading
          - Prevents layout shifts during image loading
        */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${featuredImage}')`
          }}
        />
        <Link href={`/article/${slug}`} className="block w-full h-full transition-transform hover:scale-105 relative z-10">
          <span className="sr-only">{title}</span>
        </Link>
      </div>
      {/* Article title and author information */}
      <div className="flex-1 flex flex-col">
        <p className="text-foreground text-base font-medium leading-normal mb-1">
          <Link href={`/article/${slug}`} className="hover:text-cyan-600 hover:underline line-clamp-2">{title}</Link>
        </p>
        <p className="text-muted-foreground text-sm font-normal leading-normal mt-auto">
          By {authorName}
        </p>
      </div>
    </div>
  );
}
