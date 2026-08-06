/**
 * COMPONENTE DE CONTORNO — NECK
 *
 * Tramo final: dorso -> nuca. Cierra contra el punto inicial de HEAD.
 * Es lo que evita la cabeza "pegada" con circulos superpuestos (ICON_SPEC.md §6.1).
 */

const VARIANTS = {
  adult: { segments: [[6, -12, 6, -17, 10, -20]] },
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
