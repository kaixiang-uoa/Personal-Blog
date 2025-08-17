'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Article, Category, Tag } from '@/types/models';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs Component
 *
 * A navigation component that shows the current page's location in the site hierarchy.
 * Provides better user experience and SEO benefits.
 *
 * @component
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Articles', href: '/articles' },
 *     { label: 'Current Article', isCurrent: true }
 *   ]}
 * />
 * ```
 *
 * @returns {JSX.Element} The breadcrumbs navigation
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" aria-hidden="true" />}

          {item.isCurrent ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-muted-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

/**
 * Generate breadcrumb items for article pages
 * @param article - Article data
 * @param locale - Current locale
 * @returns Array of breadcrumb items
 */
export function generateArticleBreadcrumbs(article: Article, locale: string) {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: `/${locale}` },
    { label: 'Articles', href: `/${locale}` },
  ];

  // Add category if available
  if (article.categories && article.categories.length > 0) {
    const category = article.categories[0];
    items.push({
      label: category.name,
      href: `/${locale}?category=${category.slug}`,
    });
  }

  // Add current article
  items.push({
    label: article.title,
    isCurrent: true,
  });

  return items;
}

/**
 * Generate breadcrumb items for category pages
 * @param category - Category data
 * @param locale - Current locale
 * @returns Array of breadcrumb items
 */
export function generateCategoryBreadcrumbs(category: Category, locale: string) {
  return [
    { label: 'Home', href: `/${locale}` },
    { label: 'Articles', href: `/${locale}` },
    { label: category.name, isCurrent: true },
  ];
}

/**
 * Generate breadcrumb items for tag pages
 * @param tag - Tag data
 * @param locale - Current locale
 * @returns Array of breadcrumb items
 */
export function generateTagBreadcrumbs(tag: Tag, locale: string) {
  return [
    { label: 'Home', href: `/${locale}` },
    { label: 'Articles', href: `/${locale}` },
    { label: `Tag: ${tag.name}`, isCurrent: true },
  ];
}

/**
 * Generate breadcrumb items for search pages
 * @param searchQuery - Search query
 * @param locale - Current locale
 * @returns Array of breadcrumb items
 */
export function generateSearchBreadcrumbs(searchQuery: string, locale: string) {
  return [
    { label: 'Home', href: `/${locale}` },
    { label: 'Articles', href: `/${locale}` },
    { label: `Search: "${searchQuery}"`, isCurrent: true },
  ];
}
