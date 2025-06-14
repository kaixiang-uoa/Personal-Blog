'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSetting } from '@/contexts/SettingsContext';
import { SelectField } from '@/components/ui';
import { FilterSidebarProps } from '@/types/components';
import { SortOrder } from '@/types/models/common';
import { validateSortOrder } from '@/utils';

export default function FilterSidebar({
  tags,
  activeTags,
  categories,
  activeCategory,
  currentLocale,
  sortOrder = 'latest',
  isHorizontal = false,
  onFilterChangeAction,
}: FilterSidebarProps) {
  const t = useTranslations('common');
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory || null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>(sortOrder);
  
  // Get sidebar settings from settings
  const defaultSortSetting = useSetting('posts.defaultSort', 'latest');
  const defaultSort = validateSortOrder(defaultSortSetting, 'latest');
  const showSidebar = useSetting('appearance.showSidebar', true);

  const getLocalizedName = useCallback((
    item: { name: string; name_en?: string; name_zh?: string },
    locale: string
  ): string => {
    if (locale === 'en') return item.name_en || item.name;
    if (locale === 'zh') return item.name_zh || item.name;
    return item.name;
  }, []);

  const handleTagChange = useCallback((tagSlug: string) => {
    setSelectedTags([tagSlug]);
    onFilterChangeAction({ type: 'tags', value: [tagSlug] });
  }, [onFilterChangeAction]);

  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onFilterChangeAction({ type: 'category', value: categorySlug || '' });
  }, [onFilterChangeAction]);

  const handleSortChange = useCallback((newSortValue: string) => {
    // Validate the sort value before using it
    const newSort = validateSortOrder(newSortValue, 'latest');
    setSelectedSortOrder(newSort);
    onFilterChangeAction({ type: 'sort', value: newSort });
  }, [onFilterChangeAction]);

  // Update selected category when activeCategory changes
  useEffect(() => {
    setSelectedCategory(activeCategory || null);
  }, [activeCategory]);

  // Update selected tags when activeTags changes
  useEffect(() => {
    setSelectedTags(activeTags || []);
  }, [activeTags]);

  // Update sort order when defaultSort changes
  useEffect(() => {
    // If no sort selected or reset to default, use default sort from settings
    if (!sortOrder || sortOrder === defaultSort) {
      onFilterChangeAction({ type: 'sort', value: defaultSort });
    }
  }, [defaultSort, sortOrder, onFilterChangeAction]);

  // If set to not show sidebar, return null after all hooks are called
  if (!showSidebar) {
    return null;
  }

  // Adjust container style to ensure components are displayed side by side in horizontal layout
  const containerClass = isHorizontal 
    ? "flex flex-row flex-wrap md:flex-nowrap items-center space-x-3 w-full"
    : "flex flex-col space-y-3 w-full";

  return (
    <div className={containerClass}>
      <SelectField
        label={t('categories')}
        value={selectedCategory || ''}
        onChange={(value: string | null) => handleCategoryChange(value)}
        options={[
          { value: '', label: t('allCategories') },
          ...categories.map(category => ({
            value: category.slug,
            label: getLocalizedName(category, currentLocale)
          }))
        ]}
        isHorizontal={isHorizontal}
      />

      <SelectField
        label={t('tags')}
        value={selectedTags[0] || ''}
        onChange={handleTagChange}
        options={[
          { value: '', label: t('allTags') },
          ...tags.map(tag => ({
            value: tag.slug,
            label: getLocalizedName(tag, currentLocale)
          }))
        ]}
        isHorizontal={isHorizontal}
      />

      <SelectField
        label={t('sortBy')}
        value={selectedSortOrder}
        onChange={(value: string) => handleSortChange(value)}
        options={[
          { value: 'latest', label: t('newest') },
          { value: 'oldest', label: t('oldest') },
          { value: 'popular', label: t('popular') }
        ]}
        isHorizontal={isHorizontal}
      />
    </div>
  );
}
