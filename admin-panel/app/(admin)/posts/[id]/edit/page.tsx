"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/hooks/ui/use-toast"
import { usePost } from "@/lib/store/post-context"
import { useCategory } from "@/lib/store/category-context"
import { useTag } from "@/lib/store/tag-context"
import { Category } from "@/types/category.types"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { PostEditor } from "@/components/posts/post-editor"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postFormSchema, type PostFormSchema } from "@/lib/validation/form-validation"
import { CategorySelector } from "@/components/categories/CategorySelector"
import { TagSelector } from "@/components/tags/TagSelector"
import { Skeleton } from "@/components/ui/data-display/skeleton"

// loading skeleton
function PostFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function EditPostPage() {
  const params = useParams();
  const postId = params.id as string;
  
  return (
    <Suspense fallback={<PostFormSkeleton />}>
      <EditPostForm postId={postId} />
    </Suspense>
  );
}


function EditPostForm({ postId }: { postId: string }) {
  const { state: postState, fetchPost, updatePost } = usePost()
  const { state: categoryState, fetchCategories } = useCategory()
  const { state: tagState, fetchTags } = useTag()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<any[]>([])
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  
  // Form setup
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

  // Load categories and tags
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  // handle categories data structure
  useEffect(() => {
    // parse categoryState.categories data, support multiple data structures
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

  // Load post data
  useEffect(() => {
    if (postId) {
      fetchPost(postId)
    }
  }, [postId, fetchPost])

  // Update form when post data is loaded
  useEffect(() => {
    if (postState.currentPost) {
      const postData = postState.currentPost;
      const post = (postData as any).post || postData;
      
      // prepare form data
      const formData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content || "",
        category: postData.categoryData?.[0]?._id || "",
        tags: postData.originalTags?.map((tag: any) => tag._id) || [],
        status: post.status,
        featuredImage: post.featuredImage || "",
      };
      
      // set form data one by one
      Object.entries(formData).forEach(([key, value]) => {
        form.setValue(key as any, value);
      });
  
      // Set selected category and tags for display
      if (postState.currentPost &&
        availableCategories.length > 0 &&
        postState.currentPost.categoryData &&
        postState.currentPost.categoryData.length > 0) {
        const currentCategoryId = postState.currentPost.categoryData[0]._id;
        const matchedCategory = availableCategories.find((cat: Category) => cat._id === currentCategoryId);
        setSelectedCategory(matchedCategory ? [matchedCategory] : []);
      }
      
      if (postData.originalTags && postData.originalTags.length > 0) {
        setSelectedTags(postData.originalTags);
      }
    }
  }, [postState.currentPost, availableCategories, form]);

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

  // Handle category selection
  const handleCategorySelect = (categories: any[]) => {
    setSelectedCategory(categories);
    if (categories.length > 0) {
      form.setValue("category", categories[0]._id);
    } else {
      form.setValue("category", "");
    }
  };

  // Handle tag selection
  const handleTagSelect = (tags: any[]) => {
    setSelectedTags(tags);
    form.setValue("tags", tags.map(t => t._id));
    form.setValue("tagObjects", tags);
  };

  // Submit form
  const onSubmit = async (data: PostFormSchema) => {
    setIsLoading(true)
    try {
      // Get the full tag objects from the stored value
      const tagObjects = form.getValues("tagObjects") || [];
      
      // convert data to match PostFormData type
      const postData: any = {
        ...data,
        featured: false,
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        featuredImage: data.featuredImage || "",
        categories: data.category ? [data.category] : [],  // Convert single category to array
      }
      
      // Remove the single category field as we're using categories array
      delete postData.category;
      // Remove the temporary tagObjects field
      delete postData.tagObjects;
      
      await updatePost(postId, postData)
      toast({
        title: "Success",
        description: "Post updated successfully",
      })
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

  if (postState.loading) {
    return <PostFormSkeleton />
  }

  if (!postState.currentPost) {
    return <div className="container mx-auto py-6">Post not found</div>
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
          <h1 className="text-2xl font-bold">Edit Post</h1>
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
                Save Changes
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
                            // removable={false}
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