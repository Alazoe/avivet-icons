# AviVet Icons

**Open Source Poultry SVG Library** · v1.0.0 · Licencia MIT

Biblioteca de iconos SVG para producción avícola: dibujos técnicos de manual
veterinario, no caricaturas. Pensados para usarse igual en una página web, una
presentación, una infografía, un informe en Word o una app.

| | |
| --- | --- |
| Grid | 64 × 64 px |
| Trazo | 2 px, `stroke-linecap`/`linejoin` `round` |
| Color | `currentColor` (nunca un color fijo) |
| Iconos | 10 (Fase 1) |
| Licencia | MIT |

Las reglas completas del sistema gráfico están en **[DESIGN.md](DESIGN.md)** — el
brand book. Ningún icono entra al repositorio si no las cumple.

---

## Ver la biblioteca

```bash
open docs/index.html
```

Buscador en español e inglés, filtro por categoría, previsualización a 24/32/48 px,
retícula de construcción y copiado del SVG con un clic. También hay una versión de
un solo archivo, lista para compartir por correo o WhatsApp:
`dist/avivet-icons-preview.html`.

---

## Cómo usar los iconos

### 1. Sprite (recomendado para web)

Un solo archivo para toda la biblioteca.

```html
<svg class="ai" width="24" height="24"><use href="sprite/avivet-icons.svg#ai-hen"/></svg>
```

```css
.ai { fill: none; stroke: currentColor; }
```

### 2. CSS

Hereda color y tamaño del texto que lo rodea, sin tocar el HTML del SVG.

```html
<link rel="stylesheet" href="css/avivet-icons.css">

<i class="ai ai-hen"></i>
<i class="ai ai-lg ai-vaccine-bottle" style="color:#0F6B4F"></i>
```

Modificadores de tamaño: `.ai-sm` (0.875em), `.ai-lg` (1.5em), `.ai-xl` (2.5em).

### 3. SVG suelto

Para Word, PowerPoint, Canva o Illustrator: toma el archivo directo de `src/`.
Como el trazo usa `currentColor`, en esas herramientas se abre en negro y se
recolorea con el selector de color de la propia app.

### 4. Desde JavaScript

`json/manifest.json` trae los metadatos y el cuerpo de cada icono, listo para
consumir desde cualquier framework.

```js
const { icons } = await fetch('json/manifest.json').then(r => r.json());
const hen = icons.find(i => i.id === 'hen');
el.innerHTML = `<svg viewBox="${hen.viewBox}" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${hen.body}</svg>`;
```

---

## Iconos disponibles

| Icono | id | Categoría |
| --- | --- | --- |
| Gallina | `hen` | animals |
| Pollito | `chick` | animals |
| Huevo | `egg` | production |
| Gota de agua | `water-drop` | water |
| Balde | `bucket` | equipment |
| Frasco de vacuna | `vaccine-bottle` | vaccine |
| Bebedero nipple | `nipple-drinker` | water |
| Bebedero campana | `bell-drinker` | water |
| Planilla de registro | `clipboard` | ui |
| Reloj | `clock` | ui |

---

## Desarrollo

```bash
npm run validate      # aplica el checklist del brand book a todos los SVG
npm run build         # genera sprite, CSS, manifest y el sitio de docs
npm run new -- rooster animals   # crea src/animals/rooster.svg con la plantilla
```

### Añadir un icono

1. `npm run new -- <id> <categoria>` — crea el archivo con el encabezado correcto.
2. Dibújalo **ensamblando las piezas de `src/_primitives/`**, no a ojo.
3. Añade su entrada en `metadata.json` (nombre, nombre en español, keywords).
4. `npm run validate && npm run build`.
5. Revísalo a 24 px en `docs/index.html` con la retícula activada.

`validate` comprueba automáticamente viewBox, grosor, remates, `currentColor`,
ausencia de colores literales y que el dibujo quede dentro del área viva.

### Estructura

```text
avivet-icons/
├── DESIGN.md              # brand book: el ADN gráfico
├── metadata.json          # fuente de verdad de los metadatos
├── src/
│   ├── _primitives/       # alfabeto visual (ojo, pico, cresta, pata, ala…)
│   ├── animals/  water/  vaccine/  equipment/
│   ├── biosecurity/  nutrition/  production/  ui/
├── sprite/                # generado
├── css/                   # generado
├── json/                  # generado
├── docs/                  # sitio con buscador
├── dist/                  # preview en un solo archivo
└── tools/                 # validate · build · new-icon
```

Todo lo marcado como *generado* sale de `npm run build`: no se edita a mano.

---

## Hoja de ruta

| Fase | Objetivo | Estado |
| --- | --- | --- |
| 0 | Sistema gráfico (brand book + alfabeto visual) | ✅ |
| 1 | 10 iconos principales | ✅ |
| 2 | 25 iconos | ⏳ |
| 3 | 50 iconos (v1.0 completa) | ⏳ |
| 4 | Sitio web con buscador y vista previa | ✅ (base lista) |
| 5 | Publicación en GitHub + licencia MIT | ⏳ |

### Candidatos para la Fase 2

`rooster` · `pullet` · `broiler` · `feeder-pan` · `feed-bag` · `syringe` ·
`eye-drop` · `spray-vaccination` · `drinking-water-vaccination` · `nest` ·
`egg-tray` · `incubator` · `house` (galpón) · `fan` · `heater` · `thermometer` ·
`humidity` · `scale` (peso) · `mortality` · `biosecurity-boots` · `shower` ·
`disinfection` · `truck` · `visitor-log` · `alert`

---

## Licencia

MIT © Andrés Lazo. Úsalos, modifícalos y redistribúyelos, incluso comercialmente,
manteniendo el aviso de licencia.
