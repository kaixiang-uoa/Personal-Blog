(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [465],
  {
    388: (e, a, s) => {
      'use strict';
      s.d(a, { N_: () => l });
      var t = s(8223);
      let r = (0, s(9984).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
        { Link: l, redirect: n, usePathname: c, useRouter: d, getPathname: i } = (0, t.A)(r);
    },
    722: (e, a, s) => {
      'use strict';
      s.d(a, { BP: () => c, dG: () => d, d_: () => n });
      var t = s(3464);
      let r = s(9509).env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        l = t.A.create({ baseURL: r, headers: { 'Content-Type': 'application/json' } }),
        n = {
          getAllPosts: async e => (await l.get('/posts', { params: e })).data,
          getPostBySlug: async e => (await l.get('/posts/'.concat(e))).data,
        },
        c = { getAllCategories: async () => (await l.get('/categories')).data },
        d = { getAllTags: async () => (await l.get('/tags')).data };
    },
    1989: (e, a, s) => {
      'use strict';
      s.d(a, { J: () => i });
      var t = s(5155),
        r = s(2115),
        l = s(968),
        n = s(2085),
        c = s(9434);
      let d = (0, n.F)(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        ),
        i = r.forwardRef((e, a) => {
          let { className: s, ...r } = e;
          return (0, t.jsx)(l.b, { ref: a, className: (0, c.cn)(d(), s), ...r });
        });
      i.displayName = l.b.displayName;
    },
    3012: (e, a, s) => {
      Promise.resolve().then(s.bind(s, 5239));
    },
    5239: (e, a, s) => {
      'use strict';
      s.r(a), s.d(a, { default: () => G });
      var t = s(5155),
        r = s(2115),
        l = s(5695),
        n = s(7652),
        c = s(388),
        d = s(6151),
        i = s(6766),
        o = s(6874),
        m = s.n(o);
      function x(e) {
        let { article: a } = e;
        return (0, t.jsxs)('div', {
          className:
            'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300',
          children: [
            (0, t.jsx)(i.default, {
              src: a.featuredImage || '/images/default-image.jpg',
              alt: a.title,
              width: 300,
              height: 200,
              className: 'w-full h-48 object-cover',
              unoptimized: !!a.featuredImage && a.featuredImage.startsWith('http'),
            }),
            (0, t.jsxs)('div', {
              className: 'p-4',
              children: [
                (0, t.jsx)('h3', {
                  className: 'text-lg font-bold text-gray-900',
                  children: a.title,
                }),
                (0, t.jsx)(m(), {
                  href: '/article/'.concat(a.slug),
                  className: 'mt-4 inline-block text-cyan-600 hover:text-cyan-800 font-medium',
                  children: '阅读更多 →',
                }),
              ],
            }),
          ],
        });
      }
      var h = s(3332),
        u = s(2085),
        g = s(9434);
      let p = (0, u.F)(
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
      function f(e) {
        let { className: a, variant: s, ...r } = e;
        return (0, t.jsx)('div', { className: (0, g.cn)(p({ variant: s }), a), ...r });
      }
      var y = s(7655);
      let v = r.forwardRef((e, a) => {
        let { className: s, children: r, ...l } = e;
        return (0, t.jsxs)(y.bL, {
          ref: a,
          className: (0, g.cn)('relative overflow-hidden', s),
          ...l,
          children: [
            (0, t.jsx)(y.LM, { className: 'h-full w-full rounded-[inherit]', children: r }),
            (0, t.jsx)(b, {}),
            (0, t.jsx)(y.OK, {}),
          ],
        });
      });
      v.displayName = y.bL.displayName;
      let b = r.forwardRef((e, a) => {
        let { className: s, orientation: r = 'vertical', ...l } = e;
        return (0, t.jsx)(y.VM, {
          ref: a,
          orientation: r,
          className: (0, g.cn)(
            'flex touch-none select-none transition-colors',
            'vertical' === r && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
            'horizontal' === r && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            s
          ),
          ...l,
          children: (0, t.jsx)(y.lr, { className: 'relative flex-1 rounded-full bg-border' }),
        });
      });
      function j(e) {
        let { tags: a, activeTags: s, onTagsChange: l } = e,
          [n, c] = (0, r.useState)(s || []),
          d = e => {
            let a;
            c((a = n.includes(e) ? n.filter(a => a !== e) : [...n, e])), l(a);
          };
        return (0, t.jsxs)('div', {
          className: 'py-4',
          children: [
            (0, t.jsxs)('div', {
              className: 'flex items-center mb-3',
              children: [
                (0, t.jsx)(h.A, { className: 'h-5 w-5 mr-2 text-cyan-500' }),
                (0, t.jsx)('h3', { className: 'text-lg font-medium', children: '热门标签' }),
              ],
            }),
            (0, t.jsxs)(v, {
              className: 'w-full whitespace-nowrap',
              children: [
                (0, t.jsx)('div', {
                  className: 'flex flex-wrap gap-2',
                  children: a.map(e =>
                    (0, t.jsx)(
                      f,
                      {
                        variant: n.includes(e.slug) ? 'default' : 'secondary',
                        className:
                          '\n                cursor-pointer transition-all hover:scale-105\n                '.concat(
                            n.includes(e.slug)
                              ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-200',
                            '\n              '
                          ),
                        onClick: () => d(e.slug),
                        children: e.name,
                      },
                      e._id
                    )
                  ),
                }),
                (0, t.jsx)(b, { orientation: 'horizontal' }),
              ],
            }),
          ],
        });
      }
      b.displayName = y.VM.displayName;
      var N = s(4416),
        w = s(3478),
        k = s(6474);
      let C = w.bL,
        A = r.forwardRef((e, a) => {
          let { className: s, ...r } = e;
          return (0, t.jsx)(w.q7, { ref: a, className: (0, g.cn)('border-b', s), ...r });
        });
      A.displayName = 'AccordionItem';
      let _ = r.forwardRef((e, a) => {
        let { className: s, children: r, ...l } = e;
        return (0, t.jsx)(w.Y9, {
          className: 'flex',
          children: (0, t.jsxs)(w.l9, {
            ref: a,
            className: (0, g.cn)(
              'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180',
              s
            ),
            ...l,
            children: [
              r,
              (0, t.jsx)(k.A, {
                className:
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              }),
            ],
          }),
        });
      });
      _.displayName = w.l9.displayName;
      let L = r.forwardRef((e, a) => {
        let { className: s, children: r, ...l } = e;
        return (0, t.jsx)(w.UC, {
          ref: a,
          className:
            'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
          ...l,
          children: (0, t.jsx)('div', { className: (0, g.cn)('pb-4 pt-0', s), children: r }),
        });
      });
      L.displayName = w.UC.displayName;
      var P = s(9273),
        R = s(6981),
        z = s(5196);
      let S = r.forwardRef((e, a) => {
        let { className: s, ...r } = e;
        return (0, t.jsx)(R.bL, {
          ref: a,
          className: (0, g.cn)(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            s
          ),
          ...r,
          children: (0, t.jsx)(R.C1, {
            className: (0, g.cn)('flex items-center justify-center text-current'),
            children: (0, t.jsx)(z.A, { className: 'h-4 w-4' }),
          }),
        });
      });
      S.displayName = R.bL.displayName;
      var F = s(1989),
        M = s(1522),
        T = s(7863);
      let B = M.bL;
      M.YJ;
      let E = M.WT,
        I = r.forwardRef((e, a) => {
          let { className: s, children: r, ...l } = e;
          return (0, t.jsxs)(M.l9, {
            ref: a,
            className: (0, g.cn)(
              'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
              s
            ),
            ...l,
            children: [
              r,
              (0, t.jsx)(M.In, {
                asChild: !0,
                children: (0, t.jsx)(k.A, { className: 'h-4 w-4 opacity-50' }),
              }),
            ],
          });
        });
      I.displayName = M.l9.displayName;
      let U = r.forwardRef((e, a) => {
        let { className: s, ...r } = e;
        return (0, t.jsx)(M.PP, {
          ref: a,
          className: (0, g.cn)('flex cursor-default items-center justify-center py-1', s),
          ...r,
          children: (0, t.jsx)(T.A, { className: 'h-4 w-4' }),
        });
      });
      U.displayName = M.PP.displayName;
      let V = r.forwardRef((e, a) => {
        let { className: s, ...r } = e;
        return (0, t.jsx)(M.wn, {
          ref: a,
          className: (0, g.cn)('flex cursor-default items-center justify-center py-1', s),
          ...r,
          children: (0, t.jsx)(k.A, { className: 'h-4 w-4' }),
        });
      });
      V.displayName = M.wn.displayName;
      let J = r.forwardRef((e, a) => {
        let { className: s, children: r, position: l = 'popper', ...n } = e;
        return (0, t.jsx)(M.ZL, {
          children: (0, t.jsxs)(M.UC, {
            ref: a,
            className: (0, g.cn)(
              'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
              'popper' === l &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              s
            ),
            position: l,
            ...n,
            children: [
              (0, t.jsx)(U, {}),
              (0, t.jsx)(M.LM, {
                className: (0, g.cn)(
                  'p-1',
                  'popper' === l &&
                    'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                ),
                children: r,
              }),
              (0, t.jsx)(V, {}),
            ],
          }),
        });
      });
      (J.displayName = M.UC.displayName),
        (r.forwardRef((e, a) => {
          let { className: s, ...r } = e;
          return (0, t.jsx)(M.JU, {
            ref: a,
            className: (0, g.cn)('px-2 py-1.5 text-sm font-semibold', s),
            ...r,
          });
        }).displayName = M.JU.displayName);
      let D = r.forwardRef((e, a) => {
        let { className: s, children: r, ...l } = e;
        return (0, t.jsxs)(M.q7, {
          ref: a,
          className: (0, g.cn)(
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            s
          ),
          ...l,
          children: [
            (0, t.jsx)('span', {
              className: 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center',
              children: (0, t.jsx)(M.VF, { children: (0, t.jsx)(z.A, { className: 'h-4 w-4' }) }),
            }),
            (0, t.jsx)(M.p4, { children: r }),
          ],
        });
      });
      function O(e) {
        let {
            tags: a,
            activeTags: s,
            categories: c,
            activeCategory: d,
            sortOrder: i = 'latest',
            onFilterChangeAction: o,
            onClearFiltersAction: m,
          } = e,
          x = (0, n.c3)('common'),
          { locale: u } = (0, l.useParams)(),
          [g, p] = (0, r.useState)(s || []),
          [y, v] = (0, r.useState)(d || null),
          [b, j] = (0, r.useState)(i),
          w = (e, a) => ('en' === a ? e.name_en || e.name : ('zh' === a && e.name_zh) || e.name),
          k = (e, a) => ('en' === a ? e.name_en || e.name : ('zh' === a && e.name_zh) || e.name);
        (0, r.useEffect)(() => {
          v(d || null);
        }, [d]),
          (0, r.useEffect)(() => {
            p(s || []);
          }, [s]);
        let R = (e, a) => {
            let s;
            p((s = a ? [...g, e] : g.filter(a => a !== e))), o({ type: 'tags', value: s });
          },
          z = e => {
            v(e), o({ type: 'category', value: e || '' });
          },
          M = s.length > 0 || d;
        return (0, t.jsxs)('div', {
          className: 'bg-gray-800 rounded-lg p-4 sticky top-4',
          children: [
            (0, t.jsxs)('div', {
              className: 'flex justify-between items-center mb-4',
              children: [
                (0, t.jsx)('h3', {
                  className: 'text-lg font-semibold text-white',
                  children: x('filters'),
                }),
                M &&
                  (0, t.jsxs)(P.$, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: m,
                    className: 'text-cyan-500 hover:text-cyan-400 hover:bg-gray-700 p-1 h-auto',
                    children: [(0, t.jsx)(N.A, { className: 'h-4 w-4 mr-1' }), x('clear')],
                  }),
              ],
            }),
            M &&
              (0, t.jsxs)('div', {
                className: 'mb-4 pb-4 border-b border-gray-700',
                children: [
                  (0, t.jsxs)('p', {
                    className: 'text-sm text-gray-400 mb-2',
                    children: [x('activeFilters'), ':'],
                  }),
                  (0, t.jsxs)('div', {
                    className: 'flex flex-wrap gap-2',
                    children: [
                      s.map(e => {
                        let s = a.find(a => a.slug === e);
                        return (0, t.jsxs)(
                          f,
                          {
                            variant: 'secondary',
                            className:
                              'bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer',
                            onClick: () => R(e, !1),
                            children: [
                              s ? k(s, u) : e,
                              (0, t.jsx)(N.A, { className: 'ml-1 h-3 w-3' }),
                            ],
                          },
                          e
                        );
                      }),
                      d &&
                        (() => {
                          let e = c.find(e => e.slug === d);
                          return (0, t.jsxs)(
                            f,
                            {
                              variant: 'secondary',
                              className:
                                'bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-100 cursor-pointer',
                              onClick: () => z(null),
                              children: [
                                e ? w(e, u) : d,
                                (0, t.jsx)(N.A, { className: 'ml-1 h-3 w-3' }),
                              ],
                            },
                            d
                          );
                        })(),
                    ],
                  }),
                ],
              }),
            (0, t.jsxs)(C, {
              type: 'multiple',
              defaultValue: ['tags', 'category', 'sort'],
              className: 'w-full',
              children: [
                (0, t.jsxs)(A, {
                  value: 'tags',
                  className: 'border-b border-gray-700',
                  children: [
                    (0, t.jsx)(_, {
                      className: 'text-base py-3 hover:no-underline',
                      children: (0, t.jsxs)('div', {
                        className: 'flex items-center',
                        children: [
                          (0, t.jsx)(h.A, { className: 'h-4 w-4 mr-2' }),
                          (0, t.jsx)('span', { children: x('tags') }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(L, {
                      children: (0, t.jsx)('div', {
                        className: 'grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar',
                        children: a.map(e =>
                          (0, t.jsxs)(
                            F.J,
                            {
                              className:
                                'flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors',
                              children: [
                                (0, t.jsx)(S, {
                                  checked: g.includes(e.slug),
                                  onCheckedChange: a => R(e.slug, a),
                                  className:
                                    'data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600',
                                }),
                                (0, t.jsx)('span', { className: 'truncate', children: k(e, u) }),
                              ],
                            },
                            e._id
                          )
                        ),
                      }),
                    }),
                  ],
                }),
                (0, t.jsxs)(A, {
                  value: 'category',
                  className: 'border-b border-gray-700',
                  children: [
                    (0, t.jsx)(_, {
                      className: 'text-base py-3 hover:no-underline',
                      children: (0, t.jsxs)('div', {
                        className: 'flex items-center',
                        children: [
                          (0, t.jsx)('svg', {
                            xmlns: 'http://www.w3.org/2000/svg',
                            className: 'h-4 w-4 mr-2',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            strokeWidth: 2,
                            children: (0, t.jsx)('path', {
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
                            }),
                          }),
                          (0, t.jsx)('span', { children: x('categories') }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(L, {
                      children: (0, t.jsxs)('div', {
                        className: 'grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar',
                        children: [
                          (0, t.jsxs)(
                            F.J,
                            {
                              className:
                                'flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors',
                              children: [
                                (0, t.jsx)(S, {
                                  checked: !y,
                                  onCheckedChange: () => z(null),
                                  className:
                                    'data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600',
                                }),
                                x('allCategories'),
                              ],
                            },
                            'all-categories'
                          ),
                          c.map(e =>
                            (0, t.jsxs)(
                              F.J,
                              {
                                className:
                                  'flex items-center gap-2 font-normal cursor-pointer hover:text-cyan-400 transition-colors',
                                children: [
                                  (0, t.jsx)(S, {
                                    checked: y === e.slug,
                                    onCheckedChange: () => z(e.slug),
                                    className:
                                      'data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600',
                                  }),
                                  w(e, u),
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
                (0, t.jsxs)(A, {
                  value: 'sort',
                  className: 'border-b-0',
                  children: [
                    (0, t.jsx)(_, {
                      className: 'text-base py-3 hover:no-underline',
                      children: (0, t.jsx)('div', {
                        className: 'flex items-center',
                        children: (0, t.jsx)('span', { children: x('sortBy') }),
                      }),
                    }),
                    (0, t.jsx)(L, {
                      children: (0, t.jsx)('div', {
                        className: 'space-y-4',
                        children: (0, t.jsxs)(B, {
                          value: b,
                          onValueChange: e => {
                            j(e), o({ type: 'sort', value: e });
                          },
                          children: [
                            (0, t.jsx)(I, {
                              className: 'w-full bg-gray-700 border-gray-600',
                              children: (0, t.jsx)(E, { placeholder: x('selectSortOrder') }),
                            }),
                            (0, t.jsxs)(J, {
                              className: 'bg-gray-700 border-gray-600',
                              children: [
                                (0, t.jsx)(D, { value: 'latest', children: x('newestFirst') }),
                                (0, t.jsx)(D, { value: 'oldest', children: x('oldestFirst') }),
                                (0, t.jsx)(D, { value: 'popular', children: x('mostPopular') }),
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
      (D.displayName = M.q7.displayName),
        (r.forwardRef((e, a) => {
          let { className: s, ...r } = e;
          return (0, t.jsx)(M.wv, {
            ref: a,
            className: (0, g.cn)('-mx-1 my-1 h-px bg-muted', s),
            ...r,
          });
        }).displayName = M.wv.displayName);
      let q = e => {
        let { value: a, onChange: s, className: r = '' } = e,
          l = (0, n.c3)('common'),
          c = [
            { label: l('newestFirst'), value: 'latest' },
            { label: l('oldestFirst'), value: 'oldest' },
            { label: l('mostPopular'), value: 'popular' },
          ];
        return (0, t.jsxs)('div', {
          className: 'flex items-center gap-2 '.concat(r),
          children: [
            (0, t.jsxs)('label', {
              htmlFor: 'sort-selector',
              className: 'text-sm text-gray-300',
              children: [l('sortBy'), ':'],
            }),
            (0, t.jsx)('select', {
              id: 'sort-selector',
              value: a,
              onChange: e => s(e.target.value),
              className: 'px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600',
              children: c.map(e =>
                (0, t.jsx)('option', { value: e.value, children: e.label }, e.value)
              ),
            }),
          ],
        });
      };
      function W() {
        return (0, t.jsxs)('div', {
          className: 'bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse',
          children: [
            (0, t.jsx)('div', { className: 'h-48 bg-gray-700' }),
            (0, t.jsxs)('div', {
              className: 'p-6',
              children: [
                (0, t.jsx)('div', { className: 'h-6 bg-gray-700 rounded w-3/4 mb-4' }),
                (0, t.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-1/2 mb-2' }),
                (0, t.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-5/6 mb-2' }),
                (0, t.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-4/6 mb-4' }),
                (0, t.jsxs)('div', {
                  className: 'flex justify-between items-center mt-6',
                  children: [
                    (0, t.jsxs)('div', {
                      className: 'flex items-center',
                      children: [
                        (0, t.jsx)('div', { className: 'h-8 w-8 bg-gray-700 rounded-full' }),
                        (0, t.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-24 ml-2' }),
                      ],
                    }),
                    (0, t.jsx)('div', { className: 'h-4 bg-gray-700 rounded w-16' }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var Y = s(722);
      let $ = function (e) {
        let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
        return e ? (Array.isArray(e) ? e[0] || a : e) : a;
      };
      function G(e) {
        var a;
        let { searchParams: s } = e,
          i = (0, n.c3)('common'),
          o = (0, l.useParams)().locale,
          m = (0, l.useRouter)(),
          h = $(s.sort, 'latest'),
          u = $(s.tag),
          g = $(s.category),
          p = $(s.search),
          f = parseInt($(s.page, '1')) || 1,
          [y, v] = (0, r.useState)([]),
          [b, N] = (0, r.useState)([]),
          [w, k] = (0, r.useState)([]),
          [C, A] = (0, r.useState)(1),
          [, _] = (0, r.useState)(0),
          [L, P] = (0, r.useState)(!0),
          [R, z] = (0, r.useState)(null),
          S = (e, a) => ('en' === a ? e.name_en || e.name : ('zh' === a && e.name_zh) || e.name),
          F = (0, r.useCallback)(async () => {
            try {
              P(!0);
              let e = await Y.d_.getAllPosts({
                page: f,
                limit: 10,
                tag: u || void 0,
                category: g || void 0,
                search: p || void 0,
                sort: h,
              });
              v(e.data), A(Math.ceil(e.total / 10)), _(e.total);
            } catch (e) {
              z(e instanceof Error ? e.message : '获取文章失败'), v([]);
            } finally {
              P(!1);
            }
          }, [f, h, u, g, p]);
        (0, r.useEffect)(() => {
          F();
        }, [F]),
          (0, r.useEffect)(() => {
            Y.BP.getAllCategories().then(e => {
              N(e.data || []);
            }),
              Y.dG.getAllTags().then(e => {
                k(e.data || []);
              });
          }, [o]);
        let M = (0, r.useMemo)(() => {
            let e = [...y];
            if (
              (u && (e = e.filter(e => e.tags.some(e => e.slug === u))),
              g && (e = e.filter(e => e.category.slug === g)),
              p)
            ) {
              let a = p.toLowerCase();
              e = e.filter(
                e => e.title.toLowerCase().includes(a) || e.content.toLowerCase().includes(a)
              );
            }
            switch (h) {
              case 'latest':
                e.sort((e, a) => new Date(a.createdAt).getTime() - new Date(e.createdAt).getTime());
                break;
              case 'oldest':
                e.sort((e, a) => new Date(e.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
              case 'popular':
                e.sort((e, a) => a.views - e.views);
            }
            return e;
          }, [y, h, u, g, p]),
          T = e => {
            m.push('/'.concat(o, '?q=').concat(encodeURIComponent(e)));
          },
          B = e => {
            if ('category' === e.type) m.push('/'.concat(o, '?category=').concat(e.value));
            else if ('sort' === e.type) {
              let a = e.value;
              m.push('/'.concat(o, '?sort=').concat(a));
            } else 'tags' === e.type && m.push('/'.concat(o, '?tag=').concat(e.value.join(',')));
          },
          E = () => {
            m.push('/'.concat(o));
          },
          I = (0, r.useMemo)(() => !!u || !!g || !!p || 'latest' !== h, [u, g, p, h]),
          U = e => {
            m.push('/'.concat(o, '?page=').concat(e));
          },
          V = e => (e ? S(e, o) : '');
        return (0, t.jsxs)('main', {
          className: 'min-h-screen bg-gray-900 text-gray-200',
          children: [
            (0, t.jsx)(d.A, {}),
            (0, t.jsx)('section', {
              className:
                'bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8',
              children: (0, t.jsxs)('div', {
                className: 'max-w-7xl mx-auto',
                children: [
                  (0, t.jsx)('h1', {
                    className: 'text-4xl font-extrabold sm:text-6xl',
                    children: i('latestArticles'),
                  }),
                  (0, t.jsx)('p', {
                    className: 'mt-6 text-xl max-w-3xl',
                    children: i('heroSubtitle'),
                  }),
                ],
              }),
            }),
            (0, t.jsx)('section', {
              className: 'max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8',
              children: (0, t.jsxs)('div', {
                className: 'flex justify-center flex-wrap gap-4',
                children: [
                  (0, t.jsx)(c.N_, {
                    href: '/',
                    scroll: !1,
                    onClick: () => m.push('/'.concat(o)),
                    className: 'px-4 py-2 rounded-md '.concat(
                      g ? 'bg-gray-700' : 'bg-cyan-600',
                      ' hover:bg-cyan-700'
                    ),
                    children: i('allCategories'),
                  }),
                  b.map(e =>
                    (0, t.jsx)(
                      c.N_,
                      {
                        href: '/'.concat(o, '?category=').concat(e.slug),
                        scroll: !1,
                        onClick: () => m.push('/'.concat(o, '?category=').concat(e.slug)),
                        className: 'px-4 py-2 rounded-md '.concat(
                          g === e.slug ? 'bg-cyan-600' : 'bg-gray-700',
                          ' hover:bg-cyan-700'
                        ),
                        children: V(e),
                      },
                      e._id
                    )
                  ),
                ],
              }),
            }),
            (0, t.jsx)('section', {
              className: 'max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8',
              children: (0, t.jsxs)('form', {
                onSubmit: e => {
                  e.preventDefault(), T(p);
                },
                className: 'flex',
                children: [
                  (0, t.jsx)('input', {
                    type: 'text',
                    placeholder: i('searchPlaceholder'),
                    value: p,
                    onChange: e => m.push('/'.concat(o, '?q=').concat(e.target.value)),
                    className:
                      'w-full px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800 text-white',
                  }),
                  (0, t.jsx)('button', {
                    type: 'submit',
                    className: 'bg-cyan-600 px-4 py-2 rounded-r-md',
                    children: i('search'),
                  }),
                ],
              }),
            }),
            (0, t.jsx)('div', {
              className: 'md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              children:
                w.length > 0 &&
                (0, t.jsx)(j, {
                  tags: w,
                  activeTags: [u],
                  onTagsChange: e => {
                    m.push('/'.concat(o, '?tag=').concat(e.join(',')));
                  },
                }),
            }),
            (0, t.jsx)('div', {
              className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
              children: (0, t.jsxs)('div', {
                className: 'grid md:grid-cols-[280px_1fr] gap-8',
                children: [
                  (0, t.jsx)('div', {
                    className: 'hidden md:block',
                    children: (0, t.jsx)(O, {
                      tags: w,
                      activeTags: [u],
                      categories: b,
                      activeCategory: g,
                      sortOrder: h,
                      onFilterChangeAction: B,
                      onClearFiltersAction: E,
                    }),
                  }),
                  (0, t.jsxs)('div', {
                    children: [
                      I &&
                        (0, t.jsxs)('div', {
                          className:
                            'bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6',
                          children: [
                            (0, t.jsxs)('div', {
                              className: 'flex flex-wrap gap-2 items-center',
                              children: [
                                (0, t.jsxs)('span', {
                                  className: 'text-gray-400',
                                  children: [i('filterConditions'), ':'],
                                }),
                                u &&
                                  (0, t.jsxs)('span', {
                                    className: 'bg-cyan-600 text-white px-2 py-1 rounded text-sm',
                                    children: [
                                      i('tag'),
                                      ': ',
                                      (null == (a = w.find(e => e.slug === u)) ? void 0 : a.name) ||
                                        u,
                                    ],
                                  }),
                                g &&
                                  (0, t.jsxs)('span', {
                                    className: 'bg-cyan-600 text-white px-2 py-1 rounded text-sm',
                                    children: [i('category'), ': ', V(b.find(e => e.slug === g))],
                                  }),
                                p &&
                                  (0, t.jsxs)('span', {
                                    className: 'bg-cyan-600 text-white px-2 py-1 rounded text-sm',
                                    children: [i('search'), ': ', p],
                                  }),
                              ],
                            }),
                            (0, t.jsx)('button', {
                              onClick: E,
                              className: 'text-cyan-500 hover:text-cyan-400 md:hidden',
                              children: i('clearFilters'),
                            }),
                          ],
                        }),
                      (0, t.jsx)('div', {
                        className: 'flex justify-end mb-6',
                        children: (0, t.jsx)(q, {
                          value: h,
                          onChange: e => B({ type: 'sort', value: e }),
                          className: 'md:hidden',
                        }),
                      }),
                      (0, t.jsx)('h2', {
                        className: 'text-3xl font-extrabold text-white mb-8',
                        children: g
                          ? ''.concat(i('category'), ': ').concat(V(b.find(e => e.slug === g)))
                          : i(I ? 'filterResults' : 'latestArticles'),
                      }),
                      L
                        ? (0, t.jsx)('div', {
                            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                            children: Array.from({ length: 6 }).map((e, a) => (0, t.jsx)(W, {}, a)),
                          })
                        : R
                          ? (0, t.jsx)('div', {
                              className: 'text-center text-red-400',
                              children: R,
                            })
                          : M.length > 0
                            ? (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsx)('div', {
                                    className:
                                      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                                    children: M.map(e => (0, t.jsx)(x, { article: e }, e._id)),
                                  }),
                                  C > 1 &&
                                    (0, t.jsxs)('div', {
                                      className: 'flex justify-center mt-10',
                                      children: [
                                        (0, t.jsx)('button', {
                                          onClick: () => U(f - 1),
                                          disabled: 1 === f,
                                          children: i('previousPage'),
                                        }),
                                        (0, t.jsx)('span', {
                                          children: i('pageInfo', { current: f, total: C }),
                                        }),
                                        (0, t.jsx)('button', {
                                          onClick: () => U(f + 1),
                                          disabled: f === C,
                                          children: i('nextPage'),
                                        }),
                                      ],
                                    }),
                                ],
                              })
                            : (0, t.jsx)('div', {
                                className: 'text-center text-yellow-300 py-10',
                                children: i('noArticlesFound'),
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
    6151: (e, a, s) => {
      'use strict';
      s.d(a, { A: () => o });
      var t = s(5155),
        r = s(2115),
        l = s(388),
        n = s(7652),
        c = s(6453),
        d = s(5695);
      function i() {
        let e = (0, c.Ym)(),
          a = (0, d.useRouter)(),
          s = (0, d.usePathname)(),
          r = t => {
            let r = s.replace('/'.concat(e), '') || '/',
              l = '/'.concat(t).concat(r);
            a.push(l);
          };
        return (0, t.jsxs)('div', {
          className: 'flex items-center space-x-2',
          children: [
            (0, t.jsx)('button', {
              onClick: () => r('zh'),
              className: 'px-2 py-1 text-sm rounded-md '.concat(
                'zh' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              ),
              children: '中文',
            }),
            (0, t.jsx)('button', {
              onClick: () => r('en'),
              className: 'px-2 py-1 text-sm rounded-md '.concat(
                'en' === e ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              ),
              children: 'English',
            }),
          ],
        });
      }
      function o() {
        let [e, a] = (0, r.useState)(!1),
          s = (0, n.c3)('nav');
        return (0, t.jsxs)('nav', {
          className: 'bg-white shadow-md',
          children: [
            (0, t.jsx)('div', {
              className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              children: (0, t.jsxs)('div', {
                className: 'flex justify-between items-center h-16',
                children: [
                  (0, t.jsx)('div', {
                    className: 'flex items-center',
                    children: (0, t.jsx)(l.N_, {
                      href: '/',
                      className: 'text-2xl font-bold text-cyan-600',
                      children: 'MyBlog',
                    }),
                  }),
                  (0, t.jsxs)('div', {
                    className: 'hidden md:flex md:space-x-8',
                    children: [
                      (0, t.jsx)(l.N_, {
                        href: '/',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: s('home'),
                      }),
                      (0, t.jsx)(l.N_, {
                        href: '/about',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: s('about'),
                      }),
                      (0, t.jsx)(l.N_, {
                        href: '/contact',
                        className:
                          'text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium',
                        children: s('contact'),
                      }),
                      (0, t.jsx)(i, {}),
                    ],
                  }),
                  (0, t.jsx)('div', {
                    className: '-mr-2 flex md:hidden',
                    children: (0, t.jsxs)('button', {
                      onClick: () => a(!e),
                      type: 'button',
                      className:
                        'bg-cyan-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
                      'aria-controls': 'mobile-menu',
                      'aria-expanded': e,
                      children: [
                        (0, t.jsx)('span', { className: 'sr-only', children: 'Open main menu' }),
                        e
                          ? (0, t.jsx)('svg', {
                              className: 'block h-6 w-6',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              'aria-hidden': 'true',
                              children: (0, t.jsx)('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: '2',
                                d: 'M6 18L18 6M6 6l12 12',
                              }),
                            })
                          : (0, t.jsx)('svg', {
                              className: 'block h-6 w-6',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              'aria-hidden': 'true',
                              children: (0, t.jsx)('path', {
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
            (0, t.jsx)('div', {
              className: ''.concat(e ? 'block' : 'hidden', ' md:hidden'),
              id: 'mobile-menu',
              children: (0, t.jsxs)('div', {
                className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3',
                children: [
                  (0, t.jsx)(l.N_, {
                    href: '/',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: s('home'),
                  }),
                  (0, t.jsx)(l.N_, {
                    href: '/about',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: s('about'),
                  }),
                  (0, t.jsx)(l.N_, {
                    href: '/contact',
                    className:
                      'text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium',
                    children: s('contact'),
                  }),
                  (0, t.jsx)('div', { className: 'px-3 py-2', children: (0, t.jsx)(i, {}) }),
                ],
              }),
            }),
          ],
        });
      }
    },
    9273: (e, a, s) => {
      'use strict';
      s.d(a, { $: () => i });
      var t = s(5155),
        r = s(2115),
        l = s(9708),
        n = s(2085),
        c = s(9434);
      let d = (0, n.F)(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          {
            variants: {
              variant: {
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive:
                  'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
                  'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
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
        i = r.forwardRef((e, a) => {
          let { className: s, variant: r, size: n, asChild: i = !1, ...o } = e,
            m = i ? l.DX : 'button';
          return (0, t.jsx)(m, {
            className: (0, c.cn)(d({ variant: r, size: n, className: s })),
            ref: a,
            ...o,
          });
        });
      i.displayName = 'Button';
    },
    9434: (e, a, s) => {
      'use strict';
      s.d(a, { cn: () => l });
      var t = s(2596),
        r = s(9688);
      function l() {
        for (var e = arguments.length, a = Array(e), s = 0; s < e; s++) a[s] = arguments[s];
        return (0, r.QP)((0, t.$)(a));
      }
    },
  },
  e => {
    var a = a => e((e.s = a));
    e.O(0, [453, 587, 209, 540, 939, 441, 684, 358], () => a(3012)), (_N_E = e.O());
  },
]);
