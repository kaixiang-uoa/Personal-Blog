"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clipboard, Download, Eye, MoreHorizontal, Search, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { mediaService } from "@/lib/services/media-service"
import type { Media } from "@/types/media"

// Format file size helper
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export default function MediaPage() {
  const { toast } = useToast()
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Media | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function fetchMediaItems() {
      try {
        setLoading(true)
        
        // Fetch media items from API
        const response = await mediaService.getAll()
        if (response.data) {
          setMediaItems(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch media items", error)
        toast({
          title: "Failed to fetch media",
          description: "Please check your network connection and try again",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMediaItems()
  }, [toast])

  // Filter media items by search query
  const filteredItems = mediaItems.filter((item) => 
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Toggle item selection
  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  // Toggle select all items
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item._id))
    }
  }

  // Open media detail dialog
  const openDetailDialog = (item: Media) => {
    setSelectedItem(item)
    setDetailDialogOpen(true)
  }

  // Handle file input change
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      setUploading(true)
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i])
      }

      const response = await mediaService.upload(formData)
      if (response.data) {
        const newMedia = response.data as Media
        setMediaItems(prevItems => [newMedia, ...prevItems])
        toast({
          title: "Upload successful",
          description: `${files.length} file(s) have been uploaded`,
        })
      }
    } catch (error) {
      console.error("Failed to upload files", error)
      toast({
        title: "Upload failed",
        description: "Unable to upload files, please try again",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setUploadDialogOpen(false)
    }
  }

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)
      const formData = new FormData()
      files.forEach(file => formData.append("files", file))
      handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>)
    }
  }, [])

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  // Handle media deletion
  const handleDeleteMedia = async () => {
    if (selectedItems.length === 0) return

    try {
      await mediaService.delete(selectedItems)
      setMediaItems(mediaItems.filter((item) => !selectedItems.includes(item._id)))
      setSelectedItems([])
      toast({
        title: "Deleted successfully",
        description: `${selectedItems.length} item(s) have been deleted`,
      })
    } catch (error) {
      console.error("Failed to delete media", error)
      toast({
        title: "Delete failed",
        description: "Unable to delete items, please try again",
        variant: "destructive",
      })
    }
  }

  // Copy URL to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "URL copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setUploadDialogOpen(true)} className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            Upload Media
          </Button>
          {selectedItems.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleDeleteMedia}
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
                    {item.type === "image" ? (
                      <Image src={item.url || "/placeholder.svg"} alt={item.filename} fill className="object-cover" />
                    ) : item.type === "document" ? (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <span className="text-2xl text-muted-foreground">PDF</span>
                      </div>
                    ) : item.type === "video" ? (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <span className="text-2xl text-muted-foreground">Video</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <span className="text-2xl text-muted-foreground">File</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute"
                        onClick={(e) => {
                          e.stopPropagation()
                          openDetailDialog(item)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">{item.filename}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(item.size)}</p>
                  </div>
                  <div className="absolute top-1 right-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            openDetailDialog(item)
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(item.url)
                          }}
                        >
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={item.url} download={item.filename} onClick={(e) => e.stopPropagation()}>
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedItems([item._id])
                            setDeleteDialogOpen(true)
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
                <p className="text-muted-foreground mb-4">No media files found</p>
                <Button onClick={() => setUploadDialogOpen(true)} className="flex items-center gap-1">
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
              This action will permanently delete {selectedItems.length} file(s) and cannot be undone. Are you sure?
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
              Upload images, documents, or other media files. Maximum file size is 10MB.
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
                {selectedItem.type === "image" ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={selectedItem.url || "/placeholder.svg"}
                      alt={selectedItem.filename}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : selectedItem.type === "document" ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">PDF</span>
                      <p className="text-sm text-muted-foreground">Preview not available</p>
                    </div>
                  </div>
                ) : selectedItem.type === "video" ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">Video</span>
                      <p className="text-sm text-muted-foreground">Preview not available</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">File</span>
                      <p className="text-sm text-muted-foreground">Preview not available</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Filename</h3>
                  <p>{selectedItem.filename}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">URL</h3>
                  <div className="flex items-center gap-2">
                    <Input value={selectedItem.url} readOnly />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(selectedItem.url)}>
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Type</h3>
                    <p>{selectedItem.mimetype}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Size</h3>
                    <p>{formatFileSize(selectedItem.size)}</p>
                  </div>
                </div>
                {selectedItem.dimensions && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Width</h3>
                      <p>{selectedItem.dimensions.width}px</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Height</h3>
                      <p>{selectedItem.dimensions.height}px</p>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Upload Date</h3>
                  <p>{new Date(selectedItem.uploadDate).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" asChild className="flex-1 gap-1">
                    <a href={selectedItem.url} download={selectedItem.filename}>
                      <Download className="h-4 w-4" /> Download
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 gap-1"
                    onClick={() => {
                      setSelectedItems([selectedItem._id])
                      setDeleteDialogOpen(true)
                      setDetailDialogOpen(false)
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
  )
}
