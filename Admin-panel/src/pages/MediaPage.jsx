"use client"

import { useState } from "react"
import { Plus, Search, Trash2, Download, Grid, List, ImageIcon } from "lucide-react"

// 模拟媒体数据
const initialMedia = [
  {
    id: 1,
    name: "dashboard-hero.png",
    type: "image/png",
    size: "1.2 MB",
    uploaded: "2025-05-02",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 2,
    name: "user-avatar.jpg",
    type: "image/jpeg",
    size: "320 KB",
    uploaded: "2025-05-01",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 3,
    name: "product-demo.mp4",
    type: "video/mp4",
    size: "8.5 MB",
    uploaded: "2025-04-28",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 4,
    name: "chart-data.xlsx",
    type: "application/vnd.ms-excel",
    size: "450 KB",
    uploaded: "2025-04-25",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 5,
    name: "project-proposal.pdf",
    type: "application/pdf",
    size: "2.8 MB",
    uploaded: "2025-04-22",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 6,
    name: "logo-design.svg",
    type: "image/svg+xml",
    size: "85 KB",
    uploaded: "2025-04-20",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 7,
    name: "banner-image.jpg",
    type: "image/jpeg",
    size: "750 KB",
    uploaded: "2025-04-18",
    url: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 8,
    name: "audio-interview.mp3",
    type: "audio/mpeg",
    size: "5.1 MB",
    uploaded: "2025-04-15",
    url: "/placeholder.svg?height=150&width=200",
  },
]

export default function MediaPage() {
  const [media, setMedia] = useState(initialMedia)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid 或 list
  const [selectedMedia, setSelectedMedia] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newMedia, setNewMedia] = useState({
    name: "",
    file: null,
  })

  // 筛选媒体
  const filteredMedia = media.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 处理选择媒体
  const handleSelectMedia = (id) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter((item) => item !== id))
    } else {
      setSelectedMedia([...selectedMedia, id])
    }
  }

  // 全选或取消全选
  const handleSelectAll = () => {
    if (selectedMedia.length === filteredMedia.length) {
      setSelectedMedia([])
    } else {
      setSelectedMedia(filteredMedia.map((item) => item.id))
    }
  }

  // 删除选中的媒体
  const handleDeleteSelected = () => {
    if (selectedMedia.length === 0) return

    if (window.confirm(`确定要删除已选择的 ${selectedMedia.length} 个媒体文件吗？`)) {
      setMedia(media.filter((item) => !selectedMedia.includes(item.id)))
      setSelectedMedia([])
    }
  }

  // 添加新媒体
  const handleAddMedia = () => {
    // 在实际应用中，这里会处理文件上传
    const item = {
      id: media.length + 1,
      name: newMedia.name || "新文件.jpg",
      type: newMedia.file?.type || "image/jpeg",
      size: "1.2 MB",
      uploaded: new Date().toISOString().split("T")[0],
      url: "/placeholder.svg?height=150&width=200",
    }
    setMedia([item, ...media])
    setNewMedia({
      name: "",
      file: null,
    })
    setShowUploadModal(false)
  }

  // 删除单个媒体
  const handleDeleteMedia = (id) => {
    if (window.confirm("确定要删除这个媒体文件吗？")) {
      setMedia(media.filter((item) => item.id !== id))
      setSelectedMedia(selectedMedia.filter((item) => item !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* 顶部控制栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="搜索媒体..."
              className="h-9 w-full rounded-md border border-gray-300 bg-white pl-10 px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex border border-gray-200 rounded-md">
            <button
              className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
              onClick={() => setViewMode("grid")}
              title="网格视图"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
              onClick={() => setViewMode("list")}
              title="列表视图"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {selectedMedia.length > 0 && (
            <button
              className="flex items-center px-3 py-1 text-sm rounded-md bg-red-50 hover:bg-red-100 text-red-600"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              删除所选 ({selectedMedia.length})
            </button>
          )}
          <button
            className="flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={() => setShowUploadModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            上传文件
          </button>
        </div>
      </div>

      {/* 媒体列表 */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg border overflow-hidden ${
                selectedMedia.includes(item.id) ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="relative aspect-square bg-gray-100">
                {item.type.startsWith("image/") ? (
                  <img src={item.url || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-xs text-gray-500">{item.type.split("/")[1]}</span>
                    </div>
                  </div>
                )}
                <input
                  type="checkbox"
                  className="absolute top-2 left-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedMedia.includes(item.id)}
                  onChange={() => handleSelectMedia(item.id)}
                />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">{item.size}</div>
                <div className="flex items-center justify-between mt-2">
                  <button className="p-1 rounded-md hover:bg-gray-100 text-gray-600" title="下载">
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 rounded-md hover:bg-gray-100 text-red-600"
                    title="删除"
                    onClick={() => handleDeleteMedia(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedMedia.length === filteredMedia.length && filteredMedia.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  文件名
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  类型
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  大小
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  上传日期
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedia.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 ${selectedMedia.includes(item.id) ? "bg-blue-50" : ""}`}>
                  <td className="px-3 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedMedia.includes(item.id)}
                      onChange={() => handleSelectMedia(item.id)}
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-100 flex items-center justify-center rounded mr-2">
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{item.type.split("/")[1]}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{item.uploaded}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 rounded-md hover:bg-gray-100 text-gray-600" title="下载">
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 rounded-md hover:bg-gray-100 text-red-600"
                        title="删除"
                        onClick={() => handleDeleteMedia(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 上传文件模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">上传文件</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-3">拖拽文件到这里，或点击浏览</p>
                  <label className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium cursor-pointer">
                    浏览文件
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setNewMedia({ ...newMedia, file: e.target.files[0], name: e.target.files[0]?.name || "" })
                      }
                    />
                  </label>
                </div>
              </div>
              {newMedia.file && (
                <div className="text-sm">
                  <p className="font-medium">已选择文件：</p>
                  <p>{newMedia.name}</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => setShowUploadModal(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddMedia}
              >
                上传
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
