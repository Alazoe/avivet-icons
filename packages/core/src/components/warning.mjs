/**
 * COMPONENTE — WARNING
 *
 * Circulo keyline + asta + punto solido. El punto usa el mismo radio que el
 * ojo: en esta biblioteca "punto solido" es una sola cosa.
 */
import tokens from '../../../../scripts/tokens.mjs';
import { circleShape, draw, CENTER } from '../../../../scripts/geometry.mjs';
import circle from './circle.mjs';

export default function warning({ at = CENTER } = {}) {
  return [
    ...circle({ at }),
    draw({ at }, (p) => p.M(0, -13).V(3)),
    circleShape({ at: { x: at.x, y: at.y + 11 }, r: tokens.eye.radius, solid: true }),
  ];
}
