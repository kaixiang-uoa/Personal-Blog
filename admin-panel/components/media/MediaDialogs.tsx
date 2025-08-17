"use client";

import { Clipboard, Download, Upload } from "lucide-react";
import Image from "next/image";
import React from "react";

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
}: MediaDialogsProps) {
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
