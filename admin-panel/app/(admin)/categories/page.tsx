"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/inputs/button"
import { Input } from "@/components/ui/inputs/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Badge } from "@/components/ui/data-display/badge"
import { Skeleton } from "@/components/ui/data-display/skeleton"
import { useToast } from "@/hooks/ui/use-toast"
import { BookmarkPlus, Edit, PlusCircle, Search, Tag as TagIcon, Trash2 } from "lucide-react"
import { apiService } from "@/lib/api"
import { Category, Tag, FormField } from "@/types"
import { EntityFormDialog } from "@/components/posts/EntityFormDialog"
import { categoryFormSchema, tagFormSchema } from "@/lib/validators/form-validation"
import { slugify } from "@/lib/utils"

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fix type assertion: data is an object containing categories/count or tags/count
        const categoriesRes = await apiService.getCategories() as unknown as import("@/types").ApiResponse<{ categories: (Category & { postCount?: number })[], count: number }>;
        const tagsRes = await apiService.getTags() as unknown as import("@/types").ApiResponse<{ tags: (Tag & { postCount?: number })[], count: number }>;
        // Print the fetched data structure for debugging
        if (categoriesRes.success && Array.isArray(categoriesRes.data?.categories)) {
          setCategories(categoriesRes.data.categories)
        }
        if (tagsRes.success && Array.isArray(tagsRes.data?.tags)) {
          setTags(tagsRes.data.tags)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch categories and tags",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [toast])

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    (category.name?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
    (category.name_en?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
    (category.name_zh?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
    (category.slug?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
  )

  // Filter tags based on search query
  const filteredTags = tags.filter(tag =>
    (tag.name?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
    (tag.name_en?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
    (tag.name_zh?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
    (tag.slug?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
  )

  // Display name logic
  const displayName = (item: Category | Tag) => {
    if (!item) return ''
    return item.name_en || item.name || item.name_zh || ''
  }

  // Display description logic
  const displayDescription = (item: Category) => {
    if (!item) return ''
    return item.description || ''
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
  const categoryFields: FormField[] = [
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
  ]

  // Handle category form submission
  const handleCategorySubmit = async (values: any) => {
    try {
      setCreatingCategory(true)
      // Auto-generate slug if not provided, use the first language's name as the slug
      if (!values.slug && values.name) {
        values.slug = slugify(values.name.en || values.name.zh || '')
      }
      // Convert form values to backend schema
      const payload = {
        name: values.name.en, // main field as string
        name_en: values.name.en,
        name_zh: values.name.zh,
        slug: values.slug,
        description: values.description?.zh || '',
        description_en: values.description?.en || '',
        description_zh: values.description?.zh || '',
        // Add other fields if needed
      }
      if (editingCategory) {
        const response = await apiService.updateCategory(editingCategory._id, payload) as unknown as import("@/types").ApiResponse<Category & { postCount?: number }>
        console.log("response", response)
        if (response.success) {
          setCategories(categories.map(cat => 
            cat._id === editingCategory._id ? { ...cat, ...payload } : cat
          ))
          toast({
            title: "Success",
            description: "Category updated successfully"
          })
        }
      } else {
        const response = await apiService.createCategory(payload) as unknown as import("@/types").ApiResponse<Category & { postCount?: number }>
        if (response.success && response.data) {
          const newCategory = (response.data as any).category ? (response.data as any).category : response.data;
          setCategories([...categories, newCategory])
          toast({
            title: "Success",
            description: "Category created successfully"
          })
        }
      }
      setCategoryDialogOpen(false)
    } catch (error) {
      console.error('Failed to save category:', error)
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive"
      })
    } finally {
      setCreatingCategory(false)
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
  const tagFields: FormField[] = [
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
  ]

  // Handle tag form submission
  const handleTagSubmit = async (values: any) => {
    try {
      setCreatingTag(true)
      // Auto-generate slug if not provided, use the first language's name as the slug
      if (!values.slug && values.name) {
        values.slug = slugify(values.name.en || values.name.zh || '')
      }
      // Convert form values to backend schema
      const payload = {
        name: values.name.en, // main field as string
        name_en: values.name.en,
        name_zh: values.name.zh,
        slug: values.slug,
        description: values.description?.zh || '',
        description_en: values.description?.en || '',
        description_zh: values.description?.zh || '',
      }
      if (editingTag) {
        const response = await apiService.updateTag(editingTag._id, payload) as unknown as import("@/types").ApiResponse<Tag & { postCount?: number }>
        if (response.success) {
          setTags(tags.map(tag => 
            tag._id === editingTag._id ? { ...tag, ...payload } : tag
          ))
          toast({
            title: "Success",
            description: "Tag updated successfully"
          })
        }
      } else {
        const response = await apiService.createTag(payload) as unknown as import("@/types").ApiResponse<Tag & { postCount?: number }>
        if (response.success && response.data) {
          const newTag = (response.data as any).tag ? (response.data as any).tag : response.data;
          setTags([...tags, newTag])
          toast({
            title: "Success",
            description: "Tag created successfully"
          })
        }
      }
      setTagDialogOpen(false)
    } catch (error) {
      console.error('Failed to save tag:', error)
      toast({
        title: "Error",
        description: "Failed to save tag",
        variant: "destructive"
      })
    } finally {
      setCreatingTag(false)
    }
  }

  // Delete category
  const handleDeleteCategory = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete the category "${displayName(category)}"?`)) {
      return
    }
    
    try {
      const response = await apiService.deleteCategory(category._id) as unknown as import("@/types").ApiResponse<null>
      if (response.success) {
        setCategories(categories.filter(cat => cat._id !== category._id))
        toast({
          title: "Success",
          description: "Category deleted successfully"
        })
      }
    } catch (error) {
      console.error('Failed to delete category:', error)
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive"
      })
    }
  }

  const handleDeleteTag = async (tag: Tag) => {
    if (!confirm(`Are you sure you want to delete the tag "${displayName(tag)}"?`)) {
      return
    }
    
    try {
      const response = await apiService.deleteTag(tag._id) as unknown as import("@/types").ApiResponse<null>
      if (response.success) {
        setTags(tags.filter(t => t._id !== tag._id))
        toast({
          title: "Success",
          description: "Tag deleted successfully"
        })
      }
    } catch (error) {
      console.error('Failed to delete tag:', error)
      toast({
        title: "Error",
        description: "Failed to delete tag",
        variant: "destructive"
      })
    }
  }

  // The postCount field exists in mock data but not in types/Category. Use intersection type here; consider updating type definitions later.
  const getPostCount = (item: Category & { postCount?: number }) => item.postCount ?? 0

  // Tool function: convert Category to form defaultValues structure
  const getCategoryDefaultValues = (category: Category | null) => {
    if (!category) {
      return {
        name: { zh: "", en: "" },
        slug: "",
        description: { zh: "", en: "" }
      };
    }
    return {
      name: {
        zh: category.name_zh || "",
        en: category.name_en || ""
      },
      slug: category.slug || "",
      description: {
        zh: (category as any).description_zh || category.description || "",
        en: (category as any).description_en || category.description || ""
      }
    };
  };

  // Tool function: convert Tag to form defaultValues structure
  const getTagDefaultValues = (tag: Tag | null) => {
    if (!tag) {
      return {
        name: { zh: "", en: "" },
        slug: ""
      };
    }
    return {
      name: {
        zh: (tag as any).name_zh || tag.name || "",
        en: (tag as any).name_en || tag.name || ""
      },
      slug: tag.slug || ""
    };
  };

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
        {/* Search bar */}
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
        
        {/* Tabs for categories and tags */}
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
                  <Card key={category._id} className="flex flex-col">
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
                          <Badge variant="outline">{getPostCount(category)} posts</Badge>
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
                  <Card key={tag._id} className="h-[120px]">
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
                        <Badge variant="outline">{getPostCount(tag)} posts</Badge>
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

      {/* Category form dialog */}
      <EntityFormDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        title={editingCategory ? "Edit Category" : "New Category"}
        description={editingCategory ? "Update category details" : "Create a new category"}
        defaultValues={getCategoryDefaultValues(editingCategory)}
        schema={categoryFormSchema}
        onSubmit={handleCategorySubmit}
        fields={categoryFields}
        loading={creatingCategory}
        submitText={editingCategory ? "Update" : "Create"}
      />
      
      {/* Tag form dialog */}
      <EntityFormDialog
        open={tagDialogOpen}
        onOpenChange={setTagDialogOpen}
        title={editingTag ? "Edit Tag" : "New Tag"}
        description={editingTag ? "Update tag details" : "Create a new tag"}
        defaultValues={getTagDefaultValues(editingTag)}
        schema={tagFormSchema}
        onSubmit={handleTagSubmit}
        fields={tagFields}
        loading={creatingTag}
        submitText={editingTag ? "Update" : "Create"}
      />
    </div>
  )
}
