/**
 * COMPONENTE — ARROW
 *
 * Asta recta + punta de dos segmentos a 45 grados. Se define por sus extremos,
 * no por una direccion: asi sirve igual para flujo, entrada, salida y retorno.
 */
import { draw } from '../../../../scripts/geometry.mjs';

export default function arrow({ from, to, head = 9 }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // Perpendicular unitaria, para abrir la punta a 45 grados.
  const px = -uy;
  const py = ux;
  const back = head * Math.SQRT1_2;

  const tip = { x: to.x, y: to.y };
  const wing = (sign) => ({
    x: tip.x - ux * back + px * back * sign,
    y: tip.y - uy * back + py * back * sign,
  });
  const a = wing(1);
  const b = wing(-1);

  return [
    draw({ at: from }, (p) => p.M(0, 0).L(dx, dy)),
    draw({ at: tip }, (p) => p
      .M(a.x - tip.x, a.y - tip.y)
      .L(0, 0)
      .L(b.x - tip.x, b.y - tip.y)),
  ];
}
