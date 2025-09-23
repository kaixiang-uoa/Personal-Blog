# SEO/性能改进临时任务清单

> 目的：记录需逐条落实的站点 SEO 与性能优化项，执行中实时勾选更新。完成后此文件可删除或迁移到文档。

## 1) 域名/重定向

- [x] 实施 HTTP→HTTPS 与非 www→www 单跳 301 到 `https://www.kxzhang.online/…`
- [x] 将根路径 `/` → `/en` 设置为永久 301，设计规则避免双跳

依据：

```61:83:Front-end/next.config.ts
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'kxzhang.online' }],
      destination: 'https://www.kxzhang.online/:path*',
      permanent: true,
    },
    { source: '/', destination: '/en', permanent: false },
  ];
}
```

## 2) Canonical & Hreflang

- [x] 文章页确认使用 `PageSEO/ArticleSEO` 并“自指向 canonical”
- [x] `<head>` 注入 `en / zh / x-default` hreflang（已具备能力，核对覆盖）

依据：

```184:221:Front-end/src/components/common/PageSEO.tsx
// 生成 canonical + hreflang（客户端注入）
```

## 3) Sitemap

- [x] 输出中英文 URL，并为静态页补 `<lastmod>`
- [x] 确保 `/contact`, `/about` 全覆盖（如需 `/posts` 列表页，后续评估）

依据：

```36:58:Front-end/src/utils/sitemap-generator.ts
// 已含 /, /about, /contact 及文章；静态页未写 lastmod
```

## 4) 页面内容（避免 Thin Content）

- [x] `/about` 在无内容时渲染简短默认描述（使用通用文章模板）
- [x] `/contact` 已有描述文案

依据：

```217:226:Front-end/src/app/[locale]/about/page.tsx
// 仅在 intro 存在时渲染，需补默认文案
```

## 5) 图片优化

- [ ] 全量使用 `next/image`（现状基本满足）
- [ ] Banner 背景图评估：迁移为 `next/image` 覆盖渲染或确保源图 webp/avif

依据：

```33:39:Front-end/src/components/common/PageBanner.tsx
// CSS 背景图方式
```

## 6) Accessibility

- [ ] 仅图标按钮补 `aria-label`
- [ ] 调整文本与背景对比度 ≥ 4.5:1（用 Axe/Lighthouse 验证）

## 7) 静态资源缓存

- [x] next.config.js 设置 `Cache-Control` 长缓存：
  - `/_next/static/*`, `/_next/image*`, `/images/*` → `public, max-age=31536000, immutable`
  - 文档/HTML 路由保持短缓存或 `no-store`

## 8) 后续可选

- [ ] 将 SEO 从客户端迁移至 `generateMetadata`（SSR，更稳）

---

执行顺序建议：

1. 重定向与缓存（影响全站）
2. about 默认文案与 Sitemap `<lastmod>`
3. 无障碍与图片策略微调
4. 如需要，再做 `generateMetadata` 迁移
