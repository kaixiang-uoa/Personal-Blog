"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/hooks/ui/use-toast"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/inputs/button"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/inputs/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { PostEditor } from "@/components/posts/post-editor"
import { TagSelector } from "@/components/posts/TagSelector"
import { useForm } from "react-hook-form"
import { Skeleton } from "@/components/ui/data-display/skeleton"
import { Post, PostStatus } from "@/types/posts"
import { Category, Tag } from "@/types"
import { apiService } from "@/lib/api"
import { CategorySelector } from "@/components/categories/CategorySelector"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select"

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

interface EditPostFormProps {
  postId: string;
}

function EditPostForm({ postId }: EditPostFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [currentPost, setCurrentPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Form setup
  const form = useForm<Post>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      categories: [],
      tags: [],
      status: PostStatus.DRAFT,
      featuredImage: "",
    },
  })

  // Get post, category and tag data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get post details
        const postResponse = await apiService.getPostById(postId);
        const post = postResponse.data.post;
        setCurrentPost(post);
        
        // Set form initial values
        form.reset({
          title: post.title ?? "",
          slug: post.slug ?? "",
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          categories: post.categories || [],
          tags: post.tags || [],
          status: post.status ?? PostStatus.DRAFT,
          featuredImage: post.featuredImage ?? "",
        });
        
        // Set selected categories and tags
        if (post.categories) {
          setSelectedCategory(Array.isArray(post.categories) ? post.categories : []);
        }
        if (post.tags) {
          setSelectedTags(Array.isArray(post.tags) ? post.tags : []);
        }
        
       
        const categoriesResponse = await apiService.getCategories() as unknown as import("@/types").ApiResponse<{ categories: Category[] }>;
        if (categoriesResponse.data) {
       
          const categories = Array.isArray(categoriesResponse.data) 
            ? categoriesResponse.data 
            : categoriesResponse.data.categories || [];
          setAvailableCategories(categories);
        }
        
        const tagsResponse = await apiService.getTags() as unknown as import("@/types").ApiResponse<{ tags: Tag[] }>;
        if (tagsResponse.data) {
         
          const tags = Array.isArray(tagsResponse.data) 
            ? tagsResponse.data 
            : tagsResponse.data.tags || [];
          setAvailableTags(tags);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load post data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [postId, form, toast]);

  // Handle input changes
  const handleInputChange = (field: keyof Post, value: string | number | boolean | Category[] | string[] | Tag[] | undefined) => {
    form.setValue(field, value)

    // If title changes, generate slug
    if (field === "title" && typeof value === "string") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
      form.setValue("slug", slug)
    }
  }

  // Handle category selection
  const handleCategorySelect = (categories: Category[]) => {
    setSelectedCategory(categories);
    if (categories.length > 0) {
      form.setValue("categories", [categories[0]._id]);
    } else {
      form.setValue("categories", []);
    }
  };

  // Handle tag selection
  const handleTagSelect = (tags: Tag[]) => {
    setSelectedTags(tags);
    form.setValue("tags", tags.map(tag => tag._id));
  };

  // Submit form
  const onSubmit = async (data: Post) => {
    setIsLoading(true)
    try {
      await apiService.updatePost(postId, data);
      
      toast({
        title: "Success",
        description: "Post updated successfully",
      })
      router.push("/posts")
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An error occurred while updating the post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return <PostFormSkeleton />
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
                    name="categories"
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
                            placeholder="Select category"
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
                            tags={availableTags}
                            selectedTags={selectedTags}
                            onChange={handleTagSelect}
                            multiple
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
                            <SelectItem value={PostStatus.DRAFT}>Draft</SelectItem>
                            <SelectItem value={PostStatus.PUBLISHED}>Published</SelectItem>
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