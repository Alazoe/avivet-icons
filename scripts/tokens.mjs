/**
 * Carga design-tokens.json y lo congela.
 * Todo valor de presentacion del proyecto sale de aqui. Ver ICON_SPEC.md §3.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

const deepFreeze = (o) => {
  Object.values(o).forEach((v) => { if (v && typeof v === 'object') deepFreeze(v); });
  return Object.freeze(o);
};

const tokens = deepFreeze(JSON.parse(readFileSync(new URL('../design-tokens.json', import.meta.url), 'utf8')));

export default tokens;
