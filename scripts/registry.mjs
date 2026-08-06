/**
 * Descubre y carga las recetas de packages/core/src/icons/**.icon.mjs
 * y valida sus metadatos contra ICON_SPEC.md §9.
 * Lo usan tanto el build como los tests: una sola definicion de "que iconos hay".
 */
import { readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './tokens.mjs';

export const ICONS_DIR = join(ROOT, 'packages/core/src/icons');

export const CATEGORIES = {
  animals:     { name_es: 'Animales',     order: 1 },
  water:       { name_es: 'Agua',         order: 2 },
  medical:     { name_es: 'Sanidad',      order: 3 },
  nutrition:   { name_es: 'Nutrición',    order: 4 },
  buildings:   { name_es: 'Instalaciones', order: 5 },
  biosecurity: { name_es: 'Bioseguridad', order: 6 },
  production:  { name_es: 'Producción',   order: 7 },
  ui:          { name_es: 'Interfaz',     order: 8 },
};

const SEMVER = /^\d+\.\d+\.\d+$/;
const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/** hen -> Hen · bell-drinker -> BellDrinker */
export const pascal = (id) => id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return entry.endsWith('.icon.mjs') ? [full] : [];
  });
}

/** Comprueba los metadatos. Devuelve un array de errores (vacio = correcto). */
export function checkMetadata(icon, file) {
  const errors = [];
  const where = basename(file);
  const expected = basename(file, '.icon.mjs');

  if (!KEBAB.test(icon.id ?? '')) errors.push(`${where}: id "${icon.id}" no es kebab-case`);
  if (icon.id !== expected) errors.push(`${where}: id "${icon.id}" no coincide con el archivo`);
  if (!icon.name) errors.push(`${where}: falta name`);
  if (!icon.name_es) errors.push(`${where}: falta name_es`);
  if (!CATEGORIES[icon.category]) errors.push(`${where}: categoria invalida "${icon.category}"`);
  if (!Array.isArray(icon.keywords) || icon.keywords.length < 4) {
    errors.push(`${where}: se requieren al menos 4 keywords`);
  }
  if (icon.keywords?.includes(icon.id)) errors.push(`${where}: keywords no debe repetir el id`);
  if (!SEMVER.test(icon.since ?? '')) errors.push(`${where}: since "${icon.since}" no es semver`);
  if (typeof icon.draw !== 'function') errors.push(`${where}: falta draw()`);
  if (!file.includes(`/icons/${icon.category}/`)) {
    errors.push(`${where}: esta en otra carpeta que su categoria "${icon.category}"`);
  }
  return errors;
}

/** Carga todas las recetas, ordenadas por categoria y luego por id. */
export async function loadIcons({ strict = true } = {}) {
  const files = walk(ICONS_DIR).sort();
  const icons = [];
  const errors = [];

  for (const file of files) {
    const mod = await import(pathToFileURL(file));
    const icon = mod.default;
    errors.push(...checkMetadata(icon, file));
    icons.push({ ...icon, file });
  }

  const ids = icons.map((i) => i.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) errors.push(`ids duplicados: ${[...new Set(dupes)].join(', ')}`);

  if (strict && errors.length) {
    throw new Error(`Metadatos invalidos:\n  ${errors.join('\n  ')}`);
  }

  icons.sort((a, b) =>
    (CATEGORIES[a.category].order - CATEGORIES[b.category].order) || a.id.localeCompare(b.id));

  return { icons, errors };
}
