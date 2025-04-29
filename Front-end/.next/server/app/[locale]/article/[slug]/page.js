(() => {
  var e = {};
  (e.id = 552),
    (e.ids = [552]),
    (e.modules = {
      3295: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      6946: (e, t, s) => {
        'use strict';
        s.r(t),
          s.d(t, {
            GlobalError: () => o.a,
            __next_app__: () => x,
            pages: () => d,
            routeModule: () => m,
            tree: () => c,
          });
        var r = s(65239),
          a = s(48088),
          n = s(88170),
          o = s.n(n),
          l = s(30893),
          i = {};
        for (let e in l)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (i[e] = () => l[e]);
        s.d(t, i);
        let c = {
            children: [
              '',
              {
                children: [
                  '[locale]',
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
                                  () => Promise.resolve().then(s.bind(s, 18850)),
                                  '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/article/[slug]/page.tsx',
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(s.bind(s, 94627)),
                      '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/layout.tsx',
                    ],
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
          d = [
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/article/[slug]/page.tsx',
          ],
          x = { require: s, loadChunk: () => Promise.resolve() },
          m = new r.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: '/[locale]/article/[slug]/page',
              pathname: '/[locale]/article/[slug]',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      10846: e => {
        'use strict';
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js');
      },
      12412: e => {
        'use strict';
        e.exports = require('assert');
      },
      18850: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => r });
        let r = (0, s(12907).registerClientReference)(
          function () {
            throw Error(
              'Attempted to call the default export of "/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/article/[slug]/page.tsx" from the server, but it\'s on the client. It\'s not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.'
            );
          },
          '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/article/[slug]/page.tsx',
          'default'
        );
      },
      19121: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
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
          { Link: n, redirect: o, usePathname: l, useRouter: i, getPathname: c } = (0, r.A)(a);
      },
      26511: () => {},
      27910: e => {
        'use strict';
        e.exports = require('stream');
      },
      28288: (e, t, s) => {
        'use strict';
        s.d(t, { A: () => d });
        var r = s(60687),
          a = s(43210),
          n = s(25324),
          o = s(77618),
          l = s(8610),
          i = s(16189);
        function c() {
          let e = (0, l.Ym)(),
            t = (0, i.useRouter)(),
            s = (0, i.usePathname)(),
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
        function d() {
          let [e, t] = (0, a.useState)(!1),
            s = (0, o.c3)('nav');
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
                        (0, r.jsx)(c, {}),
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
                    (0, r.jsx)('div', { className: 'px-3 py-2', children: (0, r.jsx)(c, {}) }),
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
      31714: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 45196));
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
      57097: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 18850));
      },
      57168: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => x });
        var r = s(60687),
          a = s(43210),
          n = s(16189),
          o = s(85814),
          l = s.n(o),
          i = s(30474),
          c = s(77618),
          d = s(28288);
        function x({ params: e }) {
          let { slug: t, locale: s } = e,
            o = (0, n.useRouter)(),
            x = (0, c.c3)('common'),
            [m, u] = (0, a.useState)(null),
            [h, p] = (0, a.useState)(!0),
            [g, b] = (0, a.useState)(null),
            v = e => {
              o.push(`/${s}?tag=${e}`);
            };
          return (0, r.jsxs)('main', {
            className: 'min-h-screen bg-gray-900 text-gray-200',
            children: [
              (0, r.jsx)(d.A, {}),
              (0, r.jsxs)('div', {
                className: 'max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8',
                children: [
                  (0, r.jsxs)(l(), {
                    href: `/${e.locale}`,
                    className: 'text-cyan-600 hover:text-cyan-400 mb-4 inline-block',
                    children: ['← ', x('backToHome')],
                  }),
                  h
                    ? (0, r.jsxs)('div', {
                        className: 'text-center py-10',
                        children: [
                          (0, r.jsx)('div', {
                            className:
                              'w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto',
                          }),
                          (0, r.jsx)('p', { className: 'mt-4 text-xl', children: x('loading') }),
                        ],
                      })
                    : g
                      ? (0, r.jsx)('div', {
                          className: 'text-center py-10',
                          children: (0, r.jsxs)('div', {
                            className: 'bg-red-900/30 border border-red-700 rounded-lg p-6',
                            children: [
                              (0, r.jsx)('p', { className: 'text-xl text-red-400', children: g }),
                              (0, r.jsx)(l(), {
                                href: `/${e.locale}`,
                                className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                                children: x('backToHome'),
                              }),
                            ],
                          }),
                        })
                      : m
                        ? (0, r.jsxs)('article', {
                            className: 'bg-gray-800 rounded-lg p-6 shadow-lg',
                            children: [
                              (0, r.jsx)('h1', {
                                className: 'text-3xl font-extrabold mb-4',
                                children: m.title,
                              }),
                              m.featuredImage &&
                                (0, r.jsx)('div', {
                                  className: 'mb-6',
                                  children: (0, r.jsx)(i.default, {
                                    src: m.featuredImage,
                                    alt: m.title,
                                    width: 800,
                                    height: 400,
                                    className: 'w-full h-auto rounded-lg',
                                    unoptimized: m.featuredImage.startsWith('http'),
                                  }),
                                }),
                              (0, r.jsxs)('div', {
                                className: 'mb-4 text-gray-400 flex items-center',
                                children: [
                                  (0, r.jsxs)('span', {
                                    className: 'mr-4',
                                    children: [
                                      x('publishedAt'),
                                      ': ',
                                      new Date(m.publishedAt).toLocaleDateString(),
                                    ],
                                  }),
                                  m.author &&
                                    (0, r.jsxs)('span', {
                                      className: 'flex items-center',
                                      children: [
                                        x('author'),
                                        ': ',
                                        m.author.displayName || m.author.username,
                                      ],
                                    }),
                                ],
                              }),
                              m.categories &&
                                m.categories.length > 0 &&
                                (0, r.jsxs)('div', {
                                  className: 'mb-4',
                                  children: [
                                    (0, r.jsxs)('span', {
                                      className: 'text-gray-400 mr-2',
                                      children: [x('categories'), ':'],
                                    }),
                                    m.categories.map(t =>
                                      (0, r.jsx)(
                                        l(),
                                        {
                                          href: `/${e.locale}/?category=${t.slug}`,
                                          className: 'text-cyan-500 hover:text-cyan-400 mr-2',
                                          children: t.name,
                                        },
                                        t._id
                                      )
                                    ),
                                  ],
                                }),
                              m.tags &&
                                m.tags.length > 0 &&
                                (0, r.jsxs)('div', {
                                  className: 'mb-4',
                                  children: [
                                    (0, r.jsxs)('span', {
                                      className: 'text-gray-400 mr-2',
                                      children: [x('tags'), ':'],
                                    }),
                                    (0, r.jsx)('div', {
                                      className: 'inline-flex flex-wrap gap-2',
                                      children: m.tags.map(e =>
                                        (0, r.jsx)(
                                          'span',
                                          {
                                            onClick: () => v(e.slug),
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
                                  dangerouslySetInnerHTML: { __html: m.content },
                                }),
                              }),
                            ],
                          })
                        : (0, r.jsx)('div', {
                            className: 'text-center py-10',
                            children: (0, r.jsxs)('div', {
                              className: 'bg-yellow-900/30 border border-yellow-700 rounded-lg p-6',
                              children: [
                                (0, r.jsx)('p', { className: 'text-xl', children: x('notFound') }),
                                (0, r.jsx)(l(), {
                                  href: `/${e.locale}`,
                                  className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                                  children: x('backToHome'),
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
                  children: (0, r.jsx)('p', {
                    className: 'text-gray-400',
                    children: x('footer.copyright', { year: new Date().getFullYear() }),
                  }),
                }),
              }),
            ],
          });
        }
        s(64298);
      },
      61135: () => {},
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      64298: (e, t, s) => {
        'use strict';
        s.d(t, { BP: () => l, dG: () => i, d_: () => o });
        var r = s(51060);
        let a = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
          n = r.A.create({ baseURL: a, headers: { 'Content-Type': 'application/json' } }),
          o = {
            getAllPosts: async e => (await n.get('/posts', { params: e })).data,
            getPostBySlug: async e => (await n.get(`/posts/${e}`)).data,
          },
          l = { getAllCategories: async () => (await n.get('/categories')).data },
          i = { getAllTags: async () => (await n.get('/tags')).data };
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
      73683: (e, t, s) => {
        'use strict';
        s.d(t, { A: () => o });
        var r = s(35471),
          a = s(14967);
        let n = (0, s(55946).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          o = (0, r.A)(async ({ requestLocale: e }) => {
            let t = await e,
              r = (0, a.EL)(n.locales, t) ? t : n.defaultLocale;
            return { locale: r, messages: (await s(76565)(`./${r}.json`)).default };
          });
      },
      74075: e => {
        'use strict';
        e.exports = require('zlib');
      },
      76565: (e, t, s) => {
        var r = { './en.json': [87368, 368], './zh.json': [72961, 961] };
        function a(e) {
          if (!s.o(r, e))
            return Promise.resolve().then(() => {
              var t = Error("Cannot find module '" + e + "'");
              throw ((t.code = 'MODULE_NOT_FOUND'), t);
            });
          var t = r[e],
            a = t[0];
          return s.e(t[1]).then(() => s.t(a, 19));
        }
        (a.keys = () => Object.keys(r)), (a.id = 76565), (e.exports = a);
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
      91546: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 80994));
      },
      94431: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => l, metadata: () => o });
        var r = s(37413);
        s(61135);
        var a = s(7339),
          n = s.n(a);
        let o = {
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
      94627: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => d });
        var r = s(37413),
          a = s(57974),
          n = s.n(a),
          o = s(39916),
          l = s(10323),
          i = s(88946);
        let c = ['en', 'zh'];
        function d({ children: e, params: { locale: t } }) {
          let s = (0, l.A)();
          return (
            c.includes(t) || (0, o.notFound)(),
            (0, r.jsx)('html', {
              lang: t,
              children: (0, r.jsx)('body', {
                className: n().className,
                children: (0, r.jsx)(i.A, { locale: t, messages: s, children: e }),
              }),
            })
          );
        }
      },
      94735: e => {
        'use strict';
        e.exports = require('events');
      },
      98487: () => {},
      98953: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 57168));
      },
    });
  var t = require('../../../../webpack-runtime.js');
  t.C(e);
  var s = e => t((t.s = e)),
    r = t.X(0, [447, 435, 658, 618, 309, 42, 549], () => s(6946));
  module.exports = r;
})();
