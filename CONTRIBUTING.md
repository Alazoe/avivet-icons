# Contribuir a AviVet Icons

Gracias por querer aportar. Este proyecto tiene una regla que lo explica casi
todo:

> **No dibujamos iconos. Construimos componentes.**

Un icono nuevo casi nunca es geometría nueva: es una combinación nueva de piezas
que ya existen. Antes de dibujar nada, abre
[`ICON_SPEC.md` §5](ICON_SPEC.md#5-catálogo-de-componentes) y busca tu forma en
el catálogo.

La especificación manda. Si algo de esta guía y algo de `ICON_SPEC.md` se
contradicen, gana la especificación y esta guía tiene un bug.

---

## Antes de empezar

```bash
git clone https://github.com/Alazoe/avivet-icons.git
cd avivet-icons
pnpm install          # sin dependencias de terceros: solo enlaza los workspaces
pnpm test             # debe quedar todo en verde antes de tocar nada
pnpm dev      # abre el sitio de documentación
```

Requisitos: **Node ≥ 20** y **pnpm ≥ 10**.

`pnpm install` deja instalados los ganchos de git: al hacer commit se pasan
ESLint y Prettier sobre lo que has tocado, y al hacer push se comprueban tipos y
tests. Si algo te bloquea, es lo mismo que te habría rechazado la CI.

Los paquetes publicables no tienen dependencias de producción: el toolchain vive
en la raíz y no viaja al consumidor.

---

## Qué puedes aportar

| Tipo                 | Dónde empezar                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Icono nuevo**      | Abre primero un issue con la plantilla _Icon request_: hablamos del nombre y la categoría antes de dibujar |
| **Mejorar un icono** | Si se lee mal a 16 px, es un bug. Adjunta una captura al PR                                                |
| **Componente nuevo** | Solo si ya hay dos iconos que lo necesitan (§4.6, regla de las dos apariciones)                            |
| **Traducciones**     | `name_es` y `keywords` en las recetas                                                                      |
| **Documentación**    | Este archivo, `README.md` y el sitio en `website/`                                                         |

Iconos que **no** aceptamos: caricaturas, emoji, logotipos de marcas, iconos
multicolor, iconos animados y cualquier cosa que se vea bien solo a 64 px.

---

## Añadir un icono, paso a paso

### 1. Crea la receta

```bash
pnpm new -- rooster animals
```

Esto crea `packages/core/src/icons/animals/rooster.icon.mjs` con la plantilla
correcta. **No crees archivos `.svg` a mano**: los `.svg` son artefactos
compilados y el siguiente build los sobrescribe.

### 2. Compón el dibujo

```js
draw() {
  const bird = silhouette({ variant: 'adult' });
  const { crown, beak: bill, eye: socket, tail: rump, legs } = bird.anchors;

  return [
    ...bird.shapes,
    ...comb({ at: crown, size: 'big' }),      // el gallo lleva cresta grande
    ...wattle({ at: bill }),                   // y barbilla: aquí sí cabe
    ...beak({ at: bill }),
    ...eye({ at: socket }),
    ...tail({ at: rump, variant: 'rooster' }),
    ...legs.flatMap((at) => leg({ at, length: 6.5 })),
  ];
}
```

Reglas al componer:

- **Nunca escribas una coordenada de lienzo a mano.** Pide el ancla. Si tu pieza
  necesita un ancla que no existe, añádela al componente de contorno.
- Respeta el **orden de dibujo** de `ICON_SPEC.md` §7.2.
- Si dibujas geometría propia con `draw()`, **comenta por qué** no sirve un
  componente. Es lo primero que se mira en la revisión.

### 3. Completa los metadatos

```js
name_es: 'Gallo',
keywords: ['cock', 'male', 'breeder', 'gallo', 'macho', 'reproductor'],
```

Mínimo 4 keywords, en **inglés y español**, sin repetir el `id` (el buscador ya
busca por `id`). Piensa en cómo lo buscaría alguien que no conoce la biblioteca.

### 4. Construye y valida

```bash
pnpm test        # build + las 23 comprobaciones de la spec
```

### 5. Mira el icono

Esto no lo hace ningún test. Los cuatro niveles de `ICON_SPEC.md` §7.4 empiezan
aquí, y el Nivel 1 no se salta:

```bash
pnpm sketch -- rooster   # hoja de construcción: retícula + tira 16→128 px
pnpm dev             # la biblioteca completa, en contexto
```

- ¿Se reconoce **a 16 px** sin leer la etiqueta? ¿Aguanta **a 128 px**?
- ¿Cabe en el presupuesto de 18 segmentos, o la excepción está justificada?
- ¿Hay dos trazos paralelos a menos de 4 px? (activa la **retícula**)
- ¿Alguna forma cerrada dentro del cuerpo se lee como un ojo?
- ¿Se ve bien en **tema claro y oscuro**?

Adjunta una captura a 16, 24 y 48 px en el PR. Un icono sin captura no se
revisa.

### 6. Anota el cambio

Añade una línea a `CHANGELOG.md` que explique **por qué**, no solo qué:

```markdown
- `rooster` — el gallo comparte silueta con `hen` y solo cambia cresta y cola,
  para que la comparación macho/hembra sea legible en una misma tabla.
```

---

## Errores que ya cometimos

No los repitas. Están en `ICON_SPEC.md` §6 y se ganaron dibujando:

| Error                                      | Cómo se ve                           | Regla                                          |
| ------------------------------------------ | ------------------------------------ | ---------------------------------------------- |
| Ala como hoja cerrada                      | Un segundo ojo flotando en el cuerpo | `wing` usa arcos abiertos                      |
| Arco solitario bajo la cara del pollito    | Una boca triste                      | El ala del pollito va retrasada                |
| Barbilla pegada al cuello                  | Un borrón a 24 px                    | 4 px de separación mínima, o se omite la pieza |
| Asa tangente al borde del balde            | Un doble borde, no un asa            | El `minGap` también aplica entre curvas        |
| Círculos superpuestos para cabeza y cuerpo | Un muñeco de nieve                   | La silueta es un único `<path>` cerrado        |

---

## Qué no se toca

Estos archivos son **generados**. Un PR que los modifique sin modificar su
fuente se cierra:

```
packages/core/svg/**    packages/sprite/**    packages/css/**
packages/docs/**        packages/react/src/** packages/vue/src/**
packages/*/dist/**      website/dist/**       website/icons.js
```

Si algo está mal ahí, el bug está en `packages/core/src/`, en
`design-tokens.json` o en `scripts/`.

---

## Cambiar los tokens

`design-tokens.json` afecta a **todos** los iconos a la vez. Un cambio ahí:

- necesita un issue previo con la justificación,
- es como mínimo una versión **minor** (`ICON_SPEC.md` §14),
- y exige adjuntar la hoja de contacto completa antes y después.

---

## Estilo de código

- TypeScript estricto. Los tipos del dominio están en `packages/core/src/types.ts`.
- Sin dependencias de **producción** en los paquetes publicables.
- `pnpm verify` antes de abrir el PR: es lo que corre la CI.
- Comentarios **en español**, código y nombres **en inglés**.
- Un comentario explica _por qué_, no _qué_. Si el qué no se entiende, el
  problema es el nombre de la función.

---

## Commits y PR

Formato de commit (Conventional Commits):

```
feat(icons): anade rooster, pullet y broiler
fix(chick): retrasa el ala, se leia como una boca
docs(spec): aclara la regla de las dos apariciones
chore(tokens): sube la precision a 2 decimales
```

Un PR entra cuando:

- [ ] `pnpm test` en verde (lo comprueba la CI)
- [ ] `git diff --exit-code` limpio tras `pnpm build`
- [ ] Captura a 16/24/48 px adjunta
- [ ] Checklist humano de `ICON_SPEC.md` §15 repasado
- [ ] Entrada en el `CHANGELOG`

---

## Licencia

Al contribuir aceptas que tu aporte se publique bajo la
[licencia MIT](LICENSE) del proyecto.
