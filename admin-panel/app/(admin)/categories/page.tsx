"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { BookmarkPlus, Edit, PlusCircle, Search, Tag as TagIcon, Trash2 } from "lucide-react"
import { categoryService } from "@/lib/services/category-service"
import { tagService } from "@/lib/services/tag-service"
import { Category } from "@/types/category"
import type { Tag } from "@/types/tags"
import { CategoryResponse, TagResponse } from "@/types/common"

// Form validation schema
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters" }),
  slug: z
    .string()
    .min(2, { message: "Category slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  description: z.string().optional(),
})

const tagFormSchema = z.object({
  name: z.string().min(2, { message: "Tag name must be at least 2 characters" }),
  slug: z
    .string()
    .min(2, { message: "Tag slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
})

export default function CategoriesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("categories")
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  // Category form
  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  })

  // Tag form
  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  // fetchData 封装为 useCallback，便于复用
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const categoriesResponse = await categoryService.getAll()
      const tagsResponse = await tagService.getAll()
      if (categoriesResponse?.success && categoriesResponse.data) {
        const categoryData = categoriesResponse.data as unknown as CategoryResponse
        setCategories(categoryData.categories)
      } else {
        setCategories([])
      }
      if (tagsResponse?.success && tagsResponse.data) {
        const tagData = tagsResponse.data as unknown as TagResponse
        setTags(tagData.tags)
      } else {
        setTags([])
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
      toast({
        title: "Failed to fetch data",
        description: "Please check your network connection and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Filter categories and tags based on search
  const filteredCategories = categories.filter(
    (category) => {
      if (!category) return false;
      const name = category.name?.toLowerCase() || '';
      const description = category.description?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return name.includes(query) || description.includes(query);
    }
  )

  const filteredTags = tags.filter(
    (tag) => {
      if (!tag) return false;
      const name = tag.name?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    }
  )

  // Open new category dialog
  const openNewCategoryDialog = () => {
    setEditingCategory(null)
    categoryForm.reset({
      name: "",
      slug: "",
      description: "",
    })
    setCategoryDialogOpen(true)
  }

  // Open edit category dialog
  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory(category)
    categoryForm.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
    })
    setCategoryDialogOpen(true)
  }

  // Handle category form submission
  const onCategorySubmit = async (values: z.infer<typeof categoryFormSchema>) => {
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory._id, {
          name: values.name,
          slug: values.slug,
          description: values.description || "",
        })
        toast({
          title: "Updated successfully",
          description: `Category \"${values.name}\" has been updated`,
        })
      } else {
        await categoryService.create({
          name: values.name,
          slug: values.slug,
          description: values.description || "",
        })
        toast({
          title: "Created successfully",
          description: `Category \"${values.name}\" has been created`,
        })
      }
      await fetchData()
      setCategoryDialogOpen(false)
    } catch (error) {
      console.error("Failed to save category", error)
      toast({
        title: "Save failed",
        description: "Unable to save the category, please try again",
        variant: "destructive",
      })
    }
  }

  // Open new tag dialog
  const openNewTagDialog = () => {
    setEditingTag(null)
    tagForm.reset({
      name: "",
      slug: "",
    })
    setTagDialogOpen(true)
  }

  // Open edit tag dialog
  const openEditTagDialog = (tag: Tag) => {
    setEditingTag(tag)
    tagForm.reset({
      name: tag.name,
      slug: tag.slug,
    })
    setTagDialogOpen(true)
  }

  // Handle tag form submission
  const onTagSubmit = async (values: z.infer<typeof tagFormSchema>) => {
    try {
      if (editingTag) {
        await tagService.update(editingTag._id, values)
        toast({
          title: "Updated successfully",
          description: `Tag \"${values.name}\" has been updated`,
        })
      } else {
        await tagService.create(values)
        toast({
          title: "Created successfully",
          description: `Tag \"${values.name}\" has been created`,
        })
      }
      await fetchData()
      setTagDialogOpen(false)
    } catch (error) {
      console.error("Failed to save tag", error)
      toast({
        title: "Save failed",
        description: "Unable to save the tag, please try again",
        variant: "destructive",
      })
    }
  }

  // Handle category deletion
  const handleDeleteCategory = async (category: Category) => {
    try {
      await categoryService.delete(category._id)
      toast({
        title: "Deleted successfully",
        description: `Category \"${category.name}\" has been deleted`,
      })
      await fetchData()
    } catch (error) {
      console.error("Failed to delete category", error)
      toast({
        title: "Delete failed",
        description: "Unable to delete the category, please try again",
        variant: "destructive",
      })
    }
  }

  // Handle tag deletion
  const handleDeleteTag = async (tag: Tag) => {
    try {
      await tagService.delete(tag._id)
      toast({
        title: "Deleted successfully",
        description: `Tag \"${tag.name}\" has been deleted`,
      })
      await fetchData()
    } catch (error) {
      console.error("Failed to delete tag", error)
      toast({
        title: "Delete failed",
        description: "Unable to delete the tag, please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Categories and Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={openNewCategoryDialog} className="flex items-center gap-1">
            <BookmarkPlus className="h-4 w-4" />
            New Category
          </Button>
          <Button onClick={openNewTagDialog} variant="outline" className="flex items-center gap-1">
            <TagIcon className="h-4 w-4" />
            New Tag
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* 搜索框独立一行 */}
        <div className="w-full relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories or tags..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* 标签页独立一行 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Categories Tab Content */}
          <TabsContent value="categories" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                // Loading state
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={`category-skeleton-${i}`}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-5 w-36" />
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <Card key={category._id || `category-fallback-${Math.random().toString(36).substr(2, 9)}`} className="flex flex-col">
                    <CardHeader className="pb-2 flex-shrink-0">
                      <CardTitle className="text-xl flex items-center justify-between">
                        {category.name}
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditCategoryDialog(category)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">/{category.slug}</span>
                          <Badge variant="outline">{category.postCount} posts</Badge>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">{category.description || "No description"}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card key="no-categories-found" className="md:col-span-2 lg:col-span-3">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <p className="text-muted-foreground mb-4">No categories found</p>
                    <Button onClick={openNewCategoryDialog} className="flex items-center gap-1">
                      <PlusCircle className="h-4 w-4" />
                      New Category
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Tags Tab Content */}
          <TabsContent value="tags" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {loading ? (
                // Loading state
                Array.from({ length: 12 }).map((_, i) => (
                  <Card key={`tag-skeleton-${i}`}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </CardHeader>
                  </Card>
                ))
              ) : filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <Card key={tag._id || `tag-${tag.slug}-${Math.random().toString(36).substr(2, 9)}`} className="h-[120px]">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tag.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditTagDialog(tag)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTag(tag)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{tag.slug}</Badge>
                        <Badge variant="outline">{tag.postCount || 0} posts</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card key="no-tags-found" className="md:col-span-3 lg:col-span-4">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <p className="text-muted-foreground mb-4">No tags found</p>
                    <Button onClick={openNewTagDialog} className="flex items-center gap-1">
                      <PlusCircle className="h-4 w-4" />
                      New Tag
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Category Form Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Modify category information. Changes will immediately update all associated posts."
                : "Create a new post category. Categories are used for basic classification of posts."}
            </DialogDescription>
          </DialogHeader>
          <Form {...categoryForm}>
            <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
              <FormField
                control={categoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={categoryForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="URL-friendly slug, e.g. front-end" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={categoryForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of this category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{editingCategory ? "Save Changes" : "Create Category"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Tag Form Dialog */}
      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTag ? "Edit Tag" : "New Tag"}</DialogTitle>
            <DialogDescription>
              {editingTag
                ? "Modify tag information. Changes will immediately update all associated posts."
                : "Create a new post tag. Tags allow for more granular post classification."}
            </DialogDescription>
          </DialogHeader>
          <Form {...tagForm}>
            <form onSubmit={tagForm.handleSubmit(onTagSubmit)} className="space-y-4">
              <FormField
                control={tagForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tag name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={tagForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="URL-friendly slug, e.g. react" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{editingTag ? "Save Changes" : "Create Tag"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
