"use client";

/**
 * Post Editor Component
 *
 * A rich text editor for creating and editing blog posts.
 * Features include formatting, links, images, and media uploads.
 */
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import PlaceholderExtension from "@tiptap/extension-placeholder";
import UnderlineExtension from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKitExtension from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Upload,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/feedback/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/feedback/tooltip";
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { Label } from "@/components/ui/inputs/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import { useToast } from "@/hooks/ui/use-toast";
import { apiService } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Props for the PostEditor component
 */
interface PostEditorProps {
  /** Current HTML content of the editor */
  value: string;
  /** Callback function called when content changes */
  onChange: (content: string) => void;
}

/**
 * Props for the MenuButton component
 */
interface MenuButtonProps {
  /** Function to call when button is clicked */
  onClick: () => void;
  /** Whether the button is in active state */
  isActive?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Text to display in tooltip */
  tooltipText: string;
  /** Button content */
  children: React.ReactNode;
}

/**
 * A button component for the editor toolbar with tooltip
 */
const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  tooltipText,
  children,
}: MenuButtonProps): React.ReactElement => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              isActive && "bg-accent text-accent-foreground"
            )}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
            <span className="sr-only">{tooltipText}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/**
 * Rich text editor component for creating and editing blog posts
 */
export function PostEditor({
  value,
  onChange,
}: PostEditorProps): React.ReactElement {
  // State variables
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();

  // References
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKitExtension,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full",
        },
      }),
      PlaceholderExtension.configure({
        placeholder: "Write your post content here...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none max-w-none",
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Handle file upload from input
   */
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size cannot exceed 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Create form data with the correct field name 'files'
      const formData = new FormData();
      formData.append("files", file);

      const response = await apiService.uploadMedia(formData);

      if (response.success && response.data) {
        // Access the media object and get the full URL
        const media = response.data as { url: string };
        // Construct the full URL with the base URL of the backend
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const imageUrl = `${baseUrl}${media.url}`;

        if (editor) {
          editor.chain().focus().setImage({ src: imageUrl }).run();
          setImageUrl("");
          setIsImageModalOpen(false);
          toast({
            title: "Image uploaded",
            description: "Image has been uploaded and inserted",
          });
        }
      } else {
        throw new Error("Upload response did not contain valid image URL");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      setUploadError("Upload failed, please try again");
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Trigger file input click when upload button is clicked
   */
  const handleImageButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  /**
   * Insert a link at current cursor position
   */
  const insertLink = (): void => {
    if (!linkUrl) return;

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
    setLinkUrl("");
    setIsLinkModalOpen(false);
  };

  /**
   * Insert an image at current cursor position
   */
  const insertImage = (): void => {
    if (!imageUrl) return;

    editor?.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl("");
    setIsImageModalOpen(false);
  };

  /**
   * Toggle editor mark (bold, italic, etc.)
   */
  const toggleMark = (mark: string): void => {
    editor?.chain().focus().toggleMark(mark).run();
  };

  if (!isMounted) {
    return <div className="hidden" aria-hidden="true" />;
  }

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1 border-b">
        <MenuButton
          onClick={() => toggleMark("bold")}
          isActive={editor?.isActive("bold")}
          tooltipText="Bold"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => toggleMark("italic")}
          isActive={editor?.isActive("italic")}
          tooltipText="Italic"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => toggleMark("underline")}
          isActive={editor?.isActive("underline")}
          tooltipText="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => toggleMark("strike")}
          isActive={editor?.isActive("strike")}
          tooltipText="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1" />

        <MenuButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor?.isActive("heading", { level: 1 })}
          tooltipText="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor?.isActive("heading", { level: 2 })}
          tooltipText="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor?.isActive("heading", { level: 3 })}
          tooltipText="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1" />

        <MenuButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          isActive={editor?.isActive("bulletList")}
          tooltipText="Bullet List"
        >
          <List className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          isActive={editor?.isActive("orderedList")}
          tooltipText="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          isActive={editor?.isActive("blockquote")}
          tooltipText="Quote"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          isActive={editor?.isActive("codeBlock")}
          tooltipText="Code Block"
        >
          <Code className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1" />

        <Popover open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive("link") && "bg-accent text-accent-foreground"
              )}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                className="col-span-3"
              />
              <div className="flex justify-between mt-2">
                {editor?.isActive("link") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      editor.chain().focus().unsetLink().run();
                      setIsLinkModalOpen(false);
                    }}
                  >
                    Remove Link
                  </Button>
                )}
                <Button size="sm" className="ml-auto" onClick={insertLink}>
                  Save
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Tabs defaultValue="url" className="w-80">
          <Popover open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Image</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="p-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                  />
                  <Button
                    size="sm"
                    className="ml-auto mt-2"
                    onClick={insertImage}
                  >
                    Insert Image
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="upload" className="p-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={handleImageButtonClick}
                    disabled={isUploading}
                    className="w-full py-8 flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    <span>
                      {isUploading ? "Uploading..." : "Click to upload"}
                    </span>
                  </Button>
                  {uploadError && (
                    <p className="text-destructive text-sm mt-1">
                      {uploadError}
                    </p>
                  )}
                </div>
              </TabsContent>
            </PopoverContent>
          </Popover>
        </Tabs>

        <div className="ml-auto flex items-center gap-1">
          <MenuButton
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            tooltipText="Undo"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            tooltipText="Redo"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-4 min-h-[200px]">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
