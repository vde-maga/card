# ./index — cartão de título

Site pessoal estático. HTML + CSS + JS vanilla, sem build, sem dependências.
Estética: cartões de título de Evangelion desenhados em *ligne claire*, sobre
um campo CRT frio (Patlabor / shoegaze).

## Editar conteúdo

**Um ficheiro: `assets/js/data/content.js`.** Está comentado secção a secção.
Não precisas de tocar em mais nada para mudar textos, projetos, fotos ou links.

Imagens:

```
assets/img/projects/minishell.jpg   →  thumb: "assets/img/projects/minishell.jpg"
assets/img/gallery/frame-01.jpg     →  src:   "assets/img/gallery/frame-01.jpg"
```

Enquanto `src`/`thumb` forem `""`, o site gera um cartão gráfico SVG plano
automático (`lib/placeholder.js`). Nunca há caixas cinzentas vazias.

## Estrutura

```
assets/css/     base → type → layout → components → fx   (carregadas por esta ordem)
assets/js/
  data/         conteúdo (o único sítio com texto)
  lib/          dom.js (el/$/pad) · placeholder.js (SVGs)
  core/         render.js (data→DOM) · boot.js (arranque/paragem)
  fx/           scramble · reveal · reticle · statusbar · lightbox · term
  main.js       init, um try/catch por módulo
```

Regra de dependência: `data → lib → core → fx → main`. Nada em `fx/` importa
nada em `core/` exceto `boot.js` (usado pelo terminal para o `exit`).

## Consola (fim da página)

`help` · `ls` · `cd ./about` · `go projects` · `open 2` · `img 3` ·
`theme redline` · `signal off` · `neofetch` · `exit` · `clear` · `sudo`

Atalhos de teclado: <kbd>Ctrl/⌘</kbd>+<kbd>K</kbd> foca a consola ·
<kbd>r</kbd> alterna a paleta · <kbd>s</kbd> liga/desliga o ruído de CRT ·
`#noboot` salta o arranque.

## Desenvolvimento local

Usa módulos ES, por isso precisa de um servidor (ficheiro `file://` é bloqueado):

```sh
python3 -m http.server 8080
# ou:  npx serve .
```

## Publicar (GitHub Pages)

1. Repositório público, conteúdo na branch `main`, pasta `/` (root).
2. **Settings → Pages → Source: `Deploy from a branch` → `main` / `/(root)`.**
3. `.nojekyll` tem de estar na raiz (já está).
4. Site em `https://<user>.github.io/<repo>/` — todos os caminhos são
   relativos, portanto funciona em subdiretório sem alterações.
5. Domínio próprio: adiciona `CNAME` na raiz e configura DNS.

## Acessibilidade / performance

- `prefers-reduced-motion` desliga grão, varrimento, rotação, scramble,
  arranque e revelações.
- Semântica: `main`/`section`/`article`, headings por ordem, botões reais na
  galeria, `aria-live` no buffer da consola, foco visível em vermelho-sinal.
- Zero pedidos de rede além das Google Fonts. As imagens são `loading="lazy"`.
- Com JavaScript desligado aparece um aviso a mandar ler o `content.js`.