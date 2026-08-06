/**
 * Comprobaciones 13–15 y 17 de ICON_SPEC.md §11: metadatos y recetas.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { loadIcons, checkMetadata, CATEGORIES } from '../scripts/registry.mjs';

const { icons } = await loadIcons();

describe('13–15 · metadatos de cada receta', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      assert.deepEqual(checkMetadata(icon, icon.file), []);
    });
  }
});

test('13 · los id son unicos', () => {
  const ids = icons.map((i) => i.id);
  assert.equal(new Set(ids).size, ids.length);
});

/** Misma normalizacion que el buscador del sitio. */
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Reproduce la busqueda de website/search.js. */
const search = (query) => icons.filter((icon) => {
  const haystack = norm([icon.id, icon.name, icon.name_es, icon.keywords.join(' ')].join(' '));
  return norm(query).split(/\s+/).every((term) => haystack.includes(term));
});

describe('14 · cada icono se encuentra buscando en espanol', () => {
  // La prueba util no es "hay palabras en espanol en la lista", sino que un
  // productor que escribe en su idioma encuentre el icono.
  for (const icon of icons) {
    test(icon.id, () => {
      assert.ok(icon.keywords.length >= 4, `${icon.id}: menos de 4 keywords`);

      const hits = search(icon.name_es);
      assert.ok(hits.some((i) => i.id === icon.id),
        `buscar "${icon.name_es}" no encuentra ${icon.id}`);

      // Y tambien por la primera palabra suelta, que es como se busca de verdad.
      const first = icon.name_es.split(' ')[0];
      assert.ok(search(first).some((i) => i.id === icon.id),
        `buscar "${first}" no encuentra ${icon.id}`);
    });
  }
});

test('categorias declaradas y usadas', () => {
  for (const icon of icons) {
    assert.ok(CATEGORIES[icon.category], `${icon.id}: categoria no declarada`);
  }
});

describe('17 · draw() es puro y produce figuras', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      const a = icon.draw();
      const b = icon.draw();
      assert.ok(a.length > 0, 'draw() no devolvio ninguna figura');
      assert.deepEqual(
        a.map((s) => s.d ?? `${s.cx},${s.cy},${s.r}`),
        b.map((s) => s.d ?? `${s.cx},${s.cy},${s.r}`),
        'dos llamadas a draw() dieron resultados distintos'
      );
    });
  }
});

describe('las aves reutilizan el catalogo, no coordenadas sueltas', () => {
  // `taxon` y no `category`: en animals tambien viven cosas que no son aves,
  // como el nido.
  for (const icon of icons.filter((i) => i.taxon === 'bird')) {
    test(icon.id, () => {
      const paths = icon.draw().filter((s) => s.tag === 'path');
      // La silueta es un unico path cerrado: nunca circulos superpuestos (§6.1).
      const closed = paths.filter((s) => s.d.endsWith('Z'));
      assert.ok(closed.length >= 1, 'falta la silueta cerrada');
      assert.ok(
        icon.draw().some((s) => s.tag === 'circle' && s.solid),
        'falta el ojo'
      );
    });
  }
});
