"use client"

import { useState, useEffect, useCallback } from "react"
import { useAppContext } from "../context/AppContext"
import { postService, categoryService } from "../services"
import { Save, ArrowLeft, Image, Calendar, Tag, CheckCircle2 } from "lucide-react"
import { Loading } from "../components/ui/loading"
import { ErrorMessage } from "../components/ui/error-message"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import ImageExtension from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

// 简单的Tiptap工具栏按钮组件
const MenuButton = ({ onClick, active, disabled, children }) => (
  <button
    onClick={onClick}
    className={`p-2 text-sm rounded-md ${
      active 
        ? 'bg-blue-100 text-blue-800' 
        : 'text-gray-600 hover:bg-gray-100'
    } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export default function ArticleEditorPage() {
  const { currentArticle, isEditingArticle, returnToContentPage } = useAppContext()
  const [article, setArticle] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    status: "草稿",
    featured_image: null,
  })
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  
  // 初始化Tiptap编辑器
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageExtension,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: '开始撰写您的文章内容...',
      }),
    ],
    content: article.content,
    onUpdate: ({ editor }) => {
      setArticle(prev => ({ ...prev, content: editor.getHTML() }))
    },
  })
  
  // 当文章内容变化时更新编辑器内容
  useEffect(() => {
    if (editor && article.content !== editor.getHTML()) {
      editor.commands.setContent(article.content)
    }
  }, [article.content, editor])

  // 加载分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories()
        setCategories(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("加载分类失败:", err)
        setError("加载分类失败: " + (err.message || "未知错误"))
      }
    }

    fetchCategories()
  }, [])

  // 如果是编辑模式，加载文章数据
  useEffect(() => {
    if (isEditingArticle && currentArticle) {
      setArticle({
        ...currentArticle,
        // 确保所有必要字段都有值
        content: currentArticle.content || "",
        tags: currentArticle.tags || [],
        featured_image: currentArticle.featured_image || null,
      })
    }
  }, [isEditingArticle, currentArticle])

  // 处理文章保存
  const handleSaveArticle = async (publishStatus = null) => {
    try {
      // 验证必填字段
      if (!article.title.trim()) {
        setError("文章标题不能为空")
        return
      }

      setIsSaving(true)
      setError("")

      // 如果指定了发布状态，则使用该状态
      const articleToSave = {
        ...article,
        status: publishStatus || article.status,
      }

      let response
      if (isEditingArticle) {
        // 更新文章
        response = await postService.updatePost(currentArticle.id, articleToSave)
      } else {
        // 创建新文章
        response = await postService.createPost(articleToSave)
      }

      setSuccessMessage(
        `文章${isEditingArticle ? "更新" : "创建"}成功${
          publishStatus === "已发布" ? "并已发布" : ""
        }`
      )

      // 3秒后清除成功消息
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)

      // 如果是创建文章，创建成功后清空表单或返回列表
      if (!isEditingArticle) {
        setArticle({
          title: "",
          content: "",
          category: "",
          tags: [],
          status: "草稿",
          featured_image: null,
        })
      }
    } catch (err) {
      console.error("保存文章失败:", err)
      setError("保存文章失败: " + (err.message || "未知错误"))
    } finally {
      setIsSaving(false)
    }
  }

  // 处理标题变化
  const handleTitleChange = (e) => {
    setArticle({ ...article, title: e.target.value })
  }

  // 处理分类变化
  const handleCategoryChange = (e) => {
    setArticle({ ...article, category: e.target.value })
  }

  // 处理状态变化
  const handleStatusChange = (e) => {
    setArticle({ ...article, status: e.target.value })
  }

  // 编辑器菜单按钮回调
  const addImage = useCallback(() => {
    const url = window.prompt('输入图片URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const url = window.prompt('输入链接URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
  }, [editor])

  // 渲染加载状态
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* 错误和成功消息 */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      {successMessage && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span>{successMessage}</span>
          </div>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => setSuccessMessage("")}
          >
            ×
          </button>
        </div>
      )}

      {/* 顶部控制栏 */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          className="flex items-center px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
          onClick={returnToContentPage}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </button>
        <div className="flex items-center space-x-2">
          {article.status !== "已发布" && (
            <button
              className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium"
              onClick={() => handleSaveArticle("已发布")}
              disabled={isSaving}
            >
              {isSaving ? "处理中..." : "发布"}
            </button>
          )}
          <button
            className="flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={() => handleSaveArticle()}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {/* 编辑区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主编辑区 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 标题输入 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <input
              type="text"
              className="w-full text-3xl font-bold border-none outline-none p-0 focus:ring-0 focus:outline-none placeholder-gray-400"
              placeholder="输入文章标题..."
              value={article.title}
              onChange={handleTitleChange}
            />
          </div>

          {/* Tiptap富文本编辑器 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {editor && (
              <div className="border-b p-2 flex flex-wrap gap-1">
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  active={editor.isActive('bold')}
                >
                  粗体
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  active={editor.isActive('italic')}
                >
                  斜体
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  active={editor.isActive('underline')}
                >
                  下划线
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  active={editor.isActive('heading', { level: 2 })}
                >
                  标题2
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  active={editor.isActive('heading', { level: 3 })}
                >
                  标题3
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  active={editor.isActive('bulletList')}
                >
                  无序列表
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  active={editor.isActive('orderedList')}
                >
                  有序列表
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  active={editor.isActive('blockquote')}
                >
                  引用
                </MenuButton>
                <MenuButton onClick={setLink} active={editor.isActive('link')}>
                  链接
                </MenuButton>
                <MenuButton onClick={addImage}>
                  插入图片
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  active={editor.isActive({ textAlign: 'left' })}
                >
                  左对齐
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  active={editor.isActive({ textAlign: 'center' })}
                >
                  居中
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  active={editor.isActive({ textAlign: 'right' })}
                >
                  右对齐
                </MenuButton>
              </div>
            )}
            <div className="p-4 min-h-[400px]">
              <EditorContent editor={editor} className="min-h-[380px] prose prose-sm max-w-none" />
            </div>
          </div>
        </div>

        {/* 侧边栏设置 */}
        <div className="space-y-6">
          {/* 文章状态 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">文章状态</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  当前状态
                </label>
                <select
                  id="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={article.status}
                  onChange={handleStatusChange}
                >
                  <option value="草稿">草稿</option>
                  <option value="已发布">已发布</option>
                </select>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {isEditingArticle
                    ? `上次编辑: ${currentArticle?.updated_at || "未知"}`
                    : "创建后可见编辑时间"}
                </span>
              </div>
            </div>
          </div>

          {/* 分类设置 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">分类</h3>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                选择分类
              </label>
              <select
                id="category"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={article.category}
                onChange={handleCategoryChange}
              >
                <option value="">选择分类</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 特色图片 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">特色图片</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="flex flex-col items-center">
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">点击或拖拽上传图片</p>
                <label className="px-3 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  选择图片
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // 在实际应用中，这里应该处理图片上传
                        setArticle({ ...article, featured_image: e.target.files[0] })
                      }
                    }}
                  />
                </label>
              </div>
              {article.featured_image && (
                <div className="mt-4 text-sm text-gray-500">
                  已选择: {typeof article.featured_image === 'string' 
                    ? article.featured_image 
                    : article.featured_image.name}
                </div>
              )}
            </div>
          </div>

          {/* 标签 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                标签
              </div>
            </h3>
            <div>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="输入标签，用逗号分隔"
                value={article.tags.join(", ")}
                onChange={(e) => {
                  const tagsText = e.target.value
                  const tagsArray = tagsText.split(",").map((tag) => tag.trim()).filter(Boolean)
                  setArticle({ ...article, tags: tagsArray })
                }}
              />
              <div className="mt-2 text-xs text-gray-500">用逗号分隔多个标签</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 