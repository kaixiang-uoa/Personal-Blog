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
  editor: any;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-2">
      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        tooltipText="粗体"
      >
        <Bold className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        tooltipText="斜体"
      >
        <Italic className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => (editor.chain().focus() as any).toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        tooltipText="下划线"
      >
        <UnderlineIcon className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        tooltipText="删除线"
      >
        <Strikethrough className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        tooltipText="标题1"
      >
        <Heading1 className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        tooltipText="标题2"
      >
        <Heading2 className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        tooltipText="标题3"
      >
        <Heading3 className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        tooltipText="无序列表"
      >
        <List className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        tooltipText="有序列表"
      >
        <ListOrdered className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        tooltipText="引用"
      >
        <Quote className="h-4 w-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        tooltipText="代码块"
      >
        <Code className="h-4 w-4" />
      </EditorMenuButton>

      <div className="h-4 w-px bg-border mx-1" />

      <LinkPopover editor={editor} isActive={editor.isActive("link")} />
      <ImagePopover editor={editor} />

      <div className="ml-auto flex items-center gap-1">
        <EditorMenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          tooltipText="撤销"
        >
          <Undo className="h-4 w-4" />
        </EditorMenuButton>

        <EditorMenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          tooltipText="重做"
        >
          <Redo className="h-4 w-4" />
        </EditorMenuButton>
      </div>
    </div>
  );
}
