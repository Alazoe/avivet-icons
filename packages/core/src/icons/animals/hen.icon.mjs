import { silhouette, comb, beak, eye, wing, tail, leg } from '../../components/index.mjs';

/**
 * La gallina es la identidad de AviVet: tranquila, sana, proporcionada,
 * elegante. Referencia: Hy-Line Brown, no una gallina generica.
 *
 * Presupuesto: 17 de 18 segmentos, SIN excepcion declarada. Cabe porque el
 * cuello no gasta tramo propio y las patas son dos tarsos rectos, como en el
 * boceto de referencia. Antes gastaba 25.
 *
 *   silueta 5 · cresta 3 · cola 3 · pico 2 · ala 1 · ojo 1 · patas 2 = 17
 */
export default {
  id: 'hen',
  name: 'Hen',
  name_es: 'Gallina',
  category: 'animals',
  taxon: 'bird',
  keywords: ['layer', 'chicken', 'bird', 'poultry', 'gallina', 'ponedora', 'ave', 'postura'],
  since: '0.1.0',

  draw() {
    const bird = silhouette({ variant: 'adult' });
    const { crown, beak: bill, eye: socket, wing: shoulder, tail: rump, legs } = bird.anchors;

    // Sin barbilla: a esta escala quedaria a menos de stroke.minGap del cuello.
    // Las dos patas terminan a la misma altura aunque salgan de puntos
    // distintos del vientre: un ave apoyada tiene los tarsos parejos.
    return [
      ...bird.shapes,
      ...comb({ at: crown, size: 'single' }),
      ...beak({ at: bill }),
      ...eye({ at: socket }),
      ...wing({ at: shoulder, variant: 'simple', scale: 1.05 }),
      ...tail({ at: rump, variant: 'hen' }),
      ...legs.flatMap((at, i) => leg({ at, length: i === 0 ? 7 : 7.8, foot: false })),
    ];
  },
};
