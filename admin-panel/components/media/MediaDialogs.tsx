"use client";

import { Clipboard, Download, Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

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
import { Label } from "@/components/ui/inputs/label";
import { Textarea } from "@/components/ui/inputs/textarea";
import { apiService } from "@/lib/api";
import { Media } from "@/types";
import { MediaDialogsProps } from "@/types/media";

import { formatFileSize, getFullUrl } from "./utils";

export function MediaDialogs({
  deleteDialogOpen,
  setDeleteDialogOpen,
  selectedItemsCount,
  onConfirmDelete,
  uploadDialogOpen,
  setUploadDialogOpen,
  uploading,
  onDrop,
  onDragOver,
  onFileChange,
  detailDialogOpen,
  setDetailDialogOpen,
  selectedItem,
  onCopyUrl,
  onImageError,
  onRefresh,
  onUpdateSelectedItem,
}: MediaDialogsProps) {
  // 编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    alt: "",
    alt_en: "",
    alt_zh: "",
    caption: "",
    caption_en: "",
    caption_zh: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // 初始化编辑表单
  React.useEffect(() => {
    if (selectedItem) {
      setEditForm({
        alt: selectedItem.alt || "",
        alt_en: selectedItem.alt_en || "",
        alt_zh: selectedItem.alt_zh || "",
        caption: selectedItem.caption || "",
        caption_en: selectedItem.caption_en || "",
        caption_zh: selectedItem.caption_zh || "",
      });
    }
  }, [selectedItem]);

  // 保存编辑
  const handleSave = async () => {
    if (!selectedItem) return;

    setIsSaving(true);
    try {
      const response = await apiService.updateMedia<Media>(
        selectedItem._id,
        editForm
      );
      toast.success("Media updated successfully");
      setIsEditing(false);

      // 更新当前选中的项目
      if (response.success && response.data && onUpdateSelectedItem) {
        onUpdateSelectedItem(response.data as Media);
      }

      // 刷新数据
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Failed to update media:", error);
      toast.error("Failed to update media");
    } finally {
      setIsSaving(false);
    }
  };
  const renderMediaPreview = (item: Media) => {
    if (item.mimetype.startsWith("image/")) {
      return (
        <div className="relative h-64 w-full">
          <Image
            src={getFullUrl(item.url)}
            alt={item.filename}
            fill
            className="object-contain"
            onError={e => onImageError(item, e)}
          />
        </div>
      );
    }

    if (item.mimetype.startsWith("application/pdf")) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl block mb-2">PDF</span>
            <p className="text-sm text-muted-foreground">PDF Document</p>
          </div>
        </div>
      );
    }

    if (item.mimetype.startsWith("video/")) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl block mb-2">Video</span>
            <p className="text-sm text-muted-foreground">Video File</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-2">File</span>
          <p className="text-sm text-muted-foreground">{item.mimetype}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete {selectedItemsCount} file(s)
              and cannot be undone. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
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
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf"
                onChange={onFileChange}
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
                {renderMediaPreview(selectedItem)}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">File Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-mono break-all">
                        {selectedItem.filename}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span>{formatFileSize(selectedItem.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedItem.mimetype}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uploaded:</span>
                      <span>
                        {new Date(selectedItem.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SEO Information */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">SEO Information</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="alt">Alt Text (SEO)</Label>
                        <Input
                          id="alt"
                          value={editForm.alt}
                          onChange={e =>
                            setEditForm(prev => ({
                              ...prev,
                              alt: e.target.value,
                            }))
                          }
                          placeholder="描述图片内容"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alt_en">Alt Text (English)</Label>
                        <Input
                          id="alt_en"
                          value={editForm.alt_en}
                          onChange={e =>
                            setEditForm(prev => ({
                              ...prev,
                              alt_en: e.target.value,
                            }))
                          }
                          placeholder="Describe the image content"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alt_zh">Alt Text (中文)</Label>
                        <Input
                          id="alt_zh"
                          value={editForm.alt_zh}
                          onChange={e =>
                            setEditForm(prev => ({
                              ...prev,
                              alt_zh: e.target.value,
                            }))
                          }
                          placeholder="描述图片内容"
                        />
                      </div>
                      <div>
                        <Label htmlFor="caption">Caption</Label>
                        <Textarea
                          id="caption"
                          value={editForm.caption}
                          onChange={e =>
                            setEditForm(prev => ({
                              ...prev,
                              caption: e.target.value,
                            }))
                          }
                          placeholder="图片说明"
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Alt Text:</span>
                        <span className="text-right max-w-[200px] truncate">
                          {selectedItem.alt || "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Alt Text (EN):
                        </span>
                        <span className="text-right max-w-[200px] truncate">
                          {selectedItem.alt_en || "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Alt Text (ZH):
                        </span>
                        <span className="text-right max-w-[200px] truncate">
                          {selectedItem.alt_zh || "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Caption:</span>
                        <span className="text-right max-w-[200px] truncate">
                          {selectedItem.caption || "Not set"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCopyUrl(getFullUrl(selectedItem.url))}
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    Copy URL
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={getFullUrl(selectedItem.url)}
                      download={selectedItem.filename}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
