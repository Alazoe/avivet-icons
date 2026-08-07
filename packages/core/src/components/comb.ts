/**
 * COMPONENTE — COMB
 *
 * Lo que va sobre la cabeza. Cuatro tallas:
 *   single -> cresta simple de 3 lobulos, el central mas alto (gallina)
 *   big    -> cresta de gallo: 3 lobulos, +80 % de altura
 *   pea    -> cresta en guisante, baja (reproductora pesada, lineas rusticas)
 *   tuft   -> plumon del pollito: dos plumas sueltas, no es cresta
 */
import { draw, FACING } from '../geometry.ts';
import type { CombSize, PieceOptions, Shape, PenCommands } from '../types.ts';

const SIZES: Record<string, PenCommands> = {
  single: (p) =>
    p
      .M(-6, 1.5)
      .C(-6, -4, -2, -4.5, -2, 0)
      .C(-2, -5.5, 2.5, -6, 2.5, -1)
      .C(2.5, -5, 6, -4, 5.5, 1.5),

  big: (p) =>
    p
      .M(-6, 2)
      .C(-6.5, -5, -1, -6, -1, 0)
      .C(-1, -8, 4.5, -8.5, 4.5, -0.5)
      .C(5, -5.5, 8, -4.5, 7.5, 2),

  pea: (p) =>
    p
      .M(-4, 1.5)
      .C(-4, -1, -1, -1.5, -0.5, 0)
      .C(0, -1.5, 3, -1.5, 3.5, 0.5)
      .C(4, -1, 5.5, -0.5, 5.5, 1.5),
};

/** El plumon del pollito: una sola pluma. Dos se funden a 16 px. */
const TUFT: PenCommands[] = [(p) => p.M(0, 0).C(-2.5, -4.5, 0.5, -7, 3.5, -5.5)];

export default function comb({
  at,
  size = 'single',
  scale = 1,
}: PieceOptions & { size?: CombSize }): Shape[] {
  if (size === 'tuft') return TUFT.map((cmds) => draw({ at, scale, flip: FACING }, cmds));
  const cmds = SIZES[size];
  if (!cmds) throw new Error(`comb: talla desconocida "${size}"`);
  return [draw({ at, scale, flip: FACING }, cmds)];
}

export const sizes = [...Object.keys(SIZES), 'tuft'];
