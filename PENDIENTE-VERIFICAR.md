# Pendiente de verificar con la Tita

Estos datos salen de directorios de internet (Google Maps, Restaurant Guru, Gastroranking, Facebook) o son una propuesta razonable. Confírmalos antes de publicar.

## Datos del negocio (`src/data/negocio.ts`)
- [ ] **Número de la calle.** Algunas fichas dicen *C/ Hermano Palomo 26*. Ahora mismo la web no muestra número.
- [ ] **Horario.** Según Restaurant Guru: lunes a sábado de 13:00 a 16:00 y de 20:00 a 23:00, domingo de 13:00 a 16:00. ¿Abre de verdad por la noche? ¿Y el domingo?
- [ ] **Años abiertos.** La web dice 13.
- [ ] **Facebook.** Se enlaza `facebook.com/freidurialatita`. Existe otra página, `latitacc`, que parece de otro negocio de Granada.
- [ ] **Instagram / TikTok**, si los tiene.

## Carta y menú (`carta.ts`, `menuSemana.ts`)
- [x] Confirmado en internet: tortilla de patatas, croquetas de jamón y queso (salieron en *Andalucía Directo*), empanados, paella y postres caseros.
- [ ] El resto de platos y el **menú por días** son una propuesta de cocina casera andaluza. Hay que cambiarlos por los reales.
- [ ] **Precios.** Ahora pone "por ración", "por docena"… Si quiere mostrarlos, se rellena el campo `precio`.

## Textos que dan por hecho cosas
- [ ] «¿Tienes táper? ¡Tráetelo!» (sección *Cómo funciona*).
- [ ] **Encargos grandes** (bandejas, cumpleaños y comuniones) y el aviso de "un par de días" de antelación.
- [ ] **La historia** (de freiduría a cocina casera). Mejor que la Tita la lea y la ajuste; si quiere poner su nombre real, se añade.
- [ ] **Reseñas.** Van resumidas y sin autor. Para citar con nombre, hay que copiar las reseñas literales de Google Maps.

## Legal (`src/pages/aviso-legal/index.astro`)
- [ ] Nombre o razón social y NIF del titular (obligatorio por la LSSI).

## Fotos
- [ ] Sustituir las fotos de Wikimedia Commons por fotos reales de los platos y del local (ver `public/img/LEEME.txt`). Es lo que más va a mejorar la web.
