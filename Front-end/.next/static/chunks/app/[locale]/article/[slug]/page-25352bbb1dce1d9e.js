(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [552],
  {
    388: (e, t, a) => {
      'use strict';
      a.d(t, { N_: () => c });
      var s = a(8223);
      let n = (0, a(9984).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
        { Link: c, redirect: r, usePathname: l, useRouter: o, getPathname: d } = (0, s.A)(n);
    },
    722: (e, t, a) => {
      'use strict';
      a.d(t, { BP: () => l, dG: () => o, d_: () => r });
      var s = a(3464);
      let n = a(9509).env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        c = s.A.create({ baseURL: n, headers: { 'Content-Type': 'application/json' } }),
        r = {
          getAllPosts: async e => (await c.get('/posts', { params: e })).data,
          getPostBySlug: async e => (await c.get('/posts/'.concat(e))).data,
        },
        l = { getAllCategories: async () => (await c.get('/categories')).data },
        o = { getAllTags: async () => (await c.get('/tags')).data };
    },
    1410: (e, t, a) => {
      'use strict';
      a.r(t), a.d(t, { default: () => m });
      var s = a(5155),
        n = a(2115),
        c = a(5695),
        r = a(6874),
        l = a.n(r),
        o = a(6766),
        d = a(7652),
        i = a(6151),
        x = a(722);
      function m(e) {
        let { params: t } = e,
          { slug: a, locale: r } = t,
          m = (0, c.useRouter)(),
          h = (0, d.c3)('common'),
          [u, g] = (0, n.useState)(null),
          [p, y] = (0, n.useState)(!0),
          [N, j] = (0, n.useState)(null);
        (0, n.useEffect)(() => {
          let e = async () => {
            try {
              y(!0);
              let e = await x.d_.getPostBySlug(a);
              g(e.data.post), y(!1);
            } catch (e) {
              console.error('Failed to fetch article:', e), j(h('error')), y(!1);
            }
          };
          a && e();
        }, [a, h]);
        let b = e => {
          m.push('/'.concat(r, '?tag=').concat(e));
        };
        return (0, s.jsxs)('main', {
          className: 'min-h-screen bg-gray-900 text-gray-200',
          children: [
            (0, s.jsx)(i.A, {}),
            (0, s.jsxs)('div', {
              className: 'max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8',
              children: [
                (0, s.jsxs)(l(), {
                  href: '/'.concat(t.locale),
                  className: 'text-cyan-600 hover:text-cyan-400 mb-4 inline-block',
                  children: ['← ', h('backToHome')],
                }),
                p
                  ? (0, s.jsxs)('div', {
                      className: 'text-center py-10',
                      children: [
                        (0, s.jsx)('div', {
                          className:
                            'w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto',
                        }),
                        (0, s.jsx)('p', { className: 'mt-4 text-xl', children: h('loading') }),
                      ],
                    })
                  : N
                    ? (0, s.jsx)('div', {
                        className: 'text-center py-10',
                        children: (0, s.jsxs)('div', {
                          className: 'bg-red-900/30 border border-red-700 rounded-lg p-6',
                          children: [
                            (0, s.jsx)('p', { className: 'text-xl text-red-400', children: N }),
                            (0, s.jsx)(l(), {
                              href: '/'.concat(t.locale),
                              className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                              children: h('backToHome'),
                            }),
                          ],
                        }),
                      })
                    : u
                      ? (0, s.jsxs)('article', {
                          className: 'bg-gray-800 rounded-lg p-6 shadow-lg',
                          children: [
                            (0, s.jsx)('h1', {
                              className: 'text-3xl font-extrabold mb-4',
                              children: u.title,
                            }),
                            u.featuredImage &&
                              (0, s.jsx)('div', {
                                className: 'mb-6',
                                children: (0, s.jsx)(o.default, {
                                  src: u.featuredImage,
                                  alt: u.title,
                                  width: 800,
                                  height: 400,
                                  className: 'w-full h-auto rounded-lg',
                                  unoptimized: u.featuredImage.startsWith('http'),
                                }),
                              }),
                            (0, s.jsxs)('div', {
                              className: 'mb-4 text-gray-400 flex items-center',
                              children: [
                                (0, s.jsxs)('span', {
                                  className: 'mr-4',
                                  children: [
                                    h('publishedAt'),
                                    ': ',
                                    new Date(u.publishedAt).toLocaleDateString(),
                                  ],
                                }),
                                u.author &&
                                  (0, s.jsxs)('span', {
                                    className: 'flex items-center',
                                    children: [
                                      h('author'),
                                      ': ',
                                      u.author.displayName || u.author.username,
                                    ],
                                  }),
                              ],
                            }),
                            u.categories &&
                              u.categories.length > 0 &&
                              (0, s.jsxs)('div', {
                                className: 'mb-4',
                                children: [
                                  (0, s.jsxs)('span', {
                                    className: 'text-gray-400 mr-2',
                                    children: [h('categories'), ':'],
                                  }),
                                  u.categories.map(e =>
                                    (0, s.jsx)(
                                      l(),
                                      {
                                        href: '/'.concat(t.locale, '/?category=').concat(e.slug),
                                        className: 'text-cyan-500 hover:text-cyan-400 mr-2',
                                        children: e.name,
                                      },
                                      e._id
                                    )
                                  ),
                                ],
                              }),
                            u.tags &&
                              u.tags.length > 0 &&
                              (0, s.jsxs)('div', {
                                className: 'mb-4',
                                children: [
                                  (0, s.jsxs)('span', {
                                    className: 'text-gray-400 mr-2',
                                    children: [h('tags'), ':'],
                                  }),
                                  (0, s.jsx)('div', {
                                    className: 'inline-flex flex-wrap gap-2',
                                    children: u.tags.map(e =>
                                      (0, s.jsx)(
                                        'span',
                                        {
                                          onClick: () => b(e.slug),
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
                            (0, s.jsx)('div', {
                              className: 'prose prose-lg prose-invert max-w-none',
                              children: (0, s.jsx)('div', {
                                dangerouslySetInnerHTML: { __html: u.content },
                              }),
                            }),
                          ],
                        })
                      : (0, s.jsx)('div', {
                          className: 'text-center py-10',
                          children: (0, s.jsxs)('div', {
                            className: 'bg-yellow-900/30 border border-yellow-700 rounded-lg p-6',
                            children: [
                              (0, s.jsx)('p', { className: 'text-xl', children: h('notFound') }),
                              (0, s.jsx)(l(), {
                                href: '/'.concat(t.locale),
                                className: 'mt-4 inline-block text-cyan-500 hover:text-cyan-400',
                                children: h('backToHome'),
                              }),
                            ],
                          }),
                        }),
              ],
            }),
            (0, s.jsx)('footer', {
              className: 'bg-gray-800 py-6 mt-12',
              children: (0, s.jsx)('div', {
                className: 'max-w-3xl mx-auto text-center',
                children: (0, s.jsx)('p', {
                  className: 'text-gray-400',
                  children: h('footer.copyright', { year: new Date().getFullYear() }),
                }),
              }),
            }),
          ],
        });
      }
    },
    6151: (e, t, a) => {
      'use strict';
      a.d(t, { A: () => i });
      var s = a(5155),
        n = a(2115),
        c = a(388),
        r = a(7652),
        l = a(6453),
        o = a(5695);
      function d() {
        let e = (0, l.Ym)(),
          t = (0, o.useRouter)(),
          a = (0, o.usePathname)(),
          n = s => {
            let n = a.replace('/'.concat(e), '') || '/',
              c = '/'.concat(s).concat(n);
            t.push(c);
          };
        return (0, s.jsxs)('div', {
          className: 'flex items-center space-x-2',
          children: [
            (0, s.jsx)('button', {
              onClick: () => n('zh'),
              className: 'px-2 py-1 text-sm rounded-md '.concat(
                'zh' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              ),
              children: '中文',
            }),
            (0, s.jsx)('button', {
              onClick: () => n('en'),
              className: 'px-2 py-1 text-sm rounded-md '.concat(
                'en' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              ),
              children: 'English',
            }),
          ],
        });
      }
      function i() {
        let [e, t] = (0, n.useState)(!1),
          a = (0, r.c3)('nav');
        return (0, s.jsxs)('nav', {
          className: 'bg-white shadow-md',
          children: [
            (0, s.jsx)('div', {
              className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              children: (0, s.jsxs)('div', {
                className: 'flex justify-between items-center h-16',
                children: [
                  (0, s.jsx)('div', {
                    className: 'flex items-center',
                    children: (0, s.jsx)(c.N_, {
                      href: '/',
                      className: 'text-2xl font-bold text-cyan-600',
                      children: 'MyBlog',
                    }),
                  }),
                  (0, s.jsxs)('div', {
                    className: 'hidden md:flex md:space-x-8',
                    children: [
                      (0, s.jsx)(c.N_, {
                        href: '/',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: a('home'),
                      }),
                      (0, s.jsx)(c.N_, {
                        href: '/about',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: a('about'),
                      }),
                      (0, s.jsx)(c.N_, {
                        href: '/contact',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: a('contact'),
                      }),
                      (0, s.jsx)(d, {}),
                    ],
                  }),
                  (0, s.jsx)('div', {
                    className: '-mr-2 flex md:hidden',
                    children: (0, s.jsxs)('button', {
                      onClick: () => t(!e),
                      type: 'button',
                      className:
                        'bg-cyan-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
                      'aria-controls': 'mobile-menu',
                      'aria-expanded': e,
                      children: [
                        (0, s.jsx)('span', { className: 'sr-only', children: 'Open main menu' }),
                        e
                          ? (0, s.jsx)('svg', {
                              className: 'block h-6 w-6',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              'aria-hidden': 'true',
                              children: (0, s.jsx)('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M6 18L18 6M6 6l12 12',
                              }),
                            })
                          : (0, s.jsx)('svg', {
                              className: 'block h-6 w-6',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              'aria-hidden': 'true',
                              children: (0, s.jsx)('path', {
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
            (0, s.jsx)('div', {
              className: ''.concat(e ? 'block' : 'hidden', ' md:hidden'),
              id: 'mobile-menu',
              children: (0, s.jsxs)('div', {
                className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3',
                children: [
                  (0, s.jsx)(c.N_, {
                    href: '/',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: a('home'),
                  }),
                  (0, s.jsx)(c.N_, {
                    href: '/about',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: a('about'),
                  }),
                  (0, s.jsx)(c.N_, {
                    href: '/contact',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: a('contact'),
                  }),
                  (0, s.jsx)('div', { className: 'px-3 py-2', children: (0, s.jsx)(d, {}) }),
                ],
              }),
            }),
          ],
        });
      }
    },
    9927: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 1410));
    },
  },
  e => {
    var t = t => e((e.s = t));
    e.O(0, [453, 587, 209, 441, 684, 358], () => t(9927)), (_N_E = e.O());
  },
]);
