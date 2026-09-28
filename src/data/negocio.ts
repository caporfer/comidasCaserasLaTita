// Todos los datos del negocio viven aquí. Si cambia el horario, el teléfono
// o la dirección, se toca solo este archivo y se actualiza toda la web.
// Lo marcado con `verificar: true` sale de directorios de internet y hay
// que confirmarlo con la Tita (ver PENDIENTE-VERIFICAR.md).

export type Tramo = [apertura: string, cierre: string];

export const negocio = {
  nombre: 'Comidas Caseras La Tita',
  nombreCorto: 'La Tita',
  lema: 'Comida casera para llevar en Huelva',
  anyos: 13,

  direccion: {
    calle: 'C. Hermano Palomo',
    numero: '', // algunas fichas dicen "26" → verificar
    cp: '21006',
    ciudad: 'Huelva',
    provincia: 'Huelva',
    verificar: true,
  },

  telefono: '657 84 19 98',
  telefonoIntl: '+34657841998',
  whatsapp: '34657841998',

  valoracion: { nota: 4.7, resenas: 72, fuente: 'Google' },
  precioPorPersona: '1–10 €',

  mapsFicha: 'https://www.google.com/maps/place/Comidas+Casera+La+Tita',
  mapsComoLlegar:
    'https://www.google.com/maps/dir/?api=1&destination=Comidas+Casera+La+Tita,+Calle+Hermano+Palomo,+21006+Huelva',
  mapsEmbed:
    'https://maps.google.com/maps?q=Comidas%20Casera%20La%20Tita%2C%20Calle%20Hermano%20Palomo%2C%2021006%20Huelva&z=17&output=embed',
  facebook: 'https://www.facebook.com/freidurialatita/',

  // Índice 0 = domingo … 6 = sábado (como Date.getDay()).
  // Fuente: Restaurant Guru → verificar.
  horario: {
    verificar: true,
    dias: [
      [['13:00', '16:00']],
      [['13:00', '16:00'], ['20:00', '23:00']],
      [['13:00', '16:00'], ['20:00', '23:00']],
      [['13:00', '16:00'], ['20:00', '23:00']],
      [['13:00', '16:00'], ['20:00', '23:00']],
      [['13:00', '16:00'], ['20:00', '23:00']],
      [['13:00', '16:00'], ['20:00', '23:00']],
    ] as Tramo[][],
  },
} as const;

export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

export const direccionCompleta = [
  `${negocio.direccion.calle}${negocio.direccion.numero ? ', ' + negocio.direccion.numero : ''}`,
  `${negocio.direccion.cp} ${negocio.direccion.ciudad}`,
].join(', ');

export const telLink = `tel:${negocio.telefonoIntl}`;

export function waLink(texto?: string) {
  const base = `https://wa.me/${negocio.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** "13:00" → "13:00", "20:00" → "20:00"; agrupa días con el mismo horario. */
export function horarioAgrupado() {
  const orden = [1, 2, 3, 4, 5, 6, 0];
  const grupos: { dias: number[]; tramos: Tramo[] }[] = [];
  for (const d of orden) {
    const tramos = negocio.horario.dias[d];
    const ultimo = grupos.at(-1);
    if (ultimo && JSON.stringify(ultimo.tramos) === JSON.stringify(tramos)) ultimo.dias.push(d);
    else grupos.push({ dias: [d], tramos });
  }
  return grupos.map((g) => ({
    ...g,
    etiqueta:
      g.dias.length > 1
        ? `${cap(DIAS[g.dias[0]])} a ${DIAS[g.dias.at(-1)!]}`
        : cap(DIAS[g.dias[0]]),
  }));
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
