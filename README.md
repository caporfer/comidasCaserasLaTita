# Comidas Caseras La Tita · web

Web de **Comidas Caseras La Tita** (C. Hermano Palomo, Huelva): comida casera para llevar, encargos por WhatsApp.

Hecha con [Astro](https://astro.build) como web estática: sin base de datos, sin servidor y sin cookies de seguimiento.

## Qué tiene

- **Pizarra "¿Qué hay hoy, Tita?"**: enseña el menú del día según el día de la semana.
- **Carta con encargo**: cada plato tiene su botón **+**, y al terminar se genera un mensaje de WhatsApp ya escrito para la Tita, con los platos, las cantidades, la hora de recogida y las notas.
- **"Abierto ahora / Abre a las…"**: se calcula en directo con la hora de Huelva.
- **Mapa, horario, reseñas, historia y encargos grandes** (bandejas).
- **SEO local**: datos estructurados `Restaurant` con horario y valoración, sitemap e imagen para compartir por WhatsApp/Facebook (`/og.png`, se genera sola en el build desde `src/lib/imagenes.ts`).

## Cambiar contenido (sin saber programar)

Todo el contenido está en `src/data/`:

| Archivo | Qué cambia |
| --- | --- |
| `negocio.ts` | Teléfono, dirección, horario, valoración, enlaces |
| `menuSemana.ts` | Lo que sale en la pizarra cada día |
| `carta.ts` | Platos, descripciones y precios (opcionales) |
| `resenas.ts` | Las notas de clientes |
| `fotos.ts` | Qué foto va en cada sitio |

**Fotos propias**: guarda la foto en `public/img/` con el nombre que se indica en `public/img/LEEME.txt` (por ejemplo `tortilla.jpg`). La web la usa sola en lugar de la de internet.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview
npm run fotos      # descarga las fotos de Commons a public/img (opcional)
```

Requiere Node 22.12 o superior.

## Publicar en Vercel

1. En Vercel: **Add New → Project** e importa este repositorio.
2. Vercel detecta Astro solo. No hay que tocar nada.
3. Opcional: cuando haya dominio propio, añade la variable de entorno `SITE_URL` (p. ej. `https://comidaslatita.es`) para que el sitemap y las etiquetas usen ese dominio.
4. Da de alta la web en la ficha de Google Maps ("Añadir sitio web").

Antes de anunciarla, repasa **[PENDIENTE-VERIFICAR.md](PENDIENTE-VERIFICAR.md)**.
