/**
 * COMPONENTE — CHECK
 *
 * Dos segmentos a 90 grados; el brazo largo mide el doble del corto.
 * El ancla es el VERTICE inferior, el punto que se apoya en la linea de base.
 * `size` = longitud del brazo largo.
 */
import { draw } from '../../../../scripts/geometry.mjs';

export default function check({ at, size = 24 }) {
  const short = size / 2;
  return [draw({ at }, (p) => p.M(-short, -short).L(0, 0).L(size, -size))];
}
