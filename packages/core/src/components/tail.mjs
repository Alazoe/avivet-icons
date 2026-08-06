/**
 * COMPONENTE — TAIL
 *
 * Abanico de plumas, una curva por pluma. Cada pluma es un unico trazo abierto:
 * las plumas cerradas se leen como hojas pegadas al cuerpo.
 *
 *   hen     -> tres plumas, cola erguida y corta (Hy-Line Brown)
 *   chick   -> una pluma minima
 *   rooster -> dos hoces largas
 */
import { draw, FACING } from '../../../../scripts/geometry.mjs';

const VARIANTS = {
  // Plumas cortas y poco abiertas: mas largas o mas separadas se leen como
  // rayos de sol saliendo del cuerpo, no como cola.
  hen: [
    (p) => p.M(0, 0).C(-2.5, -2, -5.5, -4.5, -7.5, -8.5),
    (p) => p.M(0, 1.5).C(-2.5, 0, -5.5, -1.5, -8, -4.5),
    (p) => p.M(0, 3).C(-2.5, 2, -5.5, 1.5, -8, -0.5),
  ],
  chick: [
    (p) => p.M(0, 0).C(-3.5, -1.5, -5.5, -4, -6, -7.5),
  ],
  rooster: [
    (p) => p.M(0, 0).C(-5, -3, -9, -8, -11, -14),
    (p) => p.M(-1.5, 2).C(-7, 0, -11, -4, -13, -9),
  ],
};

export default function tail({ at, variant = 'hen', scale = 1 }) {
  const feathers = VARIANTS[variant];
  if (!feathers) throw new Error(`tail: variante desconocida "${variant}"`);
  return feathers.map((cmds) => draw({ at, scale, flip: FACING }, cmds));
}

export const variants = Object.keys(VARIANTS);
