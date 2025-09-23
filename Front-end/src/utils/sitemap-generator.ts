import { SITE } from '@/lib/site';
import type { Article, Category, Tag } from '@/types/models';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  hreflang?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export interface SitemapConfig {
  baseUrl: string;
  locales: readonly string[];
  defaultLocale: string;
  excludePaths?: string[];
  includeQueryParams?: boolean;
}

export class SitemapGenerator {
  private config: SitemapConfig;
  private urls: SitemapUrl[] = [];

  constructor(config: SitemapConfig) {
    this.config = config;
  }

  /**
   * Add static pages
   */
  addStaticPages() {
    const buildTime = new Date().toISOString();
    const staticPages = [
      { path: '', priority: 1.0, changefreq: 'daily' as const, lastmod: buildTime },
      { path: '/about', priority: 0.8, changefreq: 'monthly' as const, lastmod: buildTime },
      { path: '/contact', priority: 0.7, changefreq: 'monthly' as const, lastmod: buildTime },
    ];

    staticPages.forEach(({ path, priority, changefreq, lastmod }) => {
      // Add root page
      this.addUrl({
        loc: `${this.config.baseUrl}${path}`,
        priority,
        changefreq,
        lastmod,
        hreflang: this.generateHreflang(path),
      });

      // Add localized pages
      this.config.locales.forEach(locale => {
        this.addUrl({
          loc: `${this.config.baseUrl}/${locale}${path}`,
          priority,
          changefreq,
          lastmod,
          hreflang: this.generateHreflang(path),
        });
      });
    });

    return this;
  }

  /**
   * Add dynamic content pages
   */
  addDynamicPages(articles: Article[], categories: Category[], tags: Tag[]) {
    // Add articles
    articles.forEach(article => {
      const path = `/article/${article.slug}`;
      this.addUrl({
        loc: `${this.config.baseUrl}/en${path}`,
        lastmod: article.updatedAt || article.createdAt,
        priority: 0.8,
        changefreq: 'weekly',
        hreflang: this.generateHreflang(path),
      });

      this.addUrl({
        loc: `${this.config.baseUrl}/zh${path}`,
        lastmod: article.updatedAt || article.createdAt,
        priority: 0.8,
        changefreq: 'weekly',
        hreflang: this.generateHreflang(path),
      });
    });

    // Add category pages (if you want them indexed)
    if (this.config.includeQueryParams) {
      categories.forEach(category => {
        const path = `?category=${category.slug}`;
        this.addUrl({
          loc: `${this.config.baseUrl}/en${path}`,
          priority: 0.6,
          changefreq: 'weekly',
          hreflang: this.generateHreflang(path),
        });

        this.addUrl({
          loc: `${this.config.baseUrl}/zh${path}`,
          priority: 0.6,
          changefreq: 'weekly',
          hreflang: this.generateHreflang(path),
        });
      });

      // Add tag pages
      tags.forEach(tag => {
        const path = `?tag=${tag.slug}`;
        this.addUrl({
          loc: `${this.config.baseUrl}/en${path}`,
          priority: 0.5,
          changefreq: 'weekly',
          hreflang: this.generateHreflang(path),
        });

        this.addUrl({
          loc: `${this.config.baseUrl}/zh${path}`,
          priority: 0.5,
          changefreq: 'weekly',
          hreflang: this.generateHreflang(path),
        });
      });
    }

    return this;
  }

  /**
   * Add custom URLs
   */
  addCustomUrls(urls: SitemapUrl[]) {
    urls.forEach(url => this.addUrl(url));
    return this;
  }

  /**
   * Add a single URL
   */
  private addUrl(url: SitemapUrl) {
    // Check if URL should be excluded
    if (this.config.excludePaths?.some(path => url.loc.includes(path))) {
      return;
    }

    this.urls.push(url);
  }

  /**
   * Generate hreflang tags for a path
   */
  private generateHreflang(path: string) {
    const hreflang: Array<{ hreflang: string; href: string }> = [];

    // Add language-specific URLs
    this.config.locales.forEach(locale => {
      hreflang.push({
        hreflang: locale,
        href: `${this.config.baseUrl}/${locale}${path}`,
      });
    });

    // Add x-default
    hreflang.push({
      hreflang: 'x-default',
      href: `${this.config.baseUrl}/${this.config.defaultLocale}${path}`,
    });

    return hreflang;
  }

  /**
   * Generate XML sitemap
   */
  generateXML(): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    this.urls.forEach(url => {
      xml += `
  <url>
    <loc>${url.loc}</loc>`;

      if (url.lastmod) {
        xml += `
    <lastmod>${url.lastmod}</lastmod>`;
      }

      if (url.changefreq) {
        xml += `
    <changefreq>${url.changefreq}</changefreq>`;
      }

      if (url.priority) {
        xml += `
    <priority>${url.priority}</priority>`;
      }

      // Add hreflang tags
      if (url.hreflang) {
        url.hreflang.forEach(href => {
          xml += `
    <xhtml:link rel="alternate" hreflang="${href.hreflang}" href="${href.href}"/>`;
        });
      }

      xml += `
  </url>`;
    });

    xml += `
</urlset>`;

    return xml;
  }

  /**
   * Get all URLs
   */
  getUrls(): SitemapUrl[] {
    return this.urls;
  }

  /**
   * Clear all URLs
   */
  clear() {
    this.urls = [];
    return this;
  }
}

/**
 * Create a sitemap generator instance with default configuration
 */
export function createSitemapGenerator(): SitemapGenerator {
  return new SitemapGenerator({
    baseUrl: SITE.baseUrl,
    locales: SITE.locales,
    defaultLocale: SITE.defaultLocale,
    excludePaths: ['/api', '/admin', '/_next'],
    includeQueryParams: false, // Set to false to exclude category/tag pages from sitemap
  });
}
