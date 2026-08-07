# Convención de nombres

**Cómo se nombra un icono en AviVet Icons.** Un nombre mal puesto no se puede
arreglar después: renombrar un `id` publicado es un _breaking change_.

---

## 1. Las tres reglas

```
1. Inglés
2. kebab-case
3. Singular
```

| ✅             | ❌                                     | Por qué                                                                    |
| -------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `hen`          | `gallina`                              | El código y los nombres van en inglés; el español vive en `name_es`        |
| `water-drop`   | `waterDrop`, `water_drop`, `WaterDrop` | kebab-case: es el nombre del archivo, la clase CSS y el símbolo del sprite |
| `egg`          | `eggs`                                 | Singular: el icono representa la cosa, no una cantidad                     |
| `bell-drinker` | `belldrinker`                          | Los guiones separan palabras, siempre                                      |
| `feed-bag`     | `bag-of-feed`                          | Sustantivo + modificador, lo más corto que siga siendo claro               |

### Por qué inglés

No es preferencia estética. El `id` es también el nombre del componente React
(`BellDrinker`), la clase CSS (`.ai-bell-drinker`) y el símbolo del sprite
(`#ai-bell-drinker`). Un `id` en español obligaría a quien integra la biblioteca
a escribir `import { GotaDeAgua }` en medio de código inglés.

**El español no se pierde**: vive en `name_es` y en las keywords, y el buscador
del sitio funciona igual escribiendo `gallina` que `hen`.

---

## 2. El `id` manda sobre todo lo demás

Un solo nombre genera cinco cosas. Por eso se piensa antes de escribirlo:

| Dónde        | Forma          | Ejemplo                                              |
| ------------ | -------------- | ---------------------------------------------------- |
| Receta       | `<id>.icon.ts` | `packages/core/src/icons/water/bell-drinker.icon.ts` |
| SVG generado | `<id>.svg`     | `packages/core/svg/water/bell-drinker.svg`           |
| Sprite       | `#ai-<id>`     | `<use href="sprite.svg#ai-bell-drinker"/>`           |
| CSS          | `.ai-<id>`     | `<i class="ai ai-bell-drinker"></i>`                 |
| React / Vue  | `PascalCase`   | `import { BellDrinker } from '@avivet/icons-react'`  |

El prefijo del espacio de nombres es **`ai-`** (token `namespace`).

Que el nombre del archivo coincida con el `id` se comprueba automáticamente
(comprobación 13): `bell-drinker.icon.ts` **debe** declarar `id: 'bell-drinker'`.

---

## 3. Ejemplos

### Animales

```
hen.svg              rooster.svg          chick.svg
pullet.svg           broiler.svg          nest.svg
```

### Agua

```
water-drop.svg       bucket.svg           bell-drinker.svg
nipple-drinker.svg   water-tank.svg       flush.svg
```

### Sanidad

```
vaccine-bottle.svg   syringe.svg          thermometer.svg
clipboard.svg        clock.svg            eye-drop.svg
```

### Nutrición

```
feed-bag.svg         corn.svg             soybean.svg
feeder-pan.svg       silo.svg             feed-mill.svg
```

### Instalaciones

```
barn.svg             warehouse.svg        truck.svg
fan.svg              heater.svg           egg-tray.svg
```

### Bioseguridad

```
virus.svg            mask.svg             boot.svg
disinfection.svg     sprayer.svg          shower.svg
```

---

## 4. Cómo elegir un nombre

### Nombra lo que es, no lo que significa

| ✅            | ❌            | Por qué                                                               |
| ------------- | ------------- | --------------------------------------------------------------------- |
| `water-drop`  | `hydration`   | El icono es una gota; sirve para agua, consumo, vacunación y limpieza |
| `clipboard`   | `checklist`   | Es una planilla; el checklist es un uso                               |
| `thermometer` | `temperature` | Es un objeto, no una magnitud                                         |
| `virus`       | `disease`     | Se dibuja un virus, no una enfermedad                                 |

Un icono suele tener más usos que el que motivó dibujarlo. Nombrarlo por el uso
lo encierra.

### Nombra el equipo real, no la categoría

| ✅               | ❌          |
| ---------------- | ----------- |
| `bell-drinker`   | `drinker-2` |
| `nipple-drinker` | `drinker-1` |
| `feeder-pan`     | `feeder`    |

Un productor distingue perfectamente un nipple de una campana. La biblioteca
también debe hacerlo.

### Evita abreviaturas

`vaccine-bottle`, no `vac-bottle`. `temperature-sensor`, no `temp-sensor`. Se
escribe una vez y se lee mil.

### Nombres reservados

No uses nombres de marca (`plasson`, `lubing`, `hy-line`). Los equipos se
nombran por su tipo genérico. Las referencias comerciales van en el comentario
de la receta, donde documentan la anatomía sin comprometer la licencia.

---

## 5. Metadatos que acompañan al nombre

El `id` es solo una parte. Cada receta declara:

```ts
{
  id: 'bell-drinker',
  name: 'Bell Drinker',           // inglés, Title Case
  name_es: 'Bebedero campana',    // español, para el buscador
  category: 'water',
  keywords: ['bell', 'drinker', 'hanging', 'pan',
             'campana', 'bebedero', 'colgante', 'agua'],
  since: '0.1.0',
}
```

### Reglas de las keywords

- **Mínimo 4**, en **inglés y español**.
- **No repiten el `id`**: el buscador ya busca por `id`, así que repetirlo
  desperdicia una entrada. Lo comprueba la carga del registro.
- Piensa en **cómo lo buscaría alguien que no conoce la biblioteca**: un
  productor buscará `bebedero`, no `bell`.

Lo que se comprueba no es "hay palabras españolas en la lista", sino que
**buscar `name_es` en el buscador real encuentre el icono** (comprobación 14).

---

## 6. Categorías

Una sola por icono, y la carpeta debe coincidir con ella:

| Categoría     | Contenido                               | Ejemplos                                            |
| ------------- | --------------------------------------- | --------------------------------------------------- |
| `animals`     | Aves y sus estados                      | hen · rooster · chick · nest                        |
| `water`       | Agua y bebida                           | water-drop · bucket · nipple-drinker · bell-drinker |
| `medical`     | Sanidad, vacunación, registros clínicos | vaccine-bottle · thermometer · clipboard · clock    |
| `nutrition`   | Materias primas y alimento              | corn · soybean · feed-bag · silo                    |
| `buildings`   | Instalaciones y logística               | barn · warehouse · truck · fan                      |
| `biosecurity` | Bioseguridad y sanidad ambiental        | virus · mask · boot · disinfection                  |
| `production`  | Producción y datos                      | egg · egg-tray · scale · mortality                  |
| `ui`          | Interfaz y acciones                     | check · arrow · warning · search                    |

En `animals` también viven cosas que no son aves —un nido, por ejemplo—; por eso
las reglas de anatomía se aplican por el campo `taxon: 'bird'`, no por la
categoría.

---

## 7. Renombrar y deprecar

Renombrar un `id` publicado rompe cinco superficies a la vez. Por eso:

- Cambiar un `id` es una versión **major**.
- Un `id` **nunca se borra de golpe**: primero se marca `deprecated` apuntando al
  reemplazo, se mantiene una versión minor completa, y se elimina en la
  siguiente major.

```ts
{
  id: 'drinker',
  deprecated: 'bell-drinker',   // el que lo reemplaza
}
```

Por eso el nombre se discute **en el issue, antes de dibujar**. Es más barato
cambiar de opinión sobre una palabra que sobre un contrato público.
