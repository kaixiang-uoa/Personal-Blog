'use client';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ArticleCard from './ArticleCard';
import { ArticleSkeleton } from '@/components/ui';
import { ApiErrorFallback } from '@/components/common';
import { SortOrder } from '@/types';
import { useArticles } from '@/hooks/useArticles';

interface ArticleListProps { 
  locale: string;
  currentPage: number;
  postsPerPage: number;
  tagsParam: string[];
  category?: string;
  search?: string;
  sort: SortOrder;
}

export default function ArticleList({ 
  locale, 
  currentPage, 
  postsPerPage, 
  tagsParam, 
  category, 
  search, 
  sort 
}: ArticleListProps) {
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
    tag: tagsParam.length > 0 ? tagsParam.join(',') : undefined,
    category: category || undefined,
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