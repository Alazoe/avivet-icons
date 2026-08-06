import { silhouette, comb, beak, eye, wing, tail, leg } from '../../components/index.mjs';

export default {
  id: 'hen',
  name: 'Hen',
  name_es: 'Gallina',
  category: 'animals',
  taxon: 'bird',
  keywords: ['layer', 'chicken', 'bird', 'poultry', 'gallina', 'ponedora', 'ave', 'postura'],
  since: '0.1.0',
  budget: {
    maxSegments: 25,
    reason: 'cresta de tres lobulos + cola de tres plumas: la anatomia Hy-Line Brown del brief',
  },

  draw() {
    const bird = silhouette({ variant: 'adult' });
    const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

    // Sin barbilla: a esta escala quedaria a menos de stroke.minGap del cuello.
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
