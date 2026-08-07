import type { BirdVariant, ContourPart, CubicSegment } from '../types.ts';
/**
 * COMPONENTE DE CONTORNO — NECK
 *
 * Tramo final: dorso -> nuca. Cierra contra el punto inicial de HEAD.
 * Es lo que evita la cabeza "pegada" con circulos superpuestos (ICON_SPEC.md §6.1).
 */

const VARIANTS: Record<string, { segments: CubicSegment[] }> = {
  // Dos tramos: linea dorsal (base de cola -> cruz) y dorso del cuello
  // (cruz -> nuca). Con uno solo la cabeza se apoya en los hombros y el ave
  // pierde el cuello.
  adult: {
    segments: [
      [-16, -4, -9, -7, -3, -6], // base de cola -> linea dorsal -> cruz
      [1, -7, 4, -12, 8, -16], // cruz -> dorso del cuello -> nuca
    ],
  },
  rooster: { segments: [[5, -10, 5, -15, 8, -19]] },
  chick: { segments: [[-7, -18, -3, -22, 3, -22]] },
};

export default function neck({ variant = 'adult' }: { variant?: BirdVariant } = {}): ContourPart {
  const v = VARIANTS[variant];
  if (!v) throw new Error(`neck: variante desconocida "${variant}"`);
  return {
    anchors: {},
    draw: (p) => {
      v.segments.forEach((c) => p.C(...c));
      return p.Z();
    },
  };
}

export const variants = Object.keys(VARIANTS);
