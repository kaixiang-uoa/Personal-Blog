import { useState } from "react"
import { Button } from "@/components/ui/inputs/button"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/inputs/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/feedback/popover"
import { Image as ImageIcon } from "lucide-react"

interface ImagePopoverProps {
  editor: any
}

export function ImagePopover({ editor }: ImagePopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const insertImage = () => {
    if (!imageUrl || !editor) return
    
    (editor.chain().focus() as any)
      .setImage({ src: imageUrl, alt: 'Image' })
      .run()
    
    setImageUrl("")
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
  )
} 