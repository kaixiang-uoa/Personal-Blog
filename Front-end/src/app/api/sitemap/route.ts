import { NextResponse } from 'next/server';

/**
 * Generate dynamic sitemap.xml
 * Returns XML sitemap with all published posts, categories, and tags
 */
export async function GET() {
  try {
    const baseUrl = 'https://www.kxzhang.online';
    const currentDate = new Date().toISOString();

    // Fetch data from API
    const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?status=published&limit=1000&lang=en`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories?lang=en`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags?lang=en`),
    ]);

    const posts = await postsResponse.json();
    const categories = await categoriesResponse.json();
    const tags = await tagsResponse.json();

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

  <!-- English Homepage -->
  <url>
    <loc>${baseUrl}/en</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Chinese Homepage -->
  <url>
    <loc>${baseUrl}/zh</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- About Pages -->
  <url>
    <loc>${baseUrl}/en/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Contact Pages -->
  <url>
    <loc>${baseUrl}/en/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Published Posts -->
  ${
    posts.data?.posts
      ?.map(
        (post: any) => `
  <url>
    <loc>${baseUrl}/en/article/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh/article/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
      )
      .join('') || ''
  }

  <!-- Categories -->
  ${
    categories.data?.categories
      ?.map(
        (category: any) => `
  <url>
    <loc>${baseUrl}/en?category=${encodeURIComponent(category.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh?category=${encodeURIComponent(category.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `
      )
      .join('') || ''
  }

  <!-- Tags -->
  ${
    tags.data?.tags
      ?.map(
        (tag: any) => `
  <url>
    <loc>${baseUrl}/en?tag=${encodeURIComponent(tag.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh?tag=${encodeURIComponent(tag.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  `
      )
      .join('') || ''
  }

</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
