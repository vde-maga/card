/* seis composições planas, determinísticas por índice.
   enquanto não puseres imagens reais em assets/img/, o site mostra ISTO —
   e isto é desenho, não um buraco cinzento. */

const BG = "#0d0f12", LN = "#eae7e0", SIG = "#ff2b17", ST = "#5f7488";
const W = 800, H = 600;

const esc = (s = "") => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

const comps = [
  () => `
    <g fill="none" stroke="${ST}" stroke-width="2">
      <circle cx="400" cy="300" r="210"/><circle cx="400" cy="300" r="150"/>
    </g>
    <circle cx="400" cy="300" r="92" fill="none" stroke="${SIG}" stroke-width="4"/>
    <path d="M400 90v420M190 300h420" stroke="${LN}" stroke-width="2"/>
    <rect x="392" y="292" width="16" height="16" fill="${LN}"/>`,

  (i) => `
    <path d="M0 600 L${W} ${120 + (i % 3) * 60} V600 Z" fill="${SIG}"/>
    <path d="M0 600 L${W} ${120 + (i % 3) * 60} V600 Z" fill="none" stroke="${LN}" stroke-width="3"/>
    <circle cx="${250 + (i % 4) * 40}" cy="200" r="86" fill="${BG}" stroke="${LN}" stroke-width="3"/>
    <rect x="60" y="60" width="120" height="10" fill="${LN}"/>`,

  (i) => Array.from({ length: 16 }, (_, k) => {
      const h = 60 + ((Math.sin(k * 1.7 + i) + 1) / 2) * 420;
      const c = k % 5 === 0 ? SIG : ST;
      return `<rect x="${40 + k * 46}" y="${H - 60 - h}" width="26" height="${h}" fill="${c}" opacity="${k % 5 === 0 ? 1 : .55}"/>`;
    }).join("") + `<path d="M20 540H780" stroke="${LN}" stroke-width="2"/>`,

  () => `
    ${Array.from({ length: 12 }, (_, r) => Array.from({ length: 16 }, (_, c) =>
      `<rect x="${60 + c * 44}" y="${60 + r * 40}" width="3" height="3" fill="${ST}"/>`)).join("")}
    <path d="M400 120 L640 480 L160 480 Z" fill="${BG}" stroke="${LN}" stroke-width="3"/>
    <path d="M400 120 L400 480" stroke="${SIG}" stroke-width="3"/>`,

  (i) => `
    <path d="M${i % 2 ? 140 : 400} 600 a260 260 0 0 1 0 -520 Z" fill="${ST}" opacity=".85"/>
    <rect x="${i % 2 ? 420 : 120}" y="180" width="260" height="240" fill="none" stroke="${LN}" stroke-width="3"/>
    <rect x="${i % 2 ? 460 : 160}" y="220" width="180" height="16" fill="${SIG}"/>
    <rect x="${i % 2 ? 460 : 160}" y="252" width="120" height="16" fill="${LN}"/>`,

  (i) => `
    <path d="M0 ${300 + Math.sin(i) * 40} " stroke="${LN}" fill="none"/>
    <path d="M20 300 Q120 ${180} 220 300 T420 300 T620 300 T820 300" fill="none" stroke="${SIG}" stroke-width="4"/>
    <path d="M20 340 Q120 240 220 340 T420 340 T620 340 T820 340" fill="none" stroke="${ST}" stroke-width="2"/>
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="${ST}" stroke-width="1" opacity=".4"/>`,
];

export function placeholderURI(index = 0, label = "") {
  const inner = comps[index % comps.length](index);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
      `<rect width="${W}" height="${H}" fill="${BG}"/>` +
      inner +
      `<text x="28" y="578" font-family="monospace" font-size="19" letter-spacing="3" fill="${LN}" opacity=".5">${esc(label)}</text>` +
    `</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}