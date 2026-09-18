/* visualizador da galeria: teclado, clique no fundo, contador, foco devolvido. */

import { $, pad } from "../lib/dom.js";
import { placeholderURI } from "../lib/placeholder.js";

export function initLightbox(getItems) {
  const box = $("#lightbox"), img = $("#lb-img"), cap = $("#lb-cap"), cnt = $("#lb-count");
  if (!box) return {};
  let idx = 0, last = null;

  const show = (i) => {
    const items = getItems();
    if (!items.length) return;
    idx = (i + items.length) % items.length;
    const it = items[idx];
    img.src = it.src && String(it.src).trim() ? it.src : placeholderURI(idx + 2, it.legenda);
    img.alt = it.legenda;
    cap.innerHTML = "";
    cap.append(document.createTextNode(it.legenda ?? ""));
    cap.append(Object.assign(document.createElement("span"), { textContent: " · " + (it.meta ?? "") }));
    cnt.textContent = pad(idx + 1) + "/" + pad(items.length);
  };

  const open = (i, trigger) => {
    last = trigger ?? document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  };
  const close = () => {
    box.hidden = true;
    document.body.style.overflow = "";
    last?.focus?.();
  };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-gal]");
    if (t) open(Number(t.dataset.gal), t);
  });
  $("#lb-close")?.addEventListener("click", close);
  $("#lb-prev")?.addEventListener("click", () => show(idx - 1));
  $("#lb-next")?.addEventListener("click", () => show(idx + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });

  return { open, close, show };
}