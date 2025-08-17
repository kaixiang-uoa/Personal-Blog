import { BookmarkPlus, Search, Tag as TagIcon } from "lucide-react";

import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { CategoriesToolbarProps } from "@/types/categories";

export function CategoriesToolbar({
  searchQuery,
  onSearchChange,
  onCreateCategory,
  onCreateTag,
}: CategoriesToolbarProps) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Categories and Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onCreateCategory}
            className="flex items-center gap-1"
          >
            <BookmarkPlus className="h-4 w-4" />
            New Category
          </Button>
          <Button
            onClick={onCreateTag}
            variant="outline"
            className="flex items-center gap-1"
          >
            <TagIcon className="h-4 w-4" />
            New Tag
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="w-full relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories or tags..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
}
