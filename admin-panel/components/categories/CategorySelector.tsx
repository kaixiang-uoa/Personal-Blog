import { Category, CategorySelectorProps } from '@/types/category';
import { ComboboxSelect } from '@/components/posts/Combobox-select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export function CategorySelector({
  categories = [],
  selectedCategories = [],
  onChange,
  multiple = false,
  displayMode,
  size,
  showSelected,
  placeholder = "Select category...",
  disabled = false
}: CategorySelectorProps) {
  const handleSelect = (item: Category) => {
    if (multiple) {
      const isSelected = selectedCategories.some((cat: Category) => cat._id === item._id);
      if (isSelected) {
        onChange(selectedCategories.filter((cat: Category) => cat._id !== item._id));
      } else {
        onChange([...selectedCategories, item]);
      }
    } else {
      onChange([item]);
    }
  };

  const handleRemove = (item: Category) => {
    onChange(selectedCategories.filter(cat => cat._id !== item._id));
  };

  const displayName = (item: Category) => {
    if (!item) return "";
    if (!item.name) return "";
    
    if (typeof item.name === "object") {
      return item.name.en || item.name.zh || "";
    }
    
    return String(item.name);
  };

  return (
    <div className="space-y-2">
      {showSelected && selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedCategories.map(category => (
            <Badge 
              key={category._id} 
              variant="secondary" 
              className="flex items-center gap-1 text-xs py-1 px-2"
            >
              {displayName(category)}
              {!disabled && (
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleRemove(category)}
                />
              )}
            </Badge>
          ))}
        </div>
      )}
      
      <ComboboxSelect<Category>
        items={categories}
        selectedItems={selectedCategories}
        onSelect={handleSelect}
        multiple={multiple}
        getItemLabel={(item: Category) => {
          if (item.name && typeof item.name === "object") {
            return item.name.en || item.name.zh || "";
          }
          return item.name;
        }}
        getItemValue={(item: Category) => item._id}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
} 