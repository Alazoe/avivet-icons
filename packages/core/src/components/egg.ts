/**
 * COMPONENTE — EGG
 *
 * Ovoide aviar: NO es una elipse ni una gota. Es asimetrico en su eje polar —
 * polo agudo arriba, polo romo abajo — que es como se apoya en la bandeja y
 * como se reconoce un huevo de verdad. Simetrico en el eje transversal, igual
 * que el huevo real.
 *
 * Ascendido a componente por la regla de las dos apariciones (ICON_SPEC.md
 * §4.6): lo usan `egg` y `nest`.
 *
 * El ancla es el POLO AGUDO, no el centro.
 */
import { draw } from '../geometry.ts';
import type { Point, Shape, PenCommands } from '../types.ts';

/** Geometria unitaria: huevo de 48 de alto x 36 de ancho (relacion 4:3). */
const UNIT = 48;
const SHAPE: PenCommands = (p) =>
  p
    .M(0, 0)
    .C(10, 0, 18, 14, 18, 28)
    .C(18, 40, 10, 48, 0, 48)
    .C(-10, 48, -18, 40, -18, 28)
    .C(-18, 14, -10, 0, 0, 0)
    .Z();

export default function egg({ at, height = UNIT }: { at: Point; height?: number }): Shape[] {
  return [draw({ at, scale: height / UNIT }, SHAPE)];
}

/** Ancho resultante para una altura dada. Sirve para separar huevos sin adivinar. */
export const widthOf = (height: number): number => (36 * height) / UNIT;
