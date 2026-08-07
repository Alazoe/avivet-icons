/**
 * COMPONENTE — FOOT
 *
 * Patas minimalistas: dos dedos por defecto. El tercer dedo central se pierde
 * a 16 px y solo suma trazo, asi que es opcional (`toes: 3`) y se reserva para
 * lienzos grandes. Un solo trazo quebrado; aqui la quiebra es intencional y
 * anatomica (ICON_SPEC.md §6.6).
 */
import { draw } from '../geometry.ts';
import type { FootOptions, Shape } from '../types.ts';

export default function foot({
  at,
  spread = 3.5,
  drop = 3.5,
  center = 4,
  toes = 2,
  scale = 1,
}: FootOptions): Shape[] {
  const shapes = [draw({ at, scale }, (p) => p.M(-spread, drop).L(0, 0).L(spread, drop))];
  if (toes === 3) shapes.push(draw({ at, scale }, (p) => p.M(0, 0).L(0, center)));
  return shapes;
}
