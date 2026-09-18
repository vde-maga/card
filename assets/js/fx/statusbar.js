/* relógio, posição de scroll em hex, barra de progresso, paleta.
   tudo num único loop de rAF + um setInterval de 1s para o relógio. */

import { $, pad, hex, clamp } from "../lib/dom.js";

const T0 = Date.now();
export const uptime = () => {
  const s = ((Date.now() - T0) / 1000) | 0;
  return `${pad((s / 3600) | 0)}:${pad(((s / 60) | 0) % 60)}:${pad(s % 60)}`;
};

export function setMode(mode) {
  document.documentElement.dataset.mode = mode;
  try { localStorage.setItem("nerv.mode", mode); } catch {}
}
export function getMode() {
  try { return localStorage.getItem("nerv.mode") || "nerv"; } catch { return "nerv"; }
}

export function initStatus() {
  const clock = $("#clock"), utc = $("#clock-utc"), pos = $("#scroll-pos");
  const bar = $("#progress-bar"), path = $("#active-path"), mark = $("[data-mode-toggle]");
  const year = $("#rail-year");

  setMode(getMode());
  if (year) year.textContent = new Date().getFullYear();

  const tickClock = () => {
    if (!clock) return;
    const d = new Date();
    clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    const off = -d.getTimezoneOffset() / 60;
    utc.textContent = "UTC" + (off >= 0 ? "+" : "") + off;
  };
  tickClock();
  setInterval(tickClock, 1000);

  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const y = window.scrollY;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
      if (pos) pos.textContent = hex(y);
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = () => setMode(getMode() === "nerv" ? "redline" : "nerv");
  mark?.addEventListener("click", toggle);
  mark?.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });

  return {
    setPath: (id) => { if (path) path.textContent = "~/" + id; },
  };
}