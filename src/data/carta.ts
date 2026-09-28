// La carta. Los platos marcados en las reseñas y en prensa (tortilla,
// croquetas de jamón y queso, empanados) están confirmados; el resto son
// platos habituales de cocina casera andaluza que hay que repasar con la Tita.
// `precio` es opcional: si no se pone, la web muestra "precio del día".

export type Plato = {
  id: string;
  nombre: string;
  nota?: string;
  unidad: string; // cómo se pide: ración, entera, docena…
  precio?: string;
  fama?: string; // etiquetita manuscrita: "la que más piden", etc.
};

export type Categoria = {
  id: string;
  titulo: string;
  entradilla: string;
  platos: Plato[];
};

export const carta: Categoria[] = [
  {
    id: 'empanados',
    titulo: 'Empanados y fritos',
    entradilla: 'Lo de siempre: la Tita empezó con freiduría y los empanados se siguen haciendo a mano.',
    platos: [
      {
        id: 'croquetas-jamon-queso',
        nombre: 'Croquetas de jamón y queso',
        nota: 'Bechamel lenta y pan rallado. Salieron en Andalucía Directo.',
        unidad: 'docena',
        fama: '¡las de la tele!',
      },
      { id: 'croquetas-puchero', nombre: 'Croquetas de puchero', nota: 'Con la carne del puchero, como se ha hecho siempre.', unidad: 'docena' },
      { id: 'empanadillas', nombre: 'Empanadillas de atún', nota: 'Atún, tomate y huevo duro.', unidad: 'docena' },
      { id: 'flamenquin', nombre: 'Flamenquín', nota: 'Lomo, jamón y queso, empanado y frito.', unidad: 'unidad' },
      { id: 'san-jacobo', nombre: 'San Jacobo', unidad: 'unidad' },
      { id: 'pechuga', nombre: 'Pechuga empanada con papas', unidad: 'ración' },
      { id: 'chocos', nombre: 'Chocos fritos', nota: 'Que para algo estamos en Huelva.', unidad: 'ración' },
    ],
  },
  {
    id: 'cuchara',
    titulo: 'De cuchara',
    entradilla: 'Guisos de chup chup, de los que se hacen sin mirar el reloj.',
    platos: [
      { id: 'lentejas', nombre: 'Lentejas con chorizo', unidad: 'ración' },
      { id: 'puchero', nombre: 'Puchero con su pringá', nota: 'El caldo se puede pedir aparte.', unidad: 'ración' },
      { id: 'garbanzos', nombre: 'Garbanzos con espinacas', unidad: 'ración' },
      { id: 'papas-chocos', nombre: 'Papas con chocos', unidad: 'ración', fama: 'muy choquero' },
      { id: 'carne-tomate', nombre: 'Carne con tomate', unidad: 'ración' },
      { id: 'albondigas', nombre: 'Albóndigas en salsa', unidad: 'ración' },
    ],
  },
  {
    id: 'tortillas',
    titulo: 'Tortillas',
    entradilla: 'La que más sale en las reseñas. Se puede pedir con cebolla o sin, en eso no nos metemos.',
    platos: [
      { id: 'tortilla-entera', nombre: 'Tortilla de patatas entera', nota: 'Dinos cómo la quieres: con o sin cebolla, más o menos cuajada.', unidad: 'unidad', fama: 'la que más piden' },
      { id: 'tortilla-racion', nombre: 'Tortilla de patatas', unidad: 'ración' },
      { id: 'tortilla-espinacas', nombre: 'Tortilla de espinacas', unidad: 'ración' },
    ],
  },
  {
    id: 'arroces',
    titulo: 'Arroces',
    entradilla: 'El domingo, paella. Como en todas las casas.',
    platos: [
      { id: 'paella', nombre: 'Paella', nota: 'Mejor encargarla con antelación.', unidad: 'ración', fama: 'los domingos' },
      { id: 'arroz-pollo', nombre: 'Arroz con pollo', unidad: 'ración' },
    ],
  },
  {
    id: 'postres',
    titulo: 'Postres de la casa',
    entradilla: 'Para no quedarse con las ganas.',
    platos: [
      { id: 'flan', nombre: 'Flan de huevo', unidad: 'unidad' },
      { id: 'arroz-leche', nombre: 'Arroz con leche', unidad: 'unidad' },
      { id: 'natillas', nombre: 'Natillas con galleta', unidad: 'unidad' },
      { id: 'tarta-galletas', nombre: 'Tarta de galletas', nota: 'La de chocolate de toda la vida.', unidad: 'porción' },
    ],
  },
];

export const todosLosPlatos = carta.flatMap((c) => c.platos);
