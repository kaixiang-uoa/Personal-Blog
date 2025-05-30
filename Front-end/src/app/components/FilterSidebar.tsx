'use client';
import { useState, useEffect } from 'react';
import { Tag as TagIcon, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tag, Category, SortOrder } from '@/types';
import { useSetting } from '@/contexts/SettingsContext';

interface FilterSidebarProps {
  tags: Tag[];
  activeTags: string[];
  categories: Category[];
  activeCategory: string | null;
  sortOrder: SortOrder;
  currentLocale: string;
  onFilterChangeAction: (params: {
    type: 'tags' | 'category' | 'sort';
    value: string | string[] | SortOrder;
  }) => void;
  onClearFiltersAction: () => void;
}

export default function FilterSidebar({
  tags,
  activeTags,
  categories,
  activeCategory,
  currentLocale,
  sortOrder = 'latest',
  
  onFilterChangeAction,
  onClearFiltersAction,
}: FilterSidebarProps) {
  const t = useTranslations('common');
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory || null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>(sortOrder);
  
  // 从设置中获取侧边栏设置
  const defaultSort = useSetting('posts.defaultSort', 'latest') as SortOrder;
  const accentColor = useSetting('appearance.accentColor', '#0891b2');
  const showSidebar = useSetting('appearance.showSidebar', true);
  
  // 如果设置为不显示侧边栏，则不渲染组件
  if (!showSidebar) {
    return null;
  }

  const getLocalizedName = (
    item: { name: string; name_en?: string; name_zh?: string },
    locale: string
  ): string => {
    if (locale === 'en') return item.name_en || item.name;
    if (locale === 'zh') return item.name_zh || item.name;
    return item.name;
  };

  useEffect(() => {
    setSelectedCategory(activeCategory || null);
  }, [activeCategory]);

  useEffect(() => {
    setSelectedTags(activeTags || []);
  }, [activeTags]);

  useEffect(() => {
    // 如果没有选择排序或重置为默认，使用设置中的默认排序
    if (!sortOrder || sortOrder === defaultSort) {
      onFilterChangeAction({ type: 'sort', value: defaultSort });
    }
  }, [defaultSort]);

  const handleTagChange = (tagSlug: string, checked: boolean) => {
    let newSelectedTags: string[];

    if (checked) {
      newSelectedTags = [...selectedTags.filter(Boolean), tagSlug];
    } else {
      newSelectedTags = selectedTags.filter(t => t !== tagSlug && Boolean(t));
    }

    setSelectedTags(newSelectedTags);
    onFilterChangeAction({ type: 'tags', value: newSelectedTags });
  };

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onFilterChangeAction({ type: 'category', value: categorySlug || '' });
  };

  const hasActiveFilters = activeTags.length > 0 || activeCategory;

  // 使用设置中的强调色来定义样式
  const accentStyle = {
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <div className="bg-gray-800 rounded-lg p-4 sticky top-4" style={accentStyle}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{t('filters')}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFiltersAction}
            className="text-cyan-500 hover:text-cyan-400 hover:bg-gray-700 p-1 h-auto"
            style={{ color: accentColor }}
          >
            <X className="h-4 w-4 mr-1" />
            {t('clear')}
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mb-4 pb-4 border-b border-gray-700">
          <p className="text-sm text-gray-400 mb-2">{t('activeFilters')}:</p>
          <div className="flex flex-wrap gap-2">
            {activeTags.map(tagSlug => {
              const tag = tags.find(t => t.slug === tagSlug);
              return (
                <Badge
                  key={tagSlug}
                  variant="secondary"
                  className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                    color: `color-mix(in srgb, ${accentColor} 90%, white)`
                  }}
                  onClick={() => handleTagChange(tagSlug, false)}
                >
                  {tag ? getLocalizedName(tag, currentLocale) : tagSlug}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              );
            })}

            {activeCategory &&
              (() => {
                const category = categories.find(c => c.slug === activeCategory);
                return (
                  <Badge
                    key={activeCategory}
                    variant="secondary"
                    className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer"
                    style={{ 
                      backgroundColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                      color: `color-mix(in srgb, ${accentColor} 90%, white)`
                    }}
                    onClick={() => handleCategoryChange(null)}
                  >
                    {category
                      ? getLocalizedName(category, currentLocale)
                      : activeCategory}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                );
              })()}
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={['tags', 'category', 'sort']} className="w-full">
        <AccordionItem value="tags" className="border-b border-gray-700">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <TagIcon className="h-4 w-4 mr-2" />
              <span>{t('tags')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {tags.map(tag => (
                <Label
                  key={tag._id}
                  className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                  style={{ 
                    '--hover-color': accentColor 
                  } as React.CSSProperties }
                >
                  <Checkbox
                    checked={selectedTags.includes(tag.slug)}
                    onCheckedChange={checked => handleTagChange(tag.slug, checked as boolean)}
                    className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                    style={{ 
                      '--checkbox-color': accentColor 
                    } as React.CSSProperties }
                  />
                  <span className="truncate">{getLocalizedName(tag, currentLocale)}</span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category" className="border-b border-gray-700">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>{t('categories')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <Label
                key="all-categories"
                className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                style={{ 
                  '--hover-color': accentColor 
                } as React.CSSProperties }
              >
                <Checkbox
                  checked={!selectedCategory}
                  onCheckedChange={() => handleCategoryChange(null)}
                  className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                  style={{ 
                    '--checkbox-color': accentColor 
                  } as React.CSSProperties }
                />
                {t('allCategories')}
              </Label>
              {categories.map(category => (
                <Label
                  key={category._id}
                  className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                  style={{ 
                    '--hover-color': accentColor 
                  } as React.CSSProperties }
                >
                  <Checkbox
                    checked={selectedCategory === category.slug}
                    onCheckedChange={() => handleCategoryChange(category.slug)}
                    className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                    style={{ 
                      '--checkbox-color': accentColor 
                    } as React.CSSProperties }
                  />
                  {getLocalizedName(category, currentLocale)}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sort" className="border-b-0">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <span>{t('sortBy')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Select
                value={selectedSortOrder}
                onValueChange={(value: SortOrder) => {
                  setSelectedSortOrder(value);
                  onFilterChangeAction({ type: 'sort', value });
                }}
              >
                <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                  <SelectValue placeholder={t('selectSortOrder')} />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="latest">{t('newestFirst')}</SelectItem>
                  <SelectItem value="oldest">{t('oldestFirst')}</SelectItem>
                  <SelectItem value="popular">{t('mostPopular')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
