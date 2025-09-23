import { SITE } from '@/lib/site';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ArticleLayout(props: LayoutProps) {
  const { children } = props;
  return children;
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;

  const baseUrl = SITE.baseUrl;
  const path = `/${locale}/article/${slug}`;
  const url = `${baseUrl}${path}`;

  // Fallback metadata
  let title = 'Article';
  let description = 'Read this article on the Personal Blog.';
  let featuredImage: string | undefined;

  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL || 'https://personal-blog-w2y9.onrender.com/api/v1';
    const res = await fetch(`${apiBase}/posts/slug/${slug}`, { next: { revalidate: 300 } });
    if (res.ok) {
      const json = await res.json();
      const post = json?.data?.post;
      if (post) {
        title = post.seo?.metaTitle || post.title || title;
        description =
          post.seo?.metaDescription ||
          post.excerpt ||
          (post.content ? String(post.content).slice(0, 160) : description);
        featuredImage = post.featuredImage || undefined;
      }
    }
  } catch {
    // Silent fallback
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/article/${slug}`,
        zh: `${baseUrl}/zh/article/${slug}`,
        'x-default': `${baseUrl}/en/article/${slug}`,
      },
    },
    openGraph: {
      url,
      type: 'article',
      title,
      description,
      images: featuredImage
        ? [{ url: featuredImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}
