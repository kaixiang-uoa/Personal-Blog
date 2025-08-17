import { useState, useEffect, useCallback } from "react";

import { useToast } from "@/hooks/ui/use-toast";
import { apiService } from "@/lib/api";
import { errorHandler } from "@/lib/errors/errorHandler";
import { Media, PaginatedResponse } from "@/types";

import { testUrl } from "./utils";

export function useMediaManager() {
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
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});

  // Fetch media items
  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getMedia<PaginatedResponse<Media>>();
      if (response.success && response.data) {
        setMediaItems(response.data.data || []);
      }
    } catch (error) {
      const apiError = errorHandler.handle(error);
      errorHandler.logError(apiError, "Media Fetch");
      toast({
        title: "Error",
        description: apiError.getUserMessage(),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load media on mount
  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Handle item selection
  const handleSelectItem = useCallback((id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  // Handle image error with retry
  const handleImageError = useCallback(
    async (item: Media, e: React.SyntheticEvent<HTMLImageElement>) => {
      const currentRetryCount = retryCount[item._id] || 0;

      if (currentRetryCount < 3) {
        setRetryCount(prev => ({
          ...prev,
          [item._id]: currentRetryCount + 1,
        }));

        try {
          await testUrl(item.url);

          // Force reload the image
          setTimeout(() => {
            const img = e.target as HTMLImageElement;
            img.src = `${item.url}?retry=${currentRetryCount + 1}`;
          }, 1000);
        } catch (error) {
          console.error(`Retry failed for ${item.filename}:`, error);
        }
      } else {
        console.error(`Max retries reached for ${item.filename}`);
        toast({
          title: "Image Load Error",
          description: `Failed to load ${item.filename} after multiple attempts`,
          variant: "destructive",
        });
      }
    },
    [retryCount, toast]
  );

  // Copy URL to clipboard
  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Copied!",
          description: "URL copied to clipboard",
        });
      } catch (error) {
        console.error("Failed to copy:", error);
        toast({
          title: "Error",
          description: "Failed to copy URL",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  // Open detail dialog
  const openDetailDialog = useCallback((item: Media) => {
    setSelectedItem(item);
    setDetailDialogOpen(true);
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (files.length === 0) return;

      setUploading(true);
      const formData = new FormData();

      Array.from(files).forEach(file => {
        formData.append("files", file);
      });

      try {
        const response = await apiService.uploadMedia(formData);

        if (response.success) {
          toast({
            title: "Success",
            description: `${files.length} file(s) uploaded successfully`,
          });
          setUploadDialogOpen(false);
          fetchMedia(); // Refresh the list
        } else {
          throw new Error(response.message || "Upload failed");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast({
          title: "Upload Failed",
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    },
    [toast, fetchMedia]
  );

  // Handle file change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFileUpload(files);
        // Reset the input value to allow uploading the same file again
        e.target.value = "";
      }
    },
    [handleFileUpload]
  );

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files) {
        handleFileUpload(files);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Delete media
  const handleDeleteMedia = useCallback(async () => {
    try {
      for (const id of selectedItems) {
        await apiService.deleteMedia(id);
      }
      toast({
        title: "Success",
        description: `${selectedItems.length} file(s) deleted successfully`,
      });
      setSelectedItems([]);
      setDeleteDialogOpen(false);
      fetchMedia(); // Refresh the list
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete selected files",
        variant: "destructive",
      });
    }
  }, [selectedItems, toast, fetchMedia]);

  // Handle delete selected
  const handleDeleteSelected = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  // Handle delete single item
  const handleDeleteItem = useCallback((id: string) => {
    setSelectedItems([id]);
    setDeleteDialogOpen(true);
  }, []);

  return {
    // State
    mediaItems,
    loading,
    searchQuery,
    selectedItems,
    deleteDialogOpen,
    uploadDialogOpen,
    detailDialogOpen,
    selectedItem,
    uploading,

    // Setters
    setSearchQuery,
    setDeleteDialogOpen,
    setUploadDialogOpen,
    setDetailDialogOpen,

    // Handlers
    handleSelectItem,
    handleImageError,
    copyToClipboard,
    openDetailDialog,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDeleteMedia,
    handleDeleteSelected,
    handleDeleteItem,
  };
}
