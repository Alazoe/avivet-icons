# AviVet Icons — Especificación Técnica

**Open Source Poultry Design System**

> Crear la biblioteca SVG más completa del mundo para medicina veterinaria y
> producción avícola.

| | |
| --- | --- |
| Documento | `ICON_SPEC.md` — fuente de verdad del proyecto |
| Versión de la spec | 1.0 |
| Estado | Vigente desde v0.1.0 |
| Licencia | MIT |

Este documento manda sobre cualquier otro archivo del repositorio. Si el código
y la spec no coinciden, **el bug está en el código**. Toda decisión estructural
se discute aquí antes de escribirse en `packages/`.

---

## Índice

1. [Principios](#1-principios)
2. [Arquitectura del repositorio](#2-arquitectura-del-repositorio)
3. [Design tokens](#3-design-tokens)
4. [El sistema de componentes](#4-el-sistema-de-componentes)
5. [Catálogo de componentes](#5-catálogo-de-componentes)
6. [Anatomía compartida de las aves](#6-anatomía-compartida-de-las-aves)
7. [Cómo se construye un icono](#7-cómo-se-construye-un-icono)
8. [Nomenclatura y categorías](#8-nomenclatura-y-categorías)
9. [Metadatos](#9-metadatos)
10. [Pipeline de build](#10-pipeline-de-build)
11. [Validación y tests](#11-validación-y-tests)
12. [Accesibilidad](#12-accesibilidad)
13. [Paquetes y consumo](#13-paquetes-y-consumo)
14. [Versionado y publicación](#14-versionado-y-publicación)
15. [Checklist de PR](#15-checklist-de-pr)
16. [Roadmap](#16-roadmap)

---

## 1. Principios

```
Simple · Técnico · Minimalista · Consistente · Veterinario · Open Source · SVG First
```

Siete principios y una regla que los ordena a todos:

> ### No dibujamos iconos. Construimos componentes.

Un icono no es una obra individual: es el **ensamblaje** de piezas que ya
existen. La gallina, el gallo, la polla y la reproductora comparten literalmente
el mismo ojo, el mismo pico y la misma pata — no "un ojo parecido", **el mismo
ojo**, el mismo código. Esa es la única forma de que 100 iconos dibujados a lo
largo de años se vean de una sola mano.

Consecuencias prácticas:

- Un `.svg` **no es un archivo fuente**. Es un artefacto compilado.
- Editar un `.svg` a mano es un error: el siguiente build lo revierte.
- Mejorar una pieza mejora todos los iconos que la usan, de una sola vez.

### Qué es y qué no es un icono AviVet

| Es | No es |
| --- | --- |
| Dibujo técnico de manual veterinario | Caricatura o emoji |
| Contorno legible a 16 px | Ilustración con detalle fino |
| Anatómicamente correcto | "Un pollito simpático" |
| Estático | Animado (las animaciones son CSS del consumidor) |
| Monocromo, `currentColor` | Multicolor o con degradados |

---

## 2. Arquitectura del repositorio

```text
avivet-icons/
├── ICON_SPEC.md              ← este documento: la fuente de verdad
├── CONTRIBUTING.md
├── README.md
├── CHANGELOG.md
├── LICENSE                   ← MIT
├── design-tokens.json        ← única fuente de valores de presentación
├── package.json              ← workspaces del monorepo
│
├── packages/
│   ├── core/                 @avivet/icons
│   │   ├── src/
│   │   │   ├── components/   ← EL LEGO. Geometría reutilizable.
│   │   │   └── icons/        ← RECETAS. Un archivo por icono.
│   │   │       └── <categoria>/<id>.icon.mjs
│   │   └── svg/              ← GENERADO: <categoria>/<id>.svg
│   ├── sprite/               @avivet/icons-sprite  → sprite.svg (GENERADO)
│   ├── react/                @avivet/icons-react   → src/Hen.tsx (GENERADO)
│   ├── vue/                  @avivet/icons-vue     → src/Hen.vue (GENERADO)
│   ├── json/                 @avivet/icons-json    → manifest.json (GENERADO)
│   └── css/                  @avivet/icons-css     → avivet-icons.css (GENERADO)
│
├── scripts/                  ← tokens · geometry · build · validate · new-icon
├── tests/                    ← node:test, se ejecutan contra lo GENERADO
├── website/                  ← fuente del sitio de documentación
├── docs/                     ← GENERADO: sitio publicado (GitHub Pages)
├── examples/                 ← integraciones mínimas de referencia
└── .github/workflows/        ← CI: validate + test + build en cada push
```

### Regla de oro de las carpetas

Solo se editan a mano **cuatro** cosas:

```
design-tokens.json · packages/core/src/** · website/** · la documentación
```

Todo lo demás (`packages/*/svg`, `sprite`, `react`, `vue`, `json`, `css`, `docs/`)
es salida de `npm run build` y está declarado como generado en su encabezado.
Un PR que modifique un archivo generado sin modificar su fuente se rechaza.

---

## 3. Design tokens

`design-tokens.json` es la **única** fuente de los valores de presentación.
Ningún `2`, ningún `"round"`, ningún `"currentColor"` se escribe dos veces en
el repositorio.

```jsonc
{
  "canvas":  { "size": 64, "padding": 4, "safeArea": { "min": 4, "max": 60 } },
  "stroke":  { "width": 2, "linecap": "round", "linejoin": "round",
               "color": "currentColor", "minGap": 4 },
  "fill":    "none",
  "keyline": { "square": 48, "circle": 46, "vertical": { "width": 20, "height": 52 } },
  "eye":     { "radius": 1.25, "fill": "currentColor" },
  "anatomy": { "facing": "left" },
  "budget":  { "maxSegments": 18, "maxBytes": 700 },
  "precision": 2,
  "sizes":   { "sm": 16, "md": 24, "lg": 32, "xl": 48, "xxl": 64 }
}
```

| Token | Valor | Por qué |
| --- | --- | --- |
| `canvas.size` | 64 | Divisible por 2, 4, 8 y 16: la retícula cae en píxel entero a 16, 32 y 64 px. |
| `canvas.padding` | 4 | Ningún trazo toca el borde. Área viva 4 → 60. |
| `stroke.width` | 2 | Un solo grosor en toda la biblioteca. |
| `stroke.linecap/join` | `round` | Sin excepciones. |
| `stroke.color` | `currentColor` | Nunca un color fijo. |
| `stroke.minGap` | 4 | Separación mínima entre trazos paralelos: por debajo se fusionan a 16 px. |
| `eye.radius` | 1.25 | Única forma sólida de la biblioteca (§6). |
| `precision` | 2 | Decimales máximos en las coordenadas emitidas. |
| `anatomy.facing` | `left` | Dirección de **todas** las aves. La geometría se escribe una vez mirando a la derecha y el emisor la refleja: cambiar este token voltea la familia entera sin redibujar nada. |
| `budget.maxSegments` | 18 | Techo de complejidad por icono (§11.21). |
| `budget.maxBytes` | 700 | Techo de peso de la geometría emitida. |

### El cambio de un solo archivo

Cambiar `stroke.width` a `1.75` y ejecutar `npm run build` reescribe los 10 SVG,
el sprite, el CSS, los componentes React y Vue y el manifest. **Ningún archivo
fuente cambia.** Ese es el criterio de aceptación del sistema de tokens.

Un token nuevo se añade solo si al menos dos componentes lo consumen.

---

## 4. El sistema de componentes

### 4.1 Las tres capas

```
design-tokens.json     ─┐
                        ├──►  scripts/build.mjs  ──►  artefactos
packages/core/src/      │
  components/  (geometría, sin presentación)
  icons/       (composición)                    ─┘
```

Una **geometría** no sabe de qué grosor se va a pintar. Una **receta** no sabe
en qué formato se va a emitir. Esa separación es lo que permite cambiar el
grosor, añadir un paquete Svelte o exportar a PNG sin tocar ni un dibujo.

### 4.2 El modelo de figura (`Shape`)

Un componente devuelve un array de figuras. Solo existen dos:

```js
{ tag: 'path',   d: 'M12 -20C16 -20 …' }
{ tag: 'circle', cx: 13.5, cy: -15.5, r: 1.25, solid: true }
```

`solid: true` es el único caso que recibe relleno (§6, el ojo). Las figuras
llevan coordenadas **absolutas de canvas** ya resueltas; los atributos de
presentación los añade el emisor a partir de los tokens.

### 4.3 El lápiz (`pen`)

La geometría no se escribe como string. Se dibuja con un lápiz que traslada y
escala:

```js
import { pen } from '../../../../scripts/geometry.mjs';

const p = pen({ at: { x: 32, y: 32 }, scale: 1 });
p.M(12, -20).C(16, -20, 18, -17, 18, -14).Z();
p.d(); // → "M44 12C48 12 50 15 50 18Z"
```

Toda la geometría de un componente se escribe **relativa a su ancla**, nunca en
coordenadas de canvas. Por eso un pico se puede colocar en una gallina, un gallo
o una codorniz sin volver a dibujarlo.

### 4.4 Anclas (`anchors`)

Un componente de contorno declara dónde se enganchan los demás:

```js
{
  shapes:  [ … ],
  anchors: {
    crown: { x: 44, y: 12 },      // dónde va la cresta
    beak:  { x: 50, y: 18 },      // dónde va el pico
    eye:   { x: 45.5, y: 16.5 },
    wing:  { x: 22, y: 34 },
    tail:  { x: 18.5, y: 27 },
    legs:  [ { x: 29.5, y: 46.5 }, { x: 38, y: 46.5 } ]
  }
}
```

Una receta **nunca escribe una coordenada a mano**: pide el ancla. Si mañana se
rediseña el cuerpo del ave, las anclas se mueven y todas las piezas la siguen.

### 4.5 Dos familias de componentes

| Familia | Devuelve | Ejemplos |
| --- | --- | --- |
| **Contorno** | `{ draw(pen), anchors }` — un fragmento de trayectoria que se encadena con otros | `head`, `body`, `neck` |
| **Forma** | `Shape[]` — figuras independientes | `eye`, `beak`, `comb`, `wing`, `tail`, `leg`, `foot`, `drop`, `arrow`, `check`, `cross`, `warning`, `circle`, `rectangle` |

Los componentes de contorno existen porque **la silueta de un ave es un único
`<path>` cerrado** (§6). `head`, `neck` y `body` no son tres dibujos: son tres
tramos del mismo contorno. `silhouette()` los encadena.

Un componente puede componer otros: `leg()` coloca internamente un `foot()` en
su tobillo.

### 4.6 Geometría propia de un icono

Los objetos (balde, frasco, campana) no siempre se reducen a componentes. La
receta puede usar `pen` directamente **si**:

1. la forma no existe en el catálogo, y
2. no es razonable que un segundo icono la reutilice.

Si se usa por segunda vez, deja de ser geometría propia y **se promueve a
componente** en el mismo PR. Es la regla de las dos apariciones.

---

## 5. Catálogo de componentes

Firma, ancla y regla de cada pieza. Ubicación:
`packages/core/src/components/<nombre>.mjs`.

### Anatomía aviar

| Componente | Firma | Ancla | Regla |
| --- | --- | --- | --- |
| `head` | `head({ variant })` | — (inicia el contorno) | Tramo nuca → cráneo → base del pico → garganta. Variantes `adult`, `rooster` (cabeza más alta y erguida) y `chick`. Proporción cabeza/cuerpo: adulto ≈ 1:3, pollito ≈ 1:1.6. |
| `body` | `body({ variant })` | — (continúa el contorno) | Tramo pecho → vientre → dorso → base de cola. Cuatro curvas Bézier, nunca líneas rectas. |
| `neck` | `neck({ variant })` | — (cierra el contorno) | Tramo dorso → nuca. Cierra contra el punto inicial de `head`. |
| `silhouette` | `silhouette({ variant })` | expone todas | Encadena `head + body + neck` en un `<path>` cerrado y publica las anclas. |
| `eye` | `eye({ at })` | `anchors.eye` | Círculo sólido `r = tokens.eye.radius`. Única forma con relleno. Siempre en el tercio frontal-superior de la cabeza. |
| `beak` | `beak({ at, scale })` | `anchors.beak` | Triángulo cerrado 6.5 × 5. Adulto `scale: 1`; pollito `scale: .85`. |
| `comb` | `comb({ at, size })` | `anchors.crown` | Lo que va sobre la cabeza. `single` (gallina, 3 lóbulos) · `big` (gallo, 3 lóbulos y +80 % de altura) · `pea` (en guisante, líneas rústicas) · `tuft` (plumón del pollito, una pluma). |
| `wattle` | `wattle({ at })` | `anchors.beak` | Lóbulo colgante. **Se omite** si queda a menos de `stroke.minGap` del cuello — por eso `hen` no la lleva y `rooster` sí. |
| `wing` | `wing({ at, variant })` | `anchors.wing` | Arcos **abiertos**, jamás una hoja cerrada: una hoja cerrada dentro del cuerpo se lee como un segundo ojo. `adult` y `chick` llevan 2 arcos separados `minGap`; `simple` lleva 1, y solo sirve cuando hay otro trazo cerca que lo apoye — solo, se lee como una línea de vientre. |
| `tail` | `tail({ at, variant })` | `anchors.tail` | Abanico de plumas, una curva por pluma, siempre abiertas. `hen` 3 plumas erguidas · `chick` 1 pluma mínima · `rooster` 2 hoces largas. |
| `leg` | `leg({ at, length, foot })` | `anchors.legs[i]` | Tarso vertical. Adulto 6.5 · pollito 4.5. Compone `foot()` en el tobillo salvo `foot: false`. |
| `foot` | `foot({ at, spread, toes })` | tobillo de `leg` | Dos dedos a ±`spread`. El tercer dedo central (`toes: 3`) se pierde a 16 px y solo suma trazo: se reserva para lienzos grandes. |

### Formas genéricas

| Componente | Firma | Regla |
| --- | --- | --- |
| `egg` | `egg({ at, height })` | Ovoide aviar: asimétrico en el eje polar (agudo arriba, romo abajo) y simétrico en el transversal, como el huevo real. El ancla es el polo agudo. |
| `drop` | `drop({ at, height })` | Punta arriba, base circular. Relación alto:ancho = 3:2. |
| `arrow` | `arrow({ from, to, head })` | Asta recta + punta de 2 segmentos a 45°. |
| `check` | `check({ at, size })` | 2 segmentos a 90°, brazo largo el doble del corto. |
| `cross` | `cross({ at, size, rotate })` | Cruz sanitaria (`rotate: 0`) o aspa de descarte (`rotate: 45`). |
| `warning` | `warning({ at })` | Círculo keyline + asta + punto sólido. |
| `circle` | `circle({ at, r })` | Keyline circular por defecto: `r = keyline.circle / 2`. |
| `rectangle` | `rectangle({ at, width, height, radius })` | Esquinas redondeadas; `radius` por defecto = `canvas.padding / 2`. Con `radius: 0` emite cuatro rectas: el `linejoin` redondo ya redondea las esquinas y así una tapa cuesta 3 segmentos en vez de 8. |

Añadir un componente exige: entrada en esta tabla, geometría relativa a su ancla,
y al menos un icono que lo use en el mismo PR.

---

## 6. Anatomía compartida de las aves

Reglas no negociables para todo icono de la categoría `animals`:

1. **Silueta continua.** Cabeza, cuello, pecho, vientre y dorso son **un solo
   `<path>` cerrado**. Nunca círculos superpuestos: dos arcos que se cruzan
   dentro del cuerpo delatan un dibujo ensamblado a ojo.
2. **El ave mira hacia donde diga `tokens.anatomy.facing`** — hoy, a la
   izquierda, como en las láminas de manual veterinario, donde el animal entra
   desde el margen. La geometría se escribe **siempre mirando a la derecha**;
   el emisor la refleja. Nunca se dibuja un ave ya volteada: eso rompe el
   token.
3. **Mismo ojo, mismo pico, misma pata, misma cresta**, provenientes del mismo
   componente.
4. **Ala y cola van encima** de la silueta, como trazos separados.
5. **El ojo es la única forma sólida** de toda la biblioteca. A 16 px un ojo con
   contorno se convierte en una mancha ilegible; es una decisión de legibilidad,
   no una excepción estética.
6. **Curvas Bézier.** Nada de polilíneas quebradas salvo que la quiebra sea
   intencional y anatómica (el pico, los dedos).

### Errores conocidos (aprendidos dibujando)

| Error | Cómo se ve | Regla que lo evita |
| --- | --- | --- |
| Ala como hoja cerrada | Un segundo ojo flotando en el cuerpo | `wing` usa arcos abiertos |
| Arco solitario bajo la cara del pollito | Una boca triste | El ala del pollito va retrasada, nunca bajo el ojo |
| Barbilla pegada al cuello | Un borrón de tinta a 24 px | `stroke.minGap` = 4 px; si no cabe, la pieza se omite |
| Asa del balde tangente a la boca | Un doble borde, no un asa | Comprobar `minGap` también entre curvas, no solo entre rectas |

---

## 7. Cómo se construye un icono

### 7.1 Formato de receta

`packages/core/src/icons/<categoria>/<id>.icon.mjs`:

```js
import { silhouette, comb, beak, eye, wing, tail, leg } from '../../components/index.mjs';

export default {
  id: 'hen',
  name: 'Hen',
  name_es: 'Gallina',
  category: 'animals',
  keywords: ['layer', 'chicken', 'bird', 'gallina', 'ponedora'],
  since: '0.1.0',

  draw() {
    const bird = silhouette({ variant: 'adult' });
    const { crown, beak: beakAt, eye: eyeAt, wing: wingAt, tail: tailAt, legs } = bird.anchors;

    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'single' }),
      ...beak({ at: beakAt }),
      ...eye({ at: eyeAt }),
      ...wing({ at: wingAt, variant: 'adult' }),
      ...tail({ at: tailAt, variant: 'hen' }),
      ...legs.flatMap((at) => leg({ at, length: 6.5 })),
    ];
  },
};
```

`draw()` es una función **pura**: mismas entradas, mismas figuras. No lee
archivos, no consulta tokens de presentación, no depende del orden de build.

### 7.2 Orden de dibujo

Fijo, para que el apilamiento sea idéntico en toda la biblioteca:

```
1. silueta   2. cresta / barbilla   3. pico   4. ojo
5. ala       6. cola                7. patas  8. accesorios
```

### 7.3 Flujo de trabajo

```bash
npm run new -- rooster animals   # crea la receta desde plantilla
# …editar la receta, componiendo piezas del catálogo…
npm run build                    # genera todos los artefactos
npm test                         # valida contra esta spec
npm run preview                  # abre el sitio con retícula y prueba a 16 px
```

**Se revisa mirando, no leyendo.** Un icono que pasa los tests puede seguir
siendo ilegible. Antes de abrir el PR: verlo a 16 px, con retícula, y en tema
claro y oscuro.

### 7.4 Los cuatro niveles

Ningún icono salta del encargo al sprite. Pasa por cuatro estados, y cada uno
tiene su artefacto:

| Nivel | Qué es | Herramienta | Se aprueba cuando |
| --- | --- | --- | --- |
| **1 · Boceto** | Hoja de construcción: el dibujo sobre su retícula, con área viva, keylines y la tira de tamaños | `npm run sketch -- <id>` → `.sketch/<id>.svg` | Se reconoce **a 16 px** y aguanta **a 128 px** |
| **2 · SVG** | La receta compone piezas del catálogo y el emisor produce el `.svg` | `npm run build` | Los tests 1–20 pasan |
| **3 · Optimización** | Redondeo a `precision`, y los presupuestos de segmentos y bytes | `npm test` | Los tests 21–23 pasan sin excepción injustificada |
| **4 · Sprite** | Entra en `sprite.svg`, el CSS, React, Vue y el manifest | `npm run build` | `git diff --exit-code` limpio |

### 7.5 La regla de los dos extremos

Todo icono debe verse **perfectamente a 16 px y a 128 px**. Son exigencias
opuestas y por eso es la prueba más dura del sistema:

- **A 16 px** manda la simplificación: los trazos a menos de `stroke.minGap` se
  fusionan, los detalles finos se convierten en manchas, un tercer dedo o una
  segunda pluma desaparecen en gris.
- **A 128 px** manda la construcción: las curvas mal empalmadas se ven, un arco
  solitario se lee como un trazo suelto, y una forma "que a 24 px funcionaba"
  se revela como un garabato.

Cuando las dos escalas piden cosas distintas, gana **16 px**: un icono ilegible
a 16 px no sirve para nada, y uno simple a 128 px sigue siendo elegante.

---

## 8. Nomenclatura y categorías

- **Inglés**, `kebab-case`, **singular**: `hen`, `bell-drinker`, `water-drop`.
- El `id` manda: es el nombre del archivo (`hen.icon.mjs` → `hen.svg`), la clase
  CSS (`.ai-hen`), el símbolo del sprite (`#ai-hen`) y el nombre del componente
  React en PascalCase (`Hen`, `BellDrinker`).
- El español y los sinónimos viven en `name_es` y `keywords`, nunca en el `id`.
- Prefijo de espacio de nombres: `ai-`.

| Categoría | Contenido | Ejemplos |
| --- | --- | --- |
| `animals` | Aves y sus estados | hen · rooster · chick · embryo |
| `water` | Agua y bebida | drop · bucket · tank · nipple · bell |
| `medical` | Sanidad, vacunación, registros clínicos | vaccine · medicine · clipboard · thermometer · clock |
| `nutrition` | Materias primas y alimento | corn · soy · wheat · feed · silo |
| `buildings` | Instalaciones y logística | barn · nest · truck · warehouse · feed-mill |
| `biosecurity` | Bioseguridad y sanidad ambiental | virus · mask · boot · disinfection · sprayer |
| `production` | Producción y datos | egg · egg-tray · scale · mortality |
| `ui` | Interfaz y acciones | check · arrow · warning · search |

Renombrar un `id` publicado es un **breaking change** (§14).

---

## 9. Metadatos

Los metadatos viven **en la receta**, no en un archivo aparte: un icono es un
objeto autocontenido.

| Campo | Tipo | Obligatorio | Regla |
| --- | --- | --- | --- |
| `id` | string | ✔ | kebab-case, único, = nombre de archivo |
| `name` | string | ✔ | Inglés, Title Case |
| `name_es` | string | ✔ | Español, para el buscador |
| `category` | string | ✔ | Una de §8 |
| `keywords` | string[] | ✔ | ≥ 4, en ambos idiomas, sin repetir el `id` |
| `since` | semver | ✔ | Versión en la que se publicó |
| `taxon` | string | — | `bird` en las aves. `animals` también contiene cosas que no lo son, como el nido, y las reglas de anatomía solo aplican a las aves. |
| `budget` | objeto | — | `{ maxSegments, maxBytes, reason }`. Sube el techo de §11.21–22 para **este** icono. Exige `reason`: una excepción sin justificar es complejidad que nadie decidió. |
| `deprecated` | string | — | `id` del icono que lo reemplaza |
| `draw` | función | ✔ | Pura, devuelve `Shape[]` |

`packages/json/manifest.json` se genera a partir de estos campos y añade
`viewBox`, `body` y `path`.

---

## 10. Pipeline de build

```
design-tokens.json ─┐
components/  ───────┼─► draw() ─► Shape[] ─► emit ─┬─► packages/core/svg/*.svg
icons/       ───────┘                              ├─► packages/sprite/sprite.svg
                                                   ├─► packages/json/manifest.json
                                                   ├─► packages/css/avivet-icons.css
                                                   ├─► packages/react/src/*.tsx
                                                   ├─► packages/vue/src/*.vue
                                                   └─► docs/  (sitio)
```

`scripts/build.mjs` es determinista: mismas fuentes ⇒ bytes idénticos. Por eso
la CI puede ejecutar `npm run build && git diff --exit-code` y detectar
artefactos desincronizados.

### Formato de salida de un `.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img">
  <title>Hen</title>
  <path d="…"/>
</svg>
```

Reglas del emisor:

- Coordenadas redondeadas a `tokens.precision` decimales, sin ceros de relleno.
- **Ningún `id`** dentro del archivo: los iconos se inlinean y los `id`
  colisionan. Los únicos `id` del proyecto son los `<symbol>` del sprite.
- Sin `style=`, sin `class=`, sin `<image>`, sin `<text>`, sin metadatos de editor.
- Un solo nivel de anidamiento: nada de `<g>` decorativos.

---

## 11. Validación y tests

`npm test` ejecuta `node:test` sobre los artefactos generados. Un icono no
existe hasta que pasa **todas** estas comprobaciones:

### Contra los tokens

| # | Comprobación | Fallo típico |
| --- | --- | --- |
| 1 | `viewBox` = `0 0 64 64` | Se dibujó en otro lienzo |
| 2 | `stroke` = `currentColor` | Color quemado |
| 3 | `stroke-width` = `tokens.stroke.width` | Grosor mixto |
| 4 | `stroke-linecap` y `linejoin` = `round` | Remates cuadrados |
| 5 | `fill` = `none` en la raíz | Silueta rellena |
| 6 | Sin literales de color (`#hex`, `rgb()`, nombres CSS) | Verde quemado |
| 7 | Sin `style=`, `class=`, `<image>`, `<text>` | SVG exportado de un editor |
| 8 | Sin `id=` en el cuerpo | Colisión al inlinear |

### De contenido

| # | Comprobación | Fallo típico |
| --- | --- | --- |
| 9 | `<title>` presente y = `name` | Icono mudo para lectores de pantalla |
| 10 | `role="img"` en la raíz | Sin semántica |
| 11 | Relleno **solo** en el ojo (`circle`, `r ≤ 1.5`) | Se rellenó una forma |
| 12 | Toda la geometría dentro del área viva 4 → 60 | El dibujo toca el borde |
| 13 | `id` kebab-case, único, = nombre de archivo | Colisión en el sprite |
| 14 | ≥ 4 `keywords`, en ambos idiomas | Icono no buscable |
| 15 | `since` es semver válido | Historial roto |

### De presupuesto

Un icono que crece en trazos deja de leerse a 16 px mucho antes de que se note
a 64. Estos límites impiden que la complejidad se cuele sin que nadie la decida.

| # | Comprobación | Fallo típico |
| --- | --- | --- |
| 21 | Segmentos ≤ `budget.maxSegments` (o el `budget` declarado en la receta) | El dibujo creció detalle a detalle |
| 22 | Bytes de geometría ≤ `budget.maxBytes` | Curvas de más, decimales de más |
| 23 | El sprite completo cabe en `maxBytes × nº de iconos` | La biblioteca engorda sin que nadie lo mire |

Una receta puede superar el techo global **solo** declarando `budget` con su
`reason`, y con dos límites: la excepción no puede pasar del 150 % del techo, y
solo la familia `animals` puede pedirla. Un objeto que no cabe en 18 segmentos
está mal simplificado, no es un objeto complejo.

### De sistema

| # | Comprobación |
| --- | --- |
| 16 | El build es determinista (dos ejecuciones ⇒ bytes idénticos) |
| 17 | Toda receta produce ≥ 1 figura |
| 18 | El manifest y los `.svg` coinciden uno a uno |
| 19 | Cada símbolo del sprite corresponde a un icono del manifest |
| 20 | Existe componente React y Vue por cada icono |

`stroke.minGap` (4 px entre trazos paralelos) **no se valida automáticamente**:
requiere criterio. Es responsabilidad de la revisión visual del PR (§15).

---

## 12. Accesibilidad

Un icono es decorativo o informativo, y **el consumidor decide cuál**:

| Contexto | Salida |
| --- | --- |
| `.svg` suelto, sprite, Word, Canva | `role="img"` + `<title>` — el nombre se anuncia |
| React / Vue sin prop `title` | `aria-hidden="true"` + `focusable="false"` — decorativo, el texto vecino ya lo dice |
| React / Vue con prop `title` | `role="img"` + `<title>` + `aria-labelledby` |

Por eso `<title>` y `aria-hidden` no se contradicen: viven en artefactos
distintos, para usos distintos.

Además: el color lo pone el consumidor vía `currentColor`, así que el contraste
es responsabilidad suya — pero la documentación **debe** mostrar cada icono en
tema claro y oscuro para que el problema sea visible.

---

## 13. Paquetes y consumo

| Paquete | Qué entrega | Uso |
| --- | --- | --- |
| `@avivet/icons` | `svg/**` + recetas + componentes | Fuente, y SVG sueltos para Word/Canva |
| `@avivet/icons-sprite` | `sprite.svg` | `<svg><use href="sprite.svg#ai-hen"/></svg>` |
| `@avivet/icons-css` | `avivet-icons.css` | `<i class="ai ai-hen"></i>` — hereda color y tamaño del texto |
| `@avivet/icons-react` | `Hen.tsx`, … | `<Hen size={24} title="Gallina" />` |
| `@avivet/icons-vue` | `Hen.vue`, … | `<Hen :size="24" />` |
| `@avivet/icons-json` | `manifest.json` | Buscadores, generadores, herramientas propias |

### Contrato de los componentes de framework

```ts
interface IconProps {
  size?: number | string;   // por defecto tokens.sizes.md (24)
  title?: string;           // si se pasa, el icono pasa a ser informativo
  className?: string;
  // el resto de props se reenvía al <svg>
}
```

El color **nunca** es una prop: se hereda con `currentColor`. Esa es la razón de
ser del token.

---

## 14. Versionado y publicación

Semver, sobre la **superficie pública** (ids, nombres de componentes, props):

| Cambio | Versión |
| --- | --- |
| Iconos nuevos | minor |
| Redibujo que mejora un icono sin cambiar su `id` | patch |
| Cambio de un token de presentación (p. ej. `stroke.width`) | minor — cambia el aspecto de todo |
| Renombrar o eliminar un `id`, cambiar una prop | **major** |
| Corrección de metadatos o keywords | patch |

Un `id` nunca se borra de golpe: primero se marca `deprecated` apuntando al
reemplazo, se mantiene una versión minor completa, y se elimina en la siguiente
major.

### Publicar una versión

```bash
npm run build                      # 1. regenerar todos los artefactos
npm test                           # 2. la suite completa en verde
git diff --exit-code               # 3. sin artefactos desincronizados
# 4. anotar los cambios en CHANGELOG.md (Keep a Changelog)
npm version <major|minor|patch>    # 5. sube la versión y crea el tag
git push --follow-tags             # 6. la CI publica los paquetes y el sitio
```

`design-tokens.json`, el `package.json` raíz y el `CHANGELOG` deben declarar la
misma versión. Un test lo comprueba.

---

## 15. Checklist de PR

**Automático** (`npm test`, obligatorio en CI):

- [ ] Las 20 comprobaciones de §11 en verde
- [ ] `git diff --exit-code` limpio tras `npm run build`

**Humano** (revisión visual, no automatizable):

- [ ] El icono se reconoce **a 16 px** sin leer la etiqueta
- [ ] Ningún par de trazos paralelos por debajo de 4 px
- [ ] Ninguna forma cerrada dentro de un cuerpo que se lea como un ojo
- [ ] Se ve bien en tema claro y en tema oscuro
- [ ] Reutiliza el catálogo; la geometría propia está justificada en un comentario
- [ ] Si una forma se usa por segunda vez, se promovió a componente (§4.6)
- [ ] La entrada del `CHANGELOG` explica **por qué**, no solo **qué**

---

## 16. Roadmap

Se trabaja **por familias**, no icono a icono: cuando una familia se cierra,
cualquier miembro nuevo hereda su estilo sin decisiones nuevas. Terminada la
familia de aves, una codorniz, un pato o un pavo son una variante de contorno
más, no un dibujo desde cero.

| Familia | Iconos | Estado |
| --- | --- | --- |
| **A · Animales** | hen · rooster · chick · egg · nest | ✅ |
| **B · Agua** | drop · nipple · bell-drinker · bucket · flush | ⏳ falta `flush` |
| **C · Sanidad** | vaccine-bottle · thermometer · clipboard · clock · check | ⏳ faltan `thermometer` y `check` |

| Versión | Alcance | Estado |
| --- | --- | --- |
| v0.1 | Sistema de componentes + 10 iconos | ✅ |
| v0.2 | Familia A completa · 25 iconos · `nutrition` y `buildings` | ⏳ |
| v0.5 | 50 iconos · paquetes publicados en npm | ⏳ |
| v1.0 | 100 iconos · sitio con búsqueda y descarga | ⏳ |
| v2.0 | Escenas: composiciones de varios componentes (galpón en producción, cadena de frío de la vacuna) | ⏳ |

**v2.0 es la razón de toda esta arquitectura.** Una escena no es un icono
grande: es el mismo sistema de componentes ensamblado sobre un lienzo mayor.
Si las piezas están bien construidas, las escenas salen casi gratis.
