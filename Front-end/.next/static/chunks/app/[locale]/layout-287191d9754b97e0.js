(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [450],
  {
    3127: e => {
      e.exports = {
        style: { fontFamily: "'Inter', 'Inter Fallback'", fontStyle: 'normal' },
        className: '__className_d65c78',
      };
    },
    5902: (e, l, r) => {
      Promise.resolve().then(r.bind(r, 6096)), Promise.resolve().then(r.t.bind(r, 3127, 23));
    },
    6096: (e, l, r) => {
      'use strict';
      r.d(l, { default: () => a });
      var s = r(6453),
        t = r(5155);
      function a(e) {
        let { locale: l, ...r } = e;
        if (!l) throw Error(void 0);
        return (0, t.jsx)(s.Dk, { locale: l, ...r });
      }
    },
  },
  e => {
    var l = l => e((e.s = l));
    e.O(0, [714, 453, 441, 684, 358], () => l(5902)), (_N_E = e.O());
  },
]);
