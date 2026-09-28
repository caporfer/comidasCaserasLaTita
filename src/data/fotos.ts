// Fotos de platos. Mientras no haya fotos propias del local se usan fotos
// con licencia libre de Wikimedia Commons (créditos en CREDITOS.md).
//
// Para usar una foto propia: guárdala en /public/img/<id>.jpg
// (por ejemplo public/img/tortilla.jpg) y la web la usará automáticamente
// en lugar de la de Commons al volver a publicar.

export type Foto = {
  id: string;
  alt: string;
  /** Nombre exacto del archivo en Wikimedia Commons */
  commons: string;
};

export const fotos = {
  tortilla: {
    id: 'tortilla',
    alt: 'Tortilla de patatas jugosa en un plato',
    commons: 'Tortilla de patatas.jpg',
  },
  tortillaCorte: {
    id: 'tortilla-corte',
    alt: 'Tortilla de patatas cortada por la mitad',
    commons: 'Tortilla de Patatas (Corte transversal).jpg',
  },
  croquetas: {
    id: 'croquetas',
    alt: 'Croquetas caseras recién fritas',
    commons: 'Croquetas Caseras (7068664101).jpg',
  },
  croquetas2: {
    id: 'croquetas-2',
    alt: 'Plato de croquetas',
    commons: 'Croquetas.jpg',
  },
  lentejas: {
    id: 'lentejas',
    alt: 'Guiso de lentejas',
    commons: 'Guiso de lentejas.jpg',
  },
  paella: {
    id: 'paella',
    alt: 'Plato de paella',
    commons: 'Plato de paella (Comunidad Valenciana).jpg',
  },
  flan: {
    id: 'flan',
    alt: 'Flan casero con caramelo',
    commons: 'Flan casero.jpg',
  },
  empanadillas: {
    id: 'empanadillas',
    alt: 'Empanadillas fritas',
    commons: 'Empanadas Fritas.jpg',
  },
} satisfies Record<string, Foto>;

export function commonsPagina(f: Foto) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f.commons.replaceAll(' ', '_'))}`;
}

export function commonsUrl(f: Foto, ancho = 800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    f.commons.replaceAll(' ', '_'),
  )}?width=${ancho}`;
}
