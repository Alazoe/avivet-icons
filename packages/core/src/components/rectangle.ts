/**
 * COMPONENTE — RECTANGLE
 *
 * Rectangulo de esquinas redondeadas dibujado con curvas, no con <rect>: asi
 * el sprite, el CSS y los componentes de framework manejan un unico tipo de
 * figura. El ancla es la esquina superior izquierda.
 */
import tokens from '../tokens.ts';
import { draw } from '../geometry.ts';
import type { Point, Shape } from '../types.ts';

export default function rectangle({
  at,
  width,
  height,
  radius = tokens.canvas.padding / 2,
}: {
  at: Point;
  width: number;
  height: number;
  radius?: number;
}): Shape[] {
  const r = Math.min(radius, width / 2, height / 2);
  // Sin radio: cuatro rectas. El linejoin round ya redondea las esquinas, asi
  // que una tapa o una caja no necesitan gastar cuatro curvas en ello.
  if (r === 0) {
    return [draw({ at }, (p) => p.M(0, 0).H(width).V(height).H(0).Z())];
  }
  return [
    draw({ at }, (p) =>
      p
        .M(r, 0)
        .H(width - r)
        .C(width - r * 0.45, 0, width, r * 0.45, width, r)
        .V(height - r)
        .C(width, height - r * 0.45, width - r * 0.45, height, width - r, height)
        .H(r)
        .C(r * 0.45, height, 0, height - r * 0.45, 0, height - r)
        .V(r)
        .C(0, r * 0.45, r * 0.45, 0, r, 0)
        .Z(),
    ),
  ];
}
