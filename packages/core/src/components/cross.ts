/**
 * COMPONENTE — CROSS
 *
 * rotate 0  -> cruz sanitaria (medicamento, vacuna, botiquin)
 * rotate 45 -> aspa de descarte / prohibicion
 * El ancla es el centro.
 */
import { draw } from '../geometry.ts';
import type { Point, Shape } from '../types.ts';

export default function cross({
  at,
  size = 8,
  rotate = 0,
}: {
  at: Point;
  size?: number;
  rotate?: 0 | 45;
}): Shape[] {
  const half = size / 2;
  if (rotate === 0) {
    return [draw({ at }, (p) => p.M(0, -half).V(half).M(-half, 0).H(half))];
  }
  if (rotate === 45) {
    const d = half * Math.SQRT1_2;
    return [draw({ at }, (p) => p.M(-d, -d).L(d, d).M(d, -d).L(-d, d))];
  }
  throw new Error(`cross: solo se admite rotate 0 o 45 (recibido ${rotate})`);
}
