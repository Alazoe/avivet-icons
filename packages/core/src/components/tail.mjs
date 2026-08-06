/**
 * COMPONENTE — TAIL
 *
 * Pluma abierta con nervadura.
 *   hen     -> corta y erguida
 *   chick   -> minima, sin nervadura
 *   rooster -> tres hoces largas
 */
import { draw } from '../../../../scripts/geometry.mjs';

const VARIANTS = {
  hen: [
    (p) => p.M(0, 0).C(-6, -2, -9.5, -6, -9.5, -11).C(-6, -8.5, -1.5, -5.5, 2, -1),
    (p) => p.M(-6, -6.5).C(-4, -5, -2, -3, -0.5, -1),
  ],
  chick: [
    (p) => p.M(0, 0).C(-4.5, -2, -6.5, -5.5, -6.5, -9).C(-3.5, -6.5, -1.5, -4, 0.5, -2.2),
  ],
  rooster: [
    (p) => p.M(0, 0).C(-7, -3, -12, -9, -12.5, -17).C(-8, -13, -2.5, -7, 1, -2),
    (p) => p.M(-1, 2).C(-8, 0, -14, -5, -15.5, -12).C(-10.5, -9.5, -5, -4.5, -1.5, -0.5),
    (p) => p.M(-7, -8).C(-5, -6, -3, -3.5, -1.5, -1.5),
  ],
};

export default function tail({ at, variant = 'hen', scale = 1 }) {
  const feathers = VARIANTS[variant];
  if (!feathers) throw new Error(`tail: variante desconocida "${variant}"`);
  return feathers.map((cmds) => draw({ at, scale }, cmds));
}

export const variants = Object.keys(VARIANTS);
