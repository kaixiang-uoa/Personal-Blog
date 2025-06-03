"use client"

import { useState, useEffect, useRef } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import LinkExtension from "@tiptap/extension-link"
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
  Upload,
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
import { mediaService } from "@/lib/services"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PostEditorProps {
  value: string;
  onChange: (content: string) => void;
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

export default function PostEditor({ value, onChange }: PostEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { toast } = useToast()
  
  // 添加refs
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
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
        placeholder: "Write your post content here...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none max-w-none',
      },
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "")
    }
  }, [value, editor])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size cannot exceed 5MB')
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // Create form data with the correct field name 'files' instead of 'file'
      const formData = new FormData()
      formData.append('files', file)
      
      console.log('Uploading file:', file.name)
      
      const response = await mediaService.upload(formData)
      console.log('Upload response:', response)
      
      if (response.data && response.data.media && response.data.media.length > 0) {
        // Access the media object correctly and get the full URL
        const media = response.data.media[0]
        // Construct the full URL with the base URL of the backend
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const imageUrl = `${baseUrl}${media.url}`
        
        if (editor) {
          editor.chain().focus().setImage({ src: imageUrl }).run()
          setImageUrl("")
          setIsImageModalOpen(false)
          toast({
            title: "Image uploaded",
            description: "Image has been uploaded and inserted",
          })
        }
      } else {
        throw new Error('Upload response did not contain valid image URL')
      }
    } catch (error) {
      console.error('Failed to upload image:', error)
      setUploadError('Upload failed, please try again')
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // 直接打开文件选择对话框
  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  if (!isMounted) {
    return <div className="border rounded-md p-4 min-h-[500px]">loading editor...</div>
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex flex-wrap gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          tooltipText="Bold"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          tooltipText="Italic"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          tooltipText="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          tooltipText="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          tooltipText="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          tooltipText="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          tooltipText="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          tooltipText="Bullet List"
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          tooltipText="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          tooltipText="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          tooltipText="Code Block"
        >
          <Code className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltipText="Undo"
        >
          <Undo className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltipText="Redo"
        >
          <Redo className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => setIsLinkModalOpen(true)}
          isActive={editor.isActive('link')}
          tooltipText="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={handleImageButtonClick}
          tooltipText="Upload Image"
        >
          <ImageIcon className="h-4 w-4" />
        </MenuButton>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
      <EditorContent editor={editor} className="prose prose-slate dark:prose-invert max-w-none p-4 min-h-[500px]" />
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80">
            <h4 className="font-medium leading-none mb-2">Add Link</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the URL for your link
            </p>
            <div className="mb-4">
              <Label htmlFor="link-modal">URL</Label>
              <Input
                id="link-modal"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (linkUrl) {
                    editor.chain().focus().setLink({ href: linkUrl }).run()
                    setLinkUrl("")
                    setIsLinkModalOpen(false)
                  }
                }}
              >
                Add Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 