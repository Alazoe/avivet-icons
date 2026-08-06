/**
 * COMPONENTE — WATTLE (barbilla)
 *
 * Lobulo colgante bajo el pico. Se OMITE cuando quedaria a menos de
 * tokens.stroke.minGap del trazo del cuello: por eso `hen` no la lleva y el
 * gallo, que tiene el cuello mas largo, si (ICON_SPEC.md §5, §6).
 *
 * `fits` deja esa decision explicita en la receta en vez de escondida.
 */
import tokens from '../../../../scripts/tokens.mjs';
import { draw, FACING } from '../../../../scripts/geometry.mjs';

/** ¿Cabe la barbilla sin invadir el cuello? `gap` = distancia libre medida. */
export const fits = (gap) => gap >= tokens.stroke.minGap;

export default function wattle({ at, scale = 1 }) {
  // Una sola curva mas la linea de cierre: el borde interno de la barbilla es
  // recto contra el cuello, asi que gastar una segunda curva en el no aporta.
  return [draw({ at, scale, flip: FACING }, (p) => p.M(0, 2.5)
    .C(3.5, 5, 3.5, 9.5, 0.5, 10)
    .Z())];
}
