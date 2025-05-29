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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import PostEditor from "@/components/post-editor"
import ApiService from "@/lib/api-service"

// Define post data type
interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  featured: boolean;
  featuredImage: string;
}

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState<PostData>({
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

  // Add state to store categories
  const [categories, setCategories] = useState<Array<{_id: string, name: string}>>([])
  const [categoryInput, setCategoryInput] = useState("")
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  // Default suggested categories
  const suggestedCategories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Other"
  ]

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.categories.getAll()
        setCategories(response.data.categories || [])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

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

  // Handle category selection or creation
  const handleCategoryChange = (value: string) => {
    // If selected from suggested categories
    if (suggestedCategories.includes(value)) {
      setPostData(prev => ({
        ...prev,
        category: value
      }))
    } else {
      // If input is a new category
      setCategoryInput(value)
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

    setIsLoading(true)

    try {
      // If a new category is selected, create it first
      let categoryId = postData.category
      if (suggestedCategories.includes(postData.category)) {
        const categoryResponse = await ApiService.categories.create({
          name: postData.category,
          slug: postData.category.toLowerCase().replace(/\s+/g, '-')
        })
        categoryId = categoryResponse.data.category._id
      }

      // Create post with the new categoryId
      const postDataWithCategory = {
        ...postData,
        category: categoryId
      }

      await ApiService.posts.create(postDataWithCategory)

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/posts">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and slug */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={postData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Permalink</Label>
                  <Input
                    id="slug"
                    placeholder="Enter URL slug"
                    value={postData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="editor">
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="min-h-[500px]">
                  <PostEditor 
                    onChange={handleContentChange} 
                    content={postData.content} 
                    placeholder="Write your post content here..."
                  />
                </TabsContent>
                <TabsContent value="preview" className="min-h-[500px] prose prose-slate max-w-none">
                  <div className="border rounded-md p-4" dangerouslySetInnerHTML={{ __html: postData.content }} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="excerpt">Post Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder= "Enter post excerpt (optional)"
                  value={postData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings panel */}
        <div className="space-y-6">
          {/* Publish settings */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Publish Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={postData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Select or Create Category</Label>
                  <Select
                    value={postData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingCategories ? (
                        <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                      ) : categories.length > 0 ? (
                        // Display existing categories
                        categories.map(category => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        // Display suggested categories
                        suggestedCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category} (New)
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Display suggested categories */}
                {categories.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Suggested categories:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedCategories.map(category => (
                        <Badge 
                          key={category}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Tags</h3>
              <div className="space-y-4">
                <div className="flex">
                  <Input
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleTagAdd()
                      }
                    }}
                    className="rounded-r-none"
                  />
                  <Button
                    onClick={handleTagAdd}
                    className="rounded-l-none"
                    variant="secondary"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {postData.tags.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No tags added yet</div>
                  ) : (
                    postData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-1">
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="ml-2 text-xs text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Featured Image</h3>
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Image URL</Label>
                <Input
                  id="featuredImage"
                  placeholder="Enter image URL"
                  value={postData.featuredImage}
                  onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                />
                {postData.featuredImage && (
                  <div className="mt-4 rounded-md overflow-hidden border">
                    <img
                      src={postData.featuredImage}
                      alt="Featured"
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/image-placeholder.jpg"
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 