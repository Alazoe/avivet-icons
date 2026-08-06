import { silhouette, comb, wattle, beak, eye, wing, tail, leg } from '../../components/index.mjs';

export default {
  id: 'rooster',
  name: 'Rooster',
  name_es: 'Gallo',
  category: 'animals',
  taxon: 'bird',
  keywords: ['cock', 'male', 'breeder', 'cockerel', 'gallo', 'macho', 'reproductor', 'padrote'],
  since: '0.2.0',
  budget: {
    maxSegments: 26,
    reason: 'cresta grande + barbilla + tres hoces: la anatomia que distingue al macho',
  },

  draw() {
    const bird = silhouette({ variant: 'rooster' });
    const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

    // Aqui la barbilla SI cabe: el cuello del gallo deja mas de stroke.minGap
    // libre bajo el pico. En la gallina no, y por eso se omite.
    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'big' }),
      ...wattle({ at: bill }),
      ...beak({ at: bill }),
      ...eye({ at: socket }),
      ...wing({ at: shoulder, variant: 'adult' }),
      ...tail({ at: rump, variant: 'rooster' }),
      ...legs.flatMap((at) => leg({ at, length: 5 })),
    ];
  },
};
