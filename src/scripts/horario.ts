import { negocio, DIAS } from '../data/negocio';

type Ahora = { dia: number; minutos: number };

const aMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Día y minuto actuales en Huelva, aunque quien mire la web esté en otra zona. */
export function ahoraEnHuelva(fecha = new Date()): Ahora {
  const partes = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha);
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? '';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { dia, minutos: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function estado(ahora = ahoraEnHuelva()) {
  const tramosHoy = negocio.horario.dias[ahora.dia];
  for (const [a, c] of tramosHoy) {
    if (ahora.minutos >= aMin(a) && ahora.minutos < aMin(c)) {
      const quedan = aMin(c) - ahora.minutos;
      return {
        abierto: true,
        texto: quedan <= 30 ? `Abierto · cierra en ${quedan} min` : `Abierto ahora · hasta las ${c}`,
        corto: 'Abierto ahora',
      };
    }
  }
  const siguienteHoy = tramosHoy.find(([a]) => aMin(a) > ahora.minutos);
  if (siguienteHoy) {
    return { abierto: false, texto: `Cerrado · abre hoy a las ${siguienteHoy[0]}`, corto: `Abre a las ${siguienteHoy[0]}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (ahora.dia + i) % 7;
    const primero = negocio.horario.dias[d][0];
    if (primero) {
      const cuando = i === 1 ? 'mañana' : `el ${DIAS[d]}`;
      return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${primero[0]}`, corto: `Abre ${cuando} ${primero[0]}` };
    }
  }
  return { abierto: false, texto: 'Cerrado', corto: 'Cerrado' };
}

export function pintarEstado() {
  const ahora = ahoraEnHuelva();
  const e = estado(ahora);
  document.querySelectorAll<HTMLElement>('[data-estado]').forEach((el) => {
    el.dataset.abierto = String(e.abierto);
    el.textContent = el.dataset.estado === 'corto' ? e.corto : e.texto;
  });
  document.querySelectorAll<HTMLElement>('[data-dia]').forEach((el) => {
    el.toggleAttribute('data-hoy', Number(el.dataset.dia) === ahora.dia);
  });
  document.querySelectorAll<HTMLElement>('[data-dias]').forEach((el) => {
    const dias = el.dataset.dias!.split(',').map(Number);
    el.toggleAttribute('data-hoy', dias.includes(ahora.dia));
  });
  return ahora;
}
