import { rectangle, drop, draw } from '../../components/index.ts';
import type { IconRecipe } from '../../types.ts';

const icon: IconRecipe = {
  id: 'nipple-drinker',
  name: 'Nipple Drinker',
  name_es: 'Bebedero nipple',
  category: 'water',
  keywords: [
    'nipple',
    'drinker',
    'water line',
    'pin',
    'bebedero',
    'tetina',
    'linea de agua',
    'agua',
  ],
  since: '0.1.0',

  draw() {
    return [
      // Linea de agua: rectangulo con radio = altura/2, es decir un estadio.
      ...rectangle({ at: { x: 7, y: 7 }, width: 50, height: 10, radius: 5 }),

      // Cuerpo, cono y pin: geometria propia del equipo.
      draw({ at: { x: 32, y: 17 } }, (p) => p.M(-8, 0).V(11)),
      draw({ at: { x: 32, y: 17 } }, (p) => p.M(8, 0).V(11)),
      draw({ at: { x: 32, y: 28 } }, (p) => p.M(-8, 0).L(-3, 9).H(3).L(8, 0)),
      draw({ at: { x: 32, y: 37 } }, (p) => p.M(0, 0).V(4)),

      // La misma gota de water-drop, a escala de nipple.
      ...drop({ at: { x: 32, y: 44 }, height: 11.5 }),
    ];
  },
};

export default icon;
