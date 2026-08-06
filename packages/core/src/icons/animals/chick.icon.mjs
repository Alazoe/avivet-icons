import { silhouette, comb, beak, eye, wing, tail, leg } from '../../components/index.mjs';

export default {
  id: 'chick',
  name: 'Chick',
  name_es: 'Pollito',
  category: 'animals',
  keywords: ['brooder', 'day-old', 'brooding', 'hatchling', 'pollito', 'bb', 'crianza', 'recria'],
  since: '0.1.0',

  draw() {
    const bird = silhouette({ variant: 'chick' });
    const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

    // Mismas piezas que la gallina: cambia la variante del contorno y la escala,
    // no el dibujo. Por eso ambos se ven de la misma mano.
    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'tuft' }),
      ...beak({ at: bill, scale: 0.85 }),
      ...eye({ at: socket }),
      ...wing({ at: shoulder, variant: 'chick' }),
      ...tail({ at: rump, variant: 'chick' }),
      ...legs.flatMap((at) => leg({ at, length: 4.5, spread: 3, drop: 3, center: 3.5 })),
    ];
  },
};
