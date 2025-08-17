import { NextResponse } from 'next/server';
import type { Article, Category, Tag } from '@/types/models';

/**
 * Generate sitemap.xml at /sitemap.xml
 * This provides a standard sitemap location for search engines
 */
export async function GET() {
  try {
    const baseUrl = 'https://www.kxzhang.online';
    const currentDate = new Date().toISOString();

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

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>

  <!-- Language-specific homepages -->
  <url>
    <loc>${baseUrl}/en</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>
  
  <url>
    <loc>${baseUrl}/zh</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>

  <!-- About pages -->
  <url>
    <loc>${baseUrl}/en/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh/about"/>
  </url>
  
  <url>
    <loc>${baseUrl}/zh/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh/about"/>
  </url>

  <!-- Contact pages -->
  <url>
    <loc>${baseUrl}/en/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/contact"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh/contact"/>
  </url>
  
  <url>
    <loc>${baseUrl}/zh/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/contact"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh/contact"/>
  </url>

  <!-- Articles -->
  ${posts
    .map(
      (post: Article) => `
  <url>
    <loc>${baseUrl}/en/article/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.createdAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/article/${post.slug}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh/article/${post.slug}"/>
  </url>
  <url>
    <loc>${baseUrl}/zh/article/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.createdAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/article/${post.slug}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh/article/${post.slug}"/>
  </url>`
    )
    .join('')}

  <!-- Categories -->
  ${categories
    .map(
      category => `
  <url>
    <loc>${baseUrl}/en?category=${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en?category=${category.slug}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh?category=${category.slug}"/>
  </url>
  <url>
    <loc>${baseUrl}/zh?category=${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en?category=${category.slug}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh?category=${category.slug}"/>
  </url>`
    )
    .join('')}

  <!-- Tags -->
  ${tags
    .map(
      tag => `
  <url>
    <loc>${baseUrl}/en?tag=${tag.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en?tag=${tag.slug}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh?tag=${tag.slug}"/>
  </url>
  <url>
    <loc>${baseUrl}/zh?tag=${tag.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en?tag=${tag.slug}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh?tag=${tag.slug}"/>
  </url>`
    )
    .join('')}

</urlset>`;

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
