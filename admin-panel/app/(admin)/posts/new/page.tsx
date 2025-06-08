"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/inputs/button"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Input } from "@/components/ui/inputs/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select"
import { Textarea } from "@/components/ui/inputs/textarea"
import { useToast } from "@/hooks/ui/use-toast"
import { PostEditor } from "@/components/posts/post-editor"
import { postService } from "@/lib/services/post-service"
import { PostFormData } from "@/types/post.types"
import type { Category } from "@/types/category.types"
import type { Tag } from "@/types/tags.types" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postFormSchema, type PostFormSchema } from "@/lib/validation/form-validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { CategorySelector } from "@/components/categories/CategorySelector";
import { TagSelector } from "@/components/tags/TagSelector";
import { useCategory } from "@/lib/store/category-context"
import { useTag } from "@/lib/store/tag-context"

// 定义React事件类型
import type { ChangeEvent } from "react"

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

  // handle categories data structure
  useEffect(() => {
    // analysis categoryState.categories data structure
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
      // if published status, check required fields again
      if (data.status === "published") {
        if (!data.title || !data.content) {
          toast({
            title: "无法发布",
            description: "发布文章需要填写标题和内容",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }
      
      // use type assertion to create PostFormData
      const postData = {
        status: data.status,
        featured: false,
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        tags: data.tags || [],
        featuredImage: data.featuredImage || ''
      } as PostFormData;
      
      // add category
      if (data.category) {
        postData.categories = [data.category];
      }
      
      await postService.create(postData);
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
    form.setValue("tags", tags.map(t => t._id));
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
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Title
                          {form.watch("status") === "published" && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                          {form.watch("status") === "draft" && (
                            <span className="text-gray-400 text-xs ml-2">(Required when published)</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title"
                            {...field}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("title", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Slug
                          {form.watch("status") === "draft" && (
                            <span className="text-gray-400 text-xs ml-2">(Optional, will be generated from title)</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post slug"
                            {...field}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("slug", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Excerpt
                          <span className="text-gray-400 text-xs ml-2">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter post excerpt"
                            rows={3}
                            {...field}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange("excerpt", e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Content
                          {form.watch("status") === "published" && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                          {form.watch("status") === "draft" && (
                            <span className="text-gray-400 text-xs ml-2">(Required when published)</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <PostEditor
                            value={field.value || ""}
                            onChange={(value: string) => handleInputChange("content", value)}
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
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value: string) => {
                            // if switch to published status, check required fields
                            if (value === "published") {
                              const { title, content } = form.getValues();
                              if (!title || !content) {
                                toast({
                                  title: "Cannot publish",
                                  description: "Published articles require title and content",
                                  variant: "destructive",
                                });
                                // if validation fails, keep as draft
                                return;
                              }
                            }
                            // set new status
                            field.onChange(value);
                          }}
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
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter featured image URL"
                            {...field}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("featuredImage", e.target.value)}
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