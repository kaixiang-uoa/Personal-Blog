(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [225],
  {
    388: (e, t, s) => {
      'use strict';
      s.d(t, { N_: () => r });
      var a = s(8223);
      let n = (0, s(9984).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
        { Link: r, redirect: l, usePathname: c, useRouter: d, getPathname: i } = (0, a.A)(n);
    },
    722: (e, t, s) => {
      'use strict';
      s.d(t, { BP: () => c, dG: () => d, d_: () => l });
      var a = s(3464);
      let n = s(9509).env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        r = a.A.create({ baseURL: n, headers: { 'Content-Type': 'application/json' } }),
        l = {
          getAllPosts: async e => (await r.get('/posts', { params: e })).data,
          getPostBySlug: async e => (await r.get('/posts/'.concat(e))).data,
        },
        c = { getAllCategories: async () => (await r.get('/categories')).data },
        d = { getAllTags: async () => (await r.get('/tags')).data };
    },
    2682: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 7567));
    },
    6151: (e, t, s) => {
      'use strict';
      s.d(t, { A: () => o });
      var a = s(5155),
        n = s(2115),
        r = s(388),
        l = s(7652),
        c = s(6453),
        d = s(5695);
      function i() {
        let e = (0, c.Ym)(),
          t = (0, d.useRouter)(),
          s = (0, d.usePathname)(),
          n = a => {
            let n = s.replace('/'.concat(e), '') || '/',
              r = '/'.concat(a).concat(n);
            t.push(r);
          };
        return (0, a.jsxs)('div', {
          className: 'flex items-center space-x-2',
          children: [
            (0, a.jsx)('button', {
              onClick: () => n('zh'),
              className: 'px-2 py-1 text-sm rounded-md '.concat(
                'zh' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              ),
              children: '中文',
            }),
            (0, a.jsx)('button', {
              onClick: () => n('en'),
              className: 'px-2 py-1 text-sm rounded-md '.concat(
                'en' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              ),
              children: 'English',
            }),
          ],
        });
      }
      function o() {
        let [e, t] = (0, n.useState)(!1),
          s = (0, l.c3)('nav');
        return (0, a.jsxs)('nav', {
          className: 'bg-white shadow-md',
          children: [
            (0, a.jsx)('div', {
              className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              children: (0, a.jsxs)('div', {
                className: 'flex justify-between items-center h-16',
                children: [
                  (0, a.jsx)('div', {
                    className: 'flex items-center',
                    children: (0, a.jsx)(r.N_, {
                      href: '/',
                      className: 'text-2xl font-bold text-cyan-600',
                      children: 'MyBlog',
                    }),
                  }),
                  (0, a.jsxs)('div', {
                    className: 'hidden md:flex md:space-x-8',
                    children: [
                      (0, a.jsx)(r.N_, {
                        href: '/',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: s('home'),
                      }),
                      (0, a.jsx)(r.N_, {
                        href: '/about',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: s('about'),
                      }),
                      (0, a.jsx)(r.N_, {
                        href: '/contact',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: s('contact'),
                      }),
                      (0, a.jsx)(i, {}),
                    ],
                  }),
                  (0, a.jsx)('div', {
                    className: '-mr-2 flex md:hidden',
                    children: (0, a.jsxs)('button', {
                      onClick: () => t(!e),
                      type: 'button',
                      className:
                        'bg-cyan-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
                      'aria-controls': 'mobile-menu',
                      'aria-expanded': e,
                      children: [
                        (0, a.jsx)('span', { className: 'sr-only', children: 'Open main menu' }),
                        e
                          ? (0, a.jsx)('svg', {
                              className: 'block h-6 w-6',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              'aria-hidden': 'true',
                              children: (0, a.jsx)('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M6 18L18 6M6 6l12 12',
                              }),
                            })
                          : (0, a.jsx)('svg', {
                              className: 'block h-6 w-6',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              'aria-hidden': 'true',
                              children: (0, a.jsx)('path', {
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
            (0, a.jsx)('div', {
              className: ''.concat(e ? 'block' : 'hidden', ' md:hidden'),
              id: 'mobile-menu',
              children: (0, a.jsxs)('div', {
                className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3',
                children: [
                  (0, a.jsx)(r.N_, {
                    href: '/',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: s('home'),
                  }),
                  (0, a.jsx)(r.N_, {
                    href: '/about',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: s('about'),
                  }),
                  (0, a.jsx)(r.N_, {
                    href: '/contact',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: s('contact'),
                  }),
                  (0, a.jsx)('div', { className: 'px-3 py-2', children: (0, a.jsx)(i, {}) }),
                ],
              }),
            }),
          ],
        });
      }
    },
    7567: (e, t, s) => {
      'use strict';
      s.r(t), s.d(t, { default: () => x });
      var a = s(5155),
        n = s(2115),
        r = s(5695),
        l = s(6874),
        c = s.n(l),
        d = s(6766),
        i = s(6151),
        o = s(722);
      function x() {
        let { slug: e } = (0, r.useParams)(),
          t = (0, r.useRouter)(),
          [s, l] = (0, n.useState)(null),
          [x, m] = (0, n.useState)(!0),
          [h, u] = (0, n.useState)(null);
        (0, n.useEffect)(() => {
          let t = async () => {
            try {
              m(!0);
              let t = await o.d_.getPostBySlug(e);
              if ((console.log('Fetched article:', t), !t.data.post))
                throw Error('Article not found');
              l(t.data.post), m(!1);
            } catch (e) {
              console.error('Failed to fetch article:', e), u('获取文章失败，请稍后再试'), m(!1);
            }
          };
          e && t();
        }, [e]);
        let g = e => {
          t.push('/?tag='.concat(e));
        };
        return (0, a.jsxs)('main', {
          className: 'min-h-screen bg-gray-900 text-gray-200',
          children: [
            (0, a.jsx)(i.A, {}),
            (0, a.jsxs)('div', {
              className: 'max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8',
              children: [
                (0, a.jsx)(c(), {
                  href: '/',
                  className: 'text-cyan-600 hover:text-cyan-400 mb-4 inline-block',
                  children: '← 返回首页',
                }),
                x
                  ? (0, a.jsxs)('div', {
                      className: 'text-center py-10',
                      children: [
                        (0, a.jsx)('div', {
                          className:
                            'w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto',
                        }),
                        (0, a.jsx)('p', { className: 'mt-4 text-xl', children: '加载文章中...' }),
                      ],
                    })
                  : h
                    ? (0, a.jsx)('div', {
                        className: 'text-center py-10',
                        children: (0, a.jsxs)('div', {
                          className: 'bg-red-900/30 border border-red-700 rounded-lg p-6',
                          children: [
                            (0, a.jsx)('p', { className: 'text-xl text-red-400', children: h }),
                            (0, a.jsx)(c(), {
                              href: '/',
                              className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                              children: '返回首页',
                            }),
                          ],
                        }),
                      })
                    : s
                      ? (0, a.jsxs)('article', {
                          className: 'bg-gray-800 rounded-lg p-6 shadow-lg',
                          children: [
                            (0, a.jsx)('h1', {
                              className: 'text-3xl font-extrabold mb-4',
                              children: s.title,
                            }),
                            s.featuredImage &&
                              (0, a.jsx)('div', {
                                className: 'mb-6',
                                children: (0, a.jsx)(d.default, {
                                  src: s.featuredImage,
                                  alt: s.title,
                                  width: 800,
                                  height: 400,
                                  className: 'w-full h-auto rounded-lg',
                                  unoptimized: s.featuredImage.startsWith('http'),
                                }),
                              }),
                            (0, a.jsxs)('div', {
                              className: 'mb-4 text-gray-400 flex items-center',
                              children: [
                                (0, a.jsxs)('span', {
                                  className: 'mr-4',
                                  children: [
                                    '发布于: ',
                                    new Date(s.publishedAt).toLocaleDateString('zh-CN'),
                                  ],
                                }),
                                s.author &&
                                  (0, a.jsxs)('span', {
                                    className: 'flex items-center',
                                    children: ['作者: ', s.author.displayName || s.author.username],
                                  }),
                              ],
                            }),
                            s.categories &&
                              s.categories.length > 0 &&
                              (0, a.jsxs)('div', {
                                className: 'mb-4',
                                children: [
                                  (0, a.jsx)('span', {
                                    className: 'text-gray-400 mr-2',
                                    children: '分类:',
                                  }),
                                  s.categories.map(e =>
                                    (0, a.jsx)(
                                      c(),
                                      {
                                        href: '/?category='.concat(e.slug),
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
                              (0, a.jsxs)('div', {
                                className: 'mb-4',
                                children: [
                                  (0, a.jsx)('span', {
                                    className: 'text-gray-400 mr-2',
                                    children: '标签:',
                                  }),
                                  (0, a.jsx)('div', {
                                    className: 'inline-flex flex-wrap gap-2',
                                    children: s.tags.map(e =>
                                      (0, a.jsx)(
                                        'span',
                                        {
                                          onClick: () => g(e.slug),
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
                            (0, a.jsx)('div', {
                              className: 'prose prose-lg prose-invert max-w-none',
                              children: (0, a.jsx)('div', {
                                dangerouslySetInnerHTML: { __html: s.content },
                              }),
                            }),
                          ],
                        })
                      : (0, a.jsx)('div', {
                          className: 'text-center py-10',
                          children: (0, a.jsxs)('div', {
                            className: 'bg-yellow-900/30 border border-yellow-700 rounded-lg p-6',
                            children: [
                              (0, a.jsx)('p', {
                                className: 'text-xl',
                                children: '文章不存在或已被删除',
                              }),
                              (0, a.jsx)(c(), {
                                href: '/',
                                className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                                children: '返回首页',
                              }),
                            ],
                          }),
                        }),
              ],
            }),
            (0, a.jsx)('footer', {
              className: 'bg-gray-800 py-6 mt-12',
              children: (0, a.jsx)('div', {
                className: 'max-w-3xl mx-auto text-center',
                children: (0, a.jsxs)('p', {
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
    },
  },
  e => {
    var t = t => e((e.s = t));
    e.O(0, [453, 587, 209, 441, 684, 358], () => t(2682)), (_N_E = e.O());
  },
]);
