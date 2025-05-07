"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Search } from "lucide-react"

// 模拟标签数据
const initialTags = [
  { id: 1, name: "JavaScript", count: 15, description: "JavaScript相关文章" },
  { id: 2, name: "React", count: 12, description: "React框架相关" },
  { id: 3, name: "CSS", count: 9, description: "CSS样式和布局" },
  { id: 4, name: "性能优化", count: 7, description: "网站性能优化技巧" },
  { id: 5, name: "Node.js", count: 6, description: "Node.js服务端开发" },
  { id: 6, name: "设计系统", count: 5, description: "UI设计系统和组件库" },
  { id: 7, name: "TypeScript", count: 8, description: "TypeScript类型系统" },
  { id: 8, name: "Vue.js", count: 10, description: "Vue.js框架相关" },
  { id: 9, name: "HTML5", count: 6, description: "HTML5新特性和API" },
  { id: 10, name: "响应式设计", count: 7, description: "响应式网页设计" },
  { id: 11, name: "SEO", count: 4, description: "搜索引擎优化" },
  { id: 12, name: "APIs", count: 5, description: "API设计与使用" },
]

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentTag, setCurrentTag] = useState(null)
  const [newTag, setNewTag] = useState({
    name: "",
    description: "",
  })

  // 筛选标签
  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 添加新标签
  const handleAddTag = () => {
    const tag = {
      id: tags.length + 1,
      name: newTag.name,
      count: 0,
      description: newTag.description,
    }
    setTags([...tags, tag])
    setNewTag({
      name: "",
      description: "",
    })
    setShowAddModal(false)
  }

  // 编辑标签
  const handleEditTag = () => {
    const updatedTags = tags.map((tag) => (tag.id === currentTag.id ? currentTag : tag))
    setTags(updatedTags)
    setShowEditModal(false)
  }

  // 删除标签
  const handleDeleteTag = (id) => {
    if (window.confirm("确定要删除这个标签吗？")) {
      setTags(tags.filter((tag) => tag.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* 顶部控制栏 */}
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="搜索标签..."
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
          添加标签
        </button>
      </div>

      {/* 标签列表 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTags.map((tag) => (
          <div key={tag.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
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
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{tag.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-500">文章数：{tag.count}</span>
              </div>
            </div>
          </div>
        ))}
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
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddTag}
                disabled={!newTag.name}
              >
                添加
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
              >
                取消
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={handleEditTag}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
