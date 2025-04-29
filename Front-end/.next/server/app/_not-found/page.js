(() => {
  var e = {};
  (e.id = 492),
    (e.ids = [492]),
    (e.modules = {
      3295: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      10846: e => {
        'use strict';
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js');
      },
      13612: (e, r, t) => {
        'use strict';
        t.r(r),
          t.d(r, {
            GlobalError: () => i.a,
            __next_app__: () => p,
            pages: () => u,
            routeModule: () => m,
            tree: () => a,
          });
        var n = t(65239),
          s = t(48088),
          o = t(88170),
          i = t.n(o),
          d = t(30893),
          l = {};
        for (let e in d)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (l[e] = () => d[e]);
        t.d(r, l);
        let a = {
            children: [
              '',
              {
                children: [
                  '/_not-found',
                  {
                    children: [
                      '__PAGE__',
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(t.t.bind(t, 57398, 23)),
                          'next/dist/client/components/not-found-error',
                        ],
                      },
                    ],
                  },
                  {},
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 94431)),
                  '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/layout.tsx',
                ],
                'not-found': [
                  () => Promise.resolve().then(t.t.bind(t, 57398, 23)),
                  'next/dist/client/components/not-found-error',
                ],
                forbidden: [
                  () => Promise.resolve().then(t.t.bind(t, 89999, 23)),
                  'next/dist/client/components/forbidden-error',
                ],
                unauthorized: [
                  () => Promise.resolve().then(t.t.bind(t, 65284, 23)),
                  'next/dist/client/components/unauthorized-error',
                ],
              },
            ],
          }.children,
          u = [],
          p = { require: t, loadChunk: () => Promise.resolve() },
          m = new n.AppPageRouteModule({
            definition: {
              kind: s.RouteKind.APP_PAGE,
              page: '/_not-found/page',
              pathname: '/_not-found',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: a },
          });
      },
      19121: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
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
      61135: () => {},
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      77752: (e, r, t) => {
        Promise.resolve().then(t.t.bind(t, 16444, 23)),
          Promise.resolve().then(t.t.bind(t, 16042, 23)),
          Promise.resolve().then(t.t.bind(t, 88170, 23)),
          Promise.resolve().then(t.t.bind(t, 49477, 23)),
          Promise.resolve().then(t.t.bind(t, 29345, 23)),
          Promise.resolve().then(t.t.bind(t, 12089, 23)),
          Promise.resolve().then(t.t.bind(t, 46577, 23)),
          Promise.resolve().then(t.t.bind(t, 31307, 23));
      },
      78424: (e, r, t) => {
        Promise.resolve().then(t.t.bind(t, 86346, 23)),
          Promise.resolve().then(t.t.bind(t, 27924, 23)),
          Promise.resolve().then(t.t.bind(t, 35656, 23)),
          Promise.resolve().then(t.t.bind(t, 40099, 23)),
          Promise.resolve().then(t.t.bind(t, 38243, 23)),
          Promise.resolve().then(t.t.bind(t, 28827, 23)),
          Promise.resolve().then(t.t.bind(t, 62763, 23)),
          Promise.resolve().then(t.t.bind(t, 97173, 23));
      },
      94431: (e, r, t) => {
        'use strict';
        t.r(r), t.d(r, { default: () => d, metadata: () => i });
        var n = t(37413);
        t(61135);
        var s = t(7339),
          o = t.n(s);
        let i = {
          title: 'Modern Blog',
          description: 'A trendy blog for web development enthusiasts',
        };
        function d({ children: e }) {
          return (0, n.jsx)('html', {
            lang: 'en',
            children: (0, n.jsx)('body', { className: o().className, children: e }),
          });
        }
      },
      98487: () => {},
    });
  var r = require('../../webpack-runtime.js');
  r.C(e);
  var t = e => r((r.s = e)),
    n = r.X(0, [447, 435], () => t(13612));
  module.exports = n;
})();
