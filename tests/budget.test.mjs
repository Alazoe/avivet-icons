/**
 * Presupuesto de complejidad. ICON_SPEC.md §11 (21–23).
 *
 * Un icono que crece en trazos deja de leerse a 16 px mucho antes de que se
 * note a 64. Estos limites existen para que la complejidad no se cuele sin que
 * nadie la decida: una receta puede superarlos, pero solo declarando un
 * `budget` con su `reason`. La excepcion queda escrita en el codigo, no en la
 * cabeza de quien dibujo.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import tokens, { ROOT } from '../scripts/tokens.mjs';
import { loadIcons } from '../scripts/registry.mjs';
import { body } from '../scripts/emit.mjs';

const { icons } = await loadIcons();
const { maxSegments, maxBytes } = tokens.budget;

/** Segmentos de dibujo: todo comando salvo los desplazamientos y los cierres. */
export const countSegments = (d) =>
  (d.match(/[MLHVCQZ]/g) ?? []).filter((c) => c !== 'M' && c !== 'Z').length;

const segmentsOf = (shapes) =>
  shapes.reduce((n, s) => n + (s.tag === 'path' ? countSegments(s.d) : 1), 0);

describe('21 · presupuesto de segmentos', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      const limit = icon.budget?.maxSegments ?? maxSegments;
      const used = segmentsOf(icon.draw());

      if (icon.budget?.maxSegments) {
        assert.ok(icon.budget.reason,
          `${icon.id}: un budget sin reason es una excepcion sin justificar`);
        assert.ok(icon.budget.maxSegments > maxSegments,
          `${icon.id}: el budget declarado no supera el limite global, sobra`);
      }

      assert.ok(used <= limit,
        `${icon.id}: ${used} segmentos, el limite es ${limit}. ` +
        `Simplifica el dibujo o declara un budget con su reason.`);
    });
  }
});

describe('22 · presupuesto de bytes', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      const limit = icon.budget?.maxBytes ?? maxBytes;
      const used = Buffer.byteLength(body(icon.draw()));
      assert.ok(used <= limit, `${icon.id}: ${used} bytes de geometria, el limite es ${limit}`);
    });
  }
});

test('23 · el sprite completo cabe en una descarga razonable', () => {
  const bytes = readFileSync(join(ROOT, 'packages/sprite/sprite.svg')).byteLength;
  const limit = maxBytes * icons.length;
  assert.ok(bytes <= limit,
    `el sprite pesa ${bytes} bytes y el techo es ${limit} (${maxBytes} x ${icons.length} iconos)`);
});

describe('las excepciones de presupuesto estan acotadas', () => {
  test('ninguna supera el limite global en mas de un 50 %', () => {
    for (const icon of icons.filter((i) => i.budget?.maxSegments)) {
      assert.ok(icon.budget.maxSegments <= maxSegments * 1.5,
        `${icon.id}: ${icon.budget.maxSegments} segmentos es demasiado incluso justificado`);
    }
  });

  test('solo la familia de animales las necesita', () => {
    for (const icon of icons.filter((i) => i.budget)) {
      assert.equal(icon.category, 'animals',
        `${icon.id}: un objeto que no cabe en ${maxSegments} segmentos esta mal simplificado`);
    }
  });
});
