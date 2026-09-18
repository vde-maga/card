/* um só IntersectionObserver para: revelar blocos, disparar scramble nos
   títulos e marcar a secção activa na barra de estado. */

import { $$ } from "../lib/dom.js";
import { scramble } from "./scramble.js";

export function initReveal(onSection = () => {}) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const n = e.target;
      n.classList.add("is-in");
      $$("[data-scramble]", n).forEach((t) => scramble(t));
      if (n.hasAttribute("data-scramble")) scramble(n);
      io.unobserve(n);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  $$("[data-reveal],[data-mask],[data-scramble]").forEach((n) => io.observe(n));

  /* secção activa */
  const so = new IntersectionObserver((entries) => {
    const vis = entries.filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (vis) onSection(vis.target.id, vis.target.dataset.path ?? "~");
  }, { threshold: [0.2, 0.5], rootMargin: "-15% 0px -55% 0px" });

  $$(".sec").forEach((s) => so.observe(s));
}