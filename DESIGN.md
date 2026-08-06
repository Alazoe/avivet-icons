# AviVet Icons — Brand Book

> El ADN gráfico de la biblioteca. **Ningún icono entra al repositorio si no cumple estas reglas.**
> Versión del sistema: 1.0

---

## 1. Filosofía

| Principio | Qué significa en la práctica |
| --- | --- |
| Simple | Máximo ~8 trazos por icono. Si necesita más, el icono está mal pensado. |
| Veterinario | Anatomía correcta: la cresta va donde va, el nipple gotea hacia abajo. |
| Minimalista | Sin sombras, sin degradados, sin relleno decorativo. |
| Escalable | Legible a 16 px y a 512 px sin cambiar nada. |
| Imprimible | Solo contorno: funciona en blanco y negro, en fotocopia y en serigrafía. |
| Responsive | `currentColor` + `em`: hereda color y tamaño del texto que lo rodea. |
| Producción avícola | El vocabulario es de galpón, no de stock photo. |

**No** son caricaturas. **No** son emoji. Son **dibujos técnicos de manual veterinario**.

---

## 2. Grid

```
64 × 64 px    →  sin excepciones
```

| Zona | Medida | Uso |
| --- | --- | --- |
| Canvas | 64 × 64 | `viewBox="0 0 64 64"` |
| Padding de seguridad | 4 px | Nada del dibujo entra en el borde exterior |
| Área viva | 56 × 56 (4 → 60) | Todo el icono vive aquí |
| Keyline cuadrado | 48 × 48 (8 → 56) | Formas rectangulares (clipboard, caja, vial) |
| Keyline círculo | Ø 46 (r 23, centro 32,32) | Formas circulares (reloj, huevo, señales) |
| Keyline vertical | 20 × 52 | Formas altas y angostas (gota, botella) |

Las formas circulares se dibujan **un poco más grandes** que las cuadradas: es
compensación óptica, no un error.

---

## 3. Trazo

```svg
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
fill="none"
```

- **Grosor: 2 px siempre.** No hay trazos finos ni gruesos.
- **Nunca** un color fijo (`#000`, `#2e7d32`, …). Solo `currentColor`.
- Coordenadas preferentemente en múltiplos de 0.5 px.
- Separación mínima entre dos trazos paralelos: **4 px** (a 16 px se fusionarían).

### Única excepción de relleno: el ojo

```svg
<circle cx="…" cy="…" r="1.25" fill="currentColor" stroke="none"/>
```

El ojo es el único elemento sólido de la biblioteca. Da vida al animal y a esa
escala un ojo con contorno se convierte en una mancha ilegible.

---

## 4. Alfabeto visual (kit de componentes)

Este es el corazón del sistema. **Los iconos no se dibujan a ojo: se ensamblan
con estas piezas**, trasladadas y escaladas ligeramente. Así un gallo, una polla
y una reproductora son inequívocamente de la misma familia.

Las piezas viven en [`src/_primitives/`](src/_primitives/) y se documentan aquí
con su geometría canónica.

| Pieza | Archivo | Regla |
| --- | --- | --- |
| Ojo | `eye.svg` | Punto sólido r = 1.25. Siempre en el tercio frontal-superior de la cabeza. |
| Pico | `beak.svg` | Triángulo cerrado de 6 px de largo × 4.5 px de alto. Ave adulta: horizontal. Pollito: mismo pico, 20 % más corto. |
| Cresta | `comb.svg` | 3 lóbulos. El central es el más alto. Ancho total ≈ 10 px. |
| Barbilla | `wattle.svg` | Lóbulo colgante bajo el pico, ≈ 6 px. Se **omite** cuando quedaría a menos de 4 px del trazo del cuello (por eso `hen` no la lleva). |
| Ala | `wing.svg` | Arcos **abiertos**, nunca una hoja cerrada: una hoja cerrada dentro del cuerpo se lee como un segundo ojo. Adulto 2 arcos a 4 px; pollito 2 arcos cortos y retrasados. |
| Cola | `tail.svg` | Pluma abierta. Gallina: corta y erguida. Gallo: 3 hoces largas. |
| Pata | `leg.svg` | Tarso vertical de 5–7 px + 3 dedos (dos a ±3.5 px, uno recto de 3.5 px). |
| Cuerpo | `body.svg` | Blob de 4 curvas: pecho adelante, vientre bajo, dorso recto, base de cola atrás. |
| Gota | `water-drop.svg` | Punta arriba, base circular. Relación alto:ancho = 3:2. |
| Check | `check.svg` | 2 segmentos, ángulo 90°, brazo largo el doble del corto. |
| Flecha | `arrow.svg` | Asta recta + punta de 2 segmentos a 45°. |
| Advertencia | `warning.svg` | Círculo Ø 46 + signo interior. |

### Anatomía compartida entre aves

Todas las aves de la biblioteca cumplen:

1. **Mismo ojo** (r 1.25 sólido), **mismo pico** (triángulo cerrado), **misma
   pata** (tarso + 3 dedos), **misma cresta** (3 lóbulos).
2. Silueta **continua**: cabeza + cuello + pecho + vientre + dorso son **un solo
   `<path>` cerrado**. Nunca círculos superpuestos.
3. El ave mira **hacia la derecha**.
4. Ala y cola son trazos **separados**, encima de la silueta.
5. Proporción cabeza/cuerpo: adulto ≈ 1:3 · pollito ≈ 1:1.6.

---

## 5. Nomenclatura

- Todo en **inglés**, `kebab-case`, singular: `hen`, `bell-drinker`, `water-drop`.
- El archivo se llama igual que el `id`: `src/animals/hen.svg` → `id: "hen"`.
- Los sinónimos y el español van en `keywords`, no en el nombre del archivo.
- Prefijo en el sprite y en CSS: `ai-` (`#ai-hen`, `.ai-hen`).

### Categorías

`animals` · `water` · `vaccine` · `equipment` · `biosecurity` · `nutrition` ·
`production` · `ui`

---

## 6. Metadatos

Fuente de verdad: [`metadata.json`](metadata.json). Cada icono declara:

```json
{
  "id": "hen",
  "name": "Hen",
  "name_es": "Gallina",
  "category": "animals",
  "keywords": ["layer", "chicken", "bird", "aviculture", "gallina", "ponedora"],
  "version": "1.0"
}
```

`json/manifest.json` es **generado** por el build y añade ruta, viewBox y el
cuerpo del SVG. No se edita a mano.

---

## 7. Checklist antes de aceptar un icono

- [ ] `viewBox="0 0 64 64"`
- [ ] `stroke-width="2"`, `stroke-linecap`/`linejoin` `round`
- [ ] `stroke="currentColor"` y `fill="none"` en la raíz
- [ ] Sin colores literales, sin `style=`, sin `<image>`, sin `id` internos
- [ ] Todo el dibujo dentro del área viva (4 → 60)
- [ ] Legible a 16 px (probar en `docs/index.html`)
- [ ] Reutiliza piezas del alfabeto visual
- [ ] Entrada añadida en `metadata.json`
- [ ] `npm run validate` en verde

`npm run validate` comprueba automáticamente los primeros cinco puntos.
