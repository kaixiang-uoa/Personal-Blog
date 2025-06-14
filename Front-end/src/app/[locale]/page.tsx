'use client';
import {useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { 
  Navbar,
  ArticleCard,
  FilterSidebar,
  ArticleSkeleton,
  ApiErrorFallback,
  ErrorBoundary
} from '@/components';
import { useSetting } from '@/contexts/SettingsContext';

import { SortOrder } from '@/types';
import { useArticles } from '@/hooks/useArticles';
import { useCategories, useTags } from '@/hooks/useTaxonomies';
import { getStringParam, getArrayParam, getResponsiveImageUrls, validateSortOrder } from '@/utils';
import type { Tag, Category, Article } from '@/types';

/**
 * ArticlesList Component
 * 
 * A component that displays a list of articles with filtering, sorting, and pagination.
 * Handles loading states, error states, and empty states.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.locale - Current locale
 * @param {number} props.currentPage - Current page number
 * @param {number} props.postsPerPage - Number of posts per page
 * @param {string[]} props.tagsParam - Array of selected tag slugs
 * @param {string} [props.category] - Selected category slug
 * @param {string} [props.search] - Search query
 * @param {SortOrder} props.sort - Current sort order
 * @returns {JSX.Element} A list of articles or appropriate state UI
 */
function ArticlesList({ 
  locale, 
  currentPage, 
  postsPerPage, 
  tagsParam, 
  category, 
  search, 
  sort 
}: { 
  locale: string;
  currentPage: number;
  postsPerPage: number;
  tagsParam: string[];
  category?: string;
  search?: string;
  sort: SortOrder;
}) {
  const t = useTranslations('common');
  
  // Fetch articles data using React Query
  const { 
    data: articlesData, 
    isLoading: isLoadingArticles, 
    error: articlesError,
    refetch
  } = useArticles({
    page: currentPage,
    limit: Number(postsPerPage),
    tagSlug: tagsParam.length > 0 ? tagsParam.join(',') : undefined,
    categorySlug: category || undefined,
    search: search || undefined,
    sort,
    lang: locale
  });

  // Process and filter articles data
  const { articles, filteredArticles } = useMemo(() => {
    const articles = articlesData?.posts || [];
    
    if (articles.length === 0) {
      return { articles, filteredArticles: [] };
    }

    let result = [...articles];

    // Apply tag filters
    if (tagsParam.length > 0) {
      result = result.filter(article => 
        Array.isArray(article.tags) &&
        article.tags.some((tag: Tag) => tagsParam.includes(tag?.slug)));
    }

    // Apply category filter
    if (category) {
      result = result.filter(article => 
        Array.isArray(article.categories) && 
        article.categories.some((cat: Category) => cat?.slug === category))
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (article: Article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (sort) {
      case 'latest':
        result.sort((a: Article, b: Article) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a: Article, b: Article) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a: Article, b: Article) => b.viewCount - a.viewCount);
        break;
    }

    return { articles, filteredArticles: result };
  }, [
    articlesData, 
    tagsParam, 
    category, 
    search, 
    sort
  ]);

  // Loading state
  if (isLoadingArticles) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (articlesError) {
    return (
      <ApiErrorFallback 
        error={articlesError as Error} 
        resetErrorBoundary={() => refetch()} 
        message="Failed to load articles. Please try again later."
      />
    );
  }

  // Empty state
  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('noArticlesFound')}</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t('tryChangingFilters')}
        </p>
      </div>
    );
  }

  // Render article list
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}

/**
 * Home Page Component
 * 
 * The main page component that displays the blog's home page.
 * Includes a banner, filter sidebar, and article list.
 * Handles URL parameters for filtering and sorting.
 * 
 * @component
 * @returns {JSX.Element} The home page layout
 */
