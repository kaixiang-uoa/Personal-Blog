(() => {
  var e = {};
  (e.id = 465),
    (e.ids = [465]),
    (e.modules = {
      3295: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      4780: (e, t, r) => {
        'use strict';
        r.d(t, { cn: () => a });
        var n = r(49384),
          o = r(82348);
        function a(...e) {
          return (0, o.QP)((0, n.$)(e));
        }
      },
      6108: (e, t, r) => {
        'use strict';
        r.r(t),
          r.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => u,
            pages: () => d,
            routeModule: () => f,
            tree: () => c,
          });
        var n = r(65239),
          o = r(48088),
          a = r(88170),
          i = r.n(a),
          l = r(30893),
          s = {};
        for (let e in l)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (s[e] = () => l[e]);
        r.d(t, s);
        let c = {
            children: [
              '',
              {
                children: [
                  '[locale]',
                  {
                    children: [
                      '__PAGE__',
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(r.bind(r, 59697)),
                          '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/page.tsx',
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 94627)),
                      '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/layout.tsx',
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
          d = ['/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/page.tsx'],
          u = { require: r, loadChunk: () => Promise.resolve() },
          f = new n.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: '/[locale]/page',
              pathname: '/[locale]',
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
      13520: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => ae });
        var n,
          o,
          a,
          i = r(60687),
          l = r(43210),
          s = r.t(l, 2),
          c = r(16189),
          d = r(77618),
          u = r(25324),
          f = r(28288),
          p = r(30474),
          m = r(85814),
          h = r.n(m);
        function v({ article: e }) {
          return (0, i.jsxs)('div', {
            className:
              'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300',
            children: [
              (0, i.jsx)(p.default, {
                src: e.featuredImage || '/images/default-image.jpg',
                alt: e.title,
                width: 300,
                height: 200,
                className: 'w-full h-48 object-cover',
                unoptimized: !!e.featuredImage && e.featuredImage.startsWith('http'),
              }),
              (0, i.jsxs)('div', {
                className: 'p-4',
                children: [
                  (0, i.jsx)('h3', {
                    className: 'text-lg font-bold text-gray-900',
                    children: e.title,
                  }),
                  (0, i.jsx)(h(), {
                    href: `/article/${e.slug}`,
                    className: 'mt-4 inline-block text-cyan-600 hover:text-cyan-800 font-medium',
                    children: '阅读更多 →',
                  }),
                ],
              }),
            ],
          });
        }
        let g = e => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
          x = e =>
            e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) =>
              r ? r.toUpperCase() : t.toLowerCase()
            ),
          y = e => {
            let t = x(e);
            return t.charAt(0).toUpperCase() + t.slice(1);
          },
          w = (...e) =>
            e
              .filter((e, t, r) => !!e && '' !== e.trim() && r.indexOf(e) === t)
              .join(' ')
              .trim(),
          b = e => {
            for (let t in e) if (t.startsWith('aria-') || 'role' === t || 'title' === t) return !0;
          };
        var j = {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 24,
          height: 24,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        };
        let N = (0, l.forwardRef)(
            (
              {
                color: e = 'currentColor',
                size: t = 24,
                strokeWidth: r = 2,
                absoluteStrokeWidth: n,
                className: o = '',
                children: a,
                iconNode: i,
                ...s
              },
              c
            ) =>
              (0, l.createElement)(
                'svg',
                {
                  ref: c,
                  ...j,
                  width: t,
                  height: t,
                  stroke: e,
                  strokeWidth: n ? (24 * Number(r)) / Number(t) : r,
                  className: w('lucide', o),
                  ...(!a && !b(s) && { 'aria-hidden': 'true' }),
                  ...s,
                },
                [...i.map(([e, t]) => (0, l.createElement)(e, t)), ...(Array.isArray(a) ? a : [a])]
              )
          ),
          C = (e, t) => {
            let r = (0, l.forwardRef)(({ className: r, ...n }, o) =>
              (0, l.createElement)(N, {
                ref: o,
                iconNode: t,
                className: w(`lucide-${g(y(e))}`, `lucide-${e}`, r),
                ...n,
              })
            );
            return (r.displayName = y(e)), r;
          },
          E = C('tag', [
            [
              'path',
              {
                d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
                key: 'vktsd0',
              },
            ],
            ['circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' }],
          ]);
        var S = r(24224),
          R = r(4780);
        let k = (0, S.F)(
          'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          {
            variants: {
              variant: {
                default:
                  'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary:
                  'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                  'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
              },
            },
            defaultVariants: { variant: 'default' },
          }
        );
        function P({ className: e, variant: t, ...r }) {
          return (0, i.jsx)('div', { className: (0, R.cn)(k({ variant: t }), e), ...r });
        }
        var A = r(14163),
          T = r(98599),
          L = globalThis?.document ? l.useLayoutEffect : () => {},
          D = e => {
            let { present: t, children: r } = e,
              n = (function (e) {
                var t, r;
                let [n, o] = l.useState(),
                  a = l.useRef(null),
                  i = l.useRef(e),
                  s = l.useRef('none'),
                  [c, d] =
                    ((t = e ? 'mounted' : 'unmounted'),
                    (r = {
                      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
                      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
                      unmounted: { MOUNT: 'mounted' },
                    }),
                    l.useReducer((e, t) => r[e][t] ?? e, t));
                return (
                  l.useEffect(() => {
                    let e = M(a.current);
                    s.current = 'mounted' === c ? e : 'none';
                  }, [c]),
                  L(() => {
                    let t = a.current,
                      r = i.current;
                    if (r !== e) {
                      let n = s.current,
                        o = M(t);
                      e
                        ? d('MOUNT')
                        : 'none' === o || t?.display === 'none'
                          ? d('UNMOUNT')
                          : r && n !== o
                            ? d('ANIMATION_OUT')
                            : d('UNMOUNT'),
                        (i.current = e);
                    }
                  }, [e, d]),
                  L(() => {
                    if (n) {
                      let e,
                        t = n.ownerDocument.defaultView ?? window,
                        r = r => {
                          let o = M(a.current).includes(r.animationName);
                          if (r.target === n && o && (d('ANIMATION_END'), !i.current)) {
                            let r = n.style.animationFillMode;
                            (n.style.animationFillMode = 'forwards'),
                              (e = t.setTimeout(() => {
                                'forwards' === n.style.animationFillMode &&
                                  (n.style.animationFillMode = r);
                              }));
                          }
                        },
                        o = e => {
                          e.target === n && (s.current = M(a.current));
                        };
                      return (
                        n.addEventListener('animationstart', o),
                        n.addEventListener('animationcancel', r),
                        n.addEventListener('animationend', r),
                        () => {
                          t.clearTimeout(e),
                            n.removeEventListener('animationstart', o),
                            n.removeEventListener('animationcancel', r),
                            n.removeEventListener('animationend', r);
                        }
                      );
                    }
                    d('ANIMATION_END');
                  }, [n, d]),
                  {
                    isPresent: ['mounted', 'unmountSuspended'].includes(c),
                    ref: l.useCallback(e => {
                      (a.current = e ? getComputedStyle(e) : null), o(e);
                    }, []),
                  }
                );
              })(t),
              o = 'function' == typeof r ? r({ present: n.isPresent }) : l.Children.only(r),
              a = (0, T.s)(
                n.ref,
                (function (e) {
                  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
                    r = t && 'isReactWarning' in t && t.isReactWarning;
                  return r
                    ? e.ref
                    : (r =
                          (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) &&
                          'isReactWarning' in t &&
                          t.isReactWarning)
                      ? e.props.ref
                      : e.props.ref || e.ref;
                })(o)
              );
            return 'function' == typeof r || n.isPresent ? l.cloneElement(o, { ref: a }) : null;
          };
        function M(e) {
          return e?.animationName || 'none';
        }
        function _(e, t = []) {
          let r = [],
            n = () => {
              let t = r.map(e => l.createContext(e));
              return function (r) {
                let n = r?.[e] || t;
                return l.useMemo(() => ({ [`__scope${e}`]: { ...r, [e]: n } }), [r, n]);
              };
            };
          return (
            (n.scopeName = e),
            [
              function (t, n) {
                let o = l.createContext(n),
                  a = r.length;
                r = [...r, n];
                let s = t => {
                  let { scope: r, children: n, ...s } = t,
                    c = r?.[e]?.[a] || o,
                    d = l.useMemo(() => s, Object.values(s));
                  return (0, i.jsx)(c.Provider, { value: d, children: n });
                };
                return (
                  (s.displayName = t + 'Provider'),
                  [
                    s,
                    function (r, i) {
                      let s = i?.[e]?.[a] || o,
                        c = l.useContext(s);
                      if (c) return c;
                      if (void 0 !== n) return n;
                      throw Error(`\`${r}\` must be used within \`${t}\``);
                    },
                  ]
                );
              },
              (function (...e) {
                let t = e[0];
                if (1 === e.length) return t;
                let r = () => {
                  let r = e.map(e => ({ useScope: e(), scopeName: e.scopeName }));
                  return function (e) {
                    let n = r.reduce((t, { useScope: r, scopeName: n }) => {
                      let o = r(e)[`__scope${n}`];
                      return { ...t, ...o };
                    }, {});
                    return l.useMemo(() => ({ [`__scope${t.scopeName}`]: n }), [n]);
                  };
                };
                return (r.scopeName = t.scopeName), r;
              })(n, ...t),
            ]
          );
        }
        function I(e) {
          let t = l.useRef(e);
          return (
            l.useEffect(() => {
              t.current = e;
            }),
            l.useMemo(
              () =>
                (...e) =>
                  t.current?.(...e),
              []
            )
          );
        }
        D.displayName = 'Presence';
        var O = l.createContext(void 0);
        function F(e) {
          let t = l.useContext(O);
          return e || t || 'ltr';
        }
        function W(e, [t, r]) {
          return Math.min(r, Math.max(t, e));
        }
        function z(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
          return function (n) {
            if ((e?.(n), !1 === r || !n.defaultPrevented)) return t?.(n);
          };
        }
        var $ = 'ScrollArea',
          [H, B] = _($),
          [U, G] = H($),
          V = l.forwardRef((e, t) => {
            let {
                __scopeScrollArea: r,
                type: n = 'hover',
                dir: o,
                scrollHideDelay: a = 600,
                ...s
              } = e,
              [c, d] = l.useState(null),
              [u, f] = l.useState(null),
              [p, m] = l.useState(null),
              [h, v] = l.useState(null),
              [g, x] = l.useState(null),
              [y, w] = l.useState(0),
              [b, j] = l.useState(0),
              [N, C] = l.useState(!1),
              [E, S] = l.useState(!1),
              R = (0, T.s)(t, e => d(e)),
              k = F(o);
            return (0, i.jsx)(U, {
              scope: r,
              type: n,
              dir: k,
              scrollHideDelay: a,
              scrollArea: c,
              viewport: u,
              onViewportChange: f,
              content: p,
              onContentChange: m,
              scrollbarX: h,
              onScrollbarXChange: v,
              scrollbarXEnabled: N,
              onScrollbarXEnabledChange: C,
              scrollbarY: g,
              onScrollbarYChange: x,
              scrollbarYEnabled: E,
              onScrollbarYEnabledChange: S,
              onCornerWidthChange: w,
              onCornerHeightChange: j,
              children: (0, i.jsx)(A.sG.div, {
                dir: k,
                ...s,
                ref: R,
                style: {
                  position: 'relative',
                  '--radix-scroll-area-corner-width': y + 'px',
                  '--radix-scroll-area-corner-height': b + 'px',
                  ...e.style,
                },
              }),
            });
          });
        V.displayName = $;
        var q = 'ScrollAreaViewport',
          X = l.forwardRef((e, t) => {
            let { __scopeScrollArea: r, children: n, nonce: o, ...a } = e,
              s = G(q, r),
              c = l.useRef(null),
              d = (0, T.s)(t, c, s.onViewportChange);
            return (0, i.jsxs)(i.Fragment, {
              children: [
                (0, i.jsx)('style', {
                  dangerouslySetInnerHTML: {
                    __html:
                      '[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}',
                  },
                  nonce: o,
                }),
                (0, i.jsx)(A.sG.div, {
                  'data-radix-scroll-area-viewport': '',
                  ...a,
                  ref: d,
                  style: {
                    overflowX: s.scrollbarXEnabled ? 'scroll' : 'hidden',
                    overflowY: s.scrollbarYEnabled ? 'scroll' : 'hidden',
                    ...e.style,
                  },
                  children: (0, i.jsx)('div', {
                    ref: s.onContentChange,
                    style: { minWidth: '100%', display: 'table' },
                    children: n,
                  }),
                }),
              ],
            });
          });
        X.displayName = q;
        var K = 'ScrollAreaScrollbar',
          Y = l.forwardRef((e, t) => {
            let { forceMount: r, ...n } = e,
              o = G(K, e.__scopeScrollArea),
              { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o,
              c = 'horizontal' === e.orientation;
            return (
              l.useEffect(
                () => (
                  c ? a(!0) : s(!0),
                  () => {
                    c ? a(!1) : s(!1);
                  }
                ),
                [c, a, s]
              ),
              'hover' === o.type
                ? (0, i.jsx)(Z, { ...n, ref: t, forceMount: r })
                : 'scroll' === o.type
                  ? (0, i.jsx)(J, { ...n, ref: t, forceMount: r })
                  : 'auto' === o.type
                    ? (0, i.jsx)(Q, { ...n, ref: t, forceMount: r })
                    : 'always' === o.type
                      ? (0, i.jsx)(ee, { ...n, ref: t })
                      : null
            );
          });
        Y.displayName = K;
        var Z = l.forwardRef((e, t) => {
            let { forceMount: r, ...n } = e,
              o = G(K, e.__scopeScrollArea),
              [a, s] = l.useState(!1);
            return (
              l.useEffect(() => {
                let e = o.scrollArea,
                  t = 0;
                if (e) {
                  let r = () => {
                      window.clearTimeout(t), s(!0);
                    },
                    n = () => {
                      t = window.setTimeout(() => s(!1), o.scrollHideDelay);
                    };
                  return (
                    e.addEventListener('pointerenter', r),
                    e.addEventListener('pointerleave', n),
                    () => {
                      window.clearTimeout(t),
                        e.removeEventListener('pointerenter', r),
                        e.removeEventListener('pointerleave', n);
                    }
                  );
                }
              }, [o.scrollArea, o.scrollHideDelay]),
              (0, i.jsx)(D, {
                present: r || a,
                children: (0, i.jsx)(Q, { 'data-state': a ? 'visible' : 'hidden', ...n, ref: t }),
              })
            );
          }),
          J = l.forwardRef((e, t) => {
            var r, n;
            let { forceMount: o, ...a } = e,
              s = G(K, e.__scopeScrollArea),
              c = 'horizontal' === e.orientation,
              d = ex(() => f('SCROLL_END'), 100),
              [u, f] =
                ((r = 'hidden'),
                (n = {
                  hidden: { SCROLL: 'scrolling' },
                  scrolling: { SCROLL_END: 'idle', POINTER_ENTER: 'interacting' },
                  interacting: { SCROLL: 'interacting', POINTER_LEAVE: 'idle' },
                  idle: { HIDE: 'hidden', SCROLL: 'scrolling', POINTER_ENTER: 'interacting' },
                }),
                l.useReducer((e, t) => n[e][t] ?? e, r));
            return (
              l.useEffect(() => {
                if ('idle' === u) {
                  let e = window.setTimeout(() => f('HIDE'), s.scrollHideDelay);
                  return () => window.clearTimeout(e);
                }
              }, [u, s.scrollHideDelay, f]),
              l.useEffect(() => {
                let e = s.viewport,
                  t = c ? 'scrollLeft' : 'scrollTop';
                if (e) {
                  let r = e[t],
                    n = () => {
                      let n = e[t];
                      r !== n && (f('SCROLL'), d()), (r = n);
                    };
                  return e.addEventListener('scroll', n), () => e.removeEventListener('scroll', n);
                }
              }, [s.viewport, c, f, d]),
              (0, i.jsx)(D, {
                present: o || 'hidden' !== u,
                children: (0, i.jsx)(ee, {
                  'data-state': 'hidden' === u ? 'hidden' : 'visible',
                  ...a,
                  ref: t,
                  onPointerEnter: z(e.onPointerEnter, () => f('POINTER_ENTER')),
                  onPointerLeave: z(e.onPointerLeave, () => f('POINTER_LEAVE')),
                }),
              })
            );
          }),
          Q = l.forwardRef((e, t) => {
            let r = G(K, e.__scopeScrollArea),
              { forceMount: n, ...o } = e,
              [a, s] = l.useState(!1),
              c = 'horizontal' === e.orientation,
              d = ex(() => {
                if (r.viewport) {
                  let e = r.viewport.offsetWidth < r.viewport.scrollWidth,
                    t = r.viewport.offsetHeight < r.viewport.scrollHeight;
                  s(c ? e : t);
                }
              }, 10);
            return (
              ey(r.viewport, d),
              ey(r.content, d),
              (0, i.jsx)(D, {
                present: n || a,
                children: (0, i.jsx)(ee, { 'data-state': a ? 'visible' : 'hidden', ...o, ref: t }),
              })
            );
          }),
          ee = l.forwardRef((e, t) => {
            let { orientation: r = 'vertical', ...n } = e,
              o = G(K, e.__scopeScrollArea),
              a = l.useRef(null),
              s = l.useRef(0),
              [c, d] = l.useState({
                content: 0,
                viewport: 0,
                scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
              }),
              u = ep(c.viewport, c.content),
              f = {
                ...n,
                sizes: c,
                onSizesChange: d,
                hasThumb: !!(u > 0 && u < 1),
                onThumbChange: e => (a.current = e),
                onThumbPointerUp: () => (s.current = 0),
                onThumbPointerDown: e => (s.current = e),
              };
            function p(e, t) {
              return (function (e, t, r, n = 'ltr') {
                let o = em(r),
                  a = t || o / 2,
                  i = r.scrollbar.paddingStart + a,
                  l = r.scrollbar.size - r.scrollbar.paddingEnd - (o - a),
                  s = r.content - r.viewport;
                return ev([i, l], 'ltr' === n ? [0, s] : [-1 * s, 0])(e);
              })(e, s.current, c, t);
            }
            return 'horizontal' === r
              ? (0, i.jsx)(et, {
                  ...f,
                  ref: t,
                  onThumbPositionChange: () => {
                    if (o.viewport && a.current) {
                      let e = eh(o.viewport.scrollLeft, c, o.dir);
                      a.current.style.transform = `translate3d(${e}px, 0, 0)`;
                    }
                  },
                  onWheelScroll: e => {
                    o.viewport && (o.viewport.scrollLeft = e);
                  },
                  onDragScroll: e => {
                    o.viewport && (o.viewport.scrollLeft = p(e, o.dir));
                  },
                })
              : 'vertical' === r
                ? (0, i.jsx)(er, {
                    ...f,
                    ref: t,
                    onThumbPositionChange: () => {
                      if (o.viewport && a.current) {
                        let e = eh(o.viewport.scrollTop, c);
                        a.current.style.transform = `translate3d(0, ${e}px, 0)`;
                      }
                    },
                    onWheelScroll: e => {
                      o.viewport && (o.viewport.scrollTop = e);
                    },
                    onDragScroll: e => {
                      o.viewport && (o.viewport.scrollTop = p(e));
                    },
                  })
                : null;
          }),
          et = l.forwardRef((e, t) => {
            let { sizes: r, onSizesChange: n, ...o } = e,
              a = G(K, e.__scopeScrollArea),
              [s, c] = l.useState(),
              d = l.useRef(null),
              u = (0, T.s)(t, d, a.onScrollbarXChange);
            return (
              l.useEffect(() => {
                d.current && c(getComputedStyle(d.current));
              }, [d]),
              (0, i.jsx)(ea, {
                'data-orientation': 'horizontal',
                ...o,
                ref: u,
                sizes: r,
                style: {
                  bottom: 0,
                  left: 'rtl' === a.dir ? 'var(--radix-scroll-area-corner-width)' : 0,
                  right: 'ltr' === a.dir ? 'var(--radix-scroll-area-corner-width)' : 0,
                  '--radix-scroll-area-thumb-width': em(r) + 'px',
                  ...e.style,
                },
                onThumbPointerDown: t => e.onThumbPointerDown(t.x),
                onDragScroll: t => e.onDragScroll(t.x),
                onWheelScroll: (t, r) => {
                  if (a.viewport) {
                    let n = a.viewport.scrollLeft + t.deltaX;
                    e.onWheelScroll(n),
                      (function (e, t) {
                        return e > 0 && e < t;
                      })(n, r) && t.preventDefault();
                  }
                },
                onResize: () => {
                  d.current &&
                    a.viewport &&
                    s &&
                    n({
                      content: a.viewport.scrollWidth,
                      viewport: a.viewport.offsetWidth,
                      scrollbar: {
                        size: d.current.clientWidth,
                        paddingStart: ef(s.paddingLeft),
                        paddingEnd: ef(s.paddingRight),
                      },
                    });
                },
              })
            );
          }),
          er = l.forwardRef((e, t) => {
            let { sizes: r, onSizesChange: n, ...o } = e,
              a = G(K, e.__scopeScrollArea),
              [s, c] = l.useState(),
              d = l.useRef(null),
              u = (0, T.s)(t, d, a.onScrollbarYChange);
            return (
              l.useEffect(() => {
                d.current && c(getComputedStyle(d.current));
              }, [d]),
              (0, i.jsx)(ea, {
                'data-orientation': 'vertical',
                ...o,
                ref: u,
                sizes: r,
                style: {
                  top: 0,
                  right: 'ltr' === a.dir ? 0 : void 0,
                  left: 'rtl' === a.dir ? 0 : void 0,
                  bottom: 'var(--radix-scroll-area-corner-height)',
                  '--radix-scroll-area-thumb-height': em(r) + 'px',
                  ...e.style,
                },
                onThumbPointerDown: t => e.onThumbPointerDown(t.y),
                onDragScroll: t => e.onDragScroll(t.y),
                onWheelScroll: (t, r) => {
                  if (a.viewport) {
                    let n = a.viewport.scrollTop + t.deltaY;
                    e.onWheelScroll(n),
                      (function (e, t) {
                        return e > 0 && e < t;
                      })(n, r) && t.preventDefault();
                  }
                },
                onResize: () => {
                  d.current &&
                    a.viewport &&
                    s &&
                    n({
                      content: a.viewport.scrollHeight,
                      viewport: a.viewport.offsetHeight,
                      scrollbar: {
                        size: d.current.clientHeight,
                        paddingStart: ef(s.paddingTop),
                        paddingEnd: ef(s.paddingBottom),
                      },
                    });
                },
              })
            );
          }),
          [en, eo] = H(K),
          ea = l.forwardRef((e, t) => {
            let {
                __scopeScrollArea: r,
                sizes: n,
                hasThumb: o,
                onThumbChange: a,
                onThumbPointerUp: s,
                onThumbPointerDown: c,
                onThumbPositionChange: d,
                onDragScroll: u,
                onWheelScroll: f,
                onResize: p,
                ...m
              } = e,
              h = G(K, r),
              [v, g] = l.useState(null),
              x = (0, T.s)(t, e => g(e)),
              y = l.useRef(null),
              w = l.useRef(''),
              b = h.viewport,
              j = n.content - n.viewport,
              N = I(f),
              C = I(d),
              E = ex(p, 10);
            function S(e) {
              y.current && u({ x: e.clientX - y.current.left, y: e.clientY - y.current.top });
            }
            return (
              l.useEffect(() => {
                let e = e => {
                  let t = e.target;
                  v?.contains(t) && N(e, j);
                };
                return (
                  document.addEventListener('wheel', e, { passive: !1 }),
                  () => document.removeEventListener('wheel', e, { passive: !1 })
                );
              }, [b, v, j, N]),
              l.useEffect(C, [n, C]),
              ey(v, E),
              ey(h.content, E),
              (0, i.jsx)(en, {
                scope: r,
                scrollbar: v,
                hasThumb: o,
                onThumbChange: I(a),
                onThumbPointerUp: I(s),
                onThumbPositionChange: C,
                onThumbPointerDown: I(c),
                children: (0, i.jsx)(A.sG.div, {
                  ...m,
                  ref: x,
                  style: { position: 'absolute', ...m.style },
                  onPointerDown: z(e.onPointerDown, e => {
                    0 === e.button &&
                      (e.target.setPointerCapture(e.pointerId),
                      (y.current = v.getBoundingClientRect()),
                      (w.current = document.body.style.webkitUserSelect),
                      (document.body.style.webkitUserSelect = 'none'),
                      h.viewport && (h.viewport.style.scrollBehavior = 'auto'),
                      S(e));
                  }),
                  onPointerMove: z(e.onPointerMove, S),
                  onPointerUp: z(e.onPointerUp, e => {
                    let t = e.target;
                    t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
                      (document.body.style.webkitUserSelect = w.current),
                      h.viewport && (h.viewport.style.scrollBehavior = ''),
                      (y.current = null);
                  }),
                }),
              })
            );
          }),
          ei = 'ScrollAreaThumb',
          el = l.forwardRef((e, t) => {
            let { forceMount: r, ...n } = e,
              o = eo(ei, e.__scopeScrollArea);
            return (0, i.jsx)(D, {
              present: r || o.hasThumb,
              children: (0, i.jsx)(es, { ref: t, ...n }),
            });
          }),
          es = l.forwardRef((e, t) => {
            let { __scopeScrollArea: r, style: n, ...o } = e,
              a = G(ei, r),
              s = eo(ei, r),
              { onThumbPositionChange: c } = s,
              d = (0, T.s)(t, e => s.onThumbChange(e)),
              u = l.useRef(void 0),
              f = ex(() => {
                u.current && (u.current(), (u.current = void 0));
              }, 100);
            return (
              l.useEffect(() => {
                let e = a.viewport;
                if (e) {
                  let t = () => {
                    f(), u.current || ((u.current = eg(e, c)), c());
                  };
                  return (
                    c(), e.addEventListener('scroll', t), () => e.removeEventListener('scroll', t)
                  );
                }
              }, [a.viewport, f, c]),
              (0, i.jsx)(A.sG.div, {
                'data-state': s.hasThumb ? 'visible' : 'hidden',
                ...o,
                ref: d,
                style: {
                  width: 'var(--radix-scroll-area-thumb-width)',
                  height: 'var(--radix-scroll-area-thumb-height)',
                  ...n,
                },
                onPointerDownCapture: z(e.onPointerDownCapture, e => {
                  let t = e.target.getBoundingClientRect(),
                    r = e.clientX - t.left,
                    n = e.clientY - t.top;
                  s.onThumbPointerDown({ x: r, y: n });
                }),
                onPointerUp: z(e.onPointerUp, s.onThumbPointerUp),
              })
            );
          });
        el.displayName = ei;
        var ec = 'ScrollAreaCorner',
          ed = l.forwardRef((e, t) => {
            let r = G(ec, e.__scopeScrollArea),
              n = !!(r.scrollbarX && r.scrollbarY);
            return 'scroll' !== r.type && n ? (0, i.jsx)(eu, { ...e, ref: t }) : null;
          });
        ed.displayName = ec;
        var eu = l.forwardRef((e, t) => {
          let { __scopeScrollArea: r, ...n } = e,
            o = G(ec, r),
            [a, s] = l.useState(0),
            [c, d] = l.useState(0),
            u = !!(a && c);
          return (
            ey(o.scrollbarX, () => {
              let e = o.scrollbarX?.offsetHeight || 0;
              o.onCornerHeightChange(e), d(e);
            }),
            ey(o.scrollbarY, () => {
              let e = o.scrollbarY?.offsetWidth || 0;
              o.onCornerWidthChange(e), s(e);
            }),
            u
              ? (0, i.jsx)(A.sG.div, {
                  ...n,
                  ref: t,
                  style: {
                    width: a,
                    height: c,
                    position: 'absolute',
                    right: 'ltr' === o.dir ? 0 : void 0,
                    left: 'rtl' === o.dir ? 0 : void 0,
                    bottom: 0,
                    ...e.style,
                  },
                })
              : null
          );
        });
        function ef(e) {
          return e ? parseInt(e, 10) : 0;
        }
        function ep(e, t) {
          let r = e / t;
          return isNaN(r) ? 0 : r;
        }
        function em(e) {
          let t = ep(e.viewport, e.content),
            r = e.scrollbar.paddingStart + e.scrollbar.paddingEnd;
          return Math.max((e.scrollbar.size - r) * t, 18);
        }
        function eh(e, t, r = 'ltr') {
          let n = em(t),
            o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
            a = t.scrollbar.size - o,
            i = t.content - t.viewport,
            l = W(e, 'ltr' === r ? [0, i] : [-1 * i, 0]);
          return ev([0, i], [0, a - n])(l);
        }
        function ev(e, t) {
          return r => {
            if (e[0] === e[1] || t[0] === t[1]) return t[0];
            let n = (t[1] - t[0]) / (e[1] - e[0]);
            return t[0] + n * (r - e[0]);
          };
        }
        var eg = (e, t = () => {}) => {
          let r = { left: e.scrollLeft, top: e.scrollTop },
            n = 0;
          return (
            !(function o() {
              let a = { left: e.scrollLeft, top: e.scrollTop },
                i = r.left !== a.left,
                l = r.top !== a.top;
              (i || l) && t(), (r = a), (n = window.requestAnimationFrame(o));
            })(),
            () => window.cancelAnimationFrame(n)
          );
        };
        function ex(e, t) {
          let r = I(e),
            n = l.useRef(0);
          return (
            l.useEffect(() => () => window.clearTimeout(n.current), []),
            l.useCallback(() => {
              window.clearTimeout(n.current), (n.current = window.setTimeout(r, t));
            }, [r, t])
          );
        }
        function ey(e, t) {
          let r = I(t);
          L(() => {
            let t = 0;
            if (e) {
              let n = new ResizeObserver(() => {
                cancelAnimationFrame(t), (t = window.requestAnimationFrame(r));
              });
              return (
                n.observe(e),
                () => {
                  window.cancelAnimationFrame(t), n.unobserve(e);
                }
              );
            }
          }, [e, r]);
        }
        let ew = l.forwardRef(({ className: e, children: t, ...r }, n) =>
          (0, i.jsxs)(V, {
            ref: n,
            className: (0, R.cn)('relative overflow-hidden', e),
            ...r,
            children: [
              (0, i.jsx)(X, { className: 'h-full w-full rounded-[inherit]', children: t }),
              (0, i.jsx)(eb, {}),
              (0, i.jsx)(ed, {}),
            ],
          })
        );
        ew.displayName = V.displayName;
        let eb = l.forwardRef(({ className: e, orientation: t = 'vertical', ...r }, n) =>
          (0, i.jsx)(Y, {
            ref: n,
            orientation: t,
            className: (0, R.cn)(
              'flex touch-none select-none transition-colors',
              'vertical' === t && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
              'horizontal' === t && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
              e
            ),
            ...r,
            children: (0, i.jsx)(el, { className: 'relative flex-1 rounded-full bg-border' }),
          })
        );
        function ej({ tags: e, activeTags: t, onTagsChange: r }) {
          let [n, o] = (0, l.useState)(t || []),
            a = e => {
              let t;
              o((t = n.includes(e) ? n.filter(t => t !== e) : [...n, e])), r(t);
            };
          return (0, i.jsxs)('div', {
            className: 'py-4',
            children: [
              (0, i.jsxs)('div', {
                className: 'flex items-center mb-3',
                children: [
                  (0, i.jsx)(E, { className: 'h-5 w-5 mr-2 text-cyan-500' }),
                  (0, i.jsx)('h3', { className: 'text-lg font-medium', children: '热门标签' }),
                ],
              }),
              (0, i.jsxs)(ew, {
                className: 'w-full whitespace-nowrap',
                children: [
                  (0, i.jsx)('div', {
                    className: 'flex flex-wrap gap-2',
                    children: e.map(e =>
                      (0, i.jsx)(
                        P,
                        {
                          variant: n.includes(e.slug) ? 'default' : 'secondary',
                          className: `
                cursor-pointer transition-all hover:scale-105
                ${n.includes(e.slug) ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}
              `,
                          onClick: () => a(e.slug),
                          children: e.name,
                        },
                        e._id
                      )
                    ),
                  }),
                  (0, i.jsx)(eb, { orientation: 'horizontal' }),
                ],
              }),
            ],
          });
        }
        eb.displayName = Y.displayName;
        let eN = C('x', [
          ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
          ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
        ]);
        var eC = r(8730);
        function eE(e) {
          let t = e + 'CollectionProvider',
            [r, n] = _(t),
            [o, a] = r(t, { collectionRef: { current: null }, itemMap: new Map() }),
            s = e => {
              let { scope: t, children: r } = e,
                n = l.useRef(null),
                a = l.useRef(new Map()).current;
              return (0, i.jsx)(o, { scope: t, itemMap: a, collectionRef: n, children: r });
            };
          s.displayName = t;
          let c = e + 'CollectionSlot',
            d = (0, eC.TL)(c),
            u = l.forwardRef((e, t) => {
              let { scope: r, children: n } = e,
                o = a(c, r),
                l = (0, T.s)(t, o.collectionRef);
              return (0, i.jsx)(d, { ref: l, children: n });
            });
          u.displayName = c;
          let f = e + 'CollectionItemSlot',
            p = 'data-radix-collection-item',
            m = (0, eC.TL)(f),
            h = l.forwardRef((e, t) => {
              let { scope: r, children: n, ...o } = e,
                s = l.useRef(null),
                c = (0, T.s)(t, s),
                d = a(f, r);
              return (
                l.useEffect(
                  () => (d.itemMap.set(s, { ref: s, ...o }), () => void d.itemMap.delete(s))
                ),
                (0, i.jsx)(m, { ...{ [p]: '' }, ref: c, children: n })
              );
            });
          return (
            (h.displayName = f),
            [
              { Provider: s, Slot: u, ItemSlot: h },
              function (t) {
                let r = a(e + 'CollectionConsumer', t);
                return l.useCallback(() => {
                  let e = r.collectionRef.current;
                  if (!e) return [];
                  let t = Array.from(e.querySelectorAll(`[${p}]`));
                  return Array.from(r.itemMap.values()).sort(
                    (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current)
                  );
                }, [r.collectionRef, r.itemMap]);
              },
              n,
            ]
          );
        }
        var eS = new WeakMap();
        function eR(e, t) {
          if ('at' in Array.prototype) return Array.prototype.at.call(e, t);
          let r = (function (e, t) {
            let r = e.length,
              n = ek(t),
              o = n >= 0 ? n : r + n;
            return o < 0 || o >= r ? -1 : o;
          })(e, t);
          return -1 === r ? void 0 : e[r];
        }
        function ek(e) {
          return e != e || 0 === e ? 0 : Math.trunc(e);
        }
        var eP = s[' useInsertionEffect '.trim().toString()] || L;
        function eA({ prop: e, defaultProp: t, onChange: r = () => {}, caller: n }) {
          let [o, a, i] = (function ({ defaultProp: e, onChange: t }) {
              let [r, n] = l.useState(e),
                o = l.useRef(r),
                a = l.useRef(t);
              return (
                eP(() => {
                  a.current = t;
                }, [t]),
                l.useEffect(() => {
                  o.current !== r && (a.current?.(r), (o.current = r));
                }, [r, o]),
                [r, n, a]
              );
            })({ defaultProp: t, onChange: r }),
            s = void 0 !== e,
            c = s ? e : o;
          {
            let t = l.useRef(void 0 !== e);
            l.useEffect(() => {
              let e = t.current;
              if (e !== s) {
                let t = s ? 'controlled' : 'uncontrolled';
                console.warn(
                  `${n} is changing from ${e ? 'controlled' : 'uncontrolled'} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
                );
              }
              t.current = s;
            }, [s, n]);
          }
          return [
            c,
            l.useCallback(
              t => {
                if (s) {
                  let r = 'function' == typeof t ? t(e) : t;
                  r !== e && i.current?.(r);
                } else a(t);
              },
              [s, e, a, i]
            ),
          ];
        }
        Symbol('RADIX:SYNC_STATE');
        var eT = s[' useId '.trim().toString()] || (() => void 0),
          eL = 0;
        function eD(e) {
          let [t, r] = l.useState(eT());
          return (
            L(() => {
              e || r(e => e ?? String(eL++));
            }, [e]),
            e || (t ? `radix-${t}` : '')
          );
        }
        var eM = 'Collapsible',
          [e_, eI] = _(eM),
          [eO, eF] = e_(eM),
          eW = l.forwardRef((e, t) => {
            let {
                __scopeCollapsible: r,
                open: n,
                defaultOpen: o,
                disabled: a,
                onOpenChange: s,
                ...c
              } = e,
              [d, u] = eA({ prop: n, defaultProp: o ?? !1, onChange: s, caller: eM });
            return (0, i.jsx)(eO, {
              scope: r,
              disabled: a,
              contentId: eD(),
              open: d,
              onOpenToggle: l.useCallback(() => u(e => !e), [u]),
              children: (0, i.jsx)(A.sG.div, {
                'data-state': eG(d),
                'data-disabled': a ? '' : void 0,
                ...c,
                ref: t,
              }),
            });
          });
        eW.displayName = eM;
        var ez = 'CollapsibleTrigger',
          e$ = l.forwardRef((e, t) => {
            let { __scopeCollapsible: r, ...n } = e,
              o = eF(ez, r);
            return (0, i.jsx)(A.sG.button, {
              type: 'button',
              'aria-controls': o.contentId,
              'aria-expanded': o.open || !1,
              'data-state': eG(o.open),
              'data-disabled': o.disabled ? '' : void 0,
              disabled: o.disabled,
              ...n,
              ref: t,
              onClick: z(e.onClick, o.onOpenToggle),
            });
          });
        e$.displayName = ez;
        var eH = 'CollapsibleContent',
          eB = l.forwardRef((e, t) => {
            let { forceMount: r, ...n } = e,
              o = eF(eH, e.__scopeCollapsible);
            return (0, i.jsx)(D, {
              present: r || o.open,
              children: ({ present: e }) => (0, i.jsx)(eU, { ...n, ref: t, present: e }),
            });
          });
        eB.displayName = eH;
        var eU = l.forwardRef((e, t) => {
          let { __scopeCollapsible: r, present: n, children: o, ...a } = e,
            s = eF(eH, r),
            [c, d] = l.useState(n),
            u = l.useRef(null),
            f = (0, T.s)(t, u),
            p = l.useRef(0),
            m = p.current,
            h = l.useRef(0),
            v = h.current,
            g = s.open || c,
            x = l.useRef(g),
            y = l.useRef(void 0);
          return (
            l.useEffect(() => {
              let e = requestAnimationFrame(() => (x.current = !1));
              return () => cancelAnimationFrame(e);
            }, []),
            L(() => {
              let e = u.current;
              if (e) {
                (y.current = y.current || {
                  transitionDuration: e.style.transitionDuration,
                  animationName: e.style.animationName,
                }),
                  (e.style.transitionDuration = '0s'),
                  (e.style.animationName = 'none');
                let t = e.getBoundingClientRect();
                (p.current = t.height),
                  (h.current = t.width),
                  x.current ||
                    ((e.style.transitionDuration = y.current.transitionDuration),
                    (e.style.animationName = y.current.animationName)),
                  d(n);
              }
            }, [s.open, n]),
            (0, i.jsx)(A.sG.div, {
              'data-state': eG(s.open),
              'data-disabled': s.disabled ? '' : void 0,
              id: s.contentId,
              hidden: !g,
              ...a,
              ref: f,
              style: {
                '--radix-collapsible-content-height': m ? `${m}px` : void 0,
                '--radix-collapsible-content-width': v ? `${v}px` : void 0,
                ...e.style,
              },
              children: g && o,
            })
          );
        });
        function eG(e) {
          return e ? 'open' : 'closed';
        }
        var eV = 'Accordion',
          eq = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'],
          [eX, eK, eY] = eE(eV),
          [eZ, eJ] = _(eV, [eY, eI]),
          eQ = eI(),
          e0 = l.forwardRef((e, t) => {
            let { type: r, ...n } = e;
            return (0, i.jsx)(eX.Provider, {
              scope: e.__scopeAccordion,
              children:
                'multiple' === r
                  ? (0, i.jsx)(e8, { ...n, ref: t })
                  : (0, i.jsx)(e3, { ...n, ref: t }),
            });
          });
        e0.displayName = eV;
        var [e1, e2] = eZ(eV),
          [e4, e6] = eZ(eV, { collapsible: !1 }),
          e3 = l.forwardRef((e, t) => {
            let {
                value: r,
                defaultValue: n,
                onValueChange: o = () => {},
                collapsible: a = !1,
                ...s
              } = e,
              [c, d] = eA({ prop: r, defaultProp: n ?? '', onChange: o, caller: eV });
            return (0, i.jsx)(e1, {
              scope: e.__scopeAccordion,
              value: l.useMemo(() => (c ? [c] : []), [c]),
              onItemOpen: d,
              onItemClose: l.useCallback(() => a && d(''), [a, d]),
              children: (0, i.jsx)(e4, {
                scope: e.__scopeAccordion,
                collapsible: a,
                children: (0, i.jsx)(e9, { ...s, ref: t }),
              }),
            });
          }),
          e8 = l.forwardRef((e, t) => {
            let { value: r, defaultValue: n, onValueChange: o = () => {}, ...a } = e,
              [s, c] = eA({ prop: r, defaultProp: n ?? [], onChange: o, caller: eV }),
              d = l.useCallback(e => c((t = []) => [...t, e]), [c]),
              u = l.useCallback(e => c((t = []) => t.filter(t => t !== e)), [c]);
            return (0, i.jsx)(e1, {
              scope: e.__scopeAccordion,
              value: s,
              onItemOpen: d,
              onItemClose: u,
              children: (0, i.jsx)(e4, {
                scope: e.__scopeAccordion,
                collapsible: !0,
                children: (0, i.jsx)(e9, { ...a, ref: t }),
              }),
            });
          }),
          [e5, e7] = eZ(eV),
          e9 = l.forwardRef((e, t) => {
            let { __scopeAccordion: r, disabled: n, dir: o, orientation: a = 'vertical', ...s } = e,
              c = l.useRef(null),
              d = (0, T.s)(c, t),
              u = eK(r),
              f = 'ltr' === F(o),
              p = z(e.onKeyDown, e => {
                if (!eq.includes(e.key)) return;
                let t = e.target,
                  r = u().filter(e => !e.ref.current?.disabled),
                  n = r.findIndex(e => e.ref.current === t),
                  o = r.length;
                if (-1 === n) return;
                e.preventDefault();
                let i = n,
                  l = o - 1,
                  s = () => {
                    (i = n + 1) > l && (i = 0);
                  },
                  c = () => {
                    (i = n - 1) < 0 && (i = l);
                  };
                switch (e.key) {
                  case 'Home':
                    i = 0;
                    break;
                  case 'End':
                    i = l;
                    break;
                  case 'ArrowRight':
                    'horizontal' === a && (f ? s() : c());
                    break;
                  case 'ArrowDown':
                    'vertical' === a && s();
                    break;
                  case 'ArrowLeft':
                    'horizontal' === a && (f ? c() : s());
                    break;
                  case 'ArrowUp':
                    'vertical' === a && c();
                }
                let d = i % o;
                r[d].ref.current?.focus();
              });
            return (0, i.jsx)(e5, {
              scope: r,
              disabled: n,
              direction: o,
              orientation: a,
              children: (0, i.jsx)(eX.Slot, {
                scope: r,
                children: (0, i.jsx)(A.sG.div, {
                  ...s,
                  'data-orientation': a,
                  ref: d,
                  onKeyDown: n ? void 0 : p,
                }),
              }),
            });
          }),
          te = 'AccordionItem',
          [tt, tr] = eZ(te),
          tn = l.forwardRef((e, t) => {
            let { __scopeAccordion: r, value: n, ...o } = e,
              a = e7(te, r),
              l = e2(te, r),
              s = eQ(r),
              c = eD(),
              d = (n && l.value.includes(n)) || !1,
              u = a.disabled || e.disabled;
            return (0, i.jsx)(tt, {
              scope: r,
              open: d,
              disabled: u,
              triggerId: c,
              children: (0, i.jsx)(eW, {
                'data-orientation': a.orientation,
                'data-state': td(d),
                ...s,
                ...o,
                ref: t,
                disabled: u,
                open: d,
                onOpenChange: e => {
                  e ? l.onItemOpen(n) : l.onItemClose(n);
                },
              }),
            });
          });
        tn.displayName = te;
        var to = 'AccordionHeader',
          ta = l.forwardRef((e, t) => {
            let { __scopeAccordion: r, ...n } = e,
              o = e7(eV, r),
              a = tr(to, r);
            return (0, i.jsx)(A.sG.h3, {
              'data-orientation': o.orientation,
              'data-state': td(a.open),
              'data-disabled': a.disabled ? '' : void 0,
              ...n,
              ref: t,
            });
          });
        ta.displayName = to;
        var ti = 'AccordionTrigger',
          tl = l.forwardRef((e, t) => {
            let { __scopeAccordion: r, ...n } = e,
              o = e7(eV, r),
              a = tr(ti, r),
              l = e6(ti, r),
              s = eQ(r);
            return (0, i.jsx)(eX.ItemSlot, {
              scope: r,
              children: (0, i.jsx)(e$, {
                'aria-disabled': (a.open && !l.collapsible) || void 0,
                'data-orientation': o.orientation,
                id: a.triggerId,
                ...s,
                ...n,
                ref: t,
              }),
            });
          });
        tl.displayName = ti;
        var ts = 'AccordionContent',
          tc = l.forwardRef((e, t) => {
            let { __scopeAccordion: r, ...n } = e,
              o = e7(eV, r),
              a = tr(ts, r),
              l = eQ(r);
            return (0, i.jsx)(eB, {
              role: 'region',
              'aria-labelledby': a.triggerId,
              'data-orientation': o.orientation,
              ...l,
              ...n,
              ref: t,
              style: {
                '--radix-accordion-content-height': 'var(--radix-collapsible-content-height)',
                '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)',
                ...e.style,
              },
            });
          });
        function td(e) {
          return e ? 'open' : 'closed';
        }
        tc.displayName = ts;
        let tu = C('chevron-down', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]]),
          tf = l.forwardRef(({ className: e, ...t }, r) =>
            (0, i.jsx)(tn, { ref: r, className: (0, R.cn)('border-b', e), ...t })
          );
        tf.displayName = 'AccordionItem';
        let tp = l.forwardRef(({ className: e, children: t, ...r }, n) =>
          (0, i.jsx)(ta, {
            className: 'flex',
            children: (0, i.jsxs)(tl, {
              ref: n,
              className: (0, R.cn)(
                'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180',
                e
              ),
              ...r,
              children: [
                t,
                (0, i.jsx)(tu, {
                  className:
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                }),
              ],
            }),
          })
        );
        tp.displayName = tl.displayName;
        let tm = l.forwardRef(({ className: e, children: t, ...r }, n) =>
          (0, i.jsx)(tc, {
            ref: n,
            className:
              'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            ...r,
            children: (0, i.jsx)('div', { className: (0, R.cn)('pb-4 pt-0', e), children: t }),
          })
        );
        tm.displayName = tc.displayName;
        var th = r(70455);
        function tv(e) {
          let t = l.useRef({ value: e, previous: e });
          return l.useMemo(
            () => (
              t.current.value !== e &&
                ((t.current.previous = t.current.value), (t.current.value = e)),
              t.current.previous
            ),
            [e]
          );
        }
        function tg(e) {
          let [t, r] = l.useState(void 0);
          return (
            L(() => {
              if (e) {
                r({ width: e.offsetWidth, height: e.offsetHeight });
                let t = new ResizeObserver(t => {
                  let n, o;
                  if (!Array.isArray(t) || !t.length) return;
                  let a = t[0];
                  if ('borderBoxSize' in a) {
                    let e = a.borderBoxSize,
                      t = Array.isArray(e) ? e[0] : e;
                    (n = t.inlineSize), (o = t.blockSize);
                  } else (n = e.offsetWidth), (o = e.offsetHeight);
                  r({ width: n, height: o });
                });
                return t.observe(e, { box: 'border-box' }), () => t.unobserve(e);
              }
              r(void 0);
            }, [e]),
            t
          );
        }
        var tx = 'Checkbox',
          [ty, tw] = _(tx),
          [tb, tj] = ty(tx),
          tN = l.forwardRef((e, t) => {
            let {
                __scopeCheckbox: r,
                name: n,
                checked: o,
                defaultChecked: a,
                required: s,
                disabled: c,
                value: d = 'on',
                onCheckedChange: u,
                form: f,
                ...p
              } = e,
              [m, h] = l.useState(null),
              v = (0, T.s)(t, e => h(e)),
              g = l.useRef(!1),
              x = !m || f || !!m.closest('form'),
              [y, w] = eA({ prop: o, defaultProp: a ?? !1, onChange: u, caller: tx }),
              b = l.useRef(y);
            return (
              l.useEffect(() => {
                let e = m?.form;
                if (e) {
                  let t = () => w(b.current);
                  return e.addEventListener('reset', t), () => e.removeEventListener('reset', t);
                }
              }, [m, w]),
              (0, i.jsxs)(tb, {
                scope: r,
                state: y,
                disabled: c,
                children: [
                  (0, i.jsx)(A.sG.button, {
                    type: 'button',
                    role: 'checkbox',
                    'aria-checked': tR(y) ? 'mixed' : y,
                    'aria-required': s,
                    'data-state': tk(y),
                    'data-disabled': c ? '' : void 0,
                    disabled: c,
                    value: d,
                    ...p,
                    ref: v,
                    onKeyDown: z(e.onKeyDown, e => {
                      'Enter' === e.key && e.preventDefault();
                    }),
                    onClick: z(e.onClick, e => {
                      w(e => !!tR(e) || !e),
                        x &&
                          ((g.current = e.isPropagationStopped()),
                          g.current || e.stopPropagation());
                    }),
                  }),
                  x &&
                    (0, i.jsx)(tS, {
                      control: m,
                      bubbles: !g.current,
                      name: n,
                      value: d,
                      checked: y,
                      required: s,
                      disabled: c,
                      form: f,
                      style: { transform: 'translateX(-100%)' },
                      defaultChecked: !tR(a) && a,
                    }),
                ],
              })
            );
          });
        tN.displayName = tx;
        var tC = 'CheckboxIndicator',
          tE = l.forwardRef((e, t) => {
            let { __scopeCheckbox: r, forceMount: n, ...o } = e,
              a = tj(tC, r);
            return (0, i.jsx)(D, {
              present: n || tR(a.state) || !0 === a.state,
              children: (0, i.jsx)(A.sG.span, {
                'data-state': tk(a.state),
                'data-disabled': a.disabled ? '' : void 0,
                ...o,
                ref: t,
                style: { pointerEvents: 'none', ...e.style },
              }),
            });
          });
        tE.displayName = tC;
        var tS = l.forwardRef(
          (
            {
              __scopeCheckbox: e,
              control: t,
              checked: r,
              bubbles: n = !0,
              defaultChecked: o,
              ...a
            },
            s
          ) => {
            let c = l.useRef(null),
              d = (0, T.s)(c, s),
              u = tv(r),
              f = tg(t);
            l.useEffect(() => {
              let e = c.current;
              if (!e) return;
              let t = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'checked'
              ).set;
              if (u !== r && t) {
                let o = new Event('click', { bubbles: n });
                (e.indeterminate = tR(r)), t.call(e, !tR(r) && r), e.dispatchEvent(o);
              }
            }, [u, r, n]);
            let p = l.useRef(!tR(r) && r);
            return (0, i.jsx)(A.sG.input, {
              type: 'checkbox',
              'aria-hidden': !0,
              defaultChecked: o ?? p.current,
              ...a,
              tabIndex: -1,
              ref: d,
              style: {
                ...a.style,
                ...f,
                position: 'absolute',
                pointerEvents: 'none',
                opacity: 0,
                margin: 0,
              },
            });
          }
        );
        function tR(e) {
          return 'indeterminate' === e;
        }
        function tk(e) {
          return tR(e) ? 'indeterminate' : e ? 'checked' : 'unchecked';
        }
        tS.displayName = 'CheckboxBubbleInput';
        let tP = C('check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]),
          tA = l.forwardRef(({ className: e, ...t }, r) =>
            (0, i.jsx)(tN, {
              ref: r,
              className: (0, R.cn)(
                'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
                e
              ),
              ...t,
              children: (0, i.jsx)(tE, {
                className: (0, R.cn)('flex items-center justify-center text-current'),
                children: (0, i.jsx)(tP, { className: 'h-4 w-4' }),
              }),
            })
          );
        tA.displayName = tN.displayName;
        var tT = r(21929),
          tL = r(51215),
          tD = 'dismissableLayer.update',
          tM = l.createContext({
            layers: new Set(),
            layersWithOutsidePointerEventsDisabled: new Set(),
            branches: new Set(),
          }),
          t_ = l.forwardRef((e, t) => {
            let {
                disableOutsidePointerEvents: r = !1,
                onEscapeKeyDown: n,
                onPointerDownOutside: a,
                onFocusOutside: s,
                onInteractOutside: c,
                onDismiss: d,
                ...u
              } = e,
              f = l.useContext(tM),
              [p, m] = l.useState(null),
              h = p?.ownerDocument ?? globalThis?.document,
              [, v] = l.useState({}),
              g = (0, T.s)(t, e => m(e)),
              x = Array.from(f.layers),
              [y] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1),
              w = x.indexOf(y),
              b = p ? x.indexOf(p) : -1,
              j = f.layersWithOutsidePointerEventsDisabled.size > 0,
              N = b >= w,
              C = (function (e, t = globalThis?.document) {
                let r = I(e),
                  n = l.useRef(!1),
                  o = l.useRef(() => {});
                return (
                  l.useEffect(() => {
                    let e = e => {
                        if (e.target && !n.current) {
                          let n = function () {
                              tO('dismissableLayer.pointerDownOutside', r, a, { discrete: !0 });
                            },
                            a = { originalEvent: e };
                          'touch' === e.pointerType
                            ? (t.removeEventListener('click', o.current),
                              (o.current = n),
                              t.addEventListener('click', o.current, { once: !0 }))
                            : n();
                        } else t.removeEventListener('click', o.current);
                        n.current = !1;
                      },
                      a = window.setTimeout(() => {
                        t.addEventListener('pointerdown', e);
                      }, 0);
                    return () => {
                      window.clearTimeout(a),
                        t.removeEventListener('pointerdown', e),
                        t.removeEventListener('click', o.current);
                    };
                  }, [t, r]),
                  { onPointerDownCapture: () => (n.current = !0) }
                );
              })(e => {
                let t = e.target,
                  r = [...f.branches].some(e => e.contains(t));
                N && !r && (a?.(e), c?.(e), e.defaultPrevented || d?.());
              }, h),
              E = (function (e, t = globalThis?.document) {
                let r = I(e),
                  n = l.useRef(!1);
                return (
                  l.useEffect(() => {
                    let e = e => {
                      e.target &&
                        !n.current &&
                        tO(
                          'dismissableLayer.focusOutside',
                          r,
                          { originalEvent: e },
                          { discrete: !1 }
                        );
                    };
                    return (
                      t.addEventListener('focusin', e), () => t.removeEventListener('focusin', e)
                    );
                  }, [t, r]),
                  { onFocusCapture: () => (n.current = !0), onBlurCapture: () => (n.current = !1) }
                );
              })(e => {
                let t = e.target;
                ![...f.branches].some(e => e.contains(t)) &&
                  (s?.(e), c?.(e), e.defaultPrevented || d?.());
              }, h);
            return (
              !(function (e, t = globalThis?.document) {
                let r = I(e);
                l.useEffect(() => {
                  let e = e => {
                    'Escape' === e.key && r(e);
                  };
                  return (
                    t.addEventListener('keydown', e, { capture: !0 }),
                    () => t.removeEventListener('keydown', e, { capture: !0 })
                  );
                }, [r, t]);
              })(e => {
                b === f.layers.size - 1 &&
                  (n?.(e), !e.defaultPrevented && d && (e.preventDefault(), d()));
              }, h),
              l.useEffect(() => {
                if (p)
                  return (
                    r &&
                      (0 === f.layersWithOutsidePointerEventsDisabled.size &&
                        ((o = h.body.style.pointerEvents), (h.body.style.pointerEvents = 'none')),
                      f.layersWithOutsidePointerEventsDisabled.add(p)),
                    f.layers.add(p),
                    tI(),
                    () => {
                      r &&
                        1 === f.layersWithOutsidePointerEventsDisabled.size &&
                        (h.body.style.pointerEvents = o);
                    }
                  );
              }, [p, h, r, f]),
              l.useEffect(
                () => () => {
                  p &&
                    (f.layers.delete(p), f.layersWithOutsidePointerEventsDisabled.delete(p), tI());
                },
                [p, f]
              ),
              l.useEffect(() => {
                let e = () => v({});
                return document.addEventListener(tD, e), () => document.removeEventListener(tD, e);
              }, []),
              (0, i.jsx)(A.sG.div, {
                ...u,
                ref: g,
                style: { pointerEvents: j ? (N ? 'auto' : 'none') : void 0, ...e.style },
                onFocusCapture: z(e.onFocusCapture, E.onFocusCapture),
                onBlurCapture: z(e.onBlurCapture, E.onBlurCapture),
                onPointerDownCapture: z(e.onPointerDownCapture, C.onPointerDownCapture),
              })
            );
          });
        function tI() {
          let e = new CustomEvent(tD);
          document.dispatchEvent(e);
        }
        function tO(e, t, r, { discrete: n }) {
          let o = r.originalEvent.target,
            a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
          t && o.addEventListener(e, t, { once: !0 }), n ? (0, A.hO)(o, a) : o.dispatchEvent(a);
        }
        (t_.displayName = 'DismissableLayer'),
          (l.forwardRef((e, t) => {
            let r = l.useContext(tM),
              n = l.useRef(null),
              o = (0, T.s)(t, n);
            return (
              l.useEffect(() => {
                let e = n.current;
                if (e)
                  return (
                    r.branches.add(e),
                    () => {
                      r.branches.delete(e);
                    }
                  );
              }, [r.branches]),
              (0, i.jsx)(A.sG.div, { ...e, ref: o })
            );
          }).displayName = 'DismissableLayerBranch');
        var tF = 0;
        function tW() {
          let e = document.createElement('span');
          return (
            e.setAttribute('data-radix-focus-guard', ''),
            (e.tabIndex = 0),
            (e.style.outline = 'none'),
            (e.style.opacity = '0'),
            (e.style.position = 'fixed'),
            (e.style.pointerEvents = 'none'),
            e
          );
        }
        var tz = 'focusScope.autoFocusOnMount',
          t$ = 'focusScope.autoFocusOnUnmount',
          tH = { bubbles: !1, cancelable: !0 },
          tB = l.forwardRef((e, t) => {
            let {
                loop: r = !1,
                trapped: n = !1,
                onMountAutoFocus: o,
                onUnmountAutoFocus: a,
                ...s
              } = e,
              [c, d] = l.useState(null),
              u = I(o),
              f = I(a),
              p = l.useRef(null),
              m = (0, T.s)(t, e => d(e)),
              h = l.useRef({
                paused: !1,
                pause() {
                  this.paused = !0;
                },
                resume() {
                  this.paused = !1;
                },
              }).current;
            l.useEffect(() => {
              if (n) {
                let e = function (e) {
                    if (h.paused || !c) return;
                    let t = e.target;
                    c.contains(t) ? (p.current = t) : tV(p.current, { select: !0 });
                  },
                  t = function (e) {
                    if (h.paused || !c) return;
                    let t = e.relatedTarget;
                    null !== t && (c.contains(t) || tV(p.current, { select: !0 }));
                  };
                document.addEventListener('focusin', e), document.addEventListener('focusout', t);
                let r = new MutationObserver(function (e) {
                  if (document.activeElement === document.body)
                    for (let t of e) t.removedNodes.length > 0 && tV(c);
                });
                return (
                  c && r.observe(c, { childList: !0, subtree: !0 }),
                  () => {
                    document.removeEventListener('focusin', e),
                      document.removeEventListener('focusout', t),
                      r.disconnect();
                  }
                );
              }
            }, [n, c, h.paused]),
              l.useEffect(() => {
                if (c) {
                  tq.add(h);
                  let e = document.activeElement;
                  if (!c.contains(e)) {
                    let t = new CustomEvent(tz, tH);
                    c.addEventListener(tz, u),
                      c.dispatchEvent(t),
                      t.defaultPrevented ||
                        ((function (e, { select: t = !1 } = {}) {
                          let r = document.activeElement;
                          for (let n of e)
                            if ((tV(n, { select: t }), document.activeElement !== r)) return;
                        })(
                          tU(c).filter(e => 'A' !== e.tagName),
                          { select: !0 }
                        ),
                        document.activeElement === e && tV(c));
                  }
                  return () => {
                    c.removeEventListener(tz, u),
                      setTimeout(() => {
                        let t = new CustomEvent(t$, tH);
                        c.addEventListener(t$, f),
                          c.dispatchEvent(t),
                          t.defaultPrevented || tV(e ?? document.body, { select: !0 }),
                          c.removeEventListener(t$, f),
                          tq.remove(h);
                      }, 0);
                  };
                }
              }, [c, u, f, h]);
            let v = l.useCallback(
              e => {
                if ((!r && !n) || h.paused) return;
                let t = 'Tab' === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                  o = document.activeElement;
                if (t && o) {
                  let t = e.currentTarget,
                    [n, a] = (function (e) {
                      let t = tU(e);
                      return [tG(t, e), tG(t.reverse(), e)];
                    })(t);
                  n && a
                    ? e.shiftKey || o !== a
                      ? e.shiftKey && o === n && (e.preventDefault(), r && tV(a, { select: !0 }))
                      : (e.preventDefault(), r && tV(n, { select: !0 }))
                    : o === t && e.preventDefault();
                }
              },
              [r, n, h.paused]
            );
            return (0, i.jsx)(A.sG.div, { tabIndex: -1, ...s, ref: m, onKeyDown: v });
          });
        function tU(e) {
          let t = [],
            r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
              acceptNode: e => {
                let t = 'INPUT' === e.tagName && 'hidden' === e.type;
                return e.disabled || e.hidden || t
                  ? NodeFilter.FILTER_SKIP
                  : e.tabIndex >= 0
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
              },
            });
          for (; r.nextNode(); ) t.push(r.currentNode);
          return t;
        }
        function tG(e, t) {
          for (let r of e)
            if (
              !(function (e, { upTo: t }) {
                if ('hidden' === getComputedStyle(e).visibility) return !0;
                for (; e && (void 0 === t || e !== t); ) {
                  if ('none' === getComputedStyle(e).display) return !0;
                  e = e.parentElement;
                }
                return !1;
              })(r, { upTo: t })
            )
              return r;
        }
        function tV(e, { select: t = !1 } = {}) {
          if (e && e.focus) {
            var r;
            let n = document.activeElement;
            e.focus({ preventScroll: !0 }),
              e !== n && (r = e) instanceof HTMLInputElement && 'select' in r && t && e.select();
          }
        }
        tB.displayName = 'FocusScope';
        var tq = (function () {
          let e = [];
          return {
            add(t) {
              let r = e[0];
              t !== r && r?.pause(), (e = tX(e, t)).unshift(t);
            },
            remove(t) {
              (e = tX(e, t)), e[0]?.resume();
            },
          };
        })();
        function tX(e, t) {
          let r = [...e],
            n = r.indexOf(t);
          return -1 !== n && r.splice(n, 1), r;
        }
        let tK = ['top', 'right', 'bottom', 'left'],
          tY = Math.min,
          tZ = Math.max,
          tJ = Math.round,
          tQ = Math.floor,
          t0 = e => ({ x: e, y: e }),
          t1 = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
          t2 = { start: 'end', end: 'start' };
        function t4(e, t) {
          return 'function' == typeof e ? e(t) : e;
        }
        function t6(e) {
          return e.split('-')[0];
        }
        function t3(e) {
          return e.split('-')[1];
        }
        function t8(e) {
          return 'x' === e ? 'y' : 'x';
        }
        function t5(e) {
          return 'y' === e ? 'height' : 'width';
        }
        function t7(e) {
          return ['top', 'bottom'].includes(t6(e)) ? 'y' : 'x';
        }
        function t9(e) {
          return e.replace(/start|end/g, e => t2[e]);
        }
        function re(e) {
          return e.replace(/left|right|bottom|top/g, e => t1[e]);
        }
        function rt(e) {
          return 'number' != typeof e
            ? { top: 0, right: 0, bottom: 0, left: 0, ...e }
            : { top: e, right: e, bottom: e, left: e };
        }
        function rr(e) {
          let { x: t, y: r, width: n, height: o } = e;
          return { width: n, height: o, top: r, left: t, right: t + n, bottom: r + o, x: t, y: r };
        }
        function rn(e, t, r) {
          let n,
            { reference: o, floating: a } = e,
            i = t7(t),
            l = t8(t7(t)),
            s = t5(l),
            c = t6(t),
            d = 'y' === i,
            u = o.x + o.width / 2 - a.width / 2,
            f = o.y + o.height / 2 - a.height / 2,
            p = o[s] / 2 - a[s] / 2;
          switch (c) {
            case 'top':
              n = { x: u, y: o.y - a.height };
              break;
            case 'bottom':
              n = { x: u, y: o.y + o.height };
              break;
            case 'right':
              n = { x: o.x + o.width, y: f };
              break;
            case 'left':
              n = { x: o.x - a.width, y: f };
              break;
            default:
              n = { x: o.x, y: o.y };
          }
          switch (t3(t)) {
            case 'start':
              n[l] -= p * (r && d ? -1 : 1);
              break;
            case 'end':
              n[l] += p * (r && d ? -1 : 1);
          }
          return n;
        }
        let ro = async (e, t, r) => {
          let {
              placement: n = 'bottom',
              strategy: o = 'absolute',
              middleware: a = [],
              platform: i,
            } = r,
            l = a.filter(Boolean),
            s = await (null == i.isRTL ? void 0 : i.isRTL(t)),
            c = await i.getElementRects({ reference: e, floating: t, strategy: o }),
            { x: d, y: u } = rn(c, n, s),
            f = n,
            p = {},
            m = 0;
          for (let r = 0; r < l.length; r++) {
            let { name: a, fn: h } = l[r],
              {
                x: v,
                y: g,
                data: x,
                reset: y,
              } = await h({
                x: d,
                y: u,
                initialPlacement: n,
                placement: f,
                strategy: o,
                middlewareData: p,
                rects: c,
                platform: i,
                elements: { reference: e, floating: t },
              });
            (d = null != v ? v : d),
              (u = null != g ? g : u),
              (p = { ...p, [a]: { ...p[a], ...x } }),
              y &&
                m <= 50 &&
                (m++,
                'object' == typeof y &&
                  (y.placement && (f = y.placement),
                  y.rects &&
                    (c =
                      !0 === y.rects
                        ? await i.getElementRects({ reference: e, floating: t, strategy: o })
                        : y.rects),
                  ({ x: d, y: u } = rn(c, f, s))),
                (r = -1));
          }
          return { x: d, y: u, placement: f, strategy: o, middlewareData: p };
        };
        async function ra(e, t) {
          var r;
          void 0 === t && (t = {});
          let { x: n, y: o, platform: a, rects: i, elements: l, strategy: s } = e,
            {
              boundary: c = 'clippingAncestors',
              rootBoundary: d = 'viewport',
              elementContext: u = 'floating',
              altBoundary: f = !1,
              padding: p = 0,
            } = t4(t, e),
            m = rt(p),
            h = l[f ? ('floating' === u ? 'reference' : 'floating') : u],
            v = rr(
              await a.getClippingRect({
                element:
                  null == (r = await (null == a.isElement ? void 0 : a.isElement(h))) || r
                    ? h
                    : h.contextElement ||
                      (await (null == a.getDocumentElement
                        ? void 0
                        : a.getDocumentElement(l.floating))),
                boundary: c,
                rootBoundary: d,
                strategy: s,
              })
            ),
            g =
              'floating' === u
                ? { x: n, y: o, width: i.floating.width, height: i.floating.height }
                : i.reference,
            x = await (null == a.getOffsetParent ? void 0 : a.getOffsetParent(l.floating)),
            y = ((await (null == a.isElement ? void 0 : a.isElement(x))) &&
              (await (null == a.getScale ? void 0 : a.getScale(x)))) || { x: 1, y: 1 },
            w = rr(
              a.convertOffsetParentRelativeRectToViewportRelativeRect
                ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
                    elements: l,
                    rect: g,
                    offsetParent: x,
                    strategy: s,
                  })
                : g
            );
          return {
            top: (v.top - w.top + m.top) / y.y,
            bottom: (w.bottom - v.bottom + m.bottom) / y.y,
            left: (v.left - w.left + m.left) / y.x,
            right: (w.right - v.right + m.right) / y.x,
          };
        }
        function ri(e, t) {
          return {
            top: e.top - t.height,
            right: e.right - t.width,
            bottom: e.bottom - t.height,
            left: e.left - t.width,
          };
        }
        function rl(e) {
          return tK.some(t => e[t] >= 0);
        }
        async function rs(e, t) {
          let { placement: r, platform: n, elements: o } = e,
            a = await (null == n.isRTL ? void 0 : n.isRTL(o.floating)),
            i = t6(r),
            l = t3(r),
            s = 'y' === t7(r),
            c = ['left', 'top'].includes(i) ? -1 : 1,
            d = a && s ? -1 : 1,
            u = t4(t, e),
            {
              mainAxis: f,
              crossAxis: p,
              alignmentAxis: m,
            } = 'number' == typeof u
              ? { mainAxis: u, crossAxis: 0, alignmentAxis: null }
              : {
                  mainAxis: u.mainAxis || 0,
                  crossAxis: u.crossAxis || 0,
                  alignmentAxis: u.alignmentAxis,
                };
          return (
            l && 'number' == typeof m && (p = 'end' === l ? -1 * m : m),
            s ? { x: p * d, y: f * c } : { x: f * c, y: p * d }
          );
        }
        function rc() {
          return 'undefined' != typeof window;
        }
        function rd(e) {
          return rp(e) ? (e.nodeName || '').toLowerCase() : '#document';
        }
        function ru(e) {
          var t;
          return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window;
        }
        function rf(e) {
          var t;
          return null == (t = (rp(e) ? e.ownerDocument : e.document) || window.document)
            ? void 0
            : t.documentElement;
        }
        function rp(e) {
          return !!rc() && (e instanceof Node || e instanceof ru(e).Node);
        }
        function rm(e) {
          return !!rc() && (e instanceof Element || e instanceof ru(e).Element);
        }
        function rh(e) {
          return !!rc() && (e instanceof HTMLElement || e instanceof ru(e).HTMLElement);
        }
        function rv(e) {
          return (
            !!rc() &&
            'undefined' != typeof ShadowRoot &&
            (e instanceof ShadowRoot || e instanceof ru(e).ShadowRoot)
          );
        }
        function rg(e) {
          let { overflow: t, overflowX: r, overflowY: n, display: o } = rj(e);
          return (
            /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !['inline', 'contents'].includes(o)
          );
        }
        function rx(e) {
          return [':popover-open', ':modal'].some(t => {
            try {
              return e.matches(t);
            } catch (e) {
              return !1;
            }
          });
        }
        function ry(e) {
          let t = rw(),
            r = rm(e) ? rj(e) : e;
          return (
            ['transform', 'translate', 'scale', 'rotate', 'perspective'].some(
              e => !!r[e] && 'none' !== r[e]
            ) ||
            (!!r.containerType && 'normal' !== r.containerType) ||
            (!t && !!r.backdropFilter && 'none' !== r.backdropFilter) ||
            (!t && !!r.filter && 'none' !== r.filter) ||
            ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(e =>
              (r.willChange || '').includes(e)
            ) ||
            ['paint', 'layout', 'strict', 'content'].some(e => (r.contain || '').includes(e))
          );
        }
        function rw() {
          return (
            'undefined' != typeof CSS &&
            !!CSS.supports &&
            CSS.supports('-webkit-backdrop-filter', 'none')
          );
        }
        function rb(e) {
          return ['html', 'body', '#document'].includes(rd(e));
        }
        function rj(e) {
          return ru(e).getComputedStyle(e);
        }
        function rN(e) {
          return rm(e)
            ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
            : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
        }
        function rC(e) {
          if ('html' === rd(e)) return e;
          let t = e.assignedSlot || e.parentNode || (rv(e) && e.host) || rf(e);
          return rv(t) ? t.host : t;
        }
        function rE(e, t, r) {
          var n;
          void 0 === t && (t = []), void 0 === r && (r = !0);
          let o = (function e(t) {
              let r = rC(t);
              return rb(r)
                ? t.ownerDocument
                  ? t.ownerDocument.body
                  : t.body
                : rh(r) && rg(r)
                  ? r
                  : e(r);
            })(e),
            a = o === (null == (n = e.ownerDocument) ? void 0 : n.body),
            i = ru(o);
          if (a) {
            let e = rS(i);
            return t.concat(i, i.visualViewport || [], rg(o) ? o : [], e && r ? rE(e) : []);
          }
          return t.concat(o, rE(o, [], r));
        }
        function rS(e) {
          return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
        }
        function rR(e) {
          let t = rj(e),
            r = parseFloat(t.width) || 0,
            n = parseFloat(t.height) || 0,
            o = rh(e),
            a = o ? e.offsetWidth : r,
            i = o ? e.offsetHeight : n,
            l = tJ(r) !== a || tJ(n) !== i;
          return l && ((r = a), (n = i)), { width: r, height: n, $: l };
        }
        function rk(e) {
          return rm(e) ? e : e.contextElement;
        }
        function rP(e) {
          let t = rk(e);
          if (!rh(t)) return t0(1);
          let r = t.getBoundingClientRect(),
            { width: n, height: o, $: a } = rR(t),
            i = (a ? tJ(r.width) : r.width) / n,
            l = (a ? tJ(r.height) : r.height) / o;
          return (
            (i && Number.isFinite(i)) || (i = 1),
            (l && Number.isFinite(l)) || (l = 1),
            { x: i, y: l }
          );
        }
        let rA = t0(0);
        function rT(e) {
          let t = ru(e);
          return rw() && t.visualViewport
            ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
            : rA;
        }
        function rL(e, t, r, n) {
          var o;
          void 0 === t && (t = !1), void 0 === r && (r = !1);
          let a = e.getBoundingClientRect(),
            i = rk(e),
            l = t0(1);
          t && (n ? rm(n) && (l = rP(n)) : (l = rP(e)));
          let s = (void 0 === (o = r) && (o = !1), n && (!o || n === ru(i)) && o) ? rT(i) : t0(0),
            c = (a.left + s.x) / l.x,
            d = (a.top + s.y) / l.y,
            u = a.width / l.x,
            f = a.height / l.y;
          if (i) {
            let e = ru(i),
              t = n && rm(n) ? ru(n) : n,
              r = e,
              o = rS(r);
            for (; o && n && t !== r; ) {
              let e = rP(o),
                t = o.getBoundingClientRect(),
                n = rj(o),
                a = t.left + (o.clientLeft + parseFloat(n.paddingLeft)) * e.x,
                i = t.top + (o.clientTop + parseFloat(n.paddingTop)) * e.y;
              (c *= e.x),
                (d *= e.y),
                (u *= e.x),
                (f *= e.y),
                (c += a),
                (d += i),
                (o = rS((r = ru(o))));
            }
          }
          return rr({ width: u, height: f, x: c, y: d });
        }
        function rD(e, t) {
          let r = rN(e).scrollLeft;
          return t ? t.left + r : rL(rf(e)).left + r;
        }
        function rM(e, t, r) {
          void 0 === r && (r = !1);
          let n = e.getBoundingClientRect();
          return { x: n.left + t.scrollLeft - (r ? 0 : rD(e, n)), y: n.top + t.scrollTop };
        }
        function r_(e, t, r) {
          let n;
          if ('viewport' === t)
            n = (function (e, t) {
              let r = ru(e),
                n = rf(e),
                o = r.visualViewport,
                a = n.clientWidth,
                i = n.clientHeight,
                l = 0,
                s = 0;
              if (o) {
                (a = o.width), (i = o.height);
                let e = rw();
                (!e || (e && 'fixed' === t)) && ((l = o.offsetLeft), (s = o.offsetTop));
              }
              return { width: a, height: i, x: l, y: s };
            })(e, r);
          else if ('document' === t)
            n = (function (e) {
              let t = rf(e),
                r = rN(e),
                n = e.ownerDocument.body,
                o = tZ(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth),
                a = tZ(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight),
                i = -r.scrollLeft + rD(e),
                l = -r.scrollTop;
              return (
                'rtl' === rj(n).direction && (i += tZ(t.clientWidth, n.clientWidth) - o),
                { width: o, height: a, x: i, y: l }
              );
            })(rf(e));
          else if (rm(t))
            n = (function (e, t) {
              let r = rL(e, !0, 'fixed' === t),
                n = r.top + e.clientTop,
                o = r.left + e.clientLeft,
                a = rh(e) ? rP(e) : t0(1),
                i = e.clientWidth * a.x,
                l = e.clientHeight * a.y;
              return { width: i, height: l, x: o * a.x, y: n * a.y };
            })(t, r);
          else {
            let r = rT(e);
            n = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height };
          }
          return rr(n);
        }
        function rI(e) {
          return 'static' === rj(e).position;
        }
        function rO(e, t) {
          if (!rh(e) || 'fixed' === rj(e).position) return null;
          if (t) return t(e);
          let r = e.offsetParent;
          return rf(e) === r && (r = r.ownerDocument.body), r;
        }
        function rF(e, t) {
          let r = ru(e);
          if (rx(e)) return r;
          if (!rh(e)) {
            let t = rC(e);
            for (; t && !rb(t); ) {
              if (rm(t) && !rI(t)) return t;
              t = rC(t);
            }
            return r;
          }
          let n = rO(e, t);
          for (; n && ['table', 'td', 'th'].includes(rd(n)) && rI(n); ) n = rO(n, t);
          return n && rb(n) && rI(n) && !ry(n)
            ? r
            : n ||
                (function (e) {
                  let t = rC(e);
                  for (; rh(t) && !rb(t); ) {
                    if (ry(t)) return t;
                    if (rx(t)) break;
                    t = rC(t);
                  }
                  return null;
                })(e) ||
                r;
        }
        let rW = async function (e) {
            let t = this.getOffsetParent || rF,
              r = this.getDimensions,
              n = await r(e.floating);
            return {
              reference: (function (e, t, r) {
                let n = rh(t),
                  o = rf(t),
                  a = 'fixed' === r,
                  i = rL(e, !0, a, t),
                  l = { scrollLeft: 0, scrollTop: 0 },
                  s = t0(0);
                if (n || (!n && !a))
                  if ((('body' !== rd(t) || rg(o)) && (l = rN(t)), n)) {
                    let e = rL(t, !0, a, t);
                    (s.x = e.x + t.clientLeft), (s.y = e.y + t.clientTop);
                  } else o && (s.x = rD(o));
                let c = !o || n || a ? t0(0) : rM(o, l);
                return {
                  x: i.left + l.scrollLeft - s.x - c.x,
                  y: i.top + l.scrollTop - s.y - c.y,
                  width: i.width,
                  height: i.height,
                };
              })(e.reference, await t(e.floating), e.strategy),
              floating: { x: 0, y: 0, width: n.width, height: n.height },
            };
          },
          rz = {
            convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
              let { elements: t, rect: r, offsetParent: n, strategy: o } = e,
                a = 'fixed' === o,
                i = rf(n),
                l = !!t && rx(t.floating);
              if (n === i || (l && a)) return r;
              let s = { scrollLeft: 0, scrollTop: 0 },
                c = t0(1),
                d = t0(0),
                u = rh(n);
              if ((u || (!u && !a)) && (('body' !== rd(n) || rg(i)) && (s = rN(n)), rh(n))) {
                let e = rL(n);
                (c = rP(n)), (d.x = e.x + n.clientLeft), (d.y = e.y + n.clientTop);
              }
              let f = !i || u || a ? t0(0) : rM(i, s, !0);
              return {
                width: r.width * c.x,
                height: r.height * c.y,
                x: r.x * c.x - s.scrollLeft * c.x + d.x + f.x,
                y: r.y * c.y - s.scrollTop * c.y + d.y + f.y,
              };
            },
            getDocumentElement: rf,
            getClippingRect: function (e) {
              let { element: t, boundary: r, rootBoundary: n, strategy: o } = e,
                a = [
                  ...('clippingAncestors' === r
                    ? rx(t)
                      ? []
                      : (function (e, t) {
                          let r = t.get(e);
                          if (r) return r;
                          let n = rE(e, [], !1).filter(e => rm(e) && 'body' !== rd(e)),
                            o = null,
                            a = 'fixed' === rj(e).position,
                            i = a ? rC(e) : e;
                          for (; rm(i) && !rb(i); ) {
                            let t = rj(i),
                              r = ry(i);
                            r || 'fixed' !== t.position || (o = null),
                              (
                                a
                                  ? !r && !o
                                  : (!r &&
                                      'static' === t.position &&
                                      !!o &&
                                      ['absolute', 'fixed'].includes(o.position)) ||
                                    (rg(i) &&
                                      !r &&
                                      (function e(t, r) {
                                        let n = rC(t);
                                        return (
                                          !(n === r || !rm(n) || rb(n)) &&
                                          ('fixed' === rj(n).position || e(n, r))
                                        );
                                      })(e, i))
                              )
                                ? (n = n.filter(e => e !== i))
                                : (o = t),
                              (i = rC(i));
                          }
                          return t.set(e, n), n;
                        })(t, this._c)
                    : [].concat(r)),
                  n,
                ],
                i = a[0],
                l = a.reduce(
                  (e, r) => {
                    let n = r_(t, r, o);
                    return (
                      (e.top = tZ(n.top, e.top)),
                      (e.right = tY(n.right, e.right)),
                      (e.bottom = tY(n.bottom, e.bottom)),
                      (e.left = tZ(n.left, e.left)),
                      e
                    );
                  },
                  r_(t, i, o)
                );
              return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
            },
            getOffsetParent: rF,
            getElementRects: rW,
            getClientRects: function (e) {
              return Array.from(e.getClientRects());
            },
            getDimensions: function (e) {
              let { width: t, height: r } = rR(e);
              return { width: t, height: r };
            },
            getScale: rP,
            isElement: rm,
            isRTL: function (e) {
              return 'rtl' === rj(e).direction;
            },
          };
        function r$(e, t) {
          return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
        }
        let rH = e => ({
            name: 'arrow',
            options: e,
            async fn(t) {
              let {
                  x: r,
                  y: n,
                  placement: o,
                  rects: a,
                  platform: i,
                  elements: l,
                  middlewareData: s,
                } = t,
                { element: c, padding: d = 0 } = t4(e, t) || {};
              if (null == c) return {};
              let u = rt(d),
                f = { x: r, y: n },
                p = t8(t7(o)),
                m = t5(p),
                h = await i.getDimensions(c),
                v = 'y' === p,
                g = v ? 'clientHeight' : 'clientWidth',
                x = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
                y = f[p] - a.reference[p],
                w = await (null == i.getOffsetParent ? void 0 : i.getOffsetParent(c)),
                b = w ? w[g] : 0;
              (b && (await (null == i.isElement ? void 0 : i.isElement(w)))) ||
                (b = l.floating[g] || a.floating[m]);
              let j = b / 2 - h[m] / 2 - 1,
                N = tY(u[v ? 'top' : 'left'], j),
                C = tY(u[v ? 'bottom' : 'right'], j),
                E = b - h[m] - C,
                S = b / 2 - h[m] / 2 + (x / 2 - y / 2),
                R = tZ(N, tY(S, E)),
                k =
                  !s.arrow &&
                  null != t3(o) &&
                  S !== R &&
                  a.reference[m] / 2 - (S < N ? N : C) - h[m] / 2 < 0,
                P = k ? (S < N ? S - N : S - E) : 0;
              return {
                [p]: f[p] + P,
                data: { [p]: R, centerOffset: S - R - P, ...(k && { alignmentOffset: P }) },
                reset: k,
              };
            },
          }),
          rB = (e, t, r) => {
            let n = new Map(),
              o = { platform: rz, ...r },
              a = { ...o.platform, _c: n };
            return ro(e, t, { ...o, platform: a });
          };
        var rU = 'undefined' != typeof document ? l.useLayoutEffect : l.useEffect;
        function rG(e, t) {
          let r, n, o;
          if (e === t) return !0;
          if (typeof e != typeof t) return !1;
          if ('function' == typeof e && e.toString() === t.toString()) return !0;
          if (e && t && 'object' == typeof e) {
            if (Array.isArray(e)) {
              if ((r = e.length) !== t.length) return !1;
              for (n = r; 0 != n--; ) if (!rG(e[n], t[n])) return !1;
              return !0;
            }
            if ((r = (o = Object.keys(e)).length) !== Object.keys(t).length) return !1;
            for (n = r; 0 != n--; ) if (!{}.hasOwnProperty.call(t, o[n])) return !1;
            for (n = r; 0 != n--; ) {
              let r = o[n];
              if (('_owner' !== r || !e.$$typeof) && !rG(e[r], t[r])) return !1;
            }
            return !0;
          }
          return e != e && t != t;
        }
        function rV(e) {
          return 'undefined' == typeof window
            ? 1
            : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
        }
        function rq(e, t) {
          let r = rV(e);
          return Math.round(t * r) / r;
        }
        function rX(e) {
          let t = l.useRef(e);
          return (
            rU(() => {
              t.current = e;
            }),
            t
          );
        }
        let rK = e => ({
            name: 'arrow',
            options: e,
            fn(t) {
              let { element: r, padding: n } = 'function' == typeof e ? e(t) : e;
              return r && {}.hasOwnProperty.call(r, 'current')
                ? null != r.current
                  ? rH({ element: r.current, padding: n }).fn(t)
                  : {}
                : r
                  ? rH({ element: r, padding: n }).fn(t)
                  : {};
            },
          }),
          rY = (e, t) => ({
            ...(function (e) {
              return (
                void 0 === e && (e = 0),
                {
                  name: 'offset',
                  options: e,
                  async fn(t) {
                    var r, n;
                    let { x: o, y: a, placement: i, middlewareData: l } = t,
                      s = await rs(t, e);
                    return i === (null == (r = l.offset) ? void 0 : r.placement) &&
                      null != (n = l.arrow) &&
                      n.alignmentOffset
                      ? {}
                      : { x: o + s.x, y: a + s.y, data: { ...s, placement: i } };
                  },
                }
              );
            })(e),
            options: [e, t],
          }),
          rZ = (e, t) => ({
            ...(function (e) {
              return (
                void 0 === e && (e = {}),
                {
                  name: 'shift',
                  options: e,
                  async fn(t) {
                    let { x: r, y: n, placement: o } = t,
                      {
                        mainAxis: a = !0,
                        crossAxis: i = !1,
                        limiter: l = {
                          fn: e => {
                            let { x: t, y: r } = e;
                            return { x: t, y: r };
                          },
                        },
                        ...s
                      } = t4(e, t),
                      c = { x: r, y: n },
                      d = await ra(t, s),
                      u = t7(t6(o)),
                      f = t8(u),
                      p = c[f],
                      m = c[u];
                    if (a) {
                      let e = 'y' === f ? 'top' : 'left',
                        t = 'y' === f ? 'bottom' : 'right',
                        r = p + d[e],
                        n = p - d[t];
                      p = tZ(r, tY(p, n));
                    }
                    if (i) {
                      let e = 'y' === u ? 'top' : 'left',
                        t = 'y' === u ? 'bottom' : 'right',
                        r = m + d[e],
                        n = m - d[t];
                      m = tZ(r, tY(m, n));
                    }
                    let h = l.fn({ ...t, [f]: p, [u]: m });
                    return { ...h, data: { x: h.x - r, y: h.y - n, enabled: { [f]: a, [u]: i } } };
                  },
                }
              );
            })(e),
            options: [e, t],
          }),
          rJ = (e, t) => ({
            ...(function (e) {
              return (
                void 0 === e && (e = {}),
                {
                  options: e,
                  fn(t) {
                    let { x: r, y: n, placement: o, rects: a, middlewareData: i } = t,
                      { offset: l = 0, mainAxis: s = !0, crossAxis: c = !0 } = t4(e, t),
                      d = { x: r, y: n },
                      u = t7(o),
                      f = t8(u),
                      p = d[f],
                      m = d[u],
                      h = t4(l, t),
                      v =
                        'number' == typeof h
                          ? { mainAxis: h, crossAxis: 0 }
                          : { mainAxis: 0, crossAxis: 0, ...h };
                    if (s) {
                      let e = 'y' === f ? 'height' : 'width',
                        t = a.reference[f] - a.floating[e] + v.mainAxis,
                        r = a.reference[f] + a.reference[e] - v.mainAxis;
                      p < t ? (p = t) : p > r && (p = r);
                    }
                    if (c) {
                      var g, x;
                      let e = 'y' === f ? 'width' : 'height',
                        t = ['top', 'left'].includes(t6(o)),
                        r =
                          a.reference[u] -
                          a.floating[e] +
                          ((t && (null == (g = i.offset) ? void 0 : g[u])) || 0) +
                          (t ? 0 : v.crossAxis),
                        n =
                          a.reference[u] +
                          a.reference[e] +
                          (t ? 0 : (null == (x = i.offset) ? void 0 : x[u]) || 0) -
                          (t ? v.crossAxis : 0);
                      m < r ? (m = r) : m > n && (m = n);
                    }
                    return { [f]: p, [u]: m };
                  },
                }
              );
            })(e),
            options: [e, t],
          }),
          rQ = (e, t) => ({
            ...(function (e) {
              return (
                void 0 === e && (e = {}),
                {
                  name: 'flip',
                  options: e,
                  async fn(t) {
                    var r, n, o, a, i;
                    let {
                        placement: l,
                        middlewareData: s,
                        rects: c,
                        initialPlacement: d,
                        platform: u,
                        elements: f,
                      } = t,
                      {
                        mainAxis: p = !0,
                        crossAxis: m = !0,
                        fallbackPlacements: h,
                        fallbackStrategy: v = 'bestFit',
                        fallbackAxisSideDirection: g = 'none',
                        flipAlignment: x = !0,
                        ...y
                      } = t4(e, t);
                    if (null != (r = s.arrow) && r.alignmentOffset) return {};
                    let w = t6(l),
                      b = t7(d),
                      j = t6(d) === d,
                      N = await (null == u.isRTL ? void 0 : u.isRTL(f.floating)),
                      C =
                        h ||
                        (j || !x
                          ? [re(d)]
                          : (function (e) {
                              let t = re(e);
                              return [t9(e), t, t9(t)];
                            })(d)),
                      E = 'none' !== g;
                    !h &&
                      E &&
                      C.push(
                        ...(function (e, t, r, n) {
                          let o = t3(e),
                            a = (function (e, t, r) {
                              let n = ['left', 'right'],
                                o = ['right', 'left'];
                              switch (e) {
                                case 'top':
                                case 'bottom':
                                  if (r) return t ? o : n;
                                  return t ? n : o;
                                case 'left':
                                case 'right':
                                  return t ? ['top', 'bottom'] : ['bottom', 'top'];
                                default:
                                  return [];
                              }
                            })(t6(e), 'start' === r, n);
                          return (
                            o && ((a = a.map(e => e + '-' + o)), t && (a = a.concat(a.map(t9)))), a
                          );
                        })(d, x, g, N)
                      );
                    let S = [d, ...C],
                      R = await ra(t, y),
                      k = [],
                      P = (null == (n = s.flip) ? void 0 : n.overflows) || [];
                    if ((p && k.push(R[w]), m)) {
                      let e = (function (e, t, r) {
                        void 0 === r && (r = !1);
                        let n = t3(e),
                          o = t8(t7(e)),
                          a = t5(o),
                          i =
                            'x' === o
                              ? n === (r ? 'end' : 'start')
                                ? 'right'
                                : 'left'
                              : 'start' === n
                                ? 'bottom'
                                : 'top';
                        return t.reference[a] > t.floating[a] && (i = re(i)), [i, re(i)];
                      })(l, c, N);
                      k.push(R[e[0]], R[e[1]]);
                    }
                    if (((P = [...P, { placement: l, overflows: k }]), !k.every(e => e <= 0))) {
                      let e = ((null == (o = s.flip) ? void 0 : o.index) || 0) + 1,
                        t = S[e];
                      if (t) return { data: { index: e, overflows: P }, reset: { placement: t } };
                      let r =
                        null ==
                        (a = P.filter(e => e.overflows[0] <= 0).sort(
                          (e, t) => e.overflows[1] - t.overflows[1]
                        )[0])
                          ? void 0
                          : a.placement;
                      if (!r)
                        switch (v) {
                          case 'bestFit': {
                            let e =
                              null ==
                              (i = P.filter(e => {
                                if (E) {
                                  let t = t7(e.placement);
                                  return t === b || 'y' === t;
                                }
                                return !0;
                              })
                                .map(e => [
                                  e.placement,
                                  e.overflows.filter(e => e > 0).reduce((e, t) => e + t, 0),
                                ])
                                .sort((e, t) => e[1] - t[1])[0])
                                ? void 0
                                : i[0];
                            e && (r = e);
                            break;
                          }
                          case 'initialPlacement':
                            r = d;
                        }
                      if (l !== r) return { reset: { placement: r } };
                    }
                    return {};
                  },
                }
              );
            })(e),
            options: [e, t],
          }),
          r0 = (e, t) => ({
            ...(function (e) {
              return (
                void 0 === e && (e = {}),
                {
                  name: 'size',
                  options: e,
                  async fn(t) {
                    var r, n;
                    let o,
                      a,
                      { placement: i, rects: l, platform: s, elements: c } = t,
                      { apply: d = () => {}, ...u } = t4(e, t),
                      f = await ra(t, u),
                      p = t6(i),
                      m = t3(i),
                      h = 'y' === t7(i),
                      { width: v, height: g } = l.floating;
                    'top' === p || 'bottom' === p
                      ? ((o = p),
                        (a =
                          m ===
                          ((await (null == s.isRTL ? void 0 : s.isRTL(c.floating)))
                            ? 'start'
                            : 'end')
                            ? 'left'
                            : 'right'))
                      : ((a = p), (o = 'end' === m ? 'top' : 'bottom'));
                    let x = g - f.top - f.bottom,
                      y = v - f.left - f.right,
                      w = tY(g - f[o], x),
                      b = tY(v - f[a], y),
                      j = !t.middlewareData.shift,
                      N = w,
                      C = b;
                    if (
                      (null != (r = t.middlewareData.shift) && r.enabled.x && (C = y),
                      null != (n = t.middlewareData.shift) && n.enabled.y && (N = x),
                      j && !m)
                    ) {
                      let e = tZ(f.left, 0),
                        t = tZ(f.right, 0),
                        r = tZ(f.top, 0),
                        n = tZ(f.bottom, 0);
                      h
                        ? (C = v - 2 * (0 !== e || 0 !== t ? e + t : tZ(f.left, f.right)))
                        : (N = g - 2 * (0 !== r || 0 !== n ? r + n : tZ(f.top, f.bottom)));
                    }
                    await d({ ...t, availableWidth: C, availableHeight: N });
                    let E = await s.getDimensions(c.floating);
                    return v !== E.width || g !== E.height ? { reset: { rects: !0 } } : {};
                  },
                }
              );
            })(e),
            options: [e, t],
          }),
          r1 = (e, t) => ({
            ...(function (e) {
              return (
                void 0 === e && (e = {}),
                {
                  name: 'hide',
                  options: e,
                  async fn(t) {
                    let { rects: r } = t,
                      { strategy: n = 'referenceHidden', ...o } = t4(e, t);
                    switch (n) {
                      case 'referenceHidden': {
                        let e = ri(await ra(t, { ...o, elementContext: 'reference' }), r.reference);
                        return { data: { referenceHiddenOffsets: e, referenceHidden: rl(e) } };
                      }
                      case 'escaped': {
                        let e = ri(await ra(t, { ...o, altBoundary: !0 }), r.floating);
                        return { data: { escapedOffsets: e, escaped: rl(e) } };
                      }
                      default:
                        return {};
                    }
                  },
                }
              );
            })(e),
            options: [e, t],
          }),
          r2 = (e, t) => ({ ...rK(e), options: [e, t] });
        var r4 = l.forwardRef((e, t) => {
          let { children: r, width: n = 10, height: o = 5, ...a } = e;
          return (0, i.jsx)(A.sG.svg, {
            ...a,
            ref: t,
            width: n,
            height: o,
            viewBox: '0 0 30 10',
            preserveAspectRatio: 'none',
            children: e.asChild ? r : (0, i.jsx)('polygon', { points: '0,0 30,0 15,10' }),
          });
        });
        r4.displayName = 'Arrow';
        var r6 = 'Popper',
          [r3, r8] = _(r6),
          [r5, r7] = r3(r6),
          r9 = e => {
            let { __scopePopper: t, children: r } = e,
              [n, o] = l.useState(null);
            return (0, i.jsx)(r5, { scope: t, anchor: n, onAnchorChange: o, children: r });
          };
        r9.displayName = r6;
        var ne = 'PopperAnchor',
          nt = l.forwardRef((e, t) => {
            let { __scopePopper: r, virtualRef: n, ...o } = e,
              a = r7(ne, r),
              s = l.useRef(null),
              c = (0, T.s)(t, s);
            return (
              l.useEffect(() => {
                a.onAnchorChange(n?.current || s.current);
              }),
              n ? null : (0, i.jsx)(A.sG.div, { ...o, ref: c })
            );
          });
        nt.displayName = ne;
        var nr = 'PopperContent',
          [nn, no] = r3(nr),
          na = l.forwardRef((e, t) => {
            let {
                __scopePopper: r,
                side: n = 'bottom',
                sideOffset: o = 0,
                align: a = 'center',
                alignOffset: s = 0,
                arrowPadding: c = 0,
                avoidCollisions: d = !0,
                collisionBoundary: u = [],
                collisionPadding: f = 0,
                sticky: p = 'partial',
                hideWhenDetached: m = !1,
                updatePositionStrategy: h = 'optimized',
                onPlaced: v,
                ...g
              } = e,
              x = r7(nr, r),
              [y, w] = l.useState(null),
              b = (0, T.s)(t, e => w(e)),
              [j, N] = l.useState(null),
              C = tg(j),
              E = C?.width ?? 0,
              S = C?.height ?? 0,
              R = 'number' == typeof f ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f },
              k = Array.isArray(u) ? u : [u],
              P = k.length > 0,
              D = { padding: R, boundary: k.filter(nc), altBoundary: P },
              {
                refs: M,
                floatingStyles: _,
                placement: O,
                isPositioned: F,
                middlewareData: W,
              } = (function (e) {
                void 0 === e && (e = {});
                let {
                    placement: t = 'bottom',
                    strategy: r = 'absolute',
                    middleware: n = [],
                    platform: o,
                    elements: { reference: a, floating: i } = {},
                    transform: s = !0,
                    whileElementsMounted: c,
                    open: d,
                  } = e,
                  [u, f] = l.useState({
                    x: 0,
                    y: 0,
                    strategy: r,
                    placement: t,
                    middlewareData: {},
                    isPositioned: !1,
                  }),
                  [p, m] = l.useState(n);
                rG(p, n) || m(n);
                let [h, v] = l.useState(null),
                  [g, x] = l.useState(null),
                  y = l.useCallback(e => {
                    e !== N.current && ((N.current = e), v(e));
                  }, []),
                  w = l.useCallback(e => {
                    e !== C.current && ((C.current = e), x(e));
                  }, []),
                  b = a || h,
                  j = i || g,
                  N = l.useRef(null),
                  C = l.useRef(null),
                  E = l.useRef(u),
                  S = null != c,
                  R = rX(c),
                  k = rX(o),
                  P = rX(d),
                  A = l.useCallback(() => {
                    if (!N.current || !C.current) return;
                    let e = { placement: t, strategy: r, middleware: p };
                    k.current && (e.platform = k.current),
                      rB(N.current, C.current, e).then(e => {
                        let t = { ...e, isPositioned: !1 !== P.current };
                        T.current &&
                          !rG(E.current, t) &&
                          ((E.current = t),
                          tL.flushSync(() => {
                            f(t);
                          }));
                      });
                  }, [p, t, r, k, P]);
                rU(() => {
                  !1 === d &&
                    E.current.isPositioned &&
                    ((E.current.isPositioned = !1), f(e => ({ ...e, isPositioned: !1 })));
                }, [d]);
                let T = l.useRef(!1);
                rU(
                  () => (
                    (T.current = !0),
                    () => {
                      T.current = !1;
                    }
                  ),
                  []
                ),
                  rU(() => {
                    if ((b && (N.current = b), j && (C.current = j), b && j)) {
                      if (R.current) return R.current(b, j, A);
                      A();
                    }
                  }, [b, j, A, R, S]);
                let L = l.useMemo(
                    () => ({ reference: N, floating: C, setReference: y, setFloating: w }),
                    [y, w]
                  ),
                  D = l.useMemo(() => ({ reference: b, floating: j }), [b, j]),
                  M = l.useMemo(() => {
                    let e = { position: r, left: 0, top: 0 };
                    if (!D.floating) return e;
                    let t = rq(D.floating, u.x),
                      n = rq(D.floating, u.y);
                    return s
                      ? {
                          ...e,
                          transform: 'translate(' + t + 'px, ' + n + 'px)',
                          ...(rV(D.floating) >= 1.5 && { willChange: 'transform' }),
                        }
                      : { position: r, left: t, top: n };
                  }, [r, s, D.floating, u.x, u.y]);
                return l.useMemo(
                  () => ({ ...u, update: A, refs: L, elements: D, floatingStyles: M }),
                  [u, A, L, D, M]
                );
              })({
                strategy: 'fixed',
                placement: n + ('center' !== a ? '-' + a : ''),
                whileElementsMounted: (...e) =>
                  (function (e, t, r, n) {
                    let o;
                    void 0 === n && (n = {});
                    let {
                        ancestorScroll: a = !0,
                        ancestorResize: i = !0,
                        elementResize: l = 'function' == typeof ResizeObserver,
                        layoutShift: s = 'function' == typeof IntersectionObserver,
                        animationFrame: c = !1,
                      } = n,
                      d = rk(e),
                      u = a || i ? [...(d ? rE(d) : []), ...rE(t)] : [];
                    u.forEach(e => {
                      a && e.addEventListener('scroll', r, { passive: !0 }),
                        i && e.addEventListener('resize', r);
                    });
                    let f =
                        d && s
                          ? (function (e, t) {
                              let r,
                                n = null,
                                o = rf(e);
                              function a() {
                                var e;
                                clearTimeout(r), null == (e = n) || e.disconnect(), (n = null);
                              }
                              return (
                                !(function i(l, s) {
                                  void 0 === l && (l = !1), void 0 === s && (s = 1), a();
                                  let c = e.getBoundingClientRect(),
                                    { left: d, top: u, width: f, height: p } = c;
                                  if ((l || t(), !f || !p)) return;
                                  let m = tQ(u),
                                    h = tQ(o.clientWidth - (d + f)),
                                    v = {
                                      rootMargin:
                                        -m +
                                        'px ' +
                                        -h +
                                        'px ' +
                                        -tQ(o.clientHeight - (u + p)) +
                                        'px ' +
                                        -tQ(d) +
                                        'px',
                                      threshold: tZ(0, tY(1, s)) || 1,
                                    },
                                    g = !0;
                                  function x(t) {
                                    let n = t[0].intersectionRatio;
                                    if (n !== s) {
                                      if (!g) return i();
                                      n
                                        ? i(!1, n)
                                        : (r = setTimeout(() => {
                                            i(!1, 1e-7);
                                          }, 1e3));
                                    }
                                    1 !== n || r$(c, e.getBoundingClientRect()) || i(), (g = !1);
                                  }
                                  try {
                                    n = new IntersectionObserver(x, {
                                      ...v,
                                      root: o.ownerDocument,
                                    });
                                  } catch (e) {
                                    n = new IntersectionObserver(x, v);
                                  }
                                  n.observe(e);
                                })(!0),
                                a
                              );
                            })(d, r)
                          : null,
                      p = -1,
                      m = null;
                    l &&
                      ((m = new ResizeObserver(e => {
                        let [n] = e;
                        n &&
                          n.target === d &&
                          m &&
                          (m.unobserve(t),
                          cancelAnimationFrame(p),
                          (p = requestAnimationFrame(() => {
                            var e;
                            null == (e = m) || e.observe(t);
                          }))),
                          r();
                      })),
                      d && !c && m.observe(d),
                      m.observe(t));
                    let h = c ? rL(e) : null;
                    return (
                      c &&
                        (function t() {
                          let n = rL(e);
                          h && !r$(h, n) && r(), (h = n), (o = requestAnimationFrame(t));
                        })(),
                      r(),
                      () => {
                        var e;
                        u.forEach(e => {
                          a && e.removeEventListener('scroll', r),
                            i && e.removeEventListener('resize', r);
                        }),
                          null == f || f(),
                          null == (e = m) || e.disconnect(),
                          (m = null),
                          c && cancelAnimationFrame(o);
                      }
                    );
                  })(...e, { animationFrame: 'always' === h }),
                elements: { reference: x.anchor },
                middleware: [
                  rY({ mainAxis: o + S, alignmentAxis: s }),
                  d &&
                    rZ({
                      mainAxis: !0,
                      crossAxis: !1,
                      limiter: 'partial' === p ? rJ() : void 0,
                      ...D,
                    }),
                  d && rQ({ ...D }),
                  r0({
                    ...D,
                    apply: ({ elements: e, rects: t, availableWidth: r, availableHeight: n }) => {
                      let { width: o, height: a } = t.reference,
                        i = e.floating.style;
                      i.setProperty('--radix-popper-available-width', `${r}px`),
                        i.setProperty('--radix-popper-available-height', `${n}px`),
                        i.setProperty('--radix-popper-anchor-width', `${o}px`),
                        i.setProperty('--radix-popper-anchor-height', `${a}px`);
                    },
                  }),
                  j && r2({ element: j, padding: c }),
                  nd({ arrowWidth: E, arrowHeight: S }),
                  m && r1({ strategy: 'referenceHidden', ...D }),
                ],
              }),
              [z, $] = nu(O),
              H = I(v);
            L(() => {
              F && H?.();
            }, [F, H]);
            let B = W.arrow?.x,
              U = W.arrow?.y,
              G = W.arrow?.centerOffset !== 0,
              [V, q] = l.useState();
            return (
              L(() => {
                y && q(window.getComputedStyle(y).zIndex);
              }, [y]),
              (0, i.jsx)('div', {
                ref: M.setFloating,
                'data-radix-popper-content-wrapper': '',
                style: {
                  ..._,
                  transform: F ? _.transform : 'translate(0, -200%)',
                  minWidth: 'max-content',
                  zIndex: V,
                  '--radix-popper-transform-origin': [
                    W.transformOrigin?.x,
                    W.transformOrigin?.y,
                  ].join(' '),
                  ...(W.hide?.referenceHidden && { visibility: 'hidden', pointerEvents: 'none' }),
                },
                dir: e.dir,
                children: (0, i.jsx)(nn, {
                  scope: r,
                  placedSide: z,
                  onArrowChange: N,
                  arrowX: B,
                  arrowY: U,
                  shouldHideArrow: G,
                  children: (0, i.jsx)(A.sG.div, {
                    'data-side': z,
                    'data-align': $,
                    ...g,
                    ref: b,
                    style: { ...g.style, animation: F ? void 0 : 'none' },
                  }),
                }),
              })
            );
          });
        na.displayName = nr;
        var ni = 'PopperArrow',
          nl = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
          ns = l.forwardRef(function (e, t) {
            let { __scopePopper: r, ...n } = e,
              o = no(ni, r),
              a = nl[o.placedSide];
            return (0, i.jsx)('span', {
              ref: o.onArrowChange,
              style: {
                position: 'absolute',
                left: o.arrowX,
                top: o.arrowY,
                [a]: 0,
                transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[
                  o.placedSide
                ],
                transform: {
                  top: 'translateY(100%)',
                  right: 'translateY(50%) rotate(90deg) translateX(-50%)',
                  bottom: 'rotate(180deg)',
                  left: 'translateY(50%) rotate(-90deg) translateX(50%)',
                }[o.placedSide],
                visibility: o.shouldHideArrow ? 'hidden' : void 0,
              },
              children: (0, i.jsx)(r4, { ...n, ref: t, style: { ...n.style, display: 'block' } }),
            });
          });
        function nc(e) {
          return null !== e;
        }
        ns.displayName = ni;
        var nd = e => ({
          name: 'transformOrigin',
          options: e,
          fn(t) {
            let { placement: r, rects: n, middlewareData: o } = t,
              a = o.arrow?.centerOffset !== 0,
              i = a ? 0 : e.arrowWidth,
              l = a ? 0 : e.arrowHeight,
              [s, c] = nu(r),
              d = { start: '0%', center: '50%', end: '100%' }[c],
              u = (o.arrow?.x ?? 0) + i / 2,
              f = (o.arrow?.y ?? 0) + l / 2,
              p = '',
              m = '';
            return (
              'bottom' === s
                ? ((p = a ? d : `${u}px`), (m = `${-l}px`))
                : 'top' === s
                  ? ((p = a ? d : `${u}px`), (m = `${n.floating.height + l}px`))
                  : 'right' === s
                    ? ((p = `${-l}px`), (m = a ? d : `${f}px`))
                    : 'left' === s && ((p = `${n.floating.width + l}px`), (m = a ? d : `${f}px`)),
              { data: { x: p, y: m } }
            );
          },
        });
        function nu(e) {
          let [t, r = 'center'] = e.split('-');
          return [t, r];
        }
        var nf = l.forwardRef((e, t) => {
          let { container: r, ...n } = e,
            [o, a] = l.useState(!1);
          L(() => a(!0), []);
          let s = r || (o && globalThis?.document?.body);
          return s ? tL.createPortal((0, i.jsx)(A.sG.div, { ...n, ref: t }), s) : null;
        });
        nf.displayName = 'Portal';
        var np = Object.freeze({
          position: 'absolute',
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
        });
        l.forwardRef((e, t) =>
          (0, i.jsx)(A.sG.span, { ...e, ref: t, style: { ...np, ...e.style } })
        ).displayName = 'VisuallyHidden';
        var nm = function (e) {
            return 'undefined' == typeof document
              ? null
              : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
          },
          nh = new WeakMap(),
          nv = new WeakMap(),
          ng = {},
          nx = 0,
          ny = function (e) {
            return e && (e.host || ny(e.parentNode));
          },
          nw = function (e, t, r, n) {
            var o = (Array.isArray(e) ? e : [e])
              .map(function (e) {
                if (t.contains(e)) return e;
                var r = ny(e);
                return r && t.contains(r)
                  ? r
                  : (console.error(
                      'aria-hidden',
                      e,
                      'in not contained inside',
                      t,
                      '. Doing nothing'
                    ),
                    null);
              })
              .filter(function (e) {
                return !!e;
              });
            ng[r] || (ng[r] = new WeakMap());
            var a = ng[r],
              i = [],
              l = new Set(),
              s = new Set(o),
              c = function (e) {
                !e || l.has(e) || (l.add(e), c(e.parentNode));
              };
            o.forEach(c);
            var d = function (e) {
              !e ||
                s.has(e) ||
                Array.prototype.forEach.call(e.children, function (e) {
                  if (l.has(e)) d(e);
                  else
                    try {
                      var t = e.getAttribute(n),
                        o = null !== t && 'false' !== t,
                        s = (nh.get(e) || 0) + 1,
                        c = (a.get(e) || 0) + 1;
                      nh.set(e, s),
                        a.set(e, c),
                        i.push(e),
                        1 === s && o && nv.set(e, !0),
                        1 === c && e.setAttribute(r, 'true'),
                        o || e.setAttribute(n, 'true');
                    } catch (t) {
                      console.error('aria-hidden: cannot operate on ', e, t);
                    }
                });
            };
            return (
              d(t),
              l.clear(),
              nx++,
              function () {
                i.forEach(function (e) {
                  var t = nh.get(e) - 1,
                    o = a.get(e) - 1;
                  nh.set(e, t),
                    a.set(e, o),
                    t || (nv.has(e) || e.removeAttribute(n), nv.delete(e)),
                    o || e.removeAttribute(r);
                }),
                  --nx ||
                    ((nh = new WeakMap()), (nh = new WeakMap()), (nv = new WeakMap()), (ng = {}));
              }
            );
          },
          nb = function (e, t, r) {
            void 0 === r && (r = 'data-aria-hidden');
            var n = Array.from(Array.isArray(e) ? e : [e]),
              o = t || nm(e);
            return o
              ? (n.push.apply(n, Array.from(o.querySelectorAll('[aria-live]'))),
                nw(n, o, r, 'aria-hidden'))
              : function () {
                  return null;
                };
          },
          nj = r(4363),
          nN = 'right-scroll-bar-position',
          nC = 'width-before-scroll-bar';
        function nE(e, t) {
          return 'function' == typeof e ? e(t) : e && (e.current = t), e;
        }
        var nS = 'undefined' != typeof window ? l.useLayoutEffect : l.useEffect,
          nR = new WeakMap();
        function nk(e) {
          return e;
        }
        var nP = (function (e) {
            void 0 === e && (e = {});
            var t,
              r,
              n,
              o,
              a =
                ((t = null),
                void 0 === r && (r = nk),
                (n = []),
                (o = !1),
                {
                  read: function () {
                    if (o)
                      throw Error(
                        'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
                      );
                    return n.length ? n[n.length - 1] : null;
                  },
                  useMedium: function (e) {
                    var t = r(e, o);
                    return (
                      n.push(t),
                      function () {
                        n = n.filter(function (e) {
                          return e !== t;
                        });
                      }
                    );
                  },
                  assignSyncMedium: function (e) {
                    for (o = !0; n.length; ) {
                      var t = n;
                      (n = []), t.forEach(e);
                    }
                    n = {
                      push: function (t) {
                        return e(t);
                      },
                      filter: function () {
                        return n;
                      },
                    };
                  },
                  assignMedium: function (e) {
                    o = !0;
                    var t = [];
                    if (n.length) {
                      var r = n;
                      (n = []), r.forEach(e), (t = n);
                    }
                    var a = function () {
                        var r = t;
                        (t = []), r.forEach(e);
                      },
                      i = function () {
                        return Promise.resolve().then(a);
                      };
                    i(),
                      (n = {
                        push: function (e) {
                          t.push(e), i();
                        },
                        filter: function (e) {
                          return (t = t.filter(e)), n;
                        },
                      });
                  },
                });
            return (a.options = (0, nj.Cl)({ async: !0, ssr: !1 }, e)), a;
          })(),
          nA = function () {},
          nT = l.forwardRef(function (e, t) {
            var r,
              n,
              o,
              a,
              i = l.useRef(null),
              s = l.useState({ onScrollCapture: nA, onWheelCapture: nA, onTouchMoveCapture: nA }),
              c = s[0],
              d = s[1],
              u = e.forwardProps,
              f = e.children,
              p = e.className,
              m = e.removeScrollBar,
              h = e.enabled,
              v = e.shards,
              g = e.sideCar,
              x = e.noIsolation,
              y = e.inert,
              w = e.allowPinchZoom,
              b = e.as,
              j = e.gapMode,
              N = (0, nj.Tt)(e, [
                'forwardProps',
                'children',
                'className',
                'removeScrollBar',
                'enabled',
                'shards',
                'sideCar',
                'noIsolation',
                'inert',
                'allowPinchZoom',
                'as',
                'gapMode',
              ]),
              C =
                ((r = [i, t]),
                (n = function (e) {
                  return r.forEach(function (t) {
                    return nE(t, e);
                  });
                }),
                ((o = (0, l.useState)(function () {
                  return {
                    value: null,
                    callback: n,
                    facade: {
                      get current() {
                        return o.value;
                      },
                      set current(value) {
                        var e = o.value;
                        e !== value && ((o.value = value), o.callback(value, e));
                      },
                    },
                  };
                })[0]).callback = n),
                (a = o.facade),
                nS(
                  function () {
                    var e = nR.get(a);
                    if (e) {
                      var t = new Set(e),
                        n = new Set(r),
                        o = a.current;
                      t.forEach(function (e) {
                        n.has(e) || nE(e, null);
                      }),
                        n.forEach(function (e) {
                          t.has(e) || nE(e, o);
                        });
                    }
                    nR.set(a, r);
                  },
                  [r]
                ),
                a),
              E = (0, nj.Cl)((0, nj.Cl)({}, N), c);
            return l.createElement(
              l.Fragment,
              null,
              h &&
                l.createElement(g, {
                  sideCar: nP,
                  removeScrollBar: m,
                  shards: v,
                  noIsolation: x,
                  inert: y,
                  setCallbacks: d,
                  allowPinchZoom: !!w,
                  lockRef: i,
                  gapMode: j,
                }),
              u
                ? l.cloneElement(l.Children.only(f), (0, nj.Cl)((0, nj.Cl)({}, E), { ref: C }))
                : l.createElement(
                    void 0 === b ? 'div' : b,
                    (0, nj.Cl)({}, E, { className: p, ref: C }),
                    f
                  )
            );
          });
        (nT.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
          (nT.classNames = { fullWidth: nC, zeroRight: nN });
        var nL = function (e) {
          var t = e.sideCar,
            r = (0, nj.Tt)(e, ['sideCar']);
          if (!t) throw Error('Sidecar: please provide `sideCar` property to import the right car');
          var n = t.read();
          if (!n) throw Error('Sidecar medium not found');
          return l.createElement(n, (0, nj.Cl)({}, r));
        };
        nL.isSideCarExport = !0;
        var nD = function () {
            var e = 0,
              t = null;
            return {
              add: function (n) {
                if (
                  0 == e &&
                  (t = (function () {
                    if (!document) return null;
                    var e = document.createElement('style');
                    e.type = 'text/css';
                    var t = a || r.nc;
                    return t && e.setAttribute('nonce', t), e;
                  })())
                ) {
                  var o, i;
                  (o = t).styleSheet
                    ? (o.styleSheet.cssText = n)
                    : o.appendChild(document.createTextNode(n)),
                    (i = t),
                    (document.head || document.getElementsByTagName('head')[0]).appendChild(i);
                }
                e++;
              },
              remove: function () {
                --e || !t || (t.parentNode && t.parentNode.removeChild(t), (t = null));
              },
            };
          },
          nM = function () {
            var e = nD();
            return function (t, r) {
              l.useEffect(
                function () {
                  return (
                    e.add(t),
                    function () {
                      e.remove();
                    }
                  );
                },
                [t && r]
              );
            };
          },
          n_ = function () {
            var e = nM();
            return function (t) {
              return e(t.styles, t.dynamic), null;
            };
          },
          nI = { left: 0, top: 0, right: 0, gap: 0 },
          nO = function (e) {
            return parseInt(e || '', 10) || 0;
          },
          nF = function (e) {
            var t = window.getComputedStyle(document.body),
              r = t['padding' === e ? 'paddingLeft' : 'marginLeft'],
              n = t['padding' === e ? 'paddingTop' : 'marginTop'],
              o = t['padding' === e ? 'paddingRight' : 'marginRight'];
            return [nO(r), nO(n), nO(o)];
          },
          nW = function (e) {
            if ((void 0 === e && (e = 'margin'), 'undefined' == typeof window)) return nI;
            var t = nF(e),
              r = document.documentElement.clientWidth,
              n = window.innerWidth;
            return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, n - r + t[2] - t[0]) };
          },
          nz = n_(),
          n$ = 'data-scroll-locked',
          nH = function (e, t, r, n) {
            var o = e.left,
              a = e.top,
              i = e.right,
              l = e.gap;
            return (
              void 0 === r && (r = 'margin'),
              '\n  .'
                .concat('with-scroll-bars-hidden', ' {\n   overflow: hidden ')
                .concat(n, ';\n   padding-right: ')
                .concat(l, 'px ')
                .concat(n, ';\n  }\n  body[')
                .concat(n$, '] {\n    overflow: hidden ')
                .concat(n, ';\n    overscroll-behavior: contain;\n    ')
                .concat(
                  [
                    t && 'position: relative '.concat(n, ';'),
                    'margin' === r &&
                      '\n    padding-left: '
                        .concat(o, 'px;\n    padding-top: ')
                        .concat(a, 'px;\n    padding-right: ')
                        .concat(i, 'px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ')
                        .concat(l, 'px ')
                        .concat(n, ';\n    '),
                    'padding' === r && 'padding-right: '.concat(l, 'px ').concat(n, ';'),
                  ]
                    .filter(Boolean)
                    .join(''),
                  '\n  }\n  \n  .'
                )
                .concat(nN, ' {\n    right: ')
                .concat(l, 'px ')
                .concat(n, ';\n  }\n  \n  .')
                .concat(nC, ' {\n    margin-right: ')
                .concat(l, 'px ')
                .concat(n, ';\n  }\n  \n  .')
                .concat(nN, ' .')
                .concat(nN, ' {\n    right: 0 ')
                .concat(n, ';\n  }\n  \n  .')
                .concat(nC, ' .')
                .concat(nC, ' {\n    margin-right: 0 ')
                .concat(n, ';\n  }\n  \n  body[')
                .concat(n$, '] {\n    ')
                .concat('--removed-body-scroll-bar-size', ': ')
                .concat(l, 'px;\n  }\n')
            );
          },
          nB = function () {
            var e = parseInt(document.body.getAttribute(n$) || '0', 10);
            return isFinite(e) ? e : 0;
          },
          nU = function () {
            l.useEffect(function () {
              return (
                document.body.setAttribute(n$, (nB() + 1).toString()),
                function () {
                  var e = nB() - 1;
                  e <= 0
                    ? document.body.removeAttribute(n$)
                    : document.body.setAttribute(n$, e.toString());
                }
              );
            }, []);
          },
          nG = function (e) {
            var t = e.noRelative,
              r = e.noImportant,
              n = e.gapMode,
              o = void 0 === n ? 'margin' : n;
            nU();
            var a = l.useMemo(
              function () {
                return nW(o);
              },
              [o]
            );
            return l.createElement(nz, { styles: nH(a, !t, o, r ? '' : '!important') });
          },
          nV = !1;
        if ('undefined' != typeof window)
          try {
            var nq = Object.defineProperty({}, 'passive', {
              get: function () {
                return (nV = !0), !0;
              },
            });
            window.addEventListener('test', nq, nq), window.removeEventListener('test', nq, nq);
          } catch (e) {
            nV = !1;
          }
        var nX = !!nV && { passive: !1 },
          nK = function (e, t) {
            if (!(e instanceof Element)) return !1;
            var r = window.getComputedStyle(e);
            return (
              'hidden' !== r[t] &&
              (r.overflowY !== r.overflowX || 'TEXTAREA' === e.tagName || 'visible' !== r[t])
            );
          },
          nY = function (e, t) {
            var r = t.ownerDocument,
              n = t;
            do {
              if (
                ('undefined' != typeof ShadowRoot && n instanceof ShadowRoot && (n = n.host),
                nZ(e, n))
              ) {
                var o = nJ(e, n);
                if (o[1] > o[2]) return !0;
              }
              n = n.parentNode;
            } while (n && n !== r.body);
            return !1;
          },
          nZ = function (e, t) {
            return 'v' === e ? nK(t, 'overflowY') : nK(t, 'overflowX');
          },
          nJ = function (e, t) {
            return 'v' === e
              ? [t.scrollTop, t.scrollHeight, t.clientHeight]
              : [t.scrollLeft, t.scrollWidth, t.clientWidth];
          },
          nQ = function (e, t, r, n, o) {
            var a,
              i = ((a = window.getComputedStyle(t).direction), 'h' === e && 'rtl' === a ? -1 : 1),
              l = i * n,
              s = r.target,
              c = t.contains(s),
              d = !1,
              u = l > 0,
              f = 0,
              p = 0;
            do {
              var m = nJ(e, s),
                h = m[0],
                v = m[1] - m[2] - i * h;
              (h || v) && nZ(e, s) && ((f += v), (p += h)),
                (s = s instanceof ShadowRoot ? s.host : s.parentNode);
            } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)));
            return (
              u && ((o && 1 > Math.abs(f)) || (!o && l > f))
                ? (d = !0)
                : !u && ((o && 1 > Math.abs(p)) || (!o && -l > p)) && (d = !0),
              d
            );
          },
          n0 = function (e) {
            return 'changedTouches' in e
              ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
              : [0, 0];
          },
          n1 = function (e) {
            return [e.deltaX, e.deltaY];
          },
          n2 = function (e) {
            return e && 'current' in e ? e.current : e;
          },
          n4 = 0,
          n6 = [];
        let n3 =
          ((n = function (e) {
            var t = l.useRef([]),
              r = l.useRef([0, 0]),
              n = l.useRef(),
              o = l.useState(n4++)[0],
              a = l.useState(n_)[0],
              i = l.useRef(e);
            l.useEffect(
              function () {
                i.current = e;
              },
              [e]
            ),
              l.useEffect(
                function () {
                  if (e.inert) {
                    document.body.classList.add('block-interactivity-'.concat(o));
                    var t = (0, nj.fX)([e.lockRef.current], (e.shards || []).map(n2), !0).filter(
                      Boolean
                    );
                    return (
                      t.forEach(function (e) {
                        return e.classList.add('allow-interactivity-'.concat(o));
                      }),
                      function () {
                        document.body.classList.remove('block-interactivity-'.concat(o)),
                          t.forEach(function (e) {
                            return e.classList.remove('allow-interactivity-'.concat(o));
                          });
                      }
                    );
                  }
                },
                [e.inert, e.lockRef.current, e.shards]
              );
            var s = l.useCallback(function (e, t) {
                if (('touches' in e && 2 === e.touches.length) || ('wheel' === e.type && e.ctrlKey))
                  return !i.current.allowPinchZoom;
                var o,
                  a = n0(e),
                  l = r.current,
                  s = 'deltaX' in e ? e.deltaX : l[0] - a[0],
                  c = 'deltaY' in e ? e.deltaY : l[1] - a[1],
                  d = e.target,
                  u = Math.abs(s) > Math.abs(c) ? 'h' : 'v';
                if ('touches' in e && 'h' === u && 'range' === d.type) return !1;
                var f = nY(u, d);
                if (!f) return !0;
                if ((f ? (o = u) : ((o = 'v' === u ? 'h' : 'v'), (f = nY(u, d))), !f)) return !1;
                if ((!n.current && 'changedTouches' in e && (s || c) && (n.current = o), !o))
                  return !0;
                var p = n.current || o;
                return nQ(p, t, e, 'h' === p ? s : c, !0);
              }, []),
              c = l.useCallback(function (e) {
                if (n6.length && n6[n6.length - 1] === a) {
                  var r = 'deltaY' in e ? n1(e) : n0(e),
                    n = t.current.filter(function (t) {
                      var n;
                      return (
                        t.name === e.type &&
                        (t.target === e.target || e.target === t.shadowParent) &&
                        ((n = t.delta), n[0] === r[0] && n[1] === r[1])
                      );
                    })[0];
                  if (n && n.should) {
                    e.cancelable && e.preventDefault();
                    return;
                  }
                  if (!n) {
                    var o = (i.current.shards || [])
                      .map(n2)
                      .filter(Boolean)
                      .filter(function (t) {
                        return t.contains(e.target);
                      });
                    (o.length > 0 ? s(e, o[0]) : !i.current.noIsolation) &&
                      e.cancelable &&
                      e.preventDefault();
                  }
                }
              }, []),
              d = l.useCallback(function (e, r, n, o) {
                var a = {
                  name: e,
                  delta: r,
                  target: n,
                  should: o,
                  shadowParent: (function (e) {
                    for (var t = null; null !== e; )
                      e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
                    return t;
                  })(n),
                };
                t.current.push(a),
                  setTimeout(function () {
                    t.current = t.current.filter(function (e) {
                      return e !== a;
                    });
                  }, 1);
              }, []),
              u = l.useCallback(function (e) {
                (r.current = n0(e)), (n.current = void 0);
              }, []),
              f = l.useCallback(function (t) {
                d(t.type, n1(t), t.target, s(t, e.lockRef.current));
              }, []),
              p = l.useCallback(function (t) {
                d(t.type, n0(t), t.target, s(t, e.lockRef.current));
              }, []);
            l.useEffect(function () {
              return (
                n6.push(a),
                e.setCallbacks({ onScrollCapture: f, onWheelCapture: f, onTouchMoveCapture: p }),
                document.addEventListener('wheel', c, nX),
                document.addEventListener('touchmove', c, nX),
                document.addEventListener('touchstart', u, nX),
                function () {
                  (n6 = n6.filter(function (e) {
                    return e !== a;
                  })),
                    document.removeEventListener('wheel', c, nX),
                    document.removeEventListener('touchmove', c, nX),
                    document.removeEventListener('touchstart', u, nX);
                }
              );
            }, []);
            var m = e.removeScrollBar,
              h = e.inert;
            return l.createElement(
              l.Fragment,
              null,
              h
                ? l.createElement(a, {
                    styles: '\n  .block-interactivity-'
                      .concat(o, ' {pointer-events: none;}\n  .allow-interactivity-')
                      .concat(o, ' {pointer-events: all;}\n'),
                  })
                : null,
              m ? l.createElement(nG, { gapMode: e.gapMode }) : null
            );
          }),
          nP.useMedium(n),
          nL);
        var n8 = l.forwardRef(function (e, t) {
          return l.createElement(nT, (0, nj.Cl)({}, e, { ref: t, sideCar: n3 }));
        });
        n8.classNames = nT.classNames;
        var n5 = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
          n7 = [' ', 'Enter'],
          n9 = 'Select',
          [oe, ot, or] = eE(n9),
          [on, oo] = _(n9, [or, r8]),
          oa = r8(),
          [oi, ol] = on(n9),
          [os, oc] = on(n9),
          od = e => {
            let {
                __scopeSelect: t,
                children: r,
                open: n,
                defaultOpen: o,
                onOpenChange: a,
                value: s,
                defaultValue: c,
                onValueChange: d,
                dir: u,
                name: f,
                autoComplete: p,
                disabled: m,
                required: h,
                form: v,
              } = e,
              g = oa(t),
              [x, y] = l.useState(null),
              [w, b] = l.useState(null),
              [j, N] = l.useState(!1),
              C = F(u),
              [E, S] = eA({ prop: n, defaultProp: o ?? !1, onChange: a, caller: n9 }),
              [R, k] = eA({ prop: s, defaultProp: c, onChange: d, caller: n9 }),
              P = l.useRef(null),
              A = !x || v || !!x.closest('form'),
              [T, L] = l.useState(new Set()),
              D = Array.from(T)
                .map(e => e.props.value)
                .join(';');
            return (0, i.jsx)(r9, {
              ...g,
              children: (0, i.jsxs)(oi, {
                required: h,
                scope: t,
                trigger: x,
                onTriggerChange: y,
                valueNode: w,
                onValueNodeChange: b,
                valueNodeHasChildren: j,
                onValueNodeHasChildrenChange: N,
                contentId: eD(),
                value: R,
                onValueChange: k,
                open: E,
                onOpenChange: S,
                dir: C,
                triggerPointerDownPosRef: P,
                disabled: m,
                children: [
                  (0, i.jsx)(oe.Provider, {
                    scope: t,
                    children: (0, i.jsx)(os, {
                      scope: e.__scopeSelect,
                      onNativeOptionAdd: l.useCallback(e => {
                        L(t => new Set(t).add(e));
                      }, []),
                      onNativeOptionRemove: l.useCallback(e => {
                        L(t => {
                          let r = new Set(t);
                          return r.delete(e), r;
                        });
                      }, []),
                      children: r,
                    }),
                  }),
                  A
                    ? (0, i.jsxs)(
                        oK,
                        {
                          'aria-hidden': !0,
                          required: h,
                          tabIndex: -1,
                          name: f,
                          autoComplete: p,
                          value: R,
                          onChange: e => k(e.target.value),
                          disabled: m,
                          form: v,
                          children: [
                            void 0 === R ? (0, i.jsx)('option', { value: '' }) : null,
                            Array.from(T),
                          ],
                        },
                        D
                      )
                    : null,
                ],
              }),
            });
          };
        od.displayName = n9;
        var ou = 'SelectTrigger',
          of = l.forwardRef((e, t) => {
            let { __scopeSelect: r, disabled: n = !1, ...o } = e,
              a = oa(r),
              s = ol(ou, r),
              c = s.disabled || n,
              d = (0, T.s)(t, s.onTriggerChange),
              u = ot(r),
              f = l.useRef('touch'),
              [p, m, h] = oZ(e => {
                let t = u().filter(e => !e.disabled),
                  r = t.find(e => e.value === s.value),
                  n = oJ(t, e, r);
                void 0 !== n && s.onValueChange(n.value);
              }),
              v = e => {
                c || (s.onOpenChange(!0), h()),
                  e &&
                    (s.triggerPointerDownPosRef.current = {
                      x: Math.round(e.pageX),
                      y: Math.round(e.pageY),
                    });
              };
            return (0, i.jsx)(nt, {
              asChild: !0,
              ...a,
              children: (0, i.jsx)(A.sG.button, {
                type: 'button',
                role: 'combobox',
                'aria-controls': s.contentId,
                'aria-expanded': s.open,
                'aria-required': s.required,
                'aria-autocomplete': 'none',
                dir: s.dir,
                'data-state': s.open ? 'open' : 'closed',
                disabled: c,
                'data-disabled': c ? '' : void 0,
                'data-placeholder': oY(s.value) ? '' : void 0,
                ...o,
                ref: d,
                onClick: z(o.onClick, e => {
                  e.currentTarget.focus(), 'mouse' !== f.current && v(e);
                }),
                onPointerDown: z(o.onPointerDown, e => {
                  f.current = e.pointerType;
                  let t = e.target;
                  t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
                    0 === e.button &&
                      !1 === e.ctrlKey &&
                      'mouse' === e.pointerType &&
                      (v(e), e.preventDefault());
                }),
                onKeyDown: z(o.onKeyDown, e => {
                  let t = '' !== p.current;
                  e.ctrlKey || e.altKey || e.metaKey || 1 !== e.key.length || m(e.key),
                    (!t || ' ' !== e.key) && n5.includes(e.key) && (v(), e.preventDefault());
                }),
              }),
            });
          });
        of.displayName = ou;
        var op = 'SelectValue',
          om = l.forwardRef((e, t) => {
            let {
                __scopeSelect: r,
                className: n,
                style: o,
                children: a,
                placeholder: l = '',
                ...s
              } = e,
              c = ol(op, r),
              { onValueNodeHasChildrenChange: d } = c,
              u = void 0 !== a,
              f = (0, T.s)(t, c.onValueNodeChange);
            return (
              L(() => {
                d(u);
              }, [d, u]),
              (0, i.jsx)(A.sG.span, {
                ...s,
                ref: f,
                style: { pointerEvents: 'none' },
                children: oY(c.value) ? (0, i.jsx)(i.Fragment, { children: l }) : a,
              })
            );
          });
        om.displayName = op;
        var oh = l.forwardRef((e, t) => {
          let { __scopeSelect: r, children: n, ...o } = e;
          return (0, i.jsx)(A.sG.span, { 'aria-hidden': !0, ...o, ref: t, children: n || '▼' });
        });
        oh.displayName = 'SelectIcon';
        var ov = e => (0, i.jsx)(nf, { asChild: !0, ...e });
        ov.displayName = 'SelectPortal';
        var og = 'SelectContent',
          ox = l.forwardRef((e, t) => {
            let r = ol(og, e.__scopeSelect),
              [n, o] = l.useState();
            return (L(() => {
              o(new DocumentFragment());
            }, []),
            r.open)
              ? (0, i.jsx)(oj, { ...e, ref: t })
              : n
                ? tL.createPortal(
                    (0, i.jsx)(oy, {
                      scope: e.__scopeSelect,
                      children: (0, i.jsx)(oe.Slot, {
                        scope: e.__scopeSelect,
                        children: (0, i.jsx)('div', { children: e.children }),
                      }),
                    }),
                    n
                  )
                : null;
          });
        ox.displayName = og;
        var [oy, ow] = on(og),
          ob = (0, eC.TL)('SelectContent.RemoveScroll'),
          oj = l.forwardRef((e, t) => {
            let {
                __scopeSelect: r,
                position: n = 'item-aligned',
                onCloseAutoFocus: o,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                side: c,
                sideOffset: d,
                align: u,
                alignOffset: f,
                arrowPadding: p,
                collisionBoundary: m,
                collisionPadding: h,
                sticky: v,
                hideWhenDetached: g,
                avoidCollisions: x,
                ...y
              } = e,
              w = ol(og, r),
              [b, j] = l.useState(null),
              [N, C] = l.useState(null),
              E = (0, T.s)(t, e => j(e)),
              [S, R] = l.useState(null),
              [k, P] = l.useState(null),
              A = ot(r),
              [L, D] = l.useState(!1),
              M = l.useRef(!1);
            l.useEffect(() => {
              if (b) return nb(b);
            }, [b]),
              l.useEffect(() => {
                let e = document.querySelectorAll('[data-radix-focus-guard]');
                return (
                  document.body.insertAdjacentElement('afterbegin', e[0] ?? tW()),
                  document.body.insertAdjacentElement('beforeend', e[1] ?? tW()),
                  tF++,
                  () => {
                    1 === tF &&
                      document
                        .querySelectorAll('[data-radix-focus-guard]')
                        .forEach(e => e.remove()),
                      tF--;
                  }
                );
              }, []);
            let _ = l.useCallback(
                e => {
                  let [t, ...r] = A().map(e => e.ref.current),
                    [n] = r.slice(-1),
                    o = document.activeElement;
                  for (let r of e)
                    if (
                      r === o ||
                      (r?.scrollIntoView({ block: 'nearest' }),
                      r === t && N && (N.scrollTop = 0),
                      r === n && N && (N.scrollTop = N.scrollHeight),
                      r?.focus(),
                      document.activeElement !== o)
                    )
                      return;
                },
                [A, N]
              ),
              I = l.useCallback(() => _([S, b]), [_, S, b]);
            l.useEffect(() => {
              L && I();
            }, [L, I]);
            let { onOpenChange: O, triggerPointerDownPosRef: F } = w;
            l.useEffect(() => {
              if (b) {
                let e = { x: 0, y: 0 },
                  t = t => {
                    e = {
                      x: Math.abs(Math.round(t.pageX) - (F.current?.x ?? 0)),
                      y: Math.abs(Math.round(t.pageY) - (F.current?.y ?? 0)),
                    };
                  },
                  r = r => {
                    e.x <= 10 && e.y <= 10 ? r.preventDefault() : b.contains(r.target) || O(!1),
                      document.removeEventListener('pointermove', t),
                      (F.current = null);
                  };
                return (
                  null !== F.current &&
                    (document.addEventListener('pointermove', t),
                    document.addEventListener('pointerup', r, { capture: !0, once: !0 })),
                  () => {
                    document.removeEventListener('pointermove', t),
                      document.removeEventListener('pointerup', r, { capture: !0 });
                  }
                );
              }
            }, [b, O, F]),
              l.useEffect(() => {
                let e = () => O(!1);
                return (
                  window.addEventListener('blur', e),
                  window.addEventListener('resize', e),
                  () => {
                    window.removeEventListener('blur', e), window.removeEventListener('resize', e);
                  }
                );
              }, [O]);
            let [W, $] = oZ(e => {
                let t = A().filter(e => !e.disabled),
                  r = t.find(e => e.ref.current === document.activeElement),
                  n = oJ(t, e, r);
                n && setTimeout(() => n.ref.current.focus());
              }),
              H = l.useCallback(
                (e, t, r) => {
                  let n = !M.current && !r;
                  ((void 0 !== w.value && w.value === t) || n) && (R(e), n && (M.current = !0));
                },
                [w.value]
              ),
              B = l.useCallback(() => b?.focus(), [b]),
              U = l.useCallback(
                (e, t, r) => {
                  let n = !M.current && !r;
                  ((void 0 !== w.value && w.value === t) || n) && P(e);
                },
                [w.value]
              ),
              G = 'popper' === n ? oC : oN,
              V =
                G === oC
                  ? {
                      side: c,
                      sideOffset: d,
                      align: u,
                      alignOffset: f,
                      arrowPadding: p,
                      collisionBoundary: m,
                      collisionPadding: h,
                      sticky: v,
                      hideWhenDetached: g,
                      avoidCollisions: x,
                    }
                  : {};
            return (0, i.jsx)(oy, {
              scope: r,
              content: b,
              viewport: N,
              onViewportChange: C,
              itemRefCallback: H,
              selectedItem: S,
              onItemLeave: B,
              itemTextRefCallback: U,
              focusSelectedItem: I,
              selectedItemText: k,
              position: n,
              isPositioned: L,
              searchRef: W,
              children: (0, i.jsx)(n8, {
                as: ob,
                allowPinchZoom: !0,
                children: (0, i.jsx)(tB, {
                  asChild: !0,
                  trapped: w.open,
                  onMountAutoFocus: e => {
                    e.preventDefault();
                  },
                  onUnmountAutoFocus: z(o, e => {
                    w.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
                  }),
                  children: (0, i.jsx)(t_, {
                    asChild: !0,
                    disableOutsidePointerEvents: !0,
                    onEscapeKeyDown: a,
                    onPointerDownOutside: s,
                    onFocusOutside: e => e.preventDefault(),
                    onDismiss: () => w.onOpenChange(!1),
                    children: (0, i.jsx)(G, {
                      role: 'listbox',
                      id: w.contentId,
                      'data-state': w.open ? 'open' : 'closed',
                      dir: w.dir,
                      onContextMenu: e => e.preventDefault(),
                      ...y,
                      ...V,
                      onPlaced: () => D(!0),
                      ref: E,
                      style: {
                        display: 'flex',
                        flexDirection: 'column',
                        outline: 'none',
                        ...y.style,
                      },
                      onKeyDown: z(y.onKeyDown, e => {
                        let t = e.ctrlKey || e.altKey || e.metaKey;
                        if (
                          ('Tab' === e.key && e.preventDefault(),
                          t || 1 !== e.key.length || $(e.key),
                          ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key))
                        ) {
                          let t = A()
                            .filter(e => !e.disabled)
                            .map(e => e.ref.current);
                          if (
                            (['ArrowUp', 'End'].includes(e.key) && (t = t.slice().reverse()),
                            ['ArrowUp', 'ArrowDown'].includes(e.key))
                          ) {
                            let r = e.target,
                              n = t.indexOf(r);
                            t = t.slice(n + 1);
                          }
                          setTimeout(() => _(t)), e.preventDefault();
                        }
                      }),
                    }),
                  }),
                }),
              }),
            });
          });
        oj.displayName = 'SelectContentImpl';
        var oN = l.forwardRef((e, t) => {
          let { __scopeSelect: r, onPlaced: n, ...o } = e,
            a = ol(og, r),
            s = ow(og, r),
            [c, d] = l.useState(null),
            [u, f] = l.useState(null),
            p = (0, T.s)(t, e => f(e)),
            m = ot(r),
            h = l.useRef(!1),
            v = l.useRef(!0),
            { viewport: g, selectedItem: x, selectedItemText: y, focusSelectedItem: w } = s,
            b = l.useCallback(() => {
              if (a.trigger && a.valueNode && c && u && g && x && y) {
                let e = a.trigger.getBoundingClientRect(),
                  t = u.getBoundingClientRect(),
                  r = a.valueNode.getBoundingClientRect(),
                  o = y.getBoundingClientRect();
                if ('rtl' !== a.dir) {
                  let n = o.left - t.left,
                    a = r.left - n,
                    i = e.left - a,
                    l = e.width + i,
                    s = Math.max(l, t.width),
                    d = W(a, [10, Math.max(10, window.innerWidth - 10 - s)]);
                  (c.style.minWidth = l + 'px'), (c.style.left = d + 'px');
                } else {
                  let n = t.right - o.right,
                    a = window.innerWidth - r.right - n,
                    i = window.innerWidth - e.right - a,
                    l = e.width + i,
                    s = Math.max(l, t.width),
                    d = W(a, [10, Math.max(10, window.innerWidth - 10 - s)]);
                  (c.style.minWidth = l + 'px'), (c.style.right = d + 'px');
                }
                let i = m(),
                  l = window.innerHeight - 20,
                  s = g.scrollHeight,
                  d = window.getComputedStyle(u),
                  f = parseInt(d.borderTopWidth, 10),
                  p = parseInt(d.paddingTop, 10),
                  v = parseInt(d.borderBottomWidth, 10),
                  w = f + p + s + parseInt(d.paddingBottom, 10) + v,
                  b = Math.min(5 * x.offsetHeight, w),
                  j = window.getComputedStyle(g),
                  N = parseInt(j.paddingTop, 10),
                  C = parseInt(j.paddingBottom, 10),
                  E = e.top + e.height / 2 - 10,
                  S = x.offsetHeight / 2,
                  R = f + p + (x.offsetTop + S);
                if (R <= E) {
                  let e = i.length > 0 && x === i[i.length - 1].ref.current;
                  c.style.bottom = '0px';
                  let t = Math.max(
                    l - E,
                    S + (e ? C : 0) + (u.clientHeight - g.offsetTop - g.offsetHeight) + v
                  );
                  c.style.height = R + t + 'px';
                } else {
                  let e = i.length > 0 && x === i[0].ref.current;
                  c.style.top = '0px';
                  let t = Math.max(E, f + g.offsetTop + (e ? N : 0) + S);
                  (c.style.height = t + (w - R) + 'px'), (g.scrollTop = R - E + g.offsetTop);
                }
                (c.style.margin = '10px 0'),
                  (c.style.minHeight = b + 'px'),
                  (c.style.maxHeight = l + 'px'),
                  n?.(),
                  requestAnimationFrame(() => (h.current = !0));
              }
            }, [m, a.trigger, a.valueNode, c, u, g, x, y, a.dir, n]);
          L(() => b(), [b]);
          let [j, N] = l.useState();
          L(() => {
            u && N(window.getComputedStyle(u).zIndex);
          }, [u]);
          let C = l.useCallback(
            e => {
              e && !0 === v.current && (b(), w?.(), (v.current = !1));
            },
            [b, w]
          );
          return (0, i.jsx)(oE, {
            scope: r,
            contentWrapper: c,
            shouldExpandOnScrollRef: h,
            onScrollButtonChange: C,
            children: (0, i.jsx)('div', {
              ref: d,
              style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: j },
              children: (0, i.jsx)(A.sG.div, {
                ...o,
                ref: p,
                style: { boxSizing: 'border-box', maxHeight: '100%', ...o.style },
              }),
            }),
          });
        });
        oN.displayName = 'SelectItemAlignedPosition';
        var oC = l.forwardRef((e, t) => {
          let { __scopeSelect: r, align: n = 'start', collisionPadding: o = 10, ...a } = e,
            l = oa(r);
          return (0, i.jsx)(na, {
            ...l,
            ...a,
            ref: t,
            align: n,
            collisionPadding: o,
            style: {
              boxSizing: 'border-box',
              ...a.style,
              '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
              '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
              '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
              '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
              '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
            },
          });
        });
        oC.displayName = 'SelectPopperPosition';
        var [oE, oS] = on(og, {}),
          oR = 'SelectViewport',
          ok = l.forwardRef((e, t) => {
            let { __scopeSelect: r, nonce: n, ...o } = e,
              a = ow(oR, r),
              s = oS(oR, r),
              c = (0, T.s)(t, a.onViewportChange),
              d = l.useRef(0);
            return (0, i.jsxs)(i.Fragment, {
              children: [
                (0, i.jsx)('style', {
                  dangerouslySetInnerHTML: {
                    __html:
                      '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
                  },
                  nonce: n,
                }),
                (0, i.jsx)(oe.Slot, {
                  scope: r,
                  children: (0, i.jsx)(A.sG.div, {
                    'data-radix-select-viewport': '',
                    role: 'presentation',
                    ...o,
                    ref: c,
                    style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...o.style },
                    onScroll: z(o.onScroll, e => {
                      let t = e.currentTarget,
                        { contentWrapper: r, shouldExpandOnScrollRef: n } = s;
                      if (n?.current && r) {
                        let e = Math.abs(d.current - t.scrollTop);
                        if (e > 0) {
                          let n = window.innerHeight - 20,
                            o = Math.max(parseFloat(r.style.minHeight), parseFloat(r.style.height));
                          if (o < n) {
                            let a = o + e,
                              i = Math.min(n, a),
                              l = a - i;
                            (r.style.height = i + 'px'),
                              '0px' === r.style.bottom &&
                                ((t.scrollTop = l > 0 ? l : 0),
                                (r.style.justifyContent = 'flex-end'));
                          }
                        }
                      }
                      d.current = t.scrollTop;
                    }),
                  }),
                }),
              ],
            });
          });
        ok.displayName = oR;
        var oP = 'SelectGroup',
          [oA, oT] = on(oP);
        l.forwardRef((e, t) => {
          let { __scopeSelect: r, ...n } = e,
            o = eD();
          return (0, i.jsx)(oA, {
            scope: r,
            id: o,
            children: (0, i.jsx)(A.sG.div, { role: 'group', 'aria-labelledby': o, ...n, ref: t }),
          });
        }).displayName = oP;
        var oL = 'SelectLabel',
          oD = l.forwardRef((e, t) => {
            let { __scopeSelect: r, ...n } = e,
              o = oT(oL, r);
            return (0, i.jsx)(A.sG.div, { id: o.id, ...n, ref: t });
          });
        oD.displayName = oL;
        var oM = 'SelectItem',
          [o_, oI] = on(oM),
          oO = l.forwardRef((e, t) => {
            let { __scopeSelect: r, value: n, disabled: o = !1, textValue: a, ...s } = e,
              c = ol(oM, r),
              d = ow(oM, r),
              u = c.value === n,
              [f, p] = l.useState(a ?? ''),
              [m, h] = l.useState(!1),
              v = (0, T.s)(t, e => d.itemRefCallback?.(e, n, o)),
              g = eD(),
              x = l.useRef('touch'),
              y = () => {
                o || (c.onValueChange(n), c.onOpenChange(!1));
              };
            if ('' === n)
              throw Error(
                'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
              );
            return (0, i.jsx)(o_, {
              scope: r,
              value: n,
              disabled: o,
              textId: g,
              isSelected: u,
              onItemTextChange: l.useCallback(e => {
                p(t => t || (e?.textContent ?? '').trim());
              }, []),
              children: (0, i.jsx)(oe.ItemSlot, {
                scope: r,
                value: n,
                disabled: o,
                textValue: f,
                children: (0, i.jsx)(A.sG.div, {
                  role: 'option',
                  'aria-labelledby': g,
                  'data-highlighted': m ? '' : void 0,
                  'aria-selected': u && m,
                  'data-state': u ? 'checked' : 'unchecked',
                  'aria-disabled': o || void 0,
                  'data-disabled': o ? '' : void 0,
                  tabIndex: o ? void 0 : -1,
                  ...s,
                  ref: v,
                  onFocus: z(s.onFocus, () => h(!0)),
                  onBlur: z(s.onBlur, () => h(!1)),
                  onClick: z(s.onClick, () => {
                    'mouse' !== x.current && y();
                  }),
                  onPointerUp: z(s.onPointerUp, () => {
                    'mouse' === x.current && y();
                  }),
                  onPointerDown: z(s.onPointerDown, e => {
                    x.current = e.pointerType;
                  }),
                  onPointerMove: z(s.onPointerMove, e => {
                    (x.current = e.pointerType),
                      o
                        ? d.onItemLeave?.()
                        : 'mouse' === x.current && e.currentTarget.focus({ preventScroll: !0 });
                  }),
                  onPointerLeave: z(s.onPointerLeave, e => {
                    e.currentTarget === document.activeElement && d.onItemLeave?.();
                  }),
                  onKeyDown: z(s.onKeyDown, e => {
                    (d.searchRef?.current === '' || ' ' !== e.key) &&
                      (n7.includes(e.key) && y(), ' ' === e.key && e.preventDefault());
                  }),
                }),
              }),
            });
          });
        oO.displayName = oM;
        var oF = 'SelectItemText',
          oW = l.forwardRef((e, t) => {
            let { __scopeSelect: r, className: n, style: o, ...a } = e,
              s = ol(oF, r),
              c = ow(oF, r),
              d = oI(oF, r),
              u = oc(oF, r),
              [f, p] = l.useState(null),
              m = (0, T.s)(
                t,
                e => p(e),
                d.onItemTextChange,
                e => c.itemTextRefCallback?.(e, d.value, d.disabled)
              ),
              h = f?.textContent,
              v = l.useMemo(
                () =>
                  (0, i.jsx)(
                    'option',
                    { value: d.value, disabled: d.disabled, children: h },
                    d.value
                  ),
                [d.disabled, d.value, h]
              ),
              { onNativeOptionAdd: g, onNativeOptionRemove: x } = u;
            return (
              L(() => (g(v), () => x(v)), [g, x, v]),
              (0, i.jsxs)(i.Fragment, {
                children: [
                  (0, i.jsx)(A.sG.span, { id: d.textId, ...a, ref: m }),
                  d.isSelected && s.valueNode && !s.valueNodeHasChildren
                    ? tL.createPortal(a.children, s.valueNode)
                    : null,
                ],
              })
            );
          });
        oW.displayName = oF;
        var oz = 'SelectItemIndicator',
          o$ = l.forwardRef((e, t) => {
            let { __scopeSelect: r, ...n } = e;
            return oI(oz, r).isSelected
              ? (0, i.jsx)(A.sG.span, { 'aria-hidden': !0, ...n, ref: t })
              : null;
          });
        o$.displayName = oz;
        var oH = 'SelectScrollUpButton',
          oB = l.forwardRef((e, t) => {
            let r = ow(oH, e.__scopeSelect),
              n = oS(oH, e.__scopeSelect),
              [o, a] = l.useState(!1),
              s = (0, T.s)(t, n.onScrollButtonChange);
            return (
              L(() => {
                if (r.viewport && r.isPositioned) {
                  let e = function () {
                      a(t.scrollTop > 0);
                    },
                    t = r.viewport;
                  return (
                    e(), t.addEventListener('scroll', e), () => t.removeEventListener('scroll', e)
                  );
                }
              }, [r.viewport, r.isPositioned]),
              o
                ? (0, i.jsx)(oV, {
                    ...e,
                    ref: s,
                    onAutoScroll: () => {
                      let { viewport: e, selectedItem: t } = r;
                      e && t && (e.scrollTop = e.scrollTop - t.offsetHeight);
                    },
                  })
                : null
            );
          });
        oB.displayName = oH;
        var oU = 'SelectScrollDownButton',
          oG = l.forwardRef((e, t) => {
            let r = ow(oU, e.__scopeSelect),
              n = oS(oU, e.__scopeSelect),
              [o, a] = l.useState(!1),
              s = (0, T.s)(t, n.onScrollButtonChange);
            return (
              L(() => {
                if (r.viewport && r.isPositioned) {
                  let e = function () {
                      let e = t.scrollHeight - t.clientHeight;
                      a(Math.ceil(t.scrollTop) < e);
                    },
                    t = r.viewport;
                  return (
                    e(), t.addEventListener('scroll', e), () => t.removeEventListener('scroll', e)
                  );
                }
              }, [r.viewport, r.isPositioned]),
              o
                ? (0, i.jsx)(oV, {
                    ...e,
                    ref: s,
                    onAutoScroll: () => {
                      let { viewport: e, selectedItem: t } = r;
                      e && t && (e.scrollTop = e.scrollTop + t.offsetHeight);
                    },
                  })
                : null
            );
          });
        oG.displayName = oU;
        var oV = l.forwardRef((e, t) => {
            let { __scopeSelect: r, onAutoScroll: n, ...o } = e,
              a = ow('SelectScrollButton', r),
              s = l.useRef(null),
              c = ot(r),
              d = l.useCallback(() => {
                null !== s.current && (window.clearInterval(s.current), (s.current = null));
              }, []);
            return (
              l.useEffect(() => () => d(), [d]),
              L(() => {
                let e = c().find(e => e.ref.current === document.activeElement);
                e?.ref.current?.scrollIntoView({ block: 'nearest' });
              }, [c]),
              (0, i.jsx)(A.sG.div, {
                'aria-hidden': !0,
                ...o,
                ref: t,
                style: { flexShrink: 0, ...o.style },
                onPointerDown: z(o.onPointerDown, () => {
                  null === s.current && (s.current = window.setInterval(n, 50));
                }),
                onPointerMove: z(o.onPointerMove, () => {
                  a.onItemLeave?.(), null === s.current && (s.current = window.setInterval(n, 50));
                }),
                onPointerLeave: z(o.onPointerLeave, () => {
                  d();
                }),
              })
            );
          }),
          oq = l.forwardRef((e, t) => {
            let { __scopeSelect: r, ...n } = e;
            return (0, i.jsx)(A.sG.div, { 'aria-hidden': !0, ...n, ref: t });
          });
        oq.displayName = 'SelectSeparator';
        var oX = 'SelectArrow';
        l.forwardRef((e, t) => {
          let { __scopeSelect: r, ...n } = e,
            o = oa(r),
            a = ol(oX, r),
            l = ow(oX, r);
          return a.open && 'popper' === l.position ? (0, i.jsx)(ns, { ...o, ...n, ref: t }) : null;
        }).displayName = oX;
        var oK = l.forwardRef(({ __scopeSelect: e, value: t, ...r }, n) => {
          let o = l.useRef(null),
            a = (0, T.s)(n, o),
            s = tv(t);
          return (
            l.useEffect(() => {
              let e = o.current;
              if (!e) return;
              let r = Object.getOwnPropertyDescriptor(
                window.HTMLSelectElement.prototype,
                'value'
              ).set;
              if (s !== t && r) {
                let n = new Event('change', { bubbles: !0 });
                r.call(e, t), e.dispatchEvent(n);
              }
            }, [s, t]),
            (0, i.jsx)(A.sG.select, { ...r, style: { ...np, ...r.style }, ref: a, defaultValue: t })
          );
        });
        function oY(e) {
          return '' === e || void 0 === e;
        }
        function oZ(e) {
          let t = I(e),
            r = l.useRef(''),
            n = l.useRef(0),
            o = l.useCallback(
              e => {
                let o = r.current + e;
                t(o),
                  (function e(t) {
                    (r.current = t),
                      window.clearTimeout(n.current),
                      '' !== t && (n.current = window.setTimeout(() => e(''), 1e3));
                  })(o);
              },
              [t]
            ),
            a = l.useCallback(() => {
              (r.current = ''), window.clearTimeout(n.current);
            }, []);
          return l.useEffect(() => () => window.clearTimeout(n.current), []), [r, o, a];
        }
        function oJ(e, t, r) {
          var n, o;
          let a = t.length > 1 && Array.from(t).every(e => e === t[0]) ? t[0] : t,
            i = r ? e.indexOf(r) : -1,
            l = ((n = e), (o = Math.max(i, 0)), n.map((e, t) => n[(o + t) % n.length]));
          1 === a.length && (l = l.filter(e => e !== r));
          let s = l.find(e => e.textValue.toLowerCase().startsWith(a.toLowerCase()));
          return s !== r ? s : void 0;
        }
        oK.displayName = 'SelectBubbleInput';
        let oQ = C('chevron-up', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]]),
          o0 = l.forwardRef(({ className: e, children: t, ...r }, n) =>
            (0, i.jsxs)(of, {
              ref: n,
              className: (0, R.cn)(
                'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
                e
              ),
              ...r,
              children: [
                t,
                (0, i.jsx)(oh, {
                  asChild: !0,
                  children: (0, i.jsx)(tu, { className: 'h-4 w-4 opacity-50' }),
                }),
              ],
            })
          );
        o0.displayName = of.displayName;
        let o1 = l.forwardRef(({ className: e, ...t }, r) =>
          (0, i.jsx)(oB, {
            ref: r,
            className: (0, R.cn)('flex cursor-default items-center justify-center py-1', e),
            ...t,
            children: (0, i.jsx)(oQ, { className: 'h-4 w-4' }),
          })
        );
        o1.displayName = oB.displayName;
        let o2 = l.forwardRef(({ className: e, ...t }, r) =>
          (0, i.jsx)(oG, {
            ref: r,
            className: (0, R.cn)('flex cursor-default items-center justify-center py-1', e),
            ...t,
            children: (0, i.jsx)(tu, { className: 'h-4 w-4' }),
          })
        );
        o2.displayName = oG.displayName;
        let o4 = l.forwardRef(({ className: e, children: t, position: r = 'popper', ...n }, o) =>
          (0, i.jsx)(ov, {
            children: (0, i.jsxs)(ox, {
              ref: o,
              className: (0, R.cn)(
                'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
                'popper' === r &&
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                e
              ),
              position: r,
              ...n,
              children: [
                (0, i.jsx)(o1, {}),
                (0, i.jsx)(ok, {
                  className: (0, R.cn)(
                    'p-1',
                    'popper' === r &&
                      'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                  ),
                  children: t,
                }),
                (0, i.jsx)(o2, {}),
              ],
            }),
          })
        );
        (o4.displayName = ox.displayName),
          (l.forwardRef(({ className: e, ...t }, r) =>
            (0, i.jsx)(oD, {
              ref: r,
              className: (0, R.cn)('px-2 py-1.5 text-sm font-semibold', e),
              ...t,
            })
          ).displayName = oD.displayName);
        let o6 = l.forwardRef(({ className: e, children: t, ...r }, n) =>
          (0, i.jsxs)(oO, {
            ref: n,
            className: (0, R.cn)(
              'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              e
            ),
            ...r,
            children: [
              (0, i.jsx)('span', {
                className: 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center',
                children: (0, i.jsx)(o$, { children: (0, i.jsx)(tP, { className: 'h-4 w-4' }) }),
              }),
              (0, i.jsx)(oW, { children: t }),
            ],
          })
        );
        function o3({
          tags: e,
          activeTags: t,
          categories: r,
          activeCategory: n,
          sortOrder: o = 'latest',
          onFilterChangeAction: a,
          onClearFiltersAction: s,
        }) {
          let u = (0, d.c3)('common'),
            { locale: f } = (0, c.useParams)(),
            [p, m] = (0, l.useState)(t || []),
            [h, v] = (0, l.useState)(n || null),
            [g, x] = (0, l.useState)(o),
            y = (e, t) => ('en' === t ? e.name_en || e.name : ('zh' === t && e.name_zh) || e.name),
            w = (e, t) => ('en' === t ? e.name_en || e.name : ('zh' === t && e.name_zh) || e.name),
            b = (e, t) => {
              let r;
              m((r = t ? [...p, e] : p.filter(t => t !== e))), a({ type: 'tags', value: r });
            },
            j = e => {
              v(e), a({ type: 'category', value: e || '' });
            },
            N = t.length > 0 || n;
          return (0, i.jsxs)('div', {
            className: 'bg-gray-800 rounded-lg p-4 sticky top-4',
            children: [
              (0, i.jsxs)('div', {
                className: 'flex justify-between items-center mb-4',
                children: [
                  (0, i.jsx)('h3', {
                    className: 'text-lg font-semibold text-white',
                    children: u('filters'),
                  }),
                  N &&
                    (0, i.jsxs)(th.$, {
                      variant: 'ghost',
                      size: 'sm',
                      onClick: s,
                      className: 'text-cyan-500 hover:text-cyan-400 hover:bg-gray-700 p-1 h-auto',
                      children: [(0, i.jsx)(eN, { className: 'h-4 w-4 mr-1' }), u('clear')],
                    }),
                ],
              }),
              N &&
                (0, i.jsxs)('div', {
                  className: 'mb-4 pb-4 border-b border-gray-700',
                  children: [
                    (0, i.jsxs)('p', {
                      className: 'text-sm text-gray-400 mb-2',
                      children: [u('activeFilters'), ':'],
                    }),
                    (0, i.jsxs)('div', {
                      className: 'flex flex-wrap gap-2',
                      children: [
                        t.map(t => {
                          let r = e.find(e => e.slug === t);
                          return (0, i.jsxs)(
                            P,
                            {
                              variant: 'secondary',
                              className:
                                'bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer',
                              onClick: () => b(t, !1),
                              children: [
                                r ? w(r, f) : t,
                                (0, i.jsx)(eN, { className: 'ml-1 h-3 w-3' }),
                              ],
                            },
                            t
                          );
                        }),
                        n &&
                          (() => {
                            let e = r.find(e => e.slug === n);
                            return (0, i.jsxs)(
                              P,
                              {
                                variant: 'secondary',
                                className:
                                  'bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer',
                                onClick: () => j(null),
                                children: [
                                  e ? y(e, f) : n,
                                  (0, i.jsx)(eN, { className: 'ml-1 h-3 w-3' }),
                                ],
                              },
                              n
                            );
                          })(),
                      ],
                    }),
                  ],
                }),
              (0, i.jsxs)(e0, {
                type: 'multiple',
                defaultValue: ['tags', 'category', 'sort'],
                className: 'w-full',
                children: [
                  (0, i.jsxs)(tf, {
                    value: 'tags',
                    className: 'border-b border-gray-700',
                    children: [
                      (0, i.jsx)(tp, {
                        className: 'text-base py-3 hover:no-underline',
                        children: (0, i.jsxs)('div', {
                          className: 'flex items-center',
                          children: [
                            (0, i.jsx)(E, { className: 'h-4 w-4 mr-2' }),
                            (0, i.jsx)('span', { children: u('tags') }),
                          ],
                        }),
                      }),
                      (0, i.jsx)(tm, {
                        children: (0, i.jsx)('div', {
                          className: 'grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar',
                          children: e.map(e =>
                            (0, i.jsxs)(
                              tT.J,
                              {
                                className:
                                  'flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors',
                                children: [
                                  (0, i.jsx)(tA, {
                                    checked: p.includes(e.slug),
                                    onCheckedChange: t => b(e.slug, t),
                                    className:
                                      'data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600',
                                  }),
                                  (0, i.jsx)('span', { className: 'truncate', children: w(e, f) }),
                                ],
                              },
                              e._id
                            )
                          ),
                        }),
                      }),
                    ],
                  }),
                  (0, i.jsxs)(tf, {
                    value: 'category',
                    className: 'border-b border-gray-700',
                    children: [
                      (0, i.jsx)(tp, {
                        className: 'text-base py-3 hover:no-underline',
                        children: (0, i.jsxs)('div', {
                          className: 'flex items-center',
                          children: [
                            (0, i.jsx)('svg', {
                              xmlns: 'http://www.w3.org/2000/svg',
                              className: 'h-4 w-4 mr-2',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              strokeWidth: 2,
                              children: (0, i.jsx)('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
                              }),
                            }),
                            (0, i.jsx)('span', { children: u('categories') }),
                          ],
                        }),
                      }),
                      (0, i.jsx)(tm, {
                        children: (0, i.jsxs)('div', {
                          className: 'grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar',
                          children: [
                            (0, i.jsxs)(
                              tT.J,
                              {
                                className:
                                  'flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors',
                                children: [
                                  (0, i.jsx)(tA, {
                                    checked: !h,
                                    onCheckedChange: () => j(null),
                                    className:
                                      'data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600',
                                  }),
                                  u('allCategories'),
                                ],
                              },
                              'all-categories'
                            ),
                            r.map(e =>
                              (0, i.jsxs)(
                                tT.J,
                                {
                                  className:
                                    'flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors',
                                  children: [
                                    (0, i.jsx)(tA, {
                                      checked: h === e.slug,
                                      onCheckedChange: () => j(e.slug),
                                      className:
                                        'data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600',
                                    }),
                                    y(e, f),
                                  ],
                                },
                                e._id
                              )
                            ),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, i.jsxs)(tf, {
                    value: 'sort',
                    className: 'border-b-0',
                    children: [
                      (0, i.jsx)(tp, {
                        className: 'text-base py-3 hover:no-underline',
                        children: (0, i.jsx)('div', {
                          className: 'flex items-center',
                          children: (0, i.jsx)('span', { children: u('sortBy') }),
                        }),
                      }),
                      (0, i.jsx)(tm, {
                        children: (0, i.jsx)('div', {
                          className: 'space-y-4',
                          children: (0, i.jsxs)(od, {
                            value: g,
                            onValueChange: e => {
                              x(e), a({ type: 'sort', value: e });
                            },
                            children: [
                              (0, i.jsx)(o0, {
                                className: 'w-full bg-gray-700 border-gray-600',
                                children: (0, i.jsx)(om, { placeholder: u('selectSortOrder') }),
                              }),
                              (0, i.jsxs)(o4, {
                                className: 'bg-gray-700 border-gray-600',
                                children: [
                                  (0, i.jsx)(o6, { value: 'latest', children: u('newestFirst') }),
                                  (0, i.jsx)(o6, { value: 'oldest', children: u('oldestFirst') }),
                                  (0, i.jsx)(o6, { value: 'popular', children: u('mostPopular') }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }
        (o6.displayName = oO.displayName),
          (l.forwardRef(({ className: e, ...t }, r) =>
            (0, i.jsx)(oq, { ref: r, className: (0, R.cn)('-mx-1 my-1 h-px bg-muted', e), ...t })
          ).displayName = oq.displayName);
        let o8 = ({ value: e, onChange: t, className: r = '' }) => {
          let n = (0, d.c3)('common'),
            o = [
              { label: n('newestFirst'), value: 'latest' },
              { label: n('oldestFirst'), value: 'oldest' },
              { label: n('mostPopular'), value: 'popular' },
            ];
          return (0, i.jsxs)('div', {
            className: `flex items-center gap-2 ${r}`,
            children: [
              (0, i.jsxs)('label', {
                htmlFor: 'sort-selector',
                className: 'text-sm text-gray-300',
                children: [n('sortBy'), ':'],
              }),
              (0, i.jsx)('select', {
                id: 'sort-selector',
                value: e,
                onChange: e => t(e.target.value),
                className: 'px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600',
                children: o.map(e =>
                  (0, i.jsx)('option', { value: e.value, children: e.label }, e.value)
                ),
              }),
            ],
          });
        };
        function o5() {
          return (0, i.jsxs)('div', {
            className: 'bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse',
            children: [
              (0, i.jsx)('div', { className: 'h-48 bg-gray-700' }),
              (0, i.jsxs)('div', {
                className: 'p-6',
                children: [
                  (0, i.jsx)('div', { className: 'h-6 bg-gray-700 rounded w-3/4 mb-4' }),
                  (0, i.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-1/2 mb-2' }),
                  (0, i.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-5/6 mb-2' }),
                  (0, i.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-4/6 mb-4' }),
                  (0, i.jsxs)('div', {
                    className: 'flex justify-between items-center mt-6',
                    children: [
                      (0, i.jsxs)('div', {
                        className: 'flex items-center',
                        children: [
                          (0, i.jsx)('div', { className: 'h-8 w-8 bg-gray-700 rounded-full' }),
                          (0, i.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-24 ml-2' }),
                        ],
                      }),
                      (0, i.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-16' }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }
        var o7 = r(64298);
        let o9 = (e, t = '') => (e ? (Array.isArray(e) ? e[0] || t : e) : t);
        function ae({ searchParams: e }) {
          let t = (0, d.c3)('common'),
            r = (0, c.useParams)().locale,
            n = (0, c.useRouter)(),
            o = o9(e.sort, 'latest'),
            a = o9(e.tag),
            s = o9(e.category),
            p = o9(e.search),
            m = parseInt(o9(e.page, '1')) || 1,
            [h, g] = (0, l.useState)([]),
            [x, y] = (0, l.useState)([]),
            [w, b] = (0, l.useState)([]),
            [j, N] = (0, l.useState)(1),
            [, C] = (0, l.useState)(0),
            [E, S] = (0, l.useState)(!0),
            [R, k] = (0, l.useState)(null),
            P = (e, t) => ('en' === t ? e.name_en || e.name : ('zh' === t && e.name_zh) || e.name);
          (0, l.useCallback)(async () => {
            try {
              S(!0);
              let e = await o7.d_.getAllPosts({
                page: m,
                limit: 10,
                tag: a || void 0,
                category: s || void 0,
                search: p || void 0,
                sort: o,
              });
              g(e.data), N(Math.ceil(e.total / 10)), C(e.total);
            } catch (e) {
              k(e instanceof Error ? e.message : '获取文章失败'), g([]);
            } finally {
              S(!1);
            }
          }, [m, o, a, s, p]);
          let A = (0, l.useMemo)(() => {
              let e = [...h];
              if (
                (a && (e = e.filter(e => e.tags.some(e => e.slug === a))),
                s && (e = e.filter(e => e.category.slug === s)),
                p)
              ) {
                let t = p.toLowerCase();
                e = e.filter(
                  e => e.title.toLowerCase().includes(t) || e.content.toLowerCase().includes(t)
                );
              }
              switch (o) {
                case 'latest':
                  e.sort(
                    (e, t) => new Date(t.createdAt).getTime() - new Date(e.createdAt).getTime()
                  );
                  break;
                case 'oldest':
                  e.sort(
                    (e, t) => new Date(e.createdAt).getTime() - new Date(t.createdAt).getTime()
                  );
                  break;
                case 'popular':
                  e.sort((e, t) => t.views - e.views);
              }
              return e;
            }, [h, o, a, s, p]),
            T = e => {
              n.push(`/${r}?q=${encodeURIComponent(e)}`);
            },
            L = e => {
              if ('category' === e.type) n.push(`/${r}?category=${e.value}`);
              else if ('sort' === e.type) {
                let t = e.value;
                n.push(`/${r}?sort=${t}`);
              } else 'tags' === e.type && n.push(`/${r}?tag=${e.value.join(',')}`);
            },
            D = () => {
              n.push(`/${r}`);
            },
            M = (0, l.useMemo)(() => !!a || !!s || !!p || 'latest' !== o, [a, s, p, o]),
            _ = e => {
              n.push(`/${r}?page=${e}`);
            },
            I = e => (e ? P(e, r) : '');
          return (0, i.jsxs)('main', {
            className: 'min-h-screen bg-gray-900 text-gray-200',
            children: [
              (0, i.jsx)(f.A, {}),
              (0, i.jsx)('section', {
                className:
                  'bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8',
                children: (0, i.jsxs)('div', {
                  className: 'max-w-7xl mx-auto',
                  children: [
                    (0, i.jsx)('h1', {
                      className: 'text-4xl font-extrabold sm:text-6xl',
                      children: t('latestArticles'),
                    }),
                    (0, i.jsx)('p', {
                      className: 'mt-6 text-xl max-w-3xl',
                      children: t('heroSubtitle'),
                    }),
                  ],
                }),
              }),
              (0, i.jsx)('section', {
                className: 'max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8',
                children: (0, i.jsxs)('div', {
                  className: 'flex justify-center flex-wrap gap-4',
                  children: [
                    (0, i.jsx)(u.N_, {
                      href: '/',
                      scroll: !1,
                      onClick: () => n.push(`/${r}`),
                      className: `px-4 py-2 rounded-md ${!s ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`,
                      children: t('allCategories'),
                    }),
                    x.map(e =>
                      (0, i.jsx)(
                        u.N_,
                        {
                          href: `/${r}?category=${e.slug}`,
                          scroll: !1,
                          onClick: () => n.push(`/${r}?category=${e.slug}`),
                          className: `px-4 py-2 rounded-md ${s === e.slug ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`,
                          children: I(e),
                        },
                        e._id
                      )
                    ),
                  ],
                }),
              }),
              (0, i.jsx)('section', {
                className: 'max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8',
                children: (0, i.jsxs)('form', {
                  onSubmit: e => {
                    e.preventDefault(), T(p);
                  },
                  className: 'flex',
                  children: [
                    (0, i.jsx)('input', {
                      type: 'text',
                      placeholder: t('searchPlaceholder'),
                      value: p,
                      onChange: e => n.push(`/${r}?q=${e.target.value}`),
                      className:
                        'w-full px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800 text-white',
                    }),
                    (0, i.jsx)('button', {
                      type: 'submit',
                      className: 'bg-cyan-600 px-4 py-2 rounded-r-md',
                      children: t('search'),
                    }),
                  ],
                }),
              }),
              (0, i.jsx)('div', {
                className: 'md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
                children:
                  w.length > 0 &&
                  (0, i.jsx)(ej, {
                    tags: w,
                    activeTags: [a],
                    onTagsChange: e => {
                      n.push(`/${r}?tag=${e.join(',')}`);
                    },
                  }),
              }),
              (0, i.jsx)('div', {
                className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
                children: (0, i.jsxs)('div', {
                  className: 'grid md:grid-cols-[280px_1fr] gap-8',
                  children: [
                    (0, i.jsx)('div', {
                      className: 'hidden md:block',
                      children: (0, i.jsx)(o3, {
                        tags: w,
                        activeTags: [a],
                        categories: x,
                        activeCategory: s,
                        sortOrder: o,
                        onFilterChangeAction: L,
                        onClearFiltersAction: D,
                      }),
                    }),
                    (0, i.jsxs)('div', {
                      children: [
                        M &&
                          (0, i.jsxs)('div', {
                            className:
                              'bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6',
                            children: [
                              (0, i.jsxs)('div', {
                                className: 'flex flex-wrap gap-2 items-center',
                                children: [
                                  (0, i.jsxs)('span', {
                                    className: 'text-gray-400',
                                    children: [t('filterConditions'), ':'],
                                  }),
                                  a &&
                                    (0, i.jsxs)('span', {
                                      className: 'bg-cyan-600 text-white px-2 py-1 rounded text-sm',
                                      children: [
                                        t('tag'),
                                        ': ',
                                        w.find(e => e.slug === a)?.name || a,
                                      ],
                                    }),
                                  s &&
                                    (0, i.jsxs)('span', {
                                      className: 'bg-cyan-600 text-white px-2 py-1 rounded text-sm',
                                      children: [t('category'), ': ', I(x.find(e => e.slug === s))],
                                    }),
                                  p &&
                                    (0, i.jsxs)('span', {
                                      className: 'bg-cyan-600 text-white px-2 py-1 rounded text-sm',
                                      children: [t('search'), ': ', p],
                                    }),
                                ],
                              }),
                              (0, i.jsx)('button', {
                                onClick: D,
                                className: 'text-cyan-500 hover:text-cyan-400 md:hidden',
                                children: t('clearFilters'),
                              }),
                            ],
                          }),
                        (0, i.jsx)('div', {
                          className: 'flex justify-end mb-6',
                          children: (0, i.jsx)(o8, {
                            value: o,
                            onChange: e => L({ type: 'sort', value: e }),
                            className: 'md:hidden',
                          }),
                        }),
                        (0, i.jsx)('h2', {
                          className: 'text-3xl font-extrabold text-white mb-8',
                          children: s
                            ? `${t('category')}: ${I(x.find(e => e.slug === s))}`
                            : t(M ? 'filterResults' : 'latestArticles'),
                        }),
                        E
                          ? (0, i.jsx)('div', {
                              className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                              children: Array.from({ length: 6 }).map((e, t) =>
                                (0, i.jsx)(o5, {}, t)
                              ),
                            })
                          : R
                            ? (0, i.jsx)('div', {
                                className: 'text-center text-red-400',
                                children: R,
                              })
                            : A.length > 0
                              ? (0, i.jsxs)(i.Fragment, {
                                  children: [
                                    (0, i.jsx)('div', {
                                      className:
                                        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                                      children: A.map(e => (0, i.jsx)(v, { article: e }, e._id)),
                                    }),
                                    j > 1 &&
                                      (0, i.jsxs)('div', {
                                        className: 'flex justify-center mt-10',
                                        children: [
                                          (0, i.jsx)('button', {
                                            onClick: () => _(m - 1),
                                            disabled: 1 === m,
                                            children: t('previousPage'),
                                          }),
                                          (0, i.jsx)('span', {
                                            children: t('pageInfo', { current: m, total: j }),
                                          }),
                                          (0, i.jsx)('button', {
                                            onClick: () => _(m + 1),
                                            disabled: m === j,
                                            children: t('nextPage'),
                                          }),
                                        ],
                                      }),
                                  ],
                                })
                              : (0, i.jsx)('div', {
                                  className: 'text-center text-yellow-300 py-10',
                                  children: t('noArticlesFound'),
                                }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          });
        }
      },
      19121: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
      },
      21820: e => {
        'use strict';
        e.exports = require('os');
      },
      21929: (e, t, r) => {
        'use strict';
        r.d(t, { J: () => c });
        var n = r(60687),
          o = r(43210),
          a = r(78148),
          i = r(24224),
          l = r(4780);
        let s = (0, i.F)(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          ),
          c = o.forwardRef(({ className: e, ...t }, r) =>
            (0, n.jsx)(a.b, { ref: r, className: (0, l.cn)(s(), e), ...t })
          );
        c.displayName = a.b.displayName;
      },
      25324: (e, t, r) => {
        'use strict';
        r.d(t, { N_: () => a });
        var n = r(24448);
        let o = (0, r(85484).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          { Link: a, redirect: i, usePathname: l, useRouter: s, getPathname: c } = (0, n.A)(o);
      },
      26511: () => {},
      27910: e => {
        'use strict';
        e.exports = require('stream');
      },
      28288: (e, t, r) => {
        'use strict';
        r.d(t, { A: () => d });
        var n = r(60687),
          o = r(43210),
          a = r(25324),
          i = r(77618),
          l = r(8610),
          s = r(16189);
        function c() {
          let e = (0, l.Ym)(),
            t = (0, s.useRouter)(),
            r = (0, s.usePathname)(),
            o = n => {
              let o = r.replace(`/${e}`, '') || '/',
                a = `/${n}${o}`;
              t.push(a);
            };
          return (0, n.jsxs)('div', {
            className: 'flex items-center space-x-2',
            children: [
              (0, n.jsx)('button', {
                onClick: () => o('zh'),
                className: `px-2 py-1 text-sm rounded-md ${'zh' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                children: '中文',
              }),
              (0, n.jsx)('button', {
                onClick: () => o('en'),
                className: `px-2 py-1 text-sm rounded-md ${'en' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                children: 'English',
              }),
            ],
          });
        }
        function d() {
          let [e, t] = (0, o.useState)(!1),
            r = (0, i.c3)('nav');
          return (0, n.jsxs)('nav', {
            className: 'bg-white shadow-md',
            children: [
              (0, n.jsx)('div', {
                className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
                children: (0, n.jsxs)('div', {
                  className: 'flex justify-between items-center h-16',
                  children: [
                    (0, n.jsx)('div', {
                      className: 'flex items-center',
                      children: (0, n.jsx)(a.N_, {
                        href: '/',
                        className: 'text-2xl font-bold text-cyan-600',
                        children: 'MyBlog',
                      }),
                    }),
                    (0, n.jsxs)('div', {
                      className: 'hidden md:flex md:space-x-8',
                      children: [
                        (0, n.jsx)(a.N_, {
                          href: '/',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: r('home'),
                        }),
                        (0, n.jsx)(a.N_, {
                          href: '/about',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: r('about'),
                        }),
                        (0, n.jsx)(a.N_, {
                          href: '/contact',
                          className:
                            'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                          children: r('contact'),
                        }),
                        (0, n.jsx)(c, {}),
                      ],
                    }),
                    (0, n.jsx)('div', {
                      className: '-mr-2 flex md:hidden',
                      children: (0, n.jsxs)('button', {
                        onClick: () => t(!e),
                        type: 'button',
                        className:
                          'bg-cyan-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
                        'aria-controls': 'mobile-menu',
                        'aria-expanded': e,
                        children: [
                          (0, n.jsx)('span', { className: 'sr-only', children: 'Open main menu' }),
                          e
                            ? (0, n.jsx)('svg', {
                                className: 'block h-6 w-6',
                                xmlns: 'http://www.w3.org/2000/svg',
                                fill: 'none',
                                viewBox: '0 0 24 24',
                                stroke: 'currentColor',
                                'aria-hidden': 'true',
                                children: (0, n.jsx)('path', {
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  strokeWidth: '2',
                                  d: 'M6 18L18 6M6 6l12 12',
                                }),
                              })
                            : (0, n.jsx)('svg', {
                                className: 'block h-6 w-6',
                                xmlns: 'http://www.w3.org/2000/svg',
                                fill: 'none',
                                viewBox: '0 0 24 24',
                                stroke: 'currentColor',
                                'aria-hidden': 'true',
                                children: (0, n.jsx)('path', {
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
              (0, n.jsx)('div', {
                className: `${e ? 'block' : 'hidden'} md:hidden`,
                id: 'mobile-menu',
                children: (0, n.jsxs)('div', {
                  className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3',
                  children: [
                    (0, n.jsx)(a.N_, {
                      href: '/',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: r('home'),
                    }),
                    (0, n.jsx)(a.N_, {
                      href: '/about',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: r('about'),
                    }),
                    (0, n.jsx)(a.N_, {
                      href: '/contact',
                      className:
                        'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                      children: r('contact'),
                    }),
                    (0, n.jsx)('div', { className: 'px-3 py-2', children: (0, n.jsx)(c, {}) }),
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
      31714: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 45196));
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
      59697: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => n });
        let n = (0, r(12907).registerClientReference)(
          function () {
            throw Error(
              'Attempted to call the default export of "/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/page.tsx" from the server, but it\'s on the client. It\'s not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.'
            );
          },
          '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/page.tsx',
          'default'
        );
      },
      61135: () => {},
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      64298: (e, t, r) => {
        'use strict';
        r.d(t, { BP: () => l, dG: () => s, d_: () => i });
        var n = r(51060);
        let o = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
          a = n.A.create({ baseURL: o, headers: { 'Content-Type': 'application/json' } }),
          i = {
            getAllPosts: async e => (await a.get('/posts', { params: e })).data,
            getPostBySlug: async e => (await a.get(`/posts/${e}`)).data,
          },
          l = { getAllCategories: async () => (await a.get('/categories')).data },
          s = { getAllTags: async () => (await a.get('/tags')).data };
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
      70455: (e, t, r) => {
        'use strict';
        r.d(t, { $: () => c });
        var n = r(60687),
          o = r(43210),
          a = r(8730),
          i = r(24224),
          l = r(4780);
        let s = (0, i.F)(
            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
            {
              variants: {
                variant: {
                  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                  destructive:
                    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                  outline:
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                  secondary:
                    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                  ghost: 'hover:bg-accent hover:text-accent-foreground',
                  link: 'text-primary underline-offset-4 hover:underline',
                },
                size: {
                  default: 'h-9 px-4 py-2',
                  sm: 'h-8 rounded-md px-3 text-xs',
                  lg: 'h-10 rounded-md px-8',
                  icon: 'h-9 w-9',
                },
              },
              defaultVariants: { variant: 'default', size: 'default' },
            }
          ),
          c = o.forwardRef(({ className: e, variant: t, size: r, asChild: o = !1, ...i }, c) => {
            let d = o ? a.DX : 'button';
            return (0, n.jsx)(d, {
              className: (0, l.cn)(s({ variant: t, size: r, className: e })),
              ref: c,
              ...i,
            });
          });
        c.displayName = 'Button';
      },
      73683: (e, t, r) => {
        'use strict';
        r.d(t, { A: () => i });
        var n = r(35471),
          o = r(14967);
        let a = (0, r(55946).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          i = (0, n.A)(async ({ requestLocale: e }) => {
            let t = await e,
              n = (0, o.EL)(a.locales, t) ? t : a.defaultLocale;
            return { locale: n, messages: (await r(76565)(`./${n}.json`)).default };
          });
      },
      74075: e => {
        'use strict';
        e.exports = require('zlib');
      },
      76565: (e, t, r) => {
        var n = { './en.json': [87368, 368], './zh.json': [72961, 961] };
        function o(e) {
          if (!r.o(n, e))
            return Promise.resolve().then(() => {
              var t = Error("Cannot find module '" + e + "'");
              throw ((t.code = 'MODULE_NOT_FOUND'), t);
            });
          var t = n[e],
            o = t[0];
          return r.e(t[1]).then(() => r.t(o, 19));
        }
        (o.keys = () => Object.keys(n)), (o.id = 76565), (e.exports = o);
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
      81630: e => {
        'use strict';
        e.exports = require('http');
      },
      83116: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 13520));
      },
      83997: e => {
        'use strict';
        e.exports = require('tty');
      },
      91546: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 80994));
      },
      94431: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => l, metadata: () => i });
        var n = r(37413);
        r(61135);
        var o = r(7339),
          a = r.n(o);
        let i = {
          title: 'Modern Blog',
          description: 'A trendy blog for web development enthusiasts',
        };
        function l({ children: e }) {
          return (0, n.jsx)('html', {
            lang: 'en',
            children: (0, n.jsx)('body', { className: a().className, children: e }),
          });
        }
      },
      94627: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => d });
        var n = r(37413),
          o = r(57974),
          a = r.n(o),
          i = r(39916),
          l = r(10323),
          s = r(88946);
        let c = ['en', 'zh'];
        function d({ children: e, params: { locale: t } }) {
          let r = (0, l.A)();
          return (
            c.includes(t) || (0, i.notFound)(),
            (0, n.jsx)('html', {
              lang: t,
              children: (0, n.jsx)('body', {
                className: a().className,
                children: (0, n.jsx)(s.A, { locale: t, messages: r, children: e }),
              }),
            })
          );
        }
      },
      94735: e => {
        'use strict';
        e.exports = require('events');
      },
      96268: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 59697));
      },
      98487: () => {},
    });
  var t = require('../../webpack-runtime.js');
  t.C(e);
  var r = e => t((t.s = e)),
    n = t.X(0, [447, 435, 658, 618, 309, 42, 549, 358], () => r(6108));
  module.exports = n;
})();
