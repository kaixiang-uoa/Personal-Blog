import { NextResponse } from 'next/server';
import type { Article, Category, Tag } from '@/types/models';
import { createSitemapGenerator } from '@/utils/sitemap-generator';

/**
 * Generate sitemap.xml at /sitemap.xml
 * This provides a standard sitemap location for search engines
 * Uses the automatic sitemap generator for consistent and maintainable code
 */
export async function GET() {
  try {
    // Fetch data from API
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://personal-blog-w2y9.onrender.com/api/v1';

    const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
      fetch(`${apiUrl}/posts?status=published&limit=1000&lang=en`),
      fetch(`${apiUrl}/categories?lang=en`),
      fetch(`${apiUrl}/tags?lang=en`),
    ]);

    const postsData = await postsResponse.json();
    const categoriesData = await categoriesResponse.json();
    const tagsData = await tagsResponse.json();

    // Extract data from API response
    const posts: Article[] = postsData.success ? postsData.data.posts || [] : [];
    const categories: Category[] = categoriesData.success
      ? categoriesData.data.categories || []
      : [];
    const tags: Tag[] = tagsData.success ? tagsData.data.tags || [] : [];

    // Create sitemap generator and generate sitemap
    const sitemapGenerator = createSitemapGenerator();

    const sitemap = sitemapGenerator
      .addStaticPages()
      .addDynamicPages(posts, categories, tags)
      .generateXML();

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
