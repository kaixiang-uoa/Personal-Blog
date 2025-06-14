"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";

import { EditorToolbar } from "./EditorToolbar";

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
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="p-4 min-h-[450px] prose prose-slate max-w-none focus:outline-none"
      />
    </div>
  );
}
