"use client";

import { useState } from "react";

import {
  CategoryGrid,
  CategoriesToolbar,
  TagGrid,
  useCategoriesManager,
  getCategoryDefaultValues,
  getTagDefaultValues,
} from "@/components/categories";
import { EntityFormDialog } from "@/components/posts/EntityFormDialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import {
  categoryFormSchema,
  tagFormSchema,
} from "@/lib/validators/form-validation";

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("categories");

  const {
    // State
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
  } = useCategoriesManager();

  return (
    <div className="space-y-6">
      <CategoriesToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateCategory={openNewCategoryDialog}
        onCreateTag={openNewTagDialog}
      />

      <div className="flex flex-col gap-4">
        {/* Tabs for categories and tags */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Categories Tab Content */}
          <TabsContent value="categories" className="mt-6">
            <CategoryGrid
              categories={filteredCategories}
              loading={loading}
              onEdit={openEditCategoryDialog}
              onDelete={handleDeleteCategory}
              onCreateNew={openNewCategoryDialog}
            />
          </TabsContent>

          {/* Tags Tab Content */}
          <TabsContent value="tags" className="mt-6">
            <TagGrid
              tags={filteredTags}
              loading={loading}
              onEdit={openEditTagDialog}
              onDelete={handleDeleteTag}
              onCreateNew={openNewTagDialog}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Category form dialog */}
      <EntityFormDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        title={editingCategory ? "Edit Category" : "New Category"}
        description={
          editingCategory ? "Update category details" : "Create a new category"
        }
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
  );
}
