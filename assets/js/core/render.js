/* data -> DOM. um renderizador por secção, todos com a mesma assinatura:
   (dados) => Node. sem estado, sem efeitos secundários além do nodo. */

import { el, $, clear, pad } from "../lib/dom.js";
import { placeholderURI } from "../lib/placeholder.js";

let GALLERY = [];   // cache para o lightbox ler

/* ---------- peças partilhadas ---------- */

function sechead(d) {
  return el("div", { class: "sechead" }, [
    el("span", { class: "sechead__num", text: d.num }),
    el("h2", { class: "sechead__title", "data-scramble": "", text: d.titulo }),
    el("span", { class: "sechead__rule" }),
    el("span", { class: "sechead__path", text: d.caminho }),
    d.nota ? el("p", { class: "sechead__note", text: d.nota }) : null,
  ]);
}

const foot = (l, r) =>
  el("div", { class: "secfoot" }, [
    el("span", {}, [l]),
    el("span", {}, [el("b", { text: r })]),
  ]);

function imgOr(node, src, alt, index, label) {
  return el("img", {
    src: src && String(src).trim() ? src : placeholderURI(index, label),
    alt: alt || "",
    loading: "lazy",
    decoding: "async",
  });
}

/* ---------- 00 · hero ---------- */

function renderHero(h) {
  const lines = h.nome.map((word, i) =>
    el("span", {
      class: "mega hero__line " + (i % 2 ? "mega--outline" : "mega--bone"),
      "data-text": word,
      text: word,
    })
  );

  const sigil = el("div", { class: "sigil", "aria-hidden": "true" }, [
    el("div", {
      html: `<svg viewBox="0 0 200 200">
        <g class="rot" fill="none" stroke="currentColor" stroke-width="1" opacity=".35">
          <circle cx="100" cy="100" r="96" stroke-dasharray="3 7"/>
        </g>
        <g class="rot-r">
          <circle cx="100" cy="100" r="74" fill="none" stroke="#5f7488" stroke-width="1.5"/>
          <path d="M100 26 174 100 100 174 26 100Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
        </g>
        <path d="M100 100 m-52 0 a52 52 0 0 1 104 0Z" fill="#ff2b17"/>
        <circle cx="100" cy="100" r="52" fill="none" stroke="#ff2b17" stroke-width="2.5"/>
        <path d="M100 8v56M100 136v56M8 100h56M136 100h56" stroke="currentColor" stroke-width="1.5"/>
        <rect x="96" y="96" width="8" height="8" fill="currentColor"/>
      </svg>`,
    }),
    el("span", { class: "cap", text: h.sigil?.codigo ?? "" }),
  ]);

  return el("div", { class: "hero" }, [
    el("div", {}, [
      el("div", { class: "hero__imp" }, [
        el("span", { class: "bar" }),
        el("span", { class: "bar bar--b" }),
        el("span", { class: "micro micro--sig", text: h.ep }),
        el("span", { class: "micro", text: h.impressao }),
      ]),
      el("div", { class: "hero__name", "data-reveal": "" }, lines),
      el("p", { class: "serif hero__say", "data-reveal": "", style: "--i:1", text: h.frase }),
      el("p", { class: "hero__sum", "data-reveal": "", style: "--i:2", html: h.resumo }),
      el("dl", { class: "meta", "data-reveal": "", style: "--i:3" },
        h.dados.map((d) => el("div", {}, [
          el("dt", { text: d.k }),
          el("dd", { text: d.v }),
        ]))
      ),
      el("div", { class: "acts", "data-reveal": "", style: "--i:4" },
        h.acoes.map((a) =>
          el("a", {
            class: "btn" + (a.solido ? " btn--solid" : ""),
            href: a.href,
            target: a.externo ? "_blank" : null,
            rel: a.externo ? "noopener noreferrer" : null,
          }, [a.label, el("i", { text: a.seta ?? "→" })])
        )
      ),
    ]),
    el("div", { "data-reveal": "", style: "--i:2" }, [sigil]),
  ]);
}

/* ---------- 01 · about ---------- */

function renderAbout(a) {
  return el("div", {}, [
    sechead(a),
    el("div", { class: "cols cols--about" }, [
      el("div", {}, [
        el("div", { class: "prose", "data-reveal": "" },
          a.paragrafos.map((p) => el("p", { html: p }))),
        el("blockquote", { class: "quote", "data-reveal": "", style: "--i:1" }, [
          el("p", { text: "« " + a.citacao.texto + " »" }),
          el("cite", { text: a.citacao.fonte }),
        ]),
      ]),
      el("div", {}, [
        el("div", { class: "sheet", "data-reveal": "", style: "--i:1" }, [
          el("div", { class: "sheet__hd" }, [
            el("span", { class: "micro", text: "ficha" }),
            el("span", { class: "micro micro--sig", text: a.num + "/05" }),
          ]),
          el("dl", {}, a.ficha.flatMap((f) => [
            el("dt", { text: f.k }),
            el("dd", { text: f.v }),
          ])),
        ]),
        el("div", { class: "chips", "data-reveal": "", style: "--i:2" },
          a.interesses.map((t) => el("span", { class: "chip", text: t }))),
      ]),
    ]),
    foot("end of file", "readme.txt · utf-8"),
  ]);
}

