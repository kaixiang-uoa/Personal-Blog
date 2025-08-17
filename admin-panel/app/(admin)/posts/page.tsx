"use client";

import {
  ChevronDown,
  ChevronUp,
  Filter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/data-display/badge";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/data-display/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/feedback/alert-dialog";
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { useToast } from "@/hooks/ui/use-toast";
import { usePosts } from "@/hooks/usePosts";
import { apiService } from "@/lib/api";
import { PostStatus } from "@/types/posts";

export default function PostsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PostStatus>(PostStatus.ALL);
  const [sortField, setSortField] = useState("publishedAt"); 
  const [sortDirection, setSortDirection] = useState("desc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Use custom hook to fetch posts data
  const { posts, loading, refetch } = usePosts({
    status: statusFilter,
    sort: `${sortField}-${sortDirection}`,
    dependencies: [statusFilter, sortField, sortDirection],
  });

  // handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // filtered and sorted posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      // search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const title = post.title?.toLowerCase() || "";
        const excerpt = post.excerpt?.toLowerCase() || "";
        // search in title and excerpt
        if (title.includes(query) || excerpt.includes(query)) {
          return true;
        }

        // search in category
        const categoryMatch =
          Array.isArray(post.categories) &&
          post.categories.some(
            cat =>
              typeof cat === "object" &&
              cat?.name?.toLowerCase().includes(query)
          );

        // search in tag
        const tagMatch =
          Array.isArray(post.tags) &&
          post.tags.some(
            tag =>
              typeof tag === "object" &&
              tag?.name?.toLowerCase().includes(query)
          );

        return categoryMatch || tagMatch;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortField === "title") {
        return sortDirection === "asc"
          ? (a.title || "").localeCompare(b.title || "")
          : (b.title || "").localeCompare(a.title || "");
      }

      if (sortField === "status") {
        return sortDirection === "asc"
          ? (a.status || "").localeCompare(b.status || "")
          : (b.status || "").localeCompare(a.status || "");
      }

      if (sortField === "publishDate") {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (sortField === "viewCount") {
        const viewsA = a.viewCount || 0;
        const viewsB = b.viewCount || 0;
        return sortDirection === "asc" ? viewsA - viewsB : viewsB - viewsA;
      }

      // default sort by createdAt
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

  // handle delete post
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await apiService.deletePost(postToDelete);

      // Refresh data after successful deletion
      await refetch();
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setPostToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  // trigger delete dialog
  const handleDeleteClick = (post_id: string) => {
    setPostToDelete(post_id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Post Management</h2>
        <Button asChild>
          <Link href="/posts/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, excerpt, category or tag..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value: string) =>
              setStatusFilter(value as PostStatus)
            }
            defaultValue={PostStatus.ALL}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PostStatus.ALL}>All Statuses</SelectItem>
              <SelectItem value={PostStatus.PUBLISHED}>Published</SelectItem>
              <SelectItem value={PostStatus.DRAFT}>Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[300px]"
                onClick={() => handleSort("title")}
                role="button"
              >
                <div className="flex items-center gap-1">
                  Title
                  {sortField === "title" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Category/Tags
              </TableHead>
              <TableHead onClick={() => handleSort("status")} role="button">
                <div className="flex items-center gap-1">
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("publishDate")}
                className="hidden md:table-cell"
                role="button"
              >
                <div className="flex items-center gap-1">
                  Publish Date
                  {sortField === "publishDate" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("viewCount")}
                className="hidden lg:table-cell text-right"
                role="button"
              >
                <div className="flex items-center justify-end gap-1">
                  Views
                  {sortField === "viewCount" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`post-skeleton-row-${index}`}>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    <Skeleton className="h-5 w-12 ml-auto" />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : filteredAndSortedPosts.length > 0 ? (
              // posts list
              filteredAndSortedPosts.map((post, postIndex) => (
                <TableRow key={post._id || `post-row-${postIndex}`}>
                  <TableCell>
                    <div className="font-medium hover:underline">
                      <Link href={`/posts/${post._id}/preview`}>
                        {post.title}
                      </Link>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-1">
                      {Array.isArray(post.categories) &&
                      post.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mb-1">
                          {post.categories.map((category, catIndex) => (
                            <Badge
                              key={`${post._id}-cat-${catIndex}`}
                              variant="outline"
                            >
                              {typeof category === "object"
                                ? category.name || category.slug || "Category"
                                : "Category"}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <Badge variant="outline">Uncategorized</Badge>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(post.tags) && post.tags.length > 0 ? (
                          post.tags.map((tag, tagIndex) => (
                            <Badge
                              key={`${post._id}-tag-${tagIndex}`}
                              variant="secondary"
                              className="text-xs"
                            >
                              {typeof tag === "object"
                                ? tag.name || tag.slug || "Tag"
                                : "Tag"}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            No tags
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.status === "published" ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.status === "published" && post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Not published"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    {post.status === "published" ? post.viewCount : "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/posts/${post._id}/edit`}>
                            View/Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/posts/${post._id}/preview`}>
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(post._id)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // empty state
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No posts found. Try adjusting your search or filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              post from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
