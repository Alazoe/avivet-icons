import { circle, draw } from '../../components/index.mjs';

export default {
  id: 'bell-drinker',
  name: 'Bell Drinker',
  name_es: 'Bebedero campana',
  category: 'water',
  keywords: ['bell', 'drinker', 'hanging', 'pan', 'campana', 'bebedero', 'colgante', 'agua'],
  since: '0.1.0',

  draw() {
    return [
      ...circle({ at: { x: 32, y: 7 }, r: 3 }),
      draw({ at: { x: 32, y: 10 } }, (p) => p.M(0, 0).V(7)),

      // Campana abierta por abajo: si se cerrara, su base y el borde del plato
      // quedarian como dos trazos superpuestos.
      draw({ at: { x: 32, y: 17 } }, (p) => p
        .M(-17, 25)
        .C(-17, 11, -10, 0, 0, 0)
        .C(10, 0, 17, 11, 17, 25)),

      draw({ at: { x: 32, y: 42 } }, (p) => p
        .M(-21, 0)
        .C(-21, 6, -17, 10, -11, 10)
        .H(11)
        .C(17, 10, 21, 6, 21, 0)
        .Z()),
    ];
  },
};
