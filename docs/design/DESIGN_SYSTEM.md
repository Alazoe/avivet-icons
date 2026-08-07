# AviVet Design System

**El sistema visual de AviVet Icons.** Este documento explica _por qué_ los
iconos se ven como se ven. Las reglas concretas de dibujo están en
[`ICON_GUIDELINES.md`](ICON_GUIDELINES.md); los nombres, en
[`NAMING_CONVENTION.md`](NAMING_CONVENTION.md); los valores, en
[`DESIGN_TOKENS.md`](DESIGN_TOKENS.md).

> Si buscas cómo está construido el repositorio —build, tests, versionado—, eso
> es [`ICON_SPEC.md`](../../ICON_SPEC.md). Este documento es de diseño; aquel es
> de ingeniería. Cuando se contradigan, gana la especificación técnica y este
> documento tiene un bug.

---

## 1. Filosofía

```
Simple · Técnico · Minimalista · Consistente · Veterinario · Open Source · SVG First
```

Siete principios, y uno que ordena a los demás:

> ### No dibujamos iconos. Construimos componentes.

Un icono no es una obra individual: es el **ensamblaje** de piezas que ya
existen. La gallina y el pollito comparten literalmente el mismo ojo, el mismo
pico y la misma pata — no "un ojo parecido", **el mismo código**. Es la única
forma de que cien iconos dibujados a lo largo de años se vean de una sola mano.

De ahí salen tres consecuencias que sorprenden a quien llega nuevo:

1. **Un `.svg` no es un archivo fuente.** Es un artefacto compilado.
2. **Editar un `.svg` a mano es un error**: el siguiente build lo revierte.
3. **Mejorar una pieza mejora todos los iconos que la usan**, de una sola vez.

### Para quién es esto

Veterinarios, zootecnistas, productores y quien construya software para ellos.
No es una biblioteca de iconos generalista con un par de gallinas: es una
biblioteca avícola que además tiene relojes y planillas porque hacen falta en
una planilla de crianza.

Eso cambia el criterio de qué entra. Un `nipple-drinker` que un productor
reconoce en dos décimas de segundo vale más que un icono de "engranaje" hecho
con mucho gusto.

---

## 2. Inspiración

Tres referencias, y qué tomamos de cada una:

| Referencia                              | Qué tomamos                                                                                                                                                 | Dónde nos separamos                                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **[Feather](https://feathericons.com)** | El trazo. Grosor único, remates redondos, geometría sobria, nada de relleno. La sensación de "dibujado con un solo instrumento".                            | Feather es deliberadamente abstracto. Nosotros necesitamos anatomía: una cresta va donde va, y un nipple tiene cono y pin. |
| **[Lucide](https://lucide.dev)**        | La disciplina de proyecto. Reglas escritas, revisión estricta, un catálogo que crece sin deformarse. Y el trato del icono como **código**, no como recurso. | Lucide dibuja sobre 24×24. Nosotros usamos 64×64 porque un ave necesita más resolución de trazo que una flecha (§4).       |
| **[Heroicons](https://heroicons.com)**  | El acabado. Curvas bien empalmadas, decisiones de contraste tomadas a conciencia, nada que sobre. La sensación de que alguien miró cada icono.              | Heroicons ofrece variantes rellenas. Nosotros no: el relleno mataría la legibilidad en impresión y fotocopia (§5).         |

Lo que **no** tomamos de ninguna: su vocabulario. Las tres son bibliotecas de
interfaz. La nuestra es de campo.

---

## 3. El estilo: dibujo técnico veterinario

La referencia visual no es una app. Es **la lámina de un manual veterinario**:
el dibujo a línea que acompaña a un texto técnico, hecho para que se entienda
una anatomía o un equipo, no para decorar.

De ahí salen decisiones concretas:

### El ave entra desde el margen

Todas las aves miran **a la izquierda**, como en las láminas anatómicas clásicas
donde el animal entra desde el borde de la página. Es un token
(`anatomy.facing`), no una convención informal: cambiar esa palabra voltea la
familia entera.

### Anatomía correcta antes que simpatía

Una gallina Hy-Line Brown tiene el cuello **corto**. Si se le dibuja un cuello
largo porque "queda más elegante", deja de ser una ponedora comercial y pasa a
ser un ave genérica. La referencia siempre es una línea genética o un equipo
real, nunca "una gallina".

| Icono            | Referencia real                                                |
| ---------------- | -------------------------------------------------------------- |
| `hen`            | Hy-Line Brown: cuerpo ovalado, cuello corto, cresta simple     |
| `chick`          | Pollito de un día: cabeza grande, cuerpo redondo, patas cortas |
| `bell-drinker`   | Bebedero de campana tipo Plasson / Lubing                      |
| `vaccine-bottle` | Frasco de vacuna viva liofilizada, con tapa de aluminio        |
| `egg`            | Ovoide asimétrico en el eje polar, como se apoya en la bandeja |

### El ojo es la única forma sólida

En toda la biblioteca hay exactamente un elemento relleno: el ojo, un punto de
radio 1.25. No es una excepción estética, es una decisión de legibilidad — a
16 px un ojo con contorno se convierte en una mancha ilegible.

### La quiebra solo si es anatómica

Curvas Bézier en todo el contorno. Las líneas quebradas se reservan para donde
la anatomía las tiene: el pico y los dedos.

---

## 4. Objetivos

| Objetivo                                                             | Cómo se comprueba                                                                    |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Que se reconozca a 16 px** sin leer la etiqueta                    | Hoja de construcción: `pnpm sketch -- <id>`                                          |
| **Que aguante a 128 px** sin verse pobre ni tosco                    | La misma hoja, primer cuadro                                                         |
| **Que se vea de una sola mano** aunque lo dibujen personas distintas | Los componentes: no se dibuja a ojo, se ensambla                                     |
| **Que sobreviva diez años**                                          | Un `.svg` compilado desde `componentes + receta + tokens`, no una carpeta de dibujos |
| **Que se imprima**                                                   | Solo contorno: funciona en blanco y negro, en fotocopia y en serigrafía              |
| **Que herede color y tamaño**                                        | `currentColor` y unidades relativas, nunca un color fijo                             |
| **Que sea buscable en dos idiomas**                                  | `name_es` y keywords en inglés y español                                             |

### El objetivo que manda sobre los demás

Cuando 16 px y 128 px piden cosas distintas, **gana 16 px**. Un icono ilegible a
16 px no sirve para nada; uno simple a 128 px sigue siendo elegante.

---

## 5. Qué NO hacer

### Prohibido en el dibujo

| No                   | Por qué                                                    |
| -------------------- | ---------------------------------------------------------- |
| Sombras              | No existen en un dibujo a línea                            |
| Degradados           | Rompen `currentColor` y no se imprimen                     |
| Rellenos             | Salvo el ojo. El relleno destruye la lectura en fotocopia  |
| Perspectiva          | Un icono es un signo, no una ilustración                   |
| Texto dentro del SVG | No se traduce, no escala, no es accesible                  |
| Colores literales    | El color lo pone quien consume el icono                    |
| Transparencia        | Se ve distinta sobre cada fondo                            |
| Animación            | Los SVG son estáticos; la animación es CSS de quien lo usa |

### Prohibido en el concepto

| No                             | Sí                                            |
| ------------------------------ | --------------------------------------------- |
| Caricatura o emoji             | Dibujo técnico de manual                      |
| "Un pollito simpático"         | Un pollito de un día, anatómicamente correcto |
| Logotipos de marcas            | Equipos genéricos reconocibles                |
| Iconos "por si acaso"          | Iconos con un uso real y concreto             |
| Multicolor                     | Monocromo, `currentColor`                     |
| Detalle que solo se ve a 64 px | Detalle que sobrevive a 16 px                 |

### Prohibido en el proceso

- **Dibujar a ojo.** Si la forma existe en el catálogo, se usa la del catálogo.
- **Saltar del encargo al SVG.** Los cuatro niveles no son ceremonia: el Nivel 1
  es donde se detectan los errores que ningún test ve.
- **Editar un archivo generado.** Si algo está mal ahí, el bug está en la receta,
  en los componentes o en los tokens.
- **Aprobar un icono sin mirarlo.** Un icono que pasa los 23 tests puede seguir
  siendo ilegible.

---

## 6. Ejemplos

### Un icono es una composición, no un dibujo

```ts
// packages/core/src/icons/animals/hen.icon.ts
draw() {
  const bird = silhouette({ variant: 'adult' });
  const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

  return [
    ...bird.shapes,
    ...comb({ at: crown, size: 'single' }),
    ...beak({ at: bill }),
    ...eye({ at: socket }),
    ...wing({ at: shoulder, variant: 'simple', scale: 1.05 }),
    ...tail({ at: rump, variant: 'hen' }),
    ...legs.flatMap((at, i) => leg({ at, length: i === 0 ? 7 : 7.8, foot: false })),
  ];
}
```

No hay ni una coordenada de lienzo escrita a mano: cada pieza pide su **ancla**.
Si mañana se rediseña el cuerpo del ave, el ala, la cola y las patas la siguen.

### Un gallo no es una gallina con cresta grande

```ts
const bird = silhouette({ variant: 'rooster' }); // cabeza más alta, pecho más profundo
...comb({ at: crown, size: 'big' }),             // cresta de tres lóbulos altos
...wattle({ at: bill }),                          // aquí sí cabe la barbilla
...tail({ at: rump, variant: 'rooster' }),        // hoces en vez de plumas rectas
```

Cuatro diferencias declaradas. Todo lo demás —ojo, pico, ala, patas— es
literalmente el mismo código que la gallina.

### La regla de las dos apariciones, en acción

El ovoide del huevo empezó siendo geometría propia del icono `egg`. Cuando el
icono `nest` necesitó dos huevos pequeños, esa forma **ascendió a componente**
en el mismo PR:

```ts
// packages/core/src/components/egg.ts
export default function egg({ at, height = UNIT }) { … }

// nest.icon.ts
...egg({ at: { x: 25, y: 33 }, height: 12 }),
...egg({ at: { x: 40, y: 33 }, height: 12 }),
```

Una forma usada dos veces deja de ser un dibujo y pasa a ser vocabulario.

### Ejemplos de decisiones que se tomaron mirando

Estas no salieron de un principio, salieron de renderizar y mirar:

| Se probó                                                    | Qué pasó                                              | Regla que quedó                      |
| ----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| El ala como hoja cerrada                                    | Se leía como un **segundo ojo** flotando en el cuerpo | El ala son arcos abiertos            |
| El ala del pollito bajo la cara                             | Se leía como una **boca triste**                      | El ala del pollito va retrasada      |
| El pico como vértice del contorno, para ahorrar 2 segmentos | La cuña salía **del tamaño de la cara**               | El pico es pieza aparte              |
| Un cuello con tramo propio                                  | El ave se estiraba y parecía un **ganso**             | La ponedora tiene el cuello corto    |
| Los huevos cruzados por el borde del nido                   | Se leía "huevos **delante de un plato**"              | El borde va por encima de los huevos |
| El asa del balde casi tangente a la boca                    | Se leía como un **segundo borde**                     | 4 px mínimos, también entre curvas   |

Ninguna de estas la habría detectado un test. Por eso el Nivel 1 no se salta.
