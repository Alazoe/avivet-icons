<div align="center">

# AviVet Icons

**Open Source Poultry Design System**

Iconos SVG de dibujo técnico para medicina veterinaria y producción avícola.

[![licencia MIT](https://img.shields.io/badge/licencia-MIT-1D5C8F)](LICENSE)
[![versión 0.2.0](https://img.shields.io/badge/versión-0.3.0-1D5C8F)](CHANGELOG.md)
[![12 iconos](https://img.shields.io/badge/iconos-12-1D5C8F)](#iconos)
[![Node ≥ 20](https://img.shields.io/badge/node-%E2%89%A5%2020-1D5C8F)](package.json)

[Ver la biblioteca](https://avivet.cl/avivet-icons/) ·
[Especificación](ICON_SPEC.md) ·
[Contribuir](CONTRIBUTING.md) ·
[Changelog](CHANGELOG.md)

</div>

---

## Qué es

Una biblioteca de iconos para gente que trabaja con aves: veterinarios,
zootecnistas, productores y quien construya software para ellos. Dibujos
técnicos de manual veterinario — no caricaturas, no emoji.

Y es un **design system**, no una carpeta de SVG:

> ### No dibujamos iconos. Construimos componentes.

La gallina y el pollito comparten literalmente el mismo ojo, el mismo pico y la
misma pata: **el mismo código**, no formas parecidas. Un `.svg` de este
repositorio no es un archivo fuente, es un artefacto compilado a partir de
`componentes + receta + tokens`.

```js
// packages/core/src/icons/animals/hen.icon.mjs — esto es un icono
draw() {
  const bird = silhouette({ variant: 'adult' });
  const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

  return [
    ...bird.shapes,
    ...comb({ at: crown, size: 'single' }),
    ...beak({ at: bill }),
    ...eye({ at: socket }),
    ...wing({ at: shoulder, variant: 'adult' }),
    ...tail({ at: rump, variant: 'hen' }),
    ...legs.flatMap((at) => leg({ at, length: 6.5 })),
  ];
}
```

Cambiar `stroke.width` a `1.75` en `design-tokens.json` y ejecutar
`pnpm build` reescribe los 12 SVG, el sprite, el CSS y los componentes React
y Vue. **Ningún archivo fuente cambia.** Ese es el criterio de aceptación del
sistema.

---

## El sistema en seis valores

|             |                                                  |
| ----------- | ------------------------------------------------ |
| Grid        | 64 × 64 px, sin excepciones                      |
| Dirección   | Las aves miran a la izquierda (`anatomy.facing`) |
| Zona segura | 4 px — ningún trazo toca el borde                |
| Trazo       | 2 px, `linecap` y `linejoin` `round`             |
| Relleno     | `none` (la única forma sólida es el ojo, r 1.25) |
| Color       | `currentColor` — nunca un color fijo             |
| Curvas      | Bézier; las quiebras solo si son anatómicas      |

Todos viven en [`design-tokens.json`](design-tokens.json). Las reglas completas,
en [`ICON_SPEC.md`](ICON_SPEC.md).

---

## Instalación y uso

### Sprite — un archivo para toda la biblioteca

```html
<svg width="24" height="24"><use href="sprite.svg#ai-hen" /></svg>
```

### CSS — hereda color y tamaño del texto

```html
<link rel="stylesheet" href="avivet-icons.css" />

<i class="ai ai-hen"></i>
<i class="ai ai-size-lg ai-vaccine-bottle" style="color:#0F6B4F"></i>
```

### React

```tsx
import { Hen, NippleDrinker } from '@avivet/icons-react';

<Hen size={24} />                    {/* decorativo: aria-hidden */}
<Hen title="Gallina" />              {/* informativo: se anuncia */}
```

### Vue

```vue
<script setup>
import { Hen } from '@avivet/icons-vue';
</script>

<template><Hen :size="24" /></template>
```

El color **nunca** es una prop: se hereda con `currentColor`.

### SVG suelto

Para Word, PowerPoint, Canva o Illustrator: toma el archivo de
`packages/core/svg/<categoría>/<id>.svg`.

### JSON

```js
import manifest from '@avivet/icons-docs';

const hen = manifest.icons.find((i) => i.id === 'hen');
el.innerHTML = `<svg viewBox="${hen.viewBox}" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${hen.body}</svg>`;
```

---

## Paquetes

| Paquete                | Contenido                  |
| ---------------------- | -------------------------- |
| `@avivet/icons`        | Componentes, recetas y SVG |
| `@avivet/icons-sprite` | `sprite.svg`               |
| `@avivet/icons-css`    | Hoja CSS con máscaras      |
| `@avivet/icons-docs`   | `manifest.json`            |
| `@avivet/icons-react`  | Componentes React tipados  |
| `@avivet/icons-vue`    | Componentes Vue 3          |

---

## Iconos

**12 iconos · v0.3.0**

| Icono                | `id`             | Categoría  |
| -------------------- | ---------------- | ---------- |
| Gallina              | `hen`            | animals    |
| Gallo                | `rooster`        | animals    |
| Pollito              | `chick`          | animals    |
| Nido                 | `nest`           | animals    |
| Gota de agua         | `water-drop`     | water      |
| Balde                | `bucket`         | water      |
| Bebedero nipple      | `nipple-drinker` | water      |
| Bebedero campana     | `bell-drinker`   | water      |
| Frasco de vacuna     | `vaccine-bottle` | medical    |
| Planilla de registro | `clipboard`      | medical    |
| Reloj                | `clock`          | medical    |
| Huevo                | `egg`            | production |

Categorías previstas: `animals` · `water` · `medical` · `nutrition` ·
`buildings` · `biosecurity` · `production` · `ui`.

---

## Desarrollo

```bash
pnpm install
pnpm test             # build + las 23 comprobaciones de la especificación
pnpm build        # regenera todos los artefactos
pnpm new -- pullet animals
pnpm sketch -- hen  # hoja de construcción: retícula + tira 16→128 px
pnpm dev        # sitio con buscador, retícula y prueba a 16 y 128 px
```

Monorepo pnpm con TypeScript, Vite, Vitest, ESLint, Prettier, SVGO y Husky.
`pnpm verify` corre exactamente lo mismo que la CI: tipos, lint, formato y las
23 comprobaciones de la especificación.

Los paquetes publicables **no arrastran toolchain**: `@avivet/icons` se publica
como ESM más `.d.ts`, y el resto son archivos estáticos.

### Estructura

```text
design-tokens.json          ← valores de presentación (única fuente)
packages/core/src/
  types.ts                  ← el vocabulario del sistema
  components/               ← EL LEGO: 21 piezas reutilizables
  icons/<categoría>/*.icon.ts   ← RECETAS: composición + metadatos
packages/core/svg/          ← generado
packages/{react,docs,sprite,css,vue}/  ← generado
scripts/                    ← build · sketch · new-icon · optimize (SVGO)
tests/                      ← Vitest contra los artefactos generados
website/ → website/dist     ← sitio de documentación (Vite)
```

Solo se edita a mano: `design-tokens.json`, `packages/core/src/`, `website/` y
la documentación. Todo lo demás sale de `pnpm build`.

---

## Hoja de ruta

| Versión | Alcance                                   | Estado      |
| ------- | ----------------------------------------- | ----------- |
| v0.1    | Sistema de componentes + 10 iconos        | ✅          |
| v0.2    | Familia de animales completa · 25 iconos  | ⏳ en curso |
| v0.5    | 50 iconos · publicación en npm            | ⏳          |
| v1.0    | 100 iconos                                | ⏳          |
| v2.0    | Escenas: composiciones sobre lienzo mayor | ⏳          |

---

## Contribuir

Lee [`CONTRIBUTING.md`](CONTRIBUTING.md). En resumen: busca tu forma en el
catálogo de componentes antes de dibujar, y adjunta al PR una captura a 16 px —
si no se reconoce a ese tamaño, el icono no está terminado.

## Licencia

[MIT](LICENSE) © Andrés Lazo — úsalos, modifícalos y redistribúyelos, incluso
comercialmente, manteniendo el aviso de licencia.
