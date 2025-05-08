"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  FileText,
  Filter,
  Calendar,
  User,
  Tag,
  ChevronDown,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { postService, categoryService } from "../services"
import { Loading } from "../components/ui/loading"
import { ErrorMessage } from "../components/ui/error-message"
import { useAppContext } from "../context/AppContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

export default function ContentManagementPage() {
  // 获取AppContext
  const { navigateToArticleEditor } = useAppContext()

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
  const [activeTab, setActiveTab] = useState("all")
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
        const [postsData, categoriesData] = await Promise.all([postService.getPosts(), categoryService.getCategories()])

        // 确保articles总是数组，即使API返回不符合预期的数据
        setArticles(Array.isArray(postsData) ? postsData : [])
        // 同样确保categories也是数组
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } catch (err) {
        console.error("加载数据失败:", err)
        setError("加载数据失败: " + (err.message || "未知错误"))
        // 发生错误时设置为空数组
        setArticles([])
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // 筛选文章
  const filteredArticles = Array.isArray(articles)
    ? articles.filter((article) => {
        // 获取可搜索的作者文本
        let authorText = ""
        if (article.author) {
          if (typeof article.author === "object") {
            authorText = (article.author.displayName || article.author.username || "").toLowerCase()
          } else {
            authorText = article.author.toString().toLowerCase()
          }
        }

        // 基本搜索条件
        const matchesSearch =
          (article.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (article.category?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          authorText.includes(searchTerm.toLowerCase())

        // 标签筛选
        if (activeTab === "all") {
          return matchesSearch
        } else if (activeTab === "published") {
          return matchesSearch && article.status === "已发布"
        } else if (activeTab === "draft") {
          return matchesSearch && article.status === "草稿"
        }

        return matchesSearch
      })
    : []

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

      // 使用_id或id作为文章标识
      const articleId = currentArticle._id || currentArticle.id
      await postService.updatePost(articleId, currentArticle)

      // 更新文章列表，处理ID可能是id或_id的情况
      const updatedArticles = articles.map((article) =>
        (article._id || article.id) === (currentArticle._id || currentArticle.id) ? currentArticle : article,
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

        // 更新文章列表，处理ID可能是id或_id的情况
        setArticles(articles.filter((article) => (article.id || article._id) !== id))
      } catch (err) {
        console.error("删除文章失败:", err)
        setError("删除文章失败: " + (err.message || "未知错误"))
      } finally {
        setIsLoading(false)
      }
    }
  }

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return "未知日期"

    try {
      const date = typeof dateString === "string" ? new Date(dateString) : new Date(dateString)

      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString.split("T")[0] || "未知日期"
    }
  }

  // 获取文章日期
  const getArticleDate = (article) => {
    if (article.created_at) {
      return formatDate(article.created_at)
    } else if (article.date) {
      return formatDate(article.date)
    }
    return "未知日期"
  }

  // 获取作者名称
  const getAuthorName = (author) => {
    if (!author) return "未知作者"

    if (typeof author === "object") {
      return author.displayName || author.username || "未知作者"
    }

    return author.toString()
  }

  // 渲染加载状态
  if (isLoading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loading />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 页面标题区 - 统一样式和间距 */}
      <header className="border-b border-border/60 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">内容管理</h1>
        <p className="text-muted-foreground mt-2">管理、编辑和发布您的文章内容</p>
      </header>

      {/* 错误信息区域 */}
      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onClose={() => setError("")} />
        </div>
      )}

      {/* 内容区域 - 统一间距 */}
      <section className="space-y-8">
        {/* 控制栏 */}
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索文章标题、分类或作者..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>筛选条件</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">分类</DropdownMenuLabel>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id || category._id}>{category.name}</DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">状态</DropdownMenuLabel>
                <DropdownMenuItem>已发布</DropdownMenuItem>
                <DropdownMenuItem>草稿</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigateToArticleEditor()}>
            <Plus className="mr-2 h-4 w-4" />
            创建文章
          </Button>
        </div>

        {/* 标签页和文章列表 */}
        <div className="border-t border-border/40 pt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
              <TabsTrigger value="all">全部文章</TabsTrigger>
              <TabsTrigger value="published">已发布</TabsTrigger>
              <TabsTrigger value="draft">草稿</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {/* 文章列表 */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <Card key={article._id || article.id} className="overflow-hidden hover:shadow-md transition-all">
                      <CardHeader className="p-4 pb-2 space-y-2">
                        <div className="flex justify-between items-start">
                          <Badge variant={article.status === "已发布" ? "success" : "secondary"} className="mb-2">
                            {article.status === "已发布" ? (
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                            ) : (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {article.status}
                          </Badge>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigateToArticleEditor(article)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                编辑
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                预览
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteArticle(article._id || article.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <CardTitle
                          className="text-lg font-semibold line-clamp-2 hover:text-primary cursor-pointer"
                          onClick={() => navigateToArticleEditor(article)}
                        >
                          {article.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-col space-y-3 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Tag className="mr-2 h-3.5 w-3.5" />
                            <span>{article.category || "未分类"}</span>
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <User className="mr-2 h-3.5 w-3.5" />
                            <span>{getAuthorName(article.author)}</span>
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-3.5 w-3.5" />
                            <span>{getArticleDate(article)}</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => navigateToArticleEditor(article)}>
                                <Edit2 className="mr-2 h-3.5 w-3.5" />
                                编辑
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>编辑文章内容</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteArticle(article._id || article.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>删除文章</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full bg-muted/30 rounded-lg border border-border p-8 text-center">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold">没有找到文章</h3>
                      <p className="text-muted-foreground mt-2 mb-6">
                        {searchTerm ? "没有找到匹配的文章，请尝试其他搜索条件" : "开始创建您的第一篇文章吧"}
                      </p>
                      {!searchTerm && (
                        <Button onClick={() => navigateToArticleEditor()}>
                          <Plus className="mr-2 h-4 w-4" />
                          创建文章
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 添加文章对话框 */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>添加新文章</DialogTitle>
            <DialogDescription>填写以下信息创建新文章。创建后可以进入编辑器编辑详细内容。</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">文章标题</Label>
              <Input
                id="title"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                placeholder="输入文章标题"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">分类</Label>
                <Select
                  value={newArticle.category}
                  onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id || category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">状态</Label>
                <Select
                  value={newArticle.status}
                  onValueChange={(value) => setNewArticle({ ...newArticle, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="草稿">草稿</SelectItem>
                    <SelectItem value="已发布">已发布</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">内容摘要</Label>
              <Textarea
                id="content"
                rows={5}
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                placeholder="输入文章摘要内容"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              取消
            </Button>
            <Button onClick={handleAddArticle} disabled={isSubmitting || !newArticle.title}>
              {isSubmitting ? "提交中..." : "创建文章"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑文章对话框 */}
      <Dialog open={showEditModal && currentArticle} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>编辑文章</DialogTitle>
            <DialogDescription>修改文章信息。如需编辑详细内容，请使用内容编辑器。</DialogDescription>
          </DialogHeader>

          {currentArticle && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">文章标题</Label>
                <Input
                  id="edit-title"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">分类</Label>
                  <Select
                    value={currentArticle.category}
                    onValueChange={(value) => setCurrentArticle({ ...currentArticle, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id || category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-status">状态</Label>
                  <Select
                    value={currentArticle.status}
                    onValueChange={(value) => setCurrentArticle({ ...currentArticle, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="草稿">草稿</SelectItem>
                      <SelectItem value="已发布">已发布</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-content">内容摘要</Label>
                <Textarea
                  id="edit-content"
                  rows={5}
                  value={currentArticle.content || ""}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              取消
            </Button>
            <Button onClick={handleEditArticle} disabled={isSubmitting || !currentArticle?.title}>
              {isSubmitting ? "保存中..." : "保存更改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

