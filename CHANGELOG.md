# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) ·
versionado semántico sobre la superficie pública (`ICON_SPEC.md` §14).

## [0.1.0] — 2026-08-05

Primera versión del sistema. El proyecto deja de ser una carpeta de SVG y pasa
a ser un design system con arquitectura propia.

### Añadido

- **`ICON_SPEC.md`** — especificación técnica: fuente de verdad del proyecto.
  Manda sobre el código; si divergen, el bug está en el código.
- **`design-tokens.json`** — única fuente de los valores de presentación.
  Cambiar `stroke.width` reescribe toda la biblioteca sin tocar ni un dibujo.
- **Sistema de componentes** (`packages/core/src/components/`) — 19 piezas:
  `head`, `body`, `neck`, `silhouette`, `eye`, `beak`, `comb`, `wattle`,
  `wing`, `tail`, `leg`, `foot`, `drop`, `arrow`, `check`, `cross`, `warning`,
  `circle`, `rectangle`.
- **10 recetas de iconos**: `hen`, `chick`, `water-drop`, `bucket`,
  `nipple-drinker`, `bell-drinker`, `vaccine-bottle`, `clipboard`, `clock`,
  `egg`.
- **Monorepo de 6 paquetes**: `@avivet/icons`, `-sprite`, `-css`, `-json`,
  `-react`, `-vue`.
- **Suite de 164 tests** que hace cumplir las 20 comprobaciones de la spec,
  incluido que los artefactos generados coincidan con sus fuentes.
- **Sitio de documentación** con buscador bilingüe, retícula de construcción y
  prueba de legibilidad a 16/24/32/48 px.
- **CI** con validación, build determinista y publicación en GitHub Pages.

### Decisiones de arquitectura

- **Un `.svg` no es un archivo fuente.** Es un artefacto compilado a partir de
  `componentes + receta + tokens`. Editarlo a mano lo revierte el siguiente
  build. Es lo que hace que la regla "no dibujamos iconos, construimos
  componentes" sea verificable y no un buen propósito.
- **`head`, `body` y `neck` son tramos del mismo contorno**, no tres dibujos.
  La silueta de un ave es un único `<path>` cerrado: dos arcos cruzándose
  dentro del cuerpo delatan un dibujo ensamblado a ojo.
- **Las recetas no escriben coordenadas de lienzo**: piden anclas. Rediseñar el
  cuerpo del ave mueve el ala, la cola y las patas con él.
- **Regla de las dos apariciones**: una forma que se usa por segunda vez deja de
  ser geometría propia y se promueve a componente en el mismo PR.

### Decisiones de dibujo

- **El ojo es la única forma rellena** de la biblioteca: a 16 px un ojo con
  contorno se convierte en una mancha.
- **El ala se dibuja con arcos abiertos**, nunca como hoja cerrada: una forma
  cerrada dentro del cuerpo se lee como un segundo ojo.
- **El ala del pollito va retrasada**: un arco solitario bajo la cara se lee
  como una boca triste.
- **La barbilla se omite en `hen`** porque quedaría a menos de 4 px del cuello;
  se conserva en el catálogo para el gallo, de cuello más largo.
- **El asa del balde arquea hasta y = 4**: más plana se lee como un segundo
  borde de la boca, no como asa.

### Notas de migración

Reestructuración completa respecto del prototipo previo: `src/` pasa a
`packages/core/src/icons/`, `metadata.json` desaparece (los metadatos viven en
cada receta) y `DESIGN.md` queda absorbido por `ICON_SPEC.md`. La categoría
`equipment` se reparte entre `water` y `buildings`, y `ui` cede `clipboard` y
`clock` a `medical`, siguiendo las categorías definidas en la spec.
