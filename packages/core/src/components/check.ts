/**
 * COMPONENTE — CHECK
 *
 * Dos segmentos a 90 grados; el brazo largo mide el doble del corto.
 * El ancla es el VERTICE inferior, el punto que se apoya en la linea de base.
 * `size` = longitud del brazo largo.
 */
import { draw } from '../geometry.ts';
import type { Point, Shape } from '../types.ts';

export default function check({ at, size = 24 }: { at: Point; size?: number }): Shape[] {
  const short = size / 2;
  return [draw({ at }, (p) => p.M(-short, -short).L(0, 0).L(size, -size))];
}
