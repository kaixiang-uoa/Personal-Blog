✅ A. Canonical & Hreflang（最高优先级）
1) 站点常量

新建/更新：/src/lib/site.ts

export const SITE = {
  baseUrl: "https://www.kxzhang.online",
  locales: ["en", "zh"] as const,
  defaultLocale: "en",
};

2) Next.js i18n 设置（如未配置）

修改：next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: { locales: ["en", "zh"], defaultLocale: "en" },
};
module.exports = nextConfig;

3) 为文章详情页输出 自指向 canonical + 正确 hreflang

假设使用 App Router（app 目录），文章路由为 app/[locale]/(blog)/posts/[slug]/page.tsx。若目录不同，等价应用到你的文章页面文件即可。

新建/更新：app/[locale]/(blog)/posts/[slug]/page.tsx

import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// 依据实际数据源获取文章标题/描述
async function getPost(params: { locale: string; slug: string }) {
  // TODO: 替换为你的取数逻辑
  return {
    title: "Post Title",
    description: "Post description...",
  };
}

export async function generateMetadata(
  { params }: { params: { locale: "en" | "zh"; slug: string } }
): Promise<Metadata> {
  const { title, description } = await getPost(params);
  const { locale, slug } = params;

  const path = `/${locale}/posts/${slug}`;
  const canonical = `${SITE.baseUrl}${path}`;

  // 语言版本映射（确保中英文文章 slug 对应一致）
  const alt: Record<string, string> = {
    en: `${SITE.baseUrl}/en/posts/${slug}`,
    zh: `${SITE.baseUrl}/zh/posts/${slug}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical,               // ✅ 自指向 canonical（不要指向另一语言）
      languages: {
        en: alt.en,
        zh: alt.zh,
      },
    },
    // 其他常用 SEO 元数据...
    openGraph: {
      url: canonical,
      title,
      description,
      locale,
      siteName: "kxzhang.online",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 页面组件略…
export default async function PostPage() { /* ... */ }

4) 在全局 Layout 注入 x-default（可选但推荐）

更新：app/[locale]/layout.tsx（或你的全局布局）

import { SITE } from "@/lib/site";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* x-default 指向站点默认语言或首页 */}
        <link rel="alternate" hrefLang="x-default" href={`${SITE.baseUrl}/`} />
      </head>
      <body>{children}</body>
    </html>
  );
}


验收要点

中文文章页 <link rel="canonical"> 必须指向 中文页本身；英文同理。

<link rel="alternate" hreflang="en|zh|x-default"> 成对出现，URL 各自正确。

随机抽查 3 篇中英文文章，查看源代码确认标签正确。

✅ B. 图片与性能（对应 Lighthouse 提示）
1) 全量替换 <img> → next/image

搜索代码库：<img → 全部替换为：

import Image from "next/image";

<Image
  src={src}              // 支持静态导入或远程 URL
  alt={alt}
  width={W} height={H}   // 必填，设为实际渲染尺寸
  sizes="(max-width: 768px) 100vw, 768px" // 合理的响应尺寸
  priority={isLCP}       // 为 LCP 图设置优先加载
/>

2) 开启 WebP/AVIF、远程图域名白名单

更新：next.config.js

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.kxzhang.online" }, // 按需添加
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};
module.exports = nextConfig;

3) 关键字体/第三方域名预连接

在全局 head（布局）加入（按需保留）：

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">


使用 next/font 自托管字体，减少阻塞。

4) 静态资源长缓存

更新：next.config.js

module.exports = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|woff2|js|css)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

5) 减少未使用 JS/CSS

对重组件使用 动态导入：

import dynamic from "next/dynamic";
const Heavy = dynamic(() => import("./Heavy"), { ssr: false, loading: () => null });


移除未用样式与脚本；避免 render-blocking 资源（<link rel="preload"> 仅用于关键资源）。

6) bfcache 兼容

全局搜索并删除 window.onunload / window.addEventListener('unload', ...)，改用：

window.addEventListener("pagehide", () => { /* 清理逻辑 */ });

✅ C. 无障碍（Accessibility）
1) 图标按钮补 aria-label

搜索：<button 内仅含 <svg> 的用例，逐个加：

<button aria-label="Open menu">
  <svg /* ... */ />
</button>

2) 提升文字对比度

统一色板（以 Tailwind 为例）：

正文文本 ≥ text-neutral-800，深色模式确保与背景对比 ≥ 4.5:1。

链接默认色确保对比达标，悬停加下划线而非仅颜色变化。

Lighthouse 再跑一遍确保 Contrast 无警告。

✅ D. Sitemap & Robots（配合收录）
1) 确保 Sitemap 覆盖所有语言版本

生成器（示例 app/sitemap.ts）需输出 中英文 URL 与 <lastmod>：

import { SITE } from "@/lib/site";
export default async function sitemap() {
  const posts = await getAllPosts(); // 含 slug
  const urls = [];
  for (const { slug, lastmod } of posts) {
    for (const locale of SITE.locales) {
      urls.push({
        url: `${SITE.baseUrl}/${locale}/posts/${slug}`,
        lastModified: lastmod ?? new Date(),
      });
    }
  }
  return urls;
}

2) Robots

app/robots.ts 或 public/robots.txt：允许抓取 /en/* /zh/*，并指向站点地图：

Sitemap: https://www.kxzhang.online/sitemap.xml

✅ E. 部署后操作（GSC）

重新部署并确认：随机抽查 3 篇中文/英文文章 → View-source 中的 canonical 与 hreflang 均正确。

Google Search Console：

对本次修复影响最大的 8–10 个 URL（包含中文/英文文章各 4–5 篇）逐一 URL Inspection → Request Indexing。

覆盖之前 Discovered – not indexed 的典型页面。

验证修复：对相关覆盖报告点击 Validate Fix（若存在）。

跟踪：7–14 天查看 Indexed 数量与 Impressions 变化。

✅ F. 验收与回归（本地/线上各跑一次）

Lighthouse（移动端）

Performance ≥ 90，LCP ≤ 2.5s，CLS ≤ 0.1，TBT ≈ 0ms

Accessibility ≥ 95（无 Buttons do not have an accessible name、Contrast 告警）

Best Practices = 100

SEO ≥ 95（无 canonical/hreflang 相关告警）

随机抽查 6 篇文章（中/英各 3）

rel=canonical 自指向

hreflang 成对且 URL 正确，含 x-default

页面无 noindex

Sitemap

含中英文文章 URL，<lastmod> 正确更新

GSC

“未收录（Discovered/Crawled）”数量在两周内明显下降；Indexed 增长