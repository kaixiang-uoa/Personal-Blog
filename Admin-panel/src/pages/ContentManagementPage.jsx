"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit2, Trash2, Eye, FileText } from "lucide-react"
import { postService, categoryService } from "../services"
import { Loading } from "../components/ui/loading"
import { ErrorMessage } from "../components/ui/error-message"

export default function ContentManagementPage() {
  // 状态管理
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "",
    status: "草稿",
    content: "",
  })

  // 加载数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError("")
        
        // 并行请求数据，提高性能
        const [postsData, categoriesData] = await Promise.all([
          postService.getPosts(),
          categoryService.getCategories()
        ])
        
        setArticles(postsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("加载数据失败:", err)
        setError("加载数据失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // 筛选文章
  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 添加新文章
  const handleAddArticle = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      
      const response = await postService.createPost(newArticle)
      
      // 更新文章列表
      setArticles([response, ...articles])
      
      // 重置表单和关闭模态框
      setNewArticle({
        title: "",
        category: "",
        status: "草稿",
        content: "",
      })
      setShowAddModal(false)
    } catch (err) {
      console.error("创建文章失败:", err)
      setError("创建文章失败: " + (err.message || "未知错误"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // 编辑文章
  const handleEditArticle = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      
      await postService.updatePost(currentArticle.id, currentArticle)
      
      // 更新文章列表
      const updatedArticles = articles.map((article) => 
        article.id === currentArticle.id ? currentArticle : article
      )
      
      setArticles(updatedArticles)
      setShowEditModal(false)
    } catch (err) {
      console.error("更新文章失败:", err)
      setError("更新文章失败: " + (err.message || "未知错误"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // 删除文章
  const handleDeleteArticle = async (id) => {
    if (window.confirm("确定要删除这篇文章吗？")) {
      try {
        setIsLoading(true)
        setError("")
        
        await postService.deletePost(id)
        
        // 更新文章列表
        setArticles(articles.filter((article) => article.id !== id))
      } catch (err) {
        console.error("删除文章失败:", err)
        setError("删除文章失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
  }

  // 渲染加载状态
  if (isLoading && articles.length === 0) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* 错误信息 */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      
      {/* 顶部控制栏 */}
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="搜索文章..."
            className="h-9 w-full rounded-md border border-gray-300 bg-white pl-10 px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          添加文章
        </button>
      </div>

      {/* 文章列表 */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  标题
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  状态
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  分类
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  作者
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  日期
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.status === "已发布" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1 rounded-md hover:bg-gray-100 text-gray-600" title="查看">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 rounded-md hover:bg-gray-100 text-blue-600"
                          title="编辑"
                          onClick={() => {
                            setCurrentArticle(article)
                            setShowEditModal(true)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 rounded-md hover:bg-gray-100 text-red-600"
                          title="删除"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    {isLoading ? "加载中..." : "没有找到匹配的文章"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加文章模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">添加新文章</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  文章标题
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  分类
                </label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newArticle.category}
                  onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                >
                  <option value="">选择分类</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  状态
                </label>
                <select
                  id="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newArticle.status}
                  onChange={(e) => setNewArticle({ ...newArticle, status: e.target.value })}
                >
                  <option value="草稿">草稿</option>
                  <option value="已发布">已发布</option>
                </select>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  id="content"
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddArticle}
                disabled={isSubmitting || !newArticle.title}
              >
                {isSubmitting ? "提交中..." : "添加"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑文章模态框 */}
      {showEditModal && currentArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">编辑文章</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                  文章标题
                </label>
                <input
                  type="text"
                  id="edit-title"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                  分类
                </label>
                <select
                  id="edit-category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentArticle.category}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                >
                  <option value="">选择分类</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                  状态
                </label>
                <select
                  id="edit-status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentArticle.status}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, status: e.target.value })}
                >
                  <option value="草稿">草稿</option>
                  <option value="已发布">已发布</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  id="edit-content"
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentArticle.content || ""}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => setShowEditModal(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleEditArticle}
                disabled={isSubmitting || !currentArticle.title}
              >
                {isSubmitting ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
