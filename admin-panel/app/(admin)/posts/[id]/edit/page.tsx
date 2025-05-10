"use client"
import { useState, useEffect } from "react"
import { use } from "react";
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
import { Category } from "@/types/category";
import { PostParams, PostData } from "@/types/post";



export default function EditPostPage({ params }: { params: any }) {
  // 安全地解构 params
  const resolvedParams = use(params) as PostParams;
  const id = resolvedParams?.id;
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [postData, setPostData] = useState<PostData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [], // 确保初始值是空数组而不是 undefined
    status: "draft",
    featured: false,
    featuredImage: "",
    categoryData: [],
    displayTags: [],
    originalTags: [],
  })

  // 获取所有分类
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.categories.getAll();
        if (response.data) {
          setCategories(response.data.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  // 获取所有标签
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await ApiService.tags.getAll();
        if (response.data) {
          setTags(response.data.tags || []);
        }
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };

    fetchTags();
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        console.error("No post ID provided");
        toast({
          title: "Error",
          description: "No post ID found. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      try {
        const response = await ApiService.posts.getById(id, currentLang)        
        
        if (response?.data) {
          // 提取分类信息
          let categoryValue = '';
          const categoriesData = response.data.post.categories;
          
          if (Array.isArray(categoriesData) && categoriesData.length > 0) {
            const firstCategory = categoriesData[0];
            // 如果是对象，提取 ID 或 slug 作为值，name 作为显示名称
            if (typeof firstCategory === 'object') {
              categoryValue = firstCategory._id || firstCategory.slug || '';
            } else {
              categoryValue = firstCategory;
            }
          }
          
          // 保存原始标签数据，包括 ID
          const originalTags = Array.isArray(response.data.post.tags) ? response.data.post.tags : [];
          
          // 确保所有需要的属性都有默认值
          const processedData = {
            ...postData, // 保留默认值
            ...response.data.post,
            // 设置分类值为 ID 或 slug，用于下拉选择
            category: categoryValue,
            // 保存原始分类数据，用于显示名称等
            categoryData: categoriesData,
            // 显示用的标签名称
            displayTags: originalTags.map((tag: any) => 
              typeof tag === 'object' ? tag.name || tag.slug || JSON.stringify(tag) : tag
            ),
            // 保存原始标签数据，用于提交
            originalTags: originalTags,
          };
          setPostData(processedData);
        } else {
          throw new Error("Invalid response format")
        }
      } catch (error) {
        console.error("Failed to fetch post", error)
        toast({
          title: "Error",
          description: "Failed to load post data. Please try again.",
          variant: "destructive",
        })
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id, currentLang, toast])

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

  // Handle tag input - 添加防御性检查
  const [tagInput, setTagInput] = useState("")
  const handleTagAdd = () => {
    if (tagInput.trim() && Array.isArray(postData.displayTags) && !postData.displayTags.includes(tagInput.trim())) {
      setPostData((prev) => ({
        ...prev,
        displayTags: [...(Array.isArray(prev.displayTags) ? prev.displayTags : []), tagInput.trim()],
        // 为新标签创建一个临时标记
        tempTags: [...(prev.tempTags || []), tagInput.trim()]
      }))
      setTagInput("")
    }
  }

  const handleTagRemove = (tag: string) => {
    if (!Array.isArray(postData.displayTags)) return;
    
    setPostData((prev) => ({
      ...prev,
      displayTags: Array.isArray(prev.displayTags) ? prev.displayTags.filter((t) => t !== tag) : [],
      // 如果是临时标签，从临时标签中移除
      tempTags: Array.isArray(prev.tempTags) 
        ? prev.tempTags.filter(t => t !== tag)
        : [],
      // 如果是原始标签，标记为需要删除
      tagsToRemove: Array.isArray(prev.originalTags) 
        ? [...(prev.tagsToRemove || []), 
           ...prev.originalTags.filter((t: any) => 
             (typeof t === 'object' && (t.name === tag || t.slug === tag)) || t === tag
           )]
        : []
    }))
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
    
    if (!id) {
      toast({
        title: "Error",
        description: "No post ID found. Cannot update.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // 准备提交数据
      const submitData: any = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        content: postData.content,
        status: postData.status,
        featured: postData.featured,
        featuredImage: postData.featuredImage,
        // 为分类使用ID
        categories: [postData.category]
      };
      
      // 处理标签数据
      const tagIds: string[] = [];
      
      // 添加原始标签ID（排除需要删除的标签）
      if (Array.isArray(postData.originalTags)) {
        const tagsToRemoveIds = (postData.tagsToRemove || []).map((tag: any) => 
          typeof tag === 'object' ? tag._id : tag
        );
        
        postData.originalTags.forEach((tag: any) => {
          const tagId = typeof tag === 'object' ? tag._id : tag;
          if (tagId && !tagsToRemoveIds.includes(tagId)) {
            tagIds.push(tagId);
          }
        });
      }
      
      // 处理新添加的临时标签
      if (Array.isArray(postData.tempTags) && postData.tempTags.length > 0) {
        // 找到已存在的标签
        for (const tagName of postData.tempTags) {
          const existingTag = tags.find(t => t.name === tagName);
          if (existingTag) {
            // 如果标签已存在，使用其ID
            tagIds.push(existingTag._id);
          } else {
            // 如果标签不存在，需要先创建
            try {
              const newTag = await ApiService.tags.create({ name: tagName });
              if (newTag.data && newTag.data._id) {
                tagIds.push(newTag.data._id);
              }
            } catch (error) {
              console.error(`Failed to create tag ${tagName}:`, error);
            }
          }
        }
      }
      
      submitData.tags = tagIds;
      
      // Call API to update post
      await ApiService.posts.update(id, submitData)

      toast({
        title: "Success",
        description: "Post updated successfully",
      })

      // Redirect to posts list
      router.push("/posts")
    } catch (error) {
      console.error("Failed to update post", error)
      toast({
        title: "Update Failed",
        description: "An error occurred while updating the post. Please try again.",
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
        </div>
        <div className="flex items-center gap-4">
          <Select value={currentLang} onValueChange={setCurrentLang}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
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
                    value={postData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Permalink</Label>
                  <Input
                    id="slug"
                    placeholder="Enter URL slug"
                    value={postData.slug || ""}
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
                    content={postData.content || ""} 
                    placeholder="Write your post content here..."
                  />
                </TabsContent>
                <TabsContent value="preview" className="min-h-[500px] prose prose-slate max-w-none">
                  <div className="border rounded-md p-4" dangerouslySetInnerHTML={{ __html: postData.content || "" }} />
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
                  placeholder="Enter post excerpt (optional)"
                  value={postData.excerpt || ""}
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
                    value={postData.status || "draft"}
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
              <div className="space-y-2">
                <Label htmlFor="category">Select Category</Label>
                <Select
                  value={postData.category || ""}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Loading categories...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                
                {/* 当前分类信息显示 */}
                {Array.isArray(postData.categoryData) && postData.categoryData.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Current category:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {postData.categoryData.map((cat: any, index: number) => (
                        <Badge key={index} variant="outline">
                          {typeof cat === 'object' ? cat.name || cat.slug : cat}
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
                
                {/* 显示可选的已有标签 */}
                {tags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Available tags:</p>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1">
                      {tags
                        .filter(tag => !postData.displayTags.includes(tag.name))
                        .map(tag => (
                          <Badge 
                            key={tag._id} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-secondary"
                            onClick={() => {
                              setPostData(prev => ({
                                ...prev,
                                displayTags: [...prev.displayTags, tag.name],
                                tempTags: [...(prev.tempTags || []), tag.name]
                              }))
                            }}
                          >
                            + {tag.name}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {!Array.isArray(postData.displayTags) || postData.displayTags.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No tags added yet</div>
                  ) : (
                    postData.displayTags.map((tag, index) => (
                      <Badge key={`${tag}-${index}`} variant="secondary" className="px-2 py-1">
                        {typeof tag === 'string' ? tag : JSON.stringify(tag)}
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
                  value={postData.featuredImage || ""}
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