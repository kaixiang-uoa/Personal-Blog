'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
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

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// 辅助函数：从 searchParams 中获取字符串值
const getStringParam = (param: string | string[] | undefined, defaultValue = ''): string => {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] || defaultValue : param;
};

// 类型守卫：检查是否为有效的分类
// const isValidCategory = (category: unknown): category is Category => {
//   return typeof category === 'object' && 
//          category !== null && 
//          'slug' in category &&
//          typeof (category as Category).slug === 'string';
// };

export default function Home({ searchParams }: PageProps) {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  
  const sort = getStringParam(searchParams.sort, 'latest') as SortOrder;
  const tag = getStringParam(searchParams.tag);
  const category = getStringParam(searchParams.category);
  const search = getStringParam(searchParams.search);
  const page = getStringParam(searchParams.page, '1');
  
  const currentPage = parseInt(page) || 1;
  
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

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await postApi.getAllPosts({
        page: currentPage,
        limit: 10,
        tag: tag || undefined,
        category: category || undefined,
        search: search || undefined,
        sort
      });
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
  }, [currentPage, sort, tag, category, search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

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
    
    // 按标签过滤
    if (tag) {
      result = result.filter(article => 
        article.tags.some(t => t.slug === tag)
      );
    }
    
    // 按分类过滤
    if (category) {
      result = result.filter(article => 
        (article.category as { slug: string }).slug === category
      );
    }
    
    // 搜索过滤
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) 
      );
    }
    
    // 排序
    switch (sort) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
    }
    
    return result;
  }, [articles, sort, tag, category, search]);

  const handleSearch = (query: string) => {
    router.push(`/${locale}?q=${encodeURIComponent(query)}`);
  };

  const handleTagsChange = (tags: string[]) => {
    router.push(`/${locale}?tag=${tags.join(',')}`);
  };
  
  const handleFilterChange = (params: { type: 'tags' | 'category' | 'sort'; value: string | string[] | SortOrder }) => {
    if (params.type === 'category') {
      router.push(`/${locale}?category=${params.value}`);
    } else if (params.type === 'sort') {
      const sortValue = params.value as SortOrder;
      router.push(`/${locale}?sort=${sortValue}`);
    } else if (params.type === 'tags') {
      router.push(`/${locale}?tag=${(params.value as string[]).join(',')}`);
    }
  };
  
  const handleClearFilters = () => {
    router.push(`/${locale}`);
  };
  
  const hasActiveFilters = useMemo(() => {
    return !!tag || !!category || !!search || sort !== 'latest';
  }, [tag, category, search, sort]);
  
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
            className={`px-4 py-2 rounded-md ${!category ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`}
          >
            {t('allCategories')}
          </Link>
          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/${locale}?category=${cat.slug}`}
              scroll={false}
              onClick={() => router.push(`/${locale}?category=${cat.slug}`)}
              className={`px-4 py-2 rounded-md ${category === cat.slug ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`}
            >
              {getCategoryName(cat)}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(search); }} className="flex">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => router.push(`/${locale}?q=${e.target.value}`)}
            className="w-full px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800 text-white"
          />
          <button type="submit" className="bg-cyan-600 px-4 py-2 rounded-r-md">
            {t('search')}
          </button>
        </form>
      </section>

      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tags.length > 0 && (
          <TagFilter tags={tags} activeTags={[tag]} onTagsChange={handleTagsChange} />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="hidden md:block">
            <FilterSidebar
              tags={tags}
              activeTags={[tag]}
              categories={categories}
              activeCategory={category}
              sortOrder={sort as SortOrder}
              onFilterChangeAction={handleFilterChange}
              onClearFiltersAction={handleClearFilters}
            />
          </div>

          <div>
            {hasActiveFilters && (
              <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-400">{t('filterConditions')}:</span>
                  {tag && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t('tag')}: {tags.find(t => t.slug === tag)?.name || tag}
                    </span>
                  )}
                  {category && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t('category')}: {getCategoryName(categories.find(c => c.slug === category))}
                    </span>
                  )}
                  {search && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t('search')}: {search}
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
                value={sort as SortOrder}
                onChange={val => handleFilterChange({ type: 'sort', value: val as SortOrder })}
                className="md:hidden"
              />
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-8">
              {category
                ? `${t('category')}: ${getCategoryName(categories.find(c => c.slug === category))}`
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
