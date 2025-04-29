'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Navbar from '../../../components/Navbar';
import { postApi } from '@/services/api';
import { Article } from '@/services/interface';

// 使用 Next.js 的内置类型
// import { PageProps as NextPageProps } from 'next';

// 定义正确的 PageProps 接口
interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ArticlePage({ params }: PageProps) {
  const { slug, locale } = params;
  const router = useRouter();
  const t = useTranslations('common');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await postApi.getPostBySlug(slug as string);
        setArticle(response.data.post);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError(t('error'));
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug, t]);

  // 将 handleTagClick 函数移到组件内部，不要使用 useParams
  const handleTagClick = (tagSlug: string) => {
    // 直接使用传入的 params.locale
    router.push(`/${locale}?tag=${tagSlug}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${params.locale}`}
          className="text-cyan-600 hover:text-cyan-400 mb-4 inline-block"
        >
          &larr; {t('backToHome')}
        </Link>

        {loading ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-xl">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
              <p className="text-xl text-red-400">{error}</p>
              <Link
                href={`/${params.locale}`}
                className="mt-4 inline-block text-cyan-500 hover:text-cyan-400"
              >
                {t('backToHome')}
              </Link>
            </div>
          </div>
        ) : article ? (
          <article className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-extrabold mb-4">{article.title}</h1>

            {article.featuredImage && (
              <div className="mb-6">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  unoptimized={article.featuredImage.startsWith('http')}
                />
              </div>
            )}

            <div className="mb-4 text-gray-400 flex items-center">
              <span className="mr-4">
                {t('publishedAt')}: {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              {article.author && (
                <span className="flex items-center">
                  {t('author')}: {article.author.displayName || article.author.username}
                </span>
              )}
            </div>

            {article.categories && article.categories.length > 0 && (
              <div className="mb-4">
                <span className="text-gray-400 mr-2">{t('categories')}:</span>
                {article.categories.map(category => (
                  <Link
                    key={category._id}
                    href={`/${params.locale}/?category=${category.slug}`}
                    className="text-cyan-500 hover:text-cyan-400 mr-2"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {article.tags && article.tags.length > 0 && (
              <div className="mb-4">
                <span className="text-gray-400 mr-2">{t('tags')}:</span>
                <div className="inline-flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag._id}
                      onClick={() => handleTagClick(tag.slug)}
                      className="px-2 py-1 bg-cyan-600 text-white rounded-md text-sm cursor-pointer transition-colors hover:bg-cyan-700"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </article>
        ) : (
          <div className="text-center py-10">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
              <p className="text-xl">{t('notFound')}</p>
              <Link
                href={`/${params.locale}`}
                className="mt-4 inline-block text-cyan-500 hover:text-cyan-400"
              >
                {t('backToHome')}
              </Link>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 py-6 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </main>
  );
}
