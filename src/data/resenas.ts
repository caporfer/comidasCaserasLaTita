// Extractos de lo que escriben los clientes en Google / Restaurant Guru.
// Van resumidos y sin nombre; si se quiere poner el nombre del autor,
// hay que copiar la reseña literal desde la ficha de Google Maps.

export type Resena = { texto: string; estrellas: number; color: 'amarillo' | 'rosa' | 'azul' | 'verde' };

export const resenas: Resena[] = [
  { texto: 'Un sitio estupendo en calidad y precio. La señora Tita, muy amable.', estrellas: 5, color: 'amarillo' },
  { texto: 'La comida está muy buena. Todo lo que hace está buenísimo.', estrellas: 5, color: 'azul' },
  { texto: 'Recomiendo sus tortillas.', estrellas: 5, color: 'rosa' },
  { texto: 'Qué energía tiene esta mujer, y qué fiel es con su clientela.', estrellas: 5, color: 'verde' },
];
