// Genera en el build la imagen para compartir (og.png) y el icono de Apple.
// Los textos se convierten en trazos con las fuentes de Google Fonts, así la
// imagen sale igual en cualquier servidor (Vercel no tiene estas fuentes).
import sharp from 'sharp';
import opentype from 'opentype.js';
import { negocio } from '../data/negocio';

const FUENTES = {
  titulo: 'https://fonts.gstatic.com/s/youngserif/v2/3qTpojO2nS2VtkB3KtkQZ2t6.ttf',
  texto: 'https://fonts.gstatic.com/s/figtree/v9/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_f_R15e.ttf',
  mano: 'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjRV6SII.ttf',
};
type Estilo = keyof typeof FUENTES;
type Fuentes = Partial<Record<Estilo, opentype.Font>>;

async function cargarFuentes(): Promise<Fuentes> {
  const out: Fuentes = {};
  await Promise.all(
    (Object.keys(FUENTES) as Estilo[]).map(async (k) => {
      try {
        const res = await fetch(FUENTES[k]);
        if (res.ok) out[k] = opentype.parse(await res.arrayBuffer());
      } catch {
        /* sin red: se usa <text> con fuentes del sistema */
      }
    }),
  );
  return out;
}

const RESPALDO: Record<Estilo, string> = {
  titulo: "font-family=\"Young Serif, Georgia, serif\"",
  texto: "font-family=\"Figtree, Arial, sans-serif\" font-weight=\"800\"",
  mano: "font-family=\"Caveat, cursive\" font-weight=\"700\"",
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
      <rect width="48" height="48" fill="#f7efdc"/>
      <rect x="1" y="1" width="46" height="46" fill="none" stroke="#1d4a86" stroke-width="2"/>
      <g fill="#1d4a86"><path d="M0 0h13a13 13 0 0 1-13 13Z"/><path d="M48 0H35a13 13 0 0 0 13 13Z"/><path d="M0 48h13a13 13 0 0 0-13-13Z"/><path d="M48 48H35a13 13 0 0 1 13-13Z"/></g>
      <path d="M24 9c2.5 6 3.8 8.5 15 15-11.2 6.5-12.5 9-15 15-2.5-6-3.8-8.5-15-15 11.2-6.5 12.5-9 15-15Z" fill="#1d4a86"/>
      <circle cx="24" cy="24" r="5.2" fill="#dfa52a"/><circle cx="24" cy="24" r="2" fill="#a13d25"/>
    </g>
  </pattern>`;

export async function ogPng() {
  const f = await cargarFuentes();
  const nota = negocio.valoracion.nota.toLocaleString('es-ES');
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${azulejo}</defs>
  <rect width="1200" height="630" fill="#f1e6d0"/>
  <rect y="570" width="1200" height="60" fill="url(#az)"/>
  <rect y="567" width="1200" height="4" fill="#2b211a"/>
  <g transform="translate(80 70)" stroke="#2b211a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 30c5-9-3-12 2-20M58 30c5-9-3-12 2-20M76 30c5-9-3-12 2-20" fill="none"/>
    <path d="M10 44h110"/>
    <path d="M18 48h94v30a30 30 0 0 1-30 30H48a30 30 0 0 1-30-30z" fill="#a13d25"/>
    <path d="M18 60H4M112 60h14"/>
  </g>
  ${texto(f, 'titulo', 'La Tita', 230, 160, 110, '#2b211a')}
  ${texto(f, 'texto', 'COMIDAS CASERAS · HUELVA', 236, 200, 24, '#5b4a3c', { espaciado: 0.29 })}
  ${texto(f, 'titulo', 'Aquí se guisa', 80, 330, 76, '#2b211a')}
  ${texto(f, 'titulo', 'como en casa.', 80, 415, 76, '#a13d25')}
  <path d="M84 432C240 418 380 414 560 424" fill="none" stroke="#dfa52a" stroke-width="10" stroke-linecap="round"/>
  ${texto(f, 'texto', `Para llevar · Encargos por WhatsApp ${negocio.telefono}`, 80, 500, 30, '#2b211a')}
  <g transform="translate(990 330) rotate(-8)">
    <circle r="130" fill="#dfa52a" stroke="#2b211a" stroke-width="5"/>
    <circle r="100" fill="none" stroke="#2b211a" stroke-width="2" stroke-dasharray="4 7"/>
    ${texto(f, 'titulo', nota, 0, -10, 78, '#2b211a', { centro: true })}
    ${[-2, -1, 0, 1, 2].map((i) => `<path transform="translate(${i * 26} 20) scale(1.05)" d="${ESTRELLA}" fill="#a13d25"/>`).join('')}
    ${texto(f, 'mano', `${negocio.valoracion.resenas} reseñas`, 0, 62, 34, '#2b211a', { centro: true })}
  </g>
  <g transform="rotate(-4 835 120)">
    ${texto(f, 'mano', `¡${negocio.anyos} años en el barrio!`, 835, 120, 44, '#1d4a86')}
  </g>
</svg>`;
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#f1e6d0"/>
  <g stroke="#2b211a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 16c3-5-2-7 1-11M33 16c3-5-2-7 1-11M42 16c3-5-2-7 1-11" fill="none"/>
    <path d="M8 26h48"/>
    <path d="M12 28h40v12a14 14 0 0 1-14 14H26a14 14 0 0 1-14-14z" fill="#a13d25"/>
    <path d="M12 33H6M52 33h6"/>
  </g>
</svg>`;

export async function appleTouchIconPng() {
  return sharp(Buffer.from(faviconSvg), { density: 600 }).resize(180, 180).png().toBuffer();
}
