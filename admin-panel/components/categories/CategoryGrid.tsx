import { Edit, PlusCircle, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/data-display/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import { Button } from "@/components/ui/inputs/button";
import { CategoryGridProps } from "@/types/categories";

import { displayName, getPostCount } from "./utils";

export function CategoryGrid({
  categories,
  loading,
  onEdit,
  onDelete,
  onCreateNew,
}: CategoryGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={`category-skeleton-${i}`}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <Card className="md:col-span-2 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center h-32">
          <p className="text-muted-foreground mb-4">No categories found</p>
          <Button onClick={onCreateNew} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Category
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <Card
          key={category._id || `category-${index}`}
          className="flex flex-col"
        >
          <CardHeader className="pb-2 flex-shrink-0">
            <CardTitle className="text-xl flex items-center justify-between">
              {displayName(category)}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary">{category.slug}</Badge>
              <Badge variant="outline">{getPostCount(category)} posts</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {category.description_en ||
                category.description ||
                category.description_zh ||
                "No description available"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
