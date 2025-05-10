"use client"

import { useState, useEffect } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
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
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PostEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function PostEditor({ content, onChange, placeholder = "Enter content here..." }: PostEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="border rounded-md p-4 min-h-[500px]">加载编辑器...</div>
  }

  const setLink = () => {
    if (!linkUrl || !editor) return
    
    (editor.chain().focus().extendMarkRange('link') as any)
      .setLink({ href: linkUrl, target: '_blank' })
      .run()
    
    setLinkUrl("")
    setIsLinkOpen(false)
  }

  const insertImage = () => {
    if (!imageUrl || !editor) return
    
    (editor.chain().focus() as any)
      .setImage({ src: imageUrl, alt: 'Image' })
      .run()
    
    setImageUrl("")
    setIsImageOpen(false)
  }

  const MenuButton = ({ 
    onClick, 
    isActive = false,
    disabled = false,
    tooltipText,
    children 
  }: { 
    onClick: () => void; 
    isActive?: boolean;
    disabled?: boolean;
    tooltipText: string;
    children: React.ReactNode
  }) => {
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
    )
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 border-b p-2">
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          tooltipText="粗体"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          tooltipText="斜体"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => (editor.chain().focus() as any).toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          tooltipText="下划线"
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          tooltipText="删除线"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>
        
        <div className="h-4 w-px bg-border mx-1" />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          tooltipText="标题1"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          tooltipText="标题2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          tooltipText="标题3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>
        
        <div className="h-4 w-px bg-border mx-1" />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          tooltipText="无序列表"
        >
          <List className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          tooltipText="有序列表"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>
        
        <div className="h-4 w-px bg-border mx-1" />
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          tooltipText="引用"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          tooltipText="代码块"
        >
          <Code className="h-4 w-4" />
        </MenuButton>
        
        <div className="h-4 w-px bg-border mx-1" />
        
        <Popover open={isLinkOpen} onOpenChange={setIsLinkOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                editor.isActive('link') && "bg-accent text-accent-foreground"
              )}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">链接</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="start">
            <div className="space-y-2">
              <Label htmlFor="link-url">链接URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="link-url"
                  value={linkUrl} 
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
                <Button size="sm" onClick={setLink}>确定</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover open={isImageOpen} onOpenChange={setIsImageOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">图片</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="start">
            <div className="space-y-2">
              <Label htmlFor="image-url">图片URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="image-url"
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <Button size="sm" onClick={insertImage}>插入</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="ml-auto flex items-center gap-1">
          <MenuButton 
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            tooltipText="撤销"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>
          
          <MenuButton 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            tooltipText="重做"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>
      
      <EditorContent 
        editor={editor} 
        className="p-4 min-h-[450px] prose prose-slate max-w-none focus:outline-none"
      />
    </div>
  )
} 