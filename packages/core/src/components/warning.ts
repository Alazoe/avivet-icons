/**
 * COMPONENTE — WARNING
 *
 * Circulo keyline + asta + punto solido. El punto usa el mismo radio que el
 * ojo: en esta biblioteca "punto solido" es una sola cosa.
 */
import tokens from '../tokens.ts';
import { circleShape, draw, CENTER } from '../geometry.ts';
import circle from './circle.ts';
import type { Point, Shape } from '../types.ts';

export default function warning({ at = CENTER }: { at?: Point } = {}): Shape[] {
  return [
    ...circle({ at }),
    draw({ at }, (p) => p.M(0, -13).V(3)),
    circleShape({ at: { x: at.x, y: at.y + 11 }, r: tokens.eye.radius, solid: true }),
  ];
}
