import { drop } from '../../components/index.mjs';

export default {
  id: 'water-drop',
  name: 'Water Drop',
  name_es: 'Gota de agua',
  category: 'water',
  keywords: ['water', 'drop', 'hydration', 'humidity', 'agua', 'gota', 'consumo', 'humedad'],
  since: '0.1.0',

  // Un icono entero que es una sola pieza del catalogo: la misma gota que cae
  // del nipple, a escala completa.
  draw() {
    return drop({ at: { x: 32, y: 6 }, height: 48 });
  },
};
