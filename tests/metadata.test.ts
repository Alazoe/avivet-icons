/**
 * Comprobaciones 13–15 y 17 de ICON_SPEC.md §11: metadatos y recetas.
 */
import { describe, test, expect } from 'vitest';
import { loadIcons, checkMetadata, CATEGORIES } from '../packages/core/src/registry.ts';
import type { Shape } from '../packages/core/src/types.ts';

const { icons } = await loadIcons();

const key = (s: Shape): string => (s.tag === 'path' ? s.d : `${s.cx},${s.cy},${s.r}`);

describe('13–15 · metadatos de cada receta', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      expect(checkMetadata(icon, icon.file)).toEqual([]);
    });
  }
});

test('13 · los id son unicos', () => {
  const ids = icons.map((i) => i.id);
  expect(new Set(ids).size).toBe(ids.length);
});

/** Misma normalizacion que el buscador del sitio. */
const norm = (s: string): string => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Reproduce la busqueda de website/search.js. */
const search = (query: string) =>
  icons.filter((icon) => {
    const haystack = norm([icon.id, icon.name, icon.name_es, icon.keywords.join(' ')].join(' '));
    return norm(query)
      .split(/\s+/)
      .every((term) => haystack.includes(term));
  });

describe('14 · cada icono se encuentra buscando en espanol', () => {
  // La prueba util no es "hay palabras en espanol en la lista", sino que un
  // productor que escribe en su idioma encuentre el icono.
  for (const icon of icons) {
    test(icon.id, () => {
      expect(icon.keywords.length, `${icon.id}: menos de 4 keywords`).toBeGreaterThanOrEqual(4);

      expect(
        search(icon.name_es).some((i) => i.id === icon.id),
        `buscar "${icon.name_es}" no encuentra ${icon.id}`,
      ).toBe(true);

      // Y tambien por la primera palabra suelta, que es como se busca de verdad.
      const first = icon.name_es.split(' ')[0]!;
      expect(
        search(first).some((i) => i.id === icon.id),
        `buscar "${first}" no encuentra ${icon.id}`,
      ).toBe(true);
    });
  }
});

test('categorias declaradas y usadas', () => {
  for (const icon of icons) {
    expect(CATEGORIES[icon.category], `${icon.id}: categoria no declarada`).toBeTruthy();
  }
});

describe('17 · draw() es puro y produce figuras', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      const a = icon.draw();
      const b = icon.draw();
      expect(a.length, 'draw() no devolvio ninguna figura').toBeGreaterThan(0);
      expect(a.map(key), 'dos llamadas a draw() dieron resultados distintos').toEqual(b.map(key));
    });
  }
});

describe('las aves reutilizan el catalogo, no coordenadas sueltas', () => {
  // `taxon` y no `category`: en animals tambien viven cosas que no son aves,
  // como el nido.
  for (const icon of icons.filter((i) => i.taxon === 'bird')) {
    test(icon.id, () => {
      const shapes = icon.draw();
      // La silueta es un unico path cerrado: nunca circulos superpuestos (§6.1).
      const closed = shapes.filter((s) => s.tag === 'path' && s.d.endsWith('Z'));
      expect(closed.length, 'falta la silueta cerrada').toBeGreaterThanOrEqual(1);
      expect(
        shapes.some((s) => s.tag === 'circle' && s.solid),
        'falta el ojo',
      ).toBe(true);
    });
  }
});
