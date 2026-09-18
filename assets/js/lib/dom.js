/* alloc/free do DOM. nenhum innerHTML com dados do utilizador fora daqui. */

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function el(tag, attrs = null, kids = []) {
  const n = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;              // só para markup interno nosso
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
  }
  for (const c of [].concat(kids)) {
    if (c == null || c === false) continue;
    n.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return n;
}

export const frag = (...kids) => {
  const f = document.createDocumentFragment();
  for (const k of kids.flat()) if (k) f.append(k);
  return f;
};

export const pad  = (n, w = 2) => String(n).padStart(w, "0");
export const hex  = (n) => "0x" + (n >>> 0).toString(16).toUpperCase().padStart(4, "0");
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const clear = (node) => { while (node.firstChild) node.removeChild(node.firstChild); return node; };
export const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;