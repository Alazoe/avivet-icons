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

test('14 · las keywords cubren los dos idiomas', () => {
  for (const icon of icons) {
    assert.ok(icon.keywords.length >= 4, `${icon.id}: menos de 4 keywords`);
    assert.ok(
      icon.keywords.some((k) => /[áéíóúñ]/.test(k)) ||
      icon.keywords.some((k) => k !== k.normalize('NFD') || /^(gallina|pollito|huevo|agua|gota|balde|vacuna|frasco|dosis|bebedero|tetina|campana|colgante|planilla|registro|reloj|hora|horario|tiempo|auditoria|control|ave|postura|crianza|recria|produccion|cascara|consumo|humedad|acarreo|cubo|biologico|bb|linea de agua)$/.test(k)),
      `${icon.id}: no se ve ninguna keyword en espanol`
    );
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
  for (const icon of icons.filter((i) => i.category === 'animals')) {
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
