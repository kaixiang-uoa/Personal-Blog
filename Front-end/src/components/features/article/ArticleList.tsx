'use client';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ArticleCard from './ArticleCard';
import { ArticleSkeleton } from '@/components/ui';
import { ApiErrorFallback } from '@/components/common';
import { SortOrder, Tag, Category, Article } from '@/types';
import { useArticles } from '@/hooks/useArticles';

/**
 * Props interface for the ArticleList component
 * @interface ArticleListProps
 * @property {string} locale - The current locale for internationalization
 * @property {number} currentPage - The current page number for pagination
 * @property {number} postsPerPage - Number of posts to display per page
 * @property {string[]} tagsParam - Array of tag slugs to filter articles
 * @property {string} [category] - Optional category slug to filter articles
 * @property {string} [search] - Optional search term to filter articles
 * @property {SortOrder} sort - The sorting order for articles
 */
interface ArticleListProps {
  locale: string;
  currentPage: number;
  postsPerPage: number;
  tagsParam: string[];
  category?: string;
  search?: string;
  sort: SortOrder;
}

/**
 * ArticleList Component
 *
 * A component that displays a grid of articles with filtering, sorting, and pagination capabilities.
 * It handles loading states, error states, and empty states appropriately.
 *
 * @component
 * @example
 * ```tsx
 * <ArticleList
 *   locale="en"
 *   currentPage={1}
 *   postsPerPage={9}
 *   tagsParam={['react', 'typescript']}
 *   category="web-development"
 *   search="react hooks"
 *   sort="latest"
 * />
 * ```
 *
 * @param {ArticleListProps} props - The component props
 * @returns {JSX.Element} A responsive grid of articles with appropriate state handling
 */
export default function ArticleList({
  locale,
  currentPage,
  postsPerPage,
  tagsParam,
  category,
  search,
  sort,
}: ArticleListProps) {
  const t = useTranslations('common');

  // Fetch articles data using React Query hook
  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    error: articlesError,
    refetch,
  } = useArticles({
    page: currentPage,
    limit: Number(postsPerPage),
    tagSlug: tagsParam.length > 0 ? tagsParam.join(',') : undefined,
    categorySlug: category || undefined,
    search: search || undefined,
    sort,
    lang: locale,
  });

  // Memoize filtered articles to optimize performance
  const { articles, filteredArticles } = useMemo(() => {
    const articles = articlesData?.posts || [];

    // Return early if no articles are available
    if (articles.length === 0) {
      return { articles, filteredArticles: [] };
    }

    // Apply filters and sorting
    let result = [...articles];

    // Filter by tags if specified
    if (tagsParam.length > 0) {
      result = result.filter(
        article =>
          Array.isArray(article.tags) &&
          article.tags.some((tag: Tag) => tagsParam.includes(tag?.slug))
      );
    }

    // Filter by category if specified
    if (category) {
      result = result.filter(
        article =>
          Array.isArray(article.categories) &&
          article.categories.some((cat: Category) => cat?.slug === category)
      );
    }

    // Apply search filter if search term is provided
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (article: Article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower)
      );
    }

    // Sort articles based on the specified order
    switch (sort) {
      case 'latest':
        result.sort(
          (a: Article, b: Article) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        result.sort(
          (a: Article, b: Article) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'popular':
        result.sort((a: Article, b: Article) => b.viewCount - a.viewCount);
        break;
    }

    return { articles, filteredArticles: result };
  }, [articlesData, tagsParam, category, search, sort]);

  // Display loading skeleton while fetching data
  if (isLoadingArticles) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <ArticleSkeleton key={i} />
          ))}
      </div>
    );
  }

  // Display error state with retry option
  if (articlesError) {
    return (
      <ApiErrorFallback
        error={articlesError as Error}
        resetErrorBoundary={() => refetch()}
        message="Failed to load articles. Please try again later."
      />
    );
  }

  // Display empty state message when no articles are found
  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {t('noArticlesFound')}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('tryChangingFilters')}</p>
      </div>
    );
  }

  // Render the grid of filtered articles
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