export default function Home() {  
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parse and validate URL parameters
  const sort = validateSortOrder(searchParams.get('sort'), 'publishedAt-desc');
  const tagsParam = getArrayParam(searchParams.get('tag'));
  const category = getStringParam(searchParams.get('category'));
  const search = getStringParam(searchParams.get('search'));
  const page = getStringParam(searchParams.get('page'), '1');
  const currentPage = parseInt(page) || 1;
  
  // Get settings from context
  const postsPerPage = useSetting('posts.perPage', 10); 
  const defaultBannerUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCAvMmY596FeQcfcATBZ7OCdgRlSZliPxjcpZQUcZDqH5aEwjRN_P38-l88OIVnA9PyzIWRGnVNwbjVmCoZOZ_MnIY9KnnrpDWEWyOKr74u0BfuxcU8SCMdy_m4R1XJrfQAbbPvd_LOUHwPGiRA7iZZLHNUz2tdANkx_VRCWWEB9fN6A1KhjUB5sAv03TuX4i4LtLrekE7qhDDqrMb2yCjou6oipdZSlw5L4upEMuuXII_n8xAuCdFTVn0_RDqCdKy6rXtMwHOp5CE";
  const homeBanner = useSetting('appearance.homeBanner', defaultBannerUrl);
  const homeBannerMobile = useSetting('appearance.homeBannerMobile', homeBanner);
  
  // Process banner images for responsive display
  const { desktop: processedHomeBanner, mobile: processedMobileBanner } = getResponsiveImageUrls(
    homeBanner,
    homeBannerMobile,
    defaultBannerUrl
  );
  
  // Fetch categories and tags data
  const { data: categoriesData } = useCategories(locale);
  const { data: tagsData } = useTags(locale);
  
  // Extract data from responses
  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];
   
  /**
   * Handle filter changes and update URL parameters
   * @param {Object} params - Filter parameters
   * @param {string} params.type - Type of filter ('tags', 'category', or 'sort')
   * @param {string|string[]|SortOrder} params.value - New filter value
   */
  const handleFilterChange = (params: {
    type: 'tags' | 'category' | 'sort';
    value: string | string[] | SortOrder;
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    if (params.type === 'category') {
      urlParams.set('category', params.value as string);
    } else if (params.type === 'sort') {
      urlParams.set('sort', params.value as string);
    } else if (params.type === 'tags') {
      const tagArray = params.value as string[];
      urlParams.set('tag', tagArray.join(','));
    }
    router.push(`/${locale}?${urlParams.toString()}`);
  };

  /**
   * Clear all filters and reset to default state
   */
  const handleClearFilters = () => {
    router.push(`/${locale}`);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Filter area with horizontal layout */}
      <div className="bg-background border-b border-border py-4">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-foreground text-xl font-bold leading-tight tracking-[-0.015em]">Filter</h2>
            <div className="flex flex-1 flex-wrap justify-end md:flex-initial">
              <FilterSidebar
                tags={tags}
                activeTags={tagsParam}
                categories={categories}
                activeCategory={category}
                sortOrder={sort}
                onFilterChangeAction={handleFilterChange}
                onClearFiltersAction={handleClearFilters}
                currentLocale={locale}
                isHorizontal={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col flex-1">
          {/* Banner area with responsive image */}
          <div>
            <div className="py-4">
              <div className="flex min-h-[380px] md:min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 md:px-10 pb-8 md:pb-10 banner-image"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${processedHomeBanner}')`,
                  }}
              >
                <style jsx>{`
                  @media (max-width: 768px) {
                    .banner-image {
                      background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${processedMobileBanner}') !important;
                    }
                  }
                `}</style>
                <div className="flex flex-col gap-2 text-left max-w-2xl">
                  <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    Explore the world of software development
                  </h1>
                  <h2 className="text-white text-base font-normal leading-normal">
                    {t('heroSubtitle')}
                  </h2>
                </div>
              </div>
            </div>
          </div>
            
          {/* Article list with error boundary */}
          <ErrorBoundary>
            <ArticlesList
              locale={locale}
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              tagsParam={tagsParam}
              category={category}
              search={search}
              sort={sort}
            />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
}
