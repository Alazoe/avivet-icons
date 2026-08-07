# Design Tokens

**Todos los valores de presentación de AviVet Icons viven en un solo archivo:**

```
packages/core/design-tokens.json
```

Ningún `2`, ningún `"round"`, ningún `"currentColor"` se escribe dos veces en el
repositorio. Si lo ves repetido, es un bug.

---

## 1. El criterio de aceptación

Un sistema de tokens no se juzga por tenerlos, sino por esto:

> Cambiar `stroke.width` a `1.75` y ejecutar `pnpm build` debe reescribir **todos**
> los SVG, el sprite, el CSS, los componentes React y Vue y el manifest,
> **sin que cambie ni un archivo fuente.**

Comprobado: el cambio de un carácter modificó **33 artefactos generados y 0
fuentes**. Ese es el listón. Un token que no se comporta así no es un token, es
una constante con buena prensa.

Lo vigilan dos tests:

- **§3 de `system.test.ts`** — el grosor _emitido_ sale del token, no de una
  constante escrita en el emisor.
- **Comprobación 16** — los artefactos en disco coinciden con lo que producen las
  recetas.

---

## 2. Cómo llega un token al SVG

```
packages/core/design-tokens.json
        │
        ├─► tokens.ts        congela el JSON y lo tipa
        │       │
        │       ├─► geometry.ts   precisión, centro del lienzo, dirección del ave
        │       ├─► emit.ts       ← ÚNICO lugar que convierte tokens en atributos
        │       └─► components/   radio del ojo, keylines, separación mínima
        │
        └─► svgo.config.ts   floatPrecision atado a tokens.precision
```

**`emit.ts` es el único archivo del proyecto que escribe atributos de
presentación.** Los componentes producen geometría; el emisor la viste. Esa
separación es lo que hace posible el criterio de §1.

---

## 3. El archivo completo

```jsonc
{
  "version": "0.3.0",

  "canvas": {
    "size": 64,
    "padding": 4,
    "safeArea": { "min": 4, "max": 60 },
    "controlTolerance": 1,
  },

  "stroke": {
    "width": 2,
    "linecap": "round",
    "linejoin": "round",
    "color": "currentColor",
    "minGap": 4,
  },

  "fill": "none",

  "keyline": {
    "square": 48,
    "circle": 46,
    "vertical": { "width": 20, "height": 52 },
  },

  "eye": { "radius": 1.25, "fill": "currentColor" },

  "anatomy": { "facing": "left" },

  "budget": { "maxSegments": 18, "maxBytes": 700 },

  "precision": 2,

  "sizes": { "sm": 16, "md": 24, "lg": 32, "xl": 48, "xxl": 64 },

  "namespace": "ai",
}
```

---

## 4. Token por token

### `version`

La versión del sistema de diseño. **Debe coincidir con la del monorepo**: hay un
test que falla si divergen, porque un token cambiado sin subir versión es un
cambio de aspecto que nadie anunció.

### `canvas`

| Token                     | Valor    | Por qué                                                                                            |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `canvas.size`             | `64`     | Divisible por 2, 4, 8 y 16: la retícula cae en píxel entero a 16, 32 y 64 px                       |
| `canvas.padding`          | `4`      | Ningún trazo toca el borde; evita recortes en contenedores con `overflow: hidden`                  |
| `canvas.safeArea`         | `4 → 60` | El área viva. Todo punto **sobre la curva** vive aquí                                              |
| `canvas.controlTolerance` | `1`      | Los puntos de **control** de una Bézier pueden salirse 1 px: no se dibujan, solo tiran de la curva |

Esa última distinción importa. Un punto de control en `y = 3` es legítimo —el asa
del balde lo necesita para arquearse—, pero un punto sobre la curva en `y = 3`
significa que el dibujo se sale. La comprobación 12 los mide por separado.

### `stroke`

| Token             | Valor          | Por qué                                                                                              |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `stroke.width`    | `2`            | Un solo grosor en toda la biblioteca. A 64 px es 1/32 del lienzo: visible a 16 px, elegante a 128 px |
| `stroke.linecap`  | `round`        | Un trazo cortado en seco delata dibujo vectorial; redondo, parece hecho con un instrumento           |
| `stroke.linejoin` | `round`        | Además ahorra: con esquinas redondas, un rectángulo cuesta 3 segmentos en vez de 8                   |
| `stroke.color`    | `currentColor` | El icono hereda el color del texto. Nunca un color fijo                                              |
| `stroke.minGap`   | `4`            | Dos trazos paralelos más juntos **se fusionan a 16 px**                                              |

`minGap` es el único token que **no se valida automáticamente**: distinguir dos
trazos paralelos de dos trazos que se cruzan requiere criterio. Es
responsabilidad de la revisión visual.

### `fill`

`"none"`. La biblioteca es de contorno. La única forma sólida es el ojo, y tiene
su propio token para que la excepción esté declarada y no escondida.

### `keyline`

| Token              | Valor     | Para qué                                     |
| ------------------ | --------- | -------------------------------------------- |
| `keyline.square`   | `48`      | Formas rectangulares: planilla, caja, frasco |
| `keyline.circle`   | `46`      | Formas circulares: reloj, señales            |
| `keyline.vertical` | `20 × 52` | Formas altas y angostas: gota, botella       |

