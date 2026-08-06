/**
 * AviVet Icons — build.
 * Fuentes: metadata.json + src/**.svg
 * Genera:  sprite/avivet-icons.svg · css/avivet-icons.css · json/manifest.json
 *          docs/icons.js · dist/avivet-icons-preview.html
 *
 *   node tools/build.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, parseSvg, validateIcon } from './validate.mjs';

const meta = JSON.parse(readFileSync(join(ROOT, 'metadata.json'), 'utf8'));
const { version, icons, categories } = meta;

/** Compacta el cuerpo del SVG: sin comentarios, sin saltos de linea. */
const compact = (inner) =>
  inner.replace(/<!--[\s\S]*?-->/g, '').replace(/\s*\n\s*/g, '').trim();

let failed = 0;
const built = icons.map((icon) => {
  const path = `src/${icon.category}/${icon.id}.svg`;
  const full = join(ROOT, path);
  if (!existsSync(full)) {
    console.error(`  ERROR  falta ${path} (declarado en metadata.json)`);
    failed++;
    return null;
  }
  const source = readFileSync(full, 'utf8');
  const { errors } = validateIcon(source);
  errors.forEach((e) => { console.error(`  ERROR  ${path}: ${e}`); failed++; });
  return { ...icon, path, body: compact(parseSvg(source).inner) };
}).filter(Boolean);

if (failed) {
  console.error(`\n✗ Build abortado: ${failed} error(es). Corrige y vuelve a ejecutar.`);
  process.exit(1);
}

const write = (rel, content) => {
  writeFileSync(join(ROOT, rel), content);
  console.log(`  ✓ ${rel}`);
};

/* ---------- 1. Sprite SVG ---------- */
write('sprite/avivet-icons.svg',
`<svg xmlns="http://www.w3.org/2000/svg" style="display:none" data-version="${version}">
<!-- AviVet Icons v${version} — uso: <svg class="ai"><use href="sprite/avivet-icons.svg#ai-hen"/></svg> -->
${built.map((i) => `<symbol id="ai-${i.id}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${i.body}</symbol>`).join('\n')}
</svg>
`);

/* ---------- 2. CSS (mask-image, hereda currentColor) ---------- */
const dataUri = (i) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${i.body.replace(/currentColor/g, 'black')}</svg>`
  ).replace(/'/g, '%27')}")`;

write('css/avivet-icons.css',
`/* AviVet Icons v${version} — MIT
   <i class="ai ai-hen"></i>   ·   hereda color y tamano del texto */
.ai {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  background-color: currentColor;
  -webkit-mask: var(--ai-icon) no-repeat center / contain;
  mask: var(--ai-icon) no-repeat center / contain;
}
/* Modificadores de tamano */
.ai-sm { width: .875em; height: .875em; }
.ai-lg { width: 1.5em;  height: 1.5em;  }
.ai-xl { width: 2.5em;  height: 2.5em;  }

${built.map((i) => `.ai-${i.id} { --ai-icon: ${dataUri(i)}; }`).join('\n')}
`);

/* ---------- 3. Manifest ---------- */
write('json/manifest.json', JSON.stringify({
  library: meta.library,
  version,
  license: meta.license,
  grid: meta.grid,
  strokeWidth: meta.strokeWidth,
  generated: new Date().toISOString().slice(0, 10),
  count: built.length,
  categories,
  icons: built.map(({ id, name, name_es, category, keywords, version: v, path, body }) => ({
    id, name, name_es, category, keywords, version: v, path,
    viewBox: '0 0 64 64',
    body,
  })),
}, null, 2) + '\n');

/* ---------- 4. Datos para el sitio ---------- */
const siteData = JSON.stringify({ version, categories, icons: built.map(({ id, name, name_es, category, keywords, body }) => ({ id, name, name_es, category, keywords, body })) });
write('docs/icons.js', `/* generado por tools/build.mjs — no editar */\nwindow.AVIVET_ICONS = ${siteData};\n`);

/* ---------- 5. Preview autocontenida (1 solo archivo) ---------- */
const html = readFileSync(join(ROOT, 'docs/index.html'), 'utf8');
const css = readFileSync(join(ROOT, 'docs/preview.css'), 'utf8');
const js = readFileSync(join(ROOT, 'docs/search.js'), 'utf8');
const standalone = html
  .replace('<link rel="stylesheet" href="preview.css">', `<style>\n${css}\n</style>`)
  .replace('<script src="icons.js"></script>', `<script>window.AVIVET_ICONS = ${siteData};</script>`)
  .replace('<script src="search.js"></script>', `<script>\n${js}\n</script>`);
write('dist/avivet-icons-preview.html', standalone);

/* ---------- 6. Misma pagina sin envoltorio <html>, para publicar como Artifact ---------- */
write('dist/avivet-icons-artifact.html', standalone
  .slice(standalone.indexOf('<title>'), standalone.lastIndexOf('</body>'))
  .replace('</head>\n', '')
  .replace('<body>\n', ''));

console.log(`\n✓ AviVet Icons v${version} — ${built.length} iconos construidos.`);
