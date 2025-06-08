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

// extract article list to a separate component, so that it can be wrapped by ErrorBoundary
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
  
  // use React Query hooks to get data
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

  // Extract data and create filtered articles in one memo to maintain hook order
  const { articles, filteredArticles } = useMemo(() => {
    const articles = articlesData?.posts || [];
    
    // Calculate filtered articles only if we have articles
    if (articles.length === 0) {
      return { articles, filteredArticles: [] };
    }

    // Filter logic
    let result = [...articles];

    // filter by tags
    if (tagsParam.length > 0) {
      result = result.filter(article => 
        Array.isArray(article.tags) &&
        article.tags.some((t: any) => tagsParam.includes(t?.slug)));
    }

    // filter by category
    if (category) {
      result = result.filter(article => 
        Array.isArray(article.categories) && 
        article.categories.some((c: any) => c?.slug === category))
    }

    // search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        article =>
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower)
      );
    }

    // sort
    switch (sort) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.viewCount - a.viewCount);
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

  // loading state
  if (isLoadingArticles) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    );
  }

  // error state
  if (articlesError) {
    return (
      <ApiErrorFallback 
        error={articlesError as Error} 
        resetErrorBoundary={() => refetch()} 
        message="Failed to load articles. Please try again later."
      />
    );
  }

  // empty state
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

  // normal rendering of article list
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}

export default function Home() {  
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parse query parameters with type validation
  const sort = validateSortOrder(searchParams.get('sort'), 'publishedAt-desc');
  const tagsParam = getArrayParam(searchParams.get('tag'));
  const category = getStringParam(searchParams.get('category'));
  const search = getStringParam(searchParams.get('search'));
  const page = getStringParam(searchParams.get('page'), '1');
  const currentPage = parseInt(page) || 1;
  
  // Get settings
  const postsPerPage = useSetting('posts.perPage', 10); 
  const defaultBannerUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCAvMmY596FeQcfcATBZ7OCdgRlSZliPxjcpZQUcZDqH5aEwjRN_P38-l88OIVnA9PyzIWRGnVNwbjVmCoZOZ_MnIY9KnnrpDWEWyOKr74u0BfuxcU8SCMdy_m4R1XJrfQAbbPvd_LOUHwPGiRA7iZZLHNUz2tdANkx_VRCWWEB9fN6A1KhjUB5sAv03TuX4i4LtLrekE7qhDDqrMb2yCjou6oipdZSlw5L4upEMuuXII_n8xAuCdFTVn0_RDqCdKy6rXtMwHOp5CE";
  const homeBanner = useSetting('appearance.homeBanner', defaultBannerUrl);
  const homeBannerMobile = useSetting('appearance.homeBannerMobile', homeBanner);
  
  // use tool function to process Banner URLs
  const { desktop: processedHomeBanner, mobile: processedMobileBanner } = getResponsiveImageUrls(
    homeBanner,
    homeBannerMobile,
    defaultBannerUrl
  );
  
  const { data: categoriesData } = useCategories(locale);
  const { data: tagsData } = useTags(locale);
  
  // Extract data from responses
  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];
   
  const handleSearch = (query: string) => {
    router.push(`/${locale}?search=${encodeURIComponent(query)}`);
  };

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

  const handleClearFilters = () => {
    router.push(`/${locale}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/${locale}?page=${page}`);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* repositioned filter area - horizontal layout */}
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
          {/* banner area - adjust ratio */}
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
            
          {/* article title */}
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
            Latest Posts
          </h2>
          
          {/* use ErrorBoundary to wrap article list */}
          <ErrorBoundary
            fallback={
              <div className="text-center p-4 text-red-500">
                Something went wrong while loading articles.
              </div>
            }
          >
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
