"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
import { Clipboard, Download, Eye, Filter, MoreHorizontal, Search, Trash2, Upload } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ApiService from "@/lib/api-service"

// Media item type definition
interface MediaItem {
  id: string
  filename: string
  url: string
  type: "image" | "document" | "video" | "other"
  size: number // in bytes
  dimensions?: { width: number; height: number }
  uploadDate: string
  mimeType: string
}

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
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    async function fetchMediaItems() {
      try {
        setLoading(true)
        
        // Fetch media items from API
        const response = await ApiService.media.getAll()
        if (response.data && response.data.media) {
          setMediaItems(response.data.media)
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

  // Filter media items by type and search query
  const filteredItems = mediaItems.filter((item) => {
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // Toggle item selection
  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  // Toggle select all items
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  // Open media detail dialog
  const openDetailDialog = (item: MediaItem) => {
    setSelectedItem(item)
    setDetailDialogOpen(true)
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files))
      setUploadDialogOpen(true)
    }
  }, [])

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) return

    try {
      setIsUploading(true)

      // Create FormData
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      
      // Upload files
      const response = await ApiService.media.upload(formData, (progressEvent: any) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(progress)
      })

      // Update media items list
      if (response.data && response.data.media) {
        setMediaItems(prevItems => [...response.data.media, ...prevItems])
      }

      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${files.length} file(s)`,
      })

      setFiles([])
      setUploadDialogOpen(false)
    } catch (error) {
      console.error("Failed to upload files", error)
      toast({
        title: "Upload Failed",
        description: "Unable to upload files, please try again",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Handle media deletion
  const handleDelete = async () => {
    if (selectedItems.length === 0) return

    try {
      // Delete selected media items
      await Promise.all(selectedItems.map(id => ApiService.media.delete(id)))

      setMediaItems(mediaItems.filter((item) => !selectedItems.includes(item.id)))

      toast({
        title: "Delete Successful",
        description: `Successfully deleted ${selectedItems.length} file(s)`,
      })

      setSelectedItems([])
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Failed to delete files", error)
      toast({
        title: "Delete Failed",
        description: "Unable to delete files, please try again",
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
        <Button onClick={() => setUploadDialogOpen(true)} className="flex items-center gap-1">
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media files..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="other">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between bg-muted p-2 rounded-md">
          <span className="text-sm">{selectedItems.length} item(s) selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedItems([])}>
              Cancel Selection
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      <div
        className="min-h-[400px] rounded-md border border-dashed p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {loading ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-2">
                    <Skeleton className="aspect-square w-full rounded-sm" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center p-2 border rounded-md">
                  <Skeleton className="h-10 w-10 rounded-sm" />
                  <div className="ml-3 flex-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          )
        ) : filteredItems.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`relative group cursor-pointer ${selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""}`}
                  onClick={() => toggleSelectItem(item.id)}
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
                              setSelectedItems([item.id])
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
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center p-2 border-b text-sm font-medium">
                <div className="w-10 flex justify-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </div>
                <span className="flex-1 ml-3">Filename</span>
                <span className="w-24 text-center">Type</span>
                <span className="w-24 text-center">Size</span>
                <span className="w-32 text-center">Upload Date</span>
                <span className="w-24 text-center">Actions</span>
              </div>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center p-2 border rounded-md hover:bg-muted/50 ${selectedItems.includes(item.id) ? "bg-muted" : ""}`}
                >
                  <div className="w-10 flex justify-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center flex-1 ml-3">
                    <div className="h-10 w-10 bg-muted rounded flex items-center justify-center mr-3">
                      {item.type === "image" ? (
                        <Image
                          src={item.url || "/placeholder.svg"}
                          alt={item.filename}
                          width={40}
                          height={40}
                          className="object-cover rounded"
                        />
                      ) : item.type === "document" ? (
                        <span className="text-xs text-muted-foreground">PDF</span>
                      ) : item.type === "video" ? (
                        <span className="text-xs text-muted-foreground">Video</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">File</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate">{item.filename}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(item.size)}</p>
                    </div>
                  </div>
                  <span className="w-24 text-center">
                    <Badge variant="outline">
                      {item.type === "image"
                        ? "Image"
                        : item.type === "document"
                          ? "Document"
                          : item.type === "video"
                            ? "Video"
                            : "Other"}
                    </Badge>
                  </span>
                  <span className="w-24 text-center text-sm">{formatFileSize(item.size)}</span>
                  <span className="w-32 text-center text-sm">{new Date(item.uploadDate).toLocaleDateString()}</span>
                  <div className="w-24 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDetailDialog(item)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>Copy URL</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={item.url} download={item.filename}>
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedItems([item.id])
                            setDeleteDialogOpen(true)
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">No media files found</p>
            <Button onClick={() => setUploadDialogOpen(true)} className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Upload Files
            </Button>
          </div>
        )}
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
              onClick={handleDelete}
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
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Supports images, documents, and videos. Maximum file size is 10MB.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed rounded-md p-6 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Drag and drop files here, or</p>
              <div className="flex justify-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-sm">
                    Select Files
                  </span>
                  <input id="file-upload" type="file" multiple onChange={handleFileChange} className="sr-only" />
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <p className="text-sm font-medium">{files.length} file(s) selected:</p>
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[250px]">{file.name}</span>
                    <span className="text-muted-foreground">{formatFileSize(file.size)}</span>
                  </div>
                ))}
              </div>
            )}

            {isUploading && (
              <div className="space-y-2">
                <div className="relative h-2 bg-muted rounded overflow-hidden">
                  <div className="absolute inset-0 bg-primary" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="text-xs text-right text-muted-foreground">{uploadProgress}%</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
              Upload
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
                    <p>{selectedItem.mimeType}</p>
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
                      setSelectedItems([selectedItem.id])
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
