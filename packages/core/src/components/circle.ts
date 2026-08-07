/**
 * COMPONENTE — CIRCLE
 *
 * Radio por defecto: el keyline circular de los tokens. Las formas circulares
 * se dibujan algo mayores que las cuadradas por compensacion optica: eso vive
 * en tokens.keyline, no en el criterio de quien dibuja.
 */
import tokens from '../tokens.ts';
import { circleShape, CENTER } from '../geometry.ts';
import type { Point, Shape } from '../types.ts';

export default function circle({
  at = CENTER,
  r = tokens.keyline.circle / 2,
}: { at?: Point; r?: number } = {}): Shape[] {
  return [circleShape({ at, r })];
}
