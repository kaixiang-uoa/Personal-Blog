(() => {
  var e = {};
  (e.id = 974),
    (e.ids = [974]),
    (e.modules = {
      163: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'unstable_rethrow', {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let n = r(71042).unstable_rethrow;
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
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
      21204: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => o });
        var n = r(39916);
        function o() {
          (0, n.redirect)('/en');
        }
      },
      26511: () => {},
      29294: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-async-storage.external.js');
      },
      33873: e => {
        'use strict';
        e.exports = require('path');
      },
      39916: (e, t, r) => {
        'use strict';
        var n = r(97576);
        r.o(n, 'notFound') &&
          r.d(t, {
            notFound: function () {
              return n.notFound;
            },
          }),
          r.o(n, 'redirect') &&
            r.d(t, {
              redirect: function () {
                return n.redirect;
              },
            });
      },
      48976: (e, t, r) => {
        'use strict';
        function n() {
          throw Object.defineProperty(
            Error(
              '`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.'
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E488', enumerable: !1, configurable: !0 }
          );
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'forbidden', {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          r(8704).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      61135: () => {},
      62765: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'notFound', {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let n = '' + r(8704).HTTP_ERROR_FALLBACK_ERROR_CODE + ';404';
        function o() {
          let e = Object.defineProperty(Error(n), '__NEXT_ERROR_CODE', {
            value: 'E394',
            enumerable: !1,
            configurable: !0,
          });
          throw ((e.digest = n), e);
        }
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      70440: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => o });
        var n = r(31658);
        let o = async e => [
          {
            type: 'image/x-icon',
            sizes: '16x16',
            url: (0, n.fillMetadataSegment)('.', await e.params, 'favicon.ico') + '',
          },
        ];
      },
      70899: (e, t, r) => {
        'use strict';
        function n() {
          throw Object.defineProperty(
            Error(
              '`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.'
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E411', enumerable: !1, configurable: !0 }
          );
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'unauthorized', {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          r(8704).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      71042: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'unstable_rethrow', {
            enumerable: !0,
            get: function () {
              return function e(t) {
                if (
                  (0, u.isNextRouterError)(t) ||
                  (0, i.isBailoutToCSRError)(t) ||
                  (0, s.isDynamicServerError)(t) ||
                  (0, a.isDynamicPostpone)(t) ||
                  (0, o.isPostpone)(t) ||
                  (0, n.isHangingPromiseRejectionError)(t)
                )
                  throw t;
                t instanceof Error && 'cause' in t && e(t.cause);
              };
            },
          });
        let n = r(68388),
          o = r(52637),
          i = r(51846),
          u = r(31162),
          a = r(84971),
          s = r(98479);
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      77334: (e, t, r) => {
        'use strict';
        r.r(t),
          r.d(t, {
            GlobalError: () => u.a,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => f,
            tree: () => d,
          });
        var n = r(65239),
          o = r(48088),
          i = r(88170),
          u = r.n(i),
          a = r(30893),
          s = {};
        for (let e in a)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (s[e] = () => a[e]);
        r.d(t, s);
        let d = {
            children: [
              '',
              {
                children: [
                  '__PAGE__',
                  {},
                  {
                    page: [
                      () => Promise.resolve().then(r.bind(r, 21204)),
                      '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/page.tsx',
                    ],
                    metadata: {
                      icon: [
                        async e => (await Promise.resolve().then(r.bind(r, 70440))).default(e),
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
                  () => Promise.resolve().then(r.bind(r, 94431)),
                  '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/layout.tsx',
                ],
                'not-found': [
                  () => Promise.resolve().then(r.t.bind(r, 57398, 23)),
                  'next/dist/client/components/not-found-error',
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 89999, 23)),
                  'next/dist/client/components/forbidden-error',
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 65284, 23)),
                  'next/dist/client/components/unauthorized-error',
                ],
                metadata: {
                  icon: [async e => (await Promise.resolve().then(r.bind(r, 70440))).default(e)],
                  apple: [],
                  openGraph: [],
                  twitter: [],
                  manifest: void 0,
                },
              },
            ],
          }.children,
          l = ['/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/page.tsx'],
          c = { require: r, loadChunk: () => Promise.resolve() },
          f = new n.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: '/page',
              pathname: '/',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      77752: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 16444, 23)),
          Promise.resolve().then(r.t.bind(r, 16042, 23)),
          Promise.resolve().then(r.t.bind(r, 88170, 23)),
          Promise.resolve().then(r.t.bind(r, 49477, 23)),
          Promise.resolve().then(r.t.bind(r, 29345, 23)),
          Promise.resolve().then(r.t.bind(r, 12089, 23)),
          Promise.resolve().then(r.t.bind(r, 46577, 23)),
          Promise.resolve().then(r.t.bind(r, 31307, 23));
      },
      78335: () => {},
      78424: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 86346, 23)),
          Promise.resolve().then(r.t.bind(r, 27924, 23)),
          Promise.resolve().then(r.t.bind(r, 35656, 23)),
          Promise.resolve().then(r.t.bind(r, 40099, 23)),
          Promise.resolve().then(r.t.bind(r, 38243, 23)),
          Promise.resolve().then(r.t.bind(r, 28827, 23)),
          Promise.resolve().then(r.t.bind(r, 62763, 23)),
          Promise.resolve().then(r.t.bind(r, 97173, 23));
      },
      79551: e => {
        'use strict';
        e.exports = require('url');
      },
      86897: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            getRedirectError: function () {
              return u;
            },
            getRedirectStatusCodeFromError: function () {
              return c;
            },
            getRedirectTypeFromError: function () {
              return l;
            },
            getURLFromRedirectError: function () {
              return d;
            },
            permanentRedirect: function () {
              return s;
            },
            redirect: function () {
              return a;
            },
          });
        let n = r(52836),
          o = r(49026),
          i = r(19121).actionAsyncStorage;
        function u(e, t, r) {
          void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
          let i = Object.defineProperty(Error(o.REDIRECT_ERROR_CODE), '__NEXT_ERROR_CODE', {
            value: 'E394',
            enumerable: !1,
            configurable: !0,
          });
          return (i.digest = o.REDIRECT_ERROR_CODE + ';' + t + ';' + e + ';' + r + ';'), i;
        }
        function a(e, t) {
          var r;
          throw (
            (null != t ||
              (t = (null == i || null == (r = i.getStore()) ? void 0 : r.isAction)
                ? o.RedirectType.push
                : o.RedirectType.replace),
            u(e, t, n.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function s(e, t) {
          throw (
            (void 0 === t && (t = o.RedirectType.replace),
            u(e, t, n.RedirectStatusCode.PermanentRedirect))
          );
        }
        function d(e) {
          return (0, o.isRedirectError)(e) ? e.digest.split(';').slice(2, -2).join(';') : null;
        }
        function l(e) {
          if (!(0, o.isRedirectError)(e))
            throw Object.defineProperty(Error('Not a redirect error'), '__NEXT_ERROR_CODE', {
              value: 'E260',
              enumerable: !1,
              configurable: !0,
            });
          return e.digest.split(';', 2)[1];
        }
        function c(e) {
          if (!(0, o.isRedirectError)(e))
            throw Object.defineProperty(Error('Not a redirect error'), '__NEXT_ERROR_CODE', {
              value: 'E260',
              enumerable: !1,
              configurable: !0,
            });
          return Number(e.digest.split(';').at(-2));
        }
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      94431: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => a, metadata: () => u });
        var n = r(37413);
        r(61135);
        var o = r(7339),
          i = r.n(o);
        let u = {
          title: 'Modern Blog',
          description: 'A trendy blog for web development enthusiasts',
        };
        function a({ children: e }) {
          return (0, n.jsx)('html', {
            lang: 'en',
            children: (0, n.jsx)('body', { className: i().className, children: e }),
          });
        }
      },
      96487: () => {},
      97576: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return l;
            },
            RedirectType: function () {
              return o.RedirectType;
            },
            forbidden: function () {
              return u.forbidden;
            },
            notFound: function () {
              return i.notFound;
            },
            permanentRedirect: function () {
              return n.permanentRedirect;
            },
            redirect: function () {
              return n.redirect;
            },
            unauthorized: function () {
              return a.unauthorized;
            },
            unstable_rethrow: function () {
              return s.unstable_rethrow;
            },
          });
        let n = r(86897),
          o = r(49026),
          i = r(62765),
          u = r(48976),
          a = r(70899),
          s = r(163);
        class d extends Error {
          constructor() {
            super(
              'Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams'
            );
          }
        }
        class l extends URLSearchParams {
          append() {
            throw new d();
          }
          delete() {
            throw new d();
          }
          set() {
            throw new d();
          }
          sort() {
            throw new d();
          }
        }
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      98487: () => {},
    });
  var t = require('../webpack-runtime.js');
  t.C(e);
  var r = e => t((t.s = e)),
    n = t.X(0, [447, 435, 658], () => r(77334));
  module.exports = n;
})();
