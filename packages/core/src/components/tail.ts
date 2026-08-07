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
import { draw, FACING } from '../geometry.ts';
import type { PieceOptions, Shape, TailVariant, PenCommands } from '../types.ts';

const VARIANTS: Record<string, PenCommands[]> = {
  // Plumas CERRADAS y afiladas, no tres rayas: es lo que les da volumen.
  hen: [
    (p) => p.M(1, -4).C(-4, -8, -8, -15, -9, -22).C(-6, -17, -2, -11, 2, -7).Z(),
    (p) => p.M(-0.5, 0).C(-6, -2, -9.5, -8, -10.5, -15).C(-7.5, -11, -3.5, -6, 1, -3).Z(),
    (p) => p.M(-1, 4).C(-6.5, 3, -10.5, -1, -12, -6).C(-8.5, -4, -4, -1, 0, 1.5).Z(),
  ],
  chick: [(p) => p.M(0, 0).C(-3.5, -1.5, -5.5, -4, -6, -7.5)],
  rooster: [
    (p) => p.M(0, 0).C(-5, -3, -9, -8, -11, -14),
    (p) => p.M(-1.5, 2).C(-7, 0, -11, -4, -13, -9),
  ],
};

export default function tail({
  at,
  variant = 'hen',
  scale = 1,
}: PieceOptions & { variant?: TailVariant }): Shape[] {
  const feathers = VARIANTS[variant];
  if (!feathers) throw new Error(`tail: variante desconocida "${variant}"`);
  return feathers.map((cmds) => draw({ at, scale, flip: FACING }, cmds));
}

export const variants = Object.keys(VARIANTS);
