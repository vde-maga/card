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
        nome: ["Piroca", "Cona"], // linha 1 cheia, linha 2 contorno vermelho
        frase: "Trying to rationalize life, \none movie at a time",
        resumo: "This is my little space on the internet. I made it to serve as a linktree for my things on the web but now it has more than that. Find more about myself, down below",
        // dados: [{
        //         k: "sistema",
        //         v: "linux / dwm"
        //     },
        //     {
        //         k: "local",
        //         v: "lisboa · pt"
        //     },
        //     {
        //         k: "estado",
        //         v: "aberto a trabalho"
        //     },
        //     {
        //         k: "build",
        //         v: "2026.09 · static"
        //     },
        // ],
        acoes: [
			{
                label: "./about_me",
                href: "#about",
                seta: "↘"
            },
            {
                label: "./contacts",
                href: "#links",
                seta: "↘"
            },
            {
                label: "./github",
                href: "https://github.com/",
                seta: "↗",
                externo: true
            },
        ],
    },

    /* --- 01 · ABOUT --------------------------------------------------------- */
    about: {
        num: "01",
        titulo: "about_me",
        caminho: "./about",
        nota: "cat readme.txt — I hope you want to know about me",
        paragrafos: [
            "",
            "I’m a person who is currently studying programming at 42 Porto. I originally studied multimedia, but I didn’t have much success in that career. Likewise, I love computers, so understanding their language is, in many ways, comforting.",
			"In my spare time, I turn to the arts as a way of finding myself and making sense of issues related to my life. I love watching films and letting them take root within me."
        ],
        citacao: {
            texto: "Nós somos peixes e o que os peixes fazem é só estar",
            fonte: "Prefiro que Não Concordem - Capitão Fausto",
        },
        // ficha: [{
        //         k: "linguagens",
        //         v: "c, python, glsl, js"
        //     },
        //     {
        //         k: "ferramentas",
        //         v: "vim, git, blender, krita"
        //     },
        //     {
        //         k: "corrente",
        //         v: "posix, x11, fbcon"
        //     },
        //     {
        //         k: "disponível",
        //         v: "estágios · colaborações"
        //     },
        // ],
        interesses: [
            "neon genesis evangelion", "patlabor 2", "parannoul",
            "my dead girlfriend", "ligne claire",
        ],
    },

    /* --- 02 · PROJETOS ------------------------------------------------------ */
    projects: {
        num: "02",
        titulo: "projects",
        caminho: "./projects",
        nota: "ls -lh — o que já saiu do directório de testes.",
        itens: [{
                id: "minishell",
                nome: "./minishell",
                tipo: "c · 42",
                ano: "2026",
                desc: "An implementation of a Unix shell in the C language that offers basic command interpreter functionality, including parsing, command execution, redirection, pipes, and environment variable manipulation.",
                tags: ["c", "posix", "signals", "readline", "AST"],
                thumb: "/assets/img/projects/minishell.jpeg",
                links: [{
                        label: "repo",
                        href: "https://github.com/vde-maga/42-minishell"
                    },
                ],
            },
        ],
    },

    /* --- 03 · GALERIA ------------------------------------------------------- */
    /* size: "" (quadrado) | "w" (panorâmica) | "h" (4:3) | "t" (vertical)     */
    gallery: {
        num: "03",
        titulo: "gallery",
        caminho: "./gallery",
        nota: "/dev/video0 — frames roubadas, estudos e saídas de impressora.",
        itens: [{
                src: "/assets/img/gallery/test.gif",
                legenda: "Girassol Plants vs. Zombies",
                meta: "krita · 2026",
                size: ""
            },
            {
                src: "",
                legenda: "frame às 3am",
                meta: "evangelion",
                size: ""
            },
            {
                src: "",
                legenda: "ruído de valor 400%",
                meta: "python",
                size: "t"
            },
            {
                src: "",
                legenda: "linha clara, 2ª passagem",
                meta: "tinta nanquim",
                size: "h"
            },
            {
                src: "",
                legenda: "lisboa, chuva",
                meta: "arquivo",
                size: ""
            },
            {
                src: "",
                legenda: "mapa de bits a 1 bit",
                meta: "bayer 8x8",
                size: "h"
            },
            {
                src: "",
                legenda: "storyboard de nada",
                meta: "lápis",
                size: "t"
            },
            {
                src: "",
                legenda: "sem sinal",
                meta: "fbcon",
                size: "w"
            },
        ],
    },

    /* --- 04 · LINKS --------------------------------------------------------- */
    links: {
        num: "04",
        titulo: "links",
        caminho: "./links",
        nota: "ln -s — sítios onde existo fora daqui.",
        grupos: [{
                titulo: "~/links/público",
                itens: [{
                        label: "github",
                        href: "https://github.com/",
                        nota: "código",
                        perm: "drwxr-xr-x"
                    },
                    {
                        label: "42 profile",
                        href: "https://profile.intra.42.fr/users/",
                        nota: "intra",
                        perm: "-rw-r--r--"
                    },
                    {
                        label: "bandcamp",
                        href: "https://bandcamp.com/",
                        nota: "ruído favorito",
                        perm: "-rw-r--r--"
                    },
                    {
                        label: "arena",
                        href: "https://are.na/",
                        nota: "imagem",
                        perm: "-rw-r--r--"
                    },
                ],
            },
            {
                titulo: "~/links/directo",
                itens: [{
                        label: "email",
                        href: "mailto:oi@example.pt",
                        nota: "respondo",
                        perm: "-rw-------"
                    },
                    {
                        label: "cv.pdf",
                        href: "assets/cv.pdf",
                        nota: "pt/eng · 2026",
                        perm: "-rw-r--r--"
                    },
                    {
                        label: "pgp",
                        href: "assets/keys.asc",
                        nota: "0xA1B2C3",
                        perm: "-rw-r--r--"
                    },
                    {
                        label: "rss",
                        href: "feed.xml",
                        nota: "notas soltas",
                        perm: "-rw-r--r--"
                    },
                ],
            },
        ],
    },

    /* --- RODAPÉ ------------------------------------------------------------- */
    colophon: {
        num: "05",
        titulo: "colophon",
        caminho: "./colophon",
        blocos: [{
                h: "construção",
                p: "html + css + js vanilla. sem frameworks, sem build, sem analytics, sem cookies. hospedado em github pages."
            },
            {
                h: "tipografia",
                p: "Big Shoulders Display · Tinos · IBM Plex Mono. condensado, esticado, monoespaçado."
            },
            {
                h: "referências",
                ul: ["Neon Genesis Evangelion", "Patlabor 2", "Parannoul", "My Dead Girlfriend", "Ligne claire"]
            },
            {
                h: "contacto",
                p: "mailto:oi@example.pt",
                link: "mailto:oi@example.pt",
                linkLabel: "oi@example.pt"
            },
        ],
        licenca: "© 2026 · conteúdo próprio · código AGPLV3",
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