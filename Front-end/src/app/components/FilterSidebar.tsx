'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Tag, Category, SortOrder } from '@/types';
import { useSetting } from '@/contexts/SettingsContext';

interface FilterSidebarProps {
  tags: Tag[];
  activeTags: string[];
  categories: Category[];
  activeCategory: string | null;
  sortOrder: SortOrder;
  currentLocale: string;
  isHorizontal?: boolean;
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
  isHorizontal = false,
  onFilterChangeAction,
}: FilterSidebarProps) {
  const t = useTranslations('common');
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory || null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>(sortOrder);
  
  // 从设置中获取侧边栏设置
  const defaultSort = useSetting('posts.defaultSort', 'latest') as SortOrder;
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

  const handleTagChange = (tagSlug: string) => {
    // 在新设计中，标签选择变成了下拉单选
    setSelectedTags([tagSlug]);
    onFilterChangeAction({ type: 'tags', value: [tagSlug] });
  };

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onFilterChangeAction({ type: 'category', value: categorySlug || '' });
  };

  const handleSortChange = (newSort: SortOrder) => {
    setSelectedSortOrder(newSort);
    onFilterChangeAction({ type: 'sort', value: newSort });
  };

  // 水平布局样式
  if (isHorizontal) {
    return (
      <div className="flex flex-wrap gap-6 items-center w-full md:w-auto">
        {/* 类别选择 */}
        <select 
          className="form-input min-w-0 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-10 placeholder:text-[#60748a] px-3 py-2 text-sm font-normal leading-normal"
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value || null)}
          aria-label={t('categories')}
        >
          <option value="">{t('allCategories')}</option>
          {categories.map(category => (
            <option key={category._id} value={category.slug}>
              {getLocalizedName(category, currentLocale)}
            </option>
          ))}
        </select>
        
        {/* 标签选择 */}
        <select 
          className="form-input min-w-0 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-10 placeholder:text-[#60748a] px-3 py-2 text-sm font-normal leading-normal"
          value={selectedTags[0] || ''}
          onChange={(e) => handleTagChange(e.target.value)}
          aria-label={t('tags')}
        >
          <option value="">{t('allTags')}</option>
          {tags.map(tag => (
            <option key={tag._id} value={tag.slug}>
              {getLocalizedName(tag, currentLocale)}
            </option>
          ))}
        </select>
        
        {/* 排序选择 */}
        <select 
          className="form-input min-w-0 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-10 placeholder:text-[#60748a] px-3 py-2 text-sm font-normal leading-normal"
          value={selectedSortOrder}
          onChange={(e) => handleSortChange(e.target.value as SortOrder)}
          aria-label={t('sortBy')}
        >
          <option value="latest">{t('newest')}</option>
          <option value="oldest">{t('oldest')}</option>
          <option value="popular">{t('popular')}</option>
        </select>
      </div>
    );
  }

  // 垂直布局样式（原样式）
  return (
    <div>
      {/* 类别选择 */}
      <div className="flex max-w-full flex-wrap items-end gap-3 py-2">
        <label className="flex flex-col flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">{t('categories')}</p>
          <select 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-12 placeholder:text-[#60748a] px-3 py-2 text-base font-normal leading-normal"
            value={selectedCategory || ''}
            onChange={(e) => handleCategoryChange(e.target.value || null)}
          >
            <option value="">{t('allCategories')}</option>
            {categories.map(category => (
              <option key={category._id} value={category.slug}>
                {getLocalizedName(category, currentLocale)}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      {/* 标签选择 */}
      <div className="flex max-w-full flex-wrap items-end gap-3 py-2">
        <label className="flex flex-col flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">{t('tags')}</p>
          <select 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-12 placeholder:text-[#60748a] px-3 py-2 text-base font-normal leading-normal"
            value={selectedTags[0] || ''}
            onChange={(e) => handleTagChange(e.target.value)}
          >
            <option value="">{t('allTags')}</option>
            {tags.map(tag => (
              <option key={tag._id} value={tag.slug}>
                {getLocalizedName(tag, currentLocale)}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      {/* 排序选择 */}
      <div className="flex max-w-full flex-wrap items-end gap-3 py-2">
        <label className="flex flex-col flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">{t('sortBy')}</p>
          <select 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-12 placeholder:text-[#60748a] px-3 py-2 text-base font-normal leading-normal"
            value={selectedSortOrder}
            onChange={(e) => handleSortChange(e.target.value as SortOrder)}
          >
            <option value="latest">{t('newest')}</option>
            <option value="oldest">{t('oldest')}</option>
            <option value="popular">{t('popular')}</option>
          </select>
        </label>
      </div>
    </div>
  );
}
