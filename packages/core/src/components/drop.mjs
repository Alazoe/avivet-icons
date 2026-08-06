/**
 * COMPONENTE — DROP
 *
 * Punta arriba, base circular. Relacion alto:ancho = 3:2 a cualquier tamano,
 * de modo que la gota grande (water-drop) y la del nipple son la misma forma.
 * El ancla es la PUNTA, no el centro: una gota se coloca por donde cae.
 */
import { draw } from '../../../../scripts/geometry.mjs';

/** Geometria unitaria: gota de 48 de alto. Todo lo demas es escala. */
const UNIT = 48;
const SHAPE = (p) => p
  .M(0, 0)
  .C(8, 10, 16, 21, 16, 32)
  .C(16, 40.8, 8.8, 48, 0, 48)
  .C(-8.8, 48, -16, 40.8, -16, 32)
  .C(-16, 21, -8, 10, 0, 0)
  .Z();

export default function drop({ at, height = UNIT }) {
  return [draw({ at, scale: height / UNIT }, SHAPE)];
}
