"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import PostEditor from "@/components/post-editor"
import { postService } from "@/lib/services/post-service"
import { PostFormData } from "@/types/post"
import { categoryService } from "@/lib/services/category-service"
import type { Category } from "@/types/category"
import type { Tag } from "@/types/tags" 
import type { ApiResponse } from "@/types/common"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postFormSchema, type PostFormSchema } from "@/lib/validation/form-validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { tagService } from "@/lib/services/tag-service"
import { CategorySelector } from "@/components/categories/CategorySelector";
import { TagSelector } from "@/components/tags/TagSelector";
import { useCategory } from "@/lib/store/category-context"
import { useTag } from "@/lib/store/tag-context"

// Helper function to display category or tag name
const displayName = (item: any) => {
  if (!item) return "";
  if (typeof item.name === "string") return item.name;
  if (item.name && typeof item.name === "object") {
    return item.name.en || item.name.zh || "";
  }
  return "";
};

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { state: categoryState, fetchCategories } = useCategory()
  const { state: tagState, fetchTags } = useTag()
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])

  // using react-hook-form
  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      status: "draft",
      featuredImage: "",
    },
  })

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    form.setValue(field as any, value)

    // If title changes, generate slug
    if (field === "title" && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
      form.setValue("slug", slug)
    }
  }

  // Load categories and tags using context API
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  // 处理categories数据结构
  useEffect(() => {
    // 解析categoryState.categories数据，支持多种数据结构
    if (categoryState.categories) {
      if (Array.isArray(categoryState.categories)) {
        setAvailableCategories(categoryState.categories);
      } else if (typeof categoryState.categories === 'object' && categoryState.categories !== null) {
        const catObj = categoryState.categories as any;
        if (Array.isArray(catObj.categories)) {
          setAvailableCategories(catObj.categories);
        }
      }
    }
  }, [categoryState.categories]);

  // Submit form
  const onSubmit = async (data: PostFormSchema) => {
    setIsLoading(true)
    try {
      
      // convert data to match PostFormData type
      const postData: PostFormData = {
        ...data,
        featured: false,
        excerpt: data.excerpt || "",
        // If backend expects tag IDs, send IDs; if it expects tag names, send names
        // Here we're sending IDs based on the model
        tags: data.tags || [],
        featuredImage: data.featuredImage || "",
        categories: data.category ? [data.category] : [],  // Convert single category to array
      }
      
      // Remove the single category field as we're using categories array
      delete (postData as any).category;
      // Remove the temporary tagObjects field
      delete (postData as any).tagObjects;
      
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

  const handleCategorySelect = (categories: Category[]) => {
    setSelectedCategory(categories);
    if (categories.length > 0) {
      form.setValue("category", categories[0]._id);
    } else {
      form.setValue("category", "");
    }
  };

  const handleTagSelect = (tags: Tag[]) => {
    setSelectedTags(tags);
    // Store tag IDs in form
    form.setValue("tags", tags.map(t => t._id));
    // Also store full tag objects for reference
    form.setValue("tagObjects", tags);
  };

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
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title"
                            {...field}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post slug"
                            {...field}
                            onChange={(e) => handleInputChange("slug", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter post excerpt"
                            rows={3}
                            {...field}
                            onChange={(e) => handleInputChange("excerpt", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <PostEditor
                            value={field.value}
                            onChange={(value) => handleInputChange("content", value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={() => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <div className="w-full">
                          <CategorySelector
                            categories={availableCategories}
                            selectedCategories={selectedCategory}
                            onChange={handleCategorySelect}
                            multiple={false}
                            showSelected={true}
                            placeholder="Select category..."
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <div className="w-full">
                          <TagSelector
                            tags={tagState.tags}
                            selectedTags={selectedTags}
                            onChange={handleTagSelect}
                            multiple={true}
                            maxDisplay={10}
                            showCount={true}
                            inputPlaceholder="Search or add tags..."
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={field.value}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter featured image URL"
                            {...field}
                            onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}