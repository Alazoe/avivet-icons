# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado semántico.

## [1.0.0] — 2026-08-05

Fase 0 (sistema gráfico) y Fase 1 (10 iconos principales).

### Añadido

- **Brand book** `DESIGN.md`: grid 64 × 64, trazo 2 px, remates redondos,
  `currentColor`, área viva 4–60, separación mínima de 4 px entre trazos.
- **Alfabeto visual** en `src/_primitives/`: ojo, pico, cresta, barbilla, ala,
  cola, pata, cuerpo, gota, check, flecha y círculo de advertencia. Todos los
  iconos se ensamblan con estas piezas.
- **10 iconos**: `hen`, `chick`, `egg`, `water-drop`, `bucket`,
  `vaccine-bottle`, `nipple-drinker`, `bell-drinker`, `clipboard`, `clock`.
- **Tooling**: `tools/validate.mjs` (aplica el checklist del brand book),
  `tools/build.mjs` (sprite, CSS, manifest, sitio) y `tools/new-icon.mjs`.
- **Distribución**: sprite SVG, CSS con `mask-image`, `json/manifest.json`.
- **Sitio de documentación** con buscador bilingüe, filtro por categoría,
  retícula de construcción, prueba de legibilidad a 16/24/32/48 px y copiado
  del SVG con un clic.

### Decisiones de diseño

- El **ojo** es la única forma con relleno de toda la biblioteca: a 16 px un ojo
  con contorno se convierte en una mancha.
- El **ala** se dibuja con arcos abiertos, nunca como hoja cerrada: una hoja
  cerrada dentro del cuerpo se lee como un segundo ojo.
- La **barbilla** se omite en `hen` porque quedaría a menos de 4 px del cuello;
  se conserva en el alfabeto visual para el gallo, que lleva el cuello más largo.