**El círculo es mayor que el cuadrado a propósito.** Un círculo de 48 se ve más
pequeño que un cuadrado de 48 a igual medida; la compensación óptica vive aquí y
no en el criterio de quien dibuja.

### `eye`

| Token        | Valor          | Por qué                                                |
| ------------ | -------------- | ------------------------------------------------------ |
| `eye.radius` | `1.25`         | El punto más pequeño que sigue siendo un punto a 16 px |
| `eye.fill`   | `currentColor` | Único relleno de la biblioteca                         |

Es una decisión de legibilidad, no estética: a 16 px un ojo con contorno se
convierte en una mancha. El componente `warning` reutiliza este mismo radio para
su punto, porque en esta biblioteca "punto sólido" es una sola cosa.

### `anatomy`

| Token            | Valor    | Por qué                         |
| ---------------- | -------- | ------------------------------- |
| `anatomy.facing` | `"left"` | Dirección de **todas** las aves |

El token más potente del archivo. La geometría de las aves se escribe **una vez
mirando a la derecha**; el emisor la refleja. Cambiar esta palabra volteó la
familia entera —gallina, gallo, pollito, con sus crestas, picos, alas y colas—
**sin tocar una sola receta**.

Las formas genéricas (gota, reloj, balde) no lo usan: no tienen lateralidad.

### `budget`

| Token                | Valor | Por qué                               |
| -------------------- | ----- | ------------------------------------- |
| `budget.maxSegments` | `18`  | Techo de complejidad por icono        |
| `budget.maxBytes`    | `700` | Techo de peso de la geometría emitida |

Un icono que crece en trazos deja de leerse a 16 px mucho antes de que se note a 64. Estos techos impiden que la complejidad se cuele sin que nadie la decida.

Se pueden superar **solo** declarando un `budget` con su `reason` en la receta,
con dos límites: la excepción no pasa del 150 % del techo, y solo la familia
`animals` puede pedirla.

### `precision`

`2` decimales máximos en las coordenadas emitidas. Está atado a SVGO
(`floatPrecision`), así que subir la precisión aquí la sube también en la
optimización: no hay que acordarse de dos sitios.

### `sizes`

| Alias | px  | Uso                                                   |
| ----- | --- | ----------------------------------------------------- |
| `sm`  | 16  | El tamaño que decide si un icono está bien dibujado   |
| `md`  | 24  | Por defecto en React y Vue                            |
| `lg`  | 32  | Botones, tarjetas                                     |
| `xl`  | 48  | Cabeceras, vacíos                                     |
| `xxl` | 64  | Tamaño nativo; el segundo extremo de la prueba es 128 |

Generan las clases `.ai-size-*` del CSS y el valor por defecto de la prop `size`.

### `namespace`

`"ai"`. Prefijo de las clases CSS (`.ai-hen`) y de los símbolos del sprite
(`#ai-hen`). Está en un token para que un consumidor con una colisión de nombres
pueda regenerar la biblioteca con otro prefijo.

---

## 5. Qué NO es un token

No todo valor repetido merece serlo. **Un token nuevo se añade solo si al menos
dos componentes lo consumen.**

| No es token                            | Dónde vive                     | Por qué                                           |
| -------------------------------------- | ------------------------------ | ------------------------------------------------- |
| La longitud del tarso de un ave        | `leg({ length })` en la receta | Cambia entre adulto y pollito                     |
| El ancho del ala                       | `wing({ scale })`              | Es proporción del cuerpo, no del sistema          |
| La altura de una gota                  | `drop({ height })`             | La misma gota sirve a escala completa y de nipple |
| Las coordenadas de una silueta         | `components/head.ts`           | Es geometría, no presentación                     |
| Los colores del sitio de documentación | `website/preview.css`          | El sitio no es la biblioteca                      |

La línea es clara: **si el consumidor lo puede ver, probablemente es token; si
solo lo ve quien dibuja, es geometría.**

---

## 6. Cambiar un token

Un token afecta a **todos** los iconos a la vez. Por eso:

1. **Issue previo** con la justificación.
2. Es como mínimo una versión **minor** — cambia el aspecto de toda la biblioteca.
3. Hay que adjuntar la **hoja de contacto completa antes y después**:

```bash
pnpm sketch          # las hojas de construcción de los 12 iconos
pnpm build && pnpm test
```

4. La versión de `design-tokens.json` sube junto con la del monorepo, o el test
   de coherencia falla.

---

## 7. Consumir los tokens

Los tokens se publican con el paquete core:

```ts
import { tokens } from '@avivet/icons';

tokens.canvas.size; // 64
tokens.stroke.width; // 2
tokens.sizes.md; // 24
```

O directamente el JSON, para herramientas que no sean JavaScript:

```ts
import tokens from '@avivet/icons/design-tokens.json' with { type: 'json' };
```

El objeto está **congelado en profundidad**: intentar mutarlo en tiempo de
ejecución no hace nada. Los tokens se cambian en el archivo y se reconstruye.
