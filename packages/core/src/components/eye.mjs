/**
 * COMPONENTE — EYE
 *
 * La UNICA forma rellena de toda la biblioteca (ICON_SPEC.md §6.5).
 * No es un capricho: a 16 px un ojo con contorno se convierte en una mancha.
 * El radio sale de tokens.eye.radius, nunca se escribe a mano.
 */
import tokens from '../../../../scripts/tokens.mjs';
import { circleShape } from '../../../../scripts/geometry.mjs';

export default function eye({ at, scale = 1 }) {
  return [circleShape({ at, r: tokens.eye.radius * scale, solid: true })];
}
