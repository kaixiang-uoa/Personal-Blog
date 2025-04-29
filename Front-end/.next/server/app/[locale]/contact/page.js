(() => {
  var e = {};
  (e.id = 638),
    (e.ids = [638]),
    (e.modules = {
      3295: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      4780: (e, t, r) => {
        'use strict';
        r.d(t, { cn: () => i });
        var a = r(49384),
          s = r(82348);
        function i(...e) {
          return (0, s.QP)((0, a.$)(e));
        }
      },
      10846: e => {
        'use strict';
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js');
      },
      19121: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
      },
      20505: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 48914));
      },
      21929: (e, t, r) => {
        'use strict';
        r.d(t, { J: () => o });
        var a = r(60687),
          s = r(43210),
          i = r(78148),
          n = r(24224),
          l = r(4780);
        let d = (0, n.F)(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          ),
          o = s.forwardRef(({ className: e, ...t }, r) =>
            (0, a.jsx)(i.b, { ref: r, className: (0, l.cn)(d(), e), ...t })
          );
        o.displayName = i.b.displayName;
      },
      26511: () => {},
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
      48914: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => i, dynamic: () => s });
        var a = r(12907);
        let s = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call dynamic() from the server but dynamic is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
              );
            },
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/contact/page.tsx',
            'dynamic'
          ),
          i = (0, a.registerClientReference)(
            function () {
              throw Error(
                'Attempted to call the default export of "/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/contact/page.tsx" from the server, but it\'s on the client. It\'s not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.'
              );
            },
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/contact/page.tsx',
            'default'
          );
      },
      51261: (e, t, r) => {
        'use strict';
        let a;
        r.r(t), r.d(t, { default: () => rh, dynamic: () => rf });
        var s,
          i,
          n,
          l,
          d,
          o,
          u = r(60687),
          c = r(43210),
          f = r(77618),
          h = e => 'checkbox' === e.type,
          m = e => e instanceof Date,
          p = e => null == e;
        let y = e => 'object' == typeof e;
        var v = e => !p(e) && !Array.isArray(e) && y(e) && !m(e),
          g = e => (v(e) && e.target ? (h(e.target) ? e.target.checked : e.target.value) : e),
          _ = e => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
          b = (e, t) => e.has(_(t)),
          x = e => {
            let t = e.constructor && e.constructor.prototype;
            return v(t) && t.hasOwnProperty('isPrototypeOf');
          },
          k =
            'undefined' != typeof window &&
            void 0 !== window.HTMLElement &&
            'undefined' != typeof document;
        function w(e) {
          let t,
            r = Array.isArray(e),
            a = 'undefined' != typeof FileList && e instanceof FileList;
          if (e instanceof Date) t = new Date(e);
          else if (e instanceof Set) t = new Set(e);
          else if (!(!(k && (e instanceof Blob || a)) && (r || v(e)))) return e;
          else if (((t = r ? [] : {}), r || x(e)))
            for (let r in e) e.hasOwnProperty(r) && (t[r] = w(e[r]));
          else t = e;
          return t;
        }
        var A = e => (Array.isArray(e) ? e.filter(Boolean) : []),
          j = e => void 0 === e,
          S = (e, t, r) => {
            if (!t || !v(e)) return r;
            let a = A(t.split(/[,[\].]+?/)).reduce((e, t) => (p(e) ? e : e[t]), e);
            return j(a) || a === e ? (j(e[t]) ? r : e[t]) : a;
          },
          T = e => 'boolean' == typeof e,
          O = e => /^\w*$/.test(e),
          C = e => A(e.replace(/["|']|\]/g, '').split(/\.|\[/)),
          N = (e, t, r) => {
            let a = -1,
              s = O(t) ? [t] : C(t),
              i = s.length,
              n = i - 1;
            for (; ++a < i; ) {
              let t = s[a],
                i = r;
              if (a !== n) {
                let r = e[t];
                i = v(r) || Array.isArray(r) ? r : isNaN(+s[a + 1]) ? {} : [];
              }
              if ('__proto__' === t || 'constructor' === t || 'prototype' === t) return;
              (e[t] = i), (e = e[t]);
            }
          };
        let F = { BLUR: 'blur', FOCUS_OUT: 'focusout', CHANGE: 'change' },
          V = {
            onBlur: 'onBlur',
            onChange: 'onChange',
            onSubmit: 'onSubmit',
            onTouched: 'onTouched',
            all: 'all',
          },
          E = {
            max: 'max',
            min: 'min',
            maxLength: 'maxLength',
            minLength: 'minLength',
            pattern: 'pattern',
            required: 'required',
            validate: 'validate',
          },
          Z = c.createContext(null),
          P = () => c.useContext(Z);
        var D = (e, t, r, a = !0) => {
            let s = { defaultValues: t._defaultValues };
            for (let i in e)
              Object.defineProperty(s, i, {
                get: () => (
                  t._proxyFormState[i] !== V.all && (t._proxyFormState[i] = !a || V.all),
                  r && (r[i] = !0),
                  e[i]
                ),
              });
            return s;
          },
          R = e => p(e) || !y(e);
        function I(e, t) {
          if (R(e) || R(t)) return e === t;
          if (m(e) && m(t)) return e.getTime() === t.getTime();
          let r = Object.keys(e),
            a = Object.keys(t);
          if (r.length !== a.length) return !1;
          for (let s of r) {
            let r = e[s];
            if (!a.includes(s)) return !1;
            if ('ref' !== s) {
              let e = t[s];
              if (
                (m(r) && m(e)) || (v(r) && v(e)) || (Array.isArray(r) && Array.isArray(e))
                  ? !I(r, e)
                  : r !== e
              )
                return !1;
            }
          }
          return !0;
        }
        let M = (e, t) => {
          let r = c.useRef(t);
          I(t, r.current) || (r.current = t), c.useEffect(e, r.current);
        };
        var $ = e => 'string' == typeof e,
          L = (e, t, r, a, s) =>
            $(e)
              ? (a && t.watch.add(e), S(r, e, s))
              : Array.isArray(e)
                ? e.map(e => (a && t.watch.add(e), S(r, e)))
                : (a && (t.watchAll = !0), r);
        let U = e =>
          e.render(
            (function (e) {
              let t = P(),
                { name: r, disabled: a, control: s = t.control, shouldUnregister: i } = e,
                n = b(s._names.array, r),
                l = (function (e) {
                  let t = P(),
                    {
                      control: r = t.control,
                      name: a,
                      defaultValue: s,
                      disabled: i,
                      exact: n,
                    } = e || {},
                    [l, d] = c.useState(r._getWatch(a, s));
                  return (
                    M(
                      () =>
                        r._subscribe({
                          name: a,
                          formState: { values: !0 },
                          exact: n,
                          callback: e => !i && d(L(a, r._names, e.values || r._formValues, !1, s)),
                        }),
                      [a, s, i, n]
                    ),
                    c.useEffect(() => r._removeUnmounted()),
                    l
                  );
                })({
                  control: s,
                  name: r,
                  defaultValue: S(s._formValues, r, S(s._defaultValues, r, e.defaultValue)),
                  exact: !0,
                }),
                d = (function (e) {
                  let t = P(),
                    { control: r = t.control, disabled: a, name: s, exact: i } = e || {},
                    [n, l] = c.useState(r._formState),
                    d = c.useRef({
                      isDirty: !1,
                      isLoading: !1,
                      dirtyFields: !1,
                      touchedFields: !1,
                      validatingFields: !1,
                      isValidating: !1,
                      isValid: !1,
                      errors: !1,
                    });
                  return (
                    M(
                      () =>
                        r._subscribe({
                          name: s,
                          formState: d.current,
                          exact: i,
                          callback: e => {
                            a || l({ ...r._formState, ...e });
                          },
                        }),
                      [s, a, i]
                    ),
                    c.useEffect(() => {
                      d.current.isValid && r._setValid(!0);
                    }, [r]),
                    c.useMemo(() => D(n, r, d.current, !1), [n, r])
                  );
                })({ control: s, name: r, exact: !0 }),
                o = c.useRef(e),
                u = c.useRef(
                  s.register(r, {
                    ...e.rules,
                    value: l,
                    ...(T(e.disabled) ? { disabled: e.disabled } : {}),
                  })
                ),
                f = c.useMemo(
                  () =>
                    Object.defineProperties(
                      {},
                      {
                        invalid: { enumerable: !0, get: () => !!S(d.errors, r) },
                        isDirty: { enumerable: !0, get: () => !!S(d.dirtyFields, r) },
                        isTouched: { enumerable: !0, get: () => !!S(d.touchedFields, r) },
                        isValidating: { enumerable: !0, get: () => !!S(d.validatingFields, r) },
                        error: { enumerable: !0, get: () => S(d.errors, r) },
                      }
                    ),
                  [d, r]
                ),
                h = c.useCallback(
                  e => u.current.onChange({ target: { value: g(e), name: r }, type: F.CHANGE }),
                  [r]
                ),
                m = c.useCallback(
                  () =>
                    u.current.onBlur({
                      target: { value: S(s._formValues, r), name: r },
                      type: F.BLUR,
                    }),
                  [r, s._formValues]
                ),
                p = c.useCallback(
                  e => {
                    let t = S(s._fields, r);
                    t &&
                      e &&
                      (t._f.ref = {
                        focus: () => e.focus(),
                        select: () => e.select(),
                        setCustomValidity: t => e.setCustomValidity(t),
                        reportValidity: () => e.reportValidity(),
                      });
                  },
                  [s._fields, r]
                ),
                y = c.useMemo(
                  () => ({
                    name: r,
                    value: l,
                    ...(T(a) || d.disabled ? { disabled: d.disabled || a } : {}),
                    onChange: h,
                    onBlur: m,
                    ref: p,
                  }),
                  [r, a, d.disabled, h, m, p, l]
                );
              return (
                c.useEffect(() => {
                  let e = s._options.shouldUnregister || i;
                  s.register(r, {
                    ...o.current.rules,
                    ...(T(o.current.disabled) ? { disabled: o.current.disabled } : {}),
                  });
                  let t = (e, t) => {
                    let r = S(s._fields, e);
                    r && r._f && (r._f.mount = t);
                  };
                  if ((t(r, !0), e)) {
                    let e = w(S(s._options.defaultValues, r));
                    N(s._defaultValues, r, e), j(S(s._formValues, r)) && N(s._formValues, r, e);
                  }
                  return (
                    n || s.register(r),
                    () => {
                      (n ? e && !s._state.action : e) ? s.unregister(r) : t(r, !1);
                    }
                  );
                }, [r, s, n, i]),
                c.useEffect(() => {
                  s._setDisabledField({ disabled: a, name: r });
                }, [a, r, s]),
                c.useMemo(() => ({ field: y, formState: d, fieldState: f }), [y, d, f])
              );
            })(e)
          );
        var z = (e, t, r, a, s) =>
            t
              ? { ...r[e], types: { ...(r[e] && r[e].types ? r[e].types : {}), [a]: s || !0 } }
              : {},
          B = e => (Array.isArray(e) ? e : [e]),
          W = () => {
            let e = [];
            return {
              get observers() {
                return e;
              },
              next: t => {
                for (let r of e) r.next && r.next(t);
              },
              subscribe: t => (
                e.push(t),
                {
                  unsubscribe: () => {
                    e = e.filter(e => e !== t);
                  },
                }
              ),
              unsubscribe: () => {
                e = [];
              },
            };
          },
          q = e => v(e) && !Object.keys(e).length,
          K = e => 'file' === e.type,
          G = e => 'function' == typeof e,
          H = e => {
            if (!k) return !1;
            let t = e ? e.ownerDocument : 0;
            return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
          },
          J = e => 'select-multiple' === e.type,
          X = e => 'radio' === e.type,
          Y = e => X(e) || h(e),
          Q = e => H(e) && e.isConnected;
        function ee(e, t) {
          let r = Array.isArray(t) ? t : O(t) ? [t] : C(t),
            a =
              1 === r.length
                ? e
                : (function (e, t) {
                    let r = t.slice(0, -1).length,
                      a = 0;
                    for (; a < r; ) e = j(e) ? a++ : e[t[a++]];
                    return e;
                  })(e, r),
            s = r.length - 1,
            i = r[s];
          return (
            a && delete a[i],
            0 !== s &&
              ((v(a) && q(a)) ||
                (Array.isArray(a) &&
                  (function (e) {
                    for (let t in e) if (e.hasOwnProperty(t) && !j(e[t])) return !1;
                    return !0;
                  })(a))) &&
              ee(e, r.slice(0, -1)),
            e
          );
        }
        var et = e => {
          for (let t in e) if (G(e[t])) return !0;
          return !1;
        };
        function er(e, t = {}) {
          let r = Array.isArray(e);
          if (v(e) || r)
            for (let r in e)
              Array.isArray(e[r]) || (v(e[r]) && !et(e[r]))
                ? ((t[r] = Array.isArray(e[r]) ? [] : {}), er(e[r], t[r]))
                : p(e[r]) || (t[r] = !0);
          return t;
        }
        var ea = (e, t) =>
          (function e(t, r, a) {
            let s = Array.isArray(t);
            if (v(t) || s)
              for (let s in t)
                Array.isArray(t[s]) || (v(t[s]) && !et(t[s]))
                  ? j(r) || R(a[s])
                    ? (a[s] = Array.isArray(t[s]) ? er(t[s], []) : { ...er(t[s]) })
                    : e(t[s], p(r) ? {} : r[s], a[s])
                  : (a[s] = !I(t[s], r[s]));
            return a;
          })(e, t, er(t));
        let es = { value: !1, isValid: !1 },
          ei = { value: !0, isValid: !0 };
        var en = e => {
            if (Array.isArray(e)) {
              if (e.length > 1) {
                let t = e.filter(e => e && e.checked && !e.disabled).map(e => e.value);
                return { value: t, isValid: !!t.length };
              }
              return e[0].checked && !e[0].disabled
                ? e[0].attributes && !j(e[0].attributes.value)
                  ? j(e[0].value) || '' === e[0].value
                    ? ei
                    : { value: e[0].value, isValid: !0 }
                  : ei
                : es;
            }
            return es;
          },
          el = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: a }) =>
            j(e) ? e : t ? ('' === e ? NaN : e ? +e : e) : r && $(e) ? new Date(e) : a ? a(e) : e;
        let ed = { isValid: !1, value: null };
        var eo = e =>
          Array.isArray(e)
            ? e.reduce(
                (e, t) => (t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e),
                ed
              )
            : ed;
        function eu(e) {
          let t = e.ref;
          return K(t)
            ? t.files
            : X(t)
              ? eo(e.refs).value
              : J(t)
                ? [...t.selectedOptions].map(({ value: e }) => e)
                : h(t)
                  ? en(e.refs).value
                  : el(j(t.value) ? e.ref.value : t.value, e);
        }
        var ec = (e, t, r, a) => {
            let s = {};
            for (let r of e) {
              let e = S(t, r);
              e && N(s, r, e._f);
            }
            return { criteriaMode: r, names: [...e], fields: s, shouldUseNativeValidation: a };
          },
          ef = e => e instanceof RegExp,
          eh = e =>
            j(e) ? e : ef(e) ? e.source : v(e) ? (ef(e.value) ? e.value.source : e.value) : e,
          em = e => ({
            isOnSubmit: !e || e === V.onSubmit,
            isOnBlur: e === V.onBlur,
            isOnChange: e === V.onChange,
            isOnAll: e === V.all,
            isOnTouch: e === V.onTouched,
          });
        let ep = 'AsyncFunction';
        var ey = e =>
            !!e &&
            !!e.validate &&
            !!(
              (G(e.validate) && e.validate.constructor.name === ep) ||
              (v(e.validate) && Object.values(e.validate).find(e => e.constructor.name === ep))
            ),
          ev = e =>
            e.mount &&
            (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate),
          eg = (e, t, r) =>
            !r &&
            (t.watchAll ||
              t.watch.has(e) ||
              [...t.watch].some(t => e.startsWith(t) && /^\.\w+/.test(e.slice(t.length))));
        let e_ = (e, t, r, a) => {
          for (let s of r || Object.keys(e)) {
            let r = S(e, s);
            if (r) {
              let { _f: e, ...i } = r;
              if (e) {
                if (e.refs && e.refs[0] && t(e.refs[0], s) && !a) return !0;
                else if (e.ref && t(e.ref, e.name) && !a) return !0;
                else if (e_(i, t)) break;
              } else if (v(i) && e_(i, t)) break;
            }
          }
        };
        function eb(e, t, r) {
          let a = S(e, r);
          if (a || O(r)) return { error: a, name: r };
          let s = r.split('.');
          for (; s.length; ) {
            let a = s.join('.'),
              i = S(t, a),
              n = S(e, a);
            if (i && !Array.isArray(i) && r !== a) break;
            if (n && n.type) return { name: a, error: n };
            s.pop();
          }
          return { name: r };
        }
        var ex = (e, t, r, a) => {
            r(e);
            let { name: s, ...i } = e;
            return (
              q(i) ||
              Object.keys(i).length >= Object.keys(t).length ||
              Object.keys(i).find(e => t[e] === (!a || V.all))
            );
          },
          ek = (e, t, r) =>
            !e ||
            !t ||
            e === t ||
            B(e).some(e => e && (r ? e === t : e.startsWith(t) || t.startsWith(e))),
          ew = (e, t, r, a, s) =>
            !s.isOnAll &&
            (!r && s.isOnTouch
              ? !(t || e)
              : (r ? a.isOnBlur : s.isOnBlur)
                ? !e
                : (r ? !a.isOnChange : !s.isOnChange) || e),
          eA = (e, t) => !A(S(e, t)).length && ee(e, t),
          ej = (e, t, r) => {
            let a = B(S(e, r));
            return N(a, 'root', t[r]), N(e, r, a), e;
          },
          eS = e => $(e);
        function eT(e, t, r = 'validate') {
          if (eS(e) || (Array.isArray(e) && e.every(eS)) || (T(e) && !e))
            return { type: r, message: eS(e) ? e : '', ref: t };
        }
        var eO = e => (v(e) && !ef(e) ? e : { value: e, message: '' }),
          eC = async (e, t, r, a, s, i) => {
            let {
                ref: n,
                refs: l,
                required: d,
                maxLength: o,
                minLength: u,
                min: c,
                max: f,
                pattern: m,
                validate: y,
                name: g,
                valueAsNumber: _,
                mount: b,
              } = e._f,
              x = S(r, g);
            if (!b || t.has(g)) return {};
            let k = l ? l[0] : n,
              w = e => {
                s &&
                  k.reportValidity &&
                  (k.setCustomValidity(T(e) ? '' : e || ''), k.reportValidity());
              },
              A = {},
              O = X(n),
              C = h(n),
              N =
                ((_ || K(n)) && j(n.value) && j(x)) ||
                (H(n) && '' === n.value) ||
                '' === x ||
                (Array.isArray(x) && !x.length),
              F = z.bind(null, g, a, A),
              V = (e, t, r, a = E.maxLength, s = E.minLength) => {
                let i = e ? t : r;
                A[g] = { type: e ? a : s, message: i, ref: n, ...F(e ? a : s, i) };
              };
            if (
              i
                ? !Array.isArray(x) || !x.length
                : d &&
                  ((!(O || C) && (N || p(x))) ||
                    (T(x) && !x) ||
                    (C && !en(l).isValid) ||
                    (O && !eo(l).isValid))
            ) {
              let { value: e, message: t } = eS(d) ? { value: !!d, message: d } : eO(d);
              if (e && ((A[g] = { type: E.required, message: t, ref: k, ...F(E.required, t) }), !a))
                return w(t), A;
            }
            if (!N && (!p(c) || !p(f))) {
              let e,
                t,
                r = eO(f),
                s = eO(c);
              if (p(x) || isNaN(x)) {
                let a = n.valueAsDate || new Date(x),
                  i = e => new Date(new Date().toDateString() + ' ' + e),
                  l = 'time' == n.type,
                  d = 'week' == n.type;
                $(r.value) &&
                  x &&
                  (e = l ? i(x) > i(r.value) : d ? x > r.value : a > new Date(r.value)),
                  $(s.value) &&
                    x &&
                    (t = l ? i(x) < i(s.value) : d ? x < s.value : a < new Date(s.value));
              } else {
                let a = n.valueAsNumber || (x ? +x : x);
                p(r.value) || (e = a > r.value), p(s.value) || (t = a < s.value);
              }
              if ((e || t) && (V(!!e, r.message, s.message, E.max, E.min), !a))
                return w(A[g].message), A;
            }
            if ((o || u) && !N && ($(x) || (i && Array.isArray(x)))) {
              let e = eO(o),
                t = eO(u),
                r = !p(e.value) && x.length > +e.value,
                s = !p(t.value) && x.length < +t.value;
              if ((r || s) && (V(r, e.message, t.message), !a)) return w(A[g].message), A;
            }
            if (m && !N && $(x)) {
              let { value: e, message: t } = eO(m);
              if (
                ef(e) &&
                !x.match(e) &&
                ((A[g] = { type: E.pattern, message: t, ref: n, ...F(E.pattern, t) }), !a)
              )
                return w(t), A;
            }
            if (y) {
              if (G(y)) {
                let e = eT(await y(x, r), k);
                if (e && ((A[g] = { ...e, ...F(E.validate, e.message) }), !a))
                  return w(e.message), A;
              } else if (v(y)) {
                let e = {};
                for (let t in y) {
                  if (!q(e) && !a) break;
                  let s = eT(await y[t](x, r), k, t);
                  s && ((e = { ...s, ...F(t, s.message) }), w(s.message), a && (A[g] = e));
                }
                if (!q(e) && ((A[g] = { ref: k, ...e }), !a)) return A;
              }
            }
            return w(!0), A;
          };
        let eN = { mode: V.onSubmit, reValidateMode: V.onChange, shouldFocusError: !0 },
          eF = 'undefined' != typeof window ? c.useLayoutEffect : c.useEffect,
          eV = (e, t, r) => {
            if (e && 'reportValidity' in e) {
              let a = S(r, t);
              e.setCustomValidity((a && a.message) || ''), e.reportValidity();
            }
          },
          eE = (e, t) => {
            for (let r in t.fields) {
              let a = t.fields[r];
              a && a.ref && 'reportValidity' in a.ref
                ? eV(a.ref, r, e)
                : a && a.refs && a.refs.forEach(t => eV(t, r, e));
            }
          },
          eZ = (e, t) => {
            t.shouldUseNativeValidation && eE(e, t);
            let r = {};
            for (let a in e) {
              let s = S(t.fields, a),
                i = Object.assign(e[a] || {}, { ref: s && s.ref });
              if (eP(t.names || Object.keys(e), a)) {
                let e = Object.assign({}, S(r, a));
                N(e, 'root', i), N(r, a, e);
              } else N(r, a, i);
            }
            return r;
          },
          eP = (e, t) => {
            let r = eD(t);
            return e.some(e => eD(e).match(`^${r}\\.\\d+`));
          };
        function eD(e) {
          return e.replace(/\]|\[/g, '');
        }
        !(function (e) {
          (e.assertEqual = e => e),
            (e.assertIs = function (e) {}),
            (e.assertNever = function (e) {
              throw Error();
            }),
            (e.arrayToEnum = e => {
              let t = {};
              for (let r of e) t[r] = r;
              return t;
            }),
            (e.getValidEnumValues = t => {
              let r = e.objectKeys(t).filter(e => 'number' != typeof t[t[e]]),
                a = {};
              for (let e of r) a[e] = t[e];
              return e.objectValues(a);
            }),
            (e.objectValues = t =>
              e.objectKeys(t).map(function (e) {
                return t[e];
              })),
            (e.objectKeys =
              'function' == typeof Object.keys
                ? e => Object.keys(e)
                : e => {
                    let t = [];
                    for (let r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                    return t;
                  }),
            (e.find = (e, t) => {
              for (let r of e) if (t(r)) return r;
            }),
            (e.isInteger =
              'function' == typeof Number.isInteger
                ? e => Number.isInteger(e)
                : e => 'number' == typeof e && isFinite(e) && Math.floor(e) === e),
            (e.joinValues = function (e, t = ' | ') {
              return e.map(e => ('string' == typeof e ? `'${e}'` : e)).join(t);
            }),
            (e.jsonStringifyReplacer = (e, t) => ('bigint' == typeof t ? t.toString() : t));
        })(s || (s = {})),
          ((i || (i = {})).mergeShapes = (e, t) => ({ ...e, ...t }));
        let eR = s.arrayToEnum([
            'string',
            'nan',
            'number',
            'integer',
            'float',
            'boolean',
            'date',
            'bigint',
            'symbol',
            'function',
            'undefined',
            'null',
            'array',
            'object',
            'unknown',
            'promise',
            'void',
            'never',
            'map',
            'set',
          ]),
          eI = e => {
            switch (typeof e) {
              case 'undefined':
                return eR.undefined;
              case 'string':
                return eR.string;
              case 'number':
                return isNaN(e) ? eR.nan : eR.number;
              case 'boolean':
                return eR.boolean;
              case 'function':
                return eR.function;
              case 'bigint':
                return eR.bigint;
              case 'symbol':
                return eR.symbol;
              case 'object':
                if (Array.isArray(e)) return eR.array;
                if (null === e) return eR.null;
                if (
                  e.then &&
                  'function' == typeof e.then &&
                  e.catch &&
                  'function' == typeof e.catch
                )
                  return eR.promise;
                if ('undefined' != typeof Map && e instanceof Map) return eR.map;
                if ('undefined' != typeof Set && e instanceof Set) return eR.set;
                if ('undefined' != typeof Date && e instanceof Date) return eR.date;
                return eR.object;
              default:
                return eR.unknown;
            }
          },
          eM = s.arrayToEnum([
            'invalid_type',
            'invalid_literal',
            'custom',
            'invalid_union',
            'invalid_union_discriminator',
            'invalid_enum_value',
            'unrecognized_keys',
            'invalid_arguments',
            'invalid_return_type',
            'invalid_date',
            'invalid_string',
            'too_small',
            'too_big',
            'invalid_intersection_types',
            'not_multiple_of',
            'not_finite',
          ]);
        class e$ extends Error {
          get errors() {
            return this.issues;
          }
          constructor(e) {
            super(),
              (this.issues = []),
              (this.addIssue = e => {
                this.issues = [...this.issues, e];
              }),
              (this.addIssues = (e = []) => {
                this.issues = [...this.issues, ...e];
              });
            let t = new.target.prototype;
            Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : (this.__proto__ = t),
              (this.name = 'ZodError'),
              (this.issues = e);
          }
          format(e) {
            let t =
                e ||
                function (e) {
                  return e.message;
                },
              r = { _errors: [] },
              a = e => {
                for (let s of e.issues)
                  if ('invalid_union' === s.code) s.unionErrors.map(a);
                  else if ('invalid_return_type' === s.code) a(s.returnTypeError);
                  else if ('invalid_arguments' === s.code) a(s.argumentsError);
                  else if (0 === s.path.length) r._errors.push(t(s));
                  else {
                    let e = r,
                      a = 0;
                    for (; a < s.path.length; ) {
                      let r = s.path[a];
                      a === s.path.length - 1
                        ? ((e[r] = e[r] || { _errors: [] }), e[r]._errors.push(t(s)))
                        : (e[r] = e[r] || { _errors: [] }),
                        (e = e[r]),
                        a++;
                    }
                  }
              };
            return a(this), r;
          }
          static assert(e) {
            if (!(e instanceof e$)) throw Error(`Not a ZodError: ${e}`);
          }
          toString() {
            return this.message;
          }
          get message() {
            return JSON.stringify(this.issues, s.jsonStringifyReplacer, 2);
          }
          get isEmpty() {
            return 0 === this.issues.length;
          }
          flatten(e = e => e.message) {
            let t = {},
              r = [];
            for (let a of this.issues)
              a.path.length > 0
                ? ((t[a.path[0]] = t[a.path[0]] || []), t[a.path[0]].push(e(a)))
                : r.push(e(a));
            return { formErrors: r, fieldErrors: t };
          }
          get formErrors() {
            return this.flatten();
          }
        }
        e$.create = e => new e$(e);
        let eL = (e, t) => {
          let r;
          switch (e.code) {
            case eM.invalid_type:
              r =
                e.received === eR.undefined
                  ? 'Required'
                  : `Expected ${e.expected}, received ${e.received}`;
              break;
            case eM.invalid_literal:
              r = `Invalid literal value, expected ${JSON.stringify(e.expected, s.jsonStringifyReplacer)}`;
              break;
            case eM.unrecognized_keys:
              r = `Unrecognized key(s) in object: ${s.joinValues(e.keys, ', ')}`;
              break;
            case eM.invalid_union:
              r = 'Invalid input';
              break;
            case eM.invalid_union_discriminator:
              r = `Invalid discriminator value. Expected ${s.joinValues(e.options)}`;
              break;
            case eM.invalid_enum_value:
              r = `Invalid enum value. Expected ${s.joinValues(e.options)}, received '${e.received}'`;
              break;
            case eM.invalid_arguments:
              r = 'Invalid function arguments';
              break;
            case eM.invalid_return_type:
              r = 'Invalid function return type';
              break;
            case eM.invalid_date:
              r = 'Invalid date';
              break;
            case eM.invalid_string:
              'object' == typeof e.validation
                ? 'includes' in e.validation
                  ? ((r = `Invalid input: must include "${e.validation.includes}"`),
                    'number' == typeof e.validation.position &&
                      (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
                  : 'startsWith' in e.validation
                    ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
                    : 'endsWith' in e.validation
                      ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
                      : s.assertNever(e.validation)
                : (r = 'regex' !== e.validation ? `Invalid ${e.validation}` : 'Invalid');
              break;
            case eM.too_small:
              r =
                'array' === e.type
                  ? `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'more than'} ${e.minimum} element(s)`
                  : 'string' === e.type
                    ? `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'over'} ${e.minimum} character(s)`
                    : 'number' === e.type
                      ? `Number must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${e.minimum}`
                      : 'date' === e.type
                        ? `Date must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(e.minimum))}`
                        : 'Invalid input';
              break;
            case eM.too_big:
              r =
                'array' === e.type
                  ? `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'less than'} ${e.maximum} element(s)`
                  : 'string' === e.type
                    ? `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'under'} ${e.maximum} character(s)`
                    : 'number' === e.type
                      ? `Number must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`
                      : 'bigint' === e.type
                        ? `BigInt must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`
                        : 'date' === e.type
                          ? `Date must be ${e.exact ? 'exactly' : e.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(e.maximum))}`
                          : 'Invalid input';
              break;
            case eM.custom:
              r = 'Invalid input';
              break;
            case eM.invalid_intersection_types:
              r = 'Intersection results could not be merged';
              break;
            case eM.not_multiple_of:
              r = `Number must be a multiple of ${e.multipleOf}`;
              break;
            case eM.not_finite:
              r = 'Number must be finite';
              break;
            default:
              (r = t.defaultError), s.assertNever(e);
          }
          return { message: r };
        };
        function eU() {
          return eL;
        }
        let ez = e => {
          let { data: t, path: r, errorMaps: a, issueData: s } = e,
            i = [...r, ...(s.path || [])],
            n = { ...s, path: i };
          if (void 0 !== s.message) return { ...s, path: i, message: s.message };
          let l = '';
          for (let e of a
            .filter(e => !!e)
            .slice()
            .reverse())
            l = e(n, { data: t, defaultError: l }).message;
          return { ...s, path: i, message: l };
        };
        function eB(e, t) {
          let r = ez({
            issueData: t,
            data: e.data,
            path: e.path,
            errorMaps: [
              e.common.contextualErrorMap,
              e.schemaErrorMap,
              eL,
              eL == eL ? void 0 : eL,
            ].filter(e => !!e),
          });
          e.common.issues.push(r);
        }
        class eW {
          constructor() {
            this.value = 'valid';
          }
          dirty() {
            'valid' === this.value && (this.value = 'dirty');
          }
          abort() {
            'aborted' !== this.value && (this.value = 'aborted');
          }
          static mergeArray(e, t) {
            let r = [];
            for (let a of t) {
              if ('aborted' === a.status) return eq;
              'dirty' === a.status && e.dirty(), r.push(a.value);
            }
            return { status: e.value, value: r };
          }
          static async mergeObjectAsync(e, t) {
            let r = [];
            for (let e of t) {
              let t = await e.key,
                a = await e.value;
              r.push({ key: t, value: a });
            }
            return eW.mergeObjectSync(e, r);
          }
          static mergeObjectSync(e, t) {
            let r = {};
            for (let a of t) {
              let { key: t, value: s } = a;
              if ('aborted' === t.status || 'aborted' === s.status) return eq;
              'dirty' === t.status && e.dirty(),
                'dirty' === s.status && e.dirty(),
                '__proto__' !== t.value &&
                  (void 0 !== s.value || a.alwaysSet) &&
                  (r[t.value] = s.value);
            }
            return { status: e.value, value: r };
          }
        }
        let eq = Object.freeze({ status: 'aborted' }),
          eK = e => ({ status: 'dirty', value: e }),
          eG = e => ({ status: 'valid', value: e }),
          eH = e => 'aborted' === e.status,
          eJ = e => 'dirty' === e.status,
          eX = e => 'valid' === e.status,
          eY = e => 'undefined' != typeof Promise && e instanceof Promise;
        function eQ(e, t, r, a) {
          if ('a' === r && !a) throw TypeError('Private accessor was defined without a getter');
          if ('function' == typeof t ? e !== t || !a : !t.has(e))
            throw TypeError(
              'Cannot read private member from an object whose class did not declare it'
            );
          return 'm' === r ? a : 'a' === r ? a.call(e) : a ? a.value : t.get(e);
        }
        function e0(e, t, r, a, s) {
          if ('m' === a) throw TypeError('Private method is not writable');
          if ('a' === a && !s) throw TypeError('Private accessor was defined without a setter');
          if ('function' == typeof t ? e !== t || !s : !t.has(e))
            throw TypeError(
              'Cannot write private member to an object whose class did not declare it'
            );
          return 'a' === a ? s.call(e, r) : s ? (s.value = r) : t.set(e, r), r;
        }
        'function' == typeof SuppressedError && SuppressedError,
          (function (e) {
            (e.errToObj = e => ('string' == typeof e ? { message: e } : e || {})),
              (e.toString = e => ('string' == typeof e ? e : null == e ? void 0 : e.message));
          })(n || (n = {}));
        class e1 {
          constructor(e, t, r, a) {
            (this._cachedPath = []),
              (this.parent = e),
              (this.data = t),
              (this._path = r),
              (this._key = a);
          }
          get path() {
            return (
              this._cachedPath.length ||
                (this._key instanceof Array
                  ? this._cachedPath.push(...this._path, ...this._key)
                  : this._cachedPath.push(...this._path, this._key)),
              this._cachedPath
            );
          }
        }
        let e4 = (e, t) => {
          if (eX(t)) return { success: !0, data: t.value };
          if (!e.common.issues.length) throw Error('Validation failed but no issues detected.');
          return {
            success: !1,
            get error() {
              if (this._error) return this._error;
              let t = new e$(e.common.issues);
              return (this._error = t), this._error;
            },
          };
        };
        function e9(e) {
          if (!e) return {};
          let { errorMap: t, invalid_type_error: r, required_error: a, description: s } = e;
          if (t && (r || a))
            throw Error(
              'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
            );
          return t
            ? { errorMap: t, description: s }
            : {
                errorMap: (t, s) => {
                  var i, n;
                  let { message: l } = e;
                  return 'invalid_enum_value' === t.code
                    ? { message: null != l ? l : s.defaultError }
                    : void 0 === s.data
                      ? { message: null != (i = null != l ? l : a) ? i : s.defaultError }
                      : 'invalid_type' !== t.code
                        ? { message: s.defaultError }
                        : { message: null != (n = null != l ? l : r) ? n : s.defaultError };
                },
                description: s,
              };
        }
        class e2 {
          get description() {
            return this._def.description;
          }
          _getType(e) {
            return eI(e.data);
          }
          _getOrReturnCtx(e, t) {
            return (
              t || {
                common: e.parent.common,
                data: e.data,
                parsedType: eI(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent,
              }
            );
          }
          _processInputParams(e) {
            return {
              status: new eW(),
              ctx: {
                common: e.parent.common,
                data: e.data,
                parsedType: eI(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent,
              },
            };
          }
          _parseSync(e) {
            let t = this._parse(e);
            if (eY(t)) throw Error('Synchronous parse encountered promise.');
            return t;
          }
          _parseAsync(e) {
            return Promise.resolve(this._parse(e));
          }
          parse(e, t) {
            let r = this.safeParse(e, t);
            if (r.success) return r.data;
            throw r.error;
          }
          safeParse(e, t) {
            var r;
            let a = {
                common: {
                  issues: [],
                  async: null != (r = null == t ? void 0 : t.async) && r,
                  contextualErrorMap: null == t ? void 0 : t.errorMap,
                },
                path: (null == t ? void 0 : t.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: eI(e),
              },
              s = this._parseSync({ data: e, path: a.path, parent: a });
            return e4(a, s);
          }
          '~validate'(e) {
            var t, r;
            let a = {
              common: { issues: [], async: !!this['~standard'].async },
              path: [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: eI(e),
            };
            if (!this['~standard'].async)
              try {
                let t = this._parseSync({ data: e, path: [], parent: a });
                return eX(t) ? { value: t.value } : { issues: a.common.issues };
              } catch (e) {
                (null ==
                (r = null == (t = null == e ? void 0 : e.message) ? void 0 : t.toLowerCase())
                  ? void 0
                  : r.includes('encountered')) && (this['~standard'].async = !0),
                  (a.common = { issues: [], async: !0 });
              }
            return this._parseAsync({ data: e, path: [], parent: a }).then(e =>
              eX(e) ? { value: e.value } : { issues: a.common.issues }
            );
          }
          async parseAsync(e, t) {
            let r = await this.safeParseAsync(e, t);
            if (r.success) return r.data;
            throw r.error;
          }
          async safeParseAsync(e, t) {
            let r = {
                common: {
                  issues: [],
                  contextualErrorMap: null == t ? void 0 : t.errorMap,
                  async: !0,
                },
                path: (null == t ? void 0 : t.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: eI(e),
              },
              a = this._parse({ data: e, path: r.path, parent: r });
            return e4(r, await (eY(a) ? a : Promise.resolve(a)));
          }
          refine(e, t) {
            let r = e =>
              'string' == typeof t || void 0 === t
                ? { message: t }
                : 'function' == typeof t
                  ? t(e)
                  : t;
            return this._refinement((t, a) => {
              let s = e(t),
                i = () => a.addIssue({ code: eM.custom, ...r(t) });
              return 'undefined' != typeof Promise && s instanceof Promise
                ? s.then(e => !!e || (i(), !1))
                : !!s || (i(), !1);
            });
          }
          refinement(e, t) {
            return this._refinement(
              (r, a) => !!e(r) || (a.addIssue('function' == typeof t ? t(r, a) : t), !1)
            );
          }
          _refinement(e) {
            return new tL({
              schema: this,
              typeName: o.ZodEffects,
              effect: { type: 'refinement', refinement: e },
            });
          }
          superRefine(e) {
            return this._refinement(e);
          }
          constructor(e) {
            (this.spa = this.safeParseAsync),
              (this._def = e),
              (this.parse = this.parse.bind(this)),
              (this.safeParse = this.safeParse.bind(this)),
              (this.parseAsync = this.parseAsync.bind(this)),
              (this.safeParseAsync = this.safeParseAsync.bind(this)),
              (this.spa = this.spa.bind(this)),
              (this.refine = this.refine.bind(this)),
              (this.refinement = this.refinement.bind(this)),
              (this.superRefine = this.superRefine.bind(this)),
              (this.optional = this.optional.bind(this)),
              (this.nullable = this.nullable.bind(this)),
              (this.nullish = this.nullish.bind(this)),
              (this.array = this.array.bind(this)),
              (this.promise = this.promise.bind(this)),
              (this.or = this.or.bind(this)),
              (this.and = this.and.bind(this)),
              (this.transform = this.transform.bind(this)),
              (this.brand = this.brand.bind(this)),
              (this.default = this.default.bind(this)),
              (this.catch = this.catch.bind(this)),
              (this.describe = this.describe.bind(this)),
              (this.pipe = this.pipe.bind(this)),
              (this.readonly = this.readonly.bind(this)),
              (this.isNullable = this.isNullable.bind(this)),
              (this.isOptional = this.isOptional.bind(this)),
              (this['~standard'] = {
                version: 1,
                vendor: 'zod',
                validate: e => this['~validate'](e),
              });
          }
          optional() {
            return tU.create(this, this._def);
          }
          nullable() {
            return tz.create(this, this._def);
          }
          nullish() {
            return this.nullable().optional();
          }
          array() {
            return tA.create(this);
          }
          promise() {
            return t$.create(this, this._def);
          }
          or(e) {
            return tS.create([this, e], this._def);
          }
          and(e) {
            return tC.create(this, e, this._def);
          }
          transform(e) {
            return new tL({
              ...e9(this._def),
              schema: this,
              typeName: o.ZodEffects,
              effect: { type: 'transform', transform: e },
            });
          }
          default(e) {
            return new tB({
              ...e9(this._def),
              innerType: this,
              defaultValue: 'function' == typeof e ? e : () => e,
              typeName: o.ZodDefault,
            });
          }
          brand() {
            return new tK({ typeName: o.ZodBranded, type: this, ...e9(this._def) });
          }
          catch(e) {
            return new tW({
              ...e9(this._def),
              innerType: this,
              catchValue: 'function' == typeof e ? e : () => e,
              typeName: o.ZodCatch,
            });
          }
          describe(e) {
            return new this.constructor({ ...this._def, description: e });
          }
          pipe(e) {
            return tG.create(this, e);
          }
          readonly() {
            return tH.create(this);
          }
          isOptional() {
            return this.safeParse(void 0).success;
          }
          isNullable() {
            return this.safeParse(null).success;
          }
        }
        let e3 = /^c[^\s-]{8,}$/i,
          e6 = /^[0-9a-z]+$/,
          e5 = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
          e8 =
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
          e7 = /^[a-z0-9_-]{21}$/i,
          te = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
          tt =
            /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
          tr = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
          ta =
            /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
          ts =
            /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
          ti =
            /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
          tn =
            /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
          tl = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
          td = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
          to =
            '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
          tu = RegExp(`^${to}$`);
        function tc(e) {
          let t = '([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d';
          return (
            e.precision
              ? (t = `${t}\\.\\d{${e.precision}}`)
              : null == e.precision && (t = `${t}(\\.\\d+)?`),
            t
          );
        }
        class tf extends e2 {
          _parse(e) {
            var t, r, i, n;
            let l;
            if ((this._def.coerce && (e.data = String(e.data)), this._getType(e) !== eR.string)) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.string, received: t.parsedType }), eq
              );
            }
            let d = new eW();
            for (let o of this._def.checks)
              if ('min' === o.kind)
                e.data.length < o.value &&
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    code: eM.too_small,
                    minimum: o.value,
                    type: 'string',
                    inclusive: !0,
                    exact: !1,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('max' === o.kind)
                e.data.length > o.value &&
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    code: eM.too_big,
                    maximum: o.value,
                    type: 'string',
                    inclusive: !0,
                    exact: !1,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('length' === o.kind) {
                let t = e.data.length > o.value,
                  r = e.data.length < o.value;
                (t || r) &&
                  ((l = this._getOrReturnCtx(e, l)),
                  t
                    ? eB(l, {
                        code: eM.too_big,
                        maximum: o.value,
                        type: 'string',
                        inclusive: !0,
                        exact: !0,
                        message: o.message,
                      })
                    : r &&
                      eB(l, {
                        code: eM.too_small,
                        minimum: o.value,
                        type: 'string',
                        inclusive: !0,
                        exact: !0,
                        message: o.message,
                      }),
                  d.dirty());
              } else if ('email' === o.kind)
                tr.test(e.data) ||
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'email',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('emoji' === o.kind)
                a || (a = RegExp('^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$', 'u')),
                  a.test(e.data) ||
                    (eB((l = this._getOrReturnCtx(e, l)), {
                      validation: 'emoji',
                      code: eM.invalid_string,
                      message: o.message,
                    }),
                    d.dirty());
              else if ('uuid' === o.kind)
                e8.test(e.data) ||
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'uuid',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('nanoid' === o.kind)
                e7.test(e.data) ||
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'nanoid',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('cuid' === o.kind)
                e3.test(e.data) ||
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'cuid',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('cuid2' === o.kind)
                e6.test(e.data) ||
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'cuid2',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('ulid' === o.kind)
                e5.test(e.data) ||
                  (eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'ulid',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                  d.dirty());
              else if ('url' === o.kind)
                try {
                  new URL(e.data);
                } catch (t) {
                  eB((l = this._getOrReturnCtx(e, l)), {
                    validation: 'url',
                    code: eM.invalid_string,
                    message: o.message,
                  }),
                    d.dirty();
                }
              else
                'regex' === o.kind
                  ? ((o.regex.lastIndex = 0),
                    o.regex.test(e.data) ||
                      (eB((l = this._getOrReturnCtx(e, l)), {
                        validation: 'regex',
                        code: eM.invalid_string,
                        message: o.message,
                      }),
                      d.dirty()))
                  : 'trim' === o.kind
                    ? (e.data = e.data.trim())
                    : 'includes' === o.kind
                      ? e.data.includes(o.value, o.position) ||
                        (eB((l = this._getOrReturnCtx(e, l)), {
                          code: eM.invalid_string,
                          validation: { includes: o.value, position: o.position },
                          message: o.message,
                        }),
                        d.dirty())
                      : 'toLowerCase' === o.kind
                        ? (e.data = e.data.toLowerCase())
                        : 'toUpperCase' === o.kind
                          ? (e.data = e.data.toUpperCase())
                          : 'startsWith' === o.kind
                            ? e.data.startsWith(o.value) ||
                              (eB((l = this._getOrReturnCtx(e, l)), {
                                code: eM.invalid_string,
                                validation: { startsWith: o.value },
                                message: o.message,
                              }),
                              d.dirty())
                            : 'endsWith' === o.kind
                              ? e.data.endsWith(o.value) ||
                                (eB((l = this._getOrReturnCtx(e, l)), {
                                  code: eM.invalid_string,
                                  validation: { endsWith: o.value },
                                  message: o.message,
                                }),
                                d.dirty())
                              : 'datetime' === o.kind
                                ? (function (e) {
                                    let t = `${to}T${tc(e)}`,
                                      r = [];
                                    return (
                                      r.push(e.local ? 'Z?' : 'Z'),
                                      e.offset && r.push('([+-]\\d{2}:?\\d{2})'),
                                      (t = `${t}(${r.join('|')})`),
                                      RegExp(`^${t}$`)
                                    );
                                  })(o).test(e.data) ||
                                  (eB((l = this._getOrReturnCtx(e, l)), {
                                    code: eM.invalid_string,
                                    validation: 'datetime',
                                    message: o.message,
                                  }),
                                  d.dirty())
                                : 'date' === o.kind
                                  ? tu.test(e.data) ||
                                    (eB((l = this._getOrReturnCtx(e, l)), {
                                      code: eM.invalid_string,
                                      validation: 'date',
                                      message: o.message,
                                    }),
                                    d.dirty())
                                  : 'time' === o.kind
                                    ? RegExp(`^${tc(o)}$`).test(e.data) ||
                                      (eB((l = this._getOrReturnCtx(e, l)), {
                                        code: eM.invalid_string,
                                        validation: 'time',
                                        message: o.message,
                                      }),
                                      d.dirty())
                                    : 'duration' === o.kind
                                      ? tt.test(e.data) ||
                                        (eB((l = this._getOrReturnCtx(e, l)), {
                                          validation: 'duration',
                                          code: eM.invalid_string,
                                          message: o.message,
                                        }),
                                        d.dirty())
                                      : 'ip' === o.kind
                                        ? ((t = e.data),
                                          !(
                                            (('v4' === (r = o.version) || !r) && ta.test(t)) ||
                                            (('v6' === r || !r) && ti.test(t))
                                          ) &&
                                            1 &&
                                            (eB((l = this._getOrReturnCtx(e, l)), {
                                              validation: 'ip',
                                              code: eM.invalid_string,
                                              message: o.message,
                                            }),
                                            d.dirty()))
                                        : 'jwt' === o.kind
                                          ? !(function (e, t) {
                                              if (!te.test(e)) return !1;
                                              try {
                                                let [r] = e.split('.'),
                                                  a = r
                                                    .replace(/-/g, '+')
                                                    .replace(/_/g, '/')
                                                    .padEnd(
                                                      r.length + ((4 - (r.length % 4)) % 4),
                                                      '='
                                                    ),
                                                  s = JSON.parse(atob(a));
                                                if (
                                                  'object' != typeof s ||
                                                  null === s ||
                                                  !s.typ ||
                                                  !s.alg ||
                                                  (t && s.alg !== t)
                                                )
                                                  return !1;
                                                return !0;
                                              } catch (e) {
                                                return !1;
                                              }
                                            })(e.data, o.alg) &&
                                            (eB((l = this._getOrReturnCtx(e, l)), {
                                              validation: 'jwt',
                                              code: eM.invalid_string,
                                              message: o.message,
                                            }),
                                            d.dirty())
                                          : 'cidr' === o.kind
                                            ? ((i = e.data),
                                              !(
                                                (('v4' === (n = o.version) || !n) && ts.test(i)) ||
                                                (('v6' === n || !n) && tn.test(i))
                                              ) &&
                                                1 &&
                                                (eB((l = this._getOrReturnCtx(e, l)), {
                                                  validation: 'cidr',
                                                  code: eM.invalid_string,
                                                  message: o.message,
                                                }),
                                                d.dirty()))
                                            : 'base64' === o.kind
                                              ? tl.test(e.data) ||
                                                (eB((l = this._getOrReturnCtx(e, l)), {
                                                  validation: 'base64',
                                                  code: eM.invalid_string,
                                                  message: o.message,
                                                }),
                                                d.dirty())
                                              : 'base64url' === o.kind
                                                ? td.test(e.data) ||
                                                  (eB((l = this._getOrReturnCtx(e, l)), {
                                                    validation: 'base64url',
                                                    code: eM.invalid_string,
                                                    message: o.message,
                                                  }),
                                                  d.dirty())
                                                : s.assertNever(o);
            return { status: d.value, value: e.data };
          }
          _regex(e, t, r) {
            return this.refinement(t => e.test(t), {
              validation: t,
              code: eM.invalid_string,
              ...n.errToObj(r),
            });
          }
          _addCheck(e) {
            return new tf({ ...this._def, checks: [...this._def.checks, e] });
          }
          email(e) {
            return this._addCheck({ kind: 'email', ...n.errToObj(e) });
          }
          url(e) {
            return this._addCheck({ kind: 'url', ...n.errToObj(e) });
          }
          emoji(e) {
            return this._addCheck({ kind: 'emoji', ...n.errToObj(e) });
          }
          uuid(e) {
            return this._addCheck({ kind: 'uuid', ...n.errToObj(e) });
          }
          nanoid(e) {
            return this._addCheck({ kind: 'nanoid', ...n.errToObj(e) });
          }
          cuid(e) {
            return this._addCheck({ kind: 'cuid', ...n.errToObj(e) });
          }
          cuid2(e) {
            return this._addCheck({ kind: 'cuid2', ...n.errToObj(e) });
          }
          ulid(e) {
            return this._addCheck({ kind: 'ulid', ...n.errToObj(e) });
          }
          base64(e) {
            return this._addCheck({ kind: 'base64', ...n.errToObj(e) });
          }
          base64url(e) {
            return this._addCheck({ kind: 'base64url', ...n.errToObj(e) });
          }
          jwt(e) {
            return this._addCheck({ kind: 'jwt', ...n.errToObj(e) });
          }
          ip(e) {
            return this._addCheck({ kind: 'ip', ...n.errToObj(e) });
          }
          cidr(e) {
            return this._addCheck({ kind: 'cidr', ...n.errToObj(e) });
          }
          datetime(e) {
            var t, r;
            return 'string' == typeof e
              ? this._addCheck({
                  kind: 'datetime',
                  precision: null,
                  offset: !1,
                  local: !1,
                  message: e,
                })
              : this._addCheck({
                  kind: 'datetime',
                  precision:
                    void 0 === (null == e ? void 0 : e.precision)
                      ? null
                      : null == e
                        ? void 0
                        : e.precision,
                  offset: null != (t = null == e ? void 0 : e.offset) && t,
                  local: null != (r = null == e ? void 0 : e.local) && r,
                  ...n.errToObj(null == e ? void 0 : e.message),
                });
          }
          date(e) {
            return this._addCheck({ kind: 'date', message: e });
          }
          time(e) {
            return 'string' == typeof e
              ? this._addCheck({ kind: 'time', precision: null, message: e })
              : this._addCheck({
                  kind: 'time',
                  precision:
                    void 0 === (null == e ? void 0 : e.precision)
                      ? null
                      : null == e
                        ? void 0
                        : e.precision,
                  ...n.errToObj(null == e ? void 0 : e.message),
                });
          }
          duration(e) {
            return this._addCheck({ kind: 'duration', ...n.errToObj(e) });
          }
          regex(e, t) {
            return this._addCheck({ kind: 'regex', regex: e, ...n.errToObj(t) });
          }
          includes(e, t) {
            return this._addCheck({
              kind: 'includes',
              value: e,
              position: null == t ? void 0 : t.position,
              ...n.errToObj(null == t ? void 0 : t.message),
            });
          }
          startsWith(e, t) {
            return this._addCheck({ kind: 'startsWith', value: e, ...n.errToObj(t) });
          }
          endsWith(e, t) {
            return this._addCheck({ kind: 'endsWith', value: e, ...n.errToObj(t) });
          }
          min(e, t) {
            return this._addCheck({ kind: 'min', value: e, ...n.errToObj(t) });
          }
          max(e, t) {
            return this._addCheck({ kind: 'max', value: e, ...n.errToObj(t) });
          }
          length(e, t) {
            return this._addCheck({ kind: 'length', value: e, ...n.errToObj(t) });
          }
          nonempty(e) {
            return this.min(1, n.errToObj(e));
          }
          trim() {
            return new tf({ ...this._def, checks: [...this._def.checks, { kind: 'trim' }] });
          }
          toLowerCase() {
            return new tf({ ...this._def, checks: [...this._def.checks, { kind: 'toLowerCase' }] });
          }
          toUpperCase() {
            return new tf({ ...this._def, checks: [...this._def.checks, { kind: 'toUpperCase' }] });
          }
          get isDatetime() {
            return !!this._def.checks.find(e => 'datetime' === e.kind);
          }
          get isDate() {
            return !!this._def.checks.find(e => 'date' === e.kind);
          }
          get isTime() {
            return !!this._def.checks.find(e => 'time' === e.kind);
          }
          get isDuration() {
            return !!this._def.checks.find(e => 'duration' === e.kind);
          }
          get isEmail() {
            return !!this._def.checks.find(e => 'email' === e.kind);
          }
          get isURL() {
            return !!this._def.checks.find(e => 'url' === e.kind);
          }
          get isEmoji() {
            return !!this._def.checks.find(e => 'emoji' === e.kind);
          }
          get isUUID() {
            return !!this._def.checks.find(e => 'uuid' === e.kind);
          }
          get isNANOID() {
            return !!this._def.checks.find(e => 'nanoid' === e.kind);
          }
          get isCUID() {
            return !!this._def.checks.find(e => 'cuid' === e.kind);
          }
          get isCUID2() {
            return !!this._def.checks.find(e => 'cuid2' === e.kind);
          }
          get isULID() {
            return !!this._def.checks.find(e => 'ulid' === e.kind);
          }
          get isIP() {
            return !!this._def.checks.find(e => 'ip' === e.kind);
          }
          get isCIDR() {
            return !!this._def.checks.find(e => 'cidr' === e.kind);
          }
          get isBase64() {
            return !!this._def.checks.find(e => 'base64' === e.kind);
          }
          get isBase64url() {
            return !!this._def.checks.find(e => 'base64url' === e.kind);
          }
          get minLength() {
            let e = null;
            for (let t of this._def.checks)
              'min' === t.kind && (null === e || t.value > e) && (e = t.value);
            return e;
          }
          get maxLength() {
            let e = null;
            for (let t of this._def.checks)
              'max' === t.kind && (null === e || t.value < e) && (e = t.value);
            return e;
          }
        }
        tf.create = e => {
          var t;
          return new tf({
            checks: [],
            typeName: o.ZodString,
            coerce: null != (t = null == e ? void 0 : e.coerce) && t,
            ...e9(e),
          });
        };
        class th extends e2 {
          constructor() {
            super(...arguments),
              (this.min = this.gte),
              (this.max = this.lte),
              (this.step = this.multipleOf);
          }
          _parse(e) {
            let t;
            if ((this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== eR.number)) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.number, received: t.parsedType }), eq
              );
            }
            let r = new eW();
            for (let a of this._def.checks)
              'int' === a.kind
                ? s.isInteger(e.data) ||
                  (eB((t = this._getOrReturnCtx(e, t)), {
                    code: eM.invalid_type,
                    expected: 'integer',
                    received: 'float',
                    message: a.message,
                  }),
                  r.dirty())
                : 'min' === a.kind
                  ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
                    (eB((t = this._getOrReturnCtx(e, t)), {
                      code: eM.too_small,
                      minimum: a.value,
                      type: 'number',
                      inclusive: a.inclusive,
                      exact: !1,
                      message: a.message,
                    }),
                    r.dirty())
                  : 'max' === a.kind
                    ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
                      (eB((t = this._getOrReturnCtx(e, t)), {
                        code: eM.too_big,
                        maximum: a.value,
                        type: 'number',
                        inclusive: a.inclusive,
                        exact: !1,
                        message: a.message,
                      }),
                      r.dirty())
                    : 'multipleOf' === a.kind
                      ? 0 !==
                          (function (e, t) {
                            let r = (e.toString().split('.')[1] || '').length,
                              a = (t.toString().split('.')[1] || '').length,
                              s = r > a ? r : a;
                            return (
                              (parseInt(e.toFixed(s).replace('.', '')) %
                                parseInt(t.toFixed(s).replace('.', ''))) /
                              Math.pow(10, s)
                            );
                          })(e.data, a.value) &&
                        (eB((t = this._getOrReturnCtx(e, t)), {
                          code: eM.not_multiple_of,
                          multipleOf: a.value,
                          message: a.message,
                        }),
                        r.dirty())
                      : 'finite' === a.kind
                        ? Number.isFinite(e.data) ||
                          (eB((t = this._getOrReturnCtx(e, t)), {
                            code: eM.not_finite,
                            message: a.message,
                          }),
                          r.dirty())
                        : s.assertNever(a);
            return { status: r.value, value: e.data };
          }
          gte(e, t) {
            return this.setLimit('min', e, !0, n.toString(t));
          }
          gt(e, t) {
            return this.setLimit('min', e, !1, n.toString(t));
          }
          lte(e, t) {
            return this.setLimit('max', e, !0, n.toString(t));
          }
          lt(e, t) {
            return this.setLimit('max', e, !1, n.toString(t));
          }
          setLimit(e, t, r, a) {
            return new th({
              ...this._def,
              checks: [
                ...this._def.checks,
                { kind: e, value: t, inclusive: r, message: n.toString(a) },
              ],
            });
          }
          _addCheck(e) {
            return new th({ ...this._def, checks: [...this._def.checks, e] });
          }
          int(e) {
            return this._addCheck({ kind: 'int', message: n.toString(e) });
          }
          positive(e) {
            return this._addCheck({ kind: 'min', value: 0, inclusive: !1, message: n.toString(e) });
          }
          negative(e) {
            return this._addCheck({ kind: 'max', value: 0, inclusive: !1, message: n.toString(e) });
          }
          nonpositive(e) {
            return this._addCheck({ kind: 'max', value: 0, inclusive: !0, message: n.toString(e) });
          }
          nonnegative(e) {
            return this._addCheck({ kind: 'min', value: 0, inclusive: !0, message: n.toString(e) });
          }
          multipleOf(e, t) {
            return this._addCheck({ kind: 'multipleOf', value: e, message: n.toString(t) });
          }
          finite(e) {
            return this._addCheck({ kind: 'finite', message: n.toString(e) });
          }
          safe(e) {
            return this._addCheck({
              kind: 'min',
              inclusive: !0,
              value: Number.MIN_SAFE_INTEGER,
              message: n.toString(e),
            })._addCheck({
              kind: 'max',
              inclusive: !0,
              value: Number.MAX_SAFE_INTEGER,
              message: n.toString(e),
            });
          }
          get minValue() {
            let e = null;
            for (let t of this._def.checks)
              'min' === t.kind && (null === e || t.value > e) && (e = t.value);
            return e;
          }
          get maxValue() {
            let e = null;
            for (let t of this._def.checks)
              'max' === t.kind && (null === e || t.value < e) && (e = t.value);
            return e;
          }
          get isInt() {
            return !!this._def.checks.find(
              e => 'int' === e.kind || ('multipleOf' === e.kind && s.isInteger(e.value))
            );
          }
          get isFinite() {
            let e = null,
              t = null;
            for (let r of this._def.checks)
              if ('finite' === r.kind || 'int' === r.kind || 'multipleOf' === r.kind) return !0;
              else
                'min' === r.kind
                  ? (null === t || r.value > t) && (t = r.value)
                  : 'max' === r.kind && (null === e || r.value < e) && (e = r.value);
            return Number.isFinite(t) && Number.isFinite(e);
          }
        }
        th.create = e =>
          new th({
            checks: [],
            typeName: o.ZodNumber,
            coerce: (null == e ? void 0 : e.coerce) || !1,
            ...e9(e),
          });
        class tm extends e2 {
          constructor() {
            super(...arguments), (this.min = this.gte), (this.max = this.lte);
          }
          _parse(e) {
            let t;
            if (this._def.coerce)
              try {
                e.data = BigInt(e.data);
              } catch (t) {
                return this._getInvalidInput(e);
              }
            if (this._getType(e) !== eR.bigint) return this._getInvalidInput(e);
            let r = new eW();
            for (let a of this._def.checks)
              'min' === a.kind
                ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
                  (eB((t = this._getOrReturnCtx(e, t)), {
                    code: eM.too_small,
                    type: 'bigint',
                    minimum: a.value,
                    inclusive: a.inclusive,
                    message: a.message,
                  }),
                  r.dirty())
                : 'max' === a.kind
                  ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
                    (eB((t = this._getOrReturnCtx(e, t)), {
                      code: eM.too_big,
                      type: 'bigint',
                      maximum: a.value,
                      inclusive: a.inclusive,
                      message: a.message,
                    }),
                    r.dirty())
                  : 'multipleOf' === a.kind
                    ? e.data % a.value !== BigInt(0) &&
                      (eB((t = this._getOrReturnCtx(e, t)), {
                        code: eM.not_multiple_of,
                        multipleOf: a.value,
                        message: a.message,
                      }),
                      r.dirty())
                    : s.assertNever(a);
            return { status: r.value, value: e.data };
          }
          _getInvalidInput(e) {
            let t = this._getOrReturnCtx(e);
            return (
              eB(t, { code: eM.invalid_type, expected: eR.bigint, received: t.parsedType }), eq
            );
          }
          gte(e, t) {
            return this.setLimit('min', e, !0, n.toString(t));
          }
          gt(e, t) {
            return this.setLimit('min', e, !1, n.toString(t));
          }
          lte(e, t) {
            return this.setLimit('max', e, !0, n.toString(t));
          }
          lt(e, t) {
            return this.setLimit('max', e, !1, n.toString(t));
          }
          setLimit(e, t, r, a) {
            return new tm({
              ...this._def,
              checks: [
                ...this._def.checks,
                { kind: e, value: t, inclusive: r, message: n.toString(a) },
              ],
            });
          }
          _addCheck(e) {
            return new tm({ ...this._def, checks: [...this._def.checks, e] });
          }
          positive(e) {
            return this._addCheck({
              kind: 'min',
              value: BigInt(0),
              inclusive: !1,
              message: n.toString(e),
            });
          }
          negative(e) {
            return this._addCheck({
              kind: 'max',
              value: BigInt(0),
              inclusive: !1,
              message: n.toString(e),
            });
          }
          nonpositive(e) {
            return this._addCheck({
              kind: 'max',
              value: BigInt(0),
              inclusive: !0,
              message: n.toString(e),
            });
          }
          nonnegative(e) {
            return this._addCheck({
              kind: 'min',
              value: BigInt(0),
              inclusive: !0,
              message: n.toString(e),
            });
          }
          multipleOf(e, t) {
            return this._addCheck({ kind: 'multipleOf', value: e, message: n.toString(t) });
          }
          get minValue() {
            let e = null;
            for (let t of this._def.checks)
              'min' === t.kind && (null === e || t.value > e) && (e = t.value);
            return e;
          }
          get maxValue() {
            let e = null;
            for (let t of this._def.checks)
              'max' === t.kind && (null === e || t.value < e) && (e = t.value);
            return e;
          }
        }
        tm.create = e => {
          var t;
          return new tm({
            checks: [],
            typeName: o.ZodBigInt,
            coerce: null != (t = null == e ? void 0 : e.coerce) && t,
            ...e9(e),
          });
        };
        class tp extends e2 {
          _parse(e) {
            if ((this._def.coerce && (e.data = !!e.data), this._getType(e) !== eR.boolean)) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.boolean, received: t.parsedType }), eq
              );
            }
            return eG(e.data);
          }
        }
        tp.create = e =>
          new tp({
            typeName: o.ZodBoolean,
            coerce: (null == e ? void 0 : e.coerce) || !1,
            ...e9(e),
          });
        class ty extends e2 {
          _parse(e) {
            let t;
            if ((this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== eR.date)) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.date, received: t.parsedType }), eq
              );
            }
            if (isNaN(e.data.getTime()))
              return eB(this._getOrReturnCtx(e), { code: eM.invalid_date }), eq;
            let r = new eW();
            for (let a of this._def.checks)
              'min' === a.kind
                ? e.data.getTime() < a.value &&
                  (eB((t = this._getOrReturnCtx(e, t)), {
                    code: eM.too_small,
                    message: a.message,
                    inclusive: !0,
                    exact: !1,
                    minimum: a.value,
                    type: 'date',
                  }),
                  r.dirty())
                : 'max' === a.kind
                  ? e.data.getTime() > a.value &&
                    (eB((t = this._getOrReturnCtx(e, t)), {
                      code: eM.too_big,
                      message: a.message,
                      inclusive: !0,
                      exact: !1,
                      maximum: a.value,
                      type: 'date',
                    }),
                    r.dirty())
                  : s.assertNever(a);
            return { status: r.value, value: new Date(e.data.getTime()) };
          }
          _addCheck(e) {
            return new ty({ ...this._def, checks: [...this._def.checks, e] });
          }
          min(e, t) {
            return this._addCheck({ kind: 'min', value: e.getTime(), message: n.toString(t) });
          }
          max(e, t) {
            return this._addCheck({ kind: 'max', value: e.getTime(), message: n.toString(t) });
          }
          get minDate() {
            let e = null;
            for (let t of this._def.checks)
              'min' === t.kind && (null === e || t.value > e) && (e = t.value);
            return null != e ? new Date(e) : null;
          }
          get maxDate() {
            let e = null;
            for (let t of this._def.checks)
              'max' === t.kind && (null === e || t.value < e) && (e = t.value);
            return null != e ? new Date(e) : null;
          }
        }
        ty.create = e =>
          new ty({
            checks: [],
            coerce: (null == e ? void 0 : e.coerce) || !1,
            typeName: o.ZodDate,
            ...e9(e),
          });
        class tv extends e2 {
          _parse(e) {
            if (this._getType(e) !== eR.symbol) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.symbol, received: t.parsedType }), eq
              );
            }
            return eG(e.data);
          }
        }
        tv.create = e => new tv({ typeName: o.ZodSymbol, ...e9(e) });
        class tg extends e2 {
          _parse(e) {
            if (this._getType(e) !== eR.undefined) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.undefined, received: t.parsedType }), eq
              );
            }
            return eG(e.data);
          }
        }
        tg.create = e => new tg({ typeName: o.ZodUndefined, ...e9(e) });
        class t_ extends e2 {
          _parse(e) {
            if (this._getType(e) !== eR.null) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.null, received: t.parsedType }), eq
              );
            }
            return eG(e.data);
          }
        }
        t_.create = e => new t_({ typeName: o.ZodNull, ...e9(e) });
        class tb extends e2 {
          constructor() {
            super(...arguments), (this._any = !0);
          }
          _parse(e) {
            return eG(e.data);
          }
        }
        tb.create = e => new tb({ typeName: o.ZodAny, ...e9(e) });
        class tx extends e2 {
          constructor() {
            super(...arguments), (this._unknown = !0);
          }
          _parse(e) {
            return eG(e.data);
          }
        }
        tx.create = e => new tx({ typeName: o.ZodUnknown, ...e9(e) });
        class tk extends e2 {
          _parse(e) {
            let t = this._getOrReturnCtx(e);
            return eB(t, { code: eM.invalid_type, expected: eR.never, received: t.parsedType }), eq;
          }
        }
        tk.create = e => new tk({ typeName: o.ZodNever, ...e9(e) });
        class tw extends e2 {
          _parse(e) {
            if (this._getType(e) !== eR.undefined) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.void, received: t.parsedType }), eq
              );
            }
            return eG(e.data);
          }
        }
        tw.create = e => new tw({ typeName: o.ZodVoid, ...e9(e) });
        class tA extends e2 {
          _parse(e) {
            let { ctx: t, status: r } = this._processInputParams(e),
              a = this._def;
            if (t.parsedType !== eR.array)
              return (
                eB(t, { code: eM.invalid_type, expected: eR.array, received: t.parsedType }), eq
              );
            if (null !== a.exactLength) {
              let e = t.data.length > a.exactLength.value,
                s = t.data.length < a.exactLength.value;
              (e || s) &&
                (eB(t, {
                  code: e ? eM.too_big : eM.too_small,
                  minimum: s ? a.exactLength.value : void 0,
                  maximum: e ? a.exactLength.value : void 0,
                  type: 'array',
                  inclusive: !0,
                  exact: !0,
                  message: a.exactLength.message,
                }),
                r.dirty());
            }
            if (
              (null !== a.minLength &&
                t.data.length < a.minLength.value &&
                (eB(t, {
                  code: eM.too_small,
                  minimum: a.minLength.value,
                  type: 'array',
                  inclusive: !0,
                  exact: !1,
                  message: a.minLength.message,
                }),
                r.dirty()),
              null !== a.maxLength &&
                t.data.length > a.maxLength.value &&
                (eB(t, {
                  code: eM.too_big,
                  maximum: a.maxLength.value,
                  type: 'array',
                  inclusive: !0,
                  exact: !1,
                  message: a.maxLength.message,
                }),
                r.dirty()),
              t.common.async)
            )
              return Promise.all(
                [...t.data].map((e, r) => a.type._parseAsync(new e1(t, e, t.path, r)))
              ).then(e => eW.mergeArray(r, e));
            let s = [...t.data].map((e, r) => a.type._parseSync(new e1(t, e, t.path, r)));
            return eW.mergeArray(r, s);
          }
          get element() {
            return this._def.type;
          }
          min(e, t) {
            return new tA({ ...this._def, minLength: { value: e, message: n.toString(t) } });
          }
          max(e, t) {
            return new tA({ ...this._def, maxLength: { value: e, message: n.toString(t) } });
          }
          length(e, t) {
            return new tA({ ...this._def, exactLength: { value: e, message: n.toString(t) } });
          }
          nonempty(e) {
            return this.min(1, e);
          }
        }
        tA.create = (e, t) =>
          new tA({
            type: e,
            minLength: null,
            maxLength: null,
            exactLength: null,
            typeName: o.ZodArray,
            ...e9(t),
          });
        class tj extends e2 {
          constructor() {
            super(...arguments),
              (this._cached = null),
              (this.nonstrict = this.passthrough),
              (this.augment = this.extend);
          }
          _getCached() {
            if (null !== this._cached) return this._cached;
            let e = this._def.shape(),
              t = s.objectKeys(e);
            return (this._cached = { shape: e, keys: t });
          }
          _parse(e) {
            if (this._getType(e) !== eR.object) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { code: eM.invalid_type, expected: eR.object, received: t.parsedType }), eq
              );
            }
            let { status: t, ctx: r } = this._processInputParams(e),
              { shape: a, keys: s } = this._getCached(),
              i = [];
            if (!(this._def.catchall instanceof tk && 'strip' === this._def.unknownKeys))
              for (let e in r.data) s.includes(e) || i.push(e);
            let n = [];
            for (let e of s) {
              let t = a[e],
                s = r.data[e];
              n.push({
                key: { status: 'valid', value: e },
                value: t._parse(new e1(r, s, r.path, e)),
                alwaysSet: e in r.data,
              });
            }
            if (this._def.catchall instanceof tk) {
              let e = this._def.unknownKeys;
              if ('passthrough' === e)
                for (let e of i)
                  n.push({
                    key: { status: 'valid', value: e },
                    value: { status: 'valid', value: r.data[e] },
                  });
              else if ('strict' === e)
                i.length > 0 && (eB(r, { code: eM.unrecognized_keys, keys: i }), t.dirty());
              else if ('strip' === e);
              else throw Error('Internal ZodObject error: invalid unknownKeys value.');
            } else {
              let e = this._def.catchall;
              for (let t of i) {
                let a = r.data[t];
                n.push({
                  key: { status: 'valid', value: t },
                  value: e._parse(new e1(r, a, r.path, t)),
                  alwaysSet: t in r.data,
                });
              }
            }
            return r.common.async
              ? Promise.resolve()
                  .then(async () => {
                    let e = [];
                    for (let t of n) {
                      let r = await t.key,
                        a = await t.value;
                      e.push({ key: r, value: a, alwaysSet: t.alwaysSet });
                    }
                    return e;
                  })
                  .then(e => eW.mergeObjectSync(t, e))
              : eW.mergeObjectSync(t, n);
          }
          get shape() {
            return this._def.shape();
          }
          strict(e) {
            return (
              n.errToObj,
              new tj({
                ...this._def,
                unknownKeys: 'strict',
                ...(void 0 !== e
                  ? {
                      errorMap: (t, r) => {
                        var a, s, i, l;
                        let d =
                          null !=
                          (i =
                            null == (s = (a = this._def).errorMap)
                              ? void 0
                              : s.call(a, t, r).message)
                            ? i
                            : r.defaultError;
                        return 'unrecognized_keys' === t.code
                          ? { message: null != (l = n.errToObj(e).message) ? l : d }
                          : { message: d };
                      },
                    }
                  : {}),
              })
            );
          }
          strip() {
            return new tj({ ...this._def, unknownKeys: 'strip' });
          }
          passthrough() {
            return new tj({ ...this._def, unknownKeys: 'passthrough' });
          }
          extend(e) {
            return new tj({ ...this._def, shape: () => ({ ...this._def.shape(), ...e }) });
          }
          merge(e) {
            return new tj({
              unknownKeys: e._def.unknownKeys,
              catchall: e._def.catchall,
              shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
              typeName: o.ZodObject,
            });
          }
          setKey(e, t) {
            return this.augment({ [e]: t });
          }
          catchall(e) {
            return new tj({ ...this._def, catchall: e });
          }
          pick(e) {
            let t = {};
            return (
              s.objectKeys(e).forEach(r => {
                e[r] && this.shape[r] && (t[r] = this.shape[r]);
              }),
              new tj({ ...this._def, shape: () => t })
            );
          }
          omit(e) {
            let t = {};
            return (
              s.objectKeys(this.shape).forEach(r => {
                e[r] || (t[r] = this.shape[r]);
              }),
              new tj({ ...this._def, shape: () => t })
            );
          }
          deepPartial() {
            return (function e(t) {
              if (t instanceof tj) {
                let r = {};
                for (let a in t.shape) {
                  let s = t.shape[a];
                  r[a] = tU.create(e(s));
                }
                return new tj({ ...t._def, shape: () => r });
              }
              if (t instanceof tA) return new tA({ ...t._def, type: e(t.element) });
              if (t instanceof tU) return tU.create(e(t.unwrap()));
              if (t instanceof tz) return tz.create(e(t.unwrap()));
              if (t instanceof tN) return tN.create(t.items.map(t => e(t)));
              else return t;
            })(this);
          }
          partial(e) {
            let t = {};
            return (
              s.objectKeys(this.shape).forEach(r => {
                let a = this.shape[r];
                e && !e[r] ? (t[r] = a) : (t[r] = a.optional());
              }),
              new tj({ ...this._def, shape: () => t })
            );
          }
          required(e) {
            let t = {};
            return (
              s.objectKeys(this.shape).forEach(r => {
                if (e && !e[r]) t[r] = this.shape[r];
                else {
                  let e = this.shape[r];
                  for (; e instanceof tU; ) e = e._def.innerType;
                  t[r] = e;
                }
              }),
              new tj({ ...this._def, shape: () => t })
            );
          }
          keyof() {
            return tR(s.objectKeys(this.shape));
          }
        }
        (tj.create = (e, t) =>
          new tj({
            shape: () => e,
            unknownKeys: 'strip',
            catchall: tk.create(),
            typeName: o.ZodObject,
            ...e9(t),
          })),
          (tj.strictCreate = (e, t) =>
            new tj({
              shape: () => e,
              unknownKeys: 'strict',
              catchall: tk.create(),
              typeName: o.ZodObject,
              ...e9(t),
            })),
          (tj.lazycreate = (e, t) =>
            new tj({
              shape: e,
              unknownKeys: 'strip',
              catchall: tk.create(),
              typeName: o.ZodObject,
              ...e9(t),
            }));
        class tS extends e2 {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              r = this._def.options;
            if (t.common.async)
              return Promise.all(
                r.map(async e => {
                  let r = { ...t, common: { ...t.common, issues: [] }, parent: null };
                  return {
                    result: await e._parseAsync({ data: t.data, path: t.path, parent: r }),
                    ctx: r,
                  };
                })
              ).then(function (e) {
                for (let t of e) if ('valid' === t.result.status) return t.result;
                for (let r of e)
                  if ('dirty' === r.result.status)
                    return t.common.issues.push(...r.ctx.common.issues), r.result;
                let r = e.map(e => new e$(e.ctx.common.issues));
                return eB(t, { code: eM.invalid_union, unionErrors: r }), eq;
              });
            {
              let e,
                a = [];
              for (let s of r) {
                let r = { ...t, common: { ...t.common, issues: [] }, parent: null },
                  i = s._parseSync({ data: t.data, path: t.path, parent: r });
                if ('valid' === i.status) return i;
                'dirty' !== i.status || e || (e = { result: i, ctx: r }),
                  r.common.issues.length && a.push(r.common.issues);
              }
              if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
              let s = a.map(e => new e$(e));
              return eB(t, { code: eM.invalid_union, unionErrors: s }), eq;
            }
          }
          get options() {
            return this._def.options;
          }
        }
        tS.create = (e, t) => new tS({ options: e, typeName: o.ZodUnion, ...e9(t) });
        let tT = e => {
          if (e instanceof tP) return tT(e.schema);
          if (e instanceof tL) return tT(e.innerType());
          if (e instanceof tD) return [e.value];
          if (e instanceof tI) return e.options;
          if (e instanceof tM) return s.objectValues(e.enum);
          else if (e instanceof tB) return tT(e._def.innerType);
          else if (e instanceof tg) return [void 0];
          else if (e instanceof t_) return [null];
          else if (e instanceof tU) return [void 0, ...tT(e.unwrap())];
          else if (e instanceof tz) return [null, ...tT(e.unwrap())];
          else if (e instanceof tK) return tT(e.unwrap());
          else if (e instanceof tH) return tT(e.unwrap());
          else if (e instanceof tW) return tT(e._def.innerType);
          else return [];
        };
        class tO extends e2 {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            if (t.parsedType !== eR.object)
              return (
                eB(t, { code: eM.invalid_type, expected: eR.object, received: t.parsedType }), eq
              );
            let r = this.discriminator,
              a = t.data[r],
              s = this.optionsMap.get(a);
            return s
              ? t.common.async
                ? s._parseAsync({ data: t.data, path: t.path, parent: t })
                : s._parseSync({ data: t.data, path: t.path, parent: t })
              : (eB(t, {
                  code: eM.invalid_union_discriminator,
                  options: Array.from(this.optionsMap.keys()),
                  path: [r],
                }),
                eq);
          }
          get discriminator() {
            return this._def.discriminator;
          }
          get options() {
            return this._def.options;
          }
          get optionsMap() {
            return this._def.optionsMap;
          }
          static create(e, t, r) {
            let a = new Map();
            for (let r of t) {
              let t = tT(r.shape[e]);
              if (!t.length)
                throw Error(
                  `A discriminator value for key \`${e}\` could not be extracted from all schema options`
                );
              for (let s of t) {
                if (a.has(s))
                  throw Error(
                    `Discriminator property ${String(e)} has duplicate value ${String(s)}`
                  );
                a.set(s, r);
              }
            }
            return new tO({
              typeName: o.ZodDiscriminatedUnion,
              discriminator: e,
              options: t,
              optionsMap: a,
              ...e9(r),
            });
          }
        }
        class tC extends e2 {
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e),
              a = (e, a) => {
                if (eH(e) || eH(a)) return eq;
                let i = (function e(t, r) {
                  let a = eI(t),
                    i = eI(r);
                  if (t === r) return { valid: !0, data: t };
                  if (a === eR.object && i === eR.object) {
                    let a = s.objectKeys(r),
                      i = s.objectKeys(t).filter(e => -1 !== a.indexOf(e)),
                      n = { ...t, ...r };
                    for (let a of i) {
                      let s = e(t[a], r[a]);
                      if (!s.valid) return { valid: !1 };
                      n[a] = s.data;
                    }
                    return { valid: !0, data: n };
                  }
                  if (a === eR.array && i === eR.array) {
                    if (t.length !== r.length) return { valid: !1 };
                    let a = [];
                    for (let s = 0; s < t.length; s++) {
                      let i = e(t[s], r[s]);
                      if (!i.valid) return { valid: !1 };
                      a.push(i.data);
                    }
                    return { valid: !0, data: a };
                  }
                  if (a === eR.date && i === eR.date && +t == +r) return { valid: !0, data: t };
                  return { valid: !1 };
                })(e.value, a.value);
                return i.valid
                  ? ((eJ(e) || eJ(a)) && t.dirty(), { status: t.value, value: i.data })
                  : (eB(r, { code: eM.invalid_intersection_types }), eq);
              };
            return r.common.async
              ? Promise.all([
                  this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
                  this._def.right._parseAsync({ data: r.data, path: r.path, parent: r }),
                ]).then(([e, t]) => a(e, t))
              : a(
                  this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
                  this._def.right._parseSync({ data: r.data, path: r.path, parent: r })
                );
          }
        }
        tC.create = (e, t, r) =>
          new tC({ left: e, right: t, typeName: o.ZodIntersection, ...e9(r) });
        class tN extends e2 {
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e);
            if (r.parsedType !== eR.array)
              return (
                eB(r, { code: eM.invalid_type, expected: eR.array, received: r.parsedType }), eq
              );
            if (r.data.length < this._def.items.length)
              return (
                eB(r, {
                  code: eM.too_small,
                  minimum: this._def.items.length,
                  inclusive: !0,
                  exact: !1,
                  type: 'array',
                }),
                eq
              );
            !this._def.rest &&
              r.data.length > this._def.items.length &&
              (eB(r, {
                code: eM.too_big,
                maximum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: 'array',
              }),
              t.dirty());
            let a = [...r.data]
              .map((e, t) => {
                let a = this._def.items[t] || this._def.rest;
                return a ? a._parse(new e1(r, e, r.path, t)) : null;
              })
              .filter(e => !!e);
            return r.common.async
              ? Promise.all(a).then(e => eW.mergeArray(t, e))
              : eW.mergeArray(t, a);
          }
          get items() {
            return this._def.items;
          }
          rest(e) {
            return new tN({ ...this._def, rest: e });
          }
        }
        tN.create = (e, t) => {
          if (!Array.isArray(e))
            throw Error('You must pass an array of schemas to z.tuple([ ... ])');
          return new tN({ items: e, typeName: o.ZodTuple, rest: null, ...e9(t) });
        };
        class tF extends e2 {
          get keySchema() {
            return this._def.keyType;
          }
          get valueSchema() {
            return this._def.valueType;
          }
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e);
            if (r.parsedType !== eR.object)
              return (
                eB(r, { code: eM.invalid_type, expected: eR.object, received: r.parsedType }), eq
              );
            let a = [],
              s = this._def.keyType,
              i = this._def.valueType;
            for (let e in r.data)
              a.push({
                key: s._parse(new e1(r, e, r.path, e)),
                value: i._parse(new e1(r, r.data[e], r.path, e)),
                alwaysSet: e in r.data,
              });
            return r.common.async ? eW.mergeObjectAsync(t, a) : eW.mergeObjectSync(t, a);
          }
          get element() {
            return this._def.valueType;
          }
          static create(e, t, r) {
            return new tF(
              t instanceof e2
                ? { keyType: e, valueType: t, typeName: o.ZodRecord, ...e9(r) }
                : { keyType: tf.create(), valueType: e, typeName: o.ZodRecord, ...e9(t) }
            );
          }
        }
        class tV extends e2 {
          get keySchema() {
            return this._def.keyType;
          }
          get valueSchema() {
            return this._def.valueType;
          }
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e);
            if (r.parsedType !== eR.map)
              return eB(r, { code: eM.invalid_type, expected: eR.map, received: r.parsedType }), eq;
            let a = this._def.keyType,
              s = this._def.valueType,
              i = [...r.data.entries()].map(([e, t], i) => ({
                key: a._parse(new e1(r, e, r.path, [i, 'key'])),
                value: s._parse(new e1(r, t, r.path, [i, 'value'])),
              }));
            if (r.common.async) {
              let e = new Map();
              return Promise.resolve().then(async () => {
                for (let r of i) {
                  let a = await r.key,
                    s = await r.value;
                  if ('aborted' === a.status || 'aborted' === s.status) return eq;
                  ('dirty' === a.status || 'dirty' === s.status) && t.dirty(),
                    e.set(a.value, s.value);
                }
                return { status: t.value, value: e };
              });
            }
            {
              let e = new Map();
              for (let r of i) {
                let a = r.key,
                  s = r.value;
                if ('aborted' === a.status || 'aborted' === s.status) return eq;
                ('dirty' === a.status || 'dirty' === s.status) && t.dirty(),
                  e.set(a.value, s.value);
              }
              return { status: t.value, value: e };
            }
          }
        }
        tV.create = (e, t, r) => new tV({ valueType: t, keyType: e, typeName: o.ZodMap, ...e9(r) });
        class tE extends e2 {
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e);
            if (r.parsedType !== eR.set)
              return eB(r, { code: eM.invalid_type, expected: eR.set, received: r.parsedType }), eq;
            let a = this._def;
            null !== a.minSize &&
              r.data.size < a.minSize.value &&
              (eB(r, {
                code: eM.too_small,
                minimum: a.minSize.value,
                type: 'set',
                inclusive: !0,
                exact: !1,
                message: a.minSize.message,
              }),
              t.dirty()),
              null !== a.maxSize &&
                r.data.size > a.maxSize.value &&
                (eB(r, {
                  code: eM.too_big,
                  maximum: a.maxSize.value,
                  type: 'set',
                  inclusive: !0,
                  exact: !1,
                  message: a.maxSize.message,
                }),
                t.dirty());
            let s = this._def.valueType;
            function i(e) {
              let r = new Set();
              for (let a of e) {
                if ('aborted' === a.status) return eq;
                'dirty' === a.status && t.dirty(), r.add(a.value);
              }
              return { status: t.value, value: r };
            }
            let n = [...r.data.values()].map((e, t) => s._parse(new e1(r, e, r.path, t)));
            return r.common.async ? Promise.all(n).then(e => i(e)) : i(n);
          }
          min(e, t) {
            return new tE({ ...this._def, minSize: { value: e, message: n.toString(t) } });
          }
          max(e, t) {
            return new tE({ ...this._def, maxSize: { value: e, message: n.toString(t) } });
          }
          size(e, t) {
            return this.min(e, t).max(e, t);
          }
          nonempty(e) {
            return this.min(1, e);
          }
        }
        tE.create = (e, t) =>
          new tE({ valueType: e, minSize: null, maxSize: null, typeName: o.ZodSet, ...e9(t) });
        class tZ extends e2 {
          constructor() {
            super(...arguments), (this.validate = this.implement);
          }
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            if (t.parsedType !== eR.function)
              return (
                eB(t, { code: eM.invalid_type, expected: eR.function, received: t.parsedType }), eq
              );
            function r(e, r) {
              return ez({
                data: e,
                path: t.path,
                errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, eL, eL].filter(e => !!e),
                issueData: { code: eM.invalid_arguments, argumentsError: r },
              });
            }
            function a(e, r) {
              return ez({
                data: e,
                path: t.path,
                errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, eL, eL].filter(e => !!e),
                issueData: { code: eM.invalid_return_type, returnTypeError: r },
              });
            }
            let s = { errorMap: t.common.contextualErrorMap },
              i = t.data;
            if (this._def.returns instanceof t$) {
              let e = this;
              return eG(async function (...t) {
                let n = new e$([]),
                  l = await e._def.args.parseAsync(t, s).catch(e => {
                    throw (n.addIssue(r(t, e)), n);
                  }),
                  d = await Reflect.apply(i, this, l);
                return await e._def.returns._def.type.parseAsync(d, s).catch(e => {
                  throw (n.addIssue(a(d, e)), n);
                });
              });
            }
            {
              let e = this;
              return eG(function (...t) {
                let n = e._def.args.safeParse(t, s);
                if (!n.success) throw new e$([r(t, n.error)]);
                let l = Reflect.apply(i, this, n.data),
                  d = e._def.returns.safeParse(l, s);
                if (!d.success) throw new e$([a(l, d.error)]);
                return d.data;
              });
            }
          }
          parameters() {
            return this._def.args;
          }
          returnType() {
            return this._def.returns;
          }
          args(...e) {
            return new tZ({ ...this._def, args: tN.create(e).rest(tx.create()) });
          }
          returns(e) {
            return new tZ({ ...this._def, returns: e });
          }
          implement(e) {
            return this.parse(e);
          }
          strictImplement(e) {
            return this.parse(e);
          }
          static create(e, t, r) {
            return new tZ({
              args: e || tN.create([]).rest(tx.create()),
              returns: t || tx.create(),
              typeName: o.ZodFunction,
              ...e9(r),
            });
          }
        }
        class tP extends e2 {
          get schema() {
            return this._def.getter();
          }
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
          }
        }
        tP.create = (e, t) => new tP({ getter: e, typeName: o.ZodLazy, ...e9(t) });
        class tD extends e2 {
          _parse(e) {
            if (e.data !== this._def.value) {
              let t = this._getOrReturnCtx(e);
              return (
                eB(t, { received: t.data, code: eM.invalid_literal, expected: this._def.value }), eq
              );
            }
            return { status: 'valid', value: e.data };
          }
          get value() {
            return this._def.value;
          }
        }
        function tR(e, t) {
          return new tI({ values: e, typeName: o.ZodEnum, ...e9(t) });
        }
        tD.create = (e, t) => new tD({ value: e, typeName: o.ZodLiteral, ...e9(t) });
        class tI extends e2 {
          constructor() {
            super(...arguments), l.set(this, void 0);
          }
          _parse(e) {
            if ('string' != typeof e.data) {
              let t = this._getOrReturnCtx(e),
                r = this._def.values;
              return (
                eB(t, { expected: s.joinValues(r), received: t.parsedType, code: eM.invalid_type }),
                eq
              );
            }
            if (
              (eQ(this, l, 'f') || e0(this, l, new Set(this._def.values), 'f'),
              !eQ(this, l, 'f').has(e.data))
            ) {
              let t = this._getOrReturnCtx(e),
                r = this._def.values;
              return eB(t, { received: t.data, code: eM.invalid_enum_value, options: r }), eq;
            }
            return eG(e.data);
          }
          get options() {
            return this._def.values;
          }
          get enum() {
            let e = {};
            for (let t of this._def.values) e[t] = t;
            return e;
          }
          get Values() {
            let e = {};
            for (let t of this._def.values) e[t] = t;
            return e;
          }
          get Enum() {
            let e = {};
            for (let t of this._def.values) e[t] = t;
            return e;
          }
          extract(e, t = this._def) {
            return tI.create(e, { ...this._def, ...t });
          }
          exclude(e, t = this._def) {
            return tI.create(
              this.options.filter(t => !e.includes(t)),
              { ...this._def, ...t }
            );
          }
        }
        (l = new WeakMap()), (tI.create = tR);
        class tM extends e2 {
          constructor() {
            super(...arguments), d.set(this, void 0);
          }
          _parse(e) {
            let t = s.getValidEnumValues(this._def.values),
              r = this._getOrReturnCtx(e);
            if (r.parsedType !== eR.string && r.parsedType !== eR.number) {
              let e = s.objectValues(t);
              return (
                eB(r, { expected: s.joinValues(e), received: r.parsedType, code: eM.invalid_type }),
                eq
              );
            }
            if (
              (eQ(this, d, 'f') ||
                e0(this, d, new Set(s.getValidEnumValues(this._def.values)), 'f'),
              !eQ(this, d, 'f').has(e.data))
            ) {
              let e = s.objectValues(t);
              return eB(r, { received: r.data, code: eM.invalid_enum_value, options: e }), eq;
            }
            return eG(e.data);
          }
          get enum() {
            return this._def.values;
          }
        }
        (d = new WeakMap()),
          (tM.create = (e, t) => new tM({ values: e, typeName: o.ZodNativeEnum, ...e9(t) }));
        class t$ extends e2 {
          unwrap() {
            return this._def.type;
          }
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            return t.parsedType !== eR.promise && !1 === t.common.async
              ? (eB(t, { code: eM.invalid_type, expected: eR.promise, received: t.parsedType }), eq)
              : eG(
                  (t.parsedType === eR.promise ? t.data : Promise.resolve(t.data)).then(e =>
                    this._def.type.parseAsync(e, {
                      path: t.path,
                      errorMap: t.common.contextualErrorMap,
                    })
                  )
                );
          }
        }
        t$.create = (e, t) => new t$({ type: e, typeName: o.ZodPromise, ...e9(t) });
        class tL extends e2 {
          innerType() {
            return this._def.schema;
          }
          sourceType() {
            return this._def.schema._def.typeName === o.ZodEffects
              ? this._def.schema.sourceType()
              : this._def.schema;
          }
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e),
              a = this._def.effect || null,
              i = {
                addIssue: e => {
                  eB(r, e), e.fatal ? t.abort() : t.dirty();
                },
                get path() {
                  return r.path;
                },
              };
            if (((i.addIssue = i.addIssue.bind(i)), 'preprocess' === a.type)) {
              let e = a.transform(r.data, i);
              if (r.common.async)
                return Promise.resolve(e).then(async e => {
                  if ('aborted' === t.value) return eq;
                  let a = await this._def.schema._parseAsync({ data: e, path: r.path, parent: r });
                  return 'aborted' === a.status
                    ? eq
                    : 'dirty' === a.status || 'dirty' === t.value
                      ? eK(a.value)
                      : a;
                });
              {
                if ('aborted' === t.value) return eq;
                let a = this._def.schema._parseSync({ data: e, path: r.path, parent: r });
                return 'aborted' === a.status
                  ? eq
                  : 'dirty' === a.status || 'dirty' === t.value
                    ? eK(a.value)
                    : a;
              }
            }
            if ('refinement' === a.type) {
              let e = e => {
                let t = a.refinement(e, i);
                if (r.common.async) return Promise.resolve(t);
                if (t instanceof Promise)
                  throw Error(
                    'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
                  );
                return e;
              };
              if (!1 !== r.common.async)
                return this._def.schema
                  ._parseAsync({ data: r.data, path: r.path, parent: r })
                  .then(r =>
                    'aborted' === r.status
                      ? eq
                      : ('dirty' === r.status && t.dirty(),
                        e(r.value).then(() => ({ status: t.value, value: r.value })))
                  );
              {
                let a = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
                return 'aborted' === a.status
                  ? eq
                  : ('dirty' === a.status && t.dirty(),
                    e(a.value),
                    { status: t.value, value: a.value });
              }
            }
            if ('transform' === a.type)
              if (!1 !== r.common.async)
                return this._def.schema
                  ._parseAsync({ data: r.data, path: r.path, parent: r })
                  .then(e =>
                    eX(e)
                      ? Promise.resolve(a.transform(e.value, i)).then(e => ({
                          status: t.value,
                          value: e,
                        }))
                      : e
                  );
              else {
                let e = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
                if (!eX(e)) return e;
                let s = a.transform(e.value, i);
                if (s instanceof Promise)
                  throw Error(
                    'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
                  );
                return { status: t.value, value: s };
              }
            s.assertNever(a);
          }
        }
        (tL.create = (e, t, r) =>
          new tL({ schema: e, typeName: o.ZodEffects, effect: t, ...e9(r) })),
          (tL.createWithPreprocess = (e, t, r) =>
            new tL({
              schema: t,
              effect: { type: 'preprocess', transform: e },
              typeName: o.ZodEffects,
              ...e9(r),
            }));
        class tU extends e2 {
          _parse(e) {
            return this._getType(e) === eR.undefined ? eG(void 0) : this._def.innerType._parse(e);
          }
          unwrap() {
            return this._def.innerType;
          }
        }
        tU.create = (e, t) => new tU({ innerType: e, typeName: o.ZodOptional, ...e9(t) });
        class tz extends e2 {
          _parse(e) {
            return this._getType(e) === eR.null ? eG(null) : this._def.innerType._parse(e);
          }
          unwrap() {
            return this._def.innerType;
          }
        }
        tz.create = (e, t) => new tz({ innerType: e, typeName: o.ZodNullable, ...e9(t) });
        class tB extends e2 {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              r = t.data;
            return (
              t.parsedType === eR.undefined && (r = this._def.defaultValue()),
              this._def.innerType._parse({ data: r, path: t.path, parent: t })
            );
          }
          removeDefault() {
            return this._def.innerType;
          }
        }
        tB.create = (e, t) =>
          new tB({
            innerType: e,
            typeName: o.ZodDefault,
            defaultValue: 'function' == typeof t.default ? t.default : () => t.default,
            ...e9(t),
          });
        class tW extends e2 {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              r = { ...t, common: { ...t.common, issues: [] } },
              a = this._def.innerType._parse({ data: r.data, path: r.path, parent: { ...r } });
            return eY(a)
              ? a.then(e => ({
                  status: 'valid',
                  value:
                    'valid' === e.status
                      ? e.value
                      : this._def.catchValue({
                          get error() {
                            return new e$(r.common.issues);
                          },
                          input: r.data,
                        }),
                }))
              : {
                  status: 'valid',
                  value:
                    'valid' === a.status
                      ? a.value
                      : this._def.catchValue({
                          get error() {
                            return new e$(r.common.issues);
                          },
                          input: r.data,
                        }),
                };
          }
          removeCatch() {
            return this._def.innerType;
          }
        }
        tW.create = (e, t) =>
          new tW({
            innerType: e,
            typeName: o.ZodCatch,
            catchValue: 'function' == typeof t.catch ? t.catch : () => t.catch,
            ...e9(t),
          });
        class tq extends e2 {
          _parse(e) {
            if (this._getType(e) !== eR.nan) {
              let t = this._getOrReturnCtx(e);
              return eB(t, { code: eM.invalid_type, expected: eR.nan, received: t.parsedType }), eq;
            }
            return { status: 'valid', value: e.data };
          }
        }
        (tq.create = e => new tq({ typeName: o.ZodNaN, ...e9(e) })), Symbol('zod_brand');
        class tK extends e2 {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              r = t.data;
            return this._def.type._parse({ data: r, path: t.path, parent: t });
          }
          unwrap() {
            return this._def.type;
          }
        }
        class tG extends e2 {
          _parse(e) {
            let { status: t, ctx: r } = this._processInputParams(e);
            if (r.common.async)
              return (async () => {
                let e = await this._def.in._parseAsync({ data: r.data, path: r.path, parent: r });
                return 'aborted' === e.status
                  ? eq
                  : 'dirty' === e.status
                    ? (t.dirty(), eK(e.value))
                    : this._def.out._parseAsync({ data: e.value, path: r.path, parent: r });
              })();
            {
              let e = this._def.in._parseSync({ data: r.data, path: r.path, parent: r });
              return 'aborted' === e.status
                ? eq
                : 'dirty' === e.status
                  ? (t.dirty(), { status: 'dirty', value: e.value })
                  : this._def.out._parseSync({ data: e.value, path: r.path, parent: r });
            }
          }
          static create(e, t) {
            return new tG({ in: e, out: t, typeName: o.ZodPipeline });
          }
        }
        class tH extends e2 {
          _parse(e) {
            let t = this._def.innerType._parse(e),
              r = e => (eX(e) && (e.value = Object.freeze(e.value)), e);
            return eY(t) ? t.then(e => r(e)) : r(t);
          }
          unwrap() {
            return this._def.innerType;
          }
        }
        function tJ(e, t) {
          let r = 'function' == typeof e ? e(t) : 'string' == typeof e ? { message: e } : e;
          return 'string' == typeof r ? { message: r } : r;
        }
        (tH.create = (e, t) => new tH({ innerType: e, typeName: o.ZodReadonly, ...e9(t) })),
          tj.lazycreate,
          !(function (e) {
            (e.ZodString = 'ZodString'),
              (e.ZodNumber = 'ZodNumber'),
              (e.ZodNaN = 'ZodNaN'),
              (e.ZodBigInt = 'ZodBigInt'),
              (e.ZodBoolean = 'ZodBoolean'),
              (e.ZodDate = 'ZodDate'),
              (e.ZodSymbol = 'ZodSymbol'),
              (e.ZodUndefined = 'ZodUndefined'),
              (e.ZodNull = 'ZodNull'),
              (e.ZodAny = 'ZodAny'),
              (e.ZodUnknown = 'ZodUnknown'),
              (e.ZodNever = 'ZodNever'),
              (e.ZodVoid = 'ZodVoid'),
              (e.ZodArray = 'ZodArray'),
              (e.ZodObject = 'ZodObject'),
              (e.ZodUnion = 'ZodUnion'),
              (e.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
              (e.ZodIntersection = 'ZodIntersection'),
              (e.ZodTuple = 'ZodTuple'),
              (e.ZodRecord = 'ZodRecord'),
              (e.ZodMap = 'ZodMap'),
              (e.ZodSet = 'ZodSet'),
              (e.ZodFunction = 'ZodFunction'),
              (e.ZodLazy = 'ZodLazy'),
              (e.ZodLiteral = 'ZodLiteral'),
              (e.ZodEnum = 'ZodEnum'),
              (e.ZodEffects = 'ZodEffects'),
              (e.ZodNativeEnum = 'ZodNativeEnum'),
              (e.ZodOptional = 'ZodOptional'),
              (e.ZodNullable = 'ZodNullable'),
              (e.ZodDefault = 'ZodDefault'),
              (e.ZodCatch = 'ZodCatch'),
              (e.ZodPromise = 'ZodPromise'),
              (e.ZodBranded = 'ZodBranded'),
              (e.ZodPipeline = 'ZodPipeline'),
              (e.ZodReadonly = 'ZodReadonly');
          })(o || (o = {}));
        let tX = tf.create,
          tY =
            (th.create,
            tq.create,
            tm.create,
            tp.create,
            ty.create,
            tv.create,
            tg.create,
            t_.create,
            tb.create,
            tx.create,
            tk.create,
            tw.create,
            tA.create,
            tj.create);
        tj.strictCreate,
          tS.create,
          tO.create,
          tC.create,
          tN.create,
          tF.create,
          tV.create,
          tE.create,
          tZ.create,
          tP.create,
          tD.create,
          tI.create,
          tM.create,
          t$.create,
          tL.create,
          tU.create,
          tz.create,
          tL.createWithPreprocess,
          tG.create;
        var tQ = r(70455),
          t0 = r(8730),
          t1 = r(4780),
          t4 = r(21929);
        let t9 = e => {
            let { children: t, ...r } = e;
            return c.createElement(Z.Provider, { value: r }, t);
          },
          t2 = c.createContext({}),
          t3 = ({ ...e }) =>
            (0, u.jsx)(t2.Provider, { value: { name: e.name }, children: (0, u.jsx)(U, { ...e }) }),
          t6 = () => {
            let e = c.useContext(t2),
              t = c.useContext(t5),
              { getFieldState: r, formState: a } = P(),
              s = r(e.name, a);
            if (!e) throw Error('useFormField should be used within <FormField>');
            let { id: i } = t;
            return {
              id: i,
              name: e.name,
              formItemId: `${i}-form-item`,
              formDescriptionId: `${i}-form-item-description`,
              formMessageId: `${i}-form-item-message`,
              ...s,
            };
          },
          t5 = c.createContext({}),
          t8 = c.forwardRef(({ className: e, ...t }, r) => {
            let a = c.useId();
            return (0, u.jsx)(t5.Provider, {
              value: { id: a },
              children: (0, u.jsx)('div', { ref: r, className: (0, t1.cn)('space-y-2', e), ...t }),
            });
          });
        t8.displayName = 'FormItem';
        let t7 = c.forwardRef(({ className: e, ...t }, r) => {
          let { error: a, formItemId: s } = t6();
          return (0, u.jsx)(t4.J, {
            ref: r,
            className: (0, t1.cn)(a && 'text-destructive', e),
            htmlFor: s,
            ...t,
          });
        });
        t7.displayName = 'FormLabel';
        let re = c.forwardRef(({ ...e }, t) => {
          let { error: r, formItemId: a, formDescriptionId: s, formMessageId: i } = t6();
          return (0, u.jsx)(t0.DX, {
            ref: t,
            id: a,
            'aria-describedby': r ? `${s} ${i}` : `${s}`,
            'aria-invalid': !!r,
            ...e,
          });
        });
        (re.displayName = 'FormControl'),
          (c.forwardRef(({ className: e, ...t }, r) => {
            let { formDescriptionId: a } = t6();
            return (0, u.jsx)('p', {
              ref: r,
              id: a,
              className: (0, t1.cn)('text-sm text-muted-foreground', e),
              ...t,
            });
          }).displayName = 'FormDescription');
        let rt = c.forwardRef(({ className: e, children: t, ...r }, a) => {
          let { error: s, formMessageId: i } = t6(),
            n = s ? String(s?.message) : t;
          return n
            ? (0, u.jsx)('p', {
                ref: a,
                id: i,
                className: (0, t1.cn)('text-sm font-medium text-destructive', e),
                ...r,
                children: n,
              })
            : null;
        });
        rt.displayName = 'FormMessage';
        let rr = c.forwardRef(({ className: e, type: t, ...r }, a) =>
          (0, u.jsx)('input', {
            type: t,
            className: (0, t1.cn)(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              e
            ),
            ref: a,
            ...r,
          })
        );
        rr.displayName = 'Input';
        let ra = c.forwardRef(({ className: e, ...t }, r) =>
          (0, u.jsx)('textarea', {
            className: (0, t1.cn)(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              e
            ),
            ref: r,
            ...t,
          })
        );
        ra.displayName = 'Textarea';
        let rs = 0,
          ri = new Map(),
          rn = e => {
            if (ri.has(e)) return;
            let t = setTimeout(() => {
              ri.delete(e), ru({ type: 'REMOVE_TOAST', toastId: e });
            }, 1e6);
            ri.set(e, t);
          },
          rl = (e, t) => {
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
                    ? rn(r)
                    : e.toasts.forEach(e => {
                        rn(e.id);
                      }),
                  {
                    ...e,
                    toasts: e.toasts.map(e =>
                      e.id === r || void 0 === r ? { ...e, open: !1 } : e
                    ),
                  }
                );
              }
              case 'REMOVE_TOAST':
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return { ...e, toasts: e.toasts.filter(e => e.id !== t.toastId) };
            }
          },
          rd = [],
          ro = { toasts: [] };
        function ru(e) {
          (ro = rl(ro, e)),
            rd.forEach(e => {
              e(ro);
            });
        }
        function rc({ ...e }) {
          let t = (rs = (rs + 1) % Number.MAX_SAFE_INTEGER).toString(),
            r = () => ru({ type: 'DISMISS_TOAST', toastId: t });
          return (
            ru({
              type: 'ADD_TOAST',
              toast: {
                ...e,
                id: t,
                open: !0,
                onOpenChange: e => {
                  e || r();
                },
              },
            }),
            { id: t, dismiss: r, update: e => ru({ type: 'UPDATE_TOAST', toast: { ...e, id: t } }) }
          );
        }
        let rf = 'force-dynamic';
        function rh() {
          var e, t;
          let r = (0, f.c3)('contact'),
            [a, s] = (0, c.useState)(!1),
            i = (function (e = {}) {
              let t = c.useRef(void 0),
                r = c.useRef(void 0),
                [a, s] = c.useState({
                  isDirty: !1,
                  isValidating: !1,
                  isLoading: G(e.defaultValues),
                  isSubmitted: !1,
                  isSubmitting: !1,
                  isSubmitSuccessful: !1,
                  isValid: !1,
                  submitCount: 0,
                  dirtyFields: {},
                  touchedFields: {},
                  validatingFields: {},
                  errors: e.errors || {},
                  disabled: e.disabled || !1,
                  isReady: !1,
                  defaultValues: G(e.defaultValues) ? void 0 : e.defaultValues,
                });
              !t.current &&
                ((t.current = {
                  ...(e.formControl
                    ? e.formControl
                    : (function (e = {}) {
                        let t,
                          r = { ...eN, ...e },
                          a = {
                            submitCount: 0,
                            isDirty: !1,
                            isReady: !1,
                            isLoading: G(r.defaultValues),
                            isValidating: !1,
                            isSubmitted: !1,
                            isSubmitting: !1,
                            isSubmitSuccessful: !1,
                            isValid: !1,
                            touchedFields: {},
                            dirtyFields: {},
                            validatingFields: {},
                            errors: r.errors || {},
                            disabled: r.disabled || !1,
                          },
                          s = {},
                          i =
                            ((v(r.defaultValues) || v(r.values)) &&
                              w(r.values || r.defaultValues)) ||
                            {},
                          n = r.shouldUnregister ? {} : w(i),
                          l = { action: !1, mount: !1, watch: !1 },
                          d = {
                            mount: new Set(),
                            disabled: new Set(),
                            unMount: new Set(),
                            array: new Set(),
                            watch: new Set(),
                          },
                          o = 0,
                          u = {
                            isDirty: !1,
                            dirtyFields: !1,
                            validatingFields: !1,
                            touchedFields: !1,
                            isValidating: !1,
                            isValid: !1,
                            errors: !1,
                          },
                          c = { ...u },
                          f = { array: W(), state: W() },
                          y = em(r.mode),
                          _ = em(r.reValidateMode),
                          x = r.criteriaMode === V.all,
                          O = e => t => {
                            clearTimeout(o), (o = setTimeout(e, t));
                          },
                          C = async e => {
                            if (!r.disabled && (u.isValid || c.isValid || e)) {
                              let e = r.resolver ? q((await M()).errors) : await z(s, !0);
                              e !== a.isValid && f.state.next({ isValid: e });
                            }
                          },
                          E = (e, t) => {
                            !r.disabled &&
                              (u.isValidating ||
                                u.validatingFields ||
                                c.isValidating ||
                                c.validatingFields) &&
                              ((e || Array.from(d.mount)).forEach(e => {
                                e && (t ? N(a.validatingFields, e, t) : ee(a.validatingFields, e));
                              }),
                              f.state.next({
                                validatingFields: a.validatingFields,
                                isValidating: !q(a.validatingFields),
                              }));
                          },
                          Z = (e, t) => {
                            N(a.errors, e, t), f.state.next({ errors: a.errors });
                          },
                          P = (e, t, r, a) => {
                            let d = S(s, e);
                            if (d) {
                              let s = S(n, e, j(r) ? S(i, e) : r);
                              j(s) || (a && a.defaultChecked) || t
                                ? N(n, e, t ? s : eu(d._f))
                                : er(e, s),
                                l.mount && C();
                            }
                          },
                          D = (e, t, s, n, l) => {
                            let d = !1,
                              o = !1,
                              h = { name: e };
                            if (!r.disabled) {
                              if (!s || n) {
                                (u.isDirty || c.isDirty) &&
                                  ((o = a.isDirty),
                                  (a.isDirty = h.isDirty = X()),
                                  (d = o !== h.isDirty));
                                let r = I(S(i, e), t);
                                (o = !!S(a.dirtyFields, e)),
                                  r ? ee(a.dirtyFields, e) : N(a.dirtyFields, e, !0),
                                  (h.dirtyFields = a.dirtyFields),
                                  (d = d || ((u.dirtyFields || c.dirtyFields) && !r !== o));
                              }
                              if (s) {
                                let t = S(a.touchedFields, e);
                                t ||
                                  (N(a.touchedFields, e, s),
                                  (h.touchedFields = a.touchedFields),
                                  (d = d || ((u.touchedFields || c.touchedFields) && t !== s)));
                              }
                              d && l && f.state.next(h);
                            }
                            return d ? h : {};
                          },
                          R = (e, s, i, n) => {
                            let l = S(a.errors, e),
                              d = (u.isValid || c.isValid) && T(s) && a.isValid !== s;
                            if (
                              (r.delayError && i
                                ? (t = O(() => Z(e, i)))(r.delayError)
                                : (clearTimeout(o),
                                  (t = null),
                                  i ? N(a.errors, e, i) : ee(a.errors, e)),
                              (i ? !I(l, i) : l) || !q(n) || d)
                            ) {
                              let t = {
                                ...n,
                                ...(d && T(s) ? { isValid: s } : {}),
                                errors: a.errors,
                                name: e,
                              };
                              (a = { ...a, ...t }), f.state.next(t);
                            }
                          },
                          M = async e => {
                            E(e, !0);
                            let t = await r.resolver(
                              n,
                              r.context,
                              ec(e || d.mount, s, r.criteriaMode, r.shouldUseNativeValidation)
                            );
                            return E(e), t;
                          },
                          U = async e => {
                            let { errors: t } = await M(e);
                            if (e)
                              for (let r of e) {
                                let e = S(t, r);
                                e ? N(a.errors, r, e) : ee(a.errors, r);
                              }
                            else a.errors = t;
                            return t;
                          },
                          z = async (e, t, s = { valid: !0 }) => {
                            for (let i in e) {
                              let l = e[i];
                              if (l) {
                                let { _f: e, ...o } = l;
                                if (e) {
                                  let o = d.array.has(e.name),
                                    c = l._f && ey(l._f);
                                  c && u.validatingFields && E([i], !0);
                                  let f = await eC(
                                    l,
                                    d.disabled,
                                    n,
                                    x,
                                    r.shouldUseNativeValidation && !t,
                                    o
                                  );
                                  if (
                                    (c && u.validatingFields && E([i]),
                                    f[e.name] && ((s.valid = !1), t))
                                  )
                                    break;
                                  t ||
                                    (S(f, e.name)
                                      ? o
                                        ? ej(a.errors, f, e.name)
                                        : N(a.errors, e.name, f[e.name])
                                      : ee(a.errors, e.name));
                                }
                                q(o) || (await z(o, t, s));
                              }
                            }
                            return s.valid;
                          },
                          X = (e, t) => !r.disabled && (e && t && N(n, e, t), !I(ef(), i)),
                          et = (e, t, r) =>
                            L(e, d, { ...(l.mount ? n : j(t) ? i : $(e) ? { [e]: t } : t) }, r, t),
                          er = (e, t, r = {}) => {
                            let a = S(s, e),
                              i = t;
                            if (a) {
                              let r = a._f;
                              r &&
                                (r.disabled || N(n, e, el(t, r)),
                                (i = H(r.ref) && p(t) ? '' : t),
                                J(r.ref)
                                  ? [...r.ref.options].forEach(
                                      e => (e.selected = i.includes(e.value))
                                    )
                                  : r.refs
                                    ? h(r.ref)
                                      ? r.refs.length > 1
                                        ? r.refs.forEach(
                                            e =>
                                              (!e.defaultChecked || !e.disabled) &&
                                              (e.checked = Array.isArray(i)
                                                ? !!i.find(t => t === e.value)
                                                : i === e.value)
                                          )
                                        : r.refs[0] && (r.refs[0].checked = !!i)
                                      : r.refs.forEach(e => (e.checked = e.value === i))
                                    : K(r.ref)
                                      ? (r.ref.value = '')
                                      : ((r.ref.value = i),
                                        r.ref.type || f.state.next({ name: e, values: w(n) })));
                            }
                            (r.shouldDirty || r.shouldTouch) &&
                              D(e, i, r.shouldTouch, r.shouldDirty, !0),
                              r.shouldValidate && eo(e);
                          },
                          es = (e, t, r) => {
                            for (let a in t) {
                              let i = t[a],
                                n = `${e}.${a}`,
                                l = S(s, n);
                              (d.array.has(e) || v(i) || (l && !l._f)) && !m(i)
                                ? es(n, i, r)
                                : er(n, i, r);
                            }
                          },
                          ei = (e, t, r = {}) => {
                            let o = S(s, e),
                              h = d.array.has(e),
                              m = w(t);
                            N(n, e, m),
                              h
                                ? (f.array.next({ name: e, values: w(n) }),
                                  (u.isDirty || u.dirtyFields || c.isDirty || c.dirtyFields) &&
                                    r.shouldDirty &&
                                    f.state.next({
                                      name: e,
                                      dirtyFields: ea(i, n),
                                      isDirty: X(e, m),
                                    }))
                                : !o || o._f || p(m)
                                  ? er(e, m, r)
                                  : es(e, m, r),
                              eg(e, d) && f.state.next({ ...a }),
                              f.state.next({ name: l.mount ? e : void 0, values: w(n) });
                          },
                          en = async e => {
                            l.mount = !0;
                            let i = e.target,
                              o = i.name,
                              h = !0,
                              p = S(s, o),
                              v = e => {
                                h =
                                  Number.isNaN(e) ||
                                  (m(e) && isNaN(e.getTime())) ||
                                  I(e, S(n, o, e));
                              };
                            if (p) {
                              let l,
                                m,
                                b = i.type ? eu(p._f) : g(e),
                                k = e.type === F.BLUR || e.type === F.FOCUS_OUT,
                                A =
                                  (!ev(p._f) && !r.resolver && !S(a.errors, o) && !p._f.deps) ||
                                  ew(k, S(a.touchedFields, o), a.isSubmitted, _, y),
                                j = eg(o, d, k);
                              N(n, o, b),
                                k
                                  ? (p._f.onBlur && p._f.onBlur(e), t && t(0))
                                  : p._f.onChange && p._f.onChange(e);
                              let T = D(o, b, k),
                                O = !q(T) || j;
                              if ((k || f.state.next({ name: o, type: e.type, values: w(n) }), A))
                                return (
                                  (u.isValid || c.isValid) &&
                                    ('onBlur' === r.mode ? k && C() : k || C()),
                                  O && f.state.next({ name: o, ...(j ? {} : T) })
                                );
                              if ((!k && j && f.state.next({ ...a }), r.resolver)) {
                                let { errors: e } = await M([o]);
                                if ((v(b), h)) {
                                  let t = eb(a.errors, s, o),
                                    r = eb(e, s, t.name || o);
                                  (l = r.error), (o = r.name), (m = q(e));
                                }
                              } else
                                E([o], !0),
                                  (l = (await eC(p, d.disabled, n, x, r.shouldUseNativeValidation))[
                                    o
                                  ]),
                                  E([o]),
                                  v(b),
                                  h &&
                                    (l
                                      ? (m = !1)
                                      : (u.isValid || c.isValid) && (m = await z(s, !0)));
                              h && (p._f.deps && eo(p._f.deps), R(o, m, l, T));
                            }
                          },
                          ed = (e, t) => {
                            if (S(a.errors, t) && e.focus) return e.focus(), 1;
                          },
                          eo = async (e, t = {}) => {
                            let i,
                              n,
                              l = B(e);
                            if (r.resolver) {
                              let t = await U(j(e) ? e : l);
                              (i = q(t)), (n = e ? !l.some(e => S(t, e)) : i);
                            } else
                              e
                                ? ((n = (
                                    await Promise.all(
                                      l.map(async e => {
                                        let t = S(s, e);
                                        return await z(t && t._f ? { [e]: t } : t);
                                      })
                                    )
                                  ).every(Boolean)) ||
                                    a.isValid) &&
                                  C()
                                : (n = i = await z(s));
                            return (
                              f.state.next({
                                ...(!$(e) || ((u.isValid || c.isValid) && i !== a.isValid)
                                  ? {}
                                  : { name: e }),
                                ...(r.resolver || !e ? { isValid: i } : {}),
                                errors: a.errors,
                              }),
                              t.shouldFocus && !n && e_(s, ed, e ? l : d.mount),
                              n
                            );
                          },
                          ef = e => {
                            let t = { ...(l.mount ? n : i) };
                            return j(e) ? t : $(e) ? S(t, e) : e.map(e => S(t, e));
                          },
                          ep = (e, t) => ({
                            invalid: !!S((t || a).errors, e),
                            isDirty: !!S((t || a).dirtyFields, e),
                            error: S((t || a).errors, e),
                            isValidating: !!S(a.validatingFields, e),
                            isTouched: !!S((t || a).touchedFields, e),
                          }),
                          eS = (e, t, r) => {
                            let i = (S(s, e, { _f: {} })._f || {}).ref,
                              { ref: n, message: l, type: d, ...o } = S(a.errors, e) || {};
                            N(a.errors, e, { ...o, ...t, ref: i }),
                              f.state.next({ name: e, errors: a.errors, isValid: !1 }),
                              r && r.shouldFocus && i && i.focus && i.focus();
                          },
                          eT = e =>
                            f.state.subscribe({
                              next: t => {
                                ek(e.name, t.name, e.exact) &&
                                  ex(t, e.formState || u, eR, e.reRenderRoot) &&
                                  e.callback({ values: { ...n }, ...a, ...t });
                              },
                            }).unsubscribe,
                          eO = (e, t = {}) => {
                            for (let l of e ? B(e) : d.mount)
                              d.mount.delete(l),
                                d.array.delete(l),
                                t.keepValue || (ee(s, l), ee(n, l)),
                                t.keepError || ee(a.errors, l),
                                t.keepDirty || ee(a.dirtyFields, l),
                                t.keepTouched || ee(a.touchedFields, l),
                                t.keepIsValidating || ee(a.validatingFields, l),
                                r.shouldUnregister || t.keepDefaultValue || ee(i, l);
                            f.state.next({ values: w(n) }),
                              f.state.next({ ...a, ...(!t.keepDirty ? {} : { isDirty: X() }) }),
                              t.keepIsValid || C();
                          },
                          eF = ({ disabled: e, name: t }) => {
                            ((T(e) && l.mount) || e || d.disabled.has(t)) &&
                              (e ? d.disabled.add(t) : d.disabled.delete(t));
                          },
                          eV = (e, t = {}) => {
                            let a = S(s, e),
                              n = T(t.disabled) || T(r.disabled);
                            return (
                              N(s, e, {
                                ...(a || {}),
                                _f: {
                                  ...(a && a._f ? a._f : { ref: { name: e } }),
                                  name: e,
                                  mount: !0,
                                  ...t,
                                },
                              }),
                              d.mount.add(e),
                              a
                                ? eF({ disabled: T(t.disabled) ? t.disabled : r.disabled, name: e })
                                : P(e, !0, t.value),
                              {
                                ...(n ? { disabled: t.disabled || r.disabled } : {}),
                                ...(r.progressive
                                  ? {
                                      required: !!t.required,
                                      min: eh(t.min),
                                      max: eh(t.max),
                                      minLength: eh(t.minLength),
                                      maxLength: eh(t.maxLength),
                                      pattern: eh(t.pattern),
                                    }
                                  : {}),
                                name: e,
                                onChange: en,
                                onBlur: en,
                                ref: n => {
                                  if (n) {
                                    eV(e, t), (a = S(s, e));
                                    let r =
                                        (j(n.value) &&
                                          n.querySelectorAll &&
                                          n.querySelectorAll('input,select,textarea')[0]) ||
                                        n,
                                      l = Y(r),
                                      d = a._f.refs || [];
                                    (l ? d.find(e => e === r) : r === a._f.ref) ||
                                      (N(s, e, {
                                        _f: {
                                          ...a._f,
                                          ...(l
                                            ? {
                                                refs: [
                                                  ...d.filter(Q),
                                                  r,
                                                  ...(Array.isArray(S(i, e)) ? [{}] : []),
                                                ],
                                                ref: { type: r.type, name: e },
                                              }
                                            : { ref: r }),
                                        },
                                      }),
                                      P(e, !1, void 0, r));
                                  } else
                                    (a = S(s, e, {}))._f && (a._f.mount = !1),
                                      (r.shouldUnregister || t.shouldUnregister) &&
                                        !(b(d.array, e) && l.action) &&
                                        d.unMount.add(e);
                                },
                              }
                            );
                          },
                          eE = () => r.shouldFocusError && e_(s, ed, d.mount),
                          eZ = (e, t) => async i => {
                            let l;
                            i && (i.preventDefault && i.preventDefault(), i.persist && i.persist());
                            let o = w(n);
                            if ((f.state.next({ isSubmitting: !0 }), r.resolver)) {
                              let { errors: e, values: t } = await M();
                              (a.errors = e), (o = t);
                            } else await z(s);
                            if (d.disabled.size) for (let e of d.disabled) N(o, e, void 0);
                            if ((ee(a.errors, 'root'), q(a.errors))) {
                              f.state.next({ errors: {} });
                              try {
                                await e(o, i);
                              } catch (e) {
                                l = e;
                              }
                            } else t && (await t({ ...a.errors }, i)), eE(), setTimeout(eE);
                            if (
                              (f.state.next({
                                isSubmitted: !0,
                                isSubmitting: !1,
                                isSubmitSuccessful: q(a.errors) && !l,
                                submitCount: a.submitCount + 1,
                                errors: a.errors,
                              }),
                              l)
                            )
                              throw l;
                          },
                          eP = (e, t = {}) => {
                            let o = e ? w(e) : i,
                              c = w(o),
                              h = q(e),
                              m = h ? i : c;
                            if ((t.keepDefaultValues || (i = o), !t.keepValues)) {
                              if (t.keepDirtyValues)
                                for (let e of Array.from(
                                  new Set([...d.mount, ...Object.keys(ea(i, n))])
                                ))
                                  S(a.dirtyFields, e) ? N(m, e, S(n, e)) : ei(e, S(m, e));
                              else {
                                if (k && j(e))
                                  for (let e of d.mount) {
                                    let t = S(s, e);
                                    if (t && t._f) {
                                      let e = Array.isArray(t._f.refs) ? t._f.refs[0] : t._f.ref;
                                      if (H(e)) {
                                        let t = e.closest('form');
                                        if (t) {
                                          t.reset();
                                          break;
                                        }
                                      }
                                    }
                                  }
                                for (let e of d.mount) ei(e, S(m, e));
                              }
                              (n = w(m)),
                                f.array.next({ values: { ...m } }),
                                f.state.next({ values: { ...m } });
                            }
                            (d = {
                              mount: t.keepDirtyValues ? d.mount : new Set(),
                              unMount: new Set(),
                              array: new Set(),
                              disabled: new Set(),
                              watch: new Set(),
                              watchAll: !1,
                              focus: '',
                            }),
                              (l.mount = !u.isValid || !!t.keepIsValid || !!t.keepDirtyValues),
                              (l.watch = !!r.shouldUnregister),
                              f.state.next({
                                submitCount: t.keepSubmitCount ? a.submitCount : 0,
                                isDirty:
                                  !h &&
                                  (t.keepDirty ? a.isDirty : !!(t.keepDefaultValues && !I(e, i))),
                                isSubmitted: !!t.keepIsSubmitted && a.isSubmitted,
                                dirtyFields: h
                                  ? {}
                                  : t.keepDirtyValues
                                    ? t.keepDefaultValues && n
                                      ? ea(i, n)
                                      : a.dirtyFields
                                    : t.keepDefaultValues && e
                                      ? ea(i, e)
                                      : t.keepDirty
                                        ? a.dirtyFields
                                        : {},
                                touchedFields: t.keepTouched ? a.touchedFields : {},
                                errors: t.keepErrors ? a.errors : {},
                                isSubmitSuccessful:
                                  !!t.keepIsSubmitSuccessful && a.isSubmitSuccessful,
                                isSubmitting: !1,
                              });
                          },
                          eD = (e, t) => eP(G(e) ? e(n) : e, t),
                          eR = e => {
                            a = { ...a, ...e };
                          },
                          eI = {
                            control: {
                              register: eV,
                              unregister: eO,
                              getFieldState: ep,
                              handleSubmit: eZ,
                              setError: eS,
                              _subscribe: eT,
                              _runSchema: M,
                              _getWatch: et,
                              _getDirty: X,
                              _setValid: C,
                              _setFieldArray: (e, t = [], d, o, h = !0, m = !0) => {
                                if (o && d && !r.disabled) {
                                  if (((l.action = !0), m && Array.isArray(S(s, e)))) {
                                    let t = d(S(s, e), o.argA, o.argB);
                                    h && N(s, e, t);
                                  }
                                  if (m && Array.isArray(S(a.errors, e))) {
                                    let t = d(S(a.errors, e), o.argA, o.argB);
                                    h && N(a.errors, e, t), eA(a.errors, e);
                                  }
                                  if (
                                    (u.touchedFields || c.touchedFields) &&
                                    m &&
                                    Array.isArray(S(a.touchedFields, e))
                                  ) {
                                    let t = d(S(a.touchedFields, e), o.argA, o.argB);
                                    h && N(a.touchedFields, e, t);
                                  }
                                  (u.dirtyFields || c.dirtyFields) && (a.dirtyFields = ea(i, n)),
                                    f.state.next({
                                      name: e,
                                      isDirty: X(e, t),
                                      dirtyFields: a.dirtyFields,
                                      errors: a.errors,
                                      isValid: a.isValid,
                                    });
                                } else N(n, e, t);
                              },
                              _setDisabledField: eF,
                              _setErrors: e => {
                                (a.errors = e), f.state.next({ errors: a.errors, isValid: !1 });
                              },
                              _getFieldArray: e =>
                                A(S(l.mount ? n : i, e, r.shouldUnregister ? S(i, e, []) : [])),
                              _reset: eP,
                              _resetDefaultValues: () =>
                                G(r.defaultValues) &&
                                r.defaultValues().then(e => {
                                  eD(e, r.resetOptions), f.state.next({ isLoading: !1 });
                                }),
                              _removeUnmounted: () => {
                                for (let e of d.unMount) {
                                  let t = S(s, e);
                                  t &&
                                    (t._f.refs ? t._f.refs.every(e => !Q(e)) : !Q(t._f.ref)) &&
                                    eO(e);
                                }
                                d.unMount = new Set();
                              },
                              _disableForm: e => {
                                T(e) &&
                                  (f.state.next({ disabled: e }),
                                  e_(
                                    s,
                                    (t, r) => {
                                      let a = S(s, r);
                                      a &&
                                        ((t.disabled = a._f.disabled || e),
                                        Array.isArray(a._f.refs) &&
                                          a._f.refs.forEach(t => {
                                            t.disabled = a._f.disabled || e;
                                          }));
                                    },
                                    0,
                                    !1
                                  ));
                              },
                              _subjects: f,
                              _proxyFormState: u,
                              get _fields() {
                                return s;
                              },
                              get _formValues() {
                                return n;
                              },
                              get _state() {
                                return l;
                              },
                              set _state(value) {
                                l = value;
                              },
                              get _defaultValues() {
                                return i;
                              },
                              get _names() {
                                return d;
                              },
                              set _names(value) {
                                d = value;
                              },
                              get _formState() {
                                return a;
                              },
                              get _options() {
                                return r;
                              },
                              set _options(value) {
                                r = { ...r, ...value };
                              },
                            },
                            subscribe: e => (
                              (l.mount = !0),
                              (c = { ...c, ...e.formState }),
                              eT({ ...e, formState: c })
                            ),
                            trigger: eo,
                            register: eV,
                            handleSubmit: eZ,
                            watch: (e, t) =>
                              G(e)
                                ? f.state.subscribe({ next: r => e(et(void 0, t), r) })
                                : et(e, t, !0),
                            setValue: ei,
                            getValues: ef,
                            reset: eD,
                            resetField: (e, t = {}) => {
                              S(s, e) &&
                                (j(t.defaultValue)
                                  ? ei(e, w(S(i, e)))
                                  : (ei(e, t.defaultValue), N(i, e, w(t.defaultValue))),
                                t.keepTouched || ee(a.touchedFields, e),
                                t.keepDirty ||
                                  (ee(a.dirtyFields, e),
                                  (a.isDirty = t.defaultValue ? X(e, w(S(i, e))) : X())),
                                !t.keepError && (ee(a.errors, e), u.isValid && C()),
                                f.state.next({ ...a }));
                            },
                            clearErrors: e => {
                              e && B(e).forEach(e => ee(a.errors, e)),
                                f.state.next({ errors: e ? a.errors : {} });
                            },
                            unregister: eO,
                            setError: eS,
                            setFocus: (e, t = {}) => {
                              let r = S(s, e),
                                a = r && r._f;
                              if (a) {
                                let e = a.refs ? a.refs[0] : a.ref;
                                e.focus && (e.focus(), t.shouldSelect && G(e.select) && e.select());
                              }
                            },
                            getFieldState: ep,
                          };
                        return { ...eI, formControl: eI };
                      })(e)),
                  formState: a,
                }),
                e.formControl &&
                  e.defaultValues &&
                  !G(e.defaultValues) &&
                  e.formControl.reset(e.defaultValues, e.resetOptions));
              let i = t.current.control;
              return (
                (i._options = e),
                eF(() => {
                  let e = i._subscribe({
                    formState: i._proxyFormState,
                    callback: () => s({ ...i._formState }),
                    reRenderRoot: !0,
                  });
                  return s(e => ({ ...e, isReady: !0 })), (i._formState.isReady = !0), e;
                }, [i]),
                c.useEffect(() => i._disableForm(e.disabled), [i, e.disabled]),
                c.useEffect(() => {
                  e.mode && (i._options.mode = e.mode),
                    e.reValidateMode && (i._options.reValidateMode = e.reValidateMode),
                    e.errors && !q(e.errors) && i._setErrors(e.errors);
                }, [i, e.errors, e.mode, e.reValidateMode]),
                c.useEffect(() => {
                  e.shouldUnregister && i._subjects.state.next({ values: i._getWatch() });
                }, [i, e.shouldUnregister]),
                c.useEffect(() => {
                  if (i._proxyFormState.isDirty) {
                    let e = i._getDirty();
                    e !== a.isDirty && i._subjects.state.next({ isDirty: e });
                  }
                }, [i, a.isDirty]),
                c.useEffect(() => {
                  e.values && !I(e.values, r.current)
                    ? (i._reset(e.values, i._options.resetOptions),
                      (r.current = e.values),
                      s(e => ({ ...e })))
                    : i._resetDefaultValues();
                }, [i, e.values]),
                c.useEffect(() => {
                  i._state.mount || (i._setValid(), (i._state.mount = !0)),
                    i._state.watch &&
                      ((i._state.watch = !1), i._subjects.state.next({ ...i._formState })),
                    i._removeUnmounted();
                }),
                (t.current.formState = D(a, i)),
                t.current
              );
            })({
              resolver:
                ((e = tY({
                  name: tX().min(2, { message: r('nameValidation') }),
                  email: tX().email({ message: r('emailValidation') }),
                  subject: tX().min(5, { message: r('subjectValidation') }),
                  message: tX().min(10, { message: r('messageValidation') }),
                })),
                void 0 === t && (t = {}),
                function (r, a, s) {
                  try {
                    return Promise.resolve(
                      (function (a, i) {
                        try {
                          var n = Promise.resolve(
                            e['sync' === t.mode ? 'parse' : 'parseAsync'](r, void 0)
                          ).then(function (e) {
                            return (
                              s.shouldUseNativeValidation && eE({}, s),
                              { errors: {}, values: t.raw ? Object.assign({}, r) : e }
                            );
                          });
                        } catch (e) {
                          return i(e);
                        }
                        return n && n.then ? n.then(void 0, i) : n;
                      })(0, function (e) {
                        if (Array.isArray(null == e ? void 0 : e.errors))
                          return {
                            values: {},
                            errors: eZ(
                              (function (e, t) {
                                for (var r = {}; e.length; ) {
                                  var a = e[0],
                                    s = a.code,
                                    i = a.message,
                                    n = a.path.join('.');
                                  if (!r[n])
                                    if ('unionErrors' in a) {
                                      var l = a.unionErrors[0].errors[0];
                                      r[n] = { message: l.message, type: l.code };
                                    } else r[n] = { message: i, type: s };
                                  if (
                                    ('unionErrors' in a &&
                                      a.unionErrors.forEach(function (t) {
                                        return t.errors.forEach(function (t) {
                                          return e.push(t);
                                        });
                                      }),
                                    t)
                                  ) {
                                    var d = r[n].types,
                                      o = d && d[a.code];
                                    r[n] = z(n, t, r, s, o ? [].concat(o, a.message) : a.message);
                                  }
                                  e.shift();
                                }
                                return r;
                              })(
                                e.errors,
                                !s.shouldUseNativeValidation && 'all' === s.criteriaMode
                              ),
                              s
                            ),
                          };
                        throw e;
                      })
                    );
                  } catch (e) {
                    return Promise.reject(e);
                  }
                }),
              defaultValues: { name: '', email: '', subject: '', message: '' },
            });
          async function n(e) {
            s(!0);
            try {
              let t = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(e),
                }),
                a = await t.json();
              if (!t.ok) throw Error(a.message || '提交失败');
              rc({ title: r('successTitle'), description: r('successMessage') }), i.reset();
            } catch (e) {
              console.error('提交表单时出错:', e),
                rc({
                  title: r('errorTitle'),
                  description:
                    'object' == typeof e && null !== e && 'message' in e
                      ? e.message
                      : r('errorMessage'),
                  variant: 'destructive',
                });
            } finally {
              s(!1);
            }
          }
          return (0, u.jsxs)('div', {
            className: 'container mx-auto py-12 px-4 md:px-6',
            children: [
              (0, u.jsx)('h1', {
                className: 'text-3xl font-bold mb-6 text-center',
                children: r('title'),
              }),
              (0, u.jsx)('p', {
                className: 'text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto',
                children: r('description'),
              }),
              (0, u.jsx)('div', {
                className: 'max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg',
                children: (0, u.jsx)(t9, {
                  ...i,
                  children: (0, u.jsxs)('form', {
                    onSubmit: i.handleSubmit(n),
                    className: 'space-y-6',
                    children: [
                      (0, u.jsxs)('div', {
                        className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                        children: [
                          (0, u.jsx)(t3, {
                            control: i.control,
                            name: 'name',
                            render: ({ field: e }) =>
                              (0, u.jsxs)(t8, {
                                children: [
                                  (0, u.jsx)(t7, { children: r('nameLabel') }),
                                  (0, u.jsx)(re, {
                                    children: (0, u.jsx)(rr, {
                                      placeholder: r('namePlaceholder'),
                                      ...e,
                                    }),
                                  }),
                                  (0, u.jsx)(rt, {}),
                                ],
                              }),
                          }),
                          (0, u.jsx)(t3, {
                            control: i.control,
                            name: 'email',
                            render: ({ field: e }) =>
                              (0, u.jsxs)(t8, {
                                children: [
                                  (0, u.jsx)(t7, { children: r('emailLabel') }),
                                  (0, u.jsx)(re, {
                                    children: (0, u.jsx)(rr, {
                                      placeholder: r('emailPlaceholder'),
                                      ...e,
                                    }),
                                  }),
                                  (0, u.jsx)(rt, {}),
                                ],
                              }),
                          }),
                        ],
                      }),
                      (0, u.jsx)(t3, {
                        control: i.control,
                        name: 'subject',
                        render: ({ field: e }) =>
                          (0, u.jsxs)(t8, {
                            children: [
                              (0, u.jsx)(t7, { children: r('subjectLabel') }),
                              (0, u.jsx)(re, {
                                children: (0, u.jsx)(rr, {
                                  placeholder: r('subjectPlaceholder'),
                                  ...e,
                                }),
                              }),
                              (0, u.jsx)(rt, {}),
                            ],
                          }),
                      }),
                      (0, u.jsx)(t3, {
                        control: i.control,
                        name: 'message',
                        render: ({ field: e }) =>
                          (0, u.jsxs)(t8, {
                            children: [
                              (0, u.jsx)(t7, { children: r('messageLabel') }),
                              (0, u.jsx)(re, {
                                children: (0, u.jsx)(ra, {
                                  placeholder: r('messagePlaceholder'),
                                  className: 'min-h-32',
                                  ...e,
                                }),
                              }),
                              (0, u.jsx)(rt, {}),
                            ],
                          }),
                      }),
                      (0, u.jsx)(tQ.$, {
                        type: 'submit',
                        className: 'w-full',
                        disabled: a,
                        children: a ? r('submitting') : r('submit'),
                      }),
                    ],
                  }),
                }),
              }),
              (0, u.jsxs)('div', {
                className: 'mt-12 text-center',
                children: [
                  (0, u.jsx)('h2', {
                    className: 'text-2xl font-bold mb-4',
                    children: r('alternativeTitle'),
                  }),
                  (0, u.jsxs)('p', {
                    className: 'mb-2',
                    children: [
                      (0, u.jsxs)('span', {
                        className: 'font-semibold',
                        children: [r('emailTitle'), ': '],
                      }),
                      (0, u.jsx)('a', {
                        href: 'mailto:your-email@example.com',
                        className: 'text-cyan-500 hover:text-cyan-400',
                        children: 'your-email@example.com',
                      }),
                    ],
                  }),
                  (0, u.jsxs)('p', {
                    className: 'mb-2',
                    children: [
                      (0, u.jsxs)('span', {
                        className: 'font-semibold',
                        children: [r('socialTitle'), ': '],
                      }),
                      (0, u.jsx)('a', {
                        href: 'https://twitter.com/yourusername',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-cyan-500 hover:text-cyan-400 mx-2',
                        children: 'Twitter',
                      }),
                      (0, u.jsx)('a', {
                        href: 'https://github.com/yourusername',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-cyan-500 hover:text-cyan-400 mx-2',
                        children: 'GitHub',
                      }),
                      (0, u.jsx)('a', {
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
      56953: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 51261));
      },
      61135: () => {},
      63033: e => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      70440: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => s });
        var a = r(31658);
        let s = async e => [
          {
            type: 'image/x-icon',
            sizes: '16x16',
            url: (0, a.fillMetadataSegment)('.', await e.params, 'favicon.ico') + '',
          },
        ];
      },
      70455: (e, t, r) => {
        'use strict';
        r.d(t, { $: () => o });
        var a = r(60687),
          s = r(43210),
          i = r(8730),
          n = r(24224),
          l = r(4780);
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
          o = s.forwardRef(({ className: e, variant: t, size: r, asChild: s = !1, ...n }, o) => {
            let u = s ? i.DX : 'button';
            return (0, a.jsx)(u, {
              className: (0, l.cn)(d({ variant: t, size: r, className: e })),
              ref: o,
              ...n,
            });
          });
        o.displayName = 'Button';
      },
      73683: (e, t, r) => {
        'use strict';
        r.d(t, { A: () => n });
        var a = r(35471),
          s = r(14967);
        let i = (0, r(55946).A)({ locales: ['en', 'zh'], defaultLocale: 'zh' }),
          n = (0, a.A)(async ({ requestLocale: e }) => {
            let t = await e,
              a = (0, s.EL)(i.locales, t) ? t : i.defaultLocale;
            return { locale: a, messages: (await r(76565)(`./${a}.json`)).default };
          });
      },
      76565: (e, t, r) => {
        var a = { './en.json': [87368, 368], './zh.json': [72961, 961] };
        function s(e) {
          if (!r.o(a, e))
            return Promise.resolve().then(() => {
              var t = Error("Cannot find module '" + e + "'");
              throw ((t.code = 'MODULE_NOT_FOUND'), t);
            });
          var t = a[e],
            s = t[0];
          return r.e(t[1]).then(() => r.t(s, 19));
        }
        (s.keys = () => Object.keys(a)), (s.id = 76565), (e.exports = s);
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
      84764: (e, t, r) => {
        'use strict';
        r.r(t),
          r.d(t, {
            GlobalError: () => n.a,
            __next_app__: () => c,
            pages: () => u,
            routeModule: () => f,
            tree: () => o,
          });
        var a = r(65239),
          s = r(48088),
          i = r(88170),
          n = r.n(i),
          l = r(30893),
          d = {};
        for (let e in l)
          0 >
            ['default', 'tree', 'pages', 'GlobalError', '__next_app__', 'routeModule'].indexOf(e) &&
            (d[e] = () => l[e]);
        r.d(t, d);
        let o = {
            children: [
              '',
              {
                children: [
                  '[locale]',
                  {
                    children: [
                      'contact',
                      {
                        children: [
                          '__PAGE__',
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 48914)),
                              '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/contact/page.tsx',
                            ],
                          },
                        ],
                      },
                      {},
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
          u = [
            '/Users/kxz/Desktop/Web-practice/Personal-Blog/Front-end/src/app/[locale]/contact/page.tsx',
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          f = new a.AppPageRouteModule({
            definition: {
              kind: s.RouteKind.APP_PAGE,
              page: '/[locale]/contact/page',
              pathname: '/[locale]/contact',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: o },
          });
      },
      91546: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 80994));
      },
      94431: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => l, metadata: () => n });
        var a = r(37413);
        r(61135);
        var s = r(7339),
          i = r.n(s);
        let n = {
          title: 'Modern Blog',
          description: 'A trendy blog for web development enthusiasts',
        };
        function l({ children: e }) {
          return (0, a.jsx)('html', {
            lang: 'en',
            children: (0, a.jsx)('body', { className: i().className, children: e }),
          });
        }
      },
      94627: (e, t, r) => {
        'use strict';
        r.r(t), r.d(t, { default: () => u });
        var a = r(37413),
          s = r(57974),
          i = r.n(s),
          n = r(39916),
          l = r(10323),
          d = r(88946);
        let o = ['en', 'zh'];
        function u({ children: e, params: { locale: t } }) {
          let r = (0, l.A)();
          return (
            o.includes(t) || (0, n.notFound)(),
            (0, a.jsx)('html', {
              lang: t,
              children: (0, a.jsx)('body', {
                className: i().className,
                children: (0, a.jsx)(d.A, { locale: t, messages: r, children: e }),
              }),
            })
          );
        }
      },
      98487: () => {},
    });
  var t = require('../../../webpack-runtime.js');
  t.C(e);
  var r = e => t((t.s = e)),
    a = t.X(0, [447, 435, 658, 618, 42, 358], () => r(84764));
  module.exports = a;
})();
