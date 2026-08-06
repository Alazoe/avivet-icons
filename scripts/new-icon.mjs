/**
 * Crea una receta nueva a partir de la plantilla, ya conectada al catalogo.
 *
 *   node scripts/new-icon.mjs rooster animals
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { ROOT } from './tokens.mjs';
import { CATEGORIES, pascal } from './registry.mjs';

const [id, category] = process.argv.slice(2);
const valid = Object.keys(CATEGORIES);

const die = (msg) => { console.error(msg); process.exit(1); };

if (!id || !category) {
  die(`uso: node scripts/new-icon.mjs <id> <categoria>\ncategorias: ${valid.join(' · ')}`);
}
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id)) {
  die(`id invalido: "${id}". Ingles, kebab-case, singular (ej. bell-drinker).`);
}
if (!valid.includes(category)) {
  die(`categoria invalida: "${category}". Usa una de: ${valid.join(' · ')}`);
}

const rel = `packages/core/src/icons/${category}/${id}.icon.mjs`;
const full = join(ROOT, rel);
if (existsSync(full)) die(`${rel} ya existe.`);

const isBird = category === 'animals';

const template = isBird
  ? `import { silhouette, comb, beak, eye, wing, tail, leg } from '../../components/index.mjs';

export default {
  id: '${id}',
  name: '${pascal(id).replace(/([a-z])([A-Z])/g, '$1 $2')}',
  name_es: 'TODO',
  category: '${category}',
  keywords: ['TODO', 'TODO', 'TODO', 'TODO'],
  since: '0.1.0',

  draw() {
    const bird = silhouette({ variant: 'adult' });
    const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'single' }),
      ...beak({ at: bill }),
      ...eye({ at: socket }),
      ...wing({ at: shoulder, variant: 'adult' }),
      ...tail({ at: rump, variant: 'hen' }),
      ...legs.flatMap((at) => leg({ at, length: 6.5 })),
    ];
  },
};
`
  : `import { rectangle, circle, draw } from '../../components/index.mjs';

export default {
  id: '${id}',
  name: '${pascal(id).replace(/([a-z])([A-Z])/g, '$1 $2')}',
  name_es: 'TODO',
  category: '${category}',
  keywords: ['TODO', 'TODO', 'TODO', 'TODO'],
  since: '0.1.0',

  draw() {
    // Primero busca la forma en el catalogo (ICON_SPEC.md §5).
    // Si dibujas geometria propia, comenta por que no sirve un componente,
    // y si la usas por segunda vez, promuevela a componente (§4.6).
    return [
      draw({ at: { x: 32, y: 20 } }, (p) => p.M(0, 0).V(24)),
    ];
  },
};
`;

mkdirSync(dirname(full), { recursive: true });
writeFileSync(full, template);

console.log(`✓ ${rel}`);
console.log(`
Siguientes pasos:
  1. Completa name_es y las keywords (minimo 4, en ambos idiomas).
  2. Ensambla el dibujo con los componentes del catalogo.
  3. npm run build && npm test
  4. npm run preview  → revisalo a 16 px, con reticula, en claro y oscuro.
`);
