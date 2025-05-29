"use client"

import { useState, useEffect } from "react"
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
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronLeft,
  Save
} from "lucide-react"
import NextLink from "next/link"
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
import { PostData } from "@/types/post"
import { Category } from "@/types/category"
import { Tag } from "@/types/tags"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface PostEditorProps {
  post: PostData
  categories: Category[]
  tags: Tag[]
  onSubmit: (data: PostData) => Promise<void>
  isLoading: boolean
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

export default function PostEditor({ post, categories, tags, onSubmit, isLoading }: PostEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [content, setContent] = useState(post.content)
  const [postData, setPostData] = useState<PostData>(post)
  const [tagInput, setTagInput] = useState("")

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
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // If title changes, generate slug
    if (field === "title" && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
      setPostData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const handleTagAdd = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !postData.displayTags.includes(trimmedTag)) {
      const formattedTag = trimmedTag
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")

      setPostData((prev) => ({
        ...prev,
        displayTags: [...prev.displayTags, formattedTag],
      }))
      setTagInput("")
    }
  }

  const handleTagRemove = (tag: string) => {
    setPostData((prev) => ({
      ...prev,
      displayTags: prev.displayTags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async () => {
    const updatedPost = {
      ...postData,
      content,
    }
    await onSubmit(updatedPost)
  }

  if (!isMounted) {
    return <div className="border rounded-md p-4 min-h-[500px]">加载编辑器...</div>
  }

  if (!editor) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <NextLink href="/posts">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </NextLink>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and slug */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={postData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Permalink</Label>
                  <Input
                    id="slug"
                    placeholder="Enter URL slug"
                    value={postData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="editor">
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="min-h-[500px]">
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
                          <MenuButton
                            onClick={() => editor.chain().focus().extendMarkRange('link') as any}
                            isActive={editor.isActive('link')}
                            tooltipText="链接"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </MenuButton>
                        </PopoverTrigger>
                      </Popover>
                      
                      <Popover open={isImageOpen} onOpenChange={setIsImageOpen}>
                        <PopoverTrigger asChild>
                          <MenuButton
                            onClick={() => editor.chain().focus() as any}
                            tooltipText="图片"
                          >
                            <ImageIcon className="h-4 w-4" />
                          </MenuButton>
                        </PopoverTrigger>
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
                    <EditorContent editor={editor} className="p-4 min-h-[500px]" />
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="min-h-[500px] prose prose-slate max-w-none">
                  <div className="border rounded-md p-4" dangerouslySetInnerHTML={{ __html: content }} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="excerpt">Post Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter post excerpt (optional)"
                  value={postData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings panel */}
        <div className="space-y-6">
          {/* Publish settings */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Publish Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={postData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                <Label htmlFor="category">Select Category</Label>
                <Select
                  value={postData.categoryData[0]?._id || ""}
                  onValueChange={(value) => handleInputChange("categoryData", [{ _id: value, name: categories.find(c => c._id === value)?.name || "" }])}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Tags</h3>
              <div className="space-y-4">
                <div className="flex">
                  <Input
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleTagAdd()
                      }
                    }}
                    className="rounded-r-none"
                  />
                  <Button
                    onClick={handleTagAdd}
                    className="rounded-l-none"
                    variant="secondary"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {postData.displayTags.map((tag, index) => (
                    <Badge key={`${tag}-${index}`} variant="secondary" className="px-2 py-1">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Featured Image</h3>
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Image URL</Label>
                <Input
                  id="featuredImage"
                  placeholder="Enter image URL"
                  value={postData.featuredImage}
                  onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                />
                {postData.featuredImage && (
                  <div className="mt-4 rounded-md overflow-hidden border">
                    <img
                      src={postData.featuredImage}
                      alt="Featured"
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/image-placeholder.jpg"
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 