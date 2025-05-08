"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronDown, ChevronUp, Filter, MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// 文章数据类型
interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  status: "published" | "draft"
  publishDate: string
  updatedDate: string
  viewCount: number
}

export default function PostsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Post>("publishDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // 这里应该替换为真实的API调用
        // const response = await axios.get('/api/v1/posts')

        // 模拟数据
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "React 18新特性与性能优化最佳实践",
            excerpt: "本文详细介绍了React 18的关键新特性以及如何利用这些特性进行性能优化。",
            category: "前端开发",
            tags: ["React", "性能优化", "JavaScript"],
            status: "published",
            publishDate: "2023-04-15",
            updatedDate: "2023-04-18",
            viewCount: 1245,
          },
          {
            id: "2",
            title: "NextJS与Vercel的完美部署流程",
            excerpt: "详解如何利用Vercel平台高效部署NextJS应用，包括CI/CD流程配置。",
            category: "部署",
            tags: ["NextJS", "Vercel", "部署"],
            status: "published",
            publishDate: "2023-04-10",
            updatedDate: "2023-04-12",
            viewCount: 986,
          },
          {
            id: "3",
            title: "Tailwind CSS的高级使用技巧",
            excerpt: "探索Tailwind CSS中不为人知的高级用法，提升开发效率。",
            category: "CSS",
            tags: ["Tailwind", "CSS", "设计"],
            status: "draft",
            publishDate: "",
            updatedDate: "2023-04-05",
            viewCount: 0,
          },
          {
            id: "4",
            title: "现代Web开发的状态管理解决方案",
            excerpt: "比较分析Redux、MobX、Zustand等主流状态管理库的优缺点。",
            category: "前端开发",
            tags: ["状态管理", "React", "前端架构"],
            status: "published",
            publishDate: "2023-03-28",
            updatedDate: "2023-04-02",
            viewCount: 742,
          },
          {
            id: "5",
            title: "TypeScript高级类型与实战案例分析",
            excerpt: "深入TypeScript的类型系统，从实际案例理解高级类型的应用。",
            category: "TypeScript",
            tags: ["TypeScript", "类型系统", "前端"],
            status: "published",
            publishDate: "2023-03-20",
            updatedDate: "2023-03-22",
            viewCount: 568,
          },
        ]

        setPosts(mockPosts)
      } catch (error) {
        console.error("Failed to fetch posts", error)
        toast({
          title: "获取文章失败",
          description: "请检查网络连接后重试",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [toast])

  // 处理排序
  const handleSort = (field: keyof Post) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // 过滤和排序文章
  const filteredAndSortedPosts = posts
    .filter((post) => {
      // 状态过滤
      if (statusFilter !== "all" && post.status !== statusFilter) {
        return false
      }

      // 搜索过滤
      if (searchQuery) {
        return (
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }

      return true
    })
    .sort((a, b) => {
      // 处理空值
      if (!a[sortField] && !b[sortField]) return 0
      if (!a[sortField]) return 1
      if (!b[sortField]) return -1

      // 排序逻辑
      if (typeof a[sortField] === "number" && typeof b[sortField] === "number") {
        return sortDirection === "asc"
          ? (a[sortField] as number) - (b[sortField] as number)
          : (b[sortField] as number) - (a[sortField] as number)
      }

      // 字符串排序
      return sortDirection === "asc"
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]))
    })

  // 处理文章删除
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 这里应该替换为真实的API调用
      // await axios.delete(`/api/v1/posts/${postToDelete}`)

      // 更新本地状态
      setPosts(posts.filter((post) => post.id !== postToDelete))

      toast({
        title: "删除成功",
        description: "文章已成功删除",
      })
    } catch (error) {
      console.error("Failed to delete post", error)
      toast({
        title: "删除失败",
        description: "文章删除失败，请重试",
        variant: "destructive",
      })
    } finally {
      setPostToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  // 触发删除对话框
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">文章管理</h2>
        <Button asChild>
          <Link href="/posts/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            新建文章
          </Link>
        </Button>
      </div>

      {/* 过滤和搜索 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索文章标题、摘要、分类或标签..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="所有状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有状态</SelectItem>
              <SelectItem value="published">已发布</SelectItem>
              <SelectItem value="draft">草稿</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 文章表格 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]" onClick={() => handleSort("title")} role="button">
                <div className="flex items-center gap-1">
                  文章标题
                  {sortField === "title" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">分类/标签</TableHead>
              <TableHead onClick={() => handleSort("status")} role="button">
                <div className="flex items-center gap-1">
                  状态
                  {sortField === "status" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("publishDate")} className="hidden md:table-cell" role="button">
                <div className="flex items-center gap-1">
                  发布日期
                  {sortField === "publishDate" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("viewCount")}
                className="hidden lg:table-cell text-right"
                role="button"
              >
                <div className="flex items-center justify-end gap-1">
                  浏览量
                  {sortField === "viewCount" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // 加载态
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    <Skeleton className="h-5 w-12 ml-auto" />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : filteredAndSortedPosts.length > 0 ? (
              // 文章列表
              filteredAndSortedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="font-medium hover:underline">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-1">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.status === "published" ? (
                      <Badge variant="default">已发布</Badge>
                    ) : (
                      <Badge variant="outline">草稿</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.status === "published" ? post.publishDate : "未发布"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    {post.status === "published" ? post.viewCount : "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">操作菜单</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/posts/${post.id}`}>查看/编辑</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/posts/${post.id}/preview`}>预览</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(post.id)}
                        >
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // 无结果
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  没有找到符合条件的文章
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 删除确认对话框 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>此操作将永久删除该文章，且无法恢复。是否确认删除？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
