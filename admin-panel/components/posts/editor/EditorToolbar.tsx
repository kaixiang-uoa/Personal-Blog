import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

import { EditorMenuButton } from "./EditorMenuButton";
import { ImagePopover } from "./ImagePopover";
import { LinkPopover } from "./LinkPopover";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-2">
      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        tooltipText="Bold"
      >
        <Bold className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        tooltipText="Italic"
      >
        <Italic className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        tooltipText="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        tooltipText="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        tooltipText="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        tooltipText="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        tooltipText="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        tooltipText="Bullet List"
      >
        <List className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        tooltipText="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        tooltipText="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        tooltipText="Code Block"
      >
        <Code className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <LinkPopover editor={editor} isActive={editor.isActive("link")} />
      <ImagePopover editor={editor} onImageUpload={onImageUpload} />

      <div className="ml-auto flex items-center gap-1">
        <EditorMenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          tooltipText="Undo"
        >
          <Undo className="h-4 w-4" />
        </EditorMenuButton>

        <EditorMenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          tooltipText="Redo"
        >
          <Redo className="h-4 w-4" />
        </EditorMenuButton>
      </div>
    </div>
  );
}
