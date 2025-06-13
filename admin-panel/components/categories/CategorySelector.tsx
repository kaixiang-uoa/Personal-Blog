import { CategorySelectorProps, Category } from '@/types';
import { ComboboxSelect } from '@/components/posts/Combobox-select';
import { Badge } from '@/components/ui/data-display/badge';
import { X } from 'lucide-react';

export function CategorySelector({
  categories = [],
  selectedCategories = [],
  onChange,
  multiple = true,
  showSelected = true,
  placeholder = "Select categories...",
  disabled = false
}: CategorySelectorProps) {
  const handleSelect = (item: Category) => {
    if (multiple) {
      const isSelected = selectedCategories.some((cat) => cat._id === item._id);
      if (isSelected) {
        onChange(selectedCategories.filter((cat) => cat._id !== item._id));
      } else {
        onChange([...selectedCategories, item]);
      }
    } else {
      onChange([item]);
    }
  };

  const handleRemove = (item: Category) => {
    onChange(selectedCategories.filter((cat) => cat._id !== item._id));
  };

  // 多语言name处理，优先en，其次name，再其次zh
  const displayName = (item: Category) => {
    if (!item) return "";
    if (item.name_en) return item.name_en;
    if (item.name) return item.name;
    if (item.name_zh) return item.name_zh;
    return "";
  };

  return (
    <div className="space-y-2">
      {showSelected && selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedCategories.map((category) => (
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
        getItemLabel={displayName}
        getItemValue={(item) => item._id}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
} 