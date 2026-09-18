/* init: render primeiro (o DOM tem de existir), depois os efeitos.
   cada módulo cai dentro do seu try/catch — um fx partido não parte o site. */

import { CONTENT } from "./data/content.js";
import { renderAll, getGallery } from "./core/render.js";
import { runBoot } from "./core/boot.js";
import { initReveal } from "./fx/reveal.js";
import { initReticle } from "./fx/reticle.js";
import { initStatus } from "./fx/statusbar.js";
import { initLightbox } from "./fx/lightbox.js";
import { initTerm } from "./fx/term.js";
import { $, $$ } from "./lib/dom.js";

const safe = (name, fn) => { try { return fn(); } catch (e) { console.error("[fx:" + name + "]", e); } };

function scrollTo_(id) {
  const t = $("#" + id);
  if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initGlitch() {
  const host = $(".hero__name");
  if (!host) return;
  const loop = () => {
    host.classList.add("is-glitching");
    setTimeout(() => host.classList.remove("is-glitching"), 190);
    setTimeout(loop, 6000 + Math.random() * 9000);
  };
  setTimeout(loop, 3200);
}

function boot_() {
  safe("render", () => renderAll(CONTENT));

  const status = safe("status", () => initStatus()) ?? {};
  const lb = safe("lightbox", () => initLightbox(getGallery)) ?? {};
  const term = safe("term", () => initTerm(CONTENT, {
    go: scrollTo_,
    frame: (i) => { lb.open?.(i); },
  })) ?? {};

  safe("reveal", () => initReveal((id) => status.setPath?.(id)));
  safe("reticle", initReticle);
  safe("glitch", initGlitch);

  /* atalhos globais: r = redline, s = sinal */
  document.addEventListener("keydown", (e) => {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key === "r") term.run?.("theme " + (document.documentElement.dataset.mode === "nerv" ? "redline" : "nerv"));
    if (e.key === "s") term.run?.("signal " + ($("html").dataset.signal === "off" ? "on" : "off"));
  });

  runBoot(CONTENT.boot, () => $$("[data-reveal]").forEach((n) => n.classList.add("is-in")));
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot_)
  : boot_();