var app = (function () {
  "use strict";
  function t() {}
  function e(t) {
    return t();
  }
  function n() {
    return Object.create(null);
  }
  function o(t) {
    t.forEach(e);
  }
  function s(t) {
    return "function" == typeof t;
  }
  function r(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && "object" == typeof t) || "function" == typeof t;
  }
  function c(t, e) {
    t.appendChild(e);
  }
  function l(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function i(t) {
    t.parentNode.removeChild(t);
  }
  function a(t) {
    return document.createElement(t);
  }
  function u(t) {
    return document.createTextNode(t);
  }
  function f() {
    return u(" ");
  }
  function d(t, e, n, o) {
    return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o);
  }
  function m(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function p(t, e) {
    (e = "" + e), t.data !== e && (t.data = e);
  }
  function h(t, e) {
    (null != e || t.value) && (t.value = e);
  }
  let v;
  function g(t) {
    v = t;
  }
  function $() {
    if (!v) throw new Error("Function called outside component initialization");
    return v;
  }
  function b() {
    const t = $();
    return (e, n) => {
      const o = t.$$.callbacks[e];
      if (o) {
        const s = (function (t, e) {
          const n = document.createEvent("CustomEvent");
          return n.initCustomEvent(t, !1, !1, e), n;
        })(e, n);
        o.slice().forEach((e) => {
          e.call(t, s);
        });
      }
    };
  }
  const w = [],
    y = [],
    x = [],
    _ = [],
    E = Promise.resolve();
  let C = !1;
  function k(t) {
    x.push(t);
  }
  let A = !1;
  const S = new Set();
  function P() {
    if (!A) {
      A = !0;
      do {
        for (let t = 0; t < w.length; t += 1) {
          const e = w[t];
          g(e), j(e.$$);
        }
        for (w.length = 0; y.length; ) y.pop()();
        for (let t = 0; t < x.length; t += 1) {
          const e = x[t];
          S.has(e) || (S.add(e), e());
        }
        x.length = 0;
      } while (w.length);
      for (; _.length; ) _.pop()();
      (C = !1), (A = !1), S.clear();
    }
  }
  function j(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(k);
    }
  }
  const T = new Set();
  let D;
  function M() {
    D = { r: 0, c: [], p: D };
  }
  function N() {
    D.r || o(D.c), (D = D.p);
  }
  function q(t, e) {
    t && t.i && (T.delete(t), t.i(e));
  }
  function B(t, e, n, o) {
    if (t && t.o) {
      if (T.has(t)) return;
      T.add(t),
        D.c.push(() => {
          T.delete(t), o && (n && t.d(1), o());
        }),
        t.o(e);
    }
  }
  function L(t) {
    t && t.c();
  }
  function Y(t, n, r) {
    const { fragment: c, on_mount: l, on_destroy: i, after_update: a } = t.$$;
    c && c.m(n, r),
      k(() => {
        const n = l.map(e).filter(s);
        i ? i.push(...n) : o(n), (t.$$.on_mount = []);
      }),
      a.forEach(k);
  }
  function F(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (o(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function H(t, e) {
    -1 === t.$$.dirty[0] &&
      (w.push(t), C || ((C = !0), E.then(P)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function I(e, s, r, c, l, a, u = [-1]) {
    const f = v;
    g(e);
    const d = s.props || {},
      m = (e.$$ = {
        fragment: null,
        ctx: null,
        props: a,
        update: t,
        not_equal: l,
        bound: n(),
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(f ? f.$$.context : []),
        callbacks: n(),
        dirty: u,
      });
    let p = !1;
    if (
      ((m.ctx = r
        ? r(e, d, (t, n, ...o) => {
            const s = o.length ? o[0] : n;
            return (
              m.ctx &&
                l(m.ctx[t], (m.ctx[t] = s)) &&
                (m.bound[t] && m.bound[t](s), p && H(e, t)),
              n
            );
          })
        : []),
      m.update(),
      (p = !0),
      o(m.before_update),
      (m.fragment = !!c && c(m.ctx)),
      s.target)
    ) {
      if (s.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(s.target);
        m.fragment && m.fragment.l(t), t.forEach(i);
      } else m.fragment && m.fragment.c();
      s.intro && q(e.$$.fragment), Y(e, s.target, s.anchor), P();
    }
    g(f);
  }
  class O {
    $destroy() {
      F(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set() {}
  }
  function R(e) {
    let n, s, r, v, g, $, b, w, y, x, _, E;
    return {
      c() {
        (n = a("div")),
          (s = a("form")),
          (r = a("label")),
          (v = f()),
          (g = a("div")),
          ($ = a("input")),
          (b = f()),
          (w = a("div")),
          (y = u(e[1])),
          (x = f()),
          (_ = a("button")),
          (_.textContent = "Search movies"),
          m(r, "for", "search"),
          m(r, "class", "svelte-oobli9"),
          m($, "type", "text"),
          m($, "id", "search"),
          m($, "autocomplete", "off"),
          m($, "class", "svelte-oobli9"),
          m(w, "class", "error svelte-oobli9"),
          m(g, "class", "form-field svelte-oobli9"),
          m(_, "class", "button button-outline"),
          m(s, "class", "search svelte-oobli9"),
          m(n, "class", "form");
      },
      m(t, i, a) {
        var u;
        l(t, n, i),
          c(n, s),
          c(s, r),
          c(s, v),
          c(s, g),
          c(g, $),
          h($, e[0]),
          c(g, b),
          c(g, w),
          c(w, y),
          c(s, x),
          c(s, _),
          a && o(E),
          (E = [
            d($, "input", e[5]),
            d(
              n,
              "submit",
              ((u = e[2]),
              function (t) {
                return t.preventDefault(), u.call(this, t);
              })
            ),
          ]);
      },
      p(t, [e]) {
        1 & e && $.value !== t[0] && h($, t[0]), 2 & e && p(y, t[1]);
      },
      i: t,
      o: t,
      d(t) {
        t && i(n), o(E);
      },
    };
  }
  function z(t, e, n) {
    const o = b();
    let s,
      r = "",
      c = !1;
    return [
      s,
      r,
      () => {
        (c = !0),
          s.trim().length < 2 &&
            ((c = !1),
            n(1, (r = "Search string must be at least 2 characters long"))),
          c &&
            (console.log("Valid, dispatching search with:", s), o("search", s));
      },
      c,
      o,
      function () {
        (s = this.value), n(0, s);
      },
    ];
  }
  class V extends O {
    constructor(t) {
      super(), I(this, t, z, R, r, {});
    }
  }
  function G(e) {
    let n,
      o,
      s,
      r,
      h,
      v,
      g,
      $,
      b,
      w,
      y = e[0].Title + "",
      x = e[0].Year + "";
    return {
      c() {
        (n = a("div")),
          (o = a("h4")),
          (s = u(y)),
          (r = f()),
          (h = a("div")),
          (v = u(x)),
          (g = f()),
          ($ = a("img")),
          m(o, "class", "svelte-1hqsufa"),
          m(h, "class", "description"),
          $.src !== (b = e[0].Poster || "https://picsum.photos/400/300") &&
            m($, "src", b),
          m($, "alt", ""),
          m(n, "class", "card svelte-1hqsufa");
      },
      m(t, i, a) {
        l(t, n, i),
          c(n, o),
          c(o, s),
          c(n, r),
          c(n, h),
          c(h, v),
          c(n, g),
          c(n, $),
          a && w(),
          (w = d(n, "click", e[3]));
      },
      p(t, [e]) {
        1 & e && y !== (y = t[0].Title + "") && p(s, y),
          1 & e && x !== (x = t[0].Year + "") && p(v, x),
          1 & e &&
            $.src !== (b = t[0].Poster || "https://picsum.photos/400/300") &&
            m($, "src", b);
      },
      i: t,
      o: t,
      d(t) {
        t && i(n), w();
      },
    };
  }
  function J(t, e, n) {
    const o = b();
    let { movie: s } = e;
    const r = (t) => {
      o("detail", t);
    };
    return (
      (t.$set = (t) => {
        "movie" in t && n(0, (s = t.movie));
      }),
      [s, r, o, () => r(s.imdbID)]
    );
  }
  class K extends O {
    constructor(t) {
      super(), I(this, t, J, G, r, { movie: 0 });
    }
  }
  function Q(t, e, n) {
    const o = t.slice();
    return (o[2] = e[n]), o;
  }
  function U(t) {
    let e;
    const n = new K({ props: { movie: t[2] } });
    return (
      n.$on("detail", t[1]),
      {
        c() {
          L(n.$$.fragment);
        },
        m(t, o) {
          Y(n, t, o), (e = !0);
        },
        p(t, e) {
          const o = {};
          1 & e && (o.movie = t[2]), n.$set(o);
        },
        i(t) {
          e || (q(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          B(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          F(n, t);
        },
      }
    );
  }
  function W(t) {
    let e,
      n,
      o,
      s = t[0],
      r = [];
    for (let e = 0; e < s.length; e += 1) r[e] = U(Q(t, s, e));
    const u = (t) =>
      B(r[t], 1, 1, () => {
        r[t] = null;
      });
    return {
      c() {
        (e = a("div")), (n = a("div"));
        for (let t = 0; t < r.length; t += 1) r[t].c();
        m(n, "class", "movie-list svelte-a50mos"), m(e, "class", "container");
      },
      m(t, s) {
        l(t, e, s), c(e, n);
        for (let t = 0; t < r.length; t += 1) r[t].m(n, null);
        o = !0;
      },
      p(t, [e]) {
        if (1 & e) {
          let o;
          for (s = t[0], o = 0; o < s.length; o += 1) {
            const c = Q(t, s, o);
            r[o]
              ? (r[o].p(c, e), q(r[o], 1))
              : ((r[o] = U(c)), r[o].c(), q(r[o], 1), r[o].m(n, null));
          }
          for (M(), o = s.length; o < r.length; o += 1) u(o);
          N();
        }
      },
      i(t) {
        if (!o) {
          for (let t = 0; t < s.length; t += 1) q(r[t]);
          o = !0;
        }
      },
      o(t) {
        r = r.filter(Boolean);
        for (let t = 0; t < r.length; t += 1) B(r[t]);
        o = !1;
      },
      d(t) {
        t && i(e),
          (function (t, e) {
            for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
          })(r, t);
      },
    };
  }
  function X(t, e, n) {
    let { movies: o = [] } = e;
    return (
      (t.$set = (t) => {
        "movies" in t && n(0, (o = t.movies));
      }),
      [
        o,
        function (e) {
          !(function (t, e) {
            const n = t.$$.callbacks[e.type];
            n && n.slice().forEach((t) => t(e));
          })(t, e);
        },
      ]
    );
  }
  class Z extends O {
    constructor(t) {
      super(), I(this, t, X, W, r, { movies: 0 });
    }
  }
  function tt(t) {
    let e,
      n,
      o,
      s,
      r,
      h,
      v,
      g,
      $,
      b,
      w,
      y,
      x,
      _,
      E,
      C,
      k,
      A,
      S,
      P,
      j,
      T,
      D,
      M,
      N,
      q,
      B,
      L,
      Y,
      F,
      H,
      I = t[0].Title + "",
      O = t[0].Year + "",
      R = t[0].Plot + "",
      z = t[0].Actors + "",
      V = t[0].imdbRating + "",
      G = t[0].Awards && et(t);
    return {
      c() {
        (e = a("div")),
          (n = a("div")),
          (o = a("div")),
          (s = a("h2")),
          (r = u(I)),
          (h = f()),
          (v = a("p")),
          (g = u(O)),
          ($ = f()),
          (b = a("div")),
          (w = a("div")),
          (y = a("img")),
          (_ = f()),
          (E = a("div")),
          (C = a("strong")),
          (C.textContent = "Plot"),
          (k = f()),
          (A = a("p")),
          (S = u(R)),
          (P = f()),
          (j = a("strong")),
          (j.textContent = "Cast"),
          (T = f()),
          (D = a("p")),
          (M = u(z)),
          (N = f()),
          (q = a("p")),
          (B = u("IMDB rating:\r\n              ")),
          (L = a("strong")),
          (Y = u(V)),
          (F = f()),
          G && G.c(),
          m(s, "class", "svelte-130x2ey"),
          m(v, "class", "year svelte-130x2ey"),
          y.src !== (x = t[0].Poster) && m(y, "src", x),
          m(y, "alt", ""),
          m(y, "class", "poster svelte-130x2ey"),
          m(w, "class", "column svelte-130x2ey"),
          m(A, "class", "plot svelte-130x2ey"),
          m(q, "class", "imdb"),
          m(E, "class", "column svelte-130x2ey"),
          m(b, "class", "twocols svelte-130x2ey"),
          m(o, "class", "content svelte-130x2ey"),
          m(n, "class", "info svelte-130x2ey"),
          m(e, "class", "wrapper");
      },
      m(i, a, u) {
        l(i, e, a),
          c(e, n),
          c(n, o),
          c(o, s),
          c(s, r),
          c(o, h),
          c(o, v),
          c(v, g),
          c(o, $),
          c(o, b),
          c(b, w),
          c(w, y),
          c(b, _),
          c(b, E),
          c(E, C),
          c(E, k),
          c(E, A),
          c(A, S),
          c(E, P),
          c(E, j),
          c(E, T),
          c(E, D),
          c(D, M),
          c(E, N),
          c(E, q),
          c(q, B),
          c(q, L),
          c(L, Y),
          c(E, F),
          G && G.m(E, null),
          u && H(),
          (H = d(n, "click", t[3]));
      },
      p(t, e) {
        1 & e && I !== (I = t[0].Title + "") && p(r, I),
          1 & e && O !== (O = t[0].Year + "") && p(g, O),
          1 & e && y.src !== (x = t[0].Poster) && m(y, "src", x),
          1 & e && R !== (R = t[0].Plot + "") && p(S, R),
          1 & e && z !== (z = t[0].Actors + "") && p(M, z),
          1 & e && V !== (V = t[0].imdbRating + "") && p(Y, V),
          t[0].Awards
            ? G
              ? G.p(t, e)
              : ((G = et(t)), G.c(), G.m(E, null))
            : G && (G.d(1), (G = null));
      },
      d(t) {
        t && i(e), G && G.d(), H();
      },
    };
  }
  function et(t) {
    let e,
      n,
      o,
      s,
      r = t[0].Awards + "";
    return {
      c() {
        (e = a("strong")),
          (e.textContent = "Awards"),
          (n = f()),
          (o = a("p")),
          (s = u(r));
      },
      m(t, r) {
        l(t, e, r), l(t, n, r), l(t, o, r), c(o, s);
      },
      p(t, e) {
        1 & e && r !== (r = t[0].Awards + "") && p(s, r);
      },
      d(t) {
        t && i(e), t && i(n), t && i(o);
      },
    };
  }
  function nt(e) {
    let n,
      o = e[0] && tt(e);
    return {
      c() {
        o && o.c(), (n = u(""));
      },
      m(t, e) {
        o && o.m(t, e), l(t, n, e);
      },
      p(t, [e]) {
        t[0]
          ? o
            ? o.p(t, e)
            : ((o = tt(t)), o.c(), o.m(n.parentNode, n))
          : o && (o.d(1), (o = null));
      },
      i: t,
      o: t,
      d(t) {
        o && o.d(t), t && i(n);
      },
    };
  }
  function ot(t, e, n) {
    const o = b();
    let { movie: s } = e;
    const r = () => {
      console.log("Clicked removedetail"), o("removeDetail");
    };
    return (
      (t.$set = (t) => {
        "movie" in t && n(0, (s = t.movie));
      }),
      [s, r, o, () => r()]
    );
  }
  class st extends O {
    constructor(t) {
      super(), I(this, t, ot, nt, r, { movie: 0 });
    }
  }
  function rt(e) {
    let n;
    return {
      c() {
        (n = a("div")),
          (n.textContent = "Freethrow.rs svelte.js omdb api yolo"),
          m(n, "class", "footer svelte-bq93b5");
      },
      m(t, e) {
        l(t, n, e);
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && i(n);
      },
    };
  }
  class ct extends O {
    constructor(t) {
      super(), I(this, t, null, rt, r, {});
    }
  }
  function lt(t) {
    let e;
    const n = new st({ props: { movie: t[1] } });
    return (
      n.$on("removeDetail", t[6]),
      {
        c() {
          L(n.$$.fragment);
        },
        m(t, o) {
          Y(n, t, o), (e = !0);
        },
        p(t, e) {
          const o = {};
          2 & e && (o.movie = t[1]), n.$set(o);
        },
        i(t) {
          e || (q(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          B(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          F(n, t);
        },
      }
    );
  }
  function it(e) {
    let n;
    return {
      c() {
        (n = a("div")),
          (n.innerHTML =
            '<h4>\n        Sadly, we couldn&#39;t find anything with\n        <span class="ultra svelte-lsa5o0">that string</span></h4>'),
          m(n, "class", "no-results svelte-lsa5o0");
      },
      m(t, e) {
        l(t, n, e);
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && i(n);
      },
    };
  }
  function at(t) {
    let e;
    const n = new Z({ props: { movies: t[0] } });
    return (
      n.$on("detail", t[3]),
      {
        c() {
          L(n.$$.fragment);
        },
        m(t, o) {
          Y(n, t, o), (e = !0);
        },
        p(t, e) {
          const o = {};
          1 & e && (o.movies = t[0]), n.$set(o);
        },
        i(t) {
          e || (q(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          B(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          F(n, t);
        },
      }
    );
  }
  function ut(t) {
    let e, n, o, s, r, u, d, p, h, v, g, $;
    const b = new V({});
    b.$on("search", t[2]);
    let w = t[1] && lt(t);
    const y = [at, it],
      x = [];
    function _(t, e) {
      return t[0] ? 0 : 1;
    }
    (h = _(t)), (v = x[h] = y[h](t));
    const E = new ct({});
    return {
      c() {
        (e = a("main")),
          (n = a("h1")),
          (n.textContent = "Freethrow Movie Search"),
          (o = f()),
          (s = a("p")),
          (s.innerHTML =
            '\n    By yours truly\n    <a href="https://www.freethrow.rs">freethrow.rs</a>\n    a simple\n    <span class="ultra svelte-lsa5o0">warp speed</span>\n    movie search app, built with Svelte.js.\n  '),
          (r = f()),
          L(b.$$.fragment),
          (u = f()),
          w && w.c(),
          (d = f()),
          (p = a("section")),
          v.c(),
          (g = f()),
          L(E.$$.fragment),
          m(e, "class", "svelte-lsa5o0"),
          m(p, "id", "results");
      },
      m(t, i) {
        l(t, e, i),
          c(e, n),
          c(e, o),
          c(e, s),
          c(e, r),
          Y(b, e, null),
          c(e, u),
          w && w.m(e, null),
          l(t, d, i),
          l(t, p, i),
          x[h].m(p, null),
          l(t, g, i),
          Y(E, t, i),
          ($ = !0);
      },
      p(t, [n]) {
        t[1]
          ? w
            ? (w.p(t, n), 2 & n && q(w, 1))
            : ((w = lt(t)), w.c(), q(w, 1), w.m(e, null))
          : w &&
            (M(),
            B(w, 1, 1, () => {
              w = null;
            }),
            N());
        let o = h;
        (h = _(t)),
          h === o
            ? x[h].p(t, n)
            : (M(),
              B(x[o], 1, 1, () => {
                x[o] = null;
              }),
              N(),
              (v = x[h]),
              v || ((v = x[h] = y[h](t)), v.c()),
              q(v, 1),
              v.m(p, null));
      },
      i(t) {
        $ || (q(b.$$.fragment, t), q(w), q(v), q(E.$$.fragment, t), ($ = !0));
      },
      o(t) {
        B(b.$$.fragment, t), B(w), B(v), B(E.$$.fragment, t), ($ = !1);
      },
      d(t) {
        t && i(e),
          F(b),
          w && w.d(),
          t && i(d),
          t && i(p),
          x[h].d(),
          t && i(g),
          F(E, t);
      },
    };
  }
  function ft(t, e, n) {
    let o = [],
      s = null,
      r = !1;
    var c;
    (c = async () => {
      fetch("https://www.omdbapi.com/?apikey=e14c5aa7&s=bad")
        .then((t) => t.json())
        .then((t) => {
          console.log(t), n(0, (o = t.Search));
        });
    }),
      $().$$.on_mount.push(c);
    const l = (t) => {
      n(1, (s = null));
    };
    return [
      o,
      s,
      (t) => {
        let e = t.detail;
        fetch("https://www.omdbapi.com/?apikey=e14c5aa7&s=" + e)
          .then((t) => t.json())
          .then((t) => {
            console.log(t),
              t.Search || ((r = !0), console.log("No results!")),
              n(0, (o = t.Search)),
              (r = !1);
          });
      },
      (t) => {
        console.log("Event made it to the top app.svelte!");
        let e =
          "https://www.omdbapi.com/?apikey=e14c5aa7&plot=full&i=" + t.detail;
        fetch(e)
          .then((t) => t.json())
          .then((t) => {
            console.log(t), n(1, (s = t));
          });
      },
      l,
      r,
      () => l(),
    ];
  }
  return new (class extends O {
    constructor(t) {
      super(), I(this, t, ft, ut, r, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
