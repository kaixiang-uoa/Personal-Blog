"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Search, Trash2, Download, Grid, List, ImageIcon } from "lucide-react"
import { SearchInput } from "../components/ui/SearchInput"
import { mediaService } from "../services"
import { Loading } from "../components/ui/loading"
import { ErrorMessage } from "../components/ui/error-message"

export default function MediaPage() {
  const fileInputRef = useRef(null)
  const [media, setMedia] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid 或 list
  const [selectedMedia, setSelectedMedia] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newMedia, setNewMedia] = useState({
    name: "",
    file: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  
  // 加载媒体数据
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true)
        setError("")
        
        const data = await mediaService.getMedia()
        
        
        // 确保返回的数据是数组
        const mediaArray = Array.isArray(data) ? data : []
        setMedia(mediaArray)
      } catch (err) {
        console.error("加载媒体失败:", err)
        setError("加载媒体失败: " + (err.message || "未知错误"))
        setMedia([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchMedia()
  }, [])

  // 筛选媒体
  const filteredMedia = media.filter(
    (item) =>
      (item.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.type?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
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
  const handleDeleteSelected = async () => {
    if (selectedMedia.length === 0) return

    if (window.confirm(`确定要删除已选择的 ${selectedMedia.length} 个媒体文件吗？`)) {
      try {
        setIsLoading(true)
        setError("")
        
        // 并行删除所有选中的媒体文件
        await Promise.all(selectedMedia.map(id => mediaService.deleteMedia(id)))
        
        // 更新媒体列表
        setMedia(media.filter((item) => !selectedMedia.includes(item.id)))
        setSelectedMedia([])
      } catch (err) {
        console.error("删除媒体失败:", err)
        setError("删除媒体失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
  }

  // 准备上传文件
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setNewMedia({
        name: selectedFile.name,
        file: selectedFile,
      })
    }
  }

  // 添加新媒体
  const handleAddMedia = async () => {
    if (!newMedia.file) {
      setError("请选择要上传的文件")
      return
    }
    
    try {
      setIsUploading(true)
      setError("")
      
      // 创建FormData对象
      const formData = new FormData()
      formData.append('file', newMedia.file)
      
      // 如果有自定义名称，也添加到表单
      if (newMedia.name && newMedia.name !== newMedia.file.name) {
        formData.append('name', newMedia.name)
      }
      
      // 调用API上传文件
      const response = await mediaService.uploadMedia(formData)
      
      // 更新媒体列表
      setMedia([response, ...media])
      
      // 重置表单并关闭模态框
      setNewMedia({
        name: "",
        file: null,
      })
      setShowUploadModal(false)
    } catch (err) {
      console.error("上传媒体失败:", err)
      setError("上传媒体失败: " + (err.message || "未知错误"))
    } finally {
      setIsUploading(false)
    }
  }

  // 删除单个媒体
  const handleDeleteMedia = async (id) => {
    if (window.confirm("确定要删除这个媒体文件吗？")) {
      try {
        setIsLoading(true)
        setError("")
        
        // 调用API删除媒体
        await mediaService.deleteMedia(id)
        
        // 更新媒体列表
        setMedia(media.filter((item) => item.id !== id))
        setSelectedMedia(selectedMedia.filter((item) => item !== id))
      } catch (err) {
        console.error("删除媒体失败:", err)
        setError("删除媒体失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
  }
  
  // 格式化文件大小
  const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return "未知大小"
    
    if (typeof sizeInBytes === 'string') {
      return sizeInBytes // 如果已经是格式化的字符串，直接返回
    }
    
    const units = ['B', 'KB', 'MB', 'GB']
    let size = parseInt(sizeInBytes, 10)
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  // 渲染加载状态
  if (isLoading && media.length === 0) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* 错误信息 */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      
      {/* 顶部控制栏 */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchInput 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="搜索媒体..."
          />
          <div className="flex border border-gray-200 rounded-md h-10">
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
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`group relative rounded-lg border overflow-hidden ${
                  selectedMedia.includes(item.id) ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200"
                }`}
              >
                <div
                  className="aspect-square bg-gray-100 relative"
                  onClick={() => handleSelectMedia(item.id)}
                >
                  {item.type?.startsWith("image/") ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-2 bg-white">
                  <div className="truncate text-sm font-medium mb-1">{item.name}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(item.size)}</span>
                    <span>{item.uploaded || item.created_at?.split('T')[0]}</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-1 rounded-full bg-white text-red-600 shadow-sm hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteMedia(item.id)
                    }}
                    title="删除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
              没有找到媒体文件
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
                        checked={
                          filteredMedia.length > 0 && selectedMedia.length === filteredMedia.length
                        }
                        onChange={handleSelectAll}
                      />
                      文件
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    类型
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    大小
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    上传时间
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedia.length > 0 ? (
                  filteredMedia.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600"
                            checked={selectedMedia.includes(item.id)}
                            onChange={() => handleSelectMedia(item.id)}
                          />
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatFileSize(item.size)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.uploaded || item.created_at?.split('T')[0]}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                            title="下载"
                          >
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-sm text-center text-gray-500">
                      没有找到媒体文件
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 上传文件模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">上传文件</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                  选择文件
                </label>
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">点击或拖拽上传文件</p>
                    <button
                      type="button"
                      className="px-3 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                    >
                      选择文件
                    </button>
                  </div>
                  {newMedia.file && (
                    <div className="mt-4 text-sm text-gray-500">已选择: {newMedia.file.name}</div>
                  )}
                </div>
              </div>
              {newMedia.file && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    自定义名称（可选）
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newMedia.name}
                    onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
                    placeholder="留空则使用原文件名"
                  />
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => setShowUploadModal(false)}
                disabled={isUploading}
              >
                取消
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddMedia}
                disabled={!newMedia.file || isUploading}
              >
                {isUploading ? "上传中..." : "上传"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
