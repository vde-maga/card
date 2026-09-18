/* decodificação por permutação: cada caractere assenta na posição final
   depois de n frames de glifos aleatórios. barato, só escreve textContent. */

import { reduced } from "../lib/dom.js";

const GLYPHS = "▚▞█▓▒░/\\|<>+*#§0123456789ABCDEFXYZ";
const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

export function scramble(node, { speed = 2.2, delay = 0 } = {}) {
  if (!node || node.dataset.scrambled === "1") return;
  const target = node.textContent;
  if (reduced()) { node.dataset.scrambled = "1"; return; }

  node.dataset.scrambled = "1";
  node.classList.add("is-scrambling");
  const state = target.split("").map((ch, i) => ({ ch, start: i * speed, end: i * speed + 6 + Math.random() * 12 }));
  let frame = 0;

  const tick = () => {
    const t = frame - delay;
    node.textContent = state
      .map((s) => (t < s.start ? "" : t < s.end ? (s.ch === " " ? " " : rand()) : s.ch))
      .join("");
    frame++;
    if (t < state[state.length - 1].end) requestAnimationFrame(tick);
    else { node.textContent = target; node.classList.remove("is-scrambling"); }
  };
  requestAnimationFrame(tick);
}