import Image from "next/image";

interface ArticleCardProps {
  id: number;
  title: string;
  summary: string;
  image: string;
}

export default function ArticleCard({ title, summary, image }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image src={image} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{summary}</p>
        <a href="#" className="mt-4 inline-block text-cyan-600 hover:text-cyan-800 font-medium">
          Read more &rarr;
        </a>
      </div>
    </div>
  );
}
