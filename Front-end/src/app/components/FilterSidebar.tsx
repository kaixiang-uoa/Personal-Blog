"use client"
import { useState, useEffect } from "react";
import { Tag, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { SortOrder } from "@/services/interface";

export interface FilterSidebarProps {
  tags: {
    _id: string;
    name: string;
    name_en?: string;
    name_zh?: string;
    slug: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
  activeTags: string[];
  categories: {
    _id: string;
    name: string;
    name_en?: string;
    name_zh?: string;
    slug: string;
  }[];
  activeCategory: string | null;
  sortOrder: SortOrder;
  onFilterChangeAction: (params: any) => void;
  onClearFiltersAction: () => void;
}

export default function FilterSidebar({
  tags,
  activeTags,
  categories,
  activeCategory,
  sortOrder = "publishedAt-desc",
  onFilterChangeAction,
  onClearFiltersAction
}: FilterSidebarProps) {
  const t = useTranslations("common");
  const { locale } = useParams();
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    activeCategory || null
  );
  const [selectedSortOrder, setSelectedSortOrder] =
    useState<SortOrder>(sortOrder);

  const getCategoryNameByLocale = (category: any, localeStr: string) => {
    if (localeStr === 'en') return category.name_en || category.name;
    if (localeStr === 'zh') return category.name_zh || category.name;
    return category.name;
  };

  const getTagNameByLocale = (tag: any, localeStr: string) => {
    if (localeStr === 'en') return tag.name_en || tag.name;
    if (localeStr === 'zh') return tag.name_zh || tag.name;
    return tag.name;
  };

  useEffect(() => {
    setSelectedCategory(activeCategory || null);
  }, [activeCategory]);

  useEffect(() => {
    setSelectedTags(activeTags || []);
  }, [activeTags]);

  const handleTagChange = (tagSlug: string, checked: boolean) => {
    let newSelectedTags: string[];

    if (checked) {
      newSelectedTags = [...selectedTags, tagSlug];
    } else {
      newSelectedTags = selectedTags.filter((t) => t !== tagSlug);
    }

    setSelectedTags(newSelectedTags);
    onFilterChangeAction({type: "tags", value: newSelectedTags});
  };

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onFilterChangeAction({ type: "category",value: categorySlug || ""});
  };

  const hasActiveFilters = activeTags.length > 0 || activeCategory;

  return (
    <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{t("filters")}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFiltersAction}
            className="text-cyan-500 hover:text-cyan-400 hover:bg-gray-700 p-1 h-auto"
          >
            <X className="h-4 w-4 mr-1" />
            {t("clear")}
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mb-4 pb-4 border-b border-gray-700">
          <p className="text-sm text-gray-400 mb-2">{t("activeFilters")}:</p>
          <div className="flex flex-wrap gap-2">
            {activeTags.map((tagSlug) => {
              const tag = tags.find((t) => t.slug === tagSlug);
              return (
                <Badge
                  key={tagSlug}
                  variant="secondary"
                  className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer"
                  onClick={() => handleTagChange(tagSlug, false)}
                >
                  {tag ? getTagNameByLocale(tag, locale as string) : tagSlug}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              );
            })}

            {activeCategory &&
              (() => {
                const category = categories.find(
                  (c) => c.slug === activeCategory
                );
                return (
                  <Badge
                    key={activeCategory}
                    variant="secondary"
                    className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer"
                    onClick={() => handleCategoryChange(null)}
                  >
                    {category ? getCategoryNameByLocale(category, locale as string) : activeCategory}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                );
              })()}
          </div>
        </div>
      )}

      <Accordion
        type="multiple"
        defaultValue={["tags", "category", "sort"]}
        className="w-full"
      >
        <AccordionItem value="tags" className="border-b border-gray-700">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <span>{t("tags")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {tags.map((tag) => (
                <Label
                  key={tag._id}
                  className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                >
                  <Checkbox
                    checked={selectedTags.includes(tag.slug)}
                    onCheckedChange={(checked) =>
                      handleTagChange(tag.slug, checked as boolean)
                    }
                    className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                  />
                  <span className="truncate">{getTagNameByLocale(tag, locale as string)}</span>
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
              <span>{t("categories")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <Label
                key="all-categories"
                className="flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors"
              >
                <Checkbox
                  checked={!selectedCategory}
                  onCheckedChange={() => handleCategoryChange(null)}
                  className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                />
                {t("allCategories")}
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
                  {getCategoryNameByLocale(category, locale as string)}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sort" className="border-b-0">
          <AccordionTrigger className="text-base py-3 hover:no-underline">
            <div className="flex items-center">
              <span>{t("sortBy")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Select
                value={selectedSortOrder}
                onValueChange={(value: SortOrder) => {
                  setSelectedSortOrder(value);
                  onFilterChangeAction( {type: "sort", value });
                }}
              >
                <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                  <SelectValue placeholder={t("selectSortOrder")} />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="publishedAt-desc">
                    {t("newestFirst")}
                  </SelectItem>
                  <SelectItem value="publishedAt-asc">
                    {t("oldestFirst")}
                  </SelectItem>
                  <SelectItem value="updatedAt-desc">
                    {t("lastUpdated")}
                  </SelectItem>
                  <SelectItem value="updatedAt-asc">
                    {t("oldestUpdated")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
