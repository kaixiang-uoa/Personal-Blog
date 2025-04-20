"use client"
import { useState, useEffect, useMemo } from "react" // 导入 useMemo
import type React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "./components/Navbar"
import ArticleCard from "./components/ArticleCard"
import TagFilter from "./components/TagFilter"
import FilterSidebar from "./components/FilterSidebar"
import { Article, Category, Tag } from "../services/interface"
import { postApi, tagApi, categoryApi } from "@/services/api"
import { PostsApiResponse } from "@/services/interface"
import { CategoriesApiResponse } from "@/services/interface"

export default function Home() {
  // --- Hooks ---
  const searchParams = useSearchParams()
  const router = useRouter()

  // --- State ---
  const [articles, setArticles] = useState<Article[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1) // 添加 <number> 类型注解
  const [searchTerm, setSearchTerm] = useState("") // 用于搜索输入框
  const [isClient, setIsClient] = useState(false)

  // --- 从 URL 派生的稳定状态 (使用 useMemo) ---
  const categoryFilter = useMemo(() => searchParams.get("category") || "", [searchParams])
  const tagParams = useMemo(() => searchParams.getAll("tag"), [searchParams])
  const searchTermParam = useMemo(() => searchParams.get("search") || "", [searchParams]) // 从 URL 读取的搜索词
  const startDateParam = useMemo(() => searchParams.get("startDate"), [searchParams])
  const endDateParam = useMemo(() => searchParams.get("endDate"), [searchParams])

  // 从 URL 参数派生的日期对象 (用于初始化和比较)
  const startDateUrl = useMemo(() => startDateParam ? new Date(startDateParam) : null, [startDateParam])
  const endDateUrl = useMemo(() => endDateParam ? new Date(endDateParam) : null, [endDateParam])

  // 本地日期状态 (用于 DatePicker，并与 URL 同步)
  const [startDate, setStartDate] = useState<Date | null>(startDateUrl)
  const [endDate, setEndDate] = useState<Date | null>(endDateUrl)

  // --- Effects ---

  // 客户端挂在后设置 isClient 为 true
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 同步 URL 参数变化到本地日期状态（仅在客户段执行）
  useEffect(() => {
    // 确保只在客户端执行，避免 SSR 时 new Date() 可能引发的问题
    if (isClient) {
        const initialStartDate = startDateParam ? new Date(startDateParam) : null;
        const initialEndDate = endDateParam ? new Date(endDateParam) : null;
        setStartDate(initialStartDate);
        setEndDate(initialEndDate);
    }
  }, [startDateParam, endDateParam, isClient]) // 添加 isClient 依赖

  // 同步 URL 参数变化到搜索框状态
   useEffect(() => {
    setSearchTerm(searchTermParam);
  }, [searchTermParam]);

  // 主要数据获取 Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // 重置错误状态

        // 获取文章列表 - 假设 postApi 返回的是 PostsApiResponse 结构
        const postsResponse: PostsApiResponse = await postApi.getAllPosts(
          page,
          6,
          tagParams.join(","),
          categoryFilter,
          searchTermParam,
          startDateParam || undefined,
          endDateParam || undefined
        );

        // --- 提取结束 ---

        // 使用 postsResponse.data 访问文章数组
        setArticles(Array.isArray(postsResponse.data) ? postsResponse.data : []);
        const total = postsResponse.total ?? postsResponse.meta?.total ?? 0;
        setTotalPages(Math.ceil(total / 6));

        // 获取标签列表
        // --- 重新添加 .data 提取以匹配 AxiosResponse 类型 ---
        const tagsResponse = await tagApi.getAllTags(); // AxiosResponse
        // console.log("Tags Response Axios:", tagsResponseAxios); // 打印 Axios 响应
        // const tagsResponse: TagsApiResponse = tagsResponseAxios.data;
        // --- 提取结束 ---

        // 使用 tagsResponse.tags 访问标签数组
        setTags(tagsResponse.tags);


        // 获取分类列表
        // --- 同样为 categories 添加 .data 提取 ---
        const categoriesResponse: CategoriesApiResponse = await categoryApi.getAllCategories();
         // --- 提取结束 ---
        // 使用 categoriesResponse.data 访问分类数组
        setCategories(categoriesResponse.categories);

      } catch (err) {
        console.error("获取数据失败:", err);
        setError("获取数据失败，请稍后再试");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, categoryFilter, tagParams, searchTermParam, startDateParam, endDateParam]);

  // --- 事件处理函数 ---

  // 更新URL参数的辅助函数
  const updateUrlParams = (paramsToUpdate: {
    page?: number | null // 添加 page 参数
    tags?: string[] | null
    category?: string | null
    startDate?: string | null
    endDate?: string | null
    search?: string | null
  }) => {
    const newParams = new URLSearchParams(searchParams.toString())

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        newParams.delete("tag") // 清除旧的 tag
        value.forEach(tag => newParams.append("tag", tag))
      } else if (key === 'page') {
         // 确保 value 是数字类型再进行比较
         if (typeof value === 'number' && value > 1) {
           newParams.set(key, String(value));
         } else {
           newParams.delete(key); // 第一页或非数字时不显示 page 参数
         }
      } else if (value !== undefined && value !== null && value !== '') {
        // 对于其他 key，确保 value 不是数组 (虽然类型定义里没有，但以防万一)
        if (!Array.isArray(value)) {
            newParams.set(key, String(value))
        }
      } else {
        // 如果值为 null, undefined 或空字符串，则删除参数
        newParams.delete(key)
      }
    })

    // 重置页码到第一页，除非明确指定了 page 参数
    if (paramsToUpdate.page === undefined) {
        newParams.delete("page");
    }

    router.push(`/?${newParams.toString()}`, { scroll: false }) // 使用 scroll: false 避免页面滚动
  }

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // 触发 useEffect 之前重置页码状态
    updateUrlParams({ search: searchTerm, page: null }) // 更新 URL，page 设为 null 以删除
  }

  // 处理标签筛选变更 (由 TagFilter 调用)
  const handleTagsChange = (selectedTags: string[]) => {
    setPage(1)
    updateUrlParams({ tags: selectedTags, page: null })
  }

  // 处理侧边栏筛选变更 (由 FilterSidebar 调用)
  const handleFilterChange = (type: "tags" | "category" | "dateRange", value: any) => {
    setPage(1) // 重置页码状态

    if (type === "tags") {
      updateUrlParams({ tags: value, page: null })
    } else if (type === "category") {
      updateUrlParams({ category: value, page: null })
    }
    else if (type === "dateRange") {
      const { startDate: newStartDate, endDate: newEndDate } = value
      // 更新本地状态以反映 DatePicker 的选择
      setStartDate(newStartDate)
      setEndDate(newEndDate)
      // 更新 URL
      updateUrlParams({
        startDate: newStartDate ? newStartDate.toISOString().split("T")[0] : null,
        endDate: newEndDate ? newEndDate.toISOString().split("T")[0] : null,
        page: null
      })
    }
  }

  // 清除所有筛选条件
  const handleClearFilters = () => {
    setPage(1)
    setStartDate(null) // 重置本地日期状态
    setEndDate(null)
    setSearchTerm("") // 清空搜索框

    updateUrlParams({
      tags: [], // 清空标签
      startDate: null,
      endDate: null,
      search: null, // 清空搜索参数
      category: null, // <--- 修改这里：清除分类筛选
      page: null
    })
  }

  // 处理分页变化
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // 更新 URL 中的 page 参数 (可选，如果希望 URL 反映页码)
    // updateUrlParams({ page: newPage });
    // 注意：如果在这里更新 URL，需要确保 updateUrlParams 不会重置 page
    // 或者直接依赖 setPage 触发 useEffect 重新获取数据
    window.scrollTo(0, 0); // 切换页面时滚动到顶部
  }


  // --- 计算属性 ---
  // 检查是否有活跃的筛选条件 (基于 memoized URL 参数)
  const hasActiveFilters = tagParams.length > 0 || startDateParam || endDateParam || searchTermParam

  // --- JSX ---
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      {/* Hero Section */}
      {/* ... (保持不变) ... */}
       <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">Welcome to My Blog</h1>
          <p className="mt-3 text-xl sm:mt-4">
            Dive into my thoughts, experiences, and insights on technology and life.
          </p>
        </div>
      </section>

      {/* 分类导航 */}
      
      {categories.length > 0 && (
       
        <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center flex-wrap gap-4">
            <Link
              href="/"
              scroll={false} // 添加 scroll={false}
              onClick={() => setPage(1)} // 点击时重置页码
              className={`px-4 py-2 rounded-md ${
                !categoryFilter ? "bg-cyan-600" : "bg-gray-700"
              } hover:bg-cyan-700 transition-colors`}
            >
              全部
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/?category=${category.slug}`}
                scroll={false} // 添加 scroll={false}
                onClick={() => setPage(1)} // 点击时重置页码
                className={`px-4 py-2 rounded-md ${
                  categoryFilter === category.slug ? "bg-cyan-600" : "bg-gray-700"
                } hover:bg-cyan-700 transition-colors`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchTerm} // 使用 searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // 更新 searchTerm state
            className="w-full px-4 py-2 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-800 text-white" // 添加 text-white
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r-md">
            搜索
          </button>
        </form>
      </section>

      {/* 标签过滤器 - 移动端显示 */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tags.length > 0 && <TagFilter tags={tags} activeTags={tagParams} onTagsChange={handleTagsChange} />}
      </div>

      {/* 主内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* 侧边栏过滤器 - 桌面端显示 */}
          <div className="hidden md:block">
            {/* --- Fix 2: Remove console.log from JSX --- */}
            {/* {console.log("Rendering FilterSidebar with tags:", tags)} <-- Removed this line */}
            {/* --- Fix 2 End --- */}
            <FilterSidebar
              tags={tags}
              activeTags={tagParams}
              startDate={startDate}
              endDate={endDate}
              categories={categories}
              activeCategory={categoryFilter}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* 文章列表区域 */}
          <div>
            {/* 筛选提示 (基于 memoized URL 参数) */}
            {hasActiveFilters && (
              <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-400">筛选条件: </span>
                  {tagParams.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tagParams.map((tagSlug) => {
                        const tag = tags.find((t) => t.slug === tagSlug)
                        return (
                          <span key={tagSlug} className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                            标签: {tag?.name || tagSlug}
                          </span>
                        )
                      })}
                    </div>
                  )}
                  {/* 显示本地状态的日期，因为它们与 DatePicker 同步 */}
                  {isClient && startDate && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      从: {startDate.toLocaleDateString()}
                    </span>
                  )}
                  {isClient && endDate && (
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      至: {endDate.toLocaleDateString()}
                    </span>
                  )}
                  {searchTermParam && ( // 显示 URL 中的搜索词
                    <span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">搜索: {searchTermParam}</span>
                  )}
                </div>
                <button onClick={handleClearFilters} className="text-cyan-500 hover:text-cyan-400 md:hidden">
                  清除筛选
                </button>
              </div>
            )}

            {/* 文章标题 */}
            <h2 className="text-3xl font-extrabold text-white mb-8">
              {categoryFilter
                ? `分类: ${categories.find((c) => c.slug === categoryFilter)?.name || categoryFilter}`
                : hasActiveFilters
                  ? "筛选结果"
                  : "最新文章"}
            </h2>

            {/* 文章列表 */}
            {loading ? (
              // ... Loading state ...
              <div className="text-center py-10">
                <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-xl">加载文章中...</p>
              </div>
            ) : error ? (
              // ... Error state ...
              <div className="text-center py-10">
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-xl text-red-400">{error}</p>
                  <button
                    onClick={() => window.location.reload()} // 或者调用 fetchData
                    className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
                  >
                    重试
                  </button>
                </div>
              </div>
            ) : articles.length > 0 ? (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article._id}
                      id={article._id}
                      title={article.title}
                      summary={article.excerpt}
                      image={article.featuredImage || "/placeholder.svg?height=200&width=300"}
                      slug={article.slug}
                      publishedAt={article.publishedAt} // 保持传递，确保 ArticleCardProps 已更新
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(page - 1)} // 使用 handlePageChange
                        disabled={page === 1}
                        className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 disabled:opacity-50 hover:bg-gray-700 disabled:hover:bg-gray-800" // 添加 hover 效果
                      >
                        上一页
                      </button>

                      <span className="px-3 py-1 text-gray-400"> {/* 调整样式 */}
                        第 {page} 页 / 共 {totalPages} 页
                      </span>

                      <button
                        onClick={() => handlePageChange(page + 1)} // 使用 handlePageChange
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 disabled:opacity-50 hover:bg-gray-700 disabled:hover:bg-gray-800" // 添加 hover 效果
                      >
                        下一页
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              // ... No articles found state ...
              <div className="text-center py-10">
                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-xl text-yellow-300">没有找到符合条件的文章</p> {/* 调整颜色 */}
                  <button onClick={handleClearFilters} className="mt-4 inline-block text-cyan-500 hover:text-cyan-400 underline"> {/* 改为按钮 */}
                    清除所有筛选条件
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      {/* ... (保持不变) ... */}
       <footer className="bg-gray-800 py-6 mt-16"> {/* 添加 mt-16 */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
