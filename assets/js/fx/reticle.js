/* mira que persegue o cursor com interpolação. só em ponteiro fino.
   um único rAF, parado quando não há movimento há 1.5s. */

import { $, reduced, pad } from "../lib/dom.js";

export function initReticle() {
  const node = $("#reticle"), coord = $("#reticle-coord");
  if (!node || reduced()) return;
  if (!matchMedia("(pointer:fine)").matches) return;

  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0, idle = 0;

  const loop = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    node.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
    if (Math.abs(tx - x) + Math.abs(ty - y) < 0.4) {
      raf = 0;
      idle = setTimeout(() => node.classList.remove("is-on"), 1500);
    } else raf = requestAnimationFrame(loop);
  };

  window.addEventListener("pointermove", (e) => {
    tx = e.clientX; ty = e.clientY;
    node.classList.add("is-on");
    clearTimeout(idle);
    coord.textContent = pad(tx, 4) + "," + pad(ty, 4);
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
  });
}