"use client";

import {
  Clipboard,
  Download,
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/data-display/card";
import { Skeleton } from "@/components/ui/data-display/skeleton";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/feedback/dialog";
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { useToast } from "@/hooks/ui/use-toast";
import { apiService } from "@/lib/api";
import { Media, ApiResponse, PaginatedResponse } from "@/types";

// base url constant
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// helper function to get full url
const getFullUrl = (path: string): string => {
  // 如果是完整的 URL（包括 http 或 https），直接返回
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // 如果是 S3 URL（包含 .amazonaws.com），直接返回
  if (path.includes(".amazonaws.com")) {
    return path;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // 如果路径已经包含 /api/v1，直接使用
  if (normalizedPath.includes("/api/v1")) {
    return `${API_BASE_URL.replace("/api/v1", "")}${normalizedPath}`;
  }
  
  // 否则添加 /api/v1/media/uploads 前缀
  return `${API_BASE_URL.replace("/api/v1", "")}/api/v1/media/uploads${normalizedPath}`;
};

// helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// test if url is accessible
const testUrl = async (url: string) => {
  try {
    // 如果是 S3 URL，直接返回成功
    if (url.includes('.amazonaws.com')) {
      return {
        status: 200,
        ok: true,
        contentType: 'image/*',
        url,
      };
    }

    // 尝试访问图片
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    // 如果是 JSON 响应，读取错误信息
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      return {
        status: response.status,
        ok: response.ok,
        contentType,
        url,
        errorData,
        headers: Object.fromEntries(response.headers.entries()),
      };
    }

    return {
      status: response.status,
      ok: response.ok,
      contentType,
      url,
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      url,
    };
  }
};

export default function MediaPage() {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Media | null>(null);
  const [uploading, setUploading] = useState(false);
  const [retryCount, setRetryCount] = useState({});

  // fetch media files
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await apiService.getMedia<PaginatedResponse<Media>>();
        if (response.data?.data) {
          setMediaItems(response.data.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch media files",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [toast]);

  // filter media items based on search query
  const filteredItems = useMemo(() => 
    mediaItems.filter((item) => {
      if (!item || !item.filename) return false;
      return item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    }),
    [mediaItems, searchQuery]
  );

  // toggle item selection
  const toggleSelectItem = useCallback((id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  }, []);

  // toggle select all items
  const toggleSelectAll = useCallback(() => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item._id));
    }
  }, [selectedItems.length, filteredItems]);

  // open media detail dialog
  const openDetailDialog = useCallback((item: Media) => {
    setSelectedItem(item);
    setDetailDialogOpen(true);
  }, []);

  // handle file input change
  const handleFileChange = useCallback(async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;


    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }


    try {
      const response = await apiService.uploadMedia<{ media: Media[] }>(formData);
      const mediaData = response.data?.media;
      if (response.success && mediaData && Array.isArray(mediaData)) {
        setMediaItems((prev) => [...prev, ...mediaData]);
        toast({
          title: "Success",
          description: "Files uploaded successfully",
        });
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadDialogOpen(false);
    }
  }, [toast]);

  // handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileChange({
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [handleFileChange]);

  // handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // handle media delete
  const handleDeleteMedia = useCallback(async () => {
    if (selectedItems.length === 0) return;

    try {
      setLoading(true);

      // delete all selected files
      await Promise.all(
        selectedItems.map((id) => apiService.deleteMedia<ApiResponse>(id)),
      );

      // refresh media list
      const response = await apiService.getMedia<PaginatedResponse<Media>>();
      if (response.data?.data) {
        setMediaItems(response.data.data);
      }

      setSelectedItems([]);
      toast({
        title: "Deleted successfully",
        description: `${selectedItems.length} item(s) have been deleted`,
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Unable to delete selected items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  }, [selectedItems, toast]);

  // copy url to clipboard
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "URL copied to clipboard",
    });
  }, [toast]);

  // Add retry logic for image loading
  const handleImageError = (item: Media, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image load error:', {
      url: item.url,
      error: e,
      retryCount: retryCount[item._id] || 0
    });

    // Retry up to 3 times
    if ((retryCount[item._id] || 0) < 3) {
      setRetryCount((prev: Record<string, number>) => ({
        ...prev,
        [item._id]: (prev[item._id] || 0) + 1
      }));
      
      // Force image reload with a different URL format
      const img = e.target as HTMLImageElement;
      if (item.url.includes('.amazonaws.com')) {
        // For S3 URLs, try direct URL without Next.js image optimization
        img.src = item.url;
      } else {
        // For other URLs, try with retry parameter
      img.src = item.url + '?retry=' + (retryCount[item._id] || 0);
      }
    } else {
      // After 3 retries, show error toast and set a fallback image
      toast({
        title: "Image Load Error",
        description: `Failed to load image after 3 attempts: ${item.filename}`,
        variant: "destructive",
      });
      
      // Set a fallback image
      const img = e.target as HTMLImageElement;
      img.src = '/images/fallback-image.png'; // Make sure to add a fallback image in your public folder
      img.onerror = null; // Remove the error handler to prevent infinite loop
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Upload className="h-4 w-4" />
            Upload Media
          </Button>
          {selectedItems.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Search bar */}
        <div className="w-full relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media files..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Media grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            // Loading state
            Array.from({ length: 12 }).map((_, i) => (
              <Card key={`media-skeleton-${i}`}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card
                key={item._id}
                className={`relative group cursor-pointer ${selectedItems.includes(item._id) ? "ring-2 ring-primary" : ""}`}
                onClick={() => toggleSelectItem(item._id)}
              >
                <CardContent className="p-2 space-y-1">
                  <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
                    {item.mimetype.startsWith("image/") ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={item.url}
                          alt={item.filename}
                          className="object-cover w-full h-full rounded"
                          loading="lazy"
                          onError={(e) => handleImageError(item, e)}
                        />
                      </div>
                    ) : item.mimetype.startsWith("application/pdf") ? (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <span className="text-2xl text-muted-foreground">
                          PDF
                        </span>
                      </div>
                    ) : item.mimetype.startsWith("video/") ? (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <span className="text-2xl text-muted-foreground">
                          Video
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <span className="text-2xl text-muted-foreground">
                          File
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailDialog(item);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">
                      {item.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                  <div className="absolute top-1 right-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetailDialog(item);
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(getFullUrl(item.url));
                          }}
                        >
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a
                            href={getFullUrl(item.url)}
                            download={item.filename}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItems([item._id]);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="md:col-span-3 lg:col-span-4">
              <CardContent className="flex flex-col items-center justify-center h-32">
                <p className="text-muted-foreground mb-4">
                  No media files found
                </p>
                <Button
                  onClick={() => setUploadDialogOpen(true)}
                  className="flex items-center gap-1"
                >
                  <Upload className="h-4 w-4" />
                  Upload Media
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete {selectedItems.length} file(s)
              and cannot be undone. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMedia}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Upload dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload images, documents, or other media files. Maximum file size
              is 10MB.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail dialog */}
      {selectedItem && (
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Media Details</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-md overflow-hidden flex items-center justify-center">
                {selectedItem.mimetype.startsWith("image/") ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={getFullUrl(selectedItem.url)}
                      alt={selectedItem.filename}
                      fill
                      className="object-contain"
                      onError={(e) => handleImageError(selectedItem, e)}
                    />
                  </div>
                ) : selectedItem.mimetype.startsWith("application/pdf") ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">PDF</span>
                      <p className="text-sm text-muted-foreground">
                        Preview not available
                      </p>
                    </div>
                  </div>
                ) : selectedItem.mimetype.startsWith("video/") ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">Video</span>
                      <p className="text-sm text-muted-foreground">
                        Preview not available
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">File</span>
                      <p className="text-sm text-muted-foreground">
                        Preview not available
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Filename
                  </h3>
                  <p>{selectedItem.filename}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Original Name
                  </h3>
                  <p>{selectedItem.originalname}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    URL
                  </h3>
                  <div className="flex items-center gap-2">
                    <Input value={getFullUrl(selectedItem.url)} readOnly />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(getFullUrl(selectedItem.url))
                      }
                    >
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Type
                    </h3>
                    <p>{selectedItem.mimetype}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Size
                    </h3>
                    <p>{formatFileSize(selectedItem.size)}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Upload Date
                  </h3>
                  <p>{new Date(selectedItem.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" asChild className="flex-1 gap-1">
                    <a
                      href={getFullUrl(selectedItem.url)}
                      download={selectedItem.filename}
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 gap-1"
                    onClick={() => {
                      setSelectedItems([selectedItem._id]);
                      setDeleteDialogOpen(true);
                      setDetailDialogOpen(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
