/**
 * Crea una receta nueva a partir de la plantilla, ya conectada al catalogo.
 *
 *   pnpm new -- rooster animals
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { ROOT } from '../packages/core/src/paths.ts';
import { CATEGORIES, pascal } from '../packages/core/src/registry.ts';

const [id, category] = process.argv.slice(2);
const valid = Object.keys(CATEGORIES);

const die = (msg: string): never => {
  console.error(msg);
  process.exit(1);
};

if (!id || !category) {
  die(`uso: pnpm new -- <id> <categoria>\ncategorias: ${valid.join(' · ')}`);
}
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id!)) {
  die(`id invalido: "${id}". Ingles, kebab-case, singular (ej. bell-drinker).`);
}
if (!valid.includes(category!)) {
  die(`categoria invalida: "${category}". Usa una de: ${valid.join(' · ')}`);
}

const rel = `packages/core/src/icons/${category}/${id}.icon.ts`;
const full = join(ROOT, rel);
if (existsSync(full)) die(`${rel} ya existe.`);

const title = pascal(id!).replace(/([a-z])([A-Z])/g, '$1 $2');
const isBird = category === 'animals';

const template = isBird
  ? `import { silhouette, comb, beak, eye, wing, tail, leg } from '../../components/index.ts';
import type { IconRecipe } from '../../types.ts';

const icon: IconRecipe = {
  id: '${id}',
  name: '${title}',
  name_es: 'TODO',
  category: '${category}',
  taxon: 'bird',
  keywords: ['TODO', 'TODO', 'TODO', 'TODO'],
  since: '0.3.0',

  draw() {
    const bird = silhouette({ variant: 'adult' });
    const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'single' }),
      ...beak({ at: bill }),
      ...eye({ at: socket }),
      ...wing({ at: shoulder, variant: 'simple' }),
      ...tail({ at: rump, variant: 'hen' }),
      ...legs.flatMap((at) => leg({ at, length: 6.5, foot: 'profile' })),
    ];
  },
};

export default icon;
`
  : `import { rectangle, circle, draw } from '../../components/index.ts';
import type { IconRecipe } from '../../types.ts';

const icon: IconRecipe = {
  id: '${id}',
  name: '${title}',
  name_es: 'TODO',
  category: '${category}',
  keywords: ['TODO', 'TODO', 'TODO', 'TODO'],
  since: '0.3.0',

  draw() {
    // Primero busca la forma en el catalogo (ICON_SPEC.md §5).
    // Si dibujas geometria propia, comenta por que no sirve un componente,
    // y si la usas por segunda vez, promuevela a componente (§4.6).
    return [draw({ at: { x: 32, y: 20 } }, (p) => p.M(0, 0).V(24))];
  },
};

export default icon;
`;

mkdirSync(dirname(full), { recursive: true });
writeFileSync(full, template);

console.log(`✓ ${rel}`);
console.log(`
Siguientes pasos:
  1. Completa name_es y las keywords (minimo 4, en ambos idiomas).
  2. Ensambla el dibujo con los componentes del catalogo.
  3. pnpm build && pnpm test
  4. pnpm sketch -- ${id}   → revisalo a 16 px y a 128 px, con reticula.
`);
