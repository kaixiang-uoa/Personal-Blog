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
} from '@/app/components/ui/select';

export function SelectField({ 
  label, 
  value, 
  onChange, 
  options, 
  isHorizontal = false,
  showLabel = true 
}: SelectFieldProps) {
  const t = useTranslations('common');
  
  // 根据布局选择样式
  const triggerClass = cn(
    isHorizontal 
      ? "h-10 w-full min-w-[140px] max-w-[200px] rounded-lg text-sm font-normal leading-normal"
      : "h-12 w-full rounded-xl text-base font-normal leading-normal"
  );

  // 确保值不为空字符串，替换为有意义的默认值
  const safeValue = value === '' ? '_empty' : value;
  
  // 预处理选项，确保没有空值
  const safeOptions = options.map(option => ({
    ...option,
    value: option.value === '' ? '_empty' : option.value
  }));

  const handleValueChange = (newValue: string) => {
    // 如果选择的是我们的空值占位符，则返回实际的空字符串
    onChange(newValue === '_empty' ? '' : newValue);
  };

  // 设置选择组件的容器类，调整宽度以适应布局
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