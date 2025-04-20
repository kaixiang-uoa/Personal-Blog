"use client";

import { useState, useEffect } from "react"; // 导入 useEffect
import { useRouter } from "next/navigation";
import { Calendar, Tag, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface FilterSidebarProps {
  tags: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
  activeTags: string[];
  activeCategory: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onFilterChange: (type: "tags" | "dateRange" | "category", value: any) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  tags,
  activeTags,
  startDate,
  endDate,
  categories,
  activeCategory,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: startDate || null,
    endDate: endDate || null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    activeCategory || null
  );

  const router = useRouter();

  // --- 新增 Effect ---

  // 当 activeCategories prop 变化时，同步更新内部 selectedCategory state
  useEffect(() => {
    setSelectedCategory(activeCategory || null);
  }, [activeCategory]);

  // 当 activeTags prop 变化时，同步更新内部 selectedTags state
  useEffect(() => {
    setSelectedTags(activeTags || []);
  }, [activeTags]);

  // 当 startDate 或 endDate prop 变化时，同步更新内部 dateRange state
  useEffect(() => {
    setDateRange({
      startDate: startDate || null,
      endDate: endDate || null,
    });
  }, [startDate, endDate]);
  // --- Effect 结束 ---

  // --- 修改事件处理函数 ---

  // 当标签被选中或取消时，更新内部状态并通知父组
  const handleTagChange = (tagSlug: string, checked: boolean) => {
    let newSelectedTags: string[];

    if (checked) {
      newSelectedTags = [...selectedTags, tagSlug];
    } else {
      newSelectedTags = selectedTags.filter((t) => t !== tagSlug);
    }

    setSelectedTags(newSelectedTags);
    onFilterChange("tags", newSelectedTags);
  };

  // 当日期范围被选中或取消时，更新内部状态并通知父组
  const handleDateChange = (
    type: "startDate" | "endDate",
    date: Date | null
  ) => {
    const newDateRange = {
      ...dateRange,
      [type]: date,
    };

    setDateRange(newDateRange);
    onFilterChange("dateRange", newDateRange);
  };

  // 当分类被选中或取消时，更新内部状态并通知父组
  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onFilterChange("category", categorySlug);
  };
  // --- 事件处理函数结束 ---

  // --- 修改计算属性 ---
  // 直接使用 props 来判断是否有活跃筛选，确保与父组件状态一致
  const hasActiveFilters = activeTags.length > 0 || startDate || endDate;

  return (
    <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">筛选</h3>
        {hasActiveFilters && ( // 使用更新后的 hasActiveFilters
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-cyan-500 hover:text-cyan-400 hover:bg-gray-700 p-1 h-auto"
          >
            <X className="h-4 w-4 mr-1" />
            清除
          </Button>
        )}
      </div>

      {/* 活跃的筛选条件 */}
      {/* --- 修改活跃筛选区域 --- */}
      {/* 直接使用 props 来渲染活跃筛选，确保与父组件状态一致 */}
      {hasActiveFilters && (
        <div className="mb-4 pb-4 border-b border-gray-700">
          <p className="text-sm text-gray-400 mb-2">活跃筛选:</p>
          <div className="flex flex-wrap gap-2">
            {/* 使用 activeTags prop 渲染 */}
            {activeTags.map((tagSlug) => {
              const tag = tags.find((t) => t.slug === tagSlug);
              return (
                <Badge
                  key={tagSlug}
                  variant="secondary"
                  className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer"
                  // 点击时仍然调用 handleTagChange 来移除内部状态和通知父组件
                  onClick={() => handleTagChange(tagSlug, false)}
                >
                  {tag?.name || tagSlug}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              );
            })}

            {/* 使用 startDate 和 endDate props 渲染 */}
            {(startDate || endDate) && (
              <Badge
                variant="secondary"
                className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer"
                // 点击时重置内部状态并通知父组件
                onClick={() => {
                  setDateRange({ startDate: null, endDate: null }); // 清除内部状态
                  onFilterChange("dateRange", {
                    startDate: null,
                    endDate: null,
                  }); // 通知父组件
                }}
              >
                {/* 使用 props 渲染日期 */}
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                  : startDate
                  ? `从 ${startDate.toLocaleDateString()}`
                  : `至 ${endDate?.toLocaleDateString()}`}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
      )}
      {/* --- 活跃筛选区域结束 --- */}

      <Accordion
        type="multiple"
        defaultValue={["tags", "date"]}
        className="w-full"
      >
        <AccordionItem value="tags" className="border-b border-gray-700">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <span>标签</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* --- 标签列表渲染 --- */}
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {/* 遍历传入的 tags prop */}
              {tags.map((tag) => (
                <Label
                  key={tag._id} // 使用 tag._id 作为 key
                  className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                >
                  <Checkbox
                    // checked 状态取决于当前 tag.slug 是否在 selectedTags 数组中
                    checked={selectedTags.includes(tag.slug)}
                    // 当 Checkbox 状态改变时，调用 handleTagChange 更新状态并通知父组件
                    onCheckedChange={(checked) =>
                      handleTagChange(tag.slug, checked as boolean)
                    }
                    className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                  />
                  {/* 显示标签名称 */}
                  <span className="truncate">{tag.name}</span>
                </Label>
              ))}
            </div>
            {/* --- 标签列表渲染结束 --- */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category" className="border-b border-gray-700">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <span>分类</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <Label
                key="all"
                className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
              >
                <Checkbox
                  checked={!selectedCategory}
                  onCheckedChange={() => handleCategoryChange(null)}
                  className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                />
                全部分类
              </Label>
              {categories.map((category) => (
                <Label
                  key={category._id}
                  className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                >
                  <Checkbox
                    checked={selectedCategory === category.slug}
                    onCheckedChange={() => handleCategoryChange(category.slug)}
                    className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                  />
                  {category.name}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date" className="border-b border-gray-700">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>发布日期</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div>
                <Label className="text-sm text-gray-400 mb-1 block">
                  开始日期
                </Label>
                <DatePicker
                  // DatePicker 状态依赖内部 dateRange state
                  date={dateRange.startDate}
                  setDate={(date) => handleDateChange("startDate", date)}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-400 mb-1 block">
                  结束日期
                </Label>
                <DatePicker
                  // DatePicker 状态依赖内部 dateRange state
                  date={dateRange.endDate}
                  setDate={(date) => handleDateChange("endDate", date)}
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
