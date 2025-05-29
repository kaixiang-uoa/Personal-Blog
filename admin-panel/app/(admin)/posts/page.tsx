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
import { postService } from "@/lib/services/post-service"
import type { Post } from "@/types/post"

export default function PostsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Post>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        
        // 构建查询参数
        const params: any = { 
          limit: 20, 
          sort: 'createdAt:desc',
          lang: 'en' // 指定请求英文内容
        };
        
        // 对于 All Statuses，使用 allStatus=true 参数
        if (statusFilter === "all") {
          params.allStatus = 'true'; // 后端接收字符串 'true'
        } else {
          // 明确指定状态
          params.status = statusFilter;
        }
        
        // 调用 API 获取帖子，传递过滤参数
        const response = await postService.getAll(params);
        setPosts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        toast({
          title: "Failed to fetch posts",
          description: "Please check your network connection and try again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [toast, statusFilter]); // 添加 statusFilter 作为依赖项

  // Handle sorting
  const handleSort = (field: keyof Post) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter((post) => {
      // Status filter
      if (statusFilter !== "all" && post.status !== statusFilter) {
        return false
      }

      // Search filter
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
      // Handle empty values
      if (!a[sortField] && !b[sortField]) return 0
      if (!a[sortField]) return 1
      if (!b[sortField]) return -1

      // Sorting logic
      if (typeof a[sortField] === "number" && typeof b[sortField] === "number") {
        return sortDirection === "asc"
          ? (a[sortField] as number) - (b[sortField] as number)
          : (b[sortField] as number) - (a[sortField] as number)
      }

      // String sorting
      return sortDirection === "asc"
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]))
    })

  // Handle post deletion
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    try {
      await postService.delete(postToDelete)

      // Update local state
      setPosts(posts.filter((post) => post._id !== postToDelete))

      toast({
        title: "Deleted successfully",
        description: "The post has been deleted",
      })
    } catch (error) {
      console.error("Failed to delete post", error)
      toast({
        title: "Delete failed",
        description: "Failed to delete the post, please try again",
        variant: "destructive",
      })
    } finally {
      setPostToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  // Trigger delete dialog
  const handleDeleteClick = (post_id: string) => {
    setPostToDelete(post_id)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Post Management</h2>
        <Button asChild>
          <Link href="/posts/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, excerpt, category or tag..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]" onClick={() => handleSort("title")} role="button">
                <div className="flex items-center gap-1">
                  Title
                  {sortField === "title" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead className="h_idden md:table-cell">Category/Tags</TableHead>
              <TableHead onClick={() => handleSort("status")} role="button">
                <div className="flex items-center gap-1">
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("publishDate")} className="hidden md:table-cell" role="button">
                <div className="flex items-center gap-1">
                  Publish Date
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
                  Views
                  {sortField === "viewCount" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`post-skeleton-row-${index}`}>
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
              // Posts list
              filteredAndSortedPosts.map((post, postIndex) => (
                <TableRow key={post._id || `post-row-${postIndex}`}>
                  <TableCell>
                    <div className="font-medium hover:underline">
                      <Link href={`/posts/${post._id}`}>{post.title}</Link>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-1">
                      {/* 处理categories可能是数组的情况 */}
                      {Array.isArray(post.categories) && post.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mb-1">
                          {post.categories.map((category, catIndex) => {
                            const catName = typeof category === 'object' && category !== null
                              ? (category as any).name_en || (category as any).name || (category as any).title || (category as any).slug || JSON.stringify(category)
                              : String(category);
                              
                            const catId = typeof category === 'object' && category !== null
                              ? (category as any)._id || (category as any).id || (category as any).slug || catIndex
                              : category;
                              
                            return (
                              <Badge 
                                key={`${post._id || `post-${postIndex}`}-cat-${catId}`}
                                variant="outline"
                              >
                                {catName}
                              </Badge>
                            );
                          })}
                        </div>
                      ) : post.category ? (
                        // 处理可能的单个category字段
                        <Badge variant="outline">
                          {typeof post.category === 'object' && post.category !== null
                            ? (post.category as any).name_en || (post.category as any).name || (post.category as any).title || (post.category as any).slug
                            : post.category}
                        </Badge>
                      ) : (
                        <Badge variant="outline">Uncategorized</Badge>
                      )}
                      
                      {/* 标签显示部分 */}
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(post.tags) && post.tags.length > 0 ? (
                          post.tags.map((tag, tagIndex) => {
                            // 处理tag可能是对象或字符串的情况
                            const tagName = typeof tag === 'object' && tag !== null 
                              ? (tag as any).name_en || (tag as any).name || (tag as any).slug || JSON.stringify(tag) 
                              : String(tag);
                            
                            const tagId = typeof tag === 'object' && tag !== null
                              ? (tag as any)._id || (tag as any).id || (tag as any).slug || String(tag)
                              : String(tag);
                              
                            return (
                              <Badge 
                                key={`${post._id || `post-${postIndex}`}-tag-${tagId || tagIndex}`} 
                                variant="secondary" 
                                className="text-xs"
                              >
                                {tagName}
                              </Badge>
                            );
                          })
                        ) : (
                          <Badge variant="secondary" className="text-xs">No tags</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.status === "published" ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.status === "published" ? post.publishDate : "Not published"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    {post.status === "published" ? post.viewCount : "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/posts/${post._id}/edit`}>View/Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/posts/${post._id}/preview`}>Preview</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(post._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // No results
              <TableRow key="no-results-row">
                <TableCell colSpan={6} className="h-24 text-center">
                  No posts found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>This action will permanently delete this post and cannot be undone. Are you sure?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
