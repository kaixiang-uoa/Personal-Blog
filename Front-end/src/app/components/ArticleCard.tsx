import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  slug: string;
  publishedAt: string; // <--- 在这里添加 publishedAt 属性
}

export default function ArticleCard({ id, title, summary, image, slug }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image 
        src={image} 
        alt={title} 
        width={300} 
        height={200} 
        className="w-full h-48 object-cover"
        unoptimized={image.startsWith('http')} // 对于外部图片
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{summary}</p>
        <Link 
          href={`/article/${slug}`} 
          className="mt-4 inline-block text-cyan-600 hover:text-cyan-800 font-medium"
        >
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
}
