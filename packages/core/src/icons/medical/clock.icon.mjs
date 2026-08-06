import { circle, draw, CENTER } from '../../components/index.mjs';

export default {
  id: 'clock',
  name: 'Clock',
  name_es: 'Reloj',
  category: 'medical',
  keywords: ['timer', 'time', 'schedule', 'hours', 'reloj', 'hora', 'horario', 'tiempo'],
  since: '0.1.0',

  draw() {
    // La esfera usa el keyline circular por defecto: es la referencia de tamano
    // de toda forma redonda de la biblioteca.
    return [
      ...circle(),
      draw({ at: CENTER }, (p) => p.M(0, -15).V(1).L(11, 7)),
    ];
  },
};
