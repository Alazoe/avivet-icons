/**
 * COMPONENTE — CIRCLE
 *
 * Radio por defecto: el keyline circular de los tokens. Las formas circulares
 * se dibujan algo mayores que las cuadradas por compensacion optica: eso vive
 * en tokens.keyline, no en el criterio de quien dibuja.
 */
import tokens from '../../../../scripts/tokens.mjs';
import { circleShape, CENTER } from '../../../../scripts/geometry.mjs';

export default function circle({ at = CENTER, r = tokens.keyline.circle / 2 } = {}) {
  return [circleShape({ at, r })];
}
