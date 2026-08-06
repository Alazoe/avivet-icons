/**
 * COMPONENTE — COMB
 *
 * Lo que va sobre la cabeza. Cuatro tallas:
 *   single -> cresta simple de 3 lobulos, el central mas alto (gallina)
 *   big    -> cresta de gallo: 4 lobulos, +60 % de altura
 *   pea    -> cresta en guisante, baja (reproductora pesada, lineas rusticas)
 *   tuft   -> plumon del pollito: dos plumas sueltas, no es cresta
 */
import { draw } from '../../../../scripts/geometry.mjs';

const SIZES = {
  single: (p) => p.M(-4.5, 1.5)
    .C(-5, -2.5, -1, -3, -1, 0.5)
    .C(-1, -4, 3, -4, 3, 0)
    .C(3, -2.5, 5, -2, 5, 1.5),

  big: (p) => p.M(-6, 2)
    .C(-6.5, -4, -1.5, -5, -1.5, 0.5)
    .C(-1.5, -6.5, 3, -7, 3, -1)
    .C(3.5, -6, 7, -5.5, 6.5, 0.5)
    .C(6.5, -3, 8, -2.5, 7.5, 2),

  pea: (p) => p.M(-4, 1.5)
    .C(-4, -1, -1, -1.5, -0.5, 0)
    .C(0, -1.5, 3, -1.5, 3.5, 0.5)
    .C(4, -1, 5.5, -0.5, 5.5, 1.5),
};

/** El plumon del pollito son dos figuras, no una. */
const TUFT = [
  (p) => p.M(0, 0).C(-2, -4, 0.5, -6.5, 3, -5),
  (p) => p.M(-5, 1.5).C(-7, -2, -5, -5, -2.5, -4),
];

export default function comb({ at, size = 'single', scale = 1 }) {
  if (size === 'tuft') return TUFT.map((cmds) => draw({ at, scale }, cmds));
  const cmds = SIZES[size];
  if (!cmds) throw new Error(`comb: talla desconocida "${size}"`);
  return [draw({ at, scale }, cmds)];
}

export const sizes = [...Object.keys(SIZES), 'tuft'];
