/* sequência de arranque. bloqueia visualmente ~1.2s, corta a seco.
   qualquer tecla/clique salta. reduzido-movimento => salta sozinho. */

import { $, reduced } from "../lib/dom.js";

const paint = (log, line) => {
  const html = line
    .replace(/\[  OK  \]/g, "<b>[  OK  ]</b>")
    .replace(/\[ WARN \]/g, "<b>[ WARN ]</b>")
    .replace(/\[ \.\.\.\.\ ]/g, "<i>[ .... ]</i>");
  log.insertAdjacentHTML("beforeend", html + "\n");
};

export function runBoot(lines = [], done = () => {}) {
  const ov = $("#boot"), log = $("#boot-log");
  if (!ov || !log) return done();

  if (reduced() || location.hash.includes("noboot")) {
    ov.hidden = true;
    return done();
  }

  let i = 0, timer = null;
  const finish = () => {
    clearTimeout(timer);
    ov.classList.add("is-flash");
    setTimeout(() => {
      ov.classList.add("is-out");
      setTimeout(() => { ov.hidden = true; }, 520);
      done();
    }, 190);
    window.removeEventListener("keydown", finish);
    window.removeEventListener("pointerdown", finish);
  };

  const step = () => {
    if (i < lines.length) {
      paint(log, lines[i++]);
      timer = setTimeout(step, 90 + Math.random() * 90);
    } else finish();
  };

  window.addEventListener("keydown", finish, { once: true });
  window.addEventListener("pointerdown", finish, { once: true });
  step();
}

/* encerramento: reimprime o overlay com outras linhas e devolve tudo. */
export function runShutdown(lines = []) {
  const ov = $("#boot"), log = $("#boot-log");
  if (!ov || !log || reduced()) return;
  log.textContent = "";
  ov.hidden = false;
  ov.classList.remove("is-out", "is-flash");
  let i = 0;
  const step = () => {
    if (i < lines.length) {
      paint(log, lines[i++]);
      setTimeout(step, 260);
    } else {
      setTimeout(() => {
        ov.classList.add("is-out");
        setTimeout(() => { ov.hidden = true; log.textContent = ""; }, 520);
      }, 700);
    }
  };
  step();
}