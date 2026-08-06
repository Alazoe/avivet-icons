/**
 * Build de AviVet Icons. Determinista: mismas fuentes => bytes identicos.
 * Ver ICON_SPEC.md §10.
 *
 *   node scripts/build.mjs
 */
import { writeFileSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import tokens, { ROOT } from './tokens.mjs';
import { loadIcons, CATEGORIES, pascal } from './registry.mjs';
import { svgFile, symbol, dataUri, body, rootAttrs, attrsToString } from './emit.mjs';

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const ns = tokens.namespace;
const written = [];

const write = (rel, content) => {
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  written.push(rel);
};

const banner = (comment = '//') =>
  `${comment} GENERADO por scripts/build.mjs — no editar a mano.\n` +
  `${comment} Fuente: packages/core/src + design-tokens.json · AviVet Icons v${pkg.version}\n`;

/* ------------------------------------------------------------------ */
const { icons } = await loadIcons();
const built = icons.map((icon) => ({ icon, shapes: icon.draw() }));

for (const { icon, shapes } of built) {
  if (!shapes.length) throw new Error(`${icon.id}: draw() no devolvio ninguna figura`);
}

/* 1 · packages/core/svg -------------------------------------------- */
rmSync(join(ROOT, 'packages/core/svg'), { recursive: true, force: true });
for (const { icon, shapes } of built) {
  write(`packages/core/svg/${icon.category}/${icon.id}.svg`, svgFile(icon, shapes));
}

/* 2 · packages/sprite ---------------------------------------------- */
write('packages/sprite/sprite.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" data-version="${pkg.version}" ` +
  `${attrsToString({
    fill: tokens.fill,
    stroke: tokens.stroke.color,
    'stroke-width': tokens.stroke.width,
    'stroke-linecap': tokens.stroke.linecap,
    'stroke-linejoin': tokens.stroke.linejoin,
  })}>\n` +
  `<!-- GENERADO por scripts/build.mjs · uso: <svg><use href="sprite.svg#${ns}-hen"/></svg> -->\n` +
  built.map(({ icon, shapes }) => symbol(icon, shapes)).join('\n') +
  `\n</svg>\n`);

/* 3 · packages/json ------------------------------------------------ */
write('packages/json/manifest.json', JSON.stringify({
  library: 'AviVet Icons',
  version: pkg.version,
  license: 'MIT',
  tokens: { canvas: tokens.canvas.size, stroke: tokens.stroke.width, color: tokens.stroke.color },
  count: built.length,
  categories: CATEGORIES,
  icons: built.map(({ icon, shapes }) => ({
    id: icon.id,
    name: icon.name,
    name_es: icon.name_es,
    category: icon.category,
    keywords: icon.keywords,
    since: icon.since,
    ...(icon.deprecated ? { deprecated: icon.deprecated } : {}),
    path: `packages/core/svg/${icon.category}/${icon.id}.svg`,
    viewBox: `0 0 ${tokens.canvas.size} ${tokens.canvas.size}`,
    body: body(shapes),
  })),
}, null, 2) + '\n');

/* 4 · packages/css ------------------------------------------------- */
const { sizes } = tokens;
write('packages/css/avivet-icons.css',
  banner('/*').replace(/\n$/, ' */\n') +
`.${ns} {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  background-color: currentColor;
  -webkit-mask: var(--${ns}-icon) no-repeat center / contain;
  mask: var(--${ns}-icon) no-repeat center / contain;
}
${Object.entries(sizes).map(([k, v]) =>
  `.${ns}-size-${k} { width: ${v}px; height: ${v}px; }`).join('\n')}

${built.map(({ icon, shapes }) => `.${ns}-${icon.id} { --${ns}-icon: ${dataUri(shapes)}; }`).join('\n')}
`);

/* 5 · packages/react ----------------------------------------------- */
rmSync(join(ROOT, 'packages/react/src'), { recursive: true, force: true });
write('packages/react/src/types.ts',
  banner() +
`import type { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'title'> {
  /** Alto y ancho en px. Por defecto ${sizes.md}. */
  size?: number | string;
  /** Si se pasa, el icono deja de ser decorativo y se anuncia con este texto. */
  title?: string;
}
`);

const reactAttrs = attrsToString(
  Object.fromEntries(Object.entries(rootAttrs({ jsx: true }))
    .filter(([k]) => k !== 'width' && k !== 'height'))
);

for (const { icon, shapes } of built) {
  const Name = pascal(icon.id);
  write(`packages/react/src/${Name}.tsx`,
    banner() +
`import * as React from 'react';
import type { IconProps } from './types';

export const ${Name} = React.forwardRef<SVGSVGElement, IconProps>(function ${Name}(
  { size = ${sizes.md}, title, ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      ${reactAttrs.replace(/ /g, '\n      ')}
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      ${body(shapes)}
    </svg>
  );
});

export default ${Name};
`);
}

write('packages/react/src/index.ts',
  banner() +
  `export type { IconProps } from './types';\n` +
  built.map(({ icon }) => `export { ${pascal(icon.id)} } from './${pascal(icon.id)}';`).join('\n') + '\n');

/* 6 · packages/vue ------------------------------------------------- */
rmSync(join(ROOT, 'packages/vue/src'), { recursive: true, force: true });
const vueAttrs = attrsToString(
  Object.fromEntries(Object.entries(rootAttrs())
    .filter(([k]) => k !== 'width' && k !== 'height'))
);

for (const { icon, shapes } of built) {
  const Name = pascal(icon.id);
  write(`packages/vue/src/${Name}.vue`,
`<!-- ${banner('').trim().replace(/\n/g, ' · ')} -->
<script setup lang="ts">
withDefaults(defineProps<{ size?: number | string; title?: string }>(), { size: ${sizes.md} });
</script>

<template>
  <svg
    ${vueAttrs.replace(/ /g, '\n    ')}
    :width="size"
    :height="size"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : true"
    focusable="false"
  >
    <title v-if="title">{{ title }}</title>
    ${body(shapes)}
  </svg>
</template>
`);
}

write('packages/vue/src/index.ts',
  banner() +
  built.map(({ icon }) => `export { default as ${pascal(icon.id)} } from './${pascal(icon.id)}.vue';`).join('\n') + '\n');

/* 7 · docs (sitio publicado) --------------------------------------- */
const site = {
  version: pkg.version,
  categories: CATEGORIES,
  icons: built.map(({ icon, shapes }) => ({
    id: icon.id, name: icon.name, name_es: icon.name_es,
    category: icon.category, keywords: icon.keywords, since: icon.since,
    body: body(shapes),
  })),
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const page = read('website/index.html')
  .replace('<link rel="stylesheet" href="preview.css">', `<style>\n${read('website/preview.css')}\n</style>`)
  .replace('<script src="icons.js"></script>', `<script>window.AVIVET_ICONS = ${JSON.stringify(site)};</script>`)
  .replace('<script src="search.js"></script>', `<script>\n${read('website/search.js')}\n</script>`);

write('docs/index.html', page);
write('docs/.nojekyll', '');
// Misma pagina sin envoltorio <html>, para publicarla como Artifact.
write('docs/artifact.html',
  page.slice(page.indexOf('<title>'), page.lastIndexOf('</body>')).replace('</head>\n', '').replace('<body>\n', ''));

/* ------------------------------------------------------------------ */
console.log(written.map((f) => `  ✓ ${f}`).join('\n'));
console.log(`\n✓ AviVet Icons v${pkg.version} — ${built.length} iconos · ${written.length} archivos generados.`);
