import { Edit, PlusCircle, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/data-display/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import { Button } from "@/components/ui/inputs/button";
import { TagGridProps } from "@/types/categories";

import { displayName, getPostCount } from "./utils";

export function TagGrid({
  tags,
  loading,
  onEdit,
  onDelete,
  onCreateNew,
}: TagGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={`tag-skeleton-${i}`}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <Card className="md:col-span-3 lg:col-span-4">
        <CardContent className="flex flex-col items-center justify-center h-32">
          <p className="text-muted-foreground mb-4">No tags found</p>
          <Button onClick={onCreateNew} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Tag
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tags.map((tag, index) => (
        <Card key={tag._id || `tag-${index}`} className="h-[120px]">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{displayName(tag)}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(tag)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(tag)}
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
      ))}
    </div>
  );
}
