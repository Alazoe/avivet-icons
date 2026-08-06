/**
 * AviVet Icons — crea un icono nuevo con el encabezado del ADN ya puesto.
 *
 *   node tools/new-icon.mjs <id> <categoria>
 *   node tools/new-icon.mjs rooster animals
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './validate.mjs';

const [id, category] = process.argv.slice(2);
const meta = JSON.parse(readFileSync(join(ROOT, 'metadata.json'), 'utf8'));
const validas = Object.keys(meta.categories);

if (!id || !category) {
  console.error('uso: node tools/new-icon.mjs <id> <categoria>');
  console.error(`categorias: ${validas.join(' · ')}`);
  process.exit(1);
}
if (!/^[a-z][a-z0-9-]*$/.test(id)) {
  console.error(`id invalido: "${id}". Debe ir en ingles y kebab-case (ej. bell-drinker).`);
  process.exit(1);
}
if (!validas.includes(category)) {
  console.error(`categoria invalida: "${category}". Usa una de: ${validas.join(' · ')}`);
  process.exit(1);
}

const rel = `src/${category}/${id}.svg`;
const full = join(ROOT, rel);
if (existsSync(full)) {
  console.error(`${rel} ya existe.`);
  process.exit(1);
}

writeFileSync(full,
`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- ${id}: dibuja dentro del area viva 4-60. Ensambla con src/_primitives/. -->
  <path d="M32 20V44"/>
</svg>
`);

console.log(`✓ ${rel}`);
console.log('\nAhora anade esta entrada en metadata.json > icons:\n');
console.log(JSON.stringify({
  id,
  name: id.replace(/(^|-)([a-z])/g, (_, s, c) => (s ? ' ' : '') + c.toUpperCase()),
  name_es: 'TODO',
  category,
  keywords: ['TODO'],
  version: '1.0',
}, null, 2));
console.log('\nLuego: npm run validate && npm run build');
