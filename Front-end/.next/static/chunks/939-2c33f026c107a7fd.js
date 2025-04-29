'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [939],
  {
    1275: (e, t, n) => {
      n.d(t, { X: () => l });
      var r = n(2115),
        o = n(2712);
      function l(e) {
        let [t, n] = r.useState(void 0);
        return (
          (0, o.N)(() => {
            if (e) {
              n({ width: e.offsetWidth, height: e.offsetHeight });
              let t = new ResizeObserver(t => {
                let r, o;
                if (!Array.isArray(t) || !t.length) return;
                let l = t[0];
                if ('borderBoxSize' in l) {
                  let e = l.borderBoxSize,
                    t = Array.isArray(e) ? e[0] : e;
                  (r = t.inlineSize), (o = t.blockSize);
                } else (r = e.offsetWidth), (o = e.offsetHeight);
                n({ width: r, height: o });
              });
              return t.observe(e, { box: 'border-box' }), () => t.unobserve(e);
            }
            n(void 0);
          }, [e]),
          t
        );
      }
    },
    1285: (e, t, n) => {
      n.d(t, { B: () => u });
      var r,
        o = n(2115),
        l = n(2712),
        i = (r || (r = n.t(o, 2)))[' useId '.trim().toString()] || (() => void 0),
        a = 0;
      function u(e) {
        let [t, n] = o.useState(i());
        return (
          (0, l.N)(() => {
            e || n(e => e ?? String(a++));
          }, [e]),
          e || (t ? `radix-${t}` : '')
        );
      }
    },
    1522: (e, t, n) => {
      n.d(t, {
        UC: () => n8,
        YJ: () => n4,
        In: () => n5,
        q7: () => n7,
        VF: () => rt,
        p4: () => re,
        JU: () => n9,
        ZL: () => n6,
        bL: () => n0,
        wn: () => rr,
        PP: () => rn,
        wv: () => ro,
        l9: () => n1,
        WT: () => n2,
        LM: () => n3,
      });
      var r,
        o,
        l,
        i = n(2115),
        a = n(7650),
        u = n(9367),
        c = n(5185),
        s = n(7328),
        d = n(6101),
        f = n(6081),
        p = n(4315),
        h = n(3655),
        v = n(9033),
        m = n(5155),
        g = 'dismissableLayer.update',
        w = i.createContext({
          layers: new Set(),
          layersWithOutsidePointerEventsDisabled: new Set(),
          branches: new Set(),
        }),
        y = i.forwardRef((e, t) => {
          var n, r;
          let {
              disableOutsidePointerEvents: l = !1,
              onEscapeKeyDown: a,
              onPointerDownOutside: u,
              onFocusOutside: s,
              onInteractOutside: f,
              onDismiss: p,
              ...y
            } = e,
            E = i.useContext(w),
            [C, S] = i.useState(null),
            R =
              null != (r = null == C ? void 0 : C.ownerDocument)
                ? r
                : null == (n = globalThis)
                  ? void 0
                  : n.document,
            [, A] = i.useState({}),
            T = (0, d.s)(t, e => S(e)),
            N = Array.from(E.layers),
            [L] = [...E.layersWithOutsidePointerEventsDisabled].slice(-1),
            k = N.indexOf(L),
            P = C ? N.indexOf(C) : -1,
            j = E.layersWithOutsidePointerEventsDisabled.size > 0,
            D = P >= k,
            M = (function (e) {
              var t;
              let n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null == (t = globalThis)
                      ? void 0
                      : t.document,
                r = (0, v.c)(e),
                o = i.useRef(!1),
                l = i.useRef(() => {});
              return (
                i.useEffect(() => {
                  let e = e => {
                      if (e.target && !o.current) {
                        let t = function () {
                            x('dismissableLayer.pointerDownOutside', r, o, { discrete: !0 });
                          },
                          o = { originalEvent: e };
                        'touch' === e.pointerType
                          ? (n.removeEventListener('click', l.current),
                            (l.current = t),
                            n.addEventListener('click', l.current, { once: !0 }))
                          : t();
                      } else n.removeEventListener('click', l.current);
                      o.current = !1;
                    },
                    t = window.setTimeout(() => {
                      n.addEventListener('pointerdown', e);
                    }, 0);
                  return () => {
                    window.clearTimeout(t),
                      n.removeEventListener('pointerdown', e),
                      n.removeEventListener('click', l.current);
                  };
                }, [n, r]),
                { onPointerDownCapture: () => (o.current = !0) }
              );
            })(e => {
              let t = e.target,
                n = [...E.branches].some(e => e.contains(t));
              D &&
                !n &&
                (null == u || u(e), null == f || f(e), e.defaultPrevented || null == p || p());
            }, R),
            I = (function (e) {
              var t;
              let n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null == (t = globalThis)
                      ? void 0
                      : t.document,
                r = (0, v.c)(e),
                o = i.useRef(!1);
              return (
                i.useEffect(() => {
                  let e = e => {
                    e.target &&
                      !o.current &&
                      x('dismissableLayer.focusOutside', r, { originalEvent: e }, { discrete: !1 });
                  };
                  return (
                    n.addEventListener('focusin', e), () => n.removeEventListener('focusin', e)
                  );
                }, [n, r]),
                { onFocusCapture: () => (o.current = !0), onBlurCapture: () => (o.current = !1) }
              );
            })(e => {
              let t = e.target;
              ![...E.branches].some(e => e.contains(t)) &&
                (null == s || s(e), null == f || f(e), e.defaultPrevented || null == p || p());
            }, R);
          return (
            !(function (e, t = globalThis?.document) {
              let n = (0, v.c)(e);
              i.useEffect(() => {
                let e = e => {
                  'Escape' === e.key && n(e);
                };
                return (
                  t.addEventListener('keydown', e, { capture: !0 }),
                  () => t.removeEventListener('keydown', e, { capture: !0 })
                );
              }, [n, t]);
            })(e => {
              P === E.layers.size - 1 &&
                (null == a || a(e), !e.defaultPrevented && p && (e.preventDefault(), p()));
            }, R),
            i.useEffect(() => {
              if (C)
                return (
                  l &&
                    (0 === E.layersWithOutsidePointerEventsDisabled.size &&
                      ((o = R.body.style.pointerEvents), (R.body.style.pointerEvents = 'none')),
                    E.layersWithOutsidePointerEventsDisabled.add(C)),
                  E.layers.add(C),
                  b(),
                  () => {
                    l &&
                      1 === E.layersWithOutsidePointerEventsDisabled.size &&
                      (R.body.style.pointerEvents = o);
                  }
                );
            }, [C, R, l, E]),
            i.useEffect(
              () => () => {
                C && (E.layers.delete(C), E.layersWithOutsidePointerEventsDisabled.delete(C), b());
              },
              [C, E]
            ),
            i.useEffect(() => {
              let e = () => A({});
              return document.addEventListener(g, e), () => document.removeEventListener(g, e);
            }, []),
            (0, m.jsx)(h.sG.div, {
              ...y,
              ref: T,
              style: { pointerEvents: j ? (D ? 'auto' : 'none') : void 0, ...e.style },
              onFocusCapture: (0, c.m)(e.onFocusCapture, I.onFocusCapture),
              onBlurCapture: (0, c.m)(e.onBlurCapture, I.onBlurCapture),
              onPointerDownCapture: (0, c.m)(e.onPointerDownCapture, M.onPointerDownCapture),
            })
          );
        });
      function b() {
        let e = new CustomEvent(g);
        document.dispatchEvent(e);
      }
      function x(e, t, n, r) {
        let { discrete: o } = r,
          l = n.originalEvent.target,
          i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
        t && l.addEventListener(e, t, { once: !0 }), o ? (0, h.hO)(l, i) : l.dispatchEvent(i);
      }
      (y.displayName = 'DismissableLayer'),
        (i.forwardRef((e, t) => {
          let n = i.useContext(w),
            r = i.useRef(null),
            o = (0, d.s)(t, r);
          return (
            i.useEffect(() => {
              let e = r.current;
              if (e)
                return (
                  n.branches.add(e),
                  () => {
                    n.branches.delete(e);
                  }
                );
            }, [n.branches]),
            (0, m.jsx)(h.sG.div, { ...e, ref: o })
          );
        }).displayName = 'DismissableLayerBranch');
      var E = 0;
      function C() {
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
      var S = 'focusScope.autoFocusOnMount',
        R = 'focusScope.autoFocusOnUnmount',
        A = { bubbles: !1, cancelable: !0 },
        T = i.forwardRef((e, t) => {
          let {
              loop: n = !1,
              trapped: r = !1,
              onMountAutoFocus: o,
              onUnmountAutoFocus: l,
              ...a
            } = e,
            [u, c] = i.useState(null),
            s = (0, v.c)(o),
            f = (0, v.c)(l),
            p = i.useRef(null),
            g = (0, d.s)(t, e => c(e)),
            w = i.useRef({
              paused: !1,
              pause() {
                this.paused = !0;
              },
              resume() {
                this.paused = !1;
              },
            }).current;
          i.useEffect(() => {
            if (r) {
              let e = function (e) {
                  if (w.paused || !u) return;
                  let t = e.target;
                  u.contains(t) ? (p.current = t) : k(p.current, { select: !0 });
                },
                t = function (e) {
                  if (w.paused || !u) return;
                  let t = e.relatedTarget;
                  null !== t && (u.contains(t) || k(p.current, { select: !0 }));
                };
              document.addEventListener('focusin', e), document.addEventListener('focusout', t);
              let n = new MutationObserver(function (e) {
                if (document.activeElement === document.body)
                  for (let t of e) t.removedNodes.length > 0 && k(u);
              });
              return (
                u && n.observe(u, { childList: !0, subtree: !0 }),
                () => {
                  document.removeEventListener('focusin', e),
                    document.removeEventListener('focusout', t),
                    n.disconnect();
                }
              );
            }
          }, [r, u, w.paused]),
            i.useEffect(() => {
              if (u) {
                P.add(w);
                let e = document.activeElement;
                if (!u.contains(e)) {
                  let t = new CustomEvent(S, A);
                  u.addEventListener(S, s),
                    u.dispatchEvent(t),
                    t.defaultPrevented ||
                      ((function (e) {
                        let { select: t = !1 } =
                            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                          n = document.activeElement;
                        for (let r of e)
                          if ((k(r, { select: t }), document.activeElement !== n)) return;
                      })(
                        N(u).filter(e => 'A' !== e.tagName),
                        { select: !0 }
                      ),
                      document.activeElement === e && k(u));
                }
                return () => {
                  u.removeEventListener(S, s),
                    setTimeout(() => {
                      let t = new CustomEvent(R, A);
                      u.addEventListener(R, f),
                        u.dispatchEvent(t),
                        t.defaultPrevented || k(null != e ? e : document.body, { select: !0 }),
                        u.removeEventListener(R, f),
                        P.remove(w);
                    }, 0);
                };
              }
            }, [u, s, f, w]);
          let y = i.useCallback(
            e => {
              if ((!n && !r) || w.paused) return;
              let t = 'Tab' === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                o = document.activeElement;
              if (t && o) {
                let t = e.currentTarget,
                  [r, l] = (function (e) {
                    let t = N(e);
                    return [L(t, e), L(t.reverse(), e)];
                  })(t);
                r && l
                  ? e.shiftKey || o !== l
                    ? e.shiftKey && o === r && (e.preventDefault(), n && k(l, { select: !0 }))
                    : (e.preventDefault(), n && k(r, { select: !0 }))
                  : o === t && e.preventDefault();
              }
            },
            [n, r, w.paused]
          );
          return (0, m.jsx)(h.sG.div, { tabIndex: -1, ...a, ref: g, onKeyDown: y });
        });
      function N(e) {
        let t = [],
          n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: e => {
              let t = 'INPUT' === e.tagName && 'hidden' === e.type;
              return e.disabled || e.hidden || t
                ? NodeFilter.FILTER_SKIP
                : e.tabIndex >= 0
                  ? NodeFilter.FILTER_ACCEPT
                  : NodeFilter.FILTER_SKIP;
            },
          });
        for (; n.nextNode(); ) t.push(n.currentNode);
        return t;
      }
      function L(e, t) {
        for (let n of e)
          if (
            !(function (e, t) {
              let { upTo: n } = t;
              if ('hidden' === getComputedStyle(e).visibility) return !0;
              for (; e && (void 0 === n || e !== n); ) {
                if ('none' === getComputedStyle(e).display) return !0;
                e = e.parentElement;
              }
              return !1;
            })(n, { upTo: t })
          )
            return n;
      }
      function k(e) {
        let { select: t = !1 } =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (e && e.focus) {
          var n;
          let r = document.activeElement;
          e.focus({ preventScroll: !0 }),
            e !== r && (n = e) instanceof HTMLInputElement && 'select' in n && t && e.select();
        }
      }
      T.displayName = 'FocusScope';
      var P = (function () {
        let e = [];
        return {
          add(t) {
            let n = e[0];
            t !== n && (null == n || n.pause()), (e = j(e, t)).unshift(t);
          },
          remove(t) {
            var n;
            null == (n = (e = j(e, t))[0]) || n.resume();
          },
        };
      })();
      function j(e, t) {
        let n = [...e],
          r = n.indexOf(t);
        return -1 !== r && n.splice(r, 1), n;
      }
      var D = n(1285);
      let M = ['top', 'right', 'bottom', 'left'],
        I = Math.min,
        O = Math.max,
        _ = Math.round,
        W = Math.floor,
        H = e => ({ x: e, y: e }),
        F = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
        B = { start: 'end', end: 'start' };
      function z(e, t) {
        return 'function' == typeof e ? e(t) : e;
      }
      function U(e) {
        return e.split('-')[0];
      }
      function G(e) {
        return e.split('-')[1];
      }
      function V(e) {
        return 'x' === e ? 'y' : 'x';
      }
      function X(e) {
        return 'y' === e ? 'height' : 'width';
      }
      function Y(e) {
        return ['top', 'bottom'].includes(U(e)) ? 'y' : 'x';
      }
      function K(e) {
        return e.replace(/start|end/g, e => B[e]);
      }
      function q(e) {
        return e.replace(/left|right|bottom|top/g, e => F[e]);
      }
      function $(e) {
        return 'number' != typeof e
          ? { top: 0, right: 0, bottom: 0, left: 0, ...e }
          : { top: e, right: e, bottom: e, left: e };
      }
      function Z(e) {
        let { x: t, y: n, width: r, height: o } = e;
        return { width: r, height: o, top: n, left: t, right: t + r, bottom: n + o, x: t, y: n };
      }
      function J(e, t, n) {
        let r,
          { reference: o, floating: l } = e,
          i = Y(t),
          a = V(Y(t)),
          u = X(a),
          c = U(t),
          s = 'y' === i,
          d = o.x + o.width / 2 - l.width / 2,
          f = o.y + o.height / 2 - l.height / 2,
          p = o[u] / 2 - l[u] / 2;
        switch (c) {
          case 'top':
            r = { x: d, y: o.y - l.height };
            break;
          case 'bottom':
            r = { x: d, y: o.y + o.height };
            break;
          case 'right':
            r = { x: o.x + o.width, y: f };
            break;
          case 'left':
            r = { x: o.x - l.width, y: f };
            break;
          default:
            r = { x: o.x, y: o.y };
        }
        switch (G(t)) {
          case 'start':
            r[a] -= p * (n && s ? -1 : 1);
            break;
          case 'end':
            r[a] += p * (n && s ? -1 : 1);
        }
        return r;
      }
      let Q = async (e, t, n) => {
        let {
            placement: r = 'bottom',
            strategy: o = 'absolute',
            middleware: l = [],
            platform: i,
          } = n,
          a = l.filter(Boolean),
          u = await (null == i.isRTL ? void 0 : i.isRTL(t)),
          c = await i.getElementRects({ reference: e, floating: t, strategy: o }),
          { x: s, y: d } = J(c, r, u),
          f = r,
          p = {},
          h = 0;
        for (let n = 0; n < a.length; n++) {
          let { name: l, fn: v } = a[n],
            {
              x: m,
              y: g,
              data: w,
              reset: y,
            } = await v({
              x: s,
              y: d,
              initialPlacement: r,
              placement: f,
              strategy: o,
              middlewareData: p,
              rects: c,
              platform: i,
              elements: { reference: e, floating: t },
            });
          (s = null != m ? m : s),
            (d = null != g ? g : d),
            (p = { ...p, [l]: { ...p[l], ...w } }),
            y &&
              h <= 50 &&
              (h++,
              'object' == typeof y &&
                (y.placement && (f = y.placement),
                y.rects &&
                  (c =
                    !0 === y.rects
                      ? await i.getElementRects({ reference: e, floating: t, strategy: o })
                      : y.rects),
                ({ x: s, y: d } = J(c, f, u))),
              (n = -1));
        }
        return { x: s, y: d, placement: f, strategy: o, middlewareData: p };
      };
      async function ee(e, t) {
        var n;
        void 0 === t && (t = {});
        let { x: r, y: o, platform: l, rects: i, elements: a, strategy: u } = e,
          {
            boundary: c = 'clippingAncestors',
            rootBoundary: s = 'viewport',
            elementContext: d = 'floating',
            altBoundary: f = !1,
            padding: p = 0,
          } = z(t, e),
          h = $(p),
          v = a[f ? ('floating' === d ? 'reference' : 'floating') : d],
          m = Z(
            await l.getClippingRect({
              element:
                null == (n = await (null == l.isElement ? void 0 : l.isElement(v))) || n
                  ? v
                  : v.contextElement ||
                    (await (null == l.getDocumentElement
                      ? void 0
                      : l.getDocumentElement(a.floating))),
              boundary: c,
              rootBoundary: s,
              strategy: u,
            })
          ),
          g =
            'floating' === d
              ? { x: r, y: o, width: i.floating.width, height: i.floating.height }
              : i.reference,
          w = await (null == l.getOffsetParent ? void 0 : l.getOffsetParent(a.floating)),
          y = ((await (null == l.isElement ? void 0 : l.isElement(w))) &&
            (await (null == l.getScale ? void 0 : l.getScale(w)))) || { x: 1, y: 1 },
          b = Z(
            l.convertOffsetParentRelativeRectToViewportRelativeRect
              ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
                  elements: a,
                  rect: g,
                  offsetParent: w,
                  strategy: u,
                })
              : g
          );
        return {
          top: (m.top - b.top + h.top) / y.y,
          bottom: (b.bottom - m.bottom + h.bottom) / y.y,
          left: (m.left - b.left + h.left) / y.x,
          right: (b.right - m.right + h.right) / y.x,
        };
      }
      function et(e, t) {
        return {
          top: e.top - t.height,
          right: e.right - t.width,
          bottom: e.bottom - t.height,
          left: e.left - t.width,
        };
      }
      function en(e) {
        return M.some(t => e[t] >= 0);
      }
      async function er(e, t) {
        let { placement: n, platform: r, elements: o } = e,
          l = await (null == r.isRTL ? void 0 : r.isRTL(o.floating)),
          i = U(n),
          a = G(n),
          u = 'y' === Y(n),
          c = ['left', 'top'].includes(i) ? -1 : 1,
          s = l && u ? -1 : 1,
          d = z(t, e),
          {
            mainAxis: f,
            crossAxis: p,
            alignmentAxis: h,
          } = 'number' == typeof d
            ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
            : {
                mainAxis: d.mainAxis || 0,
                crossAxis: d.crossAxis || 0,
                alignmentAxis: d.alignmentAxis,
              };
        return (
          a && 'number' == typeof h && (p = 'end' === a ? -1 * h : h),
          u ? { x: p * s, y: f * c } : { x: f * c, y: p * s }
        );
      }
      function eo() {
        return 'undefined' != typeof window;
      }
      function el(e) {
        return eu(e) ? (e.nodeName || '').toLowerCase() : '#document';
      }
      function ei(e) {
        var t;
        return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window;
      }
      function ea(e) {
        var t;
        return null == (t = (eu(e) ? e.ownerDocument : e.document) || window.document)
          ? void 0
          : t.documentElement;
      }
      function eu(e) {
        return !!eo() && (e instanceof Node || e instanceof ei(e).Node);
      }
      function ec(e) {
        return !!eo() && (e instanceof Element || e instanceof ei(e).Element);
      }
      function es(e) {
        return !!eo() && (e instanceof HTMLElement || e instanceof ei(e).HTMLElement);
      }
      function ed(e) {
        return (
          !!eo() &&
          'undefined' != typeof ShadowRoot &&
          (e instanceof ShadowRoot || e instanceof ei(e).ShadowRoot)
        );
      }
      function ef(e) {
        let { overflow: t, overflowX: n, overflowY: r, display: o } = eg(e);
        return (
          /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !['inline', 'contents'].includes(o)
        );
      }
      function ep(e) {
        return [':popover-open', ':modal'].some(t => {
          try {
            return e.matches(t);
          } catch (e) {
            return !1;
          }
        });
      }
      function eh(e) {
        let t = ev(),
          n = ec(e) ? eg(e) : e;
        return (
          ['transform', 'translate', 'scale', 'rotate', 'perspective'].some(
            e => !!n[e] && 'none' !== n[e]
          ) ||
          (!!n.containerType && 'normal' !== n.containerType) ||
          (!t && !!n.backdropFilter && 'none' !== n.backdropFilter) ||
          (!t && !!n.filter && 'none' !== n.filter) ||
          ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(e =>
            (n.willChange || '').includes(e)
          ) ||
          ['paint', 'layout', 'strict', 'content'].some(e => (n.contain || '').includes(e))
        );
      }
      function ev() {
        return (
          'undefined' != typeof CSS &&
          !!CSS.supports &&
          CSS.supports('-webkit-backdrop-filter', 'none')
        );
      }
      function em(e) {
        return ['html', 'body', '#document'].includes(el(e));
      }
      function eg(e) {
        return ei(e).getComputedStyle(e);
      }
      function ew(e) {
        return ec(e)
          ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
          : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
      }
      function ey(e) {
        if ('html' === el(e)) return e;
        let t = e.assignedSlot || e.parentNode || (ed(e) && e.host) || ea(e);
        return ed(t) ? t.host : t;
      }
      function eb(e, t, n) {
        var r;
        void 0 === t && (t = []), void 0 === n && (n = !0);
        let o = (function e(t) {
            let n = ey(t);
            return em(n)
              ? t.ownerDocument
                ? t.ownerDocument.body
                : t.body
              : es(n) && ef(n)
                ? n
                : e(n);
          })(e),
          l = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
          i = ei(o);
        if (l) {
          let e = ex(i);
          return t.concat(i, i.visualViewport || [], ef(o) ? o : [], e && n ? eb(e) : []);
        }
        return t.concat(o, eb(o, [], n));
      }
      function ex(e) {
        return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
      }
      function eE(e) {
        let t = eg(e),
          n = parseFloat(t.width) || 0,
          r = parseFloat(t.height) || 0,
          o = es(e),
          l = o ? e.offsetWidth : n,
          i = o ? e.offsetHeight : r,
          a = _(n) !== l || _(r) !== i;
        return a && ((n = l), (r = i)), { width: n, height: r, $: a };
      }
      function eC(e) {
        return ec(e) ? e : e.contextElement;
      }
      function eS(e) {
        let t = eC(e);
        if (!es(t)) return H(1);
        let n = t.getBoundingClientRect(),
          { width: r, height: o, $: l } = eE(t),
          i = (l ? _(n.width) : n.width) / r,
          a = (l ? _(n.height) : n.height) / o;
        return (
          (i && Number.isFinite(i)) || (i = 1), (a && Number.isFinite(a)) || (a = 1), { x: i, y: a }
        );
      }
      let eR = H(0);
      function eA(e) {
        let t = ei(e);
        return ev() && t.visualViewport
          ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
          : eR;
      }
      function eT(e, t, n, r) {
        var o;
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        let l = e.getBoundingClientRect(),
          i = eC(e),
          a = H(1);
        t && (r ? ec(r) && (a = eS(r)) : (a = eS(e)));
        let u = (void 0 === (o = n) && (o = !1), r && (!o || r === ei(i)) && o) ? eA(i) : H(0),
          c = (l.left + u.x) / a.x,
          s = (l.top + u.y) / a.y,
          d = l.width / a.x,
          f = l.height / a.y;
        if (i) {
          let e = ei(i),
            t = r && ec(r) ? ei(r) : r,
            n = e,
            o = ex(n);
          for (; o && r && t !== n; ) {
            let e = eS(o),
              t = o.getBoundingClientRect(),
              r = eg(o),
              l = t.left + (o.clientLeft + parseFloat(r.paddingLeft)) * e.x,
              i = t.top + (o.clientTop + parseFloat(r.paddingTop)) * e.y;
            (c *= e.x),
              (s *= e.y),
              (d *= e.x),
              (f *= e.y),
              (c += l),
              (s += i),
              (o = ex((n = ei(o))));
          }
        }
        return Z({ width: d, height: f, x: c, y: s });
      }
      function eN(e, t) {
        let n = ew(e).scrollLeft;
        return t ? t.left + n : eT(ea(e)).left + n;
      }
      function eL(e, t, n) {
        void 0 === n && (n = !1);
        let r = e.getBoundingClientRect();
        return { x: r.left + t.scrollLeft - (n ? 0 : eN(e, r)), y: r.top + t.scrollTop };
      }
      function ek(e, t, n) {
        let r;
        if ('viewport' === t)
          r = (function (e, t) {
            let n = ei(e),
              r = ea(e),
              o = n.visualViewport,
              l = r.clientWidth,
              i = r.clientHeight,
              a = 0,
              u = 0;
            if (o) {
              (l = o.width), (i = o.height);
              let e = ev();
              (!e || (e && 'fixed' === t)) && ((a = o.offsetLeft), (u = o.offsetTop));
            }
            return { width: l, height: i, x: a, y: u };
          })(e, n);
        else if ('document' === t)
          r = (function (e) {
            let t = ea(e),
              n = ew(e),
              r = e.ownerDocument.body,
              o = O(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
              l = O(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight),
              i = -n.scrollLeft + eN(e),
              a = -n.scrollTop;
            return (
              'rtl' === eg(r).direction && (i += O(t.clientWidth, r.clientWidth) - o),
              { width: o, height: l, x: i, y: a }
            );
          })(ea(e));
        else if (ec(t))
          r = (function (e, t) {
            let n = eT(e, !0, 'fixed' === t),
              r = n.top + e.clientTop,
              o = n.left + e.clientLeft,
              l = es(e) ? eS(e) : H(1),
              i = e.clientWidth * l.x,
              a = e.clientHeight * l.y;
            return { width: i, height: a, x: o * l.x, y: r * l.y };
          })(t, n);
        else {
          let n = eA(e);
          r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
        }
        return Z(r);
      }
      function eP(e) {
        return 'static' === eg(e).position;
      }
      function ej(e, t) {
        if (!es(e) || 'fixed' === eg(e).position) return null;
        if (t) return t(e);
        let n = e.offsetParent;
        return ea(e) === n && (n = n.ownerDocument.body), n;
      }
      function eD(e, t) {
        let n = ei(e);
        if (ep(e)) return n;
        if (!es(e)) {
          let t = ey(e);
          for (; t && !em(t); ) {
            if (ec(t) && !eP(t)) return t;
            t = ey(t);
          }
          return n;
        }
        let r = ej(e, t);
        for (; r && ['table', 'td', 'th'].includes(el(r)) && eP(r); ) r = ej(r, t);
        return r && em(r) && eP(r) && !eh(r)
          ? n
          : r ||
              (function (e) {
                let t = ey(e);
                for (; es(t) && !em(t); ) {
                  if (eh(t)) return t;
                  if (ep(t)) break;
                  t = ey(t);
                }
                return null;
              })(e) ||
              n;
      }
      let eM = async function (e) {
          let t = this.getOffsetParent || eD,
            n = this.getDimensions,
            r = await n(e.floating);
          return {
            reference: (function (e, t, n) {
              let r = es(t),
                o = ea(t),
                l = 'fixed' === n,
                i = eT(e, !0, l, t),
                a = { scrollLeft: 0, scrollTop: 0 },
                u = H(0);
              if (r || (!r && !l))
                if ((('body' !== el(t) || ef(o)) && (a = ew(t)), r)) {
                  let e = eT(t, !0, l, t);
                  (u.x = e.x + t.clientLeft), (u.y = e.y + t.clientTop);
                } else o && (u.x = eN(o));
              let c = !o || r || l ? H(0) : eL(o, a);
              return {
                x: i.left + a.scrollLeft - u.x - c.x,
                y: i.top + a.scrollTop - u.y - c.y,
                width: i.width,
                height: i.height,
              };
            })(e.reference, await t(e.floating), e.strategy),
            floating: { x: 0, y: 0, width: r.width, height: r.height },
          };
        },
        eI = {
          convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
            let { elements: t, rect: n, offsetParent: r, strategy: o } = e,
              l = 'fixed' === o,
              i = ea(r),
              a = !!t && ep(t.floating);
            if (r === i || (a && l)) return n;
            let u = { scrollLeft: 0, scrollTop: 0 },
              c = H(1),
              s = H(0),
              d = es(r);
            if ((d || (!d && !l)) && (('body' !== el(r) || ef(i)) && (u = ew(r)), es(r))) {
              let e = eT(r);
              (c = eS(r)), (s.x = e.x + r.clientLeft), (s.y = e.y + r.clientTop);
            }
            let f = !i || d || l ? H(0) : eL(i, u, !0);
            return {
              width: n.width * c.x,
              height: n.height * c.y,
              x: n.x * c.x - u.scrollLeft * c.x + s.x + f.x,
              y: n.y * c.y - u.scrollTop * c.y + s.y + f.y,
            };
          },
          getDocumentElement: ea,
          getClippingRect: function (e) {
            let { element: t, boundary: n, rootBoundary: r, strategy: o } = e,
              l = [
                ...('clippingAncestors' === n
                  ? ep(t)
                    ? []
                    : (function (e, t) {
                        let n = t.get(e);
                        if (n) return n;
                        let r = eb(e, [], !1).filter(e => ec(e) && 'body' !== el(e)),
                          o = null,
                          l = 'fixed' === eg(e).position,
                          i = l ? ey(e) : e;
                        for (; ec(i) && !em(i); ) {
                          let t = eg(i),
                            n = eh(i);
                          n || 'fixed' !== t.position || (o = null),
                            (
                              l
                                ? !n && !o
                                : (!n &&
                                    'static' === t.position &&
                                    !!o &&
                                    ['absolute', 'fixed'].includes(o.position)) ||
                                  (ef(i) &&
                                    !n &&
                                    (function e(t, n) {
                                      let r = ey(t);
                                      return (
                                        !(r === n || !ec(r) || em(r)) &&
                                        ('fixed' === eg(r).position || e(r, n))
                                      );
                                    })(e, i))
                            )
                              ? (r = r.filter(e => e !== i))
                              : (o = t),
                            (i = ey(i));
                        }
                        return t.set(e, r), r;
                      })(t, this._c)
                  : [].concat(n)),
                r,
              ],
              i = l[0],
              a = l.reduce(
                (e, n) => {
                  let r = ek(t, n, o);
                  return (
                    (e.top = O(r.top, e.top)),
                    (e.right = I(r.right, e.right)),
                    (e.bottom = I(r.bottom, e.bottom)),
                    (e.left = O(r.left, e.left)),
                    e
                  );
                },
                ek(t, i, o)
              );
            return { width: a.right - a.left, height: a.bottom - a.top, x: a.left, y: a.top };
          },
          getOffsetParent: eD,
          getElementRects: eM,
          getClientRects: function (e) {
            return Array.from(e.getClientRects());
          },
          getDimensions: function (e) {
            let { width: t, height: n } = eE(e);
            return { width: t, height: n };
          },
          getScale: eS,
          isElement: ec,
          isRTL: function (e) {
            return 'rtl' === eg(e).direction;
          },
        };
      function eO(e, t) {
        return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
      }
      let e_ = e => ({
          name: 'arrow',
          options: e,
          async fn(t) {
            let {
                x: n,
                y: r,
                placement: o,
                rects: l,
                platform: i,
                elements: a,
                middlewareData: u,
              } = t,
              { element: c, padding: s = 0 } = z(e, t) || {};
            if (null == c) return {};
            let d = $(s),
              f = { x: n, y: r },
              p = V(Y(o)),
              h = X(p),
              v = await i.getDimensions(c),
              m = 'y' === p,
              g = m ? 'clientHeight' : 'clientWidth',
              w = l.reference[h] + l.reference[p] - f[p] - l.floating[h],
              y = f[p] - l.reference[p],
              b = await (null == i.getOffsetParent ? void 0 : i.getOffsetParent(c)),
              x = b ? b[g] : 0;
            (x && (await (null == i.isElement ? void 0 : i.isElement(b)))) ||
              (x = a.floating[g] || l.floating[h]);
            let E = x / 2 - v[h] / 2 - 1,
              C = I(d[m ? 'top' : 'left'], E),
              S = I(d[m ? 'bottom' : 'right'], E),
              R = x - v[h] - S,
              A = x / 2 - v[h] / 2 + (w / 2 - y / 2),
              T = O(C, I(A, R)),
              N =
                !u.arrow &&
                null != G(o) &&
                A !== T &&
                l.reference[h] / 2 - (A < C ? C : S) - v[h] / 2 < 0,
              L = N ? (A < C ? A - C : A - R) : 0;
            return {
              [p]: f[p] + L,
              data: { [p]: T, centerOffset: A - T - L, ...(N && { alignmentOffset: L }) },
              reset: N,
            };
          },
        }),
        eW = (e, t, n) => {
          let r = new Map(),
            o = { platform: eI, ...n },
            l = { ...o.platform, _c: r };
          return Q(e, t, { ...o, platform: l });
        };
      var eH = 'undefined' != typeof document ? i.useLayoutEffect : i.useEffect;
      function eF(e, t) {
        let n, r, o;
        if (e === t) return !0;
        if (typeof e != typeof t) return !1;
        if ('function' == typeof e && e.toString() === t.toString()) return !0;
        if (e && t && 'object' == typeof e) {
          if (Array.isArray(e)) {
            if ((n = e.length) !== t.length) return !1;
            for (r = n; 0 != r--; ) if (!eF(e[r], t[r])) return !1;
            return !0;
          }
          if ((n = (o = Object.keys(e)).length) !== Object.keys(t).length) return !1;
          for (r = n; 0 != r--; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
          for (r = n; 0 != r--; ) {
            let n = o[r];
            if (('_owner' !== n || !e.$$typeof) && !eF(e[n], t[n])) return !1;
          }
          return !0;
        }
        return e != e && t != t;
      }
      function eB(e) {
        return 'undefined' == typeof window
          ? 1
          : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
      }
      function ez(e, t) {
        let n = eB(e);
        return Math.round(t * n) / n;
      }
      function eU(e) {
        let t = i.useRef(e);
        return (
          eH(() => {
            t.current = e;
          }),
          t
        );
      }
      let eG = e => ({
          name: 'arrow',
          options: e,
          fn(t) {
            let { element: n, padding: r } = 'function' == typeof e ? e(t) : e;
            return n && {}.hasOwnProperty.call(n, 'current')
              ? null != n.current
                ? e_({ element: n.current, padding: r }).fn(t)
                : {}
              : n
                ? e_({ element: n, padding: r }).fn(t)
                : {};
          },
        }),
        eV = (e, t) => ({
          ...(function (e) {
            return (
              void 0 === e && (e = 0),
              {
                name: 'offset',
                options: e,
                async fn(t) {
                  var n, r;
                  let { x: o, y: l, placement: i, middlewareData: a } = t,
                    u = await er(t, e);
                  return i === (null == (n = a.offset) ? void 0 : n.placement) &&
                    null != (r = a.arrow) &&
                    r.alignmentOffset
                    ? {}
                    : { x: o + u.x, y: l + u.y, data: { ...u, placement: i } };
                },
              }
            );
          })(e),
          options: [e, t],
        }),
        eX = (e, t) => ({
          ...(function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: 'shift',
                options: e,
                async fn(t) {
                  let { x: n, y: r, placement: o } = t,
                    {
                      mainAxis: l = !0,
                      crossAxis: i = !1,
                      limiter: a = {
                        fn: e => {
                          let { x: t, y: n } = e;
                          return { x: t, y: n };
                        },
                      },
                      ...u
                    } = z(e, t),
                    c = { x: n, y: r },
                    s = await ee(t, u),
                    d = Y(U(o)),
                    f = V(d),
                    p = c[f],
                    h = c[d];
                  if (l) {
                    let e = 'y' === f ? 'top' : 'left',
                      t = 'y' === f ? 'bottom' : 'right',
                      n = p + s[e],
                      r = p - s[t];
                    p = O(n, I(p, r));
                  }
                  if (i) {
                    let e = 'y' === d ? 'top' : 'left',
                      t = 'y' === d ? 'bottom' : 'right',
                      n = h + s[e],
                      r = h - s[t];
                    h = O(n, I(h, r));
                  }
                  let v = a.fn({ ...t, [f]: p, [d]: h });
                  return { ...v, data: { x: v.x - n, y: v.y - r, enabled: { [f]: l, [d]: i } } };
                },
              }
            );
          })(e),
          options: [e, t],
        }),
        eY = (e, t) => ({
          ...(function (e) {
            return (
              void 0 === e && (e = {}),
              {
                options: e,
                fn(t) {
                  let { x: n, y: r, placement: o, rects: l, middlewareData: i } = t,
                    { offset: a = 0, mainAxis: u = !0, crossAxis: c = !0 } = z(e, t),
                    s = { x: n, y: r },
                    d = Y(o),
                    f = V(d),
                    p = s[f],
                    h = s[d],
                    v = z(a, t),
                    m =
                      'number' == typeof v
                        ? { mainAxis: v, crossAxis: 0 }
                        : { mainAxis: 0, crossAxis: 0, ...v };
                  if (u) {
                    let e = 'y' === f ? 'height' : 'width',
                      t = l.reference[f] - l.floating[e] + m.mainAxis,
                      n = l.reference[f] + l.reference[e] - m.mainAxis;
                    p < t ? (p = t) : p > n && (p = n);
                  }
                  if (c) {
                    var g, w;
                    let e = 'y' === f ? 'width' : 'height',
                      t = ['top', 'left'].includes(U(o)),
                      n =
                        l.reference[d] -
                        l.floating[e] +
                        ((t && (null == (g = i.offset) ? void 0 : g[d])) || 0) +
                        (t ? 0 : m.crossAxis),
                      r =
                        l.reference[d] +
                        l.reference[e] +
                        (t ? 0 : (null == (w = i.offset) ? void 0 : w[d]) || 0) -
                        (t ? m.crossAxis : 0);
                    h < n ? (h = n) : h > r && (h = r);
                  }
                  return { [f]: p, [d]: h };
                },
              }
            );
          })(e),
          options: [e, t],
        }),
        eK = (e, t) => ({
          ...(function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: 'flip',
                options: e,
                async fn(t) {
                  var n, r, o, l, i;
                  let {
                      placement: a,
                      middlewareData: u,
                      rects: c,
                      initialPlacement: s,
                      platform: d,
                      elements: f,
                    } = t,
                    {
                      mainAxis: p = !0,
                      crossAxis: h = !0,
                      fallbackPlacements: v,
                      fallbackStrategy: m = 'bestFit',
                      fallbackAxisSideDirection: g = 'none',
                      flipAlignment: w = !0,
                      ...y
                    } = z(e, t);
                  if (null != (n = u.arrow) && n.alignmentOffset) return {};
                  let b = U(a),
                    x = Y(s),
                    E = U(s) === s,
                    C = await (null == d.isRTL ? void 0 : d.isRTL(f.floating)),
                    S =
                      v ||
                      (E || !w
                        ? [q(s)]
                        : (function (e) {
                            let t = q(e);
                            return [K(e), t, K(t)];
                          })(s)),
                    R = 'none' !== g;
                  !v &&
                    R &&
                    S.push(
                      ...(function (e, t, n, r) {
                        let o = G(e),
                          l = (function (e, t, n) {
                            let r = ['left', 'right'],
                              o = ['right', 'left'];
                            switch (e) {
                              case 'top':
                              case 'bottom':
                                if (n) return t ? o : r;
                                return t ? r : o;
                              case 'left':
                              case 'right':
                                return t ? ['top', 'bottom'] : ['bottom', 'top'];
                              default:
                                return [];
                            }
                          })(U(e), 'start' === n, r);
                        return (
                          o && ((l = l.map(e => e + '-' + o)), t && (l = l.concat(l.map(K)))), l
                        );
                      })(s, w, g, C)
                    );
                  let A = [s, ...S],
                    T = await ee(t, y),
                    N = [],
                    L = (null == (r = u.flip) ? void 0 : r.overflows) || [];
                  if ((p && N.push(T[b]), h)) {
                    let e = (function (e, t, n) {
                      void 0 === n && (n = !1);
                      let r = G(e),
                        o = V(Y(e)),
                        l = X(o),
                        i =
                          'x' === o
                            ? r === (n ? 'end' : 'start')
                              ? 'right'
                              : 'left'
                            : 'start' === r
                              ? 'bottom'
                              : 'top';
                      return t.reference[l] > t.floating[l] && (i = q(i)), [i, q(i)];
                    })(a, c, C);
                    N.push(T[e[0]], T[e[1]]);
                  }
                  if (((L = [...L, { placement: a, overflows: N }]), !N.every(e => e <= 0))) {
                    let e = ((null == (o = u.flip) ? void 0 : o.index) || 0) + 1,
                      t = A[e];
                    if (t) return { data: { index: e, overflows: L }, reset: { placement: t } };
                    let n =
                      null ==
                      (l = L.filter(e => e.overflows[0] <= 0).sort(
                        (e, t) => e.overflows[1] - t.overflows[1]
                      )[0])
                        ? void 0
                        : l.placement;
                    if (!n)
                      switch (m) {
                        case 'bestFit': {
                          let e =
                            null ==
                            (i = L.filter(e => {
                              if (R) {
                                let t = Y(e.placement);
                                return t === x || 'y' === t;
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
                          e && (n = e);
                          break;
                        }
                        case 'initialPlacement':
                          n = s;
                      }
                    if (a !== n) return { reset: { placement: n } };
                  }
                  return {};
                },
              }
            );
          })(e),
          options: [e, t],
        }),
        eq = (e, t) => ({
          ...(function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: 'size',
                options: e,
                async fn(t) {
                  var n, r;
                  let o,
                    l,
                    { placement: i, rects: a, platform: u, elements: c } = t,
                    { apply: s = () => {}, ...d } = z(e, t),
                    f = await ee(t, d),
                    p = U(i),
                    h = G(i),
                    v = 'y' === Y(i),
                    { width: m, height: g } = a.floating;
                  'top' === p || 'bottom' === p
                    ? ((o = p),
                      (l =
                        h ===
                        ((await (null == u.isRTL ? void 0 : u.isRTL(c.floating))) ? 'start' : 'end')
                          ? 'left'
                          : 'right'))
                    : ((l = p), (o = 'end' === h ? 'top' : 'bottom'));
                  let w = g - f.top - f.bottom,
                    y = m - f.left - f.right,
                    b = I(g - f[o], w),
                    x = I(m - f[l], y),
                    E = !t.middlewareData.shift,
                    C = b,
                    S = x;
                  if (
                    (null != (n = t.middlewareData.shift) && n.enabled.x && (S = y),
                    null != (r = t.middlewareData.shift) && r.enabled.y && (C = w),
                    E && !h)
                  ) {
                    let e = O(f.left, 0),
                      t = O(f.right, 0),
                      n = O(f.top, 0),
                      r = O(f.bottom, 0);
                    v
                      ? (S = m - 2 * (0 !== e || 0 !== t ? e + t : O(f.left, f.right)))
                      : (C = g - 2 * (0 !== n || 0 !== r ? n + r : O(f.top, f.bottom)));
                  }
                  await s({ ...t, availableWidth: S, availableHeight: C });
                  let R = await u.getDimensions(c.floating);
                  return m !== R.width || g !== R.height ? { reset: { rects: !0 } } : {};
                },
              }
            );
          })(e),
          options: [e, t],
        }),
        e$ = (e, t) => ({
          ...(function (e) {
            return (
              void 0 === e && (e = {}),
              {
                name: 'hide',
                options: e,
                async fn(t) {
                  let { rects: n } = t,
                    { strategy: r = 'referenceHidden', ...o } = z(e, t);
                  switch (r) {
                    case 'referenceHidden': {
                      let e = et(await ee(t, { ...o, elementContext: 'reference' }), n.reference);
                      return { data: { referenceHiddenOffsets: e, referenceHidden: en(e) } };
                    }
                    case 'escaped': {
                      let e = et(await ee(t, { ...o, altBoundary: !0 }), n.floating);
                      return { data: { escapedOffsets: e, escaped: en(e) } };
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
        eZ = (e, t) => ({ ...eG(e), options: [e, t] });
      var eJ = i.forwardRef((e, t) => {
        let { children: n, width: r = 10, height: o = 5, ...l } = e;
        return (0, m.jsx)(h.sG.svg, {
          ...l,
          ref: t,
          width: r,
          height: o,
          viewBox: '0 0 30 10',
          preserveAspectRatio: 'none',
          children: e.asChild ? n : (0, m.jsx)('polygon', { points: '0,0 30,0 15,10' }),
        });
      });
      eJ.displayName = 'Arrow';
      var eQ = n(2712),
        e0 = n(1275),
        e1 = 'Popper',
        [e2, e5] = (0, f.A)(e1),
        [e6, e8] = e2(e1),
        e3 = e => {
          let { __scopePopper: t, children: n } = e,
            [r, o] = i.useState(null);
          return (0, m.jsx)(e6, { scope: t, anchor: r, onAnchorChange: o, children: n });
        };
      e3.displayName = e1;
      var e4 = 'PopperAnchor',
        e9 = i.forwardRef((e, t) => {
          let { __scopePopper: n, virtualRef: r, ...o } = e,
            l = e8(e4, n),
            a = i.useRef(null),
            u = (0, d.s)(t, a);
          return (
            i.useEffect(() => {
              l.onAnchorChange((null == r ? void 0 : r.current) || a.current);
            }),
            r ? null : (0, m.jsx)(h.sG.div, { ...o, ref: u })
          );
        });
      e9.displayName = e4;
      var e7 = 'PopperContent',
        [te, tt] = e2(e7),
        tn = i.forwardRef((e, t) => {
          var n, r, o, l, u, c, s, f;
          let {
              __scopePopper: p,
              side: g = 'bottom',
              sideOffset: w = 0,
              align: y = 'center',
              alignOffset: b = 0,
              arrowPadding: x = 0,
              avoidCollisions: E = !0,
              collisionBoundary: C = [],
              collisionPadding: S = 0,
              sticky: R = 'partial',
              hideWhenDetached: A = !1,
              updatePositionStrategy: T = 'optimized',
              onPlaced: N,
              ...L
            } = e,
            k = e8(e7, p),
            [P, j] = i.useState(null),
            D = (0, d.s)(t, e => j(e)),
            [M, _] = i.useState(null),
            H = (0, e0.X)(M),
            F = null != (s = null == H ? void 0 : H.width) ? s : 0,
            B = null != (f = null == H ? void 0 : H.height) ? f : 0,
            z = 'number' == typeof S ? S : { top: 0, right: 0, bottom: 0, left: 0, ...S },
            U = Array.isArray(C) ? C : [C],
            G = U.length > 0,
            V = { padding: z, boundary: U.filter(ti), altBoundary: G },
            {
              refs: X,
              floatingStyles: Y,
              placement: K,
              isPositioned: q,
              middlewareData: $,
            } = (function (e) {
              void 0 === e && (e = {});
              let {
                  placement: t = 'bottom',
                  strategy: n = 'absolute',
                  middleware: r = [],
                  platform: o,
                  elements: { reference: l, floating: u } = {},
                  transform: c = !0,
                  whileElementsMounted: s,
                  open: d,
                } = e,
                [f, p] = i.useState({
                  x: 0,
                  y: 0,
                  strategy: n,
                  placement: t,
                  middlewareData: {},
                  isPositioned: !1,
                }),
                [h, v] = i.useState(r);
              eF(h, r) || v(r);
              let [m, g] = i.useState(null),
                [w, y] = i.useState(null),
                b = i.useCallback(e => {
                  e !== S.current && ((S.current = e), g(e));
                }, []),
                x = i.useCallback(e => {
                  e !== R.current && ((R.current = e), y(e));
                }, []),
                E = l || m,
                C = u || w,
                S = i.useRef(null),
                R = i.useRef(null),
                A = i.useRef(f),
                T = null != s,
                N = eU(s),
                L = eU(o),
                k = eU(d),
                P = i.useCallback(() => {
                  if (!S.current || !R.current) return;
                  let e = { placement: t, strategy: n, middleware: h };
                  L.current && (e.platform = L.current),
                    eW(S.current, R.current, e).then(e => {
                      let t = { ...e, isPositioned: !1 !== k.current };
                      j.current &&
                        !eF(A.current, t) &&
                        ((A.current = t),
                        a.flushSync(() => {
                          p(t);
                        }));
                    });
                }, [h, t, n, L, k]);
              eH(() => {
                !1 === d &&
                  A.current.isPositioned &&
                  ((A.current.isPositioned = !1), p(e => ({ ...e, isPositioned: !1 })));
              }, [d]);
              let j = i.useRef(!1);
              eH(
                () => (
                  (j.current = !0),
                  () => {
                    j.current = !1;
                  }
                ),
                []
              ),
                eH(() => {
                  if ((E && (S.current = E), C && (R.current = C), E && C)) {
                    if (N.current) return N.current(E, C, P);
                    P();
                  }
                }, [E, C, P, N, T]);
              let D = i.useMemo(
                  () => ({ reference: S, floating: R, setReference: b, setFloating: x }),
                  [b, x]
                ),
                M = i.useMemo(() => ({ reference: E, floating: C }), [E, C]),
                I = i.useMemo(() => {
                  let e = { position: n, left: 0, top: 0 };
                  if (!M.floating) return e;
                  let t = ez(M.floating, f.x),
                    r = ez(M.floating, f.y);
                  return c
                    ? {
                        ...e,
                        transform: 'translate(' + t + 'px, ' + r + 'px)',
                        ...(eB(M.floating) >= 1.5 && { willChange: 'transform' }),
                      }
                    : { position: n, left: t, top: r };
                }, [n, c, M.floating, f.x, f.y]);
              return i.useMemo(
                () => ({ ...f, update: P, refs: D, elements: M, floatingStyles: I }),
                [f, P, D, M, I]
              );
            })({
              strategy: 'fixed',
              placement: g + ('center' !== y ? '-' + y : ''),
              whileElementsMounted: function () {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return (function (e, t, n, r) {
                  let o;
                  void 0 === r && (r = {});
                  let {
                      ancestorScroll: l = !0,
                      ancestorResize: i = !0,
                      elementResize: a = 'function' == typeof ResizeObserver,
                      layoutShift: u = 'function' == typeof IntersectionObserver,
                      animationFrame: c = !1,
                    } = r,
                    s = eC(e),
                    d = l || i ? [...(s ? eb(s) : []), ...eb(t)] : [];
                  d.forEach(e => {
                    l && e.addEventListener('scroll', n, { passive: !0 }),
                      i && e.addEventListener('resize', n);
                  });
                  let f =
                      s && u
                        ? (function (e, t) {
                            let n,
                              r = null,
                              o = ea(e);
                            function l() {
                              var e;
                              clearTimeout(n), null == (e = r) || e.disconnect(), (r = null);
                            }
                            return (
                              !(function i(a, u) {
                                void 0 === a && (a = !1), void 0 === u && (u = 1), l();
                                let c = e.getBoundingClientRect(),
                                  { left: s, top: d, width: f, height: p } = c;
                                if ((a || t(), !f || !p)) return;
                                let h = W(d),
                                  v = W(o.clientWidth - (s + f)),
                                  m = {
                                    rootMargin:
                                      -h +
                                      'px ' +
                                      -v +
                                      'px ' +
                                      -W(o.clientHeight - (d + p)) +
                                      'px ' +
                                      -W(s) +
                                      'px',
                                    threshold: O(0, I(1, u)) || 1,
                                  },
                                  g = !0;
                                function w(t) {
                                  let r = t[0].intersectionRatio;
                                  if (r !== u) {
                                    if (!g) return i();
                                    r
                                      ? i(!1, r)
                                      : (n = setTimeout(() => {
                                          i(!1, 1e-7);
                                        }, 1e3));
                                  }
                                  1 !== r || eO(c, e.getBoundingClientRect()) || i(), (g = !1);
                                }
                                try {
                                  r = new IntersectionObserver(w, { ...m, root: o.ownerDocument });
                                } catch (e) {
                                  r = new IntersectionObserver(w, m);
                                }
                                r.observe(e);
                              })(!0),
                              l
                            );
                          })(s, n)
                        : null,
                    p = -1,
                    h = null;
                  a &&
                    ((h = new ResizeObserver(e => {
                      let [r] = e;
                      r &&
                        r.target === s &&
                        h &&
                        (h.unobserve(t),
                        cancelAnimationFrame(p),
                        (p = requestAnimationFrame(() => {
                          var e;
                          null == (e = h) || e.observe(t);
                        }))),
                        n();
                    })),
                    s && !c && h.observe(s),
                    h.observe(t));
                  let v = c ? eT(e) : null;
                  return (
                    c &&
                      (function t() {
                        let r = eT(e);
                        v && !eO(v, r) && n(), (v = r), (o = requestAnimationFrame(t));
                      })(),
                    n(),
                    () => {
                      var e;
                      d.forEach(e => {
                        l && e.removeEventListener('scroll', n),
                          i && e.removeEventListener('resize', n);
                      }),
                        null == f || f(),
                        null == (e = h) || e.disconnect(),
                        (h = null),
                        c && cancelAnimationFrame(o);
                    }
                  );
                })(...t, { animationFrame: 'always' === T });
              },
              elements: { reference: k.anchor },
              middleware: [
                eV({ mainAxis: w + B, alignmentAxis: b }),
                E &&
                  eX({
                    mainAxis: !0,
                    crossAxis: !1,
                    limiter: 'partial' === R ? eY() : void 0,
                    ...V,
                  }),
                E && eK({ ...V }),
                eq({
                  ...V,
                  apply: e => {
                    let { elements: t, rects: n, availableWidth: r, availableHeight: o } = e,
                      { width: l, height: i } = n.reference,
                      a = t.floating.style;
                    a.setProperty('--radix-popper-available-width', ''.concat(r, 'px')),
                      a.setProperty('--radix-popper-available-height', ''.concat(o, 'px')),
                      a.setProperty('--radix-popper-anchor-width', ''.concat(l, 'px')),
                      a.setProperty('--radix-popper-anchor-height', ''.concat(i, 'px'));
                  },
                }),
                M && eZ({ element: M, padding: x }),
                ta({ arrowWidth: F, arrowHeight: B }),
                A && e$({ strategy: 'referenceHidden', ...V }),
              ],
            }),
            [Z, J] = tu(K),
            Q = (0, v.c)(N);
          (0, eQ.N)(() => {
            q && (null == Q || Q());
          }, [q, Q]);
          let ee = null == (n = $.arrow) ? void 0 : n.x,
            et = null == (r = $.arrow) ? void 0 : r.y,
            en = (null == (o = $.arrow) ? void 0 : o.centerOffset) !== 0,
            [er, eo] = i.useState();
          return (
            (0, eQ.N)(() => {
              P && eo(window.getComputedStyle(P).zIndex);
            }, [P]),
            (0, m.jsx)('div', {
              ref: X.setFloating,
              'data-radix-popper-content-wrapper': '',
              style: {
                ...Y,
                transform: q ? Y.transform : 'translate(0, -200%)',
                minWidth: 'max-content',
                zIndex: er,
                '--radix-popper-transform-origin': [
                  null == (l = $.transformOrigin) ? void 0 : l.x,
                  null == (u = $.transformOrigin) ? void 0 : u.y,
                ].join(' '),
                ...((null == (c = $.hide) ? void 0 : c.referenceHidden) && {
                  visibility: 'hidden',
                  pointerEvents: 'none',
                }),
              },
              dir: e.dir,
              children: (0, m.jsx)(te, {
                scope: p,
                placedSide: Z,
                onArrowChange: _,
                arrowX: ee,
                arrowY: et,
                shouldHideArrow: en,
                children: (0, m.jsx)(h.sG.div, {
                  'data-side': Z,
                  'data-align': J,
                  ...L,
                  ref: D,
                  style: { ...L.style, animation: q ? void 0 : 'none' },
                }),
              }),
            })
          );
        });
      tn.displayName = e7;
      var tr = 'PopperArrow',
        to = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
        tl = i.forwardRef(function (e, t) {
          let { __scopePopper: n, ...r } = e,
            o = tt(tr, n),
            l = to[o.placedSide];
          return (0, m.jsx)('span', {
            ref: o.onArrowChange,
            style: {
              position: 'absolute',
              left: o.arrowX,
              top: o.arrowY,
              [l]: 0,
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
            children: (0, m.jsx)(eJ, { ...r, ref: t, style: { ...r.style, display: 'block' } }),
          });
        });
      function ti(e) {
        return null !== e;
      }
      tl.displayName = tr;
      var ta = e => ({
        name: 'transformOrigin',
        options: e,
        fn(t) {
          var n, r, o, l, i;
          let { placement: a, rects: u, middlewareData: c } = t,
            s = (null == (n = c.arrow) ? void 0 : n.centerOffset) !== 0,
            d = s ? 0 : e.arrowWidth,
            f = s ? 0 : e.arrowHeight,
            [p, h] = tu(a),
            v = { start: '0%', center: '50%', end: '100%' }[h],
            m = (null != (l = null == (r = c.arrow) ? void 0 : r.x) ? l : 0) + d / 2,
            g = (null != (i = null == (o = c.arrow) ? void 0 : o.y) ? i : 0) + f / 2,
            w = '',
            y = '';
          return (
            'bottom' === p
              ? ((w = s ? v : ''.concat(m, 'px')), (y = ''.concat(-f, 'px')))
              : 'top' === p
                ? ((w = s ? v : ''.concat(m, 'px')), (y = ''.concat(u.floating.height + f, 'px')))
                : 'right' === p
                  ? ((w = ''.concat(-f, 'px')), (y = s ? v : ''.concat(g, 'px')))
                  : 'left' === p &&
                    ((w = ''.concat(u.floating.width + f, 'px')), (y = s ? v : ''.concat(g, 'px'))),
            { data: { x: w, y } }
          );
        },
      });
      function tu(e) {
        let [t, n = 'center'] = e.split('-');
        return [t, n];
      }
      var tc = i.forwardRef((e, t) => {
        var n, r;
        let { container: o, ...l } = e,
          [u, c] = i.useState(!1);
        (0, eQ.N)(() => c(!0), []);
        let s =
          o || (u && (null == (r = globalThis) || null == (n = r.document) ? void 0 : n.body));
        return s ? a.createPortal((0, m.jsx)(h.sG.div, { ...l, ref: t }), s) : null;
      });
      tc.displayName = 'Portal';
      var ts = n(9708),
        td = n(5845),
        tf = n(5503),
        tp = Object.freeze({
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
      i.forwardRef((e, t) =>
        (0, m.jsx)(h.sG.span, { ...e, ref: t, style: { ...tp, ...e.style } })
      ).displayName = 'VisuallyHidden';
      var th = function (e) {
          return 'undefined' == typeof document
            ? null
            : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
        },
        tv = new WeakMap(),
        tm = new WeakMap(),
        tg = {},
        tw = 0,
        ty = function (e) {
          return e && (e.host || ty(e.parentNode));
        },
        tb = function (e, t, n, r) {
          var o = (Array.isArray(e) ? e : [e])
            .map(function (e) {
              if (t.contains(e)) return e;
              var n = ty(e);
              return n && t.contains(n)
                ? n
                : (console.error('aria-hidden', e, 'in not contained inside', t, '. Doing nothing'),
                  null);
            })
            .filter(function (e) {
              return !!e;
            });
          tg[n] || (tg[n] = new WeakMap());
          var l = tg[n],
            i = [],
            a = new Set(),
            u = new Set(o),
            c = function (e) {
              !e || a.has(e) || (a.add(e), c(e.parentNode));
            };
          o.forEach(c);
          var s = function (e) {
            !e ||
              u.has(e) ||
              Array.prototype.forEach.call(e.children, function (e) {
                if (a.has(e)) s(e);
                else
                  try {
                    var t = e.getAttribute(r),
                      o = null !== t && 'false' !== t,
                      u = (tv.get(e) || 0) + 1,
                      c = (l.get(e) || 0) + 1;
                    tv.set(e, u),
                      l.set(e, c),
                      i.push(e),
                      1 === u && o && tm.set(e, !0),
                      1 === c && e.setAttribute(n, 'true'),
                      o || e.setAttribute(r, 'true');
                  } catch (t) {
                    console.error('aria-hidden: cannot operate on ', e, t);
                  }
              });
          };
          return (
            s(t),
            a.clear(),
            tw++,
            function () {
              i.forEach(function (e) {
                var t = tv.get(e) - 1,
                  o = l.get(e) - 1;
                tv.set(e, t),
                  l.set(e, o),
                  t || (tm.has(e) || e.removeAttribute(r), tm.delete(e)),
                  o || e.removeAttribute(n);
              }),
                --tw ||
                  ((tv = new WeakMap()), (tv = new WeakMap()), (tm = new WeakMap()), (tg = {}));
            }
          );
        },
        tx = function (e, t, n) {
          void 0 === n && (n = 'data-aria-hidden');
          var r = Array.from(Array.isArray(e) ? e : [e]),
            o = t || th(e);
          return o
            ? (r.push.apply(r, Array.from(o.querySelectorAll('[aria-live]'))),
              tb(r, o, n, 'aria-hidden'))
            : function () {
                return null;
              };
        },
        tE = n(9249),
        tC = 'right-scroll-bar-position',
        tS = 'width-before-scroll-bar';
      function tR(e, t) {
        return 'function' == typeof e ? e(t) : e && (e.current = t), e;
      }
      var tA = 'undefined' != typeof window ? i.useLayoutEffect : i.useEffect,
        tT = new WeakMap();
      function tN(e) {
        return e;
      }
      var tL = (function (e) {
          void 0 === e && (e = {});
          var t,
            n,
            r,
            o,
            l =
              ((t = null),
              void 0 === n && (n = tN),
              (r = []),
              (o = !1),
              {
                read: function () {
                  if (o)
                    throw Error(
                      'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
                    );
                  return r.length ? r[r.length - 1] : null;
                },
                useMedium: function (e) {
                  var t = n(e, o);
                  return (
                    r.push(t),
                    function () {
                      r = r.filter(function (e) {
                        return e !== t;
                      });
                    }
                  );
                },
                assignSyncMedium: function (e) {
                  for (o = !0; r.length; ) {
                    var t = r;
                    (r = []), t.forEach(e);
                  }
                  r = {
                    push: function (t) {
                      return e(t);
                    },
                    filter: function () {
                      return r;
                    },
                  };
                },
                assignMedium: function (e) {
                  o = !0;
                  var t = [];
                  if (r.length) {
                    var n = r;
                    (r = []), n.forEach(e), (t = r);
                  }
                  var l = function () {
                      var n = t;
                      (t = []), n.forEach(e);
                    },
                    i = function () {
                      return Promise.resolve().then(l);
                    };
                  i(),
                    (r = {
                      push: function (e) {
                        t.push(e), i();
                      },
                      filter: function (e) {
                        return (t = t.filter(e)), r;
                      },
                    });
                },
              });
          return (l.options = (0, tE.Cl)({ async: !0, ssr: !1 }, e)), l;
        })(),
        tk = function () {},
        tP = i.forwardRef(function (e, t) {
          var n,
            r,
            o,
            l,
            a = i.useRef(null),
            u = i.useState({ onScrollCapture: tk, onWheelCapture: tk, onTouchMoveCapture: tk }),
            c = u[0],
            s = u[1],
            d = e.forwardProps,
            f = e.children,
            p = e.className,
            h = e.removeScrollBar,
            v = e.enabled,
            m = e.shards,
            g = e.sideCar,
            w = e.noIsolation,
            y = e.inert,
            b = e.allowPinchZoom,
            x = e.as,
            E = e.gapMode,
            C = (0, tE.Tt)(e, [
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
            S =
              ((n = [a, t]),
              (r = function (e) {
                return n.forEach(function (t) {
                  return tR(t, e);
                });
              }),
              ((o = (0, i.useState)(function () {
                return {
                  value: null,
                  callback: r,
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
              })[0]).callback = r),
              (l = o.facade),
              tA(
                function () {
                  var e = tT.get(l);
                  if (e) {
                    var t = new Set(e),
                      r = new Set(n),
                      o = l.current;
                    t.forEach(function (e) {
                      r.has(e) || tR(e, null);
                    }),
                      r.forEach(function (e) {
                        t.has(e) || tR(e, o);
                      });
                  }
                  tT.set(l, n);
                },
                [n]
              ),
              l),
            R = (0, tE.Cl)((0, tE.Cl)({}, C), c);
          return i.createElement(
            i.Fragment,
            null,
            v &&
              i.createElement(g, {
                sideCar: tL,
                removeScrollBar: h,
                shards: m,
                noIsolation: w,
                inert: y,
                setCallbacks: s,
                allowPinchZoom: !!b,
                lockRef: a,
                gapMode: E,
              }),
            d
              ? i.cloneElement(i.Children.only(f), (0, tE.Cl)((0, tE.Cl)({}, R), { ref: S }))
              : i.createElement(
                  void 0 === x ? 'div' : x,
                  (0, tE.Cl)({}, R, { className: p, ref: S }),
                  f
                )
          );
        });
      (tP.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
        (tP.classNames = { fullWidth: tS, zeroRight: tC });
      var tj = function (e) {
        var t = e.sideCar,
          n = (0, tE.Tt)(e, ['sideCar']);
        if (!t) throw Error('Sidecar: please provide `sideCar` property to import the right car');
        var r = t.read();
        if (!r) throw Error('Sidecar medium not found');
        return i.createElement(r, (0, tE.Cl)({}, n));
      };
      tj.isSideCarExport = !0;
      var tD = function () {
          var e = 0,
            t = null;
          return {
            add: function (r) {
              if (
                0 == e &&
                (t = (function () {
                  if (!document) return null;
                  var e = document.createElement('style');
                  e.type = 'text/css';
                  var t = l || n.nc;
                  return t && e.setAttribute('nonce', t), e;
                })())
              ) {
                var o, i;
                (o = t).styleSheet
                  ? (o.styleSheet.cssText = r)
                  : o.appendChild(document.createTextNode(r)),
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
        tM = function () {
          var e = tD();
          return function (t, n) {
            i.useEffect(
              function () {
                return (
                  e.add(t),
                  function () {
                    e.remove();
                  }
                );
              },
              [t && n]
            );
          };
        },
        tI = function () {
          var e = tM();
          return function (t) {
            return e(t.styles, t.dynamic), null;
          };
        },
        tO = { left: 0, top: 0, right: 0, gap: 0 },
        t_ = function (e) {
          return parseInt(e || '', 10) || 0;
        },
        tW = function (e) {
          var t = window.getComputedStyle(document.body),
            n = t['padding' === e ? 'paddingLeft' : 'marginLeft'],
            r = t['padding' === e ? 'paddingTop' : 'marginTop'],
            o = t['padding' === e ? 'paddingRight' : 'marginRight'];
          return [t_(n), t_(r), t_(o)];
        },
        tH = function (e) {
          if ((void 0 === e && (e = 'margin'), 'undefined' == typeof window)) return tO;
          var t = tW(e),
            n = document.documentElement.clientWidth,
            r = window.innerWidth;
          return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
        },
        tF = tI(),
        tB = 'data-scroll-locked',
        tz = function (e, t, n, r) {
          var o = e.left,
            l = e.top,
            i = e.right,
            a = e.gap;
          return (
            void 0 === n && (n = 'margin'),
            '\n  .'
              .concat('with-scroll-bars-hidden', ' {\n   overflow: hidden ')
              .concat(r, ';\n   padding-right: ')
              .concat(a, 'px ')
              .concat(r, ';\n  }\n  body[')
              .concat(tB, '] {\n    overflow: hidden ')
              .concat(r, ';\n    overscroll-behavior: contain;\n    ')
              .concat(
                [
                  t && 'position: relative '.concat(r, ';'),
                  'margin' === n &&
                    '\n    padding-left: '
                      .concat(o, 'px;\n    padding-top: ')
                      .concat(l, 'px;\n    padding-right: ')
                      .concat(i, 'px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ')
                      .concat(a, 'px ')
                      .concat(r, ';\n    '),
                  'padding' === n && 'padding-right: '.concat(a, 'px ').concat(r, ';'),
                ]
                  .filter(Boolean)
                  .join(''),
                '\n  }\n  \n  .'
              )
              .concat(tC, ' {\n    right: ')
              .concat(a, 'px ')
              .concat(r, ';\n  }\n  \n  .')
              .concat(tS, ' {\n    margin-right: ')
              .concat(a, 'px ')
              .concat(r, ';\n  }\n  \n  .')
              .concat(tC, ' .')
              .concat(tC, ' {\n    right: 0 ')
              .concat(r, ';\n  }\n  \n  .')
              .concat(tS, ' .')
              .concat(tS, ' {\n    margin-right: 0 ')
              .concat(r, ';\n  }\n  \n  body[')
              .concat(tB, '] {\n    ')
              .concat('--removed-body-scroll-bar-size', ': ')
              .concat(a, 'px;\n  }\n')
          );
        },
        tU = function () {
          var e = parseInt(document.body.getAttribute(tB) || '0', 10);
          return isFinite(e) ? e : 0;
        },
        tG = function () {
          i.useEffect(function () {
            return (
              document.body.setAttribute(tB, (tU() + 1).toString()),
              function () {
                var e = tU() - 1;
                e <= 0
                  ? document.body.removeAttribute(tB)
                  : document.body.setAttribute(tB, e.toString());
              }
            );
          }, []);
        },
        tV = function (e) {
          var t = e.noRelative,
            n = e.noImportant,
            r = e.gapMode,
            o = void 0 === r ? 'margin' : r;
          tG();
          var l = i.useMemo(
            function () {
              return tH(o);
            },
            [o]
          );
          return i.createElement(tF, { styles: tz(l, !t, o, n ? '' : '!important') });
        },
        tX = !1;
      if ('undefined' != typeof window)
        try {
          var tY = Object.defineProperty({}, 'passive', {
            get: function () {
              return (tX = !0), !0;
            },
          });
          window.addEventListener('test', tY, tY), window.removeEventListener('test', tY, tY);
        } catch (e) {
          tX = !1;
        }
      var tK = !!tX && { passive: !1 },
        tq = function (e, t) {
          if (!(e instanceof Element)) return !1;
          var n = window.getComputedStyle(e);
          return (
            'hidden' !== n[t] &&
            (n.overflowY !== n.overflowX || 'TEXTAREA' === e.tagName || 'visible' !== n[t])
          );
        },
        t$ = function (e, t) {
          var n = t.ownerDocument,
            r = t;
          do {
            if (
              ('undefined' != typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host),
              tZ(e, r))
            ) {
              var o = tJ(e, r);
              if (o[1] > o[2]) return !0;
            }
            r = r.parentNode;
          } while (r && r !== n.body);
          return !1;
        },
        tZ = function (e, t) {
          return 'v' === e ? tq(t, 'overflowY') : tq(t, 'overflowX');
        },
        tJ = function (e, t) {
          return 'v' === e
            ? [t.scrollTop, t.scrollHeight, t.clientHeight]
            : [t.scrollLeft, t.scrollWidth, t.clientWidth];
        },
        tQ = function (e, t, n, r, o) {
          var l,
            i = ((l = window.getComputedStyle(t).direction), 'h' === e && 'rtl' === l ? -1 : 1),
            a = i * r,
            u = n.target,
            c = t.contains(u),
            s = !1,
            d = a > 0,
            f = 0,
            p = 0;
          do {
            var h = tJ(e, u),
              v = h[0],
              m = h[1] - h[2] - i * v;
            (v || m) && tZ(e, u) && ((f += m), (p += v)),
              (u = u instanceof ShadowRoot ? u.host : u.parentNode);
          } while ((!c && u !== document.body) || (c && (t.contains(u) || t === u)));
          return (
            d && ((o && 1 > Math.abs(f)) || (!o && a > f))
              ? (s = !0)
              : !d && ((o && 1 > Math.abs(p)) || (!o && -a > p)) && (s = !0),
            s
          );
        },
        t0 = function (e) {
          return 'changedTouches' in e
            ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
            : [0, 0];
        },
        t1 = function (e) {
          return [e.deltaX, e.deltaY];
        },
        t2 = function (e) {
          return e && 'current' in e ? e.current : e;
        },
        t5 = 0,
        t6 = [];
      let t8 =
        ((r = function (e) {
          var t = i.useRef([]),
            n = i.useRef([0, 0]),
            r = i.useRef(),
            o = i.useState(t5++)[0],
            l = i.useState(tI)[0],
            a = i.useRef(e);
          i.useEffect(
            function () {
              a.current = e;
            },
            [e]
          ),
            i.useEffect(
              function () {
                if (e.inert) {
                  document.body.classList.add('block-interactivity-'.concat(o));
                  var t = (0, tE.fX)([e.lockRef.current], (e.shards || []).map(t2), !0).filter(
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
          var u = i.useCallback(function (e, t) {
              if (('touches' in e && 2 === e.touches.length) || ('wheel' === e.type && e.ctrlKey))
                return !a.current.allowPinchZoom;
              var o,
                l = t0(e),
                i = n.current,
                u = 'deltaX' in e ? e.deltaX : i[0] - l[0],
                c = 'deltaY' in e ? e.deltaY : i[1] - l[1],
                s = e.target,
                d = Math.abs(u) > Math.abs(c) ? 'h' : 'v';
              if ('touches' in e && 'h' === d && 'range' === s.type) return !1;
              var f = t$(d, s);
              if (!f) return !0;
              if ((f ? (o = d) : ((o = 'v' === d ? 'h' : 'v'), (f = t$(d, s))), !f)) return !1;
              if ((!r.current && 'changedTouches' in e && (u || c) && (r.current = o), !o))
                return !0;
              var p = r.current || o;
              return tQ(p, t, e, 'h' === p ? u : c, !0);
            }, []),
            c = i.useCallback(function (e) {
              if (t6.length && t6[t6.length - 1] === l) {
                var n = 'deltaY' in e ? t1(e) : t0(e),
                  r = t.current.filter(function (t) {
                    var r;
                    return (
                      t.name === e.type &&
                      (t.target === e.target || e.target === t.shadowParent) &&
                      ((r = t.delta), r[0] === n[0] && r[1] === n[1])
                    );
                  })[0];
                if (r && r.should) {
                  e.cancelable && e.preventDefault();
                  return;
                }
                if (!r) {
                  var o = (a.current.shards || [])
                    .map(t2)
                    .filter(Boolean)
                    .filter(function (t) {
                      return t.contains(e.target);
                    });
                  (o.length > 0 ? u(e, o[0]) : !a.current.noIsolation) &&
                    e.cancelable &&
                    e.preventDefault();
                }
              }
            }, []),
            s = i.useCallback(function (e, n, r, o) {
              var l = {
                name: e,
                delta: n,
                target: r,
                should: o,
                shadowParent: (function (e) {
                  for (var t = null; null !== e; )
                    e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
                  return t;
                })(r),
              };
              t.current.push(l),
                setTimeout(function () {
                  t.current = t.current.filter(function (e) {
                    return e !== l;
                  });
                }, 1);
            }, []),
            d = i.useCallback(function (e) {
              (n.current = t0(e)), (r.current = void 0);
            }, []),
            f = i.useCallback(function (t) {
              s(t.type, t1(t), t.target, u(t, e.lockRef.current));
            }, []),
            p = i.useCallback(function (t) {
              s(t.type, t0(t), t.target, u(t, e.lockRef.current));
            }, []);
          i.useEffect(function () {
            return (
              t6.push(l),
              e.setCallbacks({ onScrollCapture: f, onWheelCapture: f, onTouchMoveCapture: p }),
              document.addEventListener('wheel', c, tK),
              document.addEventListener('touchmove', c, tK),
              document.addEventListener('touchstart', d, tK),
              function () {
                (t6 = t6.filter(function (e) {
                  return e !== l;
                })),
                  document.removeEventListener('wheel', c, tK),
                  document.removeEventListener('touchmove', c, tK),
                  document.removeEventListener('touchstart', d, tK);
              }
            );
          }, []);
          var h = e.removeScrollBar,
            v = e.inert;
          return i.createElement(
            i.Fragment,
            null,
            v
              ? i.createElement(l, {
                  styles: '\n  .block-interactivity-'
                    .concat(o, ' {pointer-events: none;}\n  .allow-interactivity-')
                    .concat(o, ' {pointer-events: all;}\n'),
                })
              : null,
            h ? i.createElement(tV, { gapMode: e.gapMode }) : null
          );
        }),
        tL.useMedium(r),
        tj);
      var t3 = i.forwardRef(function (e, t) {
        return i.createElement(tP, (0, tE.Cl)({}, e, { ref: t, sideCar: t8 }));
      });
      t3.classNames = tP.classNames;
      var t4 = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
        t9 = [' ', 'Enter'],
        t7 = 'Select',
        [ne, nt, nn] = (0, s.N)(t7),
        [nr, no] = (0, f.A)(t7, [nn, e5]),
        nl = e5(),
        [ni, na] = nr(t7),
        [nu, nc] = nr(t7),
        ns = e => {
          let {
              __scopeSelect: t,
              children: n,
              open: r,
              defaultOpen: o,
              onOpenChange: l,
              value: a,
              defaultValue: u,
              onValueChange: c,
              dir: s,
              name: d,
              autoComplete: f,
              disabled: h,
              required: v,
              form: g,
            } = e,
            w = nl(t),
            [y, b] = i.useState(null),
            [x, E] = i.useState(null),
            [C, S] = i.useState(!1),
            R = (0, p.jH)(s),
            [A, T] = (0, td.i)({ prop: r, defaultProp: null != o && o, onChange: l, caller: t7 }),
            [N, L] = (0, td.i)({ prop: a, defaultProp: u, onChange: c, caller: t7 }),
            k = i.useRef(null),
            P = !y || g || !!y.closest('form'),
            [j, M] = i.useState(new Set()),
            I = Array.from(j)
              .map(e => e.props.value)
              .join(';');
          return (0, m.jsx)(e3, {
            ...w,
            children: (0, m.jsxs)(ni, {
              required: v,
              scope: t,
              trigger: y,
              onTriggerChange: b,
              valueNode: x,
              onValueNodeChange: E,
              valueNodeHasChildren: C,
              onValueNodeHasChildrenChange: S,
              contentId: (0, D.B)(),
              value: N,
              onValueChange: L,
              open: A,
              onOpenChange: T,
              dir: R,
              triggerPointerDownPosRef: k,
              disabled: h,
              children: [
                (0, m.jsx)(ne.Provider, {
                  scope: t,
                  children: (0, m.jsx)(nu, {
                    scope: e.__scopeSelect,
                    onNativeOptionAdd: i.useCallback(e => {
                      M(t => new Set(t).add(e));
                    }, []),
                    onNativeOptionRemove: i.useCallback(e => {
                      M(t => {
                        let n = new Set(t);
                        return n.delete(e), n;
                      });
                    }, []),
                    children: n,
                  }),
                }),
                P
                  ? (0, m.jsxs)(
                      n$,
                      {
                        'aria-hidden': !0,
                        required: v,
                        tabIndex: -1,
                        name: d,
                        autoComplete: f,
                        value: N,
                        onChange: e => L(e.target.value),
                        disabled: h,
                        form: g,
                        children: [
                          void 0 === N ? (0, m.jsx)('option', { value: '' }) : null,
                          Array.from(j),
                        ],
                      },
                      I
                    )
                  : null,
              ],
            }),
          });
        };
      ns.displayName = t7;
      var nd = 'SelectTrigger',
        nf = i.forwardRef((e, t) => {
          let { __scopeSelect: n, disabled: r = !1, ...o } = e,
            l = nl(n),
            a = na(nd, n),
            u = a.disabled || r,
            s = (0, d.s)(t, a.onTriggerChange),
            f = nt(n),
            p = i.useRef('touch'),
            [v, g, w] = nJ(e => {
              let t = f().filter(e => !e.disabled),
                n = t.find(e => e.value === a.value),
                r = nQ(t, e, n);
              void 0 !== r && a.onValueChange(r.value);
            }),
            y = e => {
              u || (a.onOpenChange(!0), w()),
                e &&
                  (a.triggerPointerDownPosRef.current = {
                    x: Math.round(e.pageX),
                    y: Math.round(e.pageY),
                  });
            };
          return (0, m.jsx)(e9, {
            asChild: !0,
            ...l,
            children: (0, m.jsx)(h.sG.button, {
              type: 'button',
              role: 'combobox',
              'aria-controls': a.contentId,
              'aria-expanded': a.open,
              'aria-required': a.required,
              'aria-autocomplete': 'none',
              dir: a.dir,
              'data-state': a.open ? 'open' : 'closed',
              disabled: u,
              'data-disabled': u ? '' : void 0,
              'data-placeholder': nZ(a.value) ? '' : void 0,
              ...o,
              ref: s,
              onClick: (0, c.m)(o.onClick, e => {
                e.currentTarget.focus(), 'mouse' !== p.current && y(e);
              }),
              onPointerDown: (0, c.m)(o.onPointerDown, e => {
                p.current = e.pointerType;
                let t = e.target;
                t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
                  0 === e.button &&
                    !1 === e.ctrlKey &&
                    'mouse' === e.pointerType &&
                    (y(e), e.preventDefault());
              }),
              onKeyDown: (0, c.m)(o.onKeyDown, e => {
                let t = '' !== v.current;
                e.ctrlKey || e.altKey || e.metaKey || 1 !== e.key.length || g(e.key),
                  (!t || ' ' !== e.key) && t4.includes(e.key) && (y(), e.preventDefault());
              }),
            }),
          });
        });
      nf.displayName = nd;
      var np = 'SelectValue',
        nh = i.forwardRef((e, t) => {
          let {
              __scopeSelect: n,
              className: r,
              style: o,
              children: l,
              placeholder: i = '',
              ...a
            } = e,
            u = na(np, n),
            { onValueNodeHasChildrenChange: c } = u,
            s = void 0 !== l,
            f = (0, d.s)(t, u.onValueNodeChange);
          return (
            (0, eQ.N)(() => {
              c(s);
            }, [c, s]),
            (0, m.jsx)(h.sG.span, {
              ...a,
              ref: f,
              style: { pointerEvents: 'none' },
              children: nZ(u.value) ? (0, m.jsx)(m.Fragment, { children: i }) : l,
            })
          );
        });
      nh.displayName = np;
      var nv = i.forwardRef((e, t) => {
        let { __scopeSelect: n, children: r, ...o } = e;
        return (0, m.jsx)(h.sG.span, { 'aria-hidden': !0, ...o, ref: t, children: r || '▼' });
      });
      nv.displayName = 'SelectIcon';
      var nm = e => (0, m.jsx)(tc, { asChild: !0, ...e });
      nm.displayName = 'SelectPortal';
      var ng = 'SelectContent',
        nw = i.forwardRef((e, t) => {
          let n = na(ng, e.__scopeSelect),
            [r, o] = i.useState();
          return ((0, eQ.N)(() => {
            o(new DocumentFragment());
          }, []),
          n.open)
            ? (0, m.jsx)(nE, { ...e, ref: t })
            : r
              ? a.createPortal(
                  (0, m.jsx)(ny, {
                    scope: e.__scopeSelect,
                    children: (0, m.jsx)(ne.Slot, {
                      scope: e.__scopeSelect,
                      children: (0, m.jsx)('div', { children: e.children }),
                    }),
                  }),
                  r
                )
              : null;
        });
      nw.displayName = ng;
      var [ny, nb] = nr(ng),
        nx = (0, ts.TL)('SelectContent.RemoveScroll'),
        nE = i.forwardRef((e, t) => {
          let {
              __scopeSelect: n,
              position: r = 'item-aligned',
              onCloseAutoFocus: o,
              onEscapeKeyDown: l,
              onPointerDownOutside: a,
              side: u,
              sideOffset: s,
              align: f,
              alignOffset: p,
              arrowPadding: h,
              collisionBoundary: v,
              collisionPadding: g,
              sticky: w,
              hideWhenDetached: b,
              avoidCollisions: x,
              ...S
            } = e,
            R = na(ng, n),
            [A, N] = i.useState(null),
            [L, k] = i.useState(null),
            P = (0, d.s)(t, e => N(e)),
            [j, D] = i.useState(null),
            [M, I] = i.useState(null),
            O = nt(n),
            [_, W] = i.useState(!1),
            H = i.useRef(!1);
          i.useEffect(() => {
            if (A) return tx(A);
          }, [A]),
            i.useEffect(() => {
              var e, t;
              let n = document.querySelectorAll('[data-radix-focus-guard]');
              return (
                document.body.insertAdjacentElement('afterbegin', null != (e = n[0]) ? e : C()),
                document.body.insertAdjacentElement('beforeend', null != (t = n[1]) ? t : C()),
                E++,
                () => {
                  1 === E &&
                    document.querySelectorAll('[data-radix-focus-guard]').forEach(e => e.remove()),
                    E--;
                }
              );
            }, []);
          let F = i.useCallback(
              e => {
                let [t, ...n] = O().map(e => e.ref.current),
                  [r] = n.slice(-1),
                  o = document.activeElement;
                for (let n of e)
                  if (
                    n === o ||
                    (null == n || n.scrollIntoView({ block: 'nearest' }),
                    n === t && L && (L.scrollTop = 0),
                    n === r && L && (L.scrollTop = L.scrollHeight),
                    null == n || n.focus(),
                    document.activeElement !== o)
                  )
                    return;
              },
              [O, L]
            ),
            B = i.useCallback(() => F([j, A]), [F, j, A]);
          i.useEffect(() => {
            _ && B();
          }, [_, B]);
          let { onOpenChange: z, triggerPointerDownPosRef: U } = R;
          i.useEffect(() => {
            if (A) {
              let e = { x: 0, y: 0 },
                t = t => {
                  var n, r, o, l;
                  e = {
                    x: Math.abs(
                      Math.round(t.pageX) -
                        (null != (o = null == (n = U.current) ? void 0 : n.x) ? o : 0)
                    ),
                    y: Math.abs(
                      Math.round(t.pageY) -
                        (null != (l = null == (r = U.current) ? void 0 : r.y) ? l : 0)
                    ),
                  };
                },
                n = n => {
                  e.x <= 10 && e.y <= 10 ? n.preventDefault() : A.contains(n.target) || z(!1),
                    document.removeEventListener('pointermove', t),
                    (U.current = null);
                };
              return (
                null !== U.current &&
                  (document.addEventListener('pointermove', t),
                  document.addEventListener('pointerup', n, { capture: !0, once: !0 })),
                () => {
                  document.removeEventListener('pointermove', t),
                    document.removeEventListener('pointerup', n, { capture: !0 });
                }
              );
            }
          }, [A, z, U]),
            i.useEffect(() => {
              let e = () => z(!1);
              return (
                window.addEventListener('blur', e),
                window.addEventListener('resize', e),
                () => {
                  window.removeEventListener('blur', e), window.removeEventListener('resize', e);
                }
              );
            }, [z]);
          let [G, V] = nJ(e => {
              let t = O().filter(e => !e.disabled),
                n = t.find(e => e.ref.current === document.activeElement),
                r = nQ(t, e, n);
              r && setTimeout(() => r.ref.current.focus());
            }),
            X = i.useCallback(
              (e, t, n) => {
                let r = !H.current && !n;
                ((void 0 !== R.value && R.value === t) || r) && (D(e), r && (H.current = !0));
              },
              [R.value]
            ),
            Y = i.useCallback(() => (null == A ? void 0 : A.focus()), [A]),
            K = i.useCallback(
              (e, t, n) => {
                let r = !H.current && !n;
                ((void 0 !== R.value && R.value === t) || r) && I(e);
              },
              [R.value]
            ),
            q = 'popper' === r ? nS : nC,
            $ =
              q === nS
                ? {
                    side: u,
                    sideOffset: s,
                    align: f,
                    alignOffset: p,
                    arrowPadding: h,
                    collisionBoundary: v,
                    collisionPadding: g,
                    sticky: w,
                    hideWhenDetached: b,
                    avoidCollisions: x,
                  }
                : {};
          return (0, m.jsx)(ny, {
            scope: n,
            content: A,
            viewport: L,
            onViewportChange: k,
            itemRefCallback: X,
            selectedItem: j,
            onItemLeave: Y,
            itemTextRefCallback: K,
            focusSelectedItem: B,
            selectedItemText: M,
            position: r,
            isPositioned: _,
            searchRef: G,
            children: (0, m.jsx)(t3, {
              as: nx,
              allowPinchZoom: !0,
              children: (0, m.jsx)(T, {
                asChild: !0,
                trapped: R.open,
                onMountAutoFocus: e => {
                  e.preventDefault();
                },
                onUnmountAutoFocus: (0, c.m)(o, e => {
                  var t;
                  null == (t = R.trigger) || t.focus({ preventScroll: !0 }), e.preventDefault();
                }),
                children: (0, m.jsx)(y, {
                  asChild: !0,
                  disableOutsidePointerEvents: !0,
                  onEscapeKeyDown: l,
                  onPointerDownOutside: a,
                  onFocusOutside: e => e.preventDefault(),
                  onDismiss: () => R.onOpenChange(!1),
                  children: (0, m.jsx)(q, {
                    role: 'listbox',
                    id: R.contentId,
                    'data-state': R.open ? 'open' : 'closed',
                    dir: R.dir,
                    onContextMenu: e => e.preventDefault(),
                    ...S,
                    ...$,
                    onPlaced: () => W(!0),
                    ref: P,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      outline: 'none',
                      ...S.style,
                    },
                    onKeyDown: (0, c.m)(S.onKeyDown, e => {
                      let t = e.ctrlKey || e.altKey || e.metaKey;
                      if (
                        ('Tab' === e.key && e.preventDefault(),
                        t || 1 !== e.key.length || V(e.key),
                        ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key))
                      ) {
                        let t = O()
                          .filter(e => !e.disabled)
                          .map(e => e.ref.current);
                        if (
                          (['ArrowUp', 'End'].includes(e.key) && (t = t.slice().reverse()),
                          ['ArrowUp', 'ArrowDown'].includes(e.key))
                        ) {
                          let n = e.target,
                            r = t.indexOf(n);
                          t = t.slice(r + 1);
                        }
                        setTimeout(() => F(t)), e.preventDefault();
                      }
                    }),
                  }),
                }),
              }),
            }),
          });
        });
      nE.displayName = 'SelectContentImpl';
      var nC = i.forwardRef((e, t) => {
        let { __scopeSelect: n, onPlaced: r, ...o } = e,
          l = na(ng, n),
          a = nb(ng, n),
          [c, s] = i.useState(null),
          [f, p] = i.useState(null),
          v = (0, d.s)(t, e => p(e)),
          g = nt(n),
          w = i.useRef(!1),
          y = i.useRef(!0),
          { viewport: b, selectedItem: x, selectedItemText: E, focusSelectedItem: C } = a,
          S = i.useCallback(() => {
            if (l.trigger && l.valueNode && c && f && b && x && E) {
              let e = l.trigger.getBoundingClientRect(),
                t = f.getBoundingClientRect(),
                n = l.valueNode.getBoundingClientRect(),
                o = E.getBoundingClientRect();
              if ('rtl' !== l.dir) {
                let r = o.left - t.left,
                  l = n.left - r,
                  i = e.left - l,
                  a = e.width + i,
                  s = Math.max(a, t.width),
                  d = window.innerWidth - 10,
                  f = (0, u.q)(l, [10, Math.max(10, d - s)]);
                (c.style.minWidth = a + 'px'), (c.style.left = f + 'px');
              } else {
                let r = t.right - o.right,
                  l = window.innerWidth - n.right - r,
                  i = window.innerWidth - e.right - l,
                  a = e.width + i,
                  s = Math.max(a, t.width),
                  d = window.innerWidth - 10,
                  f = (0, u.q)(l, [10, Math.max(10, d - s)]);
                (c.style.minWidth = a + 'px'), (c.style.right = f + 'px');
              }
              let i = g(),
                a = window.innerHeight - 20,
                s = b.scrollHeight,
                d = window.getComputedStyle(f),
                p = parseInt(d.borderTopWidth, 10),
                h = parseInt(d.paddingTop, 10),
                v = parseInt(d.borderBottomWidth, 10),
                m = p + h + s + parseInt(d.paddingBottom, 10) + v,
                y = Math.min(5 * x.offsetHeight, m),
                C = window.getComputedStyle(b),
                S = parseInt(C.paddingTop, 10),
                R = parseInt(C.paddingBottom, 10),
                A = e.top + e.height / 2 - 10,
                T = x.offsetHeight / 2,
                N = p + h + (x.offsetTop + T);
              if (N <= A) {
                let e = i.length > 0 && x === i[i.length - 1].ref.current;
                c.style.bottom = '0px';
                let t = Math.max(
                  a - A,
                  T + (e ? R : 0) + (f.clientHeight - b.offsetTop - b.offsetHeight) + v
                );
                c.style.height = N + t + 'px';
              } else {
                let e = i.length > 0 && x === i[0].ref.current;
                c.style.top = '0px';
                let t = Math.max(A, p + b.offsetTop + (e ? S : 0) + T);
                (c.style.height = t + (m - N) + 'px'), (b.scrollTop = N - A + b.offsetTop);
              }
              (c.style.margin = ''.concat(10, 'px 0')),
                (c.style.minHeight = y + 'px'),
                (c.style.maxHeight = a + 'px'),
                null == r || r(),
                requestAnimationFrame(() => (w.current = !0));
            }
          }, [g, l.trigger, l.valueNode, c, f, b, x, E, l.dir, r]);
        (0, eQ.N)(() => S(), [S]);
        let [R, A] = i.useState();
        (0, eQ.N)(() => {
          f && A(window.getComputedStyle(f).zIndex);
        }, [f]);
        let T = i.useCallback(
          e => {
            e && !0 === y.current && (S(), null == C || C(), (y.current = !1));
          },
          [S, C]
        );
        return (0, m.jsx)(nR, {
          scope: n,
          contentWrapper: c,
          shouldExpandOnScrollRef: w,
          onScrollButtonChange: T,
          children: (0, m.jsx)('div', {
            ref: s,
            style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: R },
            children: (0, m.jsx)(h.sG.div, {
              ...o,
              ref: v,
              style: { boxSizing: 'border-box', maxHeight: '100%', ...o.style },
            }),
          }),
        });
      });
      nC.displayName = 'SelectItemAlignedPosition';
      var nS = i.forwardRef((e, t) => {
        let { __scopeSelect: n, align: r = 'start', collisionPadding: o = 10, ...l } = e,
          i = nl(n);
        return (0, m.jsx)(tn, {
          ...i,
          ...l,
          ref: t,
          align: r,
          collisionPadding: o,
          style: {
            boxSizing: 'border-box',
            ...l.style,
            '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
          },
        });
      });
      nS.displayName = 'SelectPopperPosition';
      var [nR, nA] = nr(ng, {}),
        nT = 'SelectViewport',
        nN = i.forwardRef((e, t) => {
          let { __scopeSelect: n, nonce: r, ...o } = e,
            l = nb(nT, n),
            a = nA(nT, n),
            u = (0, d.s)(t, l.onViewportChange),
            s = i.useRef(0);
          return (0, m.jsxs)(m.Fragment, {
            children: [
              (0, m.jsx)('style', {
                dangerouslySetInnerHTML: {
                  __html:
                    '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
                },
                nonce: r,
              }),
              (0, m.jsx)(ne.Slot, {
                scope: n,
                children: (0, m.jsx)(h.sG.div, {
                  'data-radix-select-viewport': '',
                  role: 'presentation',
                  ...o,
                  ref: u,
                  style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...o.style },
                  onScroll: (0, c.m)(o.onScroll, e => {
                    let t = e.currentTarget,
                      { contentWrapper: n, shouldExpandOnScrollRef: r } = a;
                    if ((null == r ? void 0 : r.current) && n) {
                      let e = Math.abs(s.current - t.scrollTop);
                      if (e > 0) {
                        let r = window.innerHeight - 20,
                          o = Math.max(parseFloat(n.style.minHeight), parseFloat(n.style.height));
                        if (o < r) {
                          let l = o + e,
                            i = Math.min(r, l),
                            a = l - i;
                          (n.style.height = i + 'px'),
                            '0px' === n.style.bottom &&
                              ((t.scrollTop = a > 0 ? a : 0),
                              (n.style.justifyContent = 'flex-end'));
                        }
                      }
                    }
                    s.current = t.scrollTop;
                  }),
                }),
              }),
            ],
          });
        });
      nN.displayName = nT;
      var nL = 'SelectGroup',
        [nk, nP] = nr(nL),
        nj = i.forwardRef((e, t) => {
          let { __scopeSelect: n, ...r } = e,
            o = (0, D.B)();
          return (0, m.jsx)(nk, {
            scope: n,
            id: o,
            children: (0, m.jsx)(h.sG.div, { role: 'group', 'aria-labelledby': o, ...r, ref: t }),
          });
        });
      nj.displayName = nL;
      var nD = 'SelectLabel',
        nM = i.forwardRef((e, t) => {
          let { __scopeSelect: n, ...r } = e,
            o = nP(nD, n);
          return (0, m.jsx)(h.sG.div, { id: o.id, ...r, ref: t });
        });
      nM.displayName = nD;
      var nI = 'SelectItem',
        [nO, n_] = nr(nI),
        nW = i.forwardRef((e, t) => {
          let { __scopeSelect: n, value: r, disabled: o = !1, textValue: l, ...a } = e,
            u = na(nI, n),
            s = nb(nI, n),
            f = u.value === r,
            [p, v] = i.useState(null != l ? l : ''),
            [g, w] = i.useState(!1),
            y = (0, d.s)(t, e => {
              var t;
              return null == (t = s.itemRefCallback) ? void 0 : t.call(s, e, r, o);
            }),
            b = (0, D.B)(),
            x = i.useRef('touch'),
            E = () => {
              o || (u.onValueChange(r), u.onOpenChange(!1));
            };
          if ('' === r)
            throw Error(
              'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
            );
          return (0, m.jsx)(nO, {
            scope: n,
            value: r,
            disabled: o,
            textId: b,
            isSelected: f,
            onItemTextChange: i.useCallback(e => {
              v(t => {
                var n;
                return t || (null != (n = null == e ? void 0 : e.textContent) ? n : '').trim();
              });
            }, []),
            children: (0, m.jsx)(ne.ItemSlot, {
              scope: n,
              value: r,
              disabled: o,
              textValue: p,
              children: (0, m.jsx)(h.sG.div, {
                role: 'option',
                'aria-labelledby': b,
                'data-highlighted': g ? '' : void 0,
                'aria-selected': f && g,
                'data-state': f ? 'checked' : 'unchecked',
                'aria-disabled': o || void 0,
                'data-disabled': o ? '' : void 0,
                tabIndex: o ? void 0 : -1,
                ...a,
                ref: y,
                onFocus: (0, c.m)(a.onFocus, () => w(!0)),
                onBlur: (0, c.m)(a.onBlur, () => w(!1)),
                onClick: (0, c.m)(a.onClick, () => {
                  'mouse' !== x.current && E();
                }),
                onPointerUp: (0, c.m)(a.onPointerUp, () => {
                  'mouse' === x.current && E();
                }),
                onPointerDown: (0, c.m)(a.onPointerDown, e => {
                  x.current = e.pointerType;
                }),
                onPointerMove: (0, c.m)(a.onPointerMove, e => {
                  if (((x.current = e.pointerType), o)) {
                    var t;
                    null == (t = s.onItemLeave) || t.call(s);
                  } else 'mouse' === x.current && e.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: (0, c.m)(a.onPointerLeave, e => {
                  if (e.currentTarget === document.activeElement) {
                    var t;
                    null == (t = s.onItemLeave) || t.call(s);
                  }
                }),
                onKeyDown: (0, c.m)(a.onKeyDown, e => {
                  var t;
                  ((null == (t = s.searchRef) ? void 0 : t.current) === '' || ' ' !== e.key) &&
                    (t9.includes(e.key) && E(), ' ' === e.key && e.preventDefault());
                }),
              }),
            }),
          });
        });
      nW.displayName = nI;
      var nH = 'SelectItemText',
        nF = i.forwardRef((e, t) => {
          let { __scopeSelect: n, className: r, style: o, ...l } = e,
            u = na(nH, n),
            c = nb(nH, n),
            s = n_(nH, n),
            f = nc(nH, n),
            [p, v] = i.useState(null),
            g = (0, d.s)(
              t,
              e => v(e),
              s.onItemTextChange,
              e => {
                var t;
                return null == (t = c.itemTextRefCallback)
                  ? void 0
                  : t.call(c, e, s.value, s.disabled);
              }
            ),
            w = null == p ? void 0 : p.textContent,
            y = i.useMemo(
              () =>
                (0, m.jsx)(
                  'option',
                  { value: s.value, disabled: s.disabled, children: w },
                  s.value
                ),
              [s.disabled, s.value, w]
            ),
            { onNativeOptionAdd: b, onNativeOptionRemove: x } = f;
          return (
            (0, eQ.N)(() => (b(y), () => x(y)), [b, x, y]),
            (0, m.jsxs)(m.Fragment, {
              children: [
                (0, m.jsx)(h.sG.span, { id: s.textId, ...l, ref: g }),
                s.isSelected && u.valueNode && !u.valueNodeHasChildren
                  ? a.createPortal(l.children, u.valueNode)
                  : null,
              ],
            })
          );
        });
      nF.displayName = nH;
      var nB = 'SelectItemIndicator',
        nz = i.forwardRef((e, t) => {
          let { __scopeSelect: n, ...r } = e;
          return n_(nB, n).isSelected
            ? (0, m.jsx)(h.sG.span, { 'aria-hidden': !0, ...r, ref: t })
            : null;
        });
      nz.displayName = nB;
      var nU = 'SelectScrollUpButton',
        nG = i.forwardRef((e, t) => {
          let n = nb(nU, e.__scopeSelect),
            r = nA(nU, e.__scopeSelect),
            [o, l] = i.useState(!1),
            a = (0, d.s)(t, r.onScrollButtonChange);
          return (
            (0, eQ.N)(() => {
              if (n.viewport && n.isPositioned) {
                let e = function () {
                    l(t.scrollTop > 0);
                  },
                  t = n.viewport;
                return (
                  e(), t.addEventListener('scroll', e), () => t.removeEventListener('scroll', e)
                );
              }
            }, [n.viewport, n.isPositioned]),
            o
              ? (0, m.jsx)(nY, {
                  ...e,
                  ref: a,
                  onAutoScroll: () => {
                    let { viewport: e, selectedItem: t } = n;
                    e && t && (e.scrollTop = e.scrollTop - t.offsetHeight);
                  },
                })
              : null
          );
        });
      nG.displayName = nU;
      var nV = 'SelectScrollDownButton',
        nX = i.forwardRef((e, t) => {
          let n = nb(nV, e.__scopeSelect),
            r = nA(nV, e.__scopeSelect),
            [o, l] = i.useState(!1),
            a = (0, d.s)(t, r.onScrollButtonChange);
          return (
            (0, eQ.N)(() => {
              if (n.viewport && n.isPositioned) {
                let e = function () {
                    let e = t.scrollHeight - t.clientHeight;
                    l(Math.ceil(t.scrollTop) < e);
                  },
                  t = n.viewport;
                return (
                  e(), t.addEventListener('scroll', e), () => t.removeEventListener('scroll', e)
                );
              }
            }, [n.viewport, n.isPositioned]),
            o
              ? (0, m.jsx)(nY, {
                  ...e,
                  ref: a,
                  onAutoScroll: () => {
                    let { viewport: e, selectedItem: t } = n;
                    e && t && (e.scrollTop = e.scrollTop + t.offsetHeight);
                  },
                })
              : null
          );
        });
      nX.displayName = nV;
      var nY = i.forwardRef((e, t) => {
          let { __scopeSelect: n, onAutoScroll: r, ...o } = e,
            l = nb('SelectScrollButton', n),
            a = i.useRef(null),
            u = nt(n),
            s = i.useCallback(() => {
              null !== a.current && (window.clearInterval(a.current), (a.current = null));
            }, []);
          return (
            i.useEffect(() => () => s(), [s]),
            (0, eQ.N)(() => {
              var e;
              let t = u().find(e => e.ref.current === document.activeElement);
              null == t || null == (e = t.ref.current) || e.scrollIntoView({ block: 'nearest' });
            }, [u]),
            (0, m.jsx)(h.sG.div, {
              'aria-hidden': !0,
              ...o,
              ref: t,
              style: { flexShrink: 0, ...o.style },
              onPointerDown: (0, c.m)(o.onPointerDown, () => {
                null === a.current && (a.current = window.setInterval(r, 50));
              }),
              onPointerMove: (0, c.m)(o.onPointerMove, () => {
                var e;
                null == (e = l.onItemLeave) || e.call(l),
                  null === a.current && (a.current = window.setInterval(r, 50));
              }),
              onPointerLeave: (0, c.m)(o.onPointerLeave, () => {
                s();
              }),
            })
          );
        }),
        nK = i.forwardRef((e, t) => {
          let { __scopeSelect: n, ...r } = e;
          return (0, m.jsx)(h.sG.div, { 'aria-hidden': !0, ...r, ref: t });
        });
      nK.displayName = 'SelectSeparator';
      var nq = 'SelectArrow';
      i.forwardRef((e, t) => {
        let { __scopeSelect: n, ...r } = e,
          o = nl(n),
          l = na(nq, n),
          i = nb(nq, n);
        return l.open && 'popper' === i.position ? (0, m.jsx)(tl, { ...o, ...r, ref: t }) : null;
      }).displayName = nq;
      var n$ = i.forwardRef((e, t) => {
        let { __scopeSelect: n, value: r, ...o } = e,
          l = i.useRef(null),
          a = (0, d.s)(t, l),
          u = (0, tf.Z)(r);
        return (
          i.useEffect(() => {
            let e = l.current;
            if (!e) return;
            let t = Object.getOwnPropertyDescriptor(
              window.HTMLSelectElement.prototype,
              'value'
            ).set;
            if (u !== r && t) {
              let n = new Event('change', { bubbles: !0 });
              t.call(e, r), e.dispatchEvent(n);
            }
          }, [u, r]),
          (0, m.jsx)(h.sG.select, { ...o, style: { ...tp, ...o.style }, ref: a, defaultValue: r })
        );
      });
      function nZ(e) {
        return '' === e || void 0 === e;
      }
      function nJ(e) {
        let t = (0, v.c)(e),
          n = i.useRef(''),
          r = i.useRef(0),
          o = i.useCallback(
            e => {
              let o = n.current + e;
              t(o),
                (function e(t) {
                  (n.current = t),
                    window.clearTimeout(r.current),
                    '' !== t && (r.current = window.setTimeout(() => e(''), 1e3));
                })(o);
            },
            [t]
          ),
          l = i.useCallback(() => {
            (n.current = ''), window.clearTimeout(r.current);
          }, []);
        return i.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, l];
      }
      function nQ(e, t, n) {
        var r, o;
        let l = t.length > 1 && Array.from(t).every(e => e === t[0]) ? t[0] : t,
          i = n ? e.indexOf(n) : -1,
          a = ((r = e), (o = Math.max(i, 0)), r.map((e, t) => r[(o + t) % r.length]));
        1 === l.length && (a = a.filter(e => e !== n));
        let u = a.find(e => e.textValue.toLowerCase().startsWith(l.toLowerCase()));
        return u !== n ? u : void 0;
      }
      n$.displayName = 'SelectBubbleInput';
      var n0 = ns,
        n1 = nf,
        n2 = nh,
        n5 = nv,
        n6 = nm,
        n8 = nw,
        n3 = nN,
        n4 = nj,
        n9 = nM,
        n7 = nW,
        re = nF,
        rt = nz,
        rn = nG,
        rr = nX,
        ro = nK;
    },
    2712: (e, t, n) => {
      n.d(t, { N: () => o });
      var r = n(2115),
        o = globalThis?.document ? r.useLayoutEffect : () => {};
    },
    3332: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(9946).A)('tag', [
        [
          'path',
          {
            d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
            key: 'vktsd0',
          },
        ],
        ['circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' }],
      ]);
    },
    3478: (e, t, n) => {
      n.d(t, { UC: () => ei, Y9: () => eo, q7: () => er, bL: () => en, l9: () => el });
      var r = n(2115),
        o = n(6081),
        l = n(7328),
        i = n(6101),
        a = n(5185),
        u = n(5845),
        c = n(3655),
        s = n(2712),
        d = n(8905),
        f = n(1285),
        p = n(5155),
        h = 'Collapsible',
        [v, m] = (0, o.A)(h),
        [g, w] = v(h),
        y = r.forwardRef((e, t) => {
          let {
              __scopeCollapsible: n,
              open: o,
              defaultOpen: l,
              disabled: i,
              onOpenChange: a,
              ...s
            } = e,
            [d, v] = (0, u.i)({ prop: o, defaultProp: null != l && l, onChange: a, caller: h });
          return (0, p.jsx)(g, {
            scope: n,
            disabled: i,
            contentId: (0, f.B)(),
            open: d,
            onOpenToggle: r.useCallback(() => v(e => !e), [v]),
            children: (0, p.jsx)(c.sG.div, {
              'data-state': R(d),
              'data-disabled': i ? '' : void 0,
              ...s,
              ref: t,
            }),
          });
        });
      y.displayName = h;
      var b = 'CollapsibleTrigger',
        x = r.forwardRef((e, t) => {
          let { __scopeCollapsible: n, ...r } = e,
            o = w(b, n);
          return (0, p.jsx)(c.sG.button, {
            type: 'button',
            'aria-controls': o.contentId,
            'aria-expanded': o.open || !1,
            'data-state': R(o.open),
            'data-disabled': o.disabled ? '' : void 0,
            disabled: o.disabled,
            ...r,
            ref: t,
            onClick: (0, a.m)(e.onClick, o.onOpenToggle),
          });
        });
      x.displayName = b;
      var E = 'CollapsibleContent',
        C = r.forwardRef((e, t) => {
          let { forceMount: n, ...r } = e,
            o = w(E, e.__scopeCollapsible);
          return (0, p.jsx)(d.C, {
            present: n || o.open,
            children: e => {
              let { present: n } = e;
              return (0, p.jsx)(S, { ...r, ref: t, present: n });
            },
          });
        });
      C.displayName = E;
      var S = r.forwardRef((e, t) => {
        let { __scopeCollapsible: n, present: o, children: l, ...a } = e,
          u = w(E, n),
          [d, f] = r.useState(o),
          h = r.useRef(null),
          v = (0, i.s)(t, h),
          m = r.useRef(0),
          g = m.current,
          y = r.useRef(0),
          b = y.current,
          x = u.open || d,
          C = r.useRef(x),
          S = r.useRef(void 0);
        return (
          r.useEffect(() => {
            let e = requestAnimationFrame(() => (C.current = !1));
            return () => cancelAnimationFrame(e);
          }, []),
          (0, s.N)(() => {
            let e = h.current;
            if (e) {
              (S.current = S.current || {
                transitionDuration: e.style.transitionDuration,
                animationName: e.style.animationName,
              }),
                (e.style.transitionDuration = '0s'),
                (e.style.animationName = 'none');
              let t = e.getBoundingClientRect();
              (m.current = t.height),
                (y.current = t.width),
                C.current ||
                  ((e.style.transitionDuration = S.current.transitionDuration),
                  (e.style.animationName = S.current.animationName)),
                f(o);
            }
          }, [u.open, o]),
          (0, p.jsx)(c.sG.div, {
            'data-state': R(u.open),
            'data-disabled': u.disabled ? '' : void 0,
            id: u.contentId,
            hidden: !x,
            ...a,
            ref: v,
            style: {
              '--radix-collapsible-content-height': g ? ''.concat(g, 'px') : void 0,
              '--radix-collapsible-content-width': b ? ''.concat(b, 'px') : void 0,
              ...e.style,
            },
            children: x && l,
          })
        );
      });
      function R(e) {
        return e ? 'open' : 'closed';
      }
      var A = n(4315),
        T = 'Accordion',
        N = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'],
        [L, k, P] = (0, l.N)(T),
        [j, D] = (0, o.A)(T, [P, m]),
        M = m(),
        I = r.forwardRef((e, t) => {
          let { type: n, ...r } = e;
          return (0, p.jsx)(L.Provider, {
            scope: e.__scopeAccordion,
            children:
              'multiple' === n ? (0, p.jsx)(B, { ...r, ref: t }) : (0, p.jsx)(F, { ...r, ref: t }),
          });
        });
      I.displayName = T;
      var [O, _] = j(T),
        [W, H] = j(T, { collapsible: !1 }),
        F = r.forwardRef((e, t) => {
          let {
              value: n,
              defaultValue: o,
              onValueChange: l = () => {},
              collapsible: i = !1,
              ...a
            } = e,
            [c, s] = (0, u.i)({ prop: n, defaultProp: null != o ? o : '', onChange: l, caller: T });
          return (0, p.jsx)(O, {
            scope: e.__scopeAccordion,
            value: r.useMemo(() => (c ? [c] : []), [c]),
            onItemOpen: s,
            onItemClose: r.useCallback(() => i && s(''), [i, s]),
            children: (0, p.jsx)(W, {
              scope: e.__scopeAccordion,
              collapsible: i,
              children: (0, p.jsx)(G, { ...a, ref: t }),
            }),
          });
        }),
        B = r.forwardRef((e, t) => {
          let { value: n, defaultValue: o, onValueChange: l = () => {}, ...i } = e,
            [a, c] = (0, u.i)({ prop: n, defaultProp: null != o ? o : [], onChange: l, caller: T }),
            s = r.useCallback(
              e =>
                c(function () {
                  let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                  return [...t, e];
                }),
              [c]
            ),
            d = r.useCallback(
              e =>
                c(function () {
                  let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                  return t.filter(t => t !== e);
                }),
              [c]
            );
          return (0, p.jsx)(O, {
            scope: e.__scopeAccordion,
            value: a,
            onItemOpen: s,
            onItemClose: d,
            children: (0, p.jsx)(W, {
              scope: e.__scopeAccordion,
              collapsible: !0,
              children: (0, p.jsx)(G, { ...i, ref: t }),
            }),
          });
        }),
        [z, U] = j(T),
        G = r.forwardRef((e, t) => {
          let { __scopeAccordion: n, disabled: o, dir: l, orientation: u = 'vertical', ...s } = e,
            d = r.useRef(null),
            f = (0, i.s)(d, t),
            h = k(n),
            v = 'ltr' === (0, A.jH)(l),
            m = (0, a.m)(e.onKeyDown, e => {
              var t;
              if (!N.includes(e.key)) return;
              let n = e.target,
                r = h().filter(e => {
                  var t;
                  return !(null == (t = e.ref.current) ? void 0 : t.disabled);
                }),
                o = r.findIndex(e => e.ref.current === n),
                l = r.length;
              if (-1 === o) return;
              e.preventDefault();
              let i = o,
                a = l - 1,
                c = () => {
                  (i = o + 1) > a && (i = 0);
                },
                s = () => {
                  (i = o - 1) < 0 && (i = a);
                };
              switch (e.key) {
                case 'Home':
                  i = 0;
                  break;
                case 'End':
                  i = a;
                  break;
                case 'ArrowRight':
                  'horizontal' === u && (v ? c() : s());
                  break;
                case 'ArrowDown':
                  'vertical' === u && c();
                  break;
                case 'ArrowLeft':
                  'horizontal' === u && (v ? s() : c());
                  break;
                case 'ArrowUp':
                  'vertical' === u && s();
              }
              null == (t = r[i % l].ref.current) || t.focus();
            });
          return (0, p.jsx)(z, {
            scope: n,
            disabled: o,
            direction: l,
            orientation: u,
            children: (0, p.jsx)(L.Slot, {
              scope: n,
              children: (0, p.jsx)(c.sG.div, {
                ...s,
                'data-orientation': u,
                ref: f,
                onKeyDown: o ? void 0 : m,
              }),
            }),
          });
        }),
        V = 'AccordionItem',
        [X, Y] = j(V),
        K = r.forwardRef((e, t) => {
          let { __scopeAccordion: n, value: r, ...o } = e,
            l = U(V, n),
            i = _(V, n),
            a = M(n),
            u = (0, f.B)(),
            c = (r && i.value.includes(r)) || !1,
            s = l.disabled || e.disabled;
          return (0, p.jsx)(X, {
            scope: n,
            open: c,
            disabled: s,
            triggerId: u,
            children: (0, p.jsx)(y, {
              'data-orientation': l.orientation,
              'data-state': et(c),
              ...a,
              ...o,
              ref: t,
              disabled: s,
              open: c,
              onOpenChange: e => {
                e ? i.onItemOpen(r) : i.onItemClose(r);
              },
            }),
          });
        });
      K.displayName = V;
      var q = 'AccordionHeader',
        $ = r.forwardRef((e, t) => {
          let { __scopeAccordion: n, ...r } = e,
            o = U(T, n),
            l = Y(q, n);
          return (0, p.jsx)(c.sG.h3, {
            'data-orientation': o.orientation,
            'data-state': et(l.open),
            'data-disabled': l.disabled ? '' : void 0,
            ...r,
            ref: t,
          });
        });
      $.displayName = q;
      var Z = 'AccordionTrigger',
        J = r.forwardRef((e, t) => {
          let { __scopeAccordion: n, ...r } = e,
            o = U(T, n),
            l = Y(Z, n),
            i = H(Z, n),
            a = M(n);
          return (0, p.jsx)(L.ItemSlot, {
            scope: n,
            children: (0, p.jsx)(x, {
              'aria-disabled': (l.open && !i.collapsible) || void 0,
              'data-orientation': o.orientation,
              id: l.triggerId,
              ...a,
              ...r,
              ref: t,
            }),
          });
        });
      J.displayName = Z;
      var Q = 'AccordionContent',
        ee = r.forwardRef((e, t) => {
          let { __scopeAccordion: n, ...r } = e,
            o = U(T, n),
            l = Y(Q, n),
            i = M(n);
          return (0, p.jsx)(C, {
            role: 'region',
            'aria-labelledby': l.triggerId,
            'data-orientation': o.orientation,
            ...i,
            ...r,
            ref: t,
            style: {
              '--radix-accordion-content-height': 'var(--radix-collapsible-content-height)',
              '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)',
              ...e.style,
            },
          });
        });
      function et(e) {
        return e ? 'open' : 'closed';
      }
      ee.displayName = Q;
      var en = I,
        er = K,
        eo = $,
        el = J,
        ei = ee;
    },
    4315: (e, t, n) => {
      n.d(t, { jH: () => l });
      var r = n(2115);
      n(5155);
      var o = r.createContext(void 0);
      function l(e) {
        let t = r.useContext(o);
        return e || t || 'ltr';
      }
    },
    4416: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(9946).A)('x', [
        ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
        ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
      ]);
    },
    5185: (e, t, n) => {
      n.d(t, { m: () => r });
      function r(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
        return function (r) {
          if ((e?.(r), !1 === n || !r.defaultPrevented)) return t?.(r);
        };
      }
    },
    5196: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(9946).A)('check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
    },
    5503: (e, t, n) => {
      n.d(t, { Z: () => o });
      var r = n(2115);
      function o(e) {
        let t = r.useRef({ value: e, previous: e });
        return r.useMemo(
          () => (
            t.current.value !== e &&
              ((t.current.previous = t.current.value), (t.current.value = e)),
            t.current.previous
          ),
          [e]
        );
      }
    },
    5845: (e, t, n) => {
      n.d(t, { i: () => a });
      var r,
        o = n(2115),
        l = n(2712),
        i = (r || (r = n.t(o, 2)))[' useInsertionEffect '.trim().toString()] || l.N;
      function a({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
        let [l, a, u] = (function ({ defaultProp: e, onChange: t }) {
            let [n, r] = o.useState(e),
              l = o.useRef(n),
              a = o.useRef(t);
            return (
              i(() => {
                a.current = t;
              }, [t]),
              o.useEffect(() => {
                l.current !== n && (a.current?.(n), (l.current = n));
              }, [n, l]),
              [n, r, a]
            );
          })({ defaultProp: t, onChange: n }),
          c = void 0 !== e,
          s = c ? e : l;
        {
          let t = o.useRef(void 0 !== e);
          o.useEffect(() => {
            let e = t.current;
            if (e !== c) {
              let t = c ? 'controlled' : 'uncontrolled';
              console.warn(
                `${r} is changing from ${e ? 'controlled' : 'uncontrolled'} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
              );
            }
            t.current = c;
          }, [c, r]);
        }
        return [
          s,
          o.useCallback(
            t => {
              if (c) {
                let n = 'function' == typeof t ? t(e) : t;
                n !== e && u.current?.(n);
              } else a(t);
            },
            [c, e, a, u]
          ),
        ];
      }
      Symbol('RADIX:SYNC_STATE');
    },
    6081: (e, t, n) => {
      n.d(t, { A: () => l });
      var r = n(2115),
        o = n(5155);
      function l(e, t = []) {
        let n = [],
          i = () => {
            let t = n.map(e => r.createContext(e));
            return function (n) {
              let o = n?.[e] || t;
              return r.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: o } }), [n, o]);
            };
          };
        return (
          (i.scopeName = e),
          [
            function (t, l) {
              let i = r.createContext(l),
                a = n.length;
              n = [...n, l];
              let u = t => {
                let { scope: n, children: l, ...u } = t,
                  c = n?.[e]?.[a] || i,
                  s = r.useMemo(() => u, Object.values(u));
                return (0, o.jsx)(c.Provider, { value: s, children: l });
              };
              return (
                (u.displayName = t + 'Provider'),
                [
                  u,
                  function (n, o) {
                    let u = o?.[e]?.[a] || i,
                      c = r.useContext(u);
                    if (c) return c;
                    if (void 0 !== l) return l;
                    throw Error(`\`${n}\` must be used within \`${t}\``);
                  },
                ]
              );
            },
            (function (...e) {
              let t = e[0];
              if (1 === e.length) return t;
              let n = () => {
                let n = e.map(e => ({ useScope: e(), scopeName: e.scopeName }));
                return function (e) {
                  let o = n.reduce((t, { useScope: n, scopeName: r }) => {
                    let o = n(e)[`__scope${r}`];
                    return { ...t, ...o };
                  }, {});
                  return r.useMemo(() => ({ [`__scope${t.scopeName}`]: o }), [o]);
                };
              };
              return (n.scopeName = t.scopeName), n;
            })(i, ...t),
          ]
        );
      }
    },
    6474: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(9946).A)('chevron-down', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]]);
    },
    6981: (e, t, n) => {
      n.d(t, { C1: () => R, bL: () => S });
      var r = n(2115),
        o = n(6101),
        l = n(6081),
        i = n(5185),
        a = n(5845),
        u = n(5503),
        c = n(1275),
        s = n(8905),
        d = n(3655),
        f = n(5155),
        p = 'Checkbox',
        [h, v] = (0, l.A)(p),
        [m, g] = h(p),
        w = r.forwardRef((e, t) => {
          let {
              __scopeCheckbox: n,
              name: l,
              checked: u,
              defaultChecked: c,
              required: s,
              disabled: h,
              value: v = 'on',
              onCheckedChange: g,
              form: w,
              ...y
            } = e,
            [b, S] = r.useState(null),
            R = (0, o.s)(t, e => S(e)),
            A = r.useRef(!1),
            T = !b || w || !!b.closest('form'),
            [N, L] = (0, a.i)({ prop: u, defaultProp: null != c && c, onChange: g, caller: p }),
            k = r.useRef(N);
          return (
            r.useEffect(() => {
              let e = null == b ? void 0 : b.form;
              if (e) {
                let t = () => L(k.current);
                return e.addEventListener('reset', t), () => e.removeEventListener('reset', t);
              }
            }, [b, L]),
            (0, f.jsxs)(m, {
              scope: n,
              state: N,
              disabled: h,
              children: [
                (0, f.jsx)(d.sG.button, {
                  type: 'button',
                  role: 'checkbox',
                  'aria-checked': E(N) ? 'mixed' : N,
                  'aria-required': s,
                  'data-state': C(N),
                  'data-disabled': h ? '' : void 0,
                  disabled: h,
                  value: v,
                  ...y,
                  ref: R,
                  onKeyDown: (0, i.m)(e.onKeyDown, e => {
                    'Enter' === e.key && e.preventDefault();
                  }),
                  onClick: (0, i.m)(e.onClick, e => {
                    L(e => !!E(e) || !e),
                      T &&
                        ((A.current = e.isPropagationStopped()), A.current || e.stopPropagation());
                  }),
                }),
                T &&
                  (0, f.jsx)(x, {
                    control: b,
                    bubbles: !A.current,
                    name: l,
                    value: v,
                    checked: N,
                    required: s,
                    disabled: h,
                    form: w,
                    style: { transform: 'translateX(-100%)' },
                    defaultChecked: !E(c) && c,
                  }),
              ],
            })
          );
        });
      w.displayName = p;
      var y = 'CheckboxIndicator',
        b = r.forwardRef((e, t) => {
          let { __scopeCheckbox: n, forceMount: r, ...o } = e,
            l = g(y, n);
          return (0, f.jsx)(s.C, {
            present: r || E(l.state) || !0 === l.state,
            children: (0, f.jsx)(d.sG.span, {
              'data-state': C(l.state),
              'data-disabled': l.disabled ? '' : void 0,
              ...o,
              ref: t,
              style: { pointerEvents: 'none', ...e.style },
            }),
          });
        });
      b.displayName = y;
      var x = r.forwardRef((e, t) => {
        let {
            __scopeCheckbox: n,
            control: l,
            checked: i,
            bubbles: a = !0,
            defaultChecked: s,
            ...p
          } = e,
          h = r.useRef(null),
          v = (0, o.s)(h, t),
          m = (0, u.Z)(i),
          g = (0, c.X)(l);
        r.useEffect(() => {
          let e = h.current;
          if (!e) return;
          let t = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'checked').set;
          if (m !== i && t) {
            let n = new Event('click', { bubbles: a });
            (e.indeterminate = E(i)), t.call(e, !E(i) && i), e.dispatchEvent(n);
          }
        }, [m, i, a]);
        let w = r.useRef(!E(i) && i);
        return (0, f.jsx)(d.sG.input, {
          type: 'checkbox',
          'aria-hidden': !0,
          defaultChecked: null != s ? s : w.current,
          ...p,
          tabIndex: -1,
          ref: v,
          style: {
            ...p.style,
            ...g,
            position: 'absolute',
            pointerEvents: 'none',
            opacity: 0,
            margin: 0,
          },
        });
      });
      function E(e) {
        return 'indeterminate' === e;
      }
      function C(e) {
        return E(e) ? 'indeterminate' : e ? 'checked' : 'unchecked';
      }
      x.displayName = 'CheckboxBubbleInput';
      var S = w,
        R = b;
    },
    7328: (e, t, n) => {
      function r(e, t, n) {
        if (!t.has(e)) throw TypeError('attempted to ' + n + ' private field on non-instance');
        return t.get(e);
      }
      function o(e, t) {
        var n = r(e, t, 'get');
        return n.get ? n.get.call(e) : n.value;
      }
      function l(e, t, n) {
        var o = r(e, t, 'set');
        if (o.set) o.set.call(e, n);
        else {
          if (!o.writable) throw TypeError('attempted to set read only private field');
          o.value = n;
        }
        return n;
      }
      n.d(t, { N: () => f });
      var i,
        a = n(2115),
        u = n(6081),
        c = n(6101),
        s = n(9708),
        d = n(5155);
      function f(e) {
        let t = e + 'CollectionProvider',
          [n, r] = (0, u.A)(t),
          [o, l] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
          i = e => {
            let { scope: t, children: n } = e,
              r = a.useRef(null),
              l = a.useRef(new Map()).current;
            return (0, d.jsx)(o, { scope: t, itemMap: l, collectionRef: r, children: n });
          };
        i.displayName = t;
        let f = e + 'CollectionSlot',
          p = (0, s.TL)(f),
          h = a.forwardRef((e, t) => {
            let { scope: n, children: r } = e,
              o = l(f, n),
              i = (0, c.s)(t, o.collectionRef);
            return (0, d.jsx)(p, { ref: i, children: r });
          });
        h.displayName = f;
        let v = e + 'CollectionItemSlot',
          m = 'data-radix-collection-item',
          g = (0, s.TL)(v),
          w = a.forwardRef((e, t) => {
            let { scope: n, children: r, ...o } = e,
              i = a.useRef(null),
              u = (0, c.s)(t, i),
              s = l(v, n);
            return (
              a.useEffect(
                () => (s.itemMap.set(i, { ref: i, ...o }), () => void s.itemMap.delete(i))
              ),
              (0, d.jsx)(g, { ...{ [m]: '' }, ref: u, children: r })
            );
          });
        return (
          (w.displayName = v),
          [
            { Provider: i, Slot: h, ItemSlot: w },
            function (t) {
              let n = l(e + 'CollectionConsumer', t);
              return a.useCallback(() => {
                let e = n.collectionRef.current;
                if (!e) return [];
                let t = Array.from(e.querySelectorAll('['.concat(m, ']')));
                return Array.from(n.itemMap.values()).sort(
                  (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current)
                );
              }, [n.collectionRef, n.itemMap]);
            },
            r,
          ]
        );
      }
      var p = new WeakMap();
      function h(e, t) {
        if ('at' in Array.prototype) return Array.prototype.at.call(e, t);
        let n = (function (e, t) {
          let n = e.length,
            r = v(t),
            o = r >= 0 ? r : n + r;
          return o < 0 || o >= n ? -1 : o;
        })(e, t);
        return -1 === n ? void 0 : e[n];
      }
      function v(e) {
        return e != e || 0 === e ? 0 : Math.trunc(e);
      }
      i = new WeakMap();
    },
    7655: (e, t, n) => {
      n.d(t, { LM: () => K, OK: () => q, VM: () => C, bL: () => Y, lr: () => M });
      var r = n(2115),
        o = n(3655),
        l = n(8905),
        i = n(6081),
        a = n(6101),
        u = n(9033),
        c = n(4315),
        s = n(2712),
        d = n(9367),
        f = n(5185),
        p = n(5155),
        h = 'ScrollArea',
        [v, m] = (0, i.A)(h),
        [g, w] = v(h),
        y = r.forwardRef((e, t) => {
          let {
              __scopeScrollArea: n,
              type: l = 'hover',
              dir: i,
              scrollHideDelay: u = 600,
              ...s
            } = e,
            [d, f] = r.useState(null),
            [h, v] = r.useState(null),
            [m, w] = r.useState(null),
            [y, b] = r.useState(null),
            [x, E] = r.useState(null),
            [C, S] = r.useState(0),
            [R, A] = r.useState(0),
            [T, N] = r.useState(!1),
            [L, k] = r.useState(!1),
            P = (0, a.s)(t, e => f(e)),
            j = (0, c.jH)(i);
          return (0, p.jsx)(g, {
            scope: n,
            type: l,
            dir: j,
            scrollHideDelay: u,
            scrollArea: d,
            viewport: h,
            onViewportChange: v,
            content: m,
            onContentChange: w,
            scrollbarX: y,
            onScrollbarXChange: b,
            scrollbarXEnabled: T,
            onScrollbarXEnabledChange: N,
            scrollbarY: x,
            onScrollbarYChange: E,
            scrollbarYEnabled: L,
            onScrollbarYEnabledChange: k,
            onCornerWidthChange: S,
            onCornerHeightChange: A,
            children: (0, p.jsx)(o.sG.div, {
              dir: j,
              ...s,
              ref: P,
              style: {
                position: 'relative',
                '--radix-scroll-area-corner-width': C + 'px',
                '--radix-scroll-area-corner-height': R + 'px',
                ...e.style,
              },
            }),
          });
        });
      y.displayName = h;
      var b = 'ScrollAreaViewport',
        x = r.forwardRef((e, t) => {
          let { __scopeScrollArea: n, children: l, nonce: i, ...u } = e,
            c = w(b, n),
            s = r.useRef(null),
            d = (0, a.s)(t, s, c.onViewportChange);
          return (0, p.jsxs)(p.Fragment, {
            children: [
              (0, p.jsx)('style', {
                dangerouslySetInnerHTML: {
                  __html:
                    '[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}',
                },
                nonce: i,
              }),
              (0, p.jsx)(o.sG.div, {
                'data-radix-scroll-area-viewport': '',
                ...u,
                ref: d,
                style: {
                  overflowX: c.scrollbarXEnabled ? 'scroll' : 'hidden',
                  overflowY: c.scrollbarYEnabled ? 'scroll' : 'hidden',
                  ...e.style,
                },
                children: (0, p.jsx)('div', {
                  ref: c.onContentChange,
                  style: { minWidth: '100%', display: 'table' },
                  children: l,
                }),
              }),
            ],
          });
        });
      x.displayName = b;
      var E = 'ScrollAreaScrollbar',
        C = r.forwardRef((e, t) => {
          let { forceMount: n, ...o } = e,
            l = w(E, e.__scopeScrollArea),
            { onScrollbarXEnabledChange: i, onScrollbarYEnabledChange: a } = l,
            u = 'horizontal' === e.orientation;
          return (
            r.useEffect(
              () => (
                u ? i(!0) : a(!0),
                () => {
                  u ? i(!1) : a(!1);
                }
              ),
              [u, i, a]
            ),
            'hover' === l.type
              ? (0, p.jsx)(S, { ...o, ref: t, forceMount: n })
              : 'scroll' === l.type
                ? (0, p.jsx)(R, { ...o, ref: t, forceMount: n })
                : 'auto' === l.type
                  ? (0, p.jsx)(A, { ...o, ref: t, forceMount: n })
                  : 'always' === l.type
                    ? (0, p.jsx)(T, { ...o, ref: t })
                    : null
          );
        });
      C.displayName = E;
      var S = r.forwardRef((e, t) => {
          let { forceMount: n, ...o } = e,
            i = w(E, e.__scopeScrollArea),
            [a, u] = r.useState(!1);
          return (
            r.useEffect(() => {
              let e = i.scrollArea,
                t = 0;
              if (e) {
                let n = () => {
                    window.clearTimeout(t), u(!0);
                  },
                  r = () => {
                    t = window.setTimeout(() => u(!1), i.scrollHideDelay);
                  };
                return (
                  e.addEventListener('pointerenter', n),
                  e.addEventListener('pointerleave', r),
                  () => {
                    window.clearTimeout(t),
                      e.removeEventListener('pointerenter', n),
                      e.removeEventListener('pointerleave', r);
                  }
                );
              }
            }, [i.scrollArea, i.scrollHideDelay]),
            (0, p.jsx)(l.C, {
              present: n || a,
              children: (0, p.jsx)(A, { 'data-state': a ? 'visible' : 'hidden', ...o, ref: t }),
            })
          );
        }),
        R = r.forwardRef((e, t) => {
          var n, o;
          let { forceMount: i, ...a } = e,
            u = w(E, e.__scopeScrollArea),
            c = 'horizontal' === e.orientation,
            s = V(() => h('SCROLL_END'), 100),
            [d, h] =
              ((n = 'hidden'),
              (o = {
                hidden: { SCROLL: 'scrolling' },
                scrolling: { SCROLL_END: 'idle', POINTER_ENTER: 'interacting' },
                interacting: { SCROLL: 'interacting', POINTER_LEAVE: 'idle' },
                idle: { HIDE: 'hidden', SCROLL: 'scrolling', POINTER_ENTER: 'interacting' },
              }),
              r.useReducer((e, t) => {
                let n = o[e][t];
                return null != n ? n : e;
              }, n));
          return (
            r.useEffect(() => {
              if ('idle' === d) {
                let e = window.setTimeout(() => h('HIDE'), u.scrollHideDelay);
                return () => window.clearTimeout(e);
              }
            }, [d, u.scrollHideDelay, h]),
            r.useEffect(() => {
              let e = u.viewport,
                t = c ? 'scrollLeft' : 'scrollTop';
              if (e) {
                let n = e[t],
                  r = () => {
                    let r = e[t];
                    n !== r && (h('SCROLL'), s()), (n = r);
                  };
                return e.addEventListener('scroll', r), () => e.removeEventListener('scroll', r);
              }
            }, [u.viewport, c, h, s]),
            (0, p.jsx)(l.C, {
              present: i || 'hidden' !== d,
              children: (0, p.jsx)(T, {
                'data-state': 'hidden' === d ? 'hidden' : 'visible',
                ...a,
                ref: t,
                onPointerEnter: (0, f.m)(e.onPointerEnter, () => h('POINTER_ENTER')),
                onPointerLeave: (0, f.m)(e.onPointerLeave, () => h('POINTER_LEAVE')),
              }),
            })
          );
        }),
        A = r.forwardRef((e, t) => {
          let n = w(E, e.__scopeScrollArea),
            { forceMount: o, ...i } = e,
            [a, u] = r.useState(!1),
            c = 'horizontal' === e.orientation,
            s = V(() => {
              if (n.viewport) {
                let e = n.viewport.offsetWidth < n.viewport.scrollWidth,
                  t = n.viewport.offsetHeight < n.viewport.scrollHeight;
                u(c ? e : t);
              }
            }, 10);
          return (
            X(n.viewport, s),
            X(n.content, s),
            (0, p.jsx)(l.C, {
              present: o || a,
              children: (0, p.jsx)(T, { 'data-state': a ? 'visible' : 'hidden', ...i, ref: t }),
            })
          );
        }),
        T = r.forwardRef((e, t) => {
          let { orientation: n = 'vertical', ...o } = e,
            l = w(E, e.__scopeScrollArea),
            i = r.useRef(null),
            a = r.useRef(0),
            [u, c] = r.useState({
              content: 0,
              viewport: 0,
              scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
            }),
            s = F(u.viewport, u.content),
            d = {
              ...o,
              sizes: u,
              onSizesChange: c,
              hasThumb: !!(s > 0 && s < 1),
              onThumbChange: e => (i.current = e),
              onThumbPointerUp: () => (a.current = 0),
              onThumbPointerDown: e => (a.current = e),
            };
          function f(e, t) {
            return (function (e, t, n) {
              let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 'ltr',
                o = B(n),
                l = t || o / 2,
                i = n.scrollbar.paddingStart + l,
                a = n.scrollbar.size - n.scrollbar.paddingEnd - (o - l),
                u = n.content - n.viewport;
              return U([i, a], 'ltr' === r ? [0, u] : [-1 * u, 0])(e);
            })(e, a.current, u, t);
          }
          return 'horizontal' === n
            ? (0, p.jsx)(N, {
                ...d,
                ref: t,
                onThumbPositionChange: () => {
                  if (l.viewport && i.current) {
                    let e = z(l.viewport.scrollLeft, u, l.dir);
                    i.current.style.transform = 'translate3d('.concat(e, 'px, 0, 0)');
                  }
                },
                onWheelScroll: e => {
                  l.viewport && (l.viewport.scrollLeft = e);
                },
                onDragScroll: e => {
                  l.viewport && (l.viewport.scrollLeft = f(e, l.dir));
                },
              })
            : 'vertical' === n
              ? (0, p.jsx)(L, {
                  ...d,
                  ref: t,
                  onThumbPositionChange: () => {
                    if (l.viewport && i.current) {
                      let e = z(l.viewport.scrollTop, u);
                      i.current.style.transform = 'translate3d(0, '.concat(e, 'px, 0)');
                    }
                  },
                  onWheelScroll: e => {
                    l.viewport && (l.viewport.scrollTop = e);
                  },
                  onDragScroll: e => {
                    l.viewport && (l.viewport.scrollTop = f(e));
                  },
                })
              : null;
        }),
        N = r.forwardRef((e, t) => {
          let { sizes: n, onSizesChange: o, ...l } = e,
            i = w(E, e.__scopeScrollArea),
            [u, c] = r.useState(),
            s = r.useRef(null),
            d = (0, a.s)(t, s, i.onScrollbarXChange);
          return (
            r.useEffect(() => {
              s.current && c(getComputedStyle(s.current));
            }, [s]),
            (0, p.jsx)(j, {
              'data-orientation': 'horizontal',
              ...l,
              ref: d,
              sizes: n,
              style: {
                bottom: 0,
                left: 'rtl' === i.dir ? 'var(--radix-scroll-area-corner-width)' : 0,
                right: 'ltr' === i.dir ? 'var(--radix-scroll-area-corner-width)' : 0,
                '--radix-scroll-area-thumb-width': B(n) + 'px',
                ...e.style,
              },
              onThumbPointerDown: t => e.onThumbPointerDown(t.x),
              onDragScroll: t => e.onDragScroll(t.x),
              onWheelScroll: (t, n) => {
                if (i.viewport) {
                  let r = i.viewport.scrollLeft + t.deltaX;
                  e.onWheelScroll(r),
                    (function (e, t) {
                      return e > 0 && e < t;
                    })(r, n) && t.preventDefault();
                }
              },
              onResize: () => {
                s.current &&
                  i.viewport &&
                  u &&
                  o({
                    content: i.viewport.scrollWidth,
                    viewport: i.viewport.offsetWidth,
                    scrollbar: {
                      size: s.current.clientWidth,
                      paddingStart: H(u.paddingLeft),
                      paddingEnd: H(u.paddingRight),
                    },
                  });
              },
            })
          );
        }),
        L = r.forwardRef((e, t) => {
          let { sizes: n, onSizesChange: o, ...l } = e,
            i = w(E, e.__scopeScrollArea),
            [u, c] = r.useState(),
            s = r.useRef(null),
            d = (0, a.s)(t, s, i.onScrollbarYChange);
          return (
            r.useEffect(() => {
              s.current && c(getComputedStyle(s.current));
            }, [s]),
            (0, p.jsx)(j, {
              'data-orientation': 'vertical',
              ...l,
              ref: d,
              sizes: n,
              style: {
                top: 0,
                right: 'ltr' === i.dir ? 0 : void 0,
                left: 'rtl' === i.dir ? 0 : void 0,
                bottom: 'var(--radix-scroll-area-corner-height)',
                '--radix-scroll-area-thumb-height': B(n) + 'px',
                ...e.style,
              },
              onThumbPointerDown: t => e.onThumbPointerDown(t.y),
              onDragScroll: t => e.onDragScroll(t.y),
              onWheelScroll: (t, n) => {
                if (i.viewport) {
                  let r = i.viewport.scrollTop + t.deltaY;
                  e.onWheelScroll(r),
                    (function (e, t) {
                      return e > 0 && e < t;
                    })(r, n) && t.preventDefault();
                }
              },
              onResize: () => {
                s.current &&
                  i.viewport &&
                  u &&
                  o({
                    content: i.viewport.scrollHeight,
                    viewport: i.viewport.offsetHeight,
                    scrollbar: {
                      size: s.current.clientHeight,
                      paddingStart: H(u.paddingTop),
                      paddingEnd: H(u.paddingBottom),
                    },
                  });
              },
            })
          );
        }),
        [k, P] = v(E),
        j = r.forwardRef((e, t) => {
          let {
              __scopeScrollArea: n,
              sizes: l,
              hasThumb: i,
              onThumbChange: c,
              onThumbPointerUp: s,
              onThumbPointerDown: d,
              onThumbPositionChange: h,
              onDragScroll: v,
              onWheelScroll: m,
              onResize: g,
              ...y
            } = e,
            b = w(E, n),
            [x, C] = r.useState(null),
            S = (0, a.s)(t, e => C(e)),
            R = r.useRef(null),
            A = r.useRef(''),
            T = b.viewport,
            N = l.content - l.viewport,
            L = (0, u.c)(m),
            P = (0, u.c)(h),
            j = V(g, 10);
          function D(e) {
            R.current && v({ x: e.clientX - R.current.left, y: e.clientY - R.current.top });
          }
          return (
            r.useEffect(() => {
              let e = e => {
                let t = e.target;
                (null == x ? void 0 : x.contains(t)) && L(e, N);
              };
              return (
                document.addEventListener('wheel', e, { passive: !1 }),
                () => document.removeEventListener('wheel', e, { passive: !1 })
              );
            }, [T, x, N, L]),
            r.useEffect(P, [l, P]),
            X(x, j),
            X(b.content, j),
            (0, p.jsx)(k, {
              scope: n,
              scrollbar: x,
              hasThumb: i,
              onThumbChange: (0, u.c)(c),
              onThumbPointerUp: (0, u.c)(s),
              onThumbPositionChange: P,
              onThumbPointerDown: (0, u.c)(d),
              children: (0, p.jsx)(o.sG.div, {
                ...y,
                ref: S,
                style: { position: 'absolute', ...y.style },
                onPointerDown: (0, f.m)(e.onPointerDown, e => {
                  0 === e.button &&
                    (e.target.setPointerCapture(e.pointerId),
                    (R.current = x.getBoundingClientRect()),
                    (A.current = document.body.style.webkitUserSelect),
                    (document.body.style.webkitUserSelect = 'none'),
                    b.viewport && (b.viewport.style.scrollBehavior = 'auto'),
                    D(e));
                }),
                onPointerMove: (0, f.m)(e.onPointerMove, D),
                onPointerUp: (0, f.m)(e.onPointerUp, e => {
                  let t = e.target;
                  t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
                    (document.body.style.webkitUserSelect = A.current),
                    b.viewport && (b.viewport.style.scrollBehavior = ''),
                    (R.current = null);
                }),
              }),
            })
          );
        }),
        D = 'ScrollAreaThumb',
        M = r.forwardRef((e, t) => {
          let { forceMount: n, ...r } = e,
            o = P(D, e.__scopeScrollArea);
          return (0, p.jsx)(l.C, {
            present: n || o.hasThumb,
            children: (0, p.jsx)(I, { ref: t, ...r }),
          });
        }),
        I = r.forwardRef((e, t) => {
          let { __scopeScrollArea: n, style: l, ...i } = e,
            u = w(D, n),
            c = P(D, n),
            { onThumbPositionChange: s } = c,
            d = (0, a.s)(t, e => c.onThumbChange(e)),
            h = r.useRef(void 0),
            v = V(() => {
              h.current && (h.current(), (h.current = void 0));
            }, 100);
          return (
            r.useEffect(() => {
              let e = u.viewport;
              if (e) {
                let t = () => {
                  v(), h.current || ((h.current = G(e, s)), s());
                };
                return (
                  s(), e.addEventListener('scroll', t), () => e.removeEventListener('scroll', t)
                );
              }
            }, [u.viewport, v, s]),
            (0, p.jsx)(o.sG.div, {
              'data-state': c.hasThumb ? 'visible' : 'hidden',
              ...i,
              ref: d,
              style: {
                width: 'var(--radix-scroll-area-thumb-width)',
                height: 'var(--radix-scroll-area-thumb-height)',
                ...l,
              },
              onPointerDownCapture: (0, f.m)(e.onPointerDownCapture, e => {
                let t = e.target.getBoundingClientRect(),
                  n = e.clientX - t.left,
                  r = e.clientY - t.top;
                c.onThumbPointerDown({ x: n, y: r });
              }),
              onPointerUp: (0, f.m)(e.onPointerUp, c.onThumbPointerUp),
            })
          );
        });
      M.displayName = D;
      var O = 'ScrollAreaCorner',
        _ = r.forwardRef((e, t) => {
          let n = w(O, e.__scopeScrollArea),
            r = !!(n.scrollbarX && n.scrollbarY);
          return 'scroll' !== n.type && r ? (0, p.jsx)(W, { ...e, ref: t }) : null;
        });
      _.displayName = O;
      var W = r.forwardRef((e, t) => {
        let { __scopeScrollArea: n, ...l } = e,
          i = w(O, n),
          [a, u] = r.useState(0),
          [c, s] = r.useState(0),
          d = !!(a && c);
        return (
          X(i.scrollbarX, () => {
            var e;
            let t = (null == (e = i.scrollbarX) ? void 0 : e.offsetHeight) || 0;
            i.onCornerHeightChange(t), s(t);
          }),
          X(i.scrollbarY, () => {
            var e;
            let t = (null == (e = i.scrollbarY) ? void 0 : e.offsetWidth) || 0;
            i.onCornerWidthChange(t), u(t);
          }),
          d
            ? (0, p.jsx)(o.sG.div, {
                ...l,
                ref: t,
                style: {
                  width: a,
                  height: c,
                  position: 'absolute',
                  right: 'ltr' === i.dir ? 0 : void 0,
                  left: 'rtl' === i.dir ? 0 : void 0,
                  bottom: 0,
                  ...e.style,
                },
              })
            : null
        );
      });
      function H(e) {
        return e ? parseInt(e, 10) : 0;
      }
      function F(e, t) {
        let n = e / t;
        return isNaN(n) ? 0 : n;
      }
      function B(e) {
        let t = F(e.viewport, e.content),
          n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd;
        return Math.max((e.scrollbar.size - n) * t, 18);
      }
      function z(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'ltr',
          r = B(t),
          o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
          l = t.scrollbar.size - o,
          i = t.content - t.viewport,
          a = (0, d.q)(e, 'ltr' === n ? [0, i] : [-1 * i, 0]);
        return U([0, i], [0, l - r])(a);
      }
      function U(e, t) {
        return n => {
          if (e[0] === e[1] || t[0] === t[1]) return t[0];
          let r = (t[1] - t[0]) / (e[1] - e[0]);
          return t[0] + r * (n - e[0]);
        };
      }
      var G = function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : () => {},
          n = { left: e.scrollLeft, top: e.scrollTop },
          r = 0;
        return (
          !(function o() {
            let l = { left: e.scrollLeft, top: e.scrollTop },
              i = n.left !== l.left,
              a = n.top !== l.top;
            (i || a) && t(), (n = l), (r = window.requestAnimationFrame(o));
          })(),
          () => window.cancelAnimationFrame(r)
        );
      };
      function V(e, t) {
        let n = (0, u.c)(e),
          o = r.useRef(0);
        return (
          r.useEffect(() => () => window.clearTimeout(o.current), []),
          r.useCallback(() => {
            window.clearTimeout(o.current), (o.current = window.setTimeout(n, t));
          }, [n, t])
        );
      }
      function X(e, t) {
        let n = (0, u.c)(t);
        (0, s.N)(() => {
          let t = 0;
          if (e) {
            let r = new ResizeObserver(() => {
              cancelAnimationFrame(t), (t = window.requestAnimationFrame(n));
            });
            return (
              r.observe(e),
              () => {
                window.cancelAnimationFrame(t), r.unobserve(e);
              }
            );
          }
        }, [e, n]);
      }
      var Y = y,
        K = x,
        q = _;
    },
    7863: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(9946).A)('chevron-up', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]]);
    },
    8905: (e, t, n) => {
      n.d(t, { C: () => i });
      var r = n(2115),
        o = n(6101),
        l = n(2712),
        i = e => {
          let { present: t, children: n } = e,
            i = (function (e) {
              var t, n;
              let [o, i] = r.useState(),
                u = r.useRef(null),
                c = r.useRef(e),
                s = r.useRef('none'),
                [d, f] =
                  ((t = e ? 'mounted' : 'unmounted'),
                  (n = {
                    mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
                    unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
                    unmounted: { MOUNT: 'mounted' },
                  }),
                  r.useReducer((e, t) => {
                    let r = n[e][t];
                    return null != r ? r : e;
                  }, t));
              return (
                r.useEffect(() => {
                  let e = a(u.current);
                  s.current = 'mounted' === d ? e : 'none';
                }, [d]),
                (0, l.N)(() => {
                  let t = u.current,
                    n = c.current;
                  if (n !== e) {
                    let r = s.current,
                      o = a(t);
                    e
                      ? f('MOUNT')
                      : 'none' === o || (null == t ? void 0 : t.display) === 'none'
                        ? f('UNMOUNT')
                        : n && r !== o
                          ? f('ANIMATION_OUT')
                          : f('UNMOUNT'),
                      (c.current = e);
                  }
                }, [e, f]),
                (0, l.N)(() => {
                  if (o) {
                    var e;
                    let t,
                      n = null != (e = o.ownerDocument.defaultView) ? e : window,
                      r = e => {
                        let r = a(u.current).includes(e.animationName);
                        if (e.target === o && r && (f('ANIMATION_END'), !c.current)) {
                          let e = o.style.animationFillMode;
                          (o.style.animationFillMode = 'forwards'),
                            (t = n.setTimeout(() => {
                              'forwards' === o.style.animationFillMode &&
                                (o.style.animationFillMode = e);
                            }));
                        }
                      },
                      l = e => {
                        e.target === o && (s.current = a(u.current));
                      };
                    return (
                      o.addEventListener('animationstart', l),
                      o.addEventListener('animationcancel', r),
                      o.addEventListener('animationend', r),
                      () => {
                        n.clearTimeout(t),
                          o.removeEventListener('animationstart', l),
                          o.removeEventListener('animationcancel', r),
                          o.removeEventListener('animationend', r);
                      }
                    );
                  }
                  f('ANIMATION_END');
                }, [o, f]),
                {
                  isPresent: ['mounted', 'unmountSuspended'].includes(d),
                  ref: r.useCallback(e => {
                    (u.current = e ? getComputedStyle(e) : null), i(e);
                  }, []),
                }
              );
            })(t),
            u = 'function' == typeof n ? n({ present: i.isPresent }) : r.Children.only(n),
            c = (0, o.s)(
              i.ref,
              (function (e) {
                var t, n;
                let r =
                    null == (t = Object.getOwnPropertyDescriptor(e.props, 'ref')) ? void 0 : t.get,
                  o = r && 'isReactWarning' in r && r.isReactWarning;
                return o
                  ? e.ref
                  : (o =
                        (r =
                          null == (n = Object.getOwnPropertyDescriptor(e, 'ref'))
                            ? void 0
                            : n.get) &&
                        'isReactWarning' in r &&
                        r.isReactWarning)
                    ? e.props.ref
                    : e.props.ref || e.ref;
              })(u)
            );
          return 'function' == typeof n || i.isPresent ? r.cloneElement(u, { ref: c }) : null;
        };
      function a(e) {
        return (null == e ? void 0 : e.animationName) || 'none';
      }
      i.displayName = 'Presence';
    },
    9033: (e, t, n) => {
      n.d(t, { c: () => o });
      var r = n(2115);
      function o(e) {
        let t = r.useRef(e);
        return (
          r.useEffect(() => {
            t.current = e;
          }),
          r.useMemo(
            () =>
              (...e) =>
                t.current?.(...e),
            []
          )
        );
      }
    },
    9367: (e, t, n) => {
      n.d(t, { q: () => r });
      function r(e, [t, n]) {
        return Math.min(n, Math.max(t, e));
      }
    },
    9946: (e, t, n) => {
      n.d(t, { A: () => d });
      var r = n(2115);
      let o = e => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
        l = e =>
          e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => (n ? n.toUpperCase() : t.toLowerCase())),
        i = e => {
          let t = l(e);
          return t.charAt(0).toUpperCase() + t.slice(1);
        },
        a = function () {
          for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          return t
            .filter((e, t, n) => !!e && '' !== e.trim() && n.indexOf(e) === t)
            .join(' ')
            .trim();
        },
        u = e => {
          for (let t in e) if (t.startsWith('aria-') || 'role' === t || 'title' === t) return !0;
        };
      var c = {
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
      let s = (0, r.forwardRef)((e, t) => {
          let {
            color: n = 'currentColor',
            size: o = 24,
            strokeWidth: l = 2,
            absoluteStrokeWidth: i,
            className: s = '',
            children: d,
            iconNode: f,
            ...p
          } = e;
          return (0, r.createElement)(
            'svg',
            {
              ref: t,
              ...c,
              width: o,
              height: o,
              stroke: n,
              strokeWidth: i ? (24 * Number(l)) / Number(o) : l,
              className: a('lucide', s),
              ...(!d && !u(p) && { 'aria-hidden': 'true' }),
              ...p,
            },
            [
              ...f.map(e => {
                let [t, n] = e;
                return (0, r.createElement)(t, n);
              }),
              ...(Array.isArray(d) ? d : [d]),
            ]
          );
        }),
        d = (e, t) => {
          let n = (0, r.forwardRef)((n, l) => {
            let { className: u, ...c } = n;
            return (0, r.createElement)(s, {
              ref: l,
              iconNode: t,
              className: a('lucide-'.concat(o(i(e))), 'lucide-'.concat(e), u),
              ...c,
            });
          });
          return (n.displayName = i(e)), n;
        };
    },
  },
]);
