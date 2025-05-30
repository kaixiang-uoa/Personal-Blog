"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import PostEditor from "@/components/post-editor"
import { postService } from "@/lib/services/post-service"
import { PostFormData } from "@/types/post"
import { categoryService } from "@/lib/services/category-service"
import type { Category, CategoryFormData } from "@/types/category"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { ApiResponse } from "@/types/common"

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState<PostFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
    featured: false,
    featuredImage: "",
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState<CategoryFormData>({ name: "", slug: "" })
  const [creatingCategory, setCreatingCategory] = useState(false)

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // If title changes, generate slug
    if (field === "title" && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
      setPostData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  // Handle content changes
  const handleContentChange = (content: string) => {
    handleInputChange("content", content)
  }

  // Handle tag input
  const [tagInput, setTagInput] = useState("")
  const handleTagAdd = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleTagRemove = (tag: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    handleInputChange("category", categoryId)
  }

  // 拉取分类列表
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryService.getAll()
        if (res && res.data && Array.isArray((res.data as any).categories)) {
          setCategories((res.data as any).categories)
        } else {
          setCategories([])
        }
      } catch (e) {
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  // 新建分类表单提交
  const handleCreateCategory = async () => {
    if (!newCategory.name) {
      toast({ title: "Category Name Required", description: "Please enter a category name", variant: "destructive" })
      return
    }
    setCreatingCategory(true)
    try {
      const res = await categoryService.create(newCategory) as ApiResponse<{ category: Category }>
      if (res.success && res.data?.category?._id) {
        // 刷新分类列表
        const refreshed = await categoryService.getAll()
        let arr: Category[] = []
        if (Array.isArray((refreshed.data as any).categories)) {
          arr = (refreshed.data as any).categories
        }
        setCategories(arr)
        // 选中新建项
        handleCategoryChange(res.data.category._id)
        setCategoryDialogOpen(false)
        setNewCategory({ name: "", slug: "" })
        toast({ title: "Success", description: "Category created and selected" })
      }
    } catch (e) {
      toast({ title: "Create Failed", description: "Failed to create category", variant: "destructive" })
    } finally {
      setCreatingCategory(false)
    }
  }

  // Submit form
  const handleSubmit = async () => {
    if (!postData.title) {
      toast({
        title: "Title Required",
        description: "Post title cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (!postData.category) {
      toast({
        title: "Category Required",
        description: "Please select or create a category",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await postService.create(postData)

      toast({
        title: "Success",
        description: "Post created successfully",
      })

      router.push("/posts")
    } catch (error) {
      console.error("Failed to create post", error)
      toast({
        title: "Creation Failed",
        description: "An error occurred while creating the post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/posts">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">New Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Save className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Post
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={postData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={postData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="Enter post slug"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={postData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Enter post excerpt"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Content</Label>
                  <PostEditor
                    value={postData.content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <div className="flex gap-2">
                    <Select
                      value={postData.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(true)}>
                      + New
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleTagAdd()
                        }
                      }}
                      placeholder="Add tags"
                    />
                    <Button onClick={handleTagAdd}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleTagRemove(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={postData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featured">Featured</Label>
                  <Select
                    value={postData.featured ? "true" : "false"}
                    onValueChange={(value) =>
                      handleInputChange("featured", value === "true")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select featured status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={postData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    placeholder="Enter featured image URL"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* 新建分类弹窗 */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
            <DialogDescription>Create a new category for posts.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={newCategory.name}
                onChange={e => setNewCategory(n => ({ ...n, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <Label>Category Slug</Label>
              <Input
                value={newCategory.slug}
                onChange={e => setNewCategory(n => ({ ...n, slug: e.target.value }))}
                placeholder="Enter category slug"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateCategory} disabled={creatingCategory}>
              {creatingCategory ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}