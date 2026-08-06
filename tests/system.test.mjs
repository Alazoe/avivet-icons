/**
 * Comprobaciones 16 y 18–20 de ICON_SPEC.md §11: coherencia del sistema.
 * Estos tests son los que detectan artefactos desincronizados con la fuente.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import tokens, { ROOT } from '../scripts/tokens.mjs';
import { loadIcons, pascal } from '../scripts/registry.mjs';
import { svgFile } from '../scripts/emit.mjs';

const { icons } = await loadIcons();
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

test('16 · el build es determinista y esta sincronizado', () => {
  for (const icon of icons) {
    const onDisk = read(`packages/core/svg/${icon.category}/${icon.id}.svg`);
    assert.equal(onDisk, svgFile(icon, icon.draw()),
      `${icon.id}.svg no coincide con su receta: ejecuta npm run build`);
  }
});

describe('18 · manifest y SVG coinciden uno a uno', () => {
  const manifest = JSON.parse(read('packages/json/manifest.json'));

  test('mismo numero de iconos', () => {
    assert.equal(manifest.count, icons.length);
    assert.equal(manifest.icons.length, icons.length);
  });

  test('cada entrada apunta a un archivo existente', () => {
    for (const entry of manifest.icons) {
      assert.ok(existsSync(join(ROOT, entry.path)), `${entry.id}: ${entry.path} no existe`);
      assert.equal(entry.viewBox, `0 0 ${tokens.canvas.size} ${tokens.canvas.size}`);
      assert.ok(entry.body.length > 0);
    }
  });

  test('la version del manifest es la del monorepo', () => {
    assert.equal(manifest.version, pkg.version);
  });
});

test('19 · cada simbolo del sprite corresponde a un icono', () => {
  const sprite = read('packages/sprite/sprite.svg');
  const ids = [...sprite.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(
    ids.sort(),
    icons.map((i) => `${tokens.namespace}-${i.id}`).sort()
  );
});

describe('20 · existe componente React y Vue por icono', () => {
  const reactIndex = read('packages/react/src/index.ts');
  const vueIndex = read('packages/vue/src/index.ts');

  for (const icon of icons) {
    test(icon.id, () => {
      const Name = pascal(icon.id);
      assert.ok(existsSync(join(ROOT, `packages/react/src/${Name}.tsx`)), 'falta el .tsx');
      assert.ok(existsSync(join(ROOT, `packages/vue/src/${Name}.vue`)), 'falta el .vue');
      assert.match(reactIndex, new RegExp(`export \\{ ${Name} \\}`));
      assert.match(vueIndex, new RegExp(`export \\{ default as ${Name} \\}`));
    });
  }

  test('React es decorativo por defecto (§12)', () => {
    const hen = read('packages/react/src/Hen.tsx');
    assert.match(hen, /aria-hidden=\{title \? undefined : true\}/);
    assert.match(hen, /focusable="false"/);
  });
});

test('el CSS declara una clase por icono', () => {
  const css = read('packages/css/avivet-icons.css');
  for (const icon of icons) {
    assert.match(css, new RegExp(`\\.${tokens.namespace}-${icon.id} \\{`));
  }
});

test('los tokens y el package.json declaran la misma version', () => {
  assert.equal(tokens.version, pkg.version, 'design-tokens.json y package.json divergen');
});

test('el cambio de un token se propaga a todo (§3)', () => {
  // Prueba del criterio de aceptacion: el grosor emitido sale del token, no de
  // una constante escrita en el emisor.
  const svg = read('packages/core/svg/animals/hen.svg');
  assert.match(svg, new RegExp(`stroke-width="${tokens.stroke.width}"`));
  const css = read('packages/css/avivet-icons.css');
  assert.ok(css.includes(encodeURIComponent(`stroke-width="${tokens.stroke.width}"`)));
});
