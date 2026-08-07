import { egg } from '../../components/index.ts';
import type { IconRecipe } from '../../types.ts';

const icon: IconRecipe = {
  id: 'egg',
  name: 'Egg',
  name_es: 'Huevo',
  category: 'production',
  keywords: ['ovoid', 'shell', 'laying', 'production', 'huevo', 'postura', 'cascara', 'produccion'],
  since: '0.1.0',

  // Un icono que es una sola pieza del catalogo, a tamano completo. El mismo
  // ovoide que llevan los huevos de `nest`.
  draw() {
    return egg({ at: { x: 32, y: 8 }, height: 48 });
  },
};

export default icon;
