"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import { EditorToolbar } from "./EditorToolbar";
import { apiService } from "@/lib/api";

interface PostEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function PostEditor({
  content,
  onChange,
  placeholder = "Enter content here...",
}: PostEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Handle image upload
  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("files", file);

      const response = await apiService.uploadMedia<{ media: { url: string }[] }>(formData);
      if (response.data?.media?.[0]?.url) {
        return response.data.media[0].url;
      }
      throw new Error("Failed to upload image");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full",
        },
        allowBase64: false,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Handle paste event for images
  useEffect(() => {
    if (!editor) return;

    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          event.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;

          const url = await handleImageUpload(file);
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }
      }
    };

    editor.view.dom.addEventListener("paste", handlePaste);
    return () => {
      editor.view.dom.removeEventListener("paste", handlePaste);
    };
  }, [editor, handleImageUpload]);

  // Handle drop event for images
  useEffect(() => {
    if (!editor) return;

    const handleDrop = async (event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (!files) return;

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          event.preventDefault();
          const url = await handleImageUpload(file);
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }
      }
    };

    editor.view.dom.addEventListener("drop", handleDrop);
    return () => {
      editor.view.dom.removeEventListener("drop", handleDrop);
    };
  }, [editor, handleImageUpload]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="border rounded-md p-4 min-h-[500px]">
        Loading editor...
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent
        editor={editor}
        className="p-4 min-h-[450px] prose prose-slate max-w-none focus:outline-none"
      />
    </div>
  );
}
