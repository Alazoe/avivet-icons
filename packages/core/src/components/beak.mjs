/**
 * COMPONENTE — BEAK
 *
 * Triangulo cerrado de 6.5 x 5, apoyado sobre el contorno de la cabeza.
 * Adulto scale 1 · pollito scale .85. La geometria se escribe mirando a la derecha; tokens.anatomy.facing la refleja.
 */
import { draw, FACING } from '../../../../scripts/geometry.mjs';

export default function beak({ at, scale = 1 }) {
  return [draw({ at, scale, flip: FACING }, (p) => p.M(0, -2.5).L(6.5, 0).L(0, 2.5).Z())];
}
