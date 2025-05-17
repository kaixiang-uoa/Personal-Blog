'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import TagFilter from '../components/TagFilter';
import FilterSidebar from '../components/FilterSidebar';
import SortSelector from '@/app/components/SortSelector';
import ArticleSkeleton from '../components/ArticleSkeleton';

import { Article, Category, Tag, SortOrder } from '@/types';
import { postApi } from '@/services/postApi';
import {categoryApi} from '@/services/categoryApi';
import {tagApi} from '@/services/tagApi';

// 辅助函数：从 searchParams 中获取字符串值
const getStringParam = (param: string | string[] | null | undefined, defaultValue = ''): string => {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] || defaultValue : param;
};

const getArrayParam = (param: string | string[] | null | undefined): string[] => {
  if (!param) return [];
  const str = Array.isArray(param) ? param[0] : param;
  return str.split(',').map(s => s.trim()).filter(Boolean);
};

export default function Home() {  
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();  // 使用 useSearchParams 钩子

  // 使用 searchParams.get() 方法获取参数
  const sort = getStringParam(searchParams.get('sort'), 'latest') as SortOrder;
  const tagsParam = getArrayParam(searchParams.get('tag'));
  const tagsKey = useMemo(() => tagsParam.join(','), [tagsParam]);
  const category = getStringParam(searchParams.get('category'));
  const search = getStringParam(searchParams.get('search'));
  const page = getStringParam(searchParams.get('page'), '1');
  const currentPage = parseInt(page) || 1;
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await postApi.getAllPosts({
        page: currentPage,
        limit: 10,
        tag: tagsParam.length > 0 ? tagsParam.join(',') : undefined,
        category: category || undefined,
        search: search || undefined,
        sort,
        lang: locale
      });
      setArticles(response.posts);
      setTotalPages(Math.ceil(response.total / 10));
      setTotalArticles(response.total);
      setError(null);
      setLoading(false);
    } catch (err: unknown) {
      // 检查是否为网络错误（后端未启动）
      const isNetworkError = err instanceof Error && 
        (err.message.includes('network') || 
         err.message.includes('fetch') || 
         err.message.includes('connection') ||
         err.message.includes('Network Error'));
      
      if (!isNetworkError) {
        // 对于非网络错误，显示错误信息并停止加载状态
        const errorMessage = err instanceof Error ? err.message : '获取文章失败';
        setError(errorMessage);
        setArticles([]);
        setLoading(false);
      }
      // 对于网络错误，保持loading状态为true，继续显示骨架屏
    }
  }, [currentPage, sort, tagsKey, category, search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    categoryApi.getAllCategories({lang:locale}).then(res => {
      setCategories(res.categories || []);
    });
    tagApi.getAllTags({lang:locale}).then(res => {
      setTags(res.tags || []);
    });
  }, [locale]);

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // 按标签过滤
    if (tagsParam.length > 0) {
      result = result.filter(article => 
        Array.isArray(article.tags) &&
        article.tags.some(t => tagsParam.includes(t?.slug)));
    }

    // 按分类过滤
    if (category) {
      result = result.filter(article => 
        Array.isArray(article.categories) && 
        article.categories.some(c => c?.slug === category))
    }

    // 搜索过滤
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        article =>
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
  }, [articles, sort, tagsParam, category, search]);

  const handleSearch = (query: string) => {
    router.push(`/${locale}?search=${encodeURIComponent(query)}`);
  };

  const handleTagsChange = (tags: string[]) => {   // 主要修改的这个地方
    router.push(`/${locale}?tag=${tags.join(',')}`);
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

  const hasActiveFilters = useMemo(() => {
    return !!search || sort !== 'latest';
  }, [search, sort]);

  const handlePageChange = (page: number) => {
    router.push(`/${locale}?page=${page}`);
  };

  const getCategoryName =(category: Category | undefined) => category?.name || '';
  
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[95%] mx-auto">
          <h1 className="text-4xl font-extrabold sm:text-6xl">{t('latestArticles')}</h1>
          <p className="mt-6 text-xl max-w-3xl">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="max-w-[95%] mx-auto py-6 px-4 sm:px-6 lg:px-8">
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

      <section className="max-w-[95%] mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch(search);
          }}
          className="flex"
        >
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={e => router.push(`/${locale}?search=${e.target.value}`)}
            className="w-full px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800 text-white"
          />
          <button type="submit" className="bg-cyan-600 px-4 py-2 rounded-r-md ml-2">
            {t('search')}
          </button>
        </form>
      </section>

      <div className="md:hidden max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {tags.length > 0 && (
          <TagFilter tags={tags} activeTags={tagsParam} onTagsChangeAction={handleTagsChange} />
        )}
      </div>

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="hidden md:block">
            <FilterSidebar
              tags={tags}
              activeTags={tagsParam}
              categories={categories}
              activeCategory={category}
              sortOrder={sort as SortOrder}
              onFilterChangeAction={handleFilterChange}
              onClearFiltersAction={handleClearFilters}
              currentLocale={locale}
            />
          </div>

          <div>
            {hasActiveFilters && (
              <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-400">{t('filterConditions')}:</span>
                  {search && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {search}
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
              {}
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
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
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
