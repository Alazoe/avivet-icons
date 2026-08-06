/**
 * COMPONENTE — LEG
 *
 * Tarso vertical desde el vientre. Compone FOOT en el tobillo: un componente
 * puede usar otros componentes (ICON_SPEC.md §4.5).
 * Adulto: tarso 6.5 · pollito: 4.5.
 */
import { draw } from '../../../../scripts/geometry.mjs';
import foot from './foot.mjs';

export default function leg({ at, length = 6.5, scale = 1, foot: withFoot = true, ...footOptions }) {
  const tarsus = draw({ at, scale }, (p) => p.M(0, 0).V(length));
  if (!withFoot) return [tarsus];

  const ankle = { x: at.x, y: at.y + length * scale };
  return [tarsus, ...foot({ at: ankle, scale, ...footOptions })];
}
