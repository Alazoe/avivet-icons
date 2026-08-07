import type { BirdVariant, ContourPart, Anchors, CubicSegment } from '../types.ts';
/**
 * COMPONENTE DE CONTORNO — HEAD
 *
 * Tramo del contorno: nuca -> craneo -> pico -> garganta.
 * No es un dibujo independiente: es el primer tramo del unico <path> cerrado
 * que forma el ave (ICON_SPEC.md §6.1). Coordenadas relativas al centro del ave.
 *
 * El pico NO va aqui: se probo integrarlo como vertice del contorno para
 * ahorrar dos segmentos y salio una cuna del tamano de la cara. Con una sola
 * curva no se puede redondear el craneo Y rematar en punta corta. El pico es
 * pieza aparte (BEAK) y se apoya sobre este contorno.
 *
 * Proporcion cabeza/cuerpo: adulto 1:3 · pollito 1:1.6.
 */

const VARIANTS: Record<
  string,
  { start: [number, number]; segments: CubicSegment[]; anchors: Partial<Anchors> }
> = {
  // Hy-Line Brown: craneo redondeado, cabeza proporcionada, sin exagerar.
  adult: {
    start: [6, -12],
    segments: [
      [8, -20, 18, -20, 20, -13], // nuca -> craneo CONVEXO -> cara
      [20, -9, 16, -8, 11, -8], // cara -> mejilla -> garganta
    ],
    anchors: {
      crown: { x: 13, y: -19 },
      beak: { x: 19.5, y: -13 },
      eye: { x: 15, y: -14.5 },
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

export default function head({ variant = 'adult' }: { variant?: BirdVariant } = {}): ContourPart {
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
