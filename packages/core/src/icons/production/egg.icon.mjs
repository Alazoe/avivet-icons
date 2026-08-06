import { draw } from '../../components/index.mjs';

export default {
  id: 'egg',
  name: 'Egg',
  name_es: 'Huevo',
  category: 'production',
  keywords: ['ovoid', 'shell', 'laying', 'production', 'huevo', 'postura', 'cascara', 'produccion'],
  since: '0.1.0',

  draw() {
    // Geometria propia: el ovoide aviar no es una elipse ni una gota. El polo
    // agudo va arriba y el romo abajo, como se apoya en la bandeja.
    return [
      draw({ at: { x: 32, y: 8 } }, (p) => p
        .M(0, 0)
        .C(10, 0, 18, 14, 18, 28)
        .C(18, 40, 10, 48, 0, 48)
        .C(-10, 48, -18, 40, -18, 28)
        .C(-18, 14, -10, 0, 0, 0)
        .Z()),
    ];
  },
};
