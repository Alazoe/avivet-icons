/**
 * Comprobaciones 1–12 de ICON_SPEC.md §11, sobre los .svg GENERADOS.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import tokens, { ROOT } from '../scripts/tokens.mjs';
import { loadIcons } from '../scripts/registry.mjs';
import { extents } from '../scripts/geometry.mjs';

const { icons } = await loadIcons();
const { stroke, canvas } = tokens;

const COLOR_LITERAL = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|"(black|white|red|blue|green|gray|grey)"/i;

const read = (icon) => {
  const path = join(ROOT, `packages/core/svg/${icon.category}/${icon.id}.svg`);
  assert.ok(existsSync(path), `falta el archivo generado ${path}`);
  return readFileSync(path, 'utf8');
};

const root = (svg) => svg.match(/<svg\b([^>]*)>/)[1];
const inner = (svg) => svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'));

describe('SVG generado: contrato con los design tokens', () => {
  for (const icon of icons) {
    describe(icon.id, () => {
      const svg = read(icon);
      const head = root(svg);
      const geometry = inner(svg).replace(/<title>.*?<\/title>/, '');

      test('1 · viewBox del lienzo', () => {
        assert.match(head, new RegExp(`viewBox="0 0 ${canvas.size} ${canvas.size}"`));
      });

      test('2 · stroke = currentColor', () => {
        assert.match(head, new RegExp(`stroke="${stroke.color}"`));
      });

      test('3 · stroke-width del token', () => {
        assert.match(head, new RegExp(`stroke-width="${stroke.width}"`));
        assert.doesNotMatch(geometry, /stroke-width=/, 'ningun hijo redefine el grosor');
      });

      test('4 · remates redondos', () => {
        assert.match(head, new RegExp(`stroke-linecap="${stroke.linecap}"`));
        assert.match(head, new RegExp(`stroke-linejoin="${stroke.linejoin}"`));
      });

      test('5 · fill none en la raiz', () => {
        assert.match(head, new RegExp(`fill="${tokens.fill}"`));
      });

      test('6 · sin literales de color', () => {
        assert.doesNotMatch(geometry, COLOR_LITERAL);
      });

      test('7 · sin style, class, image ni text', () => {
        assert.doesNotMatch(geometry, /\sstyle=|\sclass=|<image|<text|<g[\s>]/);
      });

      test('8 · sin id en el cuerpo (colisionan al inlinear)', () => {
        assert.doesNotMatch(geometry, /\sid=/);
      });

      test('9 · <title> presente y = name', () => {
        assert.match(svg, new RegExp(`<title>${icon.name}</title>`));
      });

      test('10 · role="img" en la raiz', () => {
        assert.match(head, /role="img"/);
      });

      test('11 · relleno solo en el ojo', () => {
        for (const m of geometry.matchAll(/<(\w+)[^>]*fill="(?!none")([^"]+)"[^>]*>/g)) {
          const [el, tag] = [m[0], m[1]];
          const r = Number((el.match(/\br="([\d.]+)"/) || [])[1]);
          assert.equal(tag, 'circle', `relleno en <${tag}>: solo el ojo puede llevarlo`);
          assert.ok(r <= 1.5, `circulo relleno de r=${r}: el ojo mide ${tokens.eye.radius}`);
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

      assert.ok(onCurve.min >= min,
        `${icon.id}: punto sobre curva en ${onCurve.min}, el area viva empieza en ${min}`);
      assert.ok(onCurve.max <= max,
        `${icon.id}: punto sobre curva en ${onCurve.max}, el area viva termina en ${max}`);

      if (Number.isFinite(control.min)) {
        assert.ok(control.min >= min - tol && control.max <= max + tol,
          `${icon.id}: punto de control fuera de ${min - tol}–${max + tol} ` +
          `(${control.min}–${control.max})`);
      }
    });
  }
});
