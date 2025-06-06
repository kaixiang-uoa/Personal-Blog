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

export function SelectField({ 
  label, 
  value, 
  onChange, 
  options, 
  isHorizontal = false,
  showLabel = true 
}: SelectFieldProps) {
  const t = useTranslations('common');
  
  // according to layout style
  const triggerClass = cn(
    isHorizontal 
      ? "h-10 w-full min-w-[140px] max-w-[200px] rounded-lg text-sm font-normal leading-normal"
      : "h-12 w-full rounded-xl text-base font-normal leading-normal"
  );

  // ensure value is not empty string, replace with meaningful default value
  const safeValue = value === '' ? '_empty' : value;
  
  // preprocess options, ensure no empty value
  const safeOptions = options.map(option => ({
    ...option,
    value: option.value === '' ? '_empty' : option.value
  }));

  const handleValueChange = (newValue: string) => {
    // if the selected value is our empty value placeholder, return actual empty string
    onChange(newValue === '_empty' ? '' : newValue);
  };

  // set container class for select component, adjust width to fit layout
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