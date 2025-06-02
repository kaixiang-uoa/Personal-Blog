import { Tag, TagSelectorProps } from '@/types/tags';
import { ComboboxSelect } from '@/components/posts/Combobox-select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export function TagSelector({
  tags = [],
  selectedTags = [],
  onChange,
  multiple = true,
  displayMode,
  removable = true,
  maxDisplay,
  showCount = true,
  inputPlaceholder,
  disabled = false,
  collapsible
}: TagSelectorProps) {
  const handleSelect = (item: Tag) => {
    if (multiple) {
      const isSelected = selectedTags.some((tag: Tag) => tag._id === item._id);
      if (isSelected) {
        onChange(selectedTags.filter((tag: Tag) => tag._id !== item._id));
      } else {
        onChange([...selectedTags, item]);
      }
    } else {
      onChange([item]);
    }
  };

  const handleRemove = (item: Tag) => {
    onChange(selectedTags.filter(tag => tag._id !== item._id));
  };

  const displayName = (item: Tag) => {
    if (!item) return "";
    if (!item.name) return "";
    
    // 处理name可能是对象的情况
    if (typeof item.name === "object") {
      return item.name.en || item.name.zh || "";
    }
    
    // 处理name可能是字符串的情况
    return String(item.name);
  };

  // 如果有最大显示数量，进行限制
  const displayTags = maxDisplay && selectedTags.length > maxDisplay
    ? selectedTags.slice(0, maxDisplay)
    : selectedTags;
    
  return (
    <div className="space-y-2">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {displayTags.map(tag => (
            <Badge 
              key={tag._id} 
              variant="secondary" 
              className="flex items-center gap-1 text-xs py-1 px-2"
            >
              {displayName(tag)}
              {removable && !disabled && (
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleRemove(tag)}
                />
              )}
            </Badge>
          ))}
          {maxDisplay && selectedTags.length > maxDisplay && (
            <Badge variant="outline" className="text-xs">
              +{selectedTags.length - maxDisplay} more
            </Badge>
          )}
        </div>
      )}
      
      <ComboboxSelect<Tag>
        items={tags}
        selectedItems={selectedTags}
        onSelect={handleSelect}
        multiple={multiple}
        getItemLabel={(item: Tag) => {
          // 安全处理name可能是对象或字符串的情况
          if (item.name && typeof item.name === "object") {
            return item.name.en || item.name.zh || "";
          }
          return item.name;
        }}
        getItemValue={(item: Tag) => item._id}
        placeholder={inputPlaceholder || "Select tags..."}
        disabled={disabled}
      />
    </div>
  );
} 