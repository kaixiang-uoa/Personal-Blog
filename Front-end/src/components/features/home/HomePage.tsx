'use client';

import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { Navbar, FilterSidebar, PageBanner, PageSEO, Footer } from '@/components';
import { useSetting } from '@/contexts/SettingsContext';
import { SortOrder } from '@/types';
import { useCategories, useTags } from '@/hooks/useTaxonomies';
import { getStringParam, getArrayParam, validateSortOrder } from '@/utils';

import SearchBar from './SearchBar';
import ArticlesList from './ArticlesList';

/**
 * HomePage Component
 *
 * The main homepage component that coordinates all sub-components
 *
 * @component
 * @returns {JSX.Element} The complete homepage with all features
 */
export default function HomePage() {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse and validate URL parameters
  const sort = validateSortOrder(searchParams.get('sort'), 'latest');
  const tagsParam = getArrayParam(searchParams.get('tag'));
  const category = getStringParam(searchParams.get('category'));
  const search = getStringParam(searchParams.get('search'));
  const page = getStringParam(searchParams.get('page'), '1');
  const currentPage = parseInt(page) || 1;

  // Get settings from context
  const postsPerPage = useSetting('posts.perPage', 10);
  const pageSize = postsPerPage;

  // Banner settings
  const defaultBannerUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCAvMmY596FeQcfcATBZ7OCdgRlSZliPxjcpZQUcZDqH5aEwjRN_P38-l88OIVnA9PyzIWRGnVNwbjVmCoZOZ_MnIY9KnnrpDWEWyOKr74u0BfuxcU8SCMdy_m4R1XJrfQAbbPvd_LOUHwPGiRA7iZZLHNUz2tdANkx_VRCWWEB9fN6A1KhjUB5sAv03TuX4i4LtLrekE7qhDDqrMb2yCjou6oipdZSlw5L4upEMuuXII_n8xAuCdFTVn0_RDqCdKy6rXtMwHOp5CE';

  // Fetch categories and tags
  const { data: categoriesData } = useCategories(locale);
  const { data: tagsData } = useTags(locale);
  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];

  // Handle filter changes
  const handleFilterChange = useCallback(
    (params: { type: 'tags' | 'category' | 'sort'; value: string | string[] | SortOrder }) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      switch (params.type) {
        case 'tags':
          if (Array.isArray(params.value) && params.value.length > 0) {
            urlParams.set('tag', params.value.join(','));
          } else {
            urlParams.delete('tag');
          }
          break;
        case 'category':
          if (params.value) {
            urlParams.set('category', params.value as string);
          } else {
            urlParams.delete('category');
          }
          break;
        case 'sort':
          urlParams.set('sort', params.value as string);
          break;
      }

      // Reset to page 1 when filters change
      urlParams.delete('page');
      router.push(`/${locale}?${urlParams.toString()}`);
    },
    [searchParams, router, locale]
  );

  // Handle page changes
  const handlePageChange = useCallback(
    (page: number) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      if (page > 1) {
        urlParams.set('page', page.toString());
      } else {
        urlParams.delete('page');
      }
      router.push(`/${locale}?${urlParams.toString()}`);
    },
    [searchParams, router, locale]
  );

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    router.push(`/${locale}`);
  }, [router, locale]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <PageSEO
        locale={locale}
        pathname={pathname}
        type="home"
        keywords={['blog', 'technology', 'programming', 'web development']}
      />

      {/* Filter section */}
      <div className="bg-background border-b border-border py-4">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-foreground text-xl font-bold leading-tight tracking-[-0.015em]">
              Filter
            </h2>

            {/* Search Bar */}
            <SearchBar locale={locale} initialSearch={search} />

            {/* Filter Controls */}
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

      {/* Banner area */}
      <PageBanner
        bannerKey="homeBanner"
        title="Explore the world of software development"
        subtitle={t('heroSubtitle')}
        height="large"
        defaultImage={defaultBannerUrl}
      />

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8 py-8">
          {/* Articles List */}
          <ArticlesList
            locale={locale}
            currentPage={currentPage}
            pageSize={pageSize}
            tagsParam={tagsParam}
            category={category}
            search={search}
            sort={sort}
            searchParams={searchParams}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
