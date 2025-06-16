'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSetting } from '@/contexts/SettingsContext';
import { SelectField } from '@/components/ui';
import { FilterSidebarProps } from '@/types/components';
import { SortOrder } from '@/types/models/common';
import { validateSortOrder } from '@/utils';

/**
 * FilterSidebar Component
 * 
 * A flexible sidebar component that provides filtering capabilities for articles,
 * supporting categories, tags, and sorting options. Can be displayed in both
 * vertical and horizontal layouts.
 * 
 * @component
 * @example
 * ```tsx
 * <FilterSidebar
 *   tags={tags}
 *   activeTags={['react', 'typescript']}
 *   categories={categories}
 *   activeCategory="web-development"
 *   currentLocale="en"
 *   sortOrder="latest"
 *   isHorizontal={false}
 *   onFilterChangeAction={handleFilterChange}
 * />
 * ```
 * 
 * @param {FilterSidebarProps} props - The component props
 * @returns {JSX.Element | null} A filter sidebar component or null if sidebar is disabled
 */
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
  // State management for selected filters
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory || null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>(sortOrder);
  
  // Get sidebar configuration from settings
  const defaultSortSetting = useSetting('posts.defaultSort', 'latest');
  const defaultSort = validateSortOrder(defaultSortSetting, 'latest');
  const showSidebar = useSetting('appearance.showSidebar', true);

  /**
   * Get localized name for a given item based on current locale
   * @param {Object} item - The item containing name properties
   * @param {string} locale - The current locale
   * @returns {string} The localized name
   */
  const getLocalizedName = useCallback((
    item: { name: string; name_en?: string; name_zh?: string },
    locale: string
  ): string => {
    if (locale === 'en') return item.name_en || item.name;
    if (locale === 'zh') return item.name_zh || item.name;
    return item.name;
  }, []);

  /**
   * Handle tag selection change
   * @param {string} tagSlug - The selected tag slug
   */
  const handleTagChange = useCallback((tagSlug: string) => {
    setSelectedTags([tagSlug]);
    onFilterChangeAction({ type: 'tags', value: [tagSlug] });
  }, [onFilterChangeAction]);

  /**
   * Handle category selection change
   * @param {string | null} categorySlug - The selected category slug
   */
  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onFilterChangeAction({ type: 'category', value: categorySlug || '' });
  }, [onFilterChangeAction]);

  /**
   * Handle sort order change
   * @param {string} newSortValue - The new sort value
   */
  const handleSortChange = useCallback((newSortValue: string) => {
    // Validate the sort value before using it
    const newSort = validateSortOrder(newSortValue, 'latest');
    setSelectedSortOrder(newSort);
    onFilterChangeAction({ type: 'sort', value: newSort });
  }, [onFilterChangeAction]);

  // Sync selected category with activeCategory prop
  useEffect(() => {
    setSelectedCategory(activeCategory || null);
  }, [activeCategory]);

  // Sync selected tags with activeTags prop
  useEffect(() => {
    setSelectedTags(activeTags || []);
  }, [activeTags]);

  // Sync sort order with prop
  useEffect(() => {
    setSelectedSortOrder(sortOrder);
  }, [sortOrder]);

  // Return null if sidebar is disabled in settings
  if (!showSidebar) {
    return null;
  }

  // Determine container class based on layout mode
  const containerClass = isHorizontal 
    ? "flex flex-row flex-wrap md:flex-nowrap items-center space-x-3 w-full"
    : "flex flex-col space-y-3 w-full";

  return (
    <div className={containerClass}>
      {/* Category selection dropdown */}
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

      {/* Tag selection dropdown */}
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

      {/* Sort order selection dropdown */}
      <SelectField
        label={t('sortBy')}
        value={selectedSortOrder}
        onChange={(value: string) => handleSortChange(value)}
        options={[
          { value: 'latest', label: t('newestFirst') },
          { value: 'oldest', label: t('oldestFirst') },
          { value: 'popular', label: t('mostPopular') }
        ]}
        isHorizontal={isHorizontal}
      />
    </div>
  );
}
