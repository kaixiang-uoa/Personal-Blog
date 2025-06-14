'use client';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components';
import { useArticle } from '@/hooks/useArticle';
import { Article, PostData } from '@/types';
import { useSetting } from '@/contexts/SettingsContext';

/**
 * ArticlePage Component
 * 
 * A dynamic page component that displays a single article with its content,
 * metadata, and related information. Handles loading states, error states,
 * and article not found scenarios.
 * 
 * @component
 * @example
 * ```tsx
 * // This component is rendered automatically by Next.js
 * // when navigating to /[locale]/article/[slug]
 * ```
 * 
 * @returns {JSX.Element} The article page layout
 */
export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = params.locale as string;
  const router = useRouter();
  const t = useTranslations('common');

  // Get banner settings from context
  const defaultBannerUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCAvMmY596FeQcfcATBZ7OCdgRlSZliPxjcpZQUcZDqH5aEwjRN_P38-l88OIVnA9PyzIWRGnVNwbjVmCoZOZ_MnIY9KnnrpDWEWyOKr74u0BfuxcU8SCMdy_m4R1XJrfQAbbPvd_LOUHwPGiRA7iZZLHNUz2tdANkx_VRCWWEB9fN6A1KhjUB5sAv03TuX4i4LtLrekE7qhDDqrMb2yCjou6oipdZSlw5L4upEMuuXII_n8xAuCdFTVn0_RDqCdKy6rXtMwHOp5CE";
  const articleBanner = useSetting('appearance.articleBanner', defaultBannerUrl);
  const articleBannerMobile = useSetting('appearance.articleBannerMobile', articleBanner);

  // Fetch article data using React Query
  const { data, isLoading, error } = useArticle(slug);
  const article: Article | null = data ? (data as PostData).post || null : null;

  /**
   * Handle tag click and navigate to filtered article list
   * @param {string} tagSlug - The slug of the clicked tag
   */
  const handleTagClick = (tagSlug: string) => {
    router.push(`/${locale}?tag=${tagSlug}`);
  };

  /**
   * Handle category click and navigate to filtered article list
   * @param {string} categorySlug - The slug of the clicked category
   */
  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/${locale}?category=${categorySlug}`);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4">
        {/* Back to home link */}
        <Link
          href={`/${params.locale}`}
          className="text-foreground hover:text-muted-foreground mb-4 inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256" className="mr-1">
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
          </svg>
          {t('backToHome')}
        </Link>

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-xl text-foreground">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
              <p className="text-xl text-destructive">{error instanceof Error ? error.message : 'Failed to load article'}</p>
              <Link
                href={`/${params.locale}`}
                className="mt-4 inline-block text-primary hover:text-primary/80"
              >
                {t('backToHome')}
              </Link>
            </div>
          </div>
        ) : article ? (
          <>
            {/* Article banner with responsive image */}
            <div className="py-4">
              <div className="flex min-h-[280px] md:min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 md:px-10 pb-8 md:pb-10 banner-image"
                style={{
                  backgroundImage: article.featuredImage 
                    ? `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${article.featuredImage}')`
                    : `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${articleBanner}')`
                }}>
                <style jsx>{`
                  @media (max-width: 768px) {
                    .banner-image {
                      background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${articleBannerMobile}') !important;
                    }
                  }
                `}</style>
                <div className="flex flex-col gap-2 text-left max-w-2xl">
                  <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    {article.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Article content */}
            <article className="bg-card border border-border rounded-lg p-6 shadow-sm my-4">
              {/* Article metadata */}
              <div className="mb-6 flex flex-wrap items-center text-muted-foreground gap-x-4 gap-y-2">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256" className="mr-1.5">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
                  </svg>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                {article.author && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256" className="mr-1.5">
                      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C64,166.83,40.5,185.71,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                    </svg>
                    {article.author.displayName || article.author.username}
                  </span>
                )}
              </div>

              {/* Categories section */}
              {article.categories && article.categories.length > 0 && (
                <div className="mb-4">
                  <span className="text-muted-foreground mr-2">{t('categories')}:</span>
                  <div className="inline-flex flex-wrap gap-2">
                    {article.categories.map(category => (
                      <span
                        key={category._id}
                        onClick={() => handleCategoryClick(category.slug)}
                        className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags section */}
              {article.tags && article.tags.length > 0 && (
                <div className="mb-6">
                  <span className="text-muted-foreground mr-2">{t('tags')}:</span>
                  <div className="inline-flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span
                        key={tag._id}
                        onClick={() => handleTagClick(tag.slug)}
                        className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Article content with prose styling */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </article>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-6">
              <p className="text-xl text-foreground">{t('notFound')}</p>
              <Link
                href={`/${params.locale}`}
                className="mt-4 inline-block text-primary hover:text-primary/80"
              >
                {t('backToHome')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </main>
  );
}
