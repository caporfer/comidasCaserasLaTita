// Descarga las fotos de Wikimedia Commons a public/img/ para servirlas desde
// la propia web (más rápido y sin depender de Commons).
// Uso: node scripts/descargar-fotos.mjs
// Las fotos que ya existan en public/img/ (p. ej. fotos propias) no se tocan.
import { existsSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const { fotos, commonsUrl } = await import('../src/data/fotos.ts').catch(async () => {
  // Node < 22.6 no importa .ts directamente: se copia la lista a mano.
  throw new Error('Necesitas Node 22.6+ (ejecuta con: node --experimental-strip-types scripts/descargar-fotos.mjs)');
});

await mkdir('public/img', { recursive: true });

for (const f of Object.values(fotos)) {
  const destino = `public/img/${f.id}.jpg`;
  if (['jpg', 'jpeg', 'webp', 'png'].some((e) => existsSync(`public/img/${f.id}.${e}`))) {
    console.log(`= ${f.id} (ya existe, no se toca)`);
    continue;
  }
  const res = await fetch(commonsUrl(f, 1200), {
    headers: { 'User-Agent': 'LaTitaWeb/1.0 (descarga de fotos con licencia libre)' },
  });
  if (!res.ok) {
    console.warn(`✗ ${f.id}: ${res.status} ${res.statusText}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destino, await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer());
  console.log(`✓ ${f.id} → ${destino}`);
}
