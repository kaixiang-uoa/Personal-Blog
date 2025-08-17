'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArticleCard, ArticleSkeleton, ApiErrorFallback } from '@/components';
import { useArticles } from '@/hooks/useArticles';
import { SortOrder } from '@/types';
import type { Tag, Category, Article } from '@/types';
import PaginationControls from './PaginationControls';

interface ArticlesListProps {
  locale: string;
  currentPage: number;
  pageSize: number;
  tagsParam: string[];
  category?: string;
  search?: string;
  sort: SortOrder;
  searchParams: URLSearchParams;
  onPageChange: (page: number) => void;
}

/**
 * ArticlesList Component
 *
 * A component that handles article fetching, filtering, and display
 *
 * @component
 * @param {ArticlesListProps} props - Component props
 * @returns {JSX.Element} Articles list with pagination
 */
export default function ArticlesList({
  locale,
  currentPage,
  pageSize,
  tagsParam,
  category,
  search,
  sort,
  searchParams,
  onPageChange,
}: ArticlesListProps) {
  const t = useTranslations('common');

  // Fetch articles data using React Query
  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    error: articlesError,
    refetch,
  } = useArticles({
    page: currentPage,
    limit: pageSize,
    tagSlug: tagsParam.length > 0 ? tagsParam.join(',') : undefined,
    categorySlug: category || undefined,
    search: search || undefined,
    sort,
    lang: locale,
  });

  // Use real API data with fallback
  const effectiveArticlesData = articlesData || {
    posts: [],
    total: 0,
    totalPages: 1,
    currentPage: currentPage,
  };

  // Filter articles by tags
  const tagFilteredArticles = useMemo(() => {
    const articles = effectiveArticlesData?.posts || [];
    if (tagsParam.length === 0 || articles.length === 0) {
      return articles;
    }
    return articles.filter(
      article =>
        Array.isArray(article.tags) &&
        article.tags.some((tag: Tag) => tag?.slug && tagsParam.includes(tag.slug))
    );
  }, [effectiveArticlesData?.posts, tagsParam]);

  // Filter articles by category
  const categoryFilteredArticles = useMemo(() => {
    if (!category || tagFilteredArticles.length === 0) {
      return tagFilteredArticles;
    }
    return tagFilteredArticles.filter(
      article =>
        Array.isArray(article.categories) &&
        article.categories.some((cat: Category) => cat?.slug && cat.slug === category)
    );
  }, [tagFilteredArticles, category]);

  // Filter articles by search
  const searchFilteredArticles = useMemo(() => {
    if (!search || categoryFilteredArticles.length === 0) {
      return categoryFilteredArticles;
    }
    const searchLower = search.toLowerCase();
    return categoryFilteredArticles.filter((article: Article) => {
      const title = article.title?.toLowerCase() || '';
      const content = article.content?.toLowerCase() || '';
      const excerpt = article.excerpt?.toLowerCase() || '';
      return (
        title.includes(searchLower) ||
        content.includes(searchLower) ||
        excerpt.includes(searchLower)
      );
    });
  }, [categoryFilteredArticles, search]);

  // Sort articles
  const sortedArticles = useMemo(() => {
    if (searchFilteredArticles.length === 0) {
      return searchFilteredArticles;
    }
    const result = [...searchFilteredArticles];

    switch (sort) {
      case 'latest':
        result.sort((a: Article, b: Article) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'oldest':
        result.sort((a: Article, b: Article) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case 'popular':
        result.sort((a: Article, b: Article) => {
          const viewsA = a.viewCount || 0;
          const viewsB = b.viewCount || 0;
          return viewsB - viewsA;
        });
        break;
    }

    return result;
  }, [searchFilteredArticles, sort]);

  // Apply pagination
  const filteredArticles = useMemo(() => {
    if (sortedArticles.length === 0) {
      return [];
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedArticles.slice(startIndex, endIndex);
  }, [sortedArticles, currentPage, pageSize]);

  // Loading state
  if (isLoadingArticles) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ArticleSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (articlesError) {
    return (
      <ApiErrorFallback
        error={articlesError}
        resetErrorBoundary={() => refetch()}
        message={t('errorDescription')}
      />
    );
  }

  // Empty state
  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">{t('noArticlesFound')}</h3>
        <p className="text-muted-foreground">{t('noArticlesDescription')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={effectiveArticlesData?.totalPages || 1}
        locale={locale}
        searchParams={searchParams}
        onPageChange={onPageChange}
        initialPageSize={pageSize}
      />
    </div>
  );
}
