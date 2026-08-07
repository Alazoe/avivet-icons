/**
 * Comprobaciones 16 y 18–20 de ICON_SPEC.md §11: coherencia del sistema.
 * Estos tests son los que detectan artefactos desincronizados con la fuente.
 */
import { describe, test, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import tokens from '../packages/core/src/tokens.ts';
import { ROOT } from '../packages/core/src/paths.ts';
import { loadIcons, pascal } from '../packages/core/src/registry.ts';
import { svgFile } from '../packages/core/src/emit.ts';
import { optimizeSvg } from '../scripts/optimize.ts';
import type { Manifest } from '../packages/core/src/types.ts';

const { icons } = await loadIcons();
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string };
const read = (rel: string): string => readFileSync(join(ROOT, rel), 'utf8');

test('16 · el build es determinista y esta sincronizado', () => {
  for (const icon of icons) {
    const onDisk = read(`packages/core/svg/${icon.category}/${icon.id}.svg`);
    // Se optimiza igual que en el build: si no, compararia peras con manzanas.
    expect(onDisk, `${icon.id}.svg no coincide con su receta: ejecuta pnpm build`).toBe(
      optimizeSvg(svgFile(icon, icon.draw())),
    );
  }
});

test('16b · SVGO es idempotente sobre nuestra salida', () => {
  // Si una segunda pasada cambiara algo, el build dejaria de ser determinista
  // en cuanto alguien encadenara dos optimizaciones.
  for (const icon of icons) {
    const once = optimizeSvg(svgFile(icon, icon.draw()));
    expect(optimizeSvg(once), `${icon.id}: SVGO no converge`).toBe(once);
  }
});

describe('18 · manifest y SVG coinciden uno a uno', () => {
  const manifest = JSON.parse(read('packages/docs/manifest.json')) as Manifest;

  test('mismo numero de iconos', () => {
    expect(manifest.count).toBe(icons.length);
    expect(manifest.icons.length).toBe(icons.length);
  });

  test('cada entrada apunta a un archivo existente', () => {
    for (const entry of manifest.icons) {
      expect(existsSync(join(ROOT, entry.path)), `${entry.id}: ${entry.path} no existe`).toBe(true);
      expect(entry.viewBox).toBe(`0 0 ${tokens.canvas.size} ${tokens.canvas.size}`);
      expect(entry.body.length).toBeGreaterThan(0);
    }
  });

  test('la version del manifest es la del monorepo', () => {
    expect(manifest.version).toBe(pkg.version);
  });
});

test('19 · cada simbolo del sprite corresponde a un icono', () => {
  const sprite = read('packages/sprite/sprite.svg');
  const ids = [...sprite.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]!);
  expect(ids.sort()).toEqual(icons.map((i) => `${tokens.namespace}-${i.id}`).sort());
});

describe('20 · existe componente React y Vue por icono', () => {
  const reactIndex = read('packages/react/src/index.ts');
  const vueIndex = read('packages/vue/src/index.ts');

  for (const icon of icons) {
    test(icon.id, () => {
      const Name = pascal(icon.id);
      expect(existsSync(join(ROOT, `packages/react/src/${Name}.tsx`)), 'falta el .tsx').toBe(true);
      expect(existsSync(join(ROOT, `packages/vue/src/${Name}.vue`)), 'falta el .vue').toBe(true);
      expect(reactIndex).toMatch(new RegExp(`export \\{ ${Name} \\}`));
      expect(vueIndex).toMatch(new RegExp(`export \\{ default as ${Name} \\}`));
    });
  }

  test('React es decorativo por defecto (§12)', () => {
    const hen = read('packages/react/src/Hen.tsx');
    expect(hen).toMatch(/aria-hidden=\{title \? undefined : true\}/);
    expect(hen).toMatch(/focusable="false"/);
  });
});

test('el CSS declara una clase por icono', () => {
  const css = read('packages/css/avivet-icons.css');
  for (const icon of icons) {
    expect(css).toMatch(new RegExp(`\\.${tokens.namespace}-${icon.id} \\{`));
  }
});

test('los tokens y el package.json declaran la misma version', () => {
  expect(tokens.version, 'design-tokens.json y package.json divergen').toBe(pkg.version);
});

test('el cambio de un token se propaga a todo (§3)', () => {
  // Prueba del criterio de aceptacion: el grosor emitido sale del token, no de
  // una constante escrita en el emisor.
  expect(read('packages/core/svg/animals/hen.svg')).toMatch(
    new RegExp(`stroke-width="${tokens.stroke.width}"`),
  );
  expect(
    read('packages/css/avivet-icons.css').includes(
      encodeURIComponent(`stroke-width="${tokens.stroke.width}"`),
    ),
  ).toBe(true);
});
