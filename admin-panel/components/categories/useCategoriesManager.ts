import { useEffect, useState } from "react";

import { useToast } from "@/hooks/ui/use-toast";
import { apiService } from "@/lib/api";
import { errorHandler } from "@/lib/errors/errorHandler";
import { slugify } from "@/lib/utils";
import { Category, Tag, FormField } from "@/types";
import { CategoryFormData, TagFormData } from "@/types/categories";

import { filterCategories, filterTags } from "./utils";

export function useCategoriesManager() {
  const { toast } = useToast();

  // State
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingTag, setCreatingTag] = useState(false);

  // Form field definitions
  const categoryFields: FormField[] = [
    {
      name: "name.en",
      type: "text",
      label: "Name (English)",
      placeholder: "Enter category name in English",
      required: true,
    },
    {
      name: "name.zh",
      type: "text",
      label: "Name (Chinese)",
      placeholder: "Enter category name in Chinese",
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      placeholder: "Auto-generated from English name",
      required: true,
    },
    {
      name: "description.en",
      type: "textarea",
      label: "Description (English)",
      placeholder: "Enter category description in English",
    },
    {
      name: "description.zh",
      type: "textarea",
      label: "Description (Chinese)",
      placeholder: "Enter category description in Chinese",
    },
  ];

  const tagFields: FormField[] = [
    {
      name: "name.en",
      type: "text",
      label: "Name (English)",
      placeholder: "Enter tag name in English",
      required: true,
    },
    {
      name: "name.zh",
      type: "text",
      label: "Name (Chinese)",
      placeholder: "Enter tag name in Chinese",
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      placeholder: "Auto-generated from English name",
      required: true,
    },
  ];

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fix type assertion: data is an object containing categories/count or tags/count
        const categoriesRes =
          (await apiService.getCategories()) as unknown as import("@/types").ApiResponse<{
            categories: (Category & { postCount?: number })[];
            count: number;
          }>;
        const tagsRes =
          (await apiService.getTags()) as unknown as import("@/types").ApiResponse<{
            tags: (Tag & { postCount?: number })[];
            count: number;
          }>;
        // Print the fetched data structure for debugging
        if (
          categoriesRes.success &&
          Array.isArray(categoriesRes.data?.categories)
        ) {
          setCategories(categoriesRes.data.categories);
        }
        if (tagsRes.success && Array.isArray(tagsRes.data?.tags)) {
          setTags(tagsRes.data.tags);
        }
      } catch (error) {
        const apiError = errorHandler.handle(error);
        errorHandler.logError(apiError, "Categories Data Fetch");
        toast({
          title: "Error",
          description: apiError.getUserMessage(),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  // Filtered data
  const filteredCategories = filterCategories(categories, searchQuery);
  const filteredTags = filterTags(tags, searchQuery);

  // Category handlers
  const openNewCategoryDialog = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleCategorySubmit = async (values: CategoryFormData) => {
    const primaryName = values.name.en || values.name.zh;
    const categoryData = {
      name: primaryName, // Backend requires 'name' field
      name_en: values.name.en,
      name_zh: values.name.zh,
      slug: values.slug || slugify(primaryName),
      description: values.description.en || values.description.zh, // Backend requires 'description' field
      description_en: values.description.en,
      description_zh: values.description.zh,
    };

    try {
      setCreatingCategory(true);

      if (editingCategory) {
        await apiService.updateCategory(editingCategory._id, categoryData);
        setCategories(prev =>
          prev.map(cat =>
            cat._id === editingCategory._id ? { ...cat, ...categoryData } : cat
          )
        );
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        const response = await apiService.createCategory(categoryData);
        if (response.data && response.data.category) {
          setCategories(prev => [...prev, response.data.category]);
          toast({
            title: "Success",
            description: "Category created successfully",
          });
        }
      }
      setCategoryDialogOpen(false);
      setEditingCategory(null);
    } catch (error: unknown) {
      const apiError = errorHandler.handle(error);
      errorHandler.logError(apiError, "Category Save");
      console.error("Category creation error details:", error);

      // Type guard for axios error
      const axiosError = error as {
        response?: {
          data?: { error?: { message?: string } | string; message?: string };
        };
      };
      console.error("Response data:", axiosError?.response?.data);

      // Get more specific error message
      let errorMessage: string;
      const responseData = axiosError?.response?.data;

      if (responseData?.error) {
        if (typeof responseData.error === "string") {
          errorMessage = responseData.error;
        } else if (responseData.error.message) {
          errorMessage = responseData.error.message;
        } else {
          errorMessage = errorHandler.getUserMessage(apiError);
        }
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else {
        errorMessage = errorHandler.getUserMessage(apiError);
      }

      // Handle specific slug duplicate error
      if (
        errorMessage.includes("slug is already in use") ||
        errorMessage.includes("slug already exists")
      ) {
        errorMessage = `The slug "${categoryData.slug}" is already in use. Please choose a different name or manually set a unique slug.`;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await apiService.deleteCategory(category._id);
      setCategories(prev => prev.filter(cat => cat._id !== category._id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      const apiError = errorHandler.handle(error);
      errorHandler.logError(apiError, "Category Delete");
      toast({
        title: "Error",
        description: apiError.getUserMessage(),
        variant: "destructive",
      });
    }
  };

  // Tag handlers
  const openNewTagDialog = () => {
    setEditingTag(null);
    setTagDialogOpen(true);
  };

  const openEditTagDialog = (tag: Tag) => {
    setEditingTag(tag);
    setTagDialogOpen(true);
  };

  const handleTagSubmit = async (values: TagFormData) => {
    const primaryName = values.name.en || values.name.zh;
    const generatedSlug = values.slug || slugify(primaryName || "");

    try {
      setCreatingTag(true);

      // Validation
      if (!primaryName) {
        toast({
          title: "Error",
          description: "Please provide at least one name (English or Chinese)",
          variant: "destructive",
        });
        return;
      }

      if (!generatedSlug) {
        toast({
          title: "Error",
          description: "Unable to generate slug. Please provide a valid name.",
          variant: "destructive",
        });
        return;
      }

      const tagData = {
        name: primaryName,
        name_en: values.name.en,
        name_zh: values.name.zh,
        slug: generatedSlug,
      };

      if (editingTag) {
        await apiService.updateTag(editingTag._id, tagData);
        setTags(prev =>
          prev.map(tag =>
            tag._id === editingTag._id ? { ...tag, ...tagData } : tag
          )
        );
        toast({
          title: "Success",
          description: "Tag updated successfully",
        });
      } else {
        const response = await apiService.createTag(tagData);
        if (response.data && response.data.tag) {
          setTags(prev => [...prev, response.data.tag]);
          toast({
            title: "Success",
            description: "Tag created successfully",
          });
        }
      }
      setTagDialogOpen(false);
      setEditingTag(null);
    } catch (error: unknown) {
      const apiError = errorHandler.handle(error);
      errorHandler.logError(apiError, "Tag Save");
      console.error("Tag creation error details:", error);

      // Type guard for axios error
      const axiosError = error as {
        response?: {
          data?: { error?: { message?: string } | string; message?: string };
          status?: number;
        };
      };
      console.error("Response data:", axiosError?.response?.data);
      console.error("Response status:", axiosError?.response?.status);

      // Get more specific error message
      let errorMessage: string;
      const responseData = axiosError?.response?.data;

      if (responseData?.error) {
        if (typeof responseData.error === "string") {
          errorMessage = responseData.error;
        } else if (responseData.error.message) {
          errorMessage = responseData.error.message;
        } else {
          errorMessage = errorHandler.getUserMessage(apiError);
        }
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else {
        errorMessage = errorHandler.getUserMessage(apiError);
      }

      // Handle specific slug duplicate error
      if (
        errorMessage.includes("slug is already in use") ||
        errorMessage.includes("slug already exists")
      ) {
        errorMessage = `The slug "${generatedSlug}" is already in use. Please choose a different name or manually set a unique slug.`;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setCreatingTag(false);
    }
  };

  const handleDeleteTag = async (tag: Tag) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;

    try {
      await apiService.deleteTag(tag._id);
      setTags(prev => prev.filter(t => t._id !== tag._id));
      toast({
        title: "Success",
        description: "Tag deleted successfully",
      });
    } catch (error) {
      const apiError = errorHandler.handle(error);
      errorHandler.logError(apiError, "Tag Delete");
      toast({
        title: "Error",
        description: apiError.getUserMessage(),
        variant: "destructive",
      });
    }
  };

  return {
    // State
    categories,
    tags,
    loading,
    searchQuery,
    categoryDialogOpen,
    tagDialogOpen,
    editingCategory,
    editingTag,
    creatingCategory,
    creatingTag,
    filteredCategories,
    filteredTags,
    categoryFields,
    tagFields,

    // Setters
    setSearchQuery,
    setCategoryDialogOpen,
    setTagDialogOpen,

    // Handlers
    openNewCategoryDialog,
    openEditCategoryDialog,
    handleCategorySubmit,
    handleDeleteCategory,
    openNewTagDialog,
    openEditTagDialog,
    handleTagSubmit,
    handleDeleteTag,
  };
}
