import Link from 'next/link';
import { Article } from '@/types'; 

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // use optional chaining and default values to ensure data integrity
  const slug = article?.slug || '';
  const title = article?.title || 'Untitled Article';
  const featuredImage = article?.featuredImage || '/images/default-image.jpg';
  const authorName = article?.author 
    ? (article.author.displayName || article.author.username) 
    : 'Unknown Author';

  return (
    <div className="flex flex-col gap-3 pb-4 h-full">
      <div 
        className="w-full bg-center bg-no-repeat aspect-[16/10] bg-cover rounded-lg overflow-hidden relative"
      >
        {/* 
          keep background image style to avoid possible layout issues, and use Next Image component when supported
          - this way keeps the original design while improving image loading performance 
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
      <div className="flex-1 flex flex-col">
        <p className="text-[#111418] text-base font-medium leading-normal mb-1">
          <Link href={`/article/${slug}`} className="hover:text-cyan-600 hover:underline line-clamp-2">{title}</Link>
        </p>
        <p className="text-[#60748a] text-sm font-normal leading-normal mt-auto">
          By {authorName}
        </p>
      </div>
    </div>
  );
}
