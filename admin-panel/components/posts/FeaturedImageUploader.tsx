"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/inputs/button";
import { apiService } from "@/lib/api";
import { cn } from "@/lib/utils";

interface FeaturedImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FeaturedImageUploader({
  value,
  onChange,
  className,
}: FeaturedImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size cannot exceed 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await apiService.uploadMedia(formData);
      if (
        response.data &&
        response.data.media &&
        response.data.media.length > 0
      ) {
        // get upload file url and add backend domain prefix
        const fileUrl = response.data.media[0].url;
        // if url is not start with http, add full backend domain
        const fullUrl = fileUrl.startsWith("http")
          ? fileUrl
          : `http://localhost:3001${fileUrl}`;
        onChange(fullUrl);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      setError("Upload failed, please try again");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  // ensure image src is full url
  const getImageSrc = (src: string) => {
    if (!src) return "";
    return src.startsWith("http") ? src : `http://localhost:3001${src}`;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image
            src={getImageSrc(value)}
            alt="Featured image"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="featured-image"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label
            htmlFor="featured-image"
            className="flex cursor-pointer flex-col items-center gap-2"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isUploading ? "Uploading..." : "Click to upload featured image"}
            </span>
          </label>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
