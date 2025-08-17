"use client";

import React from "react";

import { Skeleton } from "@/components/ui/data-display/skeleton";
import { MediaGridProps } from "@/types/media";

import { MediaItem } from "./MediaItem";

export function MediaGrid({
  mediaItems,
  loading,
  selectedItems,
  searchQuery,
  onSelectItem,
  onViewDetails,
  onCopyUrl,
  onDeleteItem,
  onImageError,
}: MediaGridProps) {
  const filteredItems = mediaItems.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {searchQuery
            ? "No media found matching your search."
            : "No media files found."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredItems.map(item => (
        <MediaItem
          key={item._id}
          item={item}
          isSelected={selectedItems.includes(item._id)}
          onSelect={onSelectItem}
          onViewDetails={onViewDetails}
          onCopyUrl={onCopyUrl}
          onDelete={onDeleteItem}
          onImageError={onImageError}
        />
      ))}
    </div>
  );
}
