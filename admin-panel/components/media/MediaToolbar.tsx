"use client";

import { Search, Trash2, Upload } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { MediaToolbarProps } from "@/types/media";

export function MediaToolbar({
  searchQuery,
  onSearchChange,
  selectedCount,
  onUpload,
  onDeleteSelected,
}: MediaToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="w-full relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search media files..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        {selectedCount > 0 && (
          <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete ({selectedCount})
          </Button>
        )}
        <Button onClick={onUpload} className="flex items-center gap-1">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
}
