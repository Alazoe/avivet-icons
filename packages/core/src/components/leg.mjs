/**
 * COMPONENTE — LEG
 *
 * Tarso vertical desde el vientre. Dos acabados:
 *
 *   'splayed' — tarso + FOOT de dos dedos simetricos. 3 segmentos por pata.
 *               Lectura frontal, buena en aves pequenas y compactas.
 *   'profile' — tarso y dedo hacia adelante en un solo trazo quebrado.
 *               2 segmentos por pata, y es lo correcto en vista de perfil: el
 *               ave apoya los dedos en la direccion en que mira. Por eso gira
 *               con tokens.anatomy.facing.
 *
 * Adulto: tarso 6.5 · pollito: 4.5.
 */
import { draw, FACING } from '../../../../scripts/geometry.mjs';
import foot from './foot.mjs';

export default function leg({ at, length = 6.5, scale = 1, foot: kind = 'splayed', ...footOptions }) {
  if (kind === 'profile') {
    const toe = footOptions.toe ?? 3.5;
    return [draw({ at, scale, flip: FACING }, (p) => p.M(0, 0).V(length).L(toe, length + toe))];
  }

  const tarsus = draw({ at, scale }, (p) => p.M(0, 0).V(length));
  if (kind === false) return [tarsus];

  const ankle = { x: at.x, y: at.y + length * scale };
  return [tarsus, ...foot({ at: ankle, scale, ...footOptions })];
}
