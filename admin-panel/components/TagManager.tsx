"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { tagService } from "@/lib/services"
import type { Tag } from "@/types/tags"

interface TagManagerProps {
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export function TagManager({ value, onChange, className }: TagManagerProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<Tag[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await tagService.getAll()
        if (response.data) {
          setTags(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      const filtered = tags.filter(
        tag => 
          tag.name.toLowerCase().includes(value.toLowerCase()) &&
          !value.includes(tag._id)
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      
      // 检查是否已存在该标签
      const existingTag = tags.find(
        tag => tag.name.toLowerCase() === inputValue.trim().toLowerCase()
      )

      if (existingTag) {
        if (!value.includes(existingTag._id)) {
          onChange([...value, existingTag._id])
        }
      } else {
        try {
          // 创建新标签
          const tagName = inputValue.trim()
          const response = await tagService.create({ 
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, '-')
          })
          if (response.data) {
            setTags([...tags, response.data])
            onChange([...value, response.data._id])
          }
        } catch (error) {
          console.error("Failed to create tag:", error)
        }
      }
      
      setInputValue("")
      setSuggestions([])
    }
  }

  const removeTag = (tagId: string) => {
    onChange(value.filter(id => id !== tagId))
  }

  const selectedTags = tags.filter(tag => value.includes(tag._id))

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map(tag => (
          <Badge
            key={tag._id}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tag.name}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeTag(tag._id)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">移除标签</span>
            </Button>
          </Badge>
        ))}
      </div>
      
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="输入标签名称，按回车添加..."
          disabled={loading}
          className="w-full"
        />
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
            {suggestions.map(tag => (
              <Button
                key={tag._id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  if (!value.includes(tag._id)) {
                    onChange([...value, tag._id])
                  }
                  setInputValue("")
                  setSuggestions([])
                }}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 