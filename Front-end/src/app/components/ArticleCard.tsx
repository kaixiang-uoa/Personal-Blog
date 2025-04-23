import Image from "next/image";
import Link from "next/link";
import { Article } from "../../services/interface"; // 导入 Article 接口

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image
        src={article.featuredImage || '/images/default-image.jpg'} // 添加默认图片
        alt={article.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        unoptimized={article.featuredImage ? article.featuredImage.startsWith('http') : false} // 修复类型错误
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
        {/* <p className="mt-2 text-gray-600">{article.summary}</p> */}
        <Link 
          href={`/article/${article.slug}`} 
          className="mt-4 inline-block text-cyan-600 hover:text-cyan-800 font-medium"
        >
          阅读更多 &rarr;
        </Link>
      </div>
    </div>
  );
}
