/* consola. um mapa de comandos, um buffer, histórico e tab-completion.
   nada aqui sabe como o site é feito — só conhece o DOM público e o CONTENT. */

import { $, $$, el, clear, pad } from "../lib/dom.js";
import { uptime, setMode, getMode } from "./statusbar.js";
import { runShutdown } from "../core/boot.js";

export function initTerm(C, api = {}) {
  const form = $("#term"), input = $("#term-input"), out = $("#term-out");
  if (!form || !input || !out) return;

  const hist = [];
  let hp = -1;
  const SECTIONS = ["hero", "about", "projects", "gallery", "links", "colophon"];

  out.classList.add("is-open");
  clear(out);

  const print = (text = "", cls = "t-out") => {
    out.append(el("div", { class: cls, text }));
    out.scrollTop = out.scrollHeight;
  };
  const printBlock = (lines, cls = "t-out") => lines.forEach((l) => print(l, cls));

  const cmds = {
    help: () => {
      print("comandos disponíveis:", "t-ok");
      printBlock(C.terminal.ajuda);
    },
    ls: () => {
      print("total " + pad(SECTIONS.length));
      SECTIONS.forEach((s, i) =>
        print(pad(i) + "  drwxr-xr-x  n.marques  " + (s === "hero" ? "./" : "./" + s), "t-ok"));
    },
    pwd: () => print("/home/n.marques/index"),
    whoami: () => print(C.meta.autor + " — software, imagem, ruído"),
    date: () => print(new Date().toString()),
    cat: (arg) => {
      if (arg === "readme.txt" || !arg) api.go?.("about");
      else print("cat: " + arg + ": ficheiro não encontrado", "t-err");
    },
    cd: (arg) => cmds.go(arg),
    go: (arg) => {
      const t = String(arg ?? "").replace(/^\.?\/*/, "").trim();
      if (!t) return print("uso: cd ./seccao", "t-err");
      if (!SECTIONS.includes(t)) return print("cd: " + t + ": directório inexistente", "t-err");
      print("→ ./" + t, "t-ok");
      api.go?.(t);
    },
    open: (arg) => {
      const n = parseInt(arg, 10);
      const it = Number.isFinite(n) ? C.projects.itens[n - 1] : C.projects.itens.find((x) => x.id === arg);
      if (!it) return print("open: projeto '" + arg + "' desconhecido (1.." + C.projects.itens.length + ")", "t-err");
      const l = it.links?.[0];
      print("a abrir " + (l?.href ?? "about:blank"), "t-ok");
      if (l) window.open(l.href, "_blank", "noopener");
    },
    img: (arg) => {
      const n = parseInt(arg, 10);
      if (!Number.isFinite(n) || n < 1 || n > C.gallery.itens.length)
        return print("img: frame '" + arg + "' fora de gama", "t-err");
      api.frame?.(n - 1);
    },
    theme: (arg) => {
      const m = String(arg ?? "").trim();
      if (m !== "nerv" && m !== "redline") return print("temas: nerv | redline", "t-err");
      setMode(m);
      print("paleta → " + m, "t-ok");
    },
    signal: (arg) => {
      const on = String(arg ?? "").trim() !== "off";
      document.documentElement.dataset.signal = on ? "on" : "off";
      print("camada crt " + (on ? "activa" : "desligada"), "t-ok");
    },
    neofetch: () => {
      const up = uptime();
      printBlock(C.terminal.ascii.map((l) => l.replace("{uptime}", up)), "t-ok");
    },
    exit: () => {
      print("a desligar...", "t-ok");
      runShutdown(C.shutdown);
    },
    sudo: () => print("n.marques não está no ficheiro sudoers. este incidente será reportado.", "t-err"),
    clear: () => { clear(out); out.classList.add("is-open"); },
  };
  cmds["?"] = cmds.help;

  const run = (raw) => {
    const line = raw.trim();
    print(C.terminal.ps1 + " " + line, "t-echo");
    if (!line) return;
    const [name, ...rest] = line.split(/\s+/);
    const fn = cmds[name.toLowerCase()];
    if (!fn) return print("zsh: command not found: " + name + "  (tenta 'help')", "t-err");
    try { fn(rest.join(" ")); } catch (e) { print("erro: " + e.message, "t-err"); }
  };
  window.NERV = { run };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    if (input.value.trim()) { hist.unshift(input.value); hp = -1; }
    input.value = "";
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      hp = Math.min(hist.length - 1, hp + 1);
      if (hist[hp] != null) input.value = hist[hp];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hp = Math.max(-1, hp - 1);
      input.value = hp === -1 ? "" : hist[hp];
    } else if (e.key === "Tab") {
      e.preventDefault();
      const names = Object.keys(cmds);
      const hit = names.find((n) => n.startsWith(input.value.toLowerCase()) && input.value);
      if (hit) input.value = hit + " ";
    }
  });

  addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); input.focus(); }
  });

  print("nerv-tty 0.9 · escreve 'help' para a lista de comandos", "t-out");
  return { run, print };
}