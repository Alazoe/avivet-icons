/**
 * COMPONENTE — FOOT
 *
 * Tres dedos: dos a +-spread y uno recto. Un solo trazo quebrado; aqui la
 * quiebra es intencional y anatomica (ICON_SPEC.md §6.6).
 */
import { draw } from '../../../../scripts/geometry.mjs';

export default function foot({ at, spread = 3.5, drop = 3.5, center = 4, scale = 1 }) {
  return [
    draw({ at, scale }, (p) => p.M(-spread, drop).L(0, 0).L(spread, drop)),
    draw({ at, scale }, (p) => p.M(0, 0).L(0, center)),
  ];
}
