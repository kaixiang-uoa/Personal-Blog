"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { SearchInput } from "../components/ui/SearchInput"
import { tagService } from "../services"
import { Loading } from "../components/ui/loading"
import { ErrorMessage } from "../components/ui/error-message"

export default function TagsPage() {
  const [tags, setTags] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentTag, setCurrentTag] = useState(null)
  const [newTag, setNewTag] = useState({
    name: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // 加载标签数据
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true)
        setError("")
        
        const data = await tagService.getTags()
        
        
        // 确保返回的数据是数组
        const tagsArray = Array.isArray(data) ? data : []
        setTags(tagsArray)
      } catch (err) {
        console.error("加载标签失败:", err)
        setError("加载标签失败: " + (err.message || "未知错误"))
        setTags([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTags()
  }, [])

  // 筛选标签
  const filteredTags = tags.filter(
    (tag) =>
      (tag.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (tag.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
  )

  // 添加新标签
  const handleAddTag = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      
      // 准备标签数据
      const tagData = {
      name: newTag.name,
      description: newTag.description,
    }
      
      // 调用API创建标签
      const response = await tagService.createTag(tagData)
      
      // 更新标签列表
      setTags([...tags, response])
      
      // 重置表单并关闭模态框
    setNewTag({
      name: "",
      description: "",
    })
    setShowAddModal(false)
    } catch (err) {
      console.error("创建标签失败:", err)
      setError("创建标签失败: " + (err.message || "未知错误"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // 编辑标签
  const handleEditTag = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      
      // 调用API更新标签
      const tagId = currentTag.id || currentTag._id
      await tagService.updateTag(tagId, currentTag)
      
      // 更新标签列表
      const updatedTags = tags.map((tag) => ((tag.id || tag._id) === tagId ? currentTag : tag))
    setTags(updatedTags)
    setShowEditModal(false)
    } catch (err) {
      console.error("更新标签失败:", err)
      setError("更新标签失败: " + (err.message || "未知错误"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // 删除标签
  const handleDeleteTag = async (id) => {
    if (window.confirm("确定要删除这个标签吗？")) {
      try {
        setIsLoading(true)
        setError("")
        
        // 调用API删除标签
        await tagService.deleteTag(id)
        
        // 更新标签列表
        setTags(tags.filter((tag) => (tag.id || tag._id) !== id))
      } catch (err) {
        console.error("删除标签失败:", err)
        setError("删除标签失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
  }

  // 渲染加载状态
  if (isLoading && tags.length === 0) {
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
            onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索标签..."
          />
        <button
          className="flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          添加标签
        </button>
      </div>

      {/* 标签列表 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <div key={tag.id || tag._id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{tag.name}</h3>
                <div className="flex items-center space-x-1">
                  <button
                    className="p-1 rounded-md hover:bg-gray-100 text-blue-600"
                    title="编辑"
                    onClick={() => {
                      setCurrentTag(tag)
                      setShowEditModal(true)
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 rounded-md hover:bg-gray-100 text-red-600"
                    title="删除"
                      onClick={() => handleDeleteTag(tag.id || tag._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{tag.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500">文章数：{tag.post_count || 0}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
            没有找到匹配的标签
          </div>
        )}
      </div>

      {/* 添加标签模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">添加新标签</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  标签名称
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  描述
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
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
                onClick={handleAddTag}
                disabled={!newTag.name || isSubmitting}
              >
                {isSubmitting ? "处理中..." : "添加"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑标签模态框 */}
      {showEditModal && currentTag && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">编辑标签</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  标签名称
                </label>
                <input
                  type="text"
                  id="edit-name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentTag.name}
                  onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
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
                  value={currentTag.description}
                  onChange={(e) => setCurrentTag({ ...currentTag, description: e.target.value })}
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
                onClick={handleEditTag}
                disabled={!currentTag.name || isSubmitting}
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
