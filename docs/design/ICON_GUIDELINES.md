# Reglas de dibujo

**Las reglas concretas para dibujar un icono AviVet.** El _por qué_ está en
[`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md); los valores, en
[`DESIGN_TOKENS.md`](DESIGN_TOKENS.md).

Todo lo que aquí aparece como número sale de
[`packages/core/design-tokens.json`](../../packages/core/design-tokens.json).
Si un valor de este documento y el token no coinciden, **manda el token**.

---

## 1. El lienzo

| Regla     | Valor          | Token             |
| --------- | -------------- | ----------------- |
| Grid      | **64 × 64 px** | `canvas.size`     |
| Padding   | **4 px**       | `canvas.padding`  |
| Área viva | **4 → 60**     | `canvas.safeArea` |
| `viewBox` | `0 0 64 64`    | derivado          |

Sin excepciones. 64 es divisible por 2, 4, 8 y 16, así que la retícula cae en
píxel entero a 16, 32 y 64 px.

**Ningún trazo toca el borde.** El padding no es margen decorativo: es lo que
impide que un icono se recorte cuando alguien lo mete en un botón con
`overflow: hidden`.

### Keylines

Las formas circulares se dibujan **algo mayores** que las cuadradas. Es
compensación óptica, no un error:

| Forma    | Medida                    | Token              |
| -------- | ------------------------- | ------------------ |
| Cuadrada | 48 × 48 (8 → 56)          | `keyline.square`   |
| Circular | Ø 46 (r 23, centro 32,32) | `keyline.circle`   |
| Vertical | 20 × 52                   | `keyline.vertical` |

---

## 2. El trazo

```svg
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
```

| Regla                                    | Valor                                   | Token                         |
| ---------------------------------------- | --------------------------------------- | ----------------------------- |
| Grosor                                   | **2 px, siempre**                       | `stroke.width`                |
| Remates                                  | **`round`**, siempre                    | `stroke.linecap` / `linejoin` |
| Color                                    | **`currentColor`**, nunca un color fijo | `stroke.color`                |
| Relleno                                  | **`none`**                              | `fill`                        |
| Separación mínima entre trazos paralelos | **4 px**                                | `stroke.minGap`               |
| Precisión de coordenadas                 | **2 decimales**                         | `precision`                   |

### La separación de 4 px

Es la regla que más se olvida y la que más daño hace. Dos trazos paralelos a
menos de 4 px **se fusionan a 16 px** y el icono pierde la forma.

Aplica también **entre curvas**, no solo entre rectas. El asa del balde tuvo que
arquearse hasta y=4 porque, más plana, quedaba casi tangente al borde de la boca
y se leía como un segundo borde.

Esta regla **no se valida automáticamente**: requiere criterio. Es
responsabilidad de la revisión visual del PR.

### La única excepción de relleno: el ojo

```svg
<circle cx="…" cy="…" r="1.25" fill="currentColor" stroke="none"/>
```

El ojo es el único elemento sólido de toda la biblioteca. A 16 px un ojo con
contorno se convierte en una mancha. Cualquier otro relleno hace fallar el
test 11.

---

## 3. Prohibiciones

Nada de esto entra en un icono AviVet:

| Prohibido                                            | Motivo                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| **Sombras**                                          | No existen en un dibujo a línea                                      |
| **Degradados**                                       | Rompen `currentColor` y no se imprimen                               |
| **Rellenos**                                         | Salvo el ojo. Destruyen la lectura en fotocopia                      |
| **Perspectiva**                                      | Un icono es un signo, no una ilustración                             |
| **Texto** (`<text>`)                                 | No se traduce, no escala, no es accesible                            |
| **Colores literales** (`#hex`, `rgb()`, nombres CSS) | El color lo pone quien consume                                       |
| **Transparencia** (`opacity`, alfa)                  | Se ve distinta sobre cada fondo                                      |
| **Animación** (`<animate>`, SMIL)                    | Los SVG son estáticos; la animación es CSS del consumidor            |
| **`<image>`**                                        | Un icono es geometría, no un mapa de bits                            |
| **`style=`**                                         | Rompe la herencia de color                                           |
| **`class=`**                                         | Colisiona con el CSS del consumidor                                  |
| **`id=` en el cuerpo**                               | Colisiona al inlinear. Los únicos `id` son los `<symbol>` del sprite |
| **`<g>` decorativos**                                | Un solo nivel de anidamiento                                         |
| **Metadatos de editor**                              | Ni Illustrator, ni Figma, ni Inkscape                                |

Las trece se comprueban en `tests/icons.test.ts` (comprobaciones 1–11).

---

## 4. Presupuesto de complejidad

Un icono que crece en trazos deja de leerse a 16 px mucho antes de que se note a 64. Por eso hay techos:

| Límite                        | Valor   | Token                |
| ----------------------------- | ------- | -------------------- |
| Segmentos de dibujo por icono | **18**  | `budget.maxSegments` |
| Bytes de geometría por icono  | **700** | `budget.maxBytes`    |

**Un "segmento"** es cada comando de dibujo: `L`, `H`, `V`, `C`, `Q`. No cuentan
los desplazamientos (`M`) ni los cierres (`Z`); un `<circle>` cuenta como uno.

### Cómo se gasta el presupuesto

Reparto real de `hen`, que entra en 17 de 18:

```
silueta 5 · cresta 3 · cola 3 · pico 2 · ala 1 · ojo 1 · patas 2  =  17
```

Lecciones de haberlo ajustado:

- **Las patas son el gasto más silencioso.** Dos patas tridáctilas cuestan 6
  segmentos; dos tarsos rectos cuestan 2. El tercer dedo desaparece a 16 px.
- **Una tapa rectangular con esquinas redondeadas cuesta 8 segmentos**; con
  `radius: 0`, cuesta 3, y el `linejoin` redondo ya redondea las esquinas.
- **Un contorno bien pensado ahorra más que cualquier truco.** El cuerpo del ave
  pasó de 8 curvas a 5 sin perder forma.

### Excepciones

Una receta puede superar el techo **solo** declarándolo, y con motivo:

```ts
budget: {
  maxSegments: 26,
  reason: 'cresta grande + barbilla + hoces: la anatomía que distingue al macho',
},
```

Con dos límites duros, que comprueba `tests/budget.test.ts`:

1. La excepción **no puede pasar del 150 %** del techo global (27 segmentos).
2. **Solo la familia `animals`** puede pedirla. Un objeto que no cabe en 18
   segmentos está mal simplificado, no es un objeto complejo.

Una excepción sin `reason` no compila.

---

## 5. La regla de los dos extremos

Todo icono debe verse **perfectamente a 16 px y a 128 px**. Son exigencias
opuestas y es la prueba más dura del sistema.

| A 16 px manda…                         | A 128 px manda…                                       |
| -------------------------------------- | ----------------------------------------------------- |
| La simplificación                      | La construcción                                       |
| Los trazos a menos de 4 px se fusionan | Las curvas mal empalmadas se ven                      |
| El detalle fino se vuelve mancha       | Un arco solitario se lee como trazo suelto            |
| Un tercer dedo desaparece              | Una forma "que a 24 px funcionaba" se revela garabato |

Cuando las dos escalas piden cosas distintas, **gana 16 px**.

```bash
pnpm sketch -- hen   # hoja de construcción con la tira de 128 a 16 px
```

---

## 6. Anatomía de las aves

Reglas no negociables para todo icono con `taxon: 'bird'`:

1. **Silueta continua.** Cabeza, cuello, pecho, vientre y dorso son **un solo
   `<path>` cerrado**. Nunca círculos superpuestos: dos arcos cruzándose dentro
   del cuerpo delatan un dibujo ensamblado a ojo.
2. **El ave mira hacia `anatomy.facing`** — hoy, a la izquierda. La geometría se
   escribe **siempre mirando a la derecha** y el emisor la refleja. Nunca se
   dibuja un ave ya volteada.
3. **Mismo ojo, mismo pico, misma pata, misma cresta**, del mismo componente.
4. **Ala y cola van encima** de la silueta, como trazos separados.
5. **El ala son arcos abiertos**, jamás una hoja cerrada: una forma cerrada
   dentro del cuerpo se lee como un segundo ojo.
6. Proporción cabeza/cuerpo: **adulto ≈ 1:3 · pollito ≈ 1:1.6**.

### Orden de dibujo

Fijo, para que el apilamiento sea idéntico en toda la biblioteca:

```
1. silueta   2. cresta / barbilla   3. pico   4. ojo
5. ala       6. cola                7. patas  8. accesorios
```

---

## 7. Errores conocidos

Se ganaron dibujando. No los repitas:

| Error                                      | Cómo se ve                           | Regla que lo evita                                     |
| ------------------------------------------ | ------------------------------------ | ------------------------------------------------------ |
| Ala como hoja cerrada                      | Un segundo ojo flotando en el cuerpo | Arcos abiertos                                         |
| Arco solitario bajo la cara del pollito    | Una boca triste                      | El ala del pollito va retrasada                        |
| Ala de un solo arco en un cuerpo grande    | Una línea de vientre, no un ala      | Dos arcos, o un arco con otro trazo cerca que lo apoye |
| Barbilla pegada al cuello                  | Un borrón a 24 px                    | 4 px mínimos, o se omite la pieza                      |
| Asa tangente al borde del balde            | Un doble borde, no un asa            | El `minGap` también entre curvas                       |
| Círculos superpuestos para cabeza y cuerpo | Un muñeco de nieve                   | La silueta es un único `<path>` cerrado                |
| Pico integrado como vértice del contorno   | Una cuña del tamaño de la cara       | El pico es pieza aparte                                |
| Cuello con tramo propio en una ponedora    | Un ganso                             | La Hy-Line Brown tiene el cuello corto                 |
| Plumas de cola divergiendo desde el origen | Rayos de sol saliendo del cuerpo     | Arrancan casi del mismo punto                          |
| Nuca a la altura de la coronilla           | Un pico con cresta, sin cabeza       | La nuca va por debajo del cráneo                       |
| Cuenco liso para el nido                   | Un bol de vajilla                    | Tres briznas cruzando el borde                         |

---

## 8. El flujo de cuatro niveles

Ningún icono salta del encargo al sprite:

| Nivel                | Qué es                                                                | Comando                    | Se aprueba cuando                                          |
| -------------------- | --------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------- |
| **1 · Boceto**       | Hoja de construcción: retícula, área viva, keylines y tira de tamaños | `pnpm sketch -- <id>`      | Se reconoce a 16 px y aguanta a 128 px                     |
| **2 · SVG**          | La receta compone piezas y el emisor produce el `.svg`                | `pnpm build`               | Las comprobaciones 1–20 pasan                              |
| **3 · Optimización** | SVGO más los presupuestos de segmentos y bytes                        | `pnpm build` · `pnpm test` | Las comprobaciones 21–23 pasan sin excepción injustificada |
| **4 · Sprite**       | Entra en `sprite.svg`, el CSS, React, Vue y el manifest               | `pnpm build`               | `git diff --exit-code` limpio                              |

---

## 9. Checklist antes de abrir el PR

**Automático** (`pnpm verify`, obligatorio en CI):

- [ ] Tipos, lint y formato limpios
- [ ] Las 23 comprobaciones de `ICON_SPEC.md` §11 en verde
- [ ] `git diff --exit-code` limpio tras `pnpm build`

**Humano** (no automatizable, y es el que de verdad decide):

- [ ] Se reconoce **a 16 px** sin leer la etiqueta
- [ ] Aguanta **a 128 px** sin verse pobre ni tosco
- [ ] Ningún par de trazos paralelos por debajo de 4 px
- [ ] Ninguna forma cerrada dentro de un cuerpo que se lea como un ojo
- [ ] Se ve bien en tema claro y oscuro
- [ ] Reutiliza el catálogo; la geometría propia está justificada en un comentario
- [ ] Si una forma se usa por segunda vez, se promovió a componente
- [ ] Captura a 16, 24 y 48 px adjunta

Un icono sin captura no se revisa.
