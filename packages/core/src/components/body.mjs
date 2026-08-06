/**
 * COMPONENTE DE CONTORNO — BODY
 *
 * Tramo del contorno: pecho -> vientre -> dorso -> base de cola.
 * Cuatro curvas Bezier, nunca rectas (ICON_SPEC.md §6.6).
 * Continua exactamente donde termina HEAD.
 */

const VARIANTS = {
  adult: {
    segments: [
      [16, -3, 17, 1, 16, 5],        // pecho
      [15, 11, 9, 15, 2, 15],        // vientre
      [-6, 15, -13, 12, -16, 7],     // vientre -> flanco
      [-18, 4, -18, 0, -16, -3],     // flanco -> base de cola
      [-11, -8, -2, -10, 4, -9],     // dorso
    ],
    anchors: {
      wing: { x: -10, y: 2 },
      tail: { x: -13.5, y: -5 },
      legs: [{ x: -2.5, y: 14.5 }, { x: 6, y: 14.5 }],
    },
  },
  // Pecho mas profundo y dorso mas largo que la gallina: el gallo ocupa mas
  // lienzo hacia abajo, no hacia arriba (la cresta grande necesita el margen).
  rooster: {
    segments: [
      [15, -1, 16, 4, 15, 9],
      [14, 15, 8, 18, 1, 18],
      [-6, 18, -12, 15, -15, 10],
      [-17, 7, -17, 3, -15, 0],
      [-10, -4, -3, -7, 3, -6],
    ],
    anchors: {
      wing: { x: -9, y: 5 },
      tail: { x: -13, y: -1 },
      legs: [{ x: -2, y: 17.5 }, { x: 6, y: 17.5 }],
    },
  },
  chick: {
    segments: [
      [14, 0, 15, 5, 13, 9],
      [10, 15, 4, 18, -2, 18],
      [-10, 18, -16, 13, -17, 6],
      [-18, -1, -15, -8, -10, -12],
    ],
    anchors: {
      wing: { x: -12, y: 6 },
      tail: { x: -17, y: 4 },
      legs: [{ x: -4.5, y: 17.5 }, { x: 2, y: 17.5 }],
    },
  },
};

export default function body({ variant = 'adult' } = {}) {
  const v = VARIANTS[variant];
  if (!v) throw new Error(`body: variante desconocida "${variant}"`);
  return {
    anchors: v.anchors,
    draw: (p) => { v.segments.forEach((c) => p.C(...c)); return p; },
  };
}

export const variants = Object.keys(VARIANTS);
