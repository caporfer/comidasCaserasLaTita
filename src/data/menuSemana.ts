// Lo que sale en la pizarra cada día. Índice 0 = domingo … 6 = sábado.
// Es orientativo: la Tita cocina según lo que encuentra en el mercado.
// Cambia estos platos por los reales y la pizarra se actualiza sola.

export type DiaMenu = { guiso: string; segundo: string; postre: string; aviso?: string };

export const menuSemana: DiaMenu[] = [
  { guiso: 'Paella', segundo: 'Tortilla de patatas', postre: 'Flan de huevo', aviso: 'Solo a mediodía' },
  { guiso: 'Lentejas con chorizo', segundo: 'Pechuga empanada con papas', postre: 'Natillas' },
  { guiso: 'Puchero con su pringá', segundo: 'Croquetas de puchero', postre: 'Arroz con leche' },
  { guiso: 'Garbanzos con espinacas', segundo: 'Albóndigas en salsa', postre: 'Flan de huevo' },
  { guiso: 'Arroz con pollo', segundo: 'Flamenquín', postre: 'Tarta de galletas' },
  { guiso: 'Papas con chocos', segundo: 'Chocos fritos', postre: 'Natillas' },
  { guiso: 'Carne con tomate', segundo: 'Tortilla de patatas', postre: 'Arroz con leche' },
];
