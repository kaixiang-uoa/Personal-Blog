'use client';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SelectFieldProps } from '@/types/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

/**
 * SelectField Component
 * 
 * A customizable select field component that supports both horizontal and vertical layouts.
 * Handles empty values gracefully and provides consistent styling across the application.
 * 
 * @component
 * @example
 * ```tsx
 * // Vertical layout with label
 * <SelectField
 *   label="Category"
 *   value={category}
 *   onChange={setCategory}
 *   options={[
 *     { value: 'tech', label: 'Technology' },
 *     { value: 'life', label: 'Lifestyle' }
 *   ]}
 * />
 * 
 * // Horizontal layout without label
 * <SelectField
 *   value={sortBy}
 *   onChange={setSortBy}
 *   options={sortOptions}
 *   isHorizontal
 *   showLabel={false}
 * />
 * ```
 */
export function SelectField({ 
  label, 
  value, 
  onChange, 
  options, 
  isHorizontal = false,
  showLabel = true 
}: SelectFieldProps) {
  const t = useTranslations('common');
  
  // Style classes based on layout type
  const triggerClass = cn(
    isHorizontal 
      ? "h-10 w-full min-w-[140px] max-w-[200px] rounded-lg text-sm font-normal leading-normal"
      : "h-12 w-full rounded-xl text-base font-normal leading-normal"
  );

  // Handle empty value case
  const safeValue = value === '' ? '_empty' : value;
  
  // Process options to handle empty values
  const safeOptions = options.map(option => ({
    ...option,
    value: option.value === '' ? '_empty' : option.value
  }));

  /**
   * Handles value changes and converts placeholder empty value back to actual empty string
   * @param {string} newValue - The newly selected value
   */
  const handleValueChange = (newValue: string) => {
    onChange(newValue === '_empty' ? '' : newValue);
  };

  // Container class based on layout type
  const selectWrapperClass = cn(
    isHorizontal ? "flex-1 min-w-[140px] max-w-[200px]" : "w-full"
  );

  const selectElement = (
    <div className={selectWrapperClass}>
      <Select value={safeValue} onValueChange={handleValueChange}>
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder={t('select')} />
        </SelectTrigger>
        <SelectContent>
          {safeOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  if (isHorizontal) {
    return selectElement;
  }

  return (
    <div className="flex max-w-full flex-wrap items-end gap-3 py-2">
      <label className="flex flex-col flex-1">
        {showLabel && (
          <p className="text-foreground text-base font-medium leading-normal pb-2">{label}</p>
        )}
        {selectElement}
      </label>
    </div>
  );
} 