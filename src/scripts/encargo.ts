import { waLink } from '../data/negocio';

export type Linea = { id: string; nombre: string; unidad: string; cantidad: number };
export type Datos = { nombre?: string; dia?: string; hora?: string; notas?: string };

const CLAVE = 'latita-encargo';

const plurales: Record<string, string> = {
  ración: 'raciones',
  docena: 'docenas',
  porción: 'porciones',
  unidad: 'unidades',
  entera: 'enteras',
};

/** "2 raciones de lentejas con chorizo", "1 docena de croquetas…", "2 × Flamenquín" */
export function describir({ nombre, unidad, cantidad }: Linea) {
  if (unidad === 'unidad' || unidad === 'entera') return `${cantidad} × ${nombre}`;
  const u = cantidad === 1 ? unidad : (plurales[unidad] ?? `${unidad}s`);
  return `${cantidad} ${u} de ${nombre.charAt(0).toLowerCase()}${nombre.slice(1)}`;
}

export function mensaje(lineas: Linea[], datos: Datos) {
  const saludo = datos.nombre?.trim() ? `¡Hola Tita! Soy ${datos.nombre.trim()}.` : '¡Hola Tita!';
  const cuando = `para ${datos.dia || 'hoy'}${datos.hora ? ` a las ${datos.hora}` : ', lo antes posible'}`;
  const partes = [
    `${saludo} Quería encargarte ${cuando}:`,
    '',
    ...lineas.map((l) => `• ${describir(l)}`),
  ];
  if (datos.notas?.trim()) partes.push('', `Nota: ${datos.notas.trim()}`);
  partes.push('', '¡Gracias! 😊');
  return partes.join('\n');
}

function leer(): Linea[] {
  try {
    const v = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function guardar(lineas: Linea[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lineas));
  } catch {
    /* modo privado o almacenamiento bloqueado: el encargo vive solo en esta visita */
  }
}

export function crearEncargo() {
  const lista = document.querySelector<HTMLUListElement>('[data-lineas]');
  const vacio = document.querySelector<HTMLElement>('[data-vacio]');
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  const enviar = document.querySelector<HTMLAnchorElement>('[data-enviar]');
  const tpl = document.querySelector<HTMLTemplateElement>('#tpl-linea');
  if (!lista || !vacio || !form || !enviar || !tpl) return;

  let lineas = leer();

  const datos = (): Datos => Object.fromEntries(new FormData(form)) as Datos;

  function actualizarEnlace() {
    const hay = lineas.length > 0;
    enviar!.setAttribute('aria-disabled', String(!hay));
    enviar!.href = hay ? waLink(mensaje(lineas, datos())) : waLink();
  }

  function pintar() {
    lista!.replaceChildren(
      ...lineas.map((l) => {
        const li = tpl!.content.firstElementChild!.cloneNode(true) as HTMLLIElement;
        const nombre = li.querySelector('.linea-nombre')!;
        const unidad = document.createElement('small');
        unidad.textContent = `por ${l.unidad}`;
        nombre.replaceChildren(l.nombre, unidad);
        li.querySelector('output')!.textContent = String(l.cantidad);
        const menos = li.querySelector('[data-menos]')!;
        const mas = li.querySelector('[data-mas]')!;
        menos.addEventListener('click', () => cambiar(l.id, -1));
        mas.addEventListener('click', () => cambiar(l.id, +1));
        menos.setAttribute('aria-label', `Quitar ${l.unidad} de ${l.nombre}`);
        mas.setAttribute('aria-label', `Añadir ${l.unidad} de ${l.nombre}`);
        return li;
      }),
    );
    vacio!.hidden = lineas.length > 0;
    actualizarEnlace();
    guardar(lineas);
    const total = lineas.reduce((s, l) => s + l.cantidad, 0);
    window.dispatchEvent(new CustomEvent('encargo:cambio', { detail: { total } }));
  }

  function cambiar(id: string, delta: number, extra?: Omit<Linea, 'cantidad'>) {
    const l = lineas.find((x) => x.id === id);
    if (l) l.cantidad += delta;
    else if (extra && delta > 0) lineas.push({ ...extra, cantidad: delta });
    lineas = lineas.filter((x) => x.cantidad > 0);
    pintar();
  }

  document.querySelectorAll<HTMLButtonElement>('[data-anadir]').forEach((b) => {
    b.addEventListener('click', () => {
      cambiar(b.dataset.anadir!, 1, { id: b.dataset.anadir!, nombre: b.dataset.nombre!, unidad: b.dataset.unidad! });
      b.classList.remove('hecho');
      void b.offsetWidth;
      b.classList.add('hecho');
      setTimeout(() => b.classList.remove('hecho'), 900);
    });
  });

  form.addEventListener('input', actualizarEnlace);
  form.addEventListener('submit', (e) => e.preventDefault());
  // Por si el navegador bloquea la apertura: el enlace siempre lleva el texto al día.
  enviar.addEventListener('click', actualizarEnlace);

  pintar();
}
