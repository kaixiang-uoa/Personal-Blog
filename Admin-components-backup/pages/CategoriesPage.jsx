"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Filter, ChevronDown } from "lucide-react"
import { categoryService } from "../services"
import { Loading } from "../components/ui/loading"
import { ErrorMessage } from "../components/ui/error-message"
import { SearchInput } from "../components/ui/SearchInput"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // 加载分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        setError("")
        
        const data = await categoryService.getCategories()
        
        
        // 确保返回的数据是数组
        const categoriesArray = Array.isArray(data) ? data : []
        setCategories(categoriesArray)
        setFilteredCategories(categoriesArray)
      } catch (err) {
        console.error("加载分类失败:", err)
        setError("加载分类失败: " + (err.message || "未知错误"))
        setCategories([])
        setFilteredCategories([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  // 搜索分类
  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim() === "") {
      setFilteredCategories(categories)
    } else {
      setFilteredCategories(
        categories.filter(
          (category) =>
            (category.name?.toLowerCase() || '').includes(term.toLowerCase()) ||
            (category.description?.toLowerCase() || '').includes(term.toLowerCase()),
        ),
      )
    }
  }

  // 排序分类
  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newOrder)

    setFilteredCategories(
      [...filteredCategories].sort((a, b) => {
        if (newOrder === "asc") {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      }),
    )
  }

  // 添加新分类
  const handleAddCategory = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      
      // 准备分类数据
      const categoryData = {
      name: newCategory.name,
        slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      description: newCategory.description,
    }

      // 调用API创建分类
      const response = await categoryService.createCategory(categoryData)
      
      // 更新分类列表
      const updatedCategories = [...categories, response]
    setCategories(updatedCategories)
    setFilteredCategories(updatedCategories)
      
      // 重置表单并关闭模态框
    setNewCategory({
      name: "",
      slug: "",
      description: "",
    })
    setShowAddModal(false)
    } catch (err) {
      console.error("创建分类失败:", err)
      setError("创建分类失败: " + (err.message || "未知错误"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // 编辑分类
  const handleEditCategory = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      
      // 调用API更新分类
      await categoryService.updateCategory(currentCategory.id, currentCategory)
      
      // 更新分类列表
    const updatedCategories = categories.map((category) =>
        category.id === currentCategory.id ? currentCategory : category
    )
    setCategories(updatedCategories)
    setFilteredCategories(updatedCategories)
    setShowEditModal(false)
    } catch (err) {
      console.error("更新分类失败:", err)
      setError("更新分类失败: " + (err.message || "未知错误"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // 删除分类
  const handleDeleteCategory = async (id) => {
    if (window.confirm("确定要删除这个分类吗？")) {
      try {
        setIsLoading(true)
        setError("")
        
        // 调用API删除分类
        await categoryService.deleteCategory(id)
        
        // 更新分类列表
      const updatedCategories = categories.filter((category) => category.id !== id)
      setCategories(updatedCategories)
      setFilteredCategories(updatedCategories)
      } catch (err) {
        console.error("删除分类失败:", err)
        setError("删除分类失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
  }

  // 渲染加载状态
  if (isLoading && categories.length === 0) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* 错误信息 */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      
      {/* 顶部控制栏 */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SearchInput 
              value={searchTerm}
              onChange={handleSearch}
          placeholder="搜索分类..."
            />
        <div className="flex items-center gap-2">
          <button
            className="flex items-center h-9 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm"
            onClick={handleSort}
          >
            <Filter className="mr-1 h-4 w-4" />
            排序
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
          </button>
        <button
          className="flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          添加分类
        </button>
        </div>
      </div>

      {/* 分类列表 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id || category._id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="flex items-center space-x-1">
                  <button
                    className="p-1 rounded-md hover:bg-gray-100 text-blue-600"
                    title="编辑"
                    onClick={() => {
                      setCurrentCategory(category)
                      setShowEditModal(true)
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 rounded-md hover:bg-gray-100 text-red-600"
                    title="删除"
                      onClick={() => handleDeleteCategory(category.id || category._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500">文章数：{category.post_count || 0}</span>
                <span className="text-xs font-medium text-gray-500">别名：{category.slug}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
            没有找到分类数据
          </div>
        )}
      </div>

      {/* 添加分类模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">添加新分类</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  分类名称
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  别名
                </label>
                <input
                  type="text"
                  id="slug"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">将用于URL，留空则自动根据名称生成</p>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  描述
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => setShowAddModal(false)}
                disabled={isSubmitting}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddCategory}
                disabled={!newCategory.name || isSubmitting}
              >
                {isSubmitting ? "处理中..." : "添加"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑分类模态框 */}
      {showEditModal && currentCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">编辑分类</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  分类名称
                </label>
                <input
                  type="text"
                  id="edit-name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentCategory.name}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="edit-slug" className="block text-sm font-medium text-gray-700 mb-1">
                  别名
                </label>
                <input
                  type="text"
                  id="edit-slug"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentCategory.slug}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                  描述
                </label>
                <textarea
                  id="edit-description"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentCategory.description}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => setShowEditModal(false)}
                disabled={isSubmitting}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleEditCategory}
                disabled={!currentCategory.name || isSubmitting}
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
