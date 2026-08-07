import { silhouette, comb, wattle, beak, eye, wing, tail, leg } from '../../components/index.ts';
import type { IconRecipe } from '../../types.ts';

/**
 * La gallina es la identidad de AviVet: tranquila, sana, proporcionada,
 * elegante. Referencia: Hy-Line Brown, dibujada a partir de la lamina del
 * Director de Arte.
 *
 * Reparto del presupuesto:
 *   silueta 8 · patas 8 · cola 6 · cresta 3 · ala 3 · pico 2 · ojo 1 · barbilla 1 = 32
 *
 * Los ocho tramos de silueta no son barroquismo: dos son el cuello. Con menos,
 * la cabeza se apoya en los hombros y el ave deja de tener cuello — se probo
 * con seis y con cinco, y las dos veces salio un pato.
 */
const icon: IconRecipe = {
  id: 'hen',
  name: 'Hen',
  name_es: 'Gallina',
  category: 'animals',
  taxon: 'bird',
  keywords: ['layer', 'chicken', 'bird', 'poultry', 'gallina', 'ponedora', 'ave', 'postura'],
  since: '0.1.0',
  budget: {
    maxSegments: 32,
    maxBytes: 900,
    reason:
      'cuello propio, ala de hoja con nervadura, tres plumas de cola cerradas y patas con pie de tres dedos: es el nivel de acabado que fija la lamina de referencia',
  },

  draw() {
    const bird = silhouette({ variant: 'adult' });
    const {
      crown,
      beak: bill,
      eye: socket,
      wattle: jowl,
      wing: shoulder,
      tail: rump,
      legs,
    } = bird.anchors;

    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'single' }),
      ...wattle({ at: jowl! }),
      ...beak({ at: bill }),
      ...eye({ at: socket }),
      ...wing({ at: shoulder, variant: 'leaf' }),
      ...tail({ at: rump, variant: 'hen' }),
      // Los dos tarsos terminan a la misma altura aunque salgan de puntos
      // distintos del vientre: un ave apoyada tiene las patas parejas.
      ...legs.flatMap((at, i) =>
        leg({ at, length: i === 0 ? 4.5 : 6, foot: 'splayed', toes: 3, spread: 3.5, drop: 3.5 }),
      ),
    ];
  },
};

export default icon;
