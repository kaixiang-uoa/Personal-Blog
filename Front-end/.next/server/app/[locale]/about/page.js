(() => {
  var e = {};
  (e.id = 111),
    (e.ids = [111]),
    (e.modules = {
      3295: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      10846: e => {
        'use strict';
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js');
      },
      19121: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
      },
      25324: (e, t, s) => {
        'use strict';
        s.d(t, { N_: () => a });
        var r = s(24448);
        let n = (0, s(85484).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          { Link: a, redirect: o, usePathname: i, useRouter: l, getPathname: c } = (0, r.A)(n);
      },
      26511: () => {},
      28288: (e, t, s) => {
        'use strict';
        s.d(t, { A: () => d });
        var r = s(60687),
          n = s(43210),
          a = s(25324),
          o = s(77618),
          i = s(8610),
          l = s(16189);
        function c() {
          let e = (0, i.Ym)(),
            t = (0, l.useRouter)(),
            s = (0, l.usePathname)(),
            n = r => {
              let n = s.replace(`/${e}`, '') || '/',
                a = `/${r}${n}`;
              t.push(a);
            };
          return (0, r.jsxs)('div', {
            className: 'flex items-center space-x-2',
            children: [
              (0, r.jsx)('button', {
                onClick: () => n('zh'),
                className: `px-2 py-1 text-sm rounded-md ${'zh' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                children: '中文',
              }),
              (0, r.jsx)('button', {
                onClick: () => n('en'),
                className: `px-2 py-1 text-sm rounded-md ${'en' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                children: 'English',
              }),
            ],
          });
        }
        function d() {
          let [e, t] = (0, n.useState)(!1),
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
                      children: (0, r.jsx)(a.N_, {
                        href: '/',
                        className: 'text-2xl font-bold text-cyan-600',
                        children: 'MyBlog',
                      }),
                    }),
                    (0, r.jsxs)('div', {
                      className: 'hidden md:flex md:space-x-8',
                      children: [
                        (0, r.jsx)(a.N_, {
                          href: '/',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: s('home'),
                        }),
                        (0, r.jsx)(a.N_, {
                          href: '/about',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: s('about'),
                        }),
                        (0, r.jsx)(a.N_, {
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
                    (0, r.jsx)(a.N_, {
                      href: '/',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: s('home'),
                    }),
                    (0, r.jsx)(a.N_, {
                      href: '/about',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: s('about'),
                    }),
                    (0, r.jsx)(a.N_, {
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
      56349: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => i, dynamic: () => a, dynamicParams: () => o });
        var r = s(60687),
          n = s(28288);
        let a = 'force-dynamic',
          o = !1;
        function i() {
          return (0, r.jsxs)('main', {
            className: 'min-h-screen bg-gray-900 text-gray-200',
            children: [
              (0, r.jsx)(n.A, {}),
              (0, r.jsxs)('div', {
                className: 'max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8',
                children: [
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h1', {
                        className: 'text-4xl font-extrabold mb-4',
                        children: 'About Me',
                      }),
                      (0, r.jsx)('p', {
                        className: 'text-lg',
                        children:
                          "Hello! I'm a passionate developer with a love for technology and innovation. I enjoy creating solutions that make a difference and sharing my knowledge with others.",
                      }),
                    ],
                  }),
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h2', {
                        className: 'text-3xl font-bold mb-4',
                        children: 'Contact Information',
                      }),
                      (0, r.jsx)('ul', {
                        className: 'list-disc list-inside',
                        children: (0, r.jsxs)('li', {
                          children: [
                            'Email:',
                            ' ',
                            (0, r.jsx)('a', {
                              href: 'mailto:your.email@example.com',
                              className: 'text-cyan-600 hover:text-cyan-400',
                              children: 'your.email@example.com',
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h2', {
                        className: 'text-3xl font-bold mb-4',
                        children: 'Professional Skills',
                      }),
                      (0, r.jsxs)('ul', {
                        className: 'list-disc list-inside',
                        children: [
                          (0, r.jsx)('li', { children: 'JavaScript, TypeScript, React, Next.js' }),
                          (0, r.jsx)('li', { children: 'Node.js, Express, MongoDB' }),
                          (0, r.jsx)('li', { children: 'HTML, CSS, Tailwind CSS' }),
                          (0, r.jsx)('li', { children: 'Git, GitHub, CI/CD' }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h2', {
                        className: 'text-3xl font-bold mb-4',
                        children: 'Education',
                      }),
                      (0, r.jsxs)('ul', {
                        className: 'list-disc list-inside',
                        children: [
                          (0, r.jsx)('li', {
                            children: 'Bachelor of Science in Computer Science, Your University',
                          }),
                          (0, r.jsx)('li', { children: 'Additional Certifications or Courses' }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h2', {
                        className: 'text-3xl font-bold mb-4',
                        children: 'Experience',
                      }),
                      (0, r.jsxs)('ul', {
                        className: 'list-disc list-inside',
                        children: [
                          (0, r.jsx)('li', {
                            children: 'Software Developer at Company A (Year - Year)',
                          }),
                          (0, r.jsx)('li', { children: 'Intern at Company B (Year - Year)' }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h2', {
                        className: 'text-3xl font-bold mb-4',
                        children: 'Projects',
                      }),
                      (0, r.jsxs)('ul', {
                        className: 'list-disc list-inside',
                        children: [
                          (0, r.jsxs)('li', {
                            children: [
                              'Project A: Description and',
                              ' ',
                              (0, r.jsx)('a', {
                                href: '#',
                                className: 'text-cyan-600 hover:text-cyan-400',
                                children: 'GitHub Link',
                              }),
                            ],
                          }),
                          (0, r.jsxs)('li', {
                            children: [
                              'Project B: Description and',
                              ' ',
                              (0, r.jsx)('a', {
                                href: '#',
                                className: 'text-cyan-600 hover:text-cyan-400',
                                children: 'GitHub Link',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsxs)('section', {
                    className: 'mb-12',
                    children: [
                      (0, r.jsx)('h2', {
                        className: 'text-3xl font-bold mb-4',
                        children: 'Connect with Me',
                      }),
                      (0, r.jsxs)('ul', {
                        className: 'list-disc list-inside',
                        children: [
                          (0, r.jsx)('li', {
                            children: (0, r.jsx)('a', {
                              href: 'https://github.com/yourusername',
                              className: 'text-cyan-600 hover:text-cyan-400',
                              children: 'GitHub',
                            }),
                          }),
                          (0, r.jsx)('li', {
                            children: (0, r.jsx)('a', {
                              href: 'https://linkedin.com/in/yourusername',
                              className: 'text-cyan-600 hover:text-cyan-400',
                              children: 'LinkedIn',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }
      },
      57532: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 56349));
      },
      57708: (e, t, s) => {
        'use strict';
        s.r(t),
          s.d(t, {
            GlobalError: () => o.a,
            __next_app__: () => m,
            pages: () => d,
            routeModule: () => x,
            tree: () => c,
          });
        var r = s(65239),
          n = s(48088),
          a = s(88170),
          o = s.n(a),
          i = s(30893),
          l = {};
        for (let e in i)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (l[e] = () => i[e]);
        s.d(t, l);
        let c = {
            children: [
              '',
              {
                children: [
                  '[locale]',
                  {
                    children: [
                      'about',
                      {
                        children: [
                          '__PAGE__',
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(s.bind(s, 70523)),
                              '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/about/page.tsx',
                            ],
                          },
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
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/about/page.tsx',
          ],
          m = { require: s, loadChunk: () => Promise.resolve() },
          x = new r.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: '/[locale]/about/page',
              pathname: '/[locale]/about',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      61135: () => {},
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      70440: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => n });
        var r = s(31658);
        let n = async e => [
          {
            type: 'image/x-icon',
            sizes: '16x16',
            url: (0, r.fillMetadataSegment)('.', await e.params, 'favicon.ico') + '',
          },
        ];
      },
      70523: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => o, dynamic: () => n, dynamicParams: () => a });
        var r = s(12907);
        let n = (0, r.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call dynamic() from the server but dynamic is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
              );
            },
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/about/page.tsx',
            'dynamic'
          ),
          a = (0, r.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call dynamicParams() from the server but dynamicParams is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
              );
            },
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/about/page.tsx',
            'dynamicParams'
          ),
          o = (0, r.registerClientReference)(
            function () {
              throw Error(
                'Attempted to call the default export of "/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/about/page.tsx" from the server, but it\'s on the client. It\'s not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.'
              );
            },
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/about/page.tsx',
            'default'
          );
      },
      71100: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 70523));
      },
      73683: (e, t, s) => {
        'use strict';
        s.d(t, { A: () => o });
        var r = s(35471),
          n = s(14967);
        let a = (0, s(55946).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          o = (0, r.A)(async ({ requestLocale: e }) => {
            let t = await e,
              r = (0, n.EL)(a.locales, t) ? t : a.defaultLocale;
            return { locale: r, messages: (await s(76565)(`./${r}.json`)).default };
          });
      },
      76565: (e, t, s) => {
        var r = { './en.json': [87368, 368], './zh.json': [72961, 961] };
        function n(e) {
          if (!s.o(r, e))
            return Promise.resolve().then(() => {
              var t = Error("Cannot find module '" + e + "'");
              throw ((t.code = 'MODULE_NOT_FOUND'), t);
            });
          var t = r[e],
            n = t[0];
          return s.e(t[1]).then(() => s.t(n, 19));
        }
        (n.keys = () => Object.keys(r)), (n.id = 76565), (e.exports = n);
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
      91546: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 80994));
      },
      94431: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => i, metadata: () => o });
        var r = s(37413);
        s(61135);
        var n = s(7339),
          a = s.n(n);
        let o = {
          title: 'Modern Blog',
          description: 'A trendy blog for web development enthusiasts',
        };
        function i({ children: e }) {
          return (0, r.jsx)('html', {
            lang: 'en',
            children: (0, r.jsx)('body', { className: a().className, children: e }),
          });
        }
      },
      94627: (e, t, s) => {
        'use strict';
        s.r(t), s.d(t, { default: () => d });
        var r = s(37413),
          n = s(57974),
          a = s.n(n),
          o = s(39916),
          i = s(10323),
          l = s(88946);
        let c = ['en', 'zh'];
        function d({ children: e, params: { locale: t } }) {
          let s = (0, i.A)();
          return (
            c.includes(t) || (0, o.notFound)(),
            (0, r.jsx)('html', {
              lang: t,
              children: (0, r.jsx)('body', {
                className: a().className,
                children: (0, r.jsx)(l.A, { locale: t, messages: s, children: e }),
              }),
            })
          );
        }
      },
      98487: () => {},
    });
  var t = require('../../../webpack-runtime.js');
  t.C(e);
  var s = e => t((t.s = e)),
    r = t.X(0, [447, 435, 658, 618, 309, 42], () => s(57708));
  module.exports = r;
})();
