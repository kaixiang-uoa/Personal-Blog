"use client";

import { Eye, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/inputs/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { MediaItemProps } from "@/types/media";

import { formatFileSize, getFullUrl } from "./utils";

export function MediaItem({
  item,
  isSelected,
  onSelect,
  onViewDetails,
  onCopyUrl,
  onDelete,
  onImageError,
}: MediaItemProps) {
  const handleCardClick = () => {
    onSelect(item._id);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(item);
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyUrl(getFullUrl(item.url));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item._id);
  };

  const renderMediaPreview = () => {
    if (item.mimetype.startsWith("image/")) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={item.url}
            alt={item.filename}
            fill
            className="object-cover rounded"
            loading="lazy"
            onError={e => onImageError(item, e)}
          />
        </div>
      );
    }

    if (item.mimetype.startsWith("application/pdf")) {
      return (
        <div className="flex items-center justify-center h-full bg-muted">
          <span className="text-2xl text-muted-foreground">PDF</span>
        </div>
      );
    }

    if (item.mimetype.startsWith("video/")) {
      return (
        <div className="flex items-center justify-center h-full bg-muted">
          <span className="text-2xl text-muted-foreground">Video</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <span className="text-2xl text-muted-foreground">File</span>
      </div>
    );
  };

  return (
    <Card
      className={`cursor-pointer transition-colors group relative ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={handleCardClick}
    >
      <CardContent className="p-2 space-y-1">
        <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
          {renderMediaPreview()}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="absolute"
              onClick={handleViewDetails}
            >
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium truncate">{item.filename}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(item.size)}
          </p>
        </div>
        <div className="absolute top-1 right-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewDetails}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyUrl}>
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={getFullUrl(item.url)}
                  download={item.filename}
                  onClick={e => e.stopPropagation()}
                >
                  Download
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
