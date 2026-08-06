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
import { pen, place, CENTER } from '../../../../scripts/geometry.mjs';
import head from './head.mjs';
import body from './body.mjs';
import neck from './neck.mjs';

export default function silhouette({ variant = 'adult', at = CENTER, scale = 1 } = {}) {
  const parts = [head({ variant }), body({ variant }), neck({ variant })];
  const p = pen({ at, scale });
  parts.forEach((part) => part.draw(p));

  const anchors = parts.reduce((acc, part) => Object.assign(acc, part.anchors), {});

  return {
    variant,
    shapes: [p.shape()],
    anchors: place(at, anchors, scale),
  };
}
