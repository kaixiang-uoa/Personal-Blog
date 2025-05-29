import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LinkPopoverProps {
  editor: any
  isActive: boolean
}

export function LinkPopover({ editor, isActive }: LinkPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const setLink = () => {
    if (!linkUrl || !editor) return
    
    (editor.chain().focus().extendMarkRange('link') as any)
      .setLink({ href: linkUrl, target: '_blank' })
      .run()
    
    setLinkUrl("")
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            isActive && "bg-accent text-accent-foreground"
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
  )
} 