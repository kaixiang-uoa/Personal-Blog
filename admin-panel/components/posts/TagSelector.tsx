import { TagSelectorProps } from '@/types/posts';
import { Tag } from '@/types';
import { ComboboxSelect } from '@/components/posts/Combobox-select';
import { Badge } from '@/components/ui/data-display/badge';
import { X } from 'lucide-react';

export function TagSelector({
  tags = [],
  selectedTags = [],
  onChange,
  multiple = true,
  showSelected = true,
  placeholder = "Select tags...",
  disabled = false
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
    
    return String(item.name);
  };

  return (
    <div className="space-y-2">
      {showSelected && selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedTags.map(tag => (
            <Badge 
              key={tag._id} 
              variant="secondary" 
              className="flex items-center gap-1 text-xs py-1 px-2"
            >
              {displayName(tag)}
              {!disabled && (
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleRemove(tag)}
                />
              )}
            </Badge>
          ))}
        </div>
      )}
      
      <ComboboxSelect<Tag>
        items={tags}
        selectedItems={selectedTags}
        onSelect={handleSelect}
        multiple={multiple}
        getItemLabel={(item: Tag) => item.name || ""}
        getItemValue={(item: Tag) => item._id}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
} 