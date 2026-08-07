/**
 * Comprobaciones 1–12 de ICON_SPEC.md §11, sobre los .svg GENERADOS.
 */
import { describe, test, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import tokens from '../packages/core/src/tokens.ts';
import { ROOT } from '../packages/core/src/paths.ts';
import { loadIcons } from '../packages/core/src/registry.ts';
import type { LoadedIcon } from '../packages/core/src/types.ts';
import { extents } from '../packages/core/src/geometry.ts';

const { icons } = await loadIcons();
const { stroke, canvas } = tokens;

const COLOR_LITERAL =
  /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|"(black|white|red|blue|green|gray|grey)"/i;

const read = (icon: LoadedIcon): string => {
  const path = join(ROOT, `packages/core/svg/${icon.category}/${icon.id}.svg`);
  expect(existsSync(path), `falta el archivo generado ${path}`).toBeTruthy();
  return readFileSync(path, 'utf8');
};

const root = (svg: string): string => svg.match(/<svg\b([^>]*)>/)![1]!;
const inner = (svg: string): string => svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'));

describe('SVG generado: contrato con los design tokens', () => {
  for (const icon of icons) {
    describe(icon.id, () => {
      const svg = read(icon);
      const head = root(svg);
      const geometry = inner(svg).replace(/<title>.*?<\/title>/, '');

      test('1 · viewBox del lienzo', () => {
        expect(head).toMatch(new RegExp(`viewBox="0 0 ${canvas.size} ${canvas.size}"`));
      });

      test('2 · stroke = currentColor', () => {
        expect(head).toMatch(new RegExp(`stroke="${stroke.color}"`));
      });

      test('3 · stroke-width del token', () => {
        expect(head).toMatch(new RegExp(`stroke-width="${stroke.width}"`));
        expect(geometry, 'ningun hijo redefine el grosor').not.toMatch(/stroke-width=/);
      });

      test('4 · remates redondos', () => {
        expect(head).toMatch(new RegExp(`stroke-linecap="${stroke.linecap}"`));
        expect(head).toMatch(new RegExp(`stroke-linejoin="${stroke.linejoin}"`));
      });

      test('5 · fill none en la raiz', () => {
        expect(head).toMatch(new RegExp(`fill="${tokens.fill}"`));
      });

      test('6 · sin literales de color', () => {
        expect(geometry).not.toMatch(COLOR_LITERAL);
      });

      test('7 · sin style, class, image ni text', () => {
        expect(geometry).not.toMatch(/\sstyle=|\sclass=|<image|<text|<g[\s>]/);
      });

      test('8 · sin id en el cuerpo (colisionan al inlinear)', () => {
        expect(geometry).not.toMatch(/\sid=/);
      });

      test('9 · <title> presente y = name', () => {
        expect(svg).toMatch(new RegExp(`<title>${icon.name}</title>`));
      });

      test('10 · role="img" en la raiz', () => {
        expect(head).toMatch(/role="img"/);
      });

      test('11 · relleno solo en el ojo', () => {
        for (const m of geometry.matchAll(/<(\w+)[^>]*fill="(?!none")([^"]+)"[^>]*>/g)) {
          const [el, tag] = [m[0], m[1]];
          const r = Number((el.match(/\br="([\d.]+)"/) || [])[1]);
          expect(tag, `relleno en <${tag}>: solo el ojo puede llevarlo`).toBe('circle');
          expect(
            r <= 1.5,
            `circulo relleno de r=${r}: el ojo mide ${tokens.eye.radius}`,
          ).toBeTruthy();
        }
      });
    });
  }
});

describe('12 · geometria dentro del area viva', () => {
  const { min, max } = canvas.safeArea;
  const tol = canvas.controlTolerance;

  for (const icon of icons) {
    test(icon.id, () => {
      const { onCurve, control } = extents(icon.draw());

      expect(
        onCurve.min >= min,
        `${icon.id}: punto sobre curva en ${onCurve.min}, el area viva empieza en ${min}`,
      ).toBeTruthy();
      expect(
        onCurve.max <= max,
        `${icon.id}: punto sobre curva en ${onCurve.max}, el area viva termina en ${max}`,
      ).toBeTruthy();

      if (Number.isFinite(control.min)) {
        expect(
          control.min >= min - tol && control.max <= max + tol,
          `${icon.id}: punto de control fuera de ${min - tol}–${max + tol} ` +
            `(${control.min}–${control.max})`,
        ).toBeTruthy();
      }
    });
  }
});
