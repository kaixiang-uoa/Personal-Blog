import Link from 'next/link';
import { Article } from '@/types'; 

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="flex flex-col gap-3 pb-4 h-full">
      <div 
        className="w-full bg-center bg-no-repeat aspect-[16/10] bg-cover rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url('${article.featuredImage || '/images/default-image.jpg'}')`
        }}
      >
        <Link href={`/article/${article.slug}`} className="block w-full h-full transition-transform hover:scale-105">
          <span className="sr-only">{article.title}</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-[#111418] text-base font-medium leading-normal mb-1">
          <Link href={`/article/${article.slug}`} className="hover:text-cyan-600 hover:underline line-clamp-2">{article.title}</Link>
        </p>
        <p className="text-[#60748a] text-sm font-normal leading-normal mt-auto">
          By {article.author ? (article.author.displayName || article.author.username) : 'Unknown Author'}
        </p>
      </div>
    </div>
  );
}
