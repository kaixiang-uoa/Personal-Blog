"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/inputs/button"
import { Input } from "@/components/ui/inputs/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Badge } from "@/components/ui/data-display/badge"
import { Skeleton } from "@/components/ui/data-display/skeleton"
import { useToast } from "@/hooks/ui/use-toast"
import { BookmarkPlus, Edit, PlusCircle, Search, Tag as TagIcon, Trash2 } from "lucide-react"
import { categoryService } from "@/lib/services/category-service"
import { tagService } from "@/lib/services/tag-service"
import { Category } from "@/types/category.types"
import type { Tag } from "@/types/tags.types"
import { CategoryResponse, TagResponse } from "@/types/common.types"
import { categoryFormSchema, tagFormSchema } from "@/lib/validation/form-validation"
import { EntityFormDialog } from "@/components/posts/EntityFormDialog"

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
  const [creatingCategory, setCreatingCategory] = useState(false)
  const [creatingTag, setCreatingTag] = useState(false)

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
      
      let nameStr = '';
      if (typeof category.name === 'string') {
        nameStr = category.name;
      } else if (category.name && typeof category.name === 'object') {
        nameStr = (category.name as any).en || (category.name as any).zh || '';
      }
      
      let descStr = '';
      if (typeof category.description === 'string') {
        descStr = category.description;
      } else if (category.description && typeof category.description === 'object') {
        descStr = (category.description as any).en || (category.description as any).zh || '';
      }
      
      const query = searchQuery.toLowerCase();
      return nameStr.toLowerCase().includes(query) || descStr.toLowerCase().includes(query);
    }
  )

  const filteredTags = tags.filter(
    (tag) => {
      if (!tag) return false;
      
      let nameStr = '';
      if (typeof tag.name === 'string') {
        nameStr = tag.name;
      } else if (tag.name && typeof tag.name === 'object') {
        nameStr = tag.name.en || tag.name.zh || '';
      }
      
      const query = searchQuery.toLowerCase();
      return nameStr.toLowerCase().includes(query);
    }
  )

  // Helper function: Display category/tag name 
  const displayName = (item: any): string => {
    if (!item) return '';
    if (typeof item.name === 'string') return item.name;
    return (item.name as any)?.en || (item.name as any)?.zh || '';
  }

  // Helper function: Display description
  const displayDescription = (item: any): string => {
    if (!item) return '';
    if (typeof item.description === 'string') return item.description;
    return (item.description as any)?.en || (item.description as any)?.zh || '';
  }

  // Open new category dialog
  const openNewCategoryDialog = () => {
    setEditingCategory(null)
    setCategoryDialogOpen(true)
  }

  // Open edit category dialog
  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory(category)
    setCategoryDialogOpen(true)
  }

  // Category form fields
  const categoryFields = [
    { 
      name: "name", 
      label: "Category Name", 
      type: "text" as const,
      isI18n: true,
      placeholder: "Enter category name" 
    },
    { 
      name: "slug", 
      label: "Category Slug", 
      type: "text" as const,
      placeholder: "Enter category slug" 
    },
    { 
      name: "description", 
      label: "Category Description", 
      type: "textarea" as const,
      isI18n: true,
      placeholder: "Brief description of this category" 
    }
  ];

  // Handle category form submission
  const handleCategorySubmit = async (values: any) => {
    try {
      setCreatingCategory(true);
      
      // Convert form data to the format expected by the API
      const apiData = {
        name: values.name.en,
        name_zh: values.name.zh,
        name_en: values.name.en,
        slug: values.slug,
        description: values.description?.en || "",
        description_zh: values.description?.zh || "",
        description_en: values.description?.en || "",
      };
      
      if (editingCategory) {
        await categoryService.update(editingCategory._id, apiData)
        toast({
          title: "Updated successfully",
          description: `Category "${values.name.en}" has been updated`,
        })
      } else {
        await categoryService.create(apiData)
        toast({
          title: "Created successfully",
          description: `Category "${values.name.en}" has been created`,
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
    } finally {
      setCreatingCategory(false);
    }
  }

  // Open new tag dialog
  const openNewTagDialog = () => {
    setEditingTag(null)
    setTagDialogOpen(true)
  }

  // Open edit tag dialog
  const openEditTagDialog = (tag: Tag) => {
    setEditingTag(tag)
    setTagDialogOpen(true)
  }

  // Tag form fields
  const tagFields = [
    { 
      name: "name", 
      label: "Tag Name", 
      type: "text" as const,
      isI18n: true,
      placeholder: "Enter tag name" 
    },
    { 
      name: "slug", 
      label: "Tag Slug", 
      type: "text" as const,
      placeholder: "Enter tag slug" 
    }
  ];

  // Handle tag form submission
  const handleTagSubmit = async (values: any) => {
    try {
      setCreatingTag(true);
      
      // 将表单数据转换为API期望的格式
      const apiData = {
        name: values.name.en,
        name_zh: values.name.zh,
        name_en: values.name.en,
        slug: values.slug,
      };
      
      if (editingTag) {
        await tagService.update(editingTag._id, apiData)
        toast({
          title: "Updated successfully",
          description: `Tag "${values.name.en}" has been updated`,
        })
      } else {
        await tagService.create(apiData)
        toast({
          title: "Created successfully",
          description: `Tag "${values.name.en}" has been created`,
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
    } finally {
      setCreatingTag(false);
    }
  }

  // Handle category deletion
  const handleDeleteCategory = async (category: Category) => {
    try {
      await categoryService.delete(category._id)
      toast({
        title: "Deleted successfully",
        description: `Category "${displayName(category)}" has been deleted`,
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
        description: `Tag "${displayName(tag)}" has been deleted`,
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
                        {displayName(category)}
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
                      <p className="text-sm text-muted-foreground line-clamp-3">{displayDescription(category) || "No description"}</p>
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
                        <CardTitle className="text-lg">{displayName(tag)}</CardTitle>
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
      <EntityFormDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        title={editingCategory ? "Edit Category" : "New Category"}
        description={editingCategory
          ? "Modify category information. Changes will immediately update all associated posts."
          : "Create a new post category. Categories are used for basic classification of posts."}
        defaultValues={editingCategory 
          ? {
              name: editingCategory.name,
              slug: editingCategory.slug,
              description: editingCategory.description
            }
          : {
              name: { zh: "", en: "" },
              slug: "",
              description: { zh: "", en: "" }
            }}
        schema={categoryFormSchema}
        onSubmit={handleCategorySubmit}
        fields={categoryFields}
        loading={creatingCategory}
        submitText={editingCategory ? "Save Changes" : "Create Category"}
      />

      {/* Tag Form Dialog */}
      <EntityFormDialog
        open={tagDialogOpen}
        onOpenChange={setTagDialogOpen}
        title={editingTag ? "Edit Tag" : "New Tag"}
        description={editingTag
          ? "Modify tag information. Changes will immediately update all associated posts."
          : "Create a new post tag. Tags allow for more granular post classification."}
        defaultValues={editingTag
          ? {
              name: editingTag.name,
              slug: editingTag.slug
            }
          : {
              name: { zh: "", en: "" },
              slug: ""
            }}
        schema={tagFormSchema}
        onSubmit={handleTagSubmit}
        fields={tagFields}
        loading={creatingTag}
        submitText={editingTag ? "Save Changes" : "Create Tag"}
      />
    </div>
  )
}
