import { draw } from '../../components/index.mjs';

export default {
  id: 'bucket',
  name: 'Bucket',
  name_es: 'Balde',
  category: 'water',
  keywords: ['container', 'pail', 'carry', 'handle', 'balde', 'cubo', 'acarreo', 'agua'],
  since: '0.1.0',

  draw() {
    const mouth = { x: 32, y: 20 };

    // Geometria propia. El asa arquea hasta y=4 para dejar mas de minGap con el
    // borde de la boca: mas plana se lee como un segundo borde, no como asa.
    return [
      draw({ at: mouth }, (p) => p.M(-18.5, 0).C(-18.5, -16, 18.5, -16, 18.5, 0)),

      draw({ at: mouth }, (p) => p
        .M(-19, 0)
        .C(-19, -2.2, -10.5, -4, 0, -4)
        .C(10.5, -4, 19, -2.2, 19, 0)
        .C(19, 2.2, 10.5, 4, 0, 4)
        .C(-10.5, 4, -19, 2.2, -19, 0)
        .Z()),

      draw({ at: mouth }, (p) => p
        .M(-19, 0)
        .L(-13, 31)
        .C(-12.6, 33.3, -10.6, 35, -8.2, 35)
        .H(8.2)
        .C(10.6, 35, 12.6, 33.3, 13, 31)
        .L(19, 0)),
    ];
  },
};
