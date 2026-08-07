import { rectangle, cross, draw } from '../../components/index.ts';
import type { IconRecipe } from '../../types.ts';

const icon: IconRecipe = {
  id: 'vaccine-bottle',
  name: 'Vaccine Bottle',
  name_es: 'Frasco de vacuna',
  category: 'medical',
  keywords: ['vaccine', 'vial', 'bottle', 'dose', 'vacuna', 'frasco', 'dosis', 'biologico'],
  since: '0.1.0',

  draw() {
    return [
      // Tapa de aluminio.
      ...rectangle({ at: { x: 25, y: 7 }, width: 14, height: 8, radius: 0 }),

      // Cuello y cuerpo del frasco.
      draw({ at: { x: 32, y: 15 } }, (p) =>
        p
          .M(-4, 0)
          .V(4.5)
          .C(-9.5, 6.5, -13, 11, -13, 16.5)
          .V(35)
          .C(-13, 37.8, -10.8, 40, -8, 40)
          .H(8)
          .C(10.8, 40, 13, 37.8, 13, 35)
          .V(16.5)
          .C(13, 11, 9.5, 6.5, 4, 4.5)
          .V(0),
      ),

      // Nivel del liquido: curvado, porque el frasco es cilindrico.
      draw({ at: { x: 32, y: 34 } }, (p) => p.M(-13, 0).C(-7, -2.5, 7, -2.5, 13, 0)),

      ...cross({ at: { x: 32, y: 44 }, size: 8 }),
    ];
  },
};

export default icon;
