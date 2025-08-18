import { Editor } from "@tiptap/react";
import { Image as ImageIcon, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/feedback/popover";
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { Label } from "@/components/ui/inputs/label";
import { Textarea } from "@/components/ui/inputs/textarea";
import { apiService } from "@/lib/api";

interface ImagePopoverProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export function ImagePopover({ editor, onImageUpload }: ImagePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingAlt, setIsLoadingAlt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // when URL changes, try to get alt text
  useEffect(() => {
    const fetchAltText = async () => {
      if (!imageUrl || !imageUrl.startsWith("http")) return;

      setIsLoadingAlt(true);
      try {
        const response = await apiService.getMediaByUrl<{
          alt?: string;
          alt_en?: string;
          alt_zh?: string;
        }>(imageUrl);

        if (response.success && response.data) {
          // use Chinese alt text first, then English, then default alt
          const altTextValue =
            response.data.alt_zh ||
            response.data.alt_en ||
            response.data.alt ||
            "";
          setAltText(altTextValue);
        }
      } catch {
        // silent error, do nothing
      } finally {
        setIsLoadingAlt(false);
      }
    };

    // add debounce, avoid frequent requests
    const timeoutId = setTimeout(fetchAltText, 500);
    return () => clearTimeout(timeoutId);
  }, [imageUrl]);

  const insertImage = () => {
    if (!imageUrl || !editor) return;

    editor
      .chain()
      .focus()
      .setImage({ src: imageUrl, alt: altText || "Image" })
      .run();

    setImageUrl("");
    setAltText("");
    setIsOpen(false);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) return;

    try {
      setIsUploading(true);
      const url = await onImageUpload(file);
      if (url) {
        // after upload, try to get alt text
        try {
          const response = await apiService.getMediaByUrl<{
            alt?: string;
            alt_en?: string;
            alt_zh?: string;
          }>(url);

          if (response.success && response.data) {
            const autoAltText =
              response.data.alt_zh ||
              response.data.alt_en ||
              response.data.alt ||
              file.name;
            editor
              .chain()
              .focus()
              .setImage({ src: url, alt: autoAltText })
              .run();
          } else {
            editor.chain().focus().setImage({ src: url, alt: file.name }).run();
          }
        } catch {
          // if get alt text failed, use file name as alt
          editor.chain().focus().setImage({ src: url, alt: file.name }).run();
        }
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">图片</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>上传图片</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "上传中..." : "选择图片"}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或者
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">图片URL</Label>
            <div className="flex gap-2">
              <Input
                id="image-url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button size="sm" onClick={insertImage}>
                插入
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt-text">
              Alt文本 {isLoadingAlt && "(加载中...)"}
            </Label>
            <Textarea
              id="alt-text"
              value={altText}
              onChange={e => setAltText(e.target.value)}
              placeholder="描述图片内容，有助于SEO和无障碍访问"
              rows={2}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
