/**
 * COMPONENTE — WING
 *
 * Arcos ABIERTOS. Nunca una hoja cerrada: una forma cerrada dentro del cuerpo
 * se lee como un segundo ojo (ICON_SPEC.md §6, tabla de errores conocidos).
 *
 * En el pollito el ala va retrasada: un arco bajo la cara se lee como una boca.
 * Los dos arcos van separados tokens.stroke.minGap.
 */
import { draw, FACING } from '../geometry.ts';
import type { PieceOptions, Shape, WingVariant, PenCommands } from '../types.ts';

const VARIANTS: Record<string, PenCommands[]> = {
  // Hoja cerrada con UNA nervadura: dos no caben respetando stroke.minGap
  // dentro de un ala de 11 px de alto.
  leaf: [
    (p) => p.M(0, 0).C(4, -8, 12, -12, 19, -10).C(18, -3, 9, 1, 0, 0).Z(),
    (p) => p.M(3.5, 0.5).C(8, -5, 13, -7.5, 18, -6),
  ],

  // Un solo arco: el ala plegada de un ave en reposo. Es la variante por
  // defecto de los adultos porque a 16 px el segundo arco se funde con el primero.
  simple: [(p) => p.M(0, 0).C(3, -6, 11, -8, 18, -4)],
  adult: [(p) => p.M(0, 0).C(3, -6, 11, -8, 18, -4), (p) => p.M(2.5, 4).C(5.5, -1, 11, -3, 16, -1)],
  chick: [
    (p) => p.M(0, 0).C(2.5, -4, 7, -5, 11, -3),
    (p) => p.M(1.5, 4).C(4, 0.5, 7.5, -0.5, 10.5, 1),
  ],
};

export default function wing({
  at,
  variant = 'adult',
  scale = 1,
}: PieceOptions & { variant?: WingVariant }): Shape[] {
  const arcs = VARIANTS[variant];
  if (!arcs) throw new Error(`wing: variante desconocida "${variant}"`);
  return arcs.map((cmds) => draw({ at, scale, flip: FACING }, cmds));
}

export const variants = Object.keys(VARIANTS);
