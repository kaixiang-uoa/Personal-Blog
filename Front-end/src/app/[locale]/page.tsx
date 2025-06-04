'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import FilterSidebar from '../components/FilterSidebar';
import ArticleSkeleton from '../components/ArticleSkeleton';
import { useSetting, useSettings } from '@/contexts/SettingsContext';

import { Article, Category, Tag, SortOrder } from '@/types';
import { postApi } from '@/services/postApi';
import {categoryApi} from '@/services/categoryApi';
import {tagApi} from '@/services/tagApi';

// helper function: get string value from searchParams
const getStringParam = (param: string | string[] | null | undefined, defaultValue = ''): string => {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] || defaultValue : param;
};

const getArrayParam = (param: string | string[] | null | undefined): string[] => {
  if (!param) return [];
  const str = Array.isArray(param) ? param[0] : param;
  return str.split(',').map(s => s.trim()).filter(Boolean);
};

// 检查URL是否有效
const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  // 检查是否以http(s)或/开头
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return true;
  }
  
  return false;
};

export default function Home() {  
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();  // use useSearchParams hook
  


  // use searchParams.get() method to get parameters
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

  // get sidebar position from settings
  const postsPerPage = useSetting('posts.perPage', 10); 

  // get home banner image url from settings
  const defaultBannerUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCAvMmY596FeQcfcATBZ7OCdgRlSZliPxjcpZQUcZDqH5aEwjRN_P38-l88OIVnA9PyzIWRGnVNwbjVmCoZOZ_MnIY9KnnrpDWEWyOKr74u0BfuxcU8SCMdy_m4R1XJrfQAbbPvd_LOUHwPGiRA7iZZLHNUz2tdANkx_VRCWWEB9fN6A1KhjUB5sAv03TuX4i4LtLrekE7qhDDqrMb2yCjou6oipdZSlw5L4upEMuuXII_n8xAuCdFTVn0_RDqCdKy6rXtMwHOp5CE";
  const homeBanner = useSetting('appearance.homeBanner', defaultBannerUrl);

  // get home banner image url for mobile from settings
  const homeBannerMobile = useSetting('appearance.homeBannerMobile', homeBanner);
  
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await postApi.getAllPosts({
        page: currentPage,
        limit: Number(postsPerPage), // use posts per page from settings
        tag: tagsParam.length > 0 ? tagsParam.join(',') : undefined,
        category: category || undefined,
        search: search || undefined,
        sort,
        lang: locale
      });
      setArticles(response.posts);
      setTotalPages(Math.ceil(response.total / Number(postsPerPage)));
      setTotalArticles(response.total);
      setError(null);
      setLoading(false);
    } catch (err: unknown) {
      // check if it is a network error (backend not started)
      const isNetworkError = err instanceof Error && 
        (err.message.includes('network') || 
         err.message.includes('fetch') || 
         err.message.includes('connection') ||
         err.message.includes('Network Error'));
      
      if (!isNetworkError) {
        // for non-network errors, show error message and stop loading state
        const errorMessage = err instanceof Error ? err.message : 'Failed to get articles';
        setError(errorMessage);
        setArticles([]);
        setLoading(false);
      }
      // for network errors, keep loading state to true, continue showing skeleton screen
    }
  }, [currentPage, sort, tagsKey, category, search, postsPerPage]);

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

  // 确保banner URL有效
  const getValidBannerUrl = (url: string | null | undefined): string => {
    if (!url) return defaultBannerUrl;
    if (isValidUrl(url)) return url;
    return defaultBannerUrl;
  };
  
  // 处理后的banner URL
  const processedHomeBanner = getValidBannerUrl(homeBanner);
  const processedMobileBanner = getValidBannerUrl(homeBannerMobile);
  
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // filter by tags
    if (tagsParam.length > 0) {
      result = result.filter(article => 
        Array.isArray(article.tags) &&
        article.tags.some(t => tagsParam.includes(t?.slug)));
    }

    // filter by category
    if (category) {
      result = result.filter(article => 
        Array.isArray(article.categories) && 
        article.categories.some(c => c?.slug === category))
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
        result.sort((a, b) => b.views - a.views);
        break;
    }

    return result;
  }, [articles, sort, tagsParam, category, search]);

  const handleSearch = (query: string) => {
    router.push(`/${locale}?search=${encodeURIComponent(query)}`);
  };

  const handleTagsChange = (tags: string[]) => {   // main change here
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

  
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* repositioned filter area - horizontal layout */}
      <div className="bg-white border-b border-[#f0f2f5] py-4">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em]">Filter</h2>
            <div className="flex flex-wrap flex-1 md:flex-initial gap-3 items-center">
              <FilterSidebar
                tags={tags}
                activeTags={tagsParam}
                categories={categories}
                activeCategory={category}
                sortOrder={sort as SortOrder}
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
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
            Latest Posts
          </h2>

          {/* article list area - modify grid layout */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-4">{error}</div>
          ) : filteredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map(article => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
                
              {/* pagination component */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center p-4">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex size-10 items-center justify-center text-[#111418] disabled:text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                    </svg>
                  </button>
                    
                  {/* page number button */}
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`text-sm ${currentPage === pageNum 
                          ? 'font-bold bg-[#f0f2f5]' 
                          : 'font-normal'} leading-normal flex size-10 items-center justify-center text-[#111418] rounded-full`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                    
                  {totalPages > 5 && <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111418] rounded-full">...</span>}
                    
                  {totalPages > 5 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111418] rounded-full"
                    >
                      {totalPages}
                    </button>
                  )}
                    
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex size-10 items-center justify-center text-[#111418] disabled:text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-[#111418] py-10">{t('noArticlesFound')}</div>
          )}
        </div>
      </div>
    </main>
  );
}
