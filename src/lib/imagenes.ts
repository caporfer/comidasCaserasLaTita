// Genera en el build la imagen para compartir (og.png) y el icono de Apple.
// Los textos se convierten en trazos con las fuentes de Google Fonts, así la
// imagen sale igual en cualquier servidor (Vercel no tiene estas fuentes).
import sharp from 'sharp';
import opentype from 'opentype.js';
import { negocio } from '../data/negocio';

// Mismos colores que los tokens de global.css
const C = {
  cal: '#f7f4ec',
  blanco: '#fdfcf8',
  albero: '#e2b33c',
  persiana: '#2e6b4f',
  persianaOsc: '#1f4a37',
  geranio: '#c8372d',
  tinta: '#1f2622',
  tintaSuave: '#4a534d',
};

// Familia de Google Fonts por estilo (se resuelve la URL del .ttf en el build).
const FAMILIAS = {
  titulo: 'Alfa Slab One',
  texto: 'Work Sans:wght@700',
  mano: 'Permanent Marker',
};
type Estilo = keyof typeof FAMILIAS;
type Fuentes = Partial<Record<Estilo, opentype.Font>>;

async function urlTtf(familia: string) {
  // Con un User-Agent antiguo, Google Fonts sirve TTF en lugar de WOFF2.
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${familia.replaceAll(' ', '+')}`, {
    headers: { 'User-Agent': 'Mozilla/4.0' },
  }).then((r) => r.text());
  return css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
}

async function cargarFuentes(): Promise<Fuentes> {
  const out: Fuentes = {};
  await Promise.all(
    (Object.keys(FAMILIAS) as Estilo[]).map(async (k) => {
      try {
        const url = await urlTtf(FAMILIAS[k]);
        if (!url) return;
        const res = await fetch(url);
        if (res.ok) out[k] = opentype.parse(await res.arrayBuffer());
      } catch {
        /* sin red: se usa <text> con fuentes del sistema */
      }
    }),
  );
  return out;
}

const RESPALDO: Record<Estilo, string> = {
  titulo: 'font-family="Alfa Slab One, Rockwell, Georgia, serif"',
  texto: 'font-family="Work Sans, Arial, sans-serif" font-weight="700"',
  mano: 'font-family="Permanent Marker, cursive"',
};

// Estrella de 5 puntas centrada en 0,0 (radio ~11)
const ESTRELLA = 'M0-11 3.2-3.5 11.4-3.4 4.9 1.6 7.1 9.4 0 4.9-7.1 9.4-4.9 1.6-11.4-3.4-3.2-3.5Z';

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function texto(
  f: Fuentes,
  estilo: Estilo,
  str: string,
  x: number,
  y: number,
  size: number,
  fill: string,
  { centro = false, espaciado = 0 } = {},
) {
  const fuente = f[estilo];
  if (!fuente) {
    return `<text x="${x}" y="${y}" ${RESPALDO[estilo]} font-size="${size}" letter-spacing="${espaciado * size}" fill="${fill}"${centro ? ' text-anchor="middle"' : ''}>${escapar(str)}</text>`;
  }
  const opciones = { kerning: true, letterSpacing: espaciado };
  const ancho = fuente.getAdvanceWidth(str, size, opciones);
  const d = fuente.getPath(str, centro ? x - ancho / 2 : x, y, size, opciones).toPathData(2);
  return `<path d="${d}" fill="${fill}"/>`;
}

const azulejo = `
  <pattern id="az" width="60" height="60" patternUnits="userSpaceOnUse">
    <g transform="scale(1.25)">
      <rect width="48" height="48" fill="${C.blanco}"/>
      <rect x="1" y="1" width="46" height="46" fill="none" stroke="${C.persiana}" stroke-width="2"/>
      <g fill="${C.persiana}"><path d="M0 0h13a13 13 0 0 1-13 13Z"/><path d="M48 0H35a13 13 0 0 0 13 13Z"/><path d="M0 48h13a13 13 0 0 0-13-13Z"/><path d="M48 48H35a13 13 0 0 1 13-13Z"/></g>
      <path d="M24 8 40 24 24 40 8 24Z" fill="${C.albero}"/>
      <path d="M24 14 34 24 24 34 14 24Z" fill="none" stroke="${C.persiana}" stroke-width="1.6"/>
      <circle cx="24" cy="24" r="4.2" fill="${C.geranio}"/>
    </g>
  </pattern>`;

export async function ogPng() {
  const f = await cargarFuentes();
  const nota = negocio.valoracion.nota.toLocaleString('es-ES');
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${azulejo}</defs>
  <rect width="1200" height="630" fill="${C.cal}"/>
  <rect y="560" width="1200" height="70" fill="url(#az)"/>
  <rect y="552" width="1200" height="8" fill="${C.albero}"/>
  <rect y="548" width="1200" height="4" fill="${C.tinta}"/>

  <!-- rótulo -->
  <g transform="translate(80 58) rotate(-1.5)">
    <rect width="330" height="112" rx="8" fill="${C.persiana}" stroke="${C.tinta}" stroke-width="4"/>
    <rect x="10" y="10" width="310" height="92" rx="4" fill="none" stroke="${C.albero}" stroke-width="3"/>
    ${texto(f, 'titulo', 'La Tita', 165, 84, 66, C.blanco, { centro: true })}
  </g>
  ${texto(f, 'texto', 'COMIDAS CASERAS · HUELVA', 84, 212, 22, C.tintaSuave, { espaciado: 0.24 })}

  ${texto(f, 'titulo', 'Aquí se guisa', 80, 320, 64, C.tinta)}
  ${texto(f, 'titulo', 'como en casa.', 80, 398, 64, C.geranio)}
  <path d="M84 418C240 405 380 402 548 410" fill="none" stroke="${C.albero}" stroke-width="12" stroke-linecap="round"/>
  ${texto(f, 'texto', `Para llevar · Encargos por WhatsApp ${negocio.telefono}`, 80, 486, 28, C.tinta)}

  <g transform="translate(990 300) rotate(-8)">
    <circle r="130" fill="${C.albero}" stroke="${C.tinta}" stroke-width="5"/>
    <circle r="98" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="2" stroke-dasharray="4 7"/>
    ${texto(f, 'titulo', nota, 0, -4, 66, C.persiana, { centro: true })}
    ${[-2, -1, 0, 1, 2].map((i) => `<path transform="translate(${i * 26} 26) scale(1.05)" d="${ESTRELLA}" fill="${C.geranio}"/>`).join('')}
    ${texto(f, 'mano', `${negocio.valoracion.resenas} reseñas`, 0, 68, 24, C.tinta, { centro: true })}
  </g>
  <g transform="rotate(-4 800 110)">
    ${texto(f, 'mano', `¡${negocio.anyos} años en el barrio!`, 800, 110, 32, C.persiana)}
  </g>
</svg>`;
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${C.persiana}"/>
  <g stroke="${C.tinta}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 16c3-5-2-7 1-11M33 16c3-5-2-7 1-11M42 16c3-5-2-7 1-11" fill="none" stroke="${C.blanco}"/>
    <path d="M8 26h48" stroke="${C.blanco}"/>
    <path d="M12 28h40v12a14 14 0 0 1-14 14H26a14 14 0 0 1-14-14z" fill="${C.geranio}" stroke="${C.blanco}"/>
    <path d="M12 33H6M52 33h6" stroke="${C.blanco}"/>
  </g>
</svg>`;

export async function appleTouchIconPng() {
  return sharp(Buffer.from(faviconSvg), { density: 600 }).resize(180, 180).png().toBuffer();
}
