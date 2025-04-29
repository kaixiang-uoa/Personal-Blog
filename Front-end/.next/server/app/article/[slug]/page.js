(() => {
  var e = {};
  (e.id = 225),
    (e.ids = [225]),
    (e.modules = {
      3295: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      10846: e => {
        'use strict';
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js');
      },
      12412: e => {
        'use strict';
        e.exports = require('assert');
      },
      15003: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => c });
        var r = s(60687),
          a = s(43210),
          n = s(16189),
          i = s(85814),
          l = s.n(i),
          o = s(30474),
          d = s(28288);
        function c() {
          let { slug: e } = (0, n.useParams)(),
            t = (0, n.useRouter)(),
            [s, i] = (0, a.useState)(null),
            [c, x] = (0, a.useState)(!0),
            [m, u] = (0, a.useState)(null),
            h = e => {
              t.push(`/?tag=${e}`);
            };
          return (0, r.jsxs)('main', {
            className: 'min-h-screen bg-gray-900 text-gray-200',
            children: [
              (0, r.jsx)(d.A, {}),
              (0, r.jsxs)('div', {
                className: 'max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8',
                children: [
                  (0, r.jsx)(l(), {
                    href: '/',
                    className: 'text-cyan-600 hover:text-cyan-400 mb-4 inline-block',
                    children: '← 返回首页',
                  }),
                  c
                    ? (0, r.jsxs)('div', {
                        className: 'text-center py-10',
                        children: [
                          (0, r.jsx)('div', {
                            className:
                              'w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto',
                          }),
                          (0, r.jsx)('p', { className: 'mt-4 text-xl', children: '加载文章中...' }),
                        ],
                      })
                    : m
                      ? (0, r.jsx)('div', {
                          className: 'text-center py-10',
                          children: (0, r.jsxs)('div', {
                            className: 'bg-red-900/30 border border-red-700 rounded-lg p-6',
                            children: [
                              (0, r.jsx)('p', { className: 'text-xl text-red-400', children: m }),
                              (0, r.jsx)(l(), {
                                href: '/',
                                className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                                children: '返回首页',
                              }),
                            ],
                          }),
                        })
                      : s
                        ? (0, r.jsxs)('article', {
                            className: 'bg-gray-800 rounded-lg p-6 shadow-lg',
                            children: [
                              (0, r.jsx)('h1', {
                                className: 'text-3xl font-extrabold mb-4',
                                children: s.title,
                              }),
                              s.featuredImage &&
                                (0, r.jsx)('div', {
                                  className: 'mb-6',
                                  children: (0, r.jsx)(o.default, {
                                    src: s.featuredImage,
                                    alt: s.title,
                                    width: 800,
                                    height: 400,
                                    className: 'w-full h-auto rounded-lg',
                                    unoptimized: s.featuredImage.startsWith('http'),
                                  }),
                                }),
                              (0, r.jsxs)('div', {
                                className: 'mb-4 text-gray-400 flex items-center',
                                children: [
                                  (0, r.jsxs)('span', {
                                    className: 'mr-4',
                                    children: [
                                      '发布于: ',
                                      new Date(s.publishedAt).toLocaleDateString('zh-CN'),
                                    ],
                                  }),
                                  s.author &&
                                    (0, r.jsxs)('span', {
                                      className: 'flex items-center',
                                      children: [
                                        '作者: ',
                                        s.author.displayName || s.author.username,
                                      ],
                                    }),
                                ],
                              }),
                              s.categories &&
                                s.categories.length > 0 &&
                                (0, r.jsxs)('div', {
                                  className: 'mb-4',
                                  children: [
                                    (0, r.jsx)('span', {
                                      className: 'text-gray-400 mr-2',
                                      children: '分类:',
                                    }),
                                    s.categories.map(e =>
                                      (0, r.jsx)(
                                        l(),
                                        {
                                          href: `/?category=${e.slug}`,
                                          className: 'text-cyan-500 hover:text-cyan-400 mr-2',
                                          children: e.name,
                                        },
                                        e._id
                                      )
                                    ),
                                  ],
                                }),
                              s.tags &&
                                s.tags.length > 0 &&
                                (0, r.jsxs)('div', {
                                  className: 'mb-4',
                                  children: [
                                    (0, r.jsx)('span', {
                                      className: 'text-gray-400 mr-2',
                                      children: '标签:',
                                    }),
                                    (0, r.jsx)('div', {
                                      className: 'inline-flex flex-wrap gap-2',
                                      children: s.tags.map(e =>
                                        (0, r.jsx)(
                                          'span',
                                          {
                                            onClick: () => h(e.slug),
                                            className:
                                              'px-2 py-1 bg-cyan-600 text-white rounded-md text-sm cursor-pointer transition-colors hover:bg-cyan-700',
                                            children: e.name,
                                          },
                                          e._id
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                              (0, r.jsx)('div', {
                                className: 'prose prose-lg prose-invert max-w-none',
                                children: (0, r.jsx)('div', {
                                  dangerouslySetInnerHTML: { __html: s.content },
                                }),
                              }),
                            ],
                          })
                        : (0, r.jsx)('div', {
                            className: 'text-center py-10',
                            children: (0, r.jsxs)('div', {
                              className: 'bg-yellow-900/30 border border-yellow-700 rounded-lg p-6',
                              children: [
                                (0, r.jsx)('p', {
                                  className: 'text-xl',
                                  children: '文章不存在或已被删除',
                                }),
                                (0, r.jsx)(l(), {
                                  href: '/',
                                  className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                                  children: '返回首页',
                                }),
                              ],
                            }),
                          }),
                ],
              }),
              (0, r.jsx)('footer', {
                className: 'bg-gray-800 py-6 mt-12',
                children: (0, r.jsx)('div', {
                  className: 'max-w-3xl mx-auto text-center',
                  children: (0, r.jsxs)('p', {
                    className: 'text-gray-400',
                    children: [
                      '\xa9 ',
                      new Date().getFullYear(),
                      ' My Personal Blog. All rights reserved.',
                    ],
                  }),
                }),
              }),
            ],
          });
        }
        s(64298);
      },
      19121: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
      },
      20790: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 85569));
      },
      21820: e => {
        'use strict';
        e.exports = require('os');
      },
      25324: (e, t, s) => {
        'use strict';
        s.d(t, { N_: () => n });
        var r = s(24448);
        let a = (0, s(85484).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          { Link: n, redirect: i, usePathname: l, useRouter: o, getPathname: d } = (0, r.A)(a);
      },
      26511: () => {},
      27910: e => {
        'use strict';
        e.exports = require('stream');
      },
      28288: (e, t, s) => {
        'use strict';
        s.d(t, { A: () => c });
        var r = s(60687),
          a = s(43210),
          n = s(25324),
          i = s(77618),
          l = s(8610),
          o = s(16189);
        function d() {
          let e = (0, l.Ym)(),
            t = (0, o.useRouter)(),
            s = (0, o.usePathname)(),
            a = r => {
              let a = s.replace(`/${e}`, '') || '/',
                n = `/${r}${a}`;
              t.push(n);
            };
          return (0, r.jsxs)('div', {
            className: 'flex items-center space-x-2',
            children: [
              (0, r.jsx)('button', {
                onClick: () => a('zh'),
                className: `px-2 py-1 text-sm rounded-md ${'zh' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                children: '中文',
              }),
              (0, r.jsx)('button', {
                onClick: () => a('en'),
                className: `px-2 py-1 text-sm rounded-md ${'en' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                children: 'English',
              }),
            ],
          });
        }
        function c() {
          let [e, t] = (0, a.useState)(!1),
            s = (0, i.c3)('nav');
          return (0, r.jsxs)('nav', {
            className: 'bg-white shadow-md',
            children: [
              (0, r.jsx)('div', {
                className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
                children: (0, r.jsxs)('div', {
                  className: 'flex justify-between items-center h-16',
                  children: [
                    (0, r.jsx)('div', {
                      className: 'flex items-center',
                      children: (0, r.jsx)(n.N_, {
                        href: '/',
                        className: 'text-2xl font-bold text-cyan-600',
                        children: 'MyBlog',
                      }),
                    }),
                    (0, r.jsxs)('div', {
                      className: 'hidden md:flex md:space-x-8',
                      children: [
                        (0, r.jsx)(n.N_, {
                          href: '/',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: s('home'),
                        }),
                        (0, r.jsx)(n.N_, {
                          href: '/about',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: s('about'),
                        }),
                        (0, r.jsx)(n.N_, {
                          href: '/contact',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: s('contact'),
                        }),
                        (0, r.jsx)(d, {}),
                      ],
                    }),
                    (0, r.jsx)('div', {
                      className: '-mr-2 flex md:hidden',
                      children: (0, r.jsxs)('button', {
                        onClick: () => t(!e),
                        type: 'button',
                        className:
                          'bg-cyan-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
                        'aria-controls': 'mobile-menu',
                        'aria-expanded': e,
                        children: [
                          (0, r.jsx)('span', { className: 'sr-only', children: 'Open main menu' }),
                          e
                            ? (0, r.jsx)('svg', {
                                className: 'block h-6 w-6',
                                xmlns: 'http://www.w3.org/2000/svg',
                                fill: 'none',
                                viewBox: '0 0 24 24',
                                stroke: 'currentColor',
                                'aria-hidden': 'true',
                                children: (0, r.jsx)('path', {
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  strokeWidth: '2',
                                  d: 'M6 18L18 6M6 6l12 12',
                                }),
                              })
                            : (0, r.jsx)('svg', {
                                className: 'block h-6 w-6',
                                xmlns: 'http://www.w3.org/2000/svg',
                                fill: 'none',
                                viewBox: '0 0 24 24',
                                stroke: 'currentColor',
                                'aria-hidden': 'true',
                                children: (0, r.jsx)('path', {
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  strokeWidth: '2',
                                  d: 'M4 6h16M4 12h16m-7 6h7',
                                }),
                              }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
              (0, r.jsx)('div', {
                className: `${e ? 'block' : 'hidden'} md:hidden`,
                id: 'mobile-menu',
                children: (0, r.jsxs)('div', {
                  className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3',
                  children: [
                    (0, r.jsx)(n.N_, {
                      href: '/',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: s('home'),
                    }),
                    (0, r.jsx)(n.N_, {
                      href: '/about',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: s('about'),
                    }),
                    (0, r.jsx)(n.N_, {
                      href: '/contact',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: s('contact'),
                    }),
                    (0, r.jsx)('div', { className: 'px-3 py-2', children: (0, r.jsx)(d, {}) }),
                  ],
                }),
              }),
            ],
          });
        }
      },
      28354: e => {
        'use strict';
        e.exports = require('util');
      },
      29021: e => {
        'use strict';
        e.exports = require('fs');
      },
      29294: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-async-storage.external.js');
      },
      33873: e => {
        'use strict';
        e.exports = require('path');
      },
      55511: e => {
        'use strict';
        e.exports = require('crypto');
      },
      55591: e => {
        'use strict';
        e.exports = require('https');
      },
      59288: (e, t, s) => {
        'use strict';
        s.r(t),
          s.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => x,
            pages: () => c,
            routeModule: () => m,
            tree: () => d,
          });
        var r = s(65239),
          a = s(48088),
          n = s(88170),
          i = s.n(n),
          l = s(30893),
          o = {};
        for (let e in l)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (o[e] = () => l[e]);
        s.d(t, o);
        let d = {
            children: [
              '',
              {
                children: [
                  'article',
                  {
                    children: [
                      '[slug]',
                      {
                        children: [
                          '__PAGE__',
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(s.bind(s, 85569)),
                              '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/article/[slug]/page.tsx',
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    metadata: {
                      icon: [
                        async e => (await Promise.resolve().then(s.bind(s, 70440))).default(e),
                      ],
                      apple: [],
                      openGraph: [],
                      twitter: [],
                      manifest: void 0,
                    },
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(s.bind(s, 94431)),
                  '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/layout.tsx',
                ],
                'not-found': [
                  () => Promise.resolve().then(s.t.bind(s, 57398, 23)),
                  'next/dist/client/components/not-found-error',
                ],
                forbidden: [
                  () => Promise.resolve().then(s.t.bind(s, 89999, 23)),
                  'next/dist/client/components/forbidden-error',
                ],
                unauthorized: [
                  () => Promise.resolve().then(s.t.bind(s, 65284, 23)),
                  'next/dist/client/components/unauthorized-error',
                ],
                metadata: {
                  icon: [async e => (await Promise.resolve().then(s.bind(s, 70440))).default(e)],
                  apple: [],
                  openGraph: [],
                  twitter: [],
                  manifest: void 0,
                },
              },
            ],
          }.children,
          c = [
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/article/[slug]/page.tsx',
          ],
          x = { require: s, loadChunk: () => Promise.resolve() },
          m = new r.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: '/article/[slug]/page',
              pathname: '/article/[slug]',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      61135: () => {},
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      64298: (e, t, s) => {
        'use strict';
        s.d(t, { BP: () => l, dG: () => o, d_: () => i });
        var r = s(51060);
        let a = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
          n = r.A.create({ baseURL: a, headers: { 'Content-Type': 'application/json' } }),
          i = {
            getAllPosts: async e => (await n.get('/posts', { params: e })).data,
            getPostBySlug: async e => (await n.get(`/posts/${e}`)).data,
          },
          l = { getAllCategories: async () => (await n.get('/categories')).data },
          o = { getAllTags: async () => (await n.get('/tags')).data };
      },
      67646: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 15003));
      },
      70440: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => a });
        var r = s(31658);
        let a = async e => [
          {
            type: 'image/x-icon',
            sizes: '16x16',
            url: (0, r.fillMetadataSegment)('.', await e.params, 'favicon.ico') + '',
          },
        ];
      },
      74075: e => {
        'use strict';
        e.exports = require('zlib');
      },
      77752: (e, t, s) => {
        Promise.resolve().then(s.t.bind(s, 16444, 23)),
          Promise.resolve().then(s.t.bind(s, 16042, 23)),
          Promise.resolve().then(s.t.bind(s, 88170, 23)),
          Promise.resolve().then(s.t.bind(s, 49477, 23)),
          Promise.resolve().then(s.t.bind(s, 29345, 23)),
          Promise.resolve().then(s.t.bind(s, 12089, 23)),
          Promise.resolve().then(s.t.bind(s, 46577, 23)),
          Promise.resolve().then(s.t.bind(s, 31307, 23));
      },
      78424: (e, t, s) => {
        Promise.resolve().then(s.t.bind(s, 86346, 23)),
          Promise.resolve().then(s.t.bind(s, 27924, 23)),
          Promise.resolve().then(s.t.bind(s, 35656, 23)),
          Promise.resolve().then(s.t.bind(s, 40099, 23)),
          Promise.resolve().then(s.t.bind(s, 38243, 23)),
          Promise.resolve().then(s.t.bind(s, 28827, 23)),
          Promise.resolve().then(s.t.bind(s, 62763, 23)),
          Promise.resolve().then(s.t.bind(s, 97173, 23));
      },
      79551: e => {
        'use strict';
        e.exports = require('url');
      },
      81630: e => {
        'use strict';
        e.exports = require('http');
      },
      83997: e => {
        'use strict';
        e.exports = require('tty');
      },
      85569: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => r });
        let r = (0, s(12907).registerClientReference)(
          function () {
            throw Error(
              'Attempted to call the default export of "/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/article/[slug]/page.tsx" from the server, but it\'s on the client. It\'s not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.'
            );
          },
          '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/article/[slug]/page.tsx',
          'default'
        );
      },
      94431: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => l, metadata: () => i });
        var r = s(37413);
        s(61135);
        var a = s(7339),
          n = s.n(a);
        let i = {
          title: 'Modern Blog',
          description: 'A trendy blog for web development enthusiasts',
        };
        function l({ children: e }) {
          return (0, r.jsx)('html', {
            lang: 'en',
            children: (0, r.jsx)('body', { className: n().className, children: e }),
          });
        }
      },
      94735: e => {
        'use strict';
        e.exports = require('events');
      },
      98487: () => {},
    });
  var t = require('../../../webpack-runtime.js');
  t.C(e);
  var s = e => t((t.s = e)),
    r = t.X(0, [447, 435, 658, 618, 309, 549], () => s(59288));
  module.exports = r;
})();
