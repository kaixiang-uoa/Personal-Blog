import { Editor } from "@tiptap/react";
import { Image as ImageIcon, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/feedback/popover";
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { Label } from "@/components/ui/inputs/label";

interface ImagePopoverProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export function ImagePopover({ editor, onImageUpload }: ImagePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImage = () => {
    if (!imageUrl || !editor) return;

    editor.chain().focus().setImage({ src: imageUrl, alt: "Image" }).run();

    setImageUrl("");
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
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
