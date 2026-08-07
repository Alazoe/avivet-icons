/**
 * Presupuesto de complejidad. ICON_SPEC.md §11 (21–23).
 *
 * Un icono que crece en trazos deja de leerse a 16 px mucho antes de que se
 * note a 64. Estos limites existen para que la complejidad no se cuele sin que
 * nadie la decida: una receta puede superarlos, pero solo declarando un
 * `budget` con su `reason`. La excepcion queda escrita en el codigo, no en la
 * cabeza de quien dibujo.
 */
import { describe, test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import tokens from '../packages/core/src/tokens.ts';
import { ROOT } from '../packages/core/src/paths.ts';
import type { Shape } from '../packages/core/src/types.ts';
import { loadIcons } from '../packages/core/src/registry.ts';
import { body } from '../packages/core/src/emit.ts';

const { icons } = await loadIcons();
const { maxSegments, maxBytes } = tokens.budget;

/** Segmentos de dibujo: todo comando salvo los desplazamientos y los cierres. */
export const countSegments = (d: string): number =>
  (d.match(/[MLHVCQZ]/g) ?? []).filter((c: string) => c !== 'M' && c !== 'Z').length;

const segmentsOf = (shapes: Shape[]): number =>
  shapes.reduce((n, s) => n + (s.tag === 'path' ? countSegments(s.d) : 1), 0);

describe('21 · presupuesto de segmentos', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      const limit = icon.budget?.maxSegments ?? maxSegments;
      const used = segmentsOf(icon.draw());

      if (icon.budget?.maxSegments) {
        expect(
          icon.budget.reason,
          `${icon.id}: un budget sin reason es una excepcion sin justificar`,
        ).toBeTruthy();
        expect(
          icon.budget.maxSegments > maxSegments,
          `${icon.id}: el budget declarado no supera el limite global, sobra`,
        ).toBeTruthy();
      }

      expect(
        used <= limit,
        `${icon.id}: ${used} segmentos, el limite es ${limit}. ` +
          `Simplifica el dibujo o declara un budget con su reason.`,
      ).toBeTruthy();
    });
  }
});

describe('22 · presupuesto de bytes', () => {
  for (const icon of icons) {
    test(icon.id, () => {
      const limit = icon.budget?.maxBytes ?? maxBytes;
      const used = Buffer.byteLength(body(icon.draw()));
      expect(
        used <= limit,
        `${icon.id}: ${used} bytes de geometria, el limite es ${limit}`,
      ).toBeTruthy();
    });
  }
});

test('23 · el sprite completo cabe en una descarga razonable', () => {
  const bytes = readFileSync(join(ROOT, 'packages/sprite/sprite.svg')).byteLength;
  const limit = maxBytes * icons.length;
  expect(
    bytes <= limit,
    `el sprite pesa ${bytes} bytes y el techo es ${limit} (${maxBytes} x ${icons.length} iconos)`,
  ).toBeTruthy();
});

describe('las excepciones de presupuesto estan acotadas', () => {
  test('ninguna supera el limite global en mas de un 50 %', () => {
    for (const icon of icons) {
      const declared = icon.budget?.maxSegments;
      if (!declared) continue;
      expect(
        declared,
        `${icon.id}: ${declared} segmentos es demasiado incluso justificado`,
      ).toBeLessThanOrEqual(maxSegments * 1.5);
    }
  });

  test('solo la familia de animales las necesita', () => {
    for (const icon of icons.filter((i) => i.budget)) {
      expect(
        icon.category,
        `${icon.id}: un objeto que no cabe en ${maxSegments} segmentos esta mal simplificado`,
      ).toBe('animals');
    }
  });
});
