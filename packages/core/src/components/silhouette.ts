/**
 * COMPONENTE COMPUESTO — SILHOUETTE
 *
 * Encadena HEAD + BODY + NECK en un unico <path> cerrado y publica las anclas
 * en coordenadas absolutas de lienzo. Es el punto de entrada de toda ave.
 *
 *   const bird = silhouette({ variant: 'adult' });
 *   bird.shapes   -> [ { tag:'path', d:'M44 12C…Z' } ]
 *   bird.anchors  -> { crown, beak, eye, wing, tail, legs:[…] }
 */
import { pen, place, CENTER, FACING } from '../geometry.ts';
import head from './head.ts';
import body from './body.ts';
import neck from './neck.ts';
import type { BirdVariant, Point, Silhouette as SilhouetteResult } from '../types.ts';

export default function silhouette({
  variant = 'adult',
  at = CENTER,
  scale = 1,
}: { variant?: BirdVariant; at?: Point; scale?: number } = {}): SilhouetteResult {
  const parts = [head({ variant }), body({ variant }), neck({ variant })];
  const p = pen({ at, scale, flip: FACING });
  parts.forEach((part) => part.draw(p));

  const anchors = parts.reduce((acc, part) => Object.assign(acc, part.anchors), {});

  return {
    variant,
    shapes: [p.shape()],
    anchors: place(at, anchors, scale, FACING),
  };
}
