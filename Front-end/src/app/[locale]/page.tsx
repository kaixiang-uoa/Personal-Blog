"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";

import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import TagFilter from "../components/TagFilter";
import FilterSidebar from "../components/FilterSidebar";
import SortSelector from "@/components/SortSelector";
import ArticleSkeleton from "../../components/ArticleSkeleton";

import { Article, Category, Tag, PostsData, SortOrder } from "@/services/interface";
import { postApi, categoryApi, tagApi } from "@/services/api";

export default function Home() {
  const t = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams();

  // ✅ 所有筛选参数都从 URL 获取（不设中间状态）
  const categoryParam = useMemo(() => searchParams.get("category"), [searchParams]);
  const tagParams = useMemo(() => searchParams.getAll("tag"), [searchParams]);
  const searchParam = useMemo(() => searchParams.get("search"), [searchParams]);
  const pageParam = useMemo(() => searchParams.get("page"), [searchParams]);

  const validSortOrders: SortOrder[] = [
    "publishedAt-desc", "publishedAt-asc", "updatedAt-desc", "updatedAt-asc"
  ];
  const sortParam = useMemo(() => {
    const raw = searchParams.get("sort");
    return validSortOrders.includes(raw as SortOrder) ? raw as SortOrder : "publishedAt-desc";
  }, [searchParams]);

  const [searchTerm, setSearchTerm] = useState(searchParam || "");
  const [sortOrder, setSortOrder] = useState<SortOrder>(sortParam);
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchTerm(searchParam || "");
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParam, pageParam]);

  const hasActiveFilters = useMemo(() => {
    return !!(categoryParam || tagParams.length > 0 || searchParam);
  }, [categoryParam, tagParams, searchParam]);

  const updateUrlParams = (paramsToUpdate: {
    page?: number | null,
    tags?: string[] | null,
    category?: string | null,
    sort?: string | null,
    search?: string | null
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (key === "tags" && Array.isArray(value)) {
        newParams.delete("tag");
        value.forEach(tag => newParams.append("tag", tag));
      } else if (key === "page") {
        if (typeof value === "number" && value > 1) newParams.set("page", value.toString());
        else newParams.delete("page");
      } else if (typeof value === "string" && value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`/?${newParams.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchTerm || null, page: null });
  };

  const handleTagsChange = (selectedTags: string[]) => {
    updateUrlParams({ tags: selectedTags, page: null });
  };

  const handleFilterChange = (type: "tags" | "category" | "sort", value: any) => {
    if (type === "tags") {
      updateUrlParams({ tags: value, page: null });
    } else if (type === "category") {
      updateUrlParams({ category: value, page: null });
    } else if (type === "sort") {
      setSortOrder(value);
      updateUrlParams({ sort: value, page: null });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setPage(1);
    setSortOrder("publishedAt-desc");
    updateUrlParams({
      tags: [],
      category: null,
      search: null,
      sort: null,
      page: null
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await postApi.getAllPosts(
          page,
          10,
          tagParams.length > 0 ? tagParams.join(",") : undefined,
          categoryParam || undefined,
          searchTerm || undefined,
          sortOrder
        );

        if (response.success && response.data) {
          const postsData = response.data as PostsData;
          setArticles(postsData.posts);
          setTotalPages(postsData.totalPages);
          setTotalArticles(postsData.total);
        } else {
          setArticles([]);
          setError(response.message || "获取文章失败");
        }
      } catch (err: any) {
        setError(err.message || "获取文章失败");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, categoryParam, tagParams, searchTerm, sortOrder]);

  useEffect(() => {
    categoryApi.getAllCategories(locale as string).then(res => {
      setCategories(res.data?.categories || []);
    });
    tagApi.getAllTags().then(res => {
      setTags(res.data?.tags || []);
    });
  }, [locale]);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold sm:text-6xl">{t("latestArticles")}</h1>
          <p className="mt-6 text-xl max-w-3xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center flex-wrap gap-4">
          <Link
            href="/"
            scroll={false}
            onClick={() => setPage(1)}
            className={`px-4 py-2 rounded-md ${!categoryParam ? "bg-cyan-600" : "bg-gray-700"} hover:bg-cyan-700`}
          >
            {t("allCategories")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/?category=${category.slug}`}
              scroll={false}
              onClick={() => setPage(1)}
              className={`px-4 py-2 rounded-md ${categoryParam === category.slug ? "bg-cyan-600" : "bg-gray-700"} hover:bg-cyan-700`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800 text-white"
          />
          <button type="submit" className="bg-cyan-600 px-4 py-2 rounded-r-md">
            {t("search")}
          </button>
        </form>
      </section>

      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tags.length > 0 && <TagFilter tags={tags} activeTags={tagParams} onTagsChange={handleTagsChange} />}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="hidden md:block">
            <FilterSidebar
              tags={tags}
              activeTags={tagParams}
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
                  <span className="text-gray-400">{t("filterConditions")}:</span>
                  {tagParams.map((tagSlug) => {
                    const tag = tags.find(t => t.slug === tagSlug);
                    return (
                      <span key={tagSlug} className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                        {t("tag")}: {tag?.name || tagSlug}
                      </span>
                    );
                  })}
                  {searchParam && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {t("search")}: {searchParam}
                    </span>
                  )}
                </div>
                <button onClick={handleClearFilters} className="text-cyan-500 hover:text-cyan-400 md:hidden">
                  {t("clearFilters")}
                </button>
              </div>
            )}

            <div className="flex justify-end mb-6">
              <SortSelector
                value={sortOrder}
                onChange={(value) => handleFilterChange("sort", value)}
                className="md:hidden"
              />
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-8">
              {categoryParam
                ? `${t("category")}: ${categories.find((c) => c.slug === categoryParam)?.name || categoryParam}`
                : hasActiveFilters
                  ? t("filterResults")
                  : t("latestArticles")}
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <ArticleSkeleton key={i} />)}
              </div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map(article => <ArticleCard key={article._id} article={article} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                      {t("previousPage")}
                    </button>
                    <span>{t("pageInfo", { current: page, total: totalPages })}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                      {t("nextPage")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-yellow-300 py-10">{t("noArticlesFound")}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
