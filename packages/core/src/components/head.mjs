/**
 * COMPONENTE DE CONTORNO — HEAD
 *
 * Tramo del contorno: nuca -> craneo -> base del pico -> garganta.
 * No es un dibujo independiente: es el primer tercio del unico <path> cerrado
 * que forma el ave (ICON_SPEC.md §6.1). Coordenadas relativas al centro del ave.
 *
 * Proporcion cabeza/cuerpo: adulto 1:3 · pollito 1:1.6.
 */

const VARIANTS = {
  adult: {
    start: [12, -20],
    segments: [
      [16, -20, 18, -17, 18, -14],   // craneo -> base del pico
      [18, -11, 15, -9, 14, -6],     // base del pico -> garganta
    ],
    anchors: {
      crown: { x: 12, y: -20 },
      beak: { x: 18, y: -14 },
      eye: { x: 13.5, y: -15.5 },
    },
  },
  // El gallo lleva la cabeza mas alta y erguida, y el craneo algo mayor: es lo
  // que distingue al macho antes que la cresta.
  rooster: {
    start: [10, -19],
    segments: [
      [14, -19, 16, -16, 16, -13],
      [16, -10, 14, -8, 13, -5],
    ],
    anchors: {
      crown: { x: 10, y: -19 },
      beak: { x: 16, y: -13 },
      eye: { x: 11.5, y: -14.5 },
    },
  },
  chick: {
    start: [3, -22],
    segments: [
      [9, -22, 14, -18, 14, -12],
      [14, -8, 13, -5, 11, -3],
    ],
    anchors: {
      crown: { x: 2, y: -22 },
      beak: { x: 14, y: -12 },
      eye: { x: 8, y: -13 },
    },
  },
};

export default function head({ variant = 'adult' } = {}) {
  const v = VARIANTS[variant];
  if (!v) throw new Error(`head: variante desconocida "${variant}"`);
  return {
    anchors: v.anchors,
    draw: (p) => {
      p.M(...v.start);
      v.segments.forEach((c) => p.C(...c));
      return p;
    },
  };
}

export const variants = Object.keys(VARIANTS);
