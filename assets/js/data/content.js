/* ==========================================================================
   CONTEÚDO DO SITE — é só disto que precisas de mexer.
   --------------------------------------------------------------------------
   · cada secção lê-se de cima para baixo, igual ao site.
   · listas ( [], {} ) = repete à vontade; o layout adapta-se.
   · "src": ""  ->  gera um cartão gráfico automático.
     "src": "assets/img/gallery/foto.jpg"  ->  usa a tua imagem.
   · strings entre aspas duplas. não apagues a última linha (export).
   ========================================================================== */

export const CONTENT = {

  meta: {
    titulo: "./index",
    descricao: "",
    autor: "",
  },

  /* --- 00 · CARTÃO DE ABERTURA -------------------------------------------- */
  hero: {
    impressao: "first impression",
    ep: "ep-01",
    nome: ["vde", "maga"],           // linha 1 cheia, linha 2 contorno vermelho
    frase: "Nós somos peixes <br>e o que os peixes fazem é só estar",
    resumo: "Escrevo <b>software pequeno</b> e faço <b>imagens paradas</b>. Este retângulo é o índice — o resto é comentário. Anda na consola em baixo: escreve <code>help</code>.",
    dados: [
      { k: "sistema",  v: "linux / dwm" },
      { k: "local",    v: "lisboa · pt" },
      { k: "estado",   v: "aberto a trabalho" },
      { k: "build",    v: "2026.09 · static" },
    ],
    acoes: [
      { label: "ver trabalhos", href: "#projects", seta: "→", solido: true },
      { label: "contacto", href: "#links", seta: "↘" },
      { label: "github", href: "https://github.com/", seta: "↗", externo: true },
    ],
    sigil: { codigo: "NERV-IF/01", rota: true },
  },

  /* --- 01 · ABOUT --------------------------------------------------------- */
  about: {
    num: "01", titulo: "about", caminho: "./about",
    nota: "cat readme.txt — duas colunas, uma moldura.",
    paragrafos: [
      "Ando em computação na 42. Escrevo C durante a semana e imagens durante o dia — duas maneiras de apagar coisas até sobrar só o necessário.",
      "Gosto de interfaces que não pedem simpatia: uma moldura, um aviso, um cursor. Nada de transições suaves a fingir que o software é um ser vivo. Preferi um ecrã que parece estar a <em>captar</em> alguma coisa a um ecrã que parece estar a <em>agradar</em> alguém.",
      "O que faço cabe nisto: sistemas em C, ferramentas de linha de comandos, shaders, e um arquivo de imagem que cresce devagar.",
    ],
    citacao: {
      texto: "Não trato o trabalho como produto. Trato-o como um relatório de posição.",
      fonte: "notas próprias · 2025",
    },
    ficha: [
      { k: "linguagens", v: "c, python, glsl, js" },
      { k: "ferramentas", v: "vim, git, blender, krita" },
      { k: "corrente", v: "posix, x11, fbcon" },
      { k: "disponível", v: "estágios · colaborações" },
    ],
    interesses: [
      "neon genesis evangelion", "patlabor 2", "parannoul",
      "my dead girlfriend", "ligne claire", "dithering", "ruido analógico", "tipografia condensada",
    ],
  },

  /* --- 02 · PROJETOS ------------------------------------------------------ */
  projects: {
    num: "02", titulo: "projects", caminho: "./projects",
    nota: "ls -l — o que já saiu do directório de testes.",
    itens: [
      {
        id: "minishell",
        nome: "./minishell",
        tipo: "c · 42",
        ano: "2026",
        desc: "Um shell próprio: lexer, parser, expansão, pipes e jobs. Aprendi o que é realmente um processo no dia em que precisei de o matar.",
        tags: ["c", "posix", "sinais", "readline"],
        thumb: "",                                  // assets/img/projects/minishell.jpg
        links: [
          { label: "repo", href: "https://github.com/" },
          { label: "notas", href: "#" },
        ],
      },
      {
        id: "raymarcher",
        nome: "./raymarcher",
        tipo: "glsl · web",
        ano: "2025",
        desc: "Render sem assets: uma cena descrita em 40 linhas de distância assinada, a correr a 144 Hz num portátil de 2014.",
        tags: ["glsl", "webgl", "sdf", "matemática"],
        thumb: "",
        links: [
          { label: "demo", href: "#" },
          { label: "repo", href: "https://github.com/" },
        ],
      },
      {
        id: "noise-print",
        nome: "./noise-print",
        tipo: "python · gráfica",
        ano: "2025",
        desc: "Gerador de gravuras: ruído de valor, dithering de Bayer e uma impressora a jacto de tinta a receber PostScript cru.",
        tags: ["python", "postscript", "bayer", "print"],
        thumb: "",
        links: [{ label: "repo", href: "https://github.com/" }],
      },
      {
        id: "sinal",
        nome: "./sinal",
        tipo: "c · cli",
        ano: "2024",
        desc: "Compara duas árvores de directórios e devolve apenas o que mudou, em bytes, para stdout. Sem dependências, sem cores.",
        tags: ["c", "fs", "unix", "0 deps"],
        thumb: "",
        links: [
          { label: "repo", href: "https://github.com/" },
          { label: "aUR", href: "#" },
        ],
      },
    ],
  },

  /* --- 03 · GALERIA ------------------------------------------------------- */
  /* size: "" (quadrado) | "w" (panorâmica) | "h" (4:3) | "t" (vertical)     */
  gallery: {
    num: "03", titulo: "gallery", caminho: "./gallery",
    nota: "/dev/video0 — frames roubadas, estudos e saídas de impressora.",
    itens: [
      { src: "", legenda: "estudo de silhueta",      meta: "krita · 2026",  size: "w" },
      { src: "", legenda: "frame às 3am",            meta: "evangelion",    size: "" },
      { src: "", legenda: "ruído de valor 400%",     meta: "python",        size: "t" },
      { src: "", legenda: "linha clara, 2ª passagem", meta: "tinta nanquim", size: "h" },
      { src: "", legenda: "lisboa, chuva",           meta: "arquivo",       size: "" },
      { src: "", legenda: "mapa de bits a 1 bit",    meta: "bayer 8x8",     size: "h" },
      { src: "", legenda: "storyboard de nada",      meta: "lápis",         size: "t" },
      { src: "", legenda: "sem sinal",               meta: "fbcon",         size: "w" },
    ],
  },

  /* --- 04 · LINKS --------------------------------------------------------- */
  links: {
    num: "04", titulo: "links", caminho: "./links",
    nota: "ln -s — sítios onde existo fora daqui.",
    grupos: [
      {
        titulo: "~/links/público",
        itens: [
          { label: "github",    href: "https://github.com/",              nota: "código",       perm: "drwxr-xr-x" },
          { label: "42 profile", href: "https://profile.intra.42.fr/users/", nota: "intra",     perm: "-rw-r--r--" },
          { label: "bandcamp",  href: "https://bandcamp.com/",             nota: "ruído favorito", perm: "-rw-r--r--" },
          { label: "arena",     href: "https://are.na/",                   nota: "imagem",     perm: "-rw-r--r--" },
        ],
      },
      {
        titulo: "~/links/directo",
        itens: [
          { label: "email",     href: "mailto:oi@example.pt",              nota: "respondo",   perm: "-rw-------" },
          { label: "cv.pdf",    href: "assets/cv.pdf",                     nota: "pt/eng · 2026", perm: "-rw-r--r--" },
          { label: "pgp",       href: "assets/keys.asc",                   nota: "0xA1B2C3",   perm: "-rw-r--r--" },
          { label: "rss",       href: "feed.xml",                          nota: "notas soltas", perm: "-rw-r--r--" },
        ],
      },
    ],
  },

  /* --- RODAPÉ ------------------------------------------------------------- */
  colophon: {
    num: "05", titulo: "colophon", caminho: "./colophon",
    blocos: [
      { h: "construção", p: "html + css + js vanilla. sem frameworks, sem build, sem analytics, sem cookies. hospedado em github pages." },
      { h: "tipografia", p: "Big Shoulders Display · Tinos · IBM Plex Mono. condensado, esticado, monoespaçado." },
      { h: "referências", ul: ["Neon Genesis Evangelion", "Patlabor 2", "Parannoul", "My Dead Girlfriend", "Ligne claire"] },
      { h: "contacto", p: "mailto:oi@example.pt", link: "mailto:oi@example.pt", linkLabel: "oi@example.pt" },
    ],
    licenca: "© 2026 · conteúdo próprio · código MIT",
  },

  /* --- ROLAGEM INFINITA --------------------------------------------------- */
  ticker: [
    "neon genesis evangelion", "patlabor 2 — the movies", "parannoul · to see the next part of the dream",
    "my dead girlfriend", "ligne claire", "silent decision", "/dev/sig0", "human instrumentality project",
    "dithering bayer 8x8", "runlevel 0",
  ],

  /* --- CONSOLA ------------------------------------------------------------ */
  terminal: {
    ps1: "visitor@nerv:~$",
    ajuda: [
      "help              este texto",
      "ls                lista as secções",
      "cd ./about        salta para uma secção (ou: go projects)",
      "open 2            abre o projeto n.º 2 noutro separador",
      "img 3             abre a imagem 3 da galeria",
      "theme redline     alterna a paleta (nerv | redline)",
      "signal on|off     liga/desliga o ruído de CRT",
      "neofetch          informação do sistema",
      "exit              sequência de encerramento",
      "clear             limpa o buffer",
    ],
    ascii: [
      "      ▄▄▄▄▄▄▄▄▄      n.marques@nerv-lisboa",
      "    ▄███████████▄     ----------------------",
      "   ████▀     ▀████    os    : linux 6.6 (tty1)",
      "   ███   ◉ ◉   ███    shell : dwm + zsh",
      "   ███▄       ▄███    wm    : dwm 6.9",
      "    ▀███████████▀     fonts : big shoulders / tinos / plex mono",
      "      ▀▀▀▀▀▀▀▀▀       theme : nerv-dark · ligne claire",
      "                      uptime: {uptime}",
    ],
  },

  /* --- ARRANQUE ----------------------------------------------------------- */
  boot: [
    "[  OK  ] nerv kernel 6.6.6-lisboa · ttyS0",
    "[  OK  ] mounting /dev/sig0",
    "[  OK  ] module: palette_black.ko",
    "[  OK  ] module: ligne_claire.ko",
    "[ WARN ] reference engine: evangelion (locked)",
    "[  OK  ] resolving host n.marques ... 10.0.4.2",
    "[ .... ] decoding first impression",
  ],
  shutdown: [
    "broadcast message from root@nerv-lisboa:",
    "the system is going down for silent decision in 3 seconds...",
    "[  OK  ] unmounting /dev/ego",
    "[  OK  ] stopping service: noise.service",
    "[  OK  ] reaching runlevel 0 · H.I.",
  ],
};