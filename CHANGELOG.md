# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) ·
versionado semántico sobre la superficie pública (`ICON_SPEC.md` §14).

## [0.4.0] — 2026-08-07

La gallina se redibuja al nivel de acabado de la lámina de referencia.

### Cambiado

- **`hen` redibujada: 17 → 32 segmentos.** Cuello con tramo propio, cresta de
  tres lóbulos abiertos, barbilla, ala como hoja cerrada con nervadura, tres
  plumas de cola cerradas y afiladas, y patas con pie de tres dedos.
- **Nuevo token `budget.exceptionFactor` = 2.** El techo por defecto sigue en
  18 y los nueve objetos siguen sometidos a él; lo que cambia es cuánto puede
  superarlo una receta de `animals` que declare su `budget` con motivo:
  antes 27, ahora 36. El 1.5 estaba escrito a mano dentro del test; ahora es un
  token, que es donde vive un valor del sistema.
- **`wing` gana la variante `leaf`**: hoja cerrada más nervadura.
- **`tail` variante `hen`**: plumas cerradas en vez de tres trazos abiertos.
- **`head` publica el ancla `wattle`**, para que la barbilla no se coloque a ojo.

### Decisiones de dibujo

- **El cuello necesita dos tramos de contorno, no uno.** Se probó con seis
  tramos de silueta y con cinco: las dos veces la cabeza se apoyaba en los
  hombros y salía un pato. Con ocho hay cuello.
- **Las tangentes se empalman en la garganta.** El pliegue anguloso del cuello
  venía de que HEAD llegaba con una dirección y BODY salía con otra.
- **El ala lleva UNA nervadura, no tres.** Con `stroke.minGap` de 4 px, dentro
  de un ala de 11 px de alto no caben dos líneas interiores.
- **El pico NO se integra como vértice del contorno.** Se volvió a probar y
  vuelve a salir una cuña del tamaño de la cara.
- **Los objetos no se tocan.** Ninguno pasa de 18 segmentos; el aire es solo
  para las aves, y el test lo hace cumplir.

---

## [0.3.1] — 2026-08-06

Documentación del sistema de diseño. **No se dibujaron iconos.**

### Añadido

- **`docs/design/DESIGN_SYSTEM.md`** — filosofía, las tres inspiraciones
  (Feather, Lucide, Heroicons) con lo que se toma y dónde se diverge, el estilo
  de lámina veterinaria, objetivos, qué no hacer y ejemplos reales de decisiones
  tomadas mirando el render.
- **`docs/design/ICON_GUIDELINES.md`** — lienzo, trazo, las trece
  prohibiciones, presupuesto de complejidad con su reparto real, la regla de los
  dos extremos, anatomía aviar y la tabla de errores conocidos.
- **`docs/design/NAMING_CONVENTION.md`** — inglés, kebab-case, singular; cómo un
  `id` genera cinco superficies; cómo elegir nombre; categorías y deprecación.
- **`docs/design/DESIGN_TOKENS.md`** — token por token con su porqué, cómo llega
  un token al SVG, qué **no** es token y cómo se cambia uno.

### Cambiado

- **`design-tokens.json` se muda a `packages/core/design-tokens.json`.** Es lo
  que se publica con el paquete, así que ahí le corresponde estar. Se **movió**,
  no se duplicó: dos archivos de tokens serían dos fuentes de verdad, que es
  justo lo que prohíbe §3. Los 12 SVG salieron byte a byte idénticos.
- `@avivet/icons` exporta ahora `./design-tokens.json`.
- `ICON_SPEC.md`, `README.md` y `CONTRIBUTING.md` enlazan los cuatro documentos
  en vez de repetirlos.

### Decisiones

- **La documentación se reparte por audiencia, no por tema.** `docs/design/` se
  dirige a quien **dibuja**; `ICON_SPEC.md` a quien **mantiene el repositorio**.
  Cuando se solapen, manda la especificación técnica. Sin esa jerarquía escrita,
  dos documentos que dicen casi lo mismo divergen en tres meses.

---

## [0.3.0] — 2026-08-06

Reestructuración de la arquitectura del repositorio a monorepo pnpm con
TypeScript. **No se dibujaron iconos en esta versión**: es andamiaje.

### Añadido

- **pnpm workspaces** con seis paquetes publicables: `@avivet/icons`,
  `-react`, `-docs`, `-sprite`, `-css` y `-vue`, más `website`.
- **TypeScript estricto**. `packages/core/src/types.ts` define el vocabulario
  del sistema: `Shape`, `Anchors`, `ContourPart`, `IconRecipe`, `IconBudget`.
  Una receta mal escrita ya no compila.
- **Vite** para el build de biblioteca de `core` y `react` (ESM + `.d.ts`) y
  para el sitio de documentación.
- **Vitest** en lugar de `node:test`. Las 23 comprobaciones intactas.
- **ESLint** con reglas propias del ADN: prohíbe colores literales y
  `currentColor` escrito a mano dentro de los dibujos.
- **Prettier**, **Husky** (pre-commit con lint-staged, pre-push con tipos y
  tests) y **SVGO** integrado como Nivel 3 del flujo.
- `pnpm verify` — tipos, lint, formato y tests: exactamente lo que corre la CI.
- Test **16b**: SVGO tiene que ser idempotente sobre nuestra salida, o el build
  dejaría de ser determinista al encadenar dos optimizaciones.

### Cambiado

- `packages/json` pasa a llamarse **`packages/docs`** (`@avivet/icons-docs`).
- `tokens`, `geometry`, `emit` y `registry` se mudan de `scripts/` a
  `packages/core/src/`: eran biblioteca, no herramientas de build.
- El sitio se compila con Vite a `website/dist`; desaparece la carpeta `docs/`
  de la raíz, que se confundía con el paquete del mismo nombre.
- Los SVG generados pasan por SVGO: 265 bytes menos en 12 iconos.

### Decisiones

- **Se revierte "sin dependencias de terceros"**, que era una decisión
  documentada del proyecto. Se cambia por tipos en el dominio, formato
  automático y optimización real. El coste es mantenimiento de dependencias, y
  queda escrito en ICON_SPEC.md §2 para que nadie lo descubra por sorpresa.
- **Se descartó una regla de ESLint** que prohibía el literal `2` en los
  dibujos para forzar el uso del token de grosor: un selector de AST no
  distingue un 2 de grosor de un `width / 2` de geometría. Esa garantía la da
  el test §3, que comprueba el grosor *emitido*.
- **`optimize.ts` vive en `scripts/`, no en `core`.** SVGO es herramienta de
  build y no debe viajar en el paquete publicado.
- Los 12 iconos existentes se **migraron**, no se borraron: "no crear iconos
  todavía" se entendió como que este paso era de andamiaje.

---

## [0.2.1] — 2026-08-06

### Cambiado

- **`hen` redibujada a presupuesto: 25 → 17 segmentos**, 549 bytes. Sin
  excepción declarada: entra en los 18 del token, como cualquier objeto.

### Decisiones de dibujo

- **El pico como vértice del contorno no funciona.** Se probó para ahorrar dos
  segmentos: una sola curva no puede redondear el cráneo Y rematar en punta
  corta, así que la cuña salía del tamaño de la cara. El pico vuelve a ser
  pieza (`beak`) y el ahorro se buscó en otro sitio.
- **El cuello no lleva tramo propio.** Con curva propia el ave se estira y
  parece un ganso; la Hy-Line Brown tiene el cuello corto. El cuello sale de la
  transición entre la línea dorsal y la garganta.
- **La nuca va por debajo de la coronilla.** Con las dos a la misma altura el
  cráneo baja recto al pico y la cabeza pierde volumen: se lee como un pico con
  cresta, no como una cabeza.
- **Patas: dos tarsos rectos, sin dedos**, como en el boceto de referencia. Los
  dedos desaparecen a 16 px y costaban 4 segmentos de los 18.
- **Las plumas de la cola arrancan casi del mismo punto.** Divergiendo desde el
  origen se leen como rayos de sol saliendo del cuerpo.

---

## [0.2.0] — 2026-08-06

Correccion de rumbo del Director de Arte: se trabaja **por familias**, no icono
a icono. Familia A (animales) cerrada.

### Añadido

- **`rooster`** y **`nest`** — la familia de animales queda completa:
  `hen` · `rooster` · `chick` · `egg` · `nest`.
- **Componente `egg`** — el ovoide asciende del icono al catálogo por la regla
  de las dos apariciones: lo usan `egg` y `nest`.
- **Variante `rooster`** de `head`, `body`, `neck` y `tail` — un gallo no es una
  gallina con cresta grande: lleva la cabeza más alta, el pecho más profundo y
  hoces en vez de plumas rectas.
- **`npm run sketch`** — Nivel 1 del flujo: hoja de construcción con retícula,
  área viva, keylines y tira de 16 a 128 px. Ningún icono salta del encargo al
  sprite.
- **Presupuestos de complejidad** (tests 21–23): ≤ 18 segmentos y ≤ 700 bytes
  por icono. Una receta puede superarlos solo declarando un `budget` con su
  `reason`, acotado al 150 % y exclusivo de la familia `animals`.
- **Campo `taxon`** en los metadatos: las reglas de anatomía aplican a las aves,
  no a todo lo que vive en `animals` — un nido no tiene ojo.

### Cambiado

- **Las aves miran a la izquierda** (`tokens.anatomy.facing`). La geometría se
  sigue escribiendo mirando a la derecha y el emisor la refleja: el cambio de
  dirección de toda la familia fue **un token**, cero recetas tocadas.
- **La cola de la gallina pasa a tres plumas** y las patas a dos dedos, según el
  brief: el tercer dedo se pierde a 16 px y solo sumaba trazo.
- **La tapa del frasco y la pinza de la planilla** se redibujaron más simples
  para entrar en presupuesto: 20 → 15 y 21 → 17 segmentos, sin perder lectura.
- **El test de keywords** ya no busca palabras españolas en una lista: comprueba
  que buscando `name_es` en el buscador real aparezca el icono. Se probaba la
  forma, ahora se prueba la propiedad.

### Decisiones de dibujo

- **El ala de un solo arco se lee como línea de vientre.** Se probó a 128 px y
  se revirtió: la variante `simple` queda en el catálogo, pero las aves usan dos
  arcos. Un segmento de más que sí paga.
- **Los huevos del nido van dentro del cuenco, no cruzados por su borde.** Con
  el borde cruzándolos se leía "huevos delante de un plato".
- **El nido lleva tres briznas** cruzando el borde: sin ellas, el cuenco se leía
  como vajilla.
- **La barbilla del gallo es una curva más la línea de cierre**: su borde
  interno es recto contra el cuello, así que la segunda curva no aportaba nada.

---

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
