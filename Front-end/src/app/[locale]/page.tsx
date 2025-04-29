'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import TagFilter from '../components/TagFilter';
import FilterSidebar from '../components/FilterSidebar';
import SortSelector from '@/app/components/SortSelector';
import ArticleSkeleton from '../components/ArticleSkeleton';

import { Article, Category, Tag, SortOrder } from '@/services/interface';
import { postApi, categoryApi, tagApi } from '@/services/api';

export default function HomePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  
  // 获取并验证排序参数
  const sortParam = searchParams.sort as string;
  const validSortOrders: SortOrder[] = ['latest', 'oldest', 'popular'];
  const sortOrder: SortOrder = validSortOrders.includes(sortParam as SortOrder) ? sortParam as SortOrder : 'latest';
  
  // 获取并验证标签参数
  const tagParam = searchParams.tag as string;
  
  // 获取并验证分类参数
  const categoryParam = searchParams.category as string;
  
  // 获取并验证搜索参数
  const searchQuery = searchParams.q as string;
  
  // 获取并验证分页参数
  const pageParam = searchParams.page as string;
  const currentPage = parseInt(pageParam) || 1;
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 添加一个辅助函数
  const getCategoryNameByLocale = (category: Category, localeStr: string) => {
    if (localeStr === 'en') return category.name_en || category.name;
    if (localeStr === 'zh') return category.name_zh || category.name;
    return category.name;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await postApi.getAllPosts(
          currentPage,
          10,
          tagParam || undefined,
          categoryParam || undefined,
          searchQuery || undefined,
          sortOrder
        );
        setArticles(response.data);
        setTotalPages(Math.ceil(response.total / 10));
        setTotalArticles(response.total);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : '获取文章失败';
        setError(errorMessage);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, categoryParam, tagParam, searchQuery, sortOrder]);

  useEffect(() => {
    categoryApi.getAllCategories().then(res => {
      setCategories(res.data || []);
    });
    tagApi.getAllTags().then(res => {
      setTags(res.data || []);
    });
  }, [locale]);

  const filteredArticles = useMemo(() => {
    let result = [...articles];
    
    // 应用标签过滤
    if (tagParam) {
      result = result.filter(article => 
        article.tags?.some(tag => tag.slug === tagParam) ?? false
      );
    }
    
    // 应用分类过滤
    if (categoryParam) {
      result = result.filter(article => 
        article.category.slug === categoryParam
      );
    }
    
    // 应用搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    }
    
    // 应用排序
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'latest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
    
    return result;
  }, [articles, tagParam, categoryParam, searchQuery, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${locale}?q=${searchQuery}`);
  };

  const handleTagsChange = (tags: string[]) => {
    router.push(`/${locale}?tag=${tags.join(',')}`);
  };
  
  const handleFilterChange = (params: { type: 'tags' | 'category' | 'sort'; value: string | string[] | SortOrder }) => {
    if (params.type === 'category') {
      router.push(`/${locale}?category=${params.value}`);
    } else if (params.type === 'sort') {
      const sortValue = params.value as SortOrder;
      if (validSortOrders.includes(sortValue)) {
        router.push(`/${locale}?sort=${sortValue}`);
      }
    } else if (params.type === 'tags') {
      router.push(`/${locale}?tag=${(params.value as string[]).join(',')}`);
    }
  };
  
  const handleClearFilters = () => {
    router.push(`/${locale}`);
  };
  
  const hasActiveFilters = useMemo(() => {
    return !!tagParam || !!categoryParam || !!searchQuery || sortOrder !== 'latest';
  }, [tagParam, categoryParam, searchQuery, sortOrder]);
  
  const handlePageChange = (page: number) => {
    router.push(`/${locale}?page=${page}`);
  };

  const getCategoryName = (category: Category | undefined) => {
    if (!category) return '';
    return getCategoryNameByLocale(category, locale);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold sm:text-6xl">{t('latestArticles')}</h1>
          <p className="mt-6 text-xl max-w-3xl">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center flex-wrap gap-4">
          <Link
            href="/"
            scroll={false}
            onClick={() => router.push(`/${locale}`)}
            className={`px-4 py-2 rounded-md ${!categoryParam ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`}
          >
            {t('allCategories')}
          </Link>
          {categories.map(category => (
            <Link
              key={category._id}
              href={`/${locale}?category=${category.slug}`}
              scroll={false}
              onClick={() => router.push(`/${locale}?category=${category.slug}`)}
              className={`px-4 py-2 rounded-md ${categoryParam === category.slug ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`}
            >
              {getCategoryName(category)}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => router.push(`/${locale}?q=${e.target.value}`)}
            className="w-full px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800 text-white"
          />
          <button type="submit" className="bg-cyan-600 px-4 py-2 rounded-r-md">
            {t('search')}
          </button>
        </form>
      </section>

      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tags.length > 0 && (
          <TagFilter tags={tags} activeTags={[tagParam]} onTagsChange={handleTagsChange} />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="hidden md:block">
            <FilterSidebar
              tags={tags}
              activeTags={[tagParam]}
              categories={categories}
              activeCategory={categoryParam}
              sortOrder={sortOrder}
              onFilterChangeAction={handleFilterChange}
              onClearFiltersAction={handleClearFilters}
            />
          </div>

          <div>
            {hasActiveFilters && (
              <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-400">{t('filterConditions')}:</span>
                  {tagParam && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t('tag')}: {tags.find(t => t.slug === tagParam)?.name || tagParam}
                    </span>
                  )}
                  {categoryParam && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t('category')}: {getCategoryName(categories.find(c => c.slug === categoryParam))}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t('search')}: {searchQuery}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-cyan-500 hover:text-cyan-400 md:hidden"
                >
                  {t('clearFilters')}
                </button>
              </div>
            )}

            <div className="flex justify-end mb-6">
              <SortSelector
                value={sortOrder}
                onChange={val => handleFilterChange({ type: 'sort', value: val as SortOrder })}
                className="md:hidden"
              />
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-8">
              {categoryParam
                ? `${t('category')}: ${getCategoryName(categories.find(c => c.slug === categoryParam))}`
                : hasActiveFilters
                  ? t('filterResults')
                  : t('latestArticles')}
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ArticleSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map(article => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      {t('previousPage')}
                    </button>
                    <span>{t('pageInfo', { current: currentPage, total: totalPages })}</span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {t('nextPage')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-yellow-300 py-10">{t('noArticlesFound')}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