/* ---------- 02 · projects ---------- */

function renderProjects(p) {
  const cards = p.itens.map((it, i) =>
    el("article", { class: "card", "data-reveal": "", id: "proj-" + it.id, style: `--i:${i % 4}` }, [
      el("div", { class: "card__thumb" }, [
        el("span", { class: "card__type", text: it.tipo }),
        imgOr(null, it.thumb, it.nome, i + 1, it.nome),
      ]),
      el("div", { class: "card__body" }, [
        el("div", { class: "card__hd" }, [
          el("h3", { class: "card__name", text: it.nome }),
          el("span", { class: "card__year", text: it.ano }),
        ]),
        el("p", { class: "card__desc", text: it.desc }),
        el("div", { class: "card__tags" }, it.tags.map((t) => el("span", { text: t }))),
        el("div", { class: "card__links" }, it.links.map((l) =>
          el("a", { href: l.href, target: "_blank", rel: "noopener noreferrer" }, [
            l.label, " ↗",
          ]))),
      ]),
    ])
  );
  return el("div", {}, [
    sechead(p),
    el("div", { class: "cards" }, cards),
    foot(`${pad(p.itens.length)} entradas`, "ls -l · total " + p.itens.length),
  ]);
}

/* ---------- 03 · gallery ---------- */

function renderGallery(g) {
  GALLERY = g.itens;
  const tiles = g.itens.map((it, i) =>
    el("button", {
      class: "gal__item",
      type: "button",
      "data-size": it.size || "",
      "data-reveal": "",
      style: `--i:${i % 6}`,
      "data-gal": i,
      "aria-label": "ampliar: " + it.legenda,
    }, [
      imgOr(null, it.src, it.legenda, i + 2, it.legenda),
      el("span", { class: "gal__cap" }, [
        el("b", { text: pad(i + 1) }),
        it.legenda,
      ]),
    ])
  );
  return el("div", {}, [
    sechead(g),
    el("div", { class: "gal" }, tiles),
    foot(`${pad(g.itens.length)} frames`, "v4l2 · capture"),
  ]);
}

/* ---------- 04 · links ---------- */

function renderLinks(l) {
  return el("div", {}, [
    sechead(l),
    ...l.grupos.map((grp) =>
      el("div", { class: "lgroup", "data-reveal": "" }, [
        el("div", { class: "lgroup__hd" }, [
          el("h3", { text: grp.titulo }),
          el("span", { class: "ln" }),
          el("span", { class: "micro", text: pad(grp.itens.length) + " itens" }),
        ]),
        el("div", { class: "rows" }, grp.itens.map((it) =>
          el("a", {
            class: "row",
            href: it.href,
            target: it.href.startsWith("http") ? "_blank" : null,
            rel: it.href.startsWith("http") ? "noopener noreferrer" : null,
          }, [
            el("span", { class: "row__perm", text: it.perm ?? "-rw-r--r--" }),
            el("span", { class: "row__label", text: it.label }),
            el("span", { class: "row__nota", text: it.nota ?? "" }),
            el("span", { class: "row__arw", text: "→" }),
          ])
        )),
      ])
    ),
    foot("ln -s", "symlinks resolvidos"),
  ]);
}

/* ---------- 05 · colophon ---------- */

function renderColophon(c) {
  return el("div", {}, [
    sechead(c),
    el("div", { class: "colo", "data-reveal": "" }, c.blocos.map((b) =>
      el("div", {}, [
        el("h4", { text: b.h }),
        b.p ? (b.link ? el("p", {}, [el("a", { href: b.link, text: b.linkLabel ?? b.p })])
                       : el("p", { text: b.p })) : null,
        b.ul ? el("ul", {}, b.ul.map((x) => el("li", { text: "· " + x }))) : null,
      ])
    )),
    el("p", { class: "micro", style: "margin-top:1.6rem;color:var(--line)", text: c.licenca }),
  ]);
}

/* ---------- ticker ---------- */

function renderTicker(items) {
  const half = el("span", {}, [items.join("  ·  ")]);
  return [half, half.cloneNode(true)];
}

/* ---------- ponto de entrada ---------- */

export function renderAll(C) {
  const mounts = {
    hero: renderHero(C.hero),
    about: renderAbout(C.about),
    projects: renderProjects(C.projects),
    gallery: renderGallery(C.gallery),
    links: renderLinks(C.links),
    colophon: renderColophon(C.colophon),
  };
  for (const [key, node] of Object.entries(mounts)) {
    const host = $(`[data-mount="${key}"]`);
    if (host) clear(host).append(node);
  }
  const tk = $("#ticker");
  if (tk) clear(tk).append(...renderTicker(C.ticker));

  document.title = C.meta.titulo;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", C.meta.descricao);
}

export const getGallery = () => GALLERY;