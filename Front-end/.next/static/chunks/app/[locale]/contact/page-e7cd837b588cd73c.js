(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [638],
  {
    174: (e, t, r) => {
      'use strict';
      r.r(t), r.d(t, { default: () => D, dynamic: () => F });
      var s = r(5155),
        a = r(2115),
        n = r(7652),
        o = r(221),
        i = r(2177),
        l = r(5594),
        d = r(9273),
        c = r(9708),
        m = r(9434),
        u = r(1989);
      let x = i.Op,
        f = a.createContext({}),
        h = e => {
          let { ...t } = e;
          return (0, s.jsx)(f.Provider, {
            value: { name: t.name },
            children: (0, s.jsx)(i.xI, { ...t }),
          });
        },
        p = () => {
          let e = a.useContext(f),
            t = a.useContext(b),
            { getFieldState: r, formState: s } = (0, i.xW)(),
            n = r(e.name, s);
          if (!e) throw Error('useFormField should be used within <FormField>');
          let { id: o } = t;
          return {
            id: o,
            name: e.name,
            formItemId: ''.concat(o, '-form-item'),
            formDescriptionId: ''.concat(o, '-form-item-description'),
            formMessageId: ''.concat(o, '-form-item-message'),
            ...n,
          };
        },
        b = a.createContext({}),
        g = a.forwardRef((e, t) => {
          let { className: r, ...n } = e,
            o = a.useId();
          return (0, s.jsx)(b.Provider, {
            value: { id: o },
            children: (0, s.jsx)('div', { ref: t, className: (0, m.cn)('space-y-2', r), ...n }),
          });
        });
      g.displayName = 'FormItem';
      let j = a.forwardRef((e, t) => {
        let { className: r, ...a } = e,
          { error: n, formItemId: o } = p();
        return (0, s.jsx)(u.J, {
          ref: t,
          className: (0, m.cn)(n && 'text-destructive', r),
          htmlFor: o,
          ...a,
        });
      });
      j.displayName = 'FormLabel';
      let y = a.forwardRef((e, t) => {
        let { ...r } = e,
          { error: a, formItemId: n, formDescriptionId: o, formMessageId: i } = p();
        return (0, s.jsx)(c.DX, {
          ref: t,
          id: n,
          'aria-describedby': a ? ''.concat(o, ' ').concat(i) : ''.concat(o),
          'aria-invalid': !!a,
          ...r,
        });
      });
      (y.displayName = 'FormControl'),
        (a.forwardRef((e, t) => {
          let { className: r, ...a } = e,
            { formDescriptionId: n } = p();
          return (0, s.jsx)('p', {
            ref: t,
            id: n,
            className: (0, m.cn)('text-sm text-muted-foreground', r),
            ...a,
          });
        }).displayName = 'FormDescription');
      let v = a.forwardRef((e, t) => {
        let { className: r, children: a, ...n } = e,
          { error: o, formMessageId: i } = p(),
          l = o ? String(null == o ? void 0 : o.message) : a;
        return l
          ? (0, s.jsx)('p', {
              ref: t,
              id: i,
              className: (0, m.cn)('text-sm font-medium text-destructive', r),
              ...n,
              children: l,
            })
          : null;
      });
      v.displayName = 'FormMessage';
      let N = a.forwardRef((e, t) => {
        let { className: r, type: a, ...n } = e;
        return (0, s.jsx)('input', {
          type: a,
          className: (0, m.cn)(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            r
          ),
          ref: t,
          ...n,
        });
      });
      N.displayName = 'Input';
      let w = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)('textarea', {
          className: (0, m.cn)(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            r
          ),
          ref: t,
          ...a,
        });
      });
      w.displayName = 'Textarea';
      let T = 0,
        S = new Map(),
        _ = e => {
          if (S.has(e)) return;
          let t = setTimeout(() => {
            S.delete(e), O({ type: 'REMOVE_TOAST', toastId: e });
          }, 1e6);
          S.set(e, t);
        },
        k = (e, t) => {
          switch (t.type) {
            case 'ADD_TOAST':
              return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 1) };
            case 'UPDATE_TOAST':
              return {
                ...e,
                toasts: e.toasts.map(e => (e.id === t.toast.id ? { ...e, ...t.toast } : e)),
              };
            case 'DISMISS_TOAST': {
              let { toastId: r } = t;
              return (
                r
                  ? _(r)
                  : e.toasts.forEach(e => {
                      _(e.id);
                    }),
                {
                  ...e,
                  toasts: e.toasts.map(e => (e.id === r || void 0 === r ? { ...e, open: !1 } : e)),
                }
              );
            }
            case 'REMOVE_TOAST':
              if (void 0 === t.toastId) return { ...e, toasts: [] };
              return { ...e, toasts: e.toasts.filter(e => e.id !== t.toastId) };
          }
        },
        I = [],
        E = { toasts: [] };
      function O(e) {
        (E = k(E, e)),
          I.forEach(e => {
            e(E);
          });
      }
      function A(e) {
        let { ...t } = e,
          r = (T = (T + 1) % Number.MAX_SAFE_INTEGER).toString(),
          s = () => O({ type: 'DISMISS_TOAST', toastId: r });
        return (
          O({
            type: 'ADD_TOAST',
            toast: {
              ...t,
              id: r,
              open: !0,
              onOpenChange: e => {
                e || s();
              },
            },
          }),
          { id: r, dismiss: s, update: e => O({ type: 'UPDATE_TOAST', toast: { ...e, id: r } }) }
        );
      }
      let F = 'force-dynamic';
      function D() {
        let e = (0, n.c3)('contact'),
          [t, r] = (0, a.useState)(!1),
          c = l.Ik({
            name: l.Yj().min(2, { message: e('nameValidation') }),
            email: l.Yj().email({ message: e('emailValidation') }),
            subject: l.Yj().min(5, { message: e('subjectValidation') }),
            message: l.Yj().min(10, { message: e('messageValidation') }),
          }),
          m = (0, i.mN)({
            resolver: (0, o.u)(c),
            defaultValues: { name: '', email: '', subject: '', message: '' },
          });
        async function u(t) {
          r(!0);
          try {
            let r = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(t),
              }),
              s = await r.json();
            if (!r.ok) throw Error(s.message || '提交失败');
            A({ title: e('successTitle'), description: e('successMessage') }), m.reset();
          } catch (t) {
            console.error('提交表单时出错:', t),
              A({
                title: e('errorTitle'),
                description:
                  'object' == typeof t && null !== t && 'message' in t
                    ? t.message
                    : e('errorMessage'),
                variant: 'destructive',
              });
          } finally {
            r(!1);
          }
        }
        return (0, s.jsxs)('div', {
          className: 'container mx-auto py-12 px-4 md:px-6',
          children: [
            (0, s.jsx)('h1', {
              className: 'text-3xl font-bold mb-6 text-center',
              children: e('title'),
            }),
            (0, s.jsx)('p', {
              className: 'text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto',
              children: e('description'),
            }),
            (0, s.jsx)('div', {
              className: 'max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg',
              children: (0, s.jsx)(x, {
                ...m,
                children: (0, s.jsxs)('form', {
                  onSubmit: m.handleSubmit(u),
                  className: 'space-y-6',
                  children: [
                    (0, s.jsxs)('div', {
                      className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                      children: [
                        (0, s.jsx)(h, {
                          control: m.control,
                          name: 'name',
                          render: t => {
                            let { field: r } = t;
                            return (0, s.jsxs)(g, {
                              children: [
                                (0, s.jsx)(j, { children: e('nameLabel') }),
                                (0, s.jsx)(y, {
                                  children: (0, s.jsx)(N, {
                                    placeholder: e('namePlaceholder'),
                                    ...r,
                                  }),
                                }),
                                (0, s.jsx)(v, {}),
                              ],
                            });
                          },
                        }),
                        (0, s.jsx)(h, {
                          control: m.control,
                          name: 'email',
                          render: t => {
                            let { field: r } = t;
                            return (0, s.jsxs)(g, {
                              children: [
                                (0, s.jsx)(j, { children: e('emailLabel') }),
                                (0, s.jsx)(y, {
                                  children: (0, s.jsx)(N, {
                                    placeholder: e('emailPlaceholder'),
                                    ...r,
                                  }),
                                }),
                                (0, s.jsx)(v, {}),
                              ],
                            });
                          },
                        }),
                      ],
                    }),
                    (0, s.jsx)(h, {
                      control: m.control,
                      name: 'subject',
                      render: t => {
                        let { field: r } = t;
                        return (0, s.jsxs)(g, {
                          children: [
                            (0, s.jsx)(j, { children: e('subjectLabel') }),
                            (0, s.jsx)(y, {
                              children: (0, s.jsx)(N, {
                                placeholder: e('subjectPlaceholder'),
                                ...r,
                              }),
                            }),
                            (0, s.jsx)(v, {}),
                          ],
                        });
                      },
                    }),
                    (0, s.jsx)(h, {
                      control: m.control,
                      name: 'message',
                      render: t => {
                        let { field: r } = t;
                        return (0, s.jsxs)(g, {
                          children: [
                            (0, s.jsx)(j, { children: e('messageLabel') }),
                            (0, s.jsx)(y, {
                              children: (0, s.jsx)(w, {
                                placeholder: e('messagePlaceholder'),
                                className: 'min-h-32',
                                ...r,
                              }),
                            }),
                            (0, s.jsx)(v, {}),
                          ],
                        });
                      },
                    }),
                    (0, s.jsx)(d.$, {
                      type: 'submit',
                      className: 'w-full',
                      disabled: t,
                      children: t ? e('submitting') : e('submit'),
                    }),
                  ],
                }),
              }),
            }),
            (0, s.jsxs)('div', {
              className: 'mt-12 text-center',
              children: [
                (0, s.jsx)('h2', {
                  className: 'text-2xl font-bold mb-4',
                  children: e('alternativeTitle'),
                }),
                (0, s.jsxs)('p', {
                  className: 'mb-2',
                  children: [
                    (0, s.jsxs)('span', {
                      className: 'font-semibold',
                      children: [e('emailTitle'), ': '],
                    }),
                    (0, s.jsx)('a', {
                      href: 'mailto:your-email@example.com',
                      className: 'text-cyan-500 hover:text-cyan-400',
                      children: 'your-email@example.com',
                    }),
                  ],
                }),
                (0, s.jsxs)('p', {
                  className: 'mb-2',
                  children: [
                    (0, s.jsxs)('span', {
                      className: 'font-semibold',
                      children: [e('socialTitle'), ': '],
                    }),
                    (0, s.jsx)('a', {
                      href: 'https://twitter.com/yourusername',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'text-cyan-500 hover:text-cyan-400 mx-2',
                      children: 'Twitter',
                    }),
                    (0, s.jsx)('a', {
                      href: 'https://github.com/yourusername',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'text-cyan-500 hover:text-cyan-400 mx-2',
                      children: 'GitHub',
                    }),
                    (0, s.jsx)('a', {
                      href: 'https://linkedin.com/in/yourusername',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'text-cyan-500 hover:text-cyan-400 mx-2',
                      children: 'LinkedIn',
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
    1989: (e, t, r) => {
      'use strict';
      r.d(t, { J: () => d });
      var s = r(5155),
        a = r(2115),
        n = r(968),
        o = r(2085),
        i = r(9434);
      let l = (0, o.F)(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        ),
        d = a.forwardRef((e, t) => {
          let { className: r, ...a } = e;
          return (0, s.jsx)(n.b, { ref: t, className: (0, i.cn)(l(), r), ...a });
        });
      d.displayName = n.b.displayName;
    },
    2519: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 174));
    },
    9273: (e, t, r) => {
      'use strict';
      r.d(t, { $: () => d });
      var s = r(5155),
        a = r(2115),
        n = r(9708),
        o = r(2085),
        i = r(9434);
      let l = (0, o.F)(
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
        d = a.forwardRef((e, t) => {
          let { className: r, variant: a, size: o, asChild: d = !1, ...c } = e,
            m = d ? n.DX : 'button';
          return (0, s.jsx)(m, {
            className: (0, i.cn)(l({ variant: a, size: o, className: r })),
            ref: t,
            ...c,
          });
        });
      d.displayName = 'Button';
    },
    9434: (e, t, r) => {
      'use strict';
      r.d(t, { cn: () => n });
      var s = r(2596),
        a = r(9688);
      function n() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return (0, a.QP)((0, s.$)(t));
      }
    },
  },
  e => {
    var t = t => e((e.s = t));
    e.O(0, [453, 540, 173, 441, 684, 358], () => t(2519)), (_N_E = e.O());
  },
]);
