/**
 * COMPONENTE DE CONTORNO — NECK
 *
 * Tramo final: dorso -> nuca. Cierra contra el punto inicial de HEAD.
 * Es lo que evita la cabeza "pegada" con circulos superpuestos (ICON_SPEC.md §6.1).
 */

const VARIANTS = {
  // En el adulto este tramo es la linea dorsal completa: de la base de la cola
  // al dorso y de ahi a la nuca, en una sola curva. Es la linea que da el porte
  // tranquilo de la ponedora; si se quiebra, el ave se ve alerta.
  // Dos tramos: la linea dorsal (base de cola -> cruz) y el dorso del cuello
  // (cruz -> nuca). Separarlos es lo que hace que la gallina tenga CUELLO: con
  // una sola curva la cabeza se apoya en los hombros y el ave parece un pato.
  // Linea dorsal y cuello en una sola curva. El cuello de una Hy-Line Brown es
  // CORTO: si se le da tramo propio, el ave se estira y parece un ganso.
  adult: { segments: [[-8, -2, 0, -5, 6, -12]] },
  rooster: { segments: [[5, -10, 5, -15, 8, -19]] },
  chick: { segments: [[-7, -18, -3, -22, 3, -22]] },
};

export default function neck({ variant = 'adult' } = {}) {
  const v = VARIANTS[variant];
  if (!v) throw new Error(`neck: variante desconocida "${variant}"`);
  return {
    anchors: {},
    draw: (p) => { v.segments.forEach((c) => p.C(...c)); return p.Z(); },
  };
}

export const variants = Object.keys(VARIANTS);
