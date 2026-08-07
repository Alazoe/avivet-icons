/**
 * El lapiz y el modelo de figura. Ver ICON_SPEC.md §4.2–4.4.
 *
 * Los componentes NO escriben cadenas de trayectoria: dibujan con `pen`, en
 * coordenadas relativas a su ancla. El lapiz traslada, escala, redondea a
 * `tokens.precision` y registra los puntos para que los tests puedan comprobar
 * el area viva sin volver a parsear el SVG.
 */
import tokens from './tokens.ts';
import type { Anchors, PathShape, Pen, PenOptions, Point, Shape } from './types.ts';

const { precision } = tokens;

export const round = (n: number): number => Number(n.toFixed(precision));

/** Centro del lienzo: origen por defecto de la geometria de un ave. */
export const CENTER: Readonly<Point> = Object.freeze({
  x: tokens.canvas.size / 2,
  y: tokens.canvas.size / 2,
});

/**
 * Signo horizontal de la anatomia aviar. La geometria de las aves se escribe
 * UNA vez mirando a la derecha; este factor la refleja segun el token. Las
 * formas genericas (gota, reloj, balde) no lo usan: no tienen lateralidad.
 */
export const FACING: number = tokens.anatomy.facing === 'left' ? -1 : 1;

/**
 * pen({ at, scale, flip }) — lapiz de trayectorias.
 * Comandos absolutos respecto del ancla: M, L, H, V, C, Q, Z.
 * `flip: FACING` refleja la pieza en horizontal sin reescribir sus numeros.
 */
export function pen({ at = { x: 0, y: 0 }, scale = 1, flip = 1 }: PenOptions = {}): Pen {
  let d = '';
  let cursor: Point = { x: 0, y: 0 };
  const onCurve: Point[] = [];
  const control: Point[] = [];

  const X = (x: number) => round(at.x + x * scale * flip);
  const Y = (y: number) => round(at.y + y * scale);
  const on = (x: number, y: number): Point => {
    cursor = { x, y };
    const p = { x: X(x), y: Y(y) };
    onCurve.push(p);
    return p;
  };
  const ctl = (x: number, y: number): Point => {
    const p = { x: X(x), y: Y(y) };
    control.push(p);
    return p;
  };

  const api: Pen = {
    M(x, y) {
      const p = on(x, y);
      d += `M${p.x} ${p.y}`;
      return api;
    },
    L(x, y) {
      const p = on(x, y);
      d += `L${p.x} ${p.y}`;
      return api;
    },
    H(x) {
      return api.L(x, cursor.y);
    },
    V(y) {
      return api.L(cursor.x, y);
    },
    C(x1, y1, x2, y2, x, y) {
      const a = ctl(x1, y1);
      const b = ctl(x2, y2);
      const p = on(x, y);
      d += `C${a.x} ${a.y} ${b.x} ${b.y} ${p.x} ${p.y}`;
      return api;
    },
    Q(x1, y1, x, y) {
      const a = ctl(x1, y1);
      const p = on(x, y);
      d += `Q${a.x} ${a.y} ${p.x} ${p.y}`;
      return api;
    },
    Z() {
      d += 'Z';
      return api;
    },
    /** Continua la trayectoria con otro tramo de contorno. Ver §4.5. */
    add(segment) {
      segment(api);
      return api;
    },
    d() {
      return d;
    },
    shape(): PathShape {
      return { tag: 'path', d, onCurve, control };
    },
  };
  return api;
}

/** Atajo: dibuja y devuelve una unica figura de trayectoria. */
export const draw = (opts: PenOptions, commands: (p: Pen) => unknown): PathShape => {
  const p = pen(opts);
  commands(p);
  return p.shape();
};

/** Circulo. `solid: true` lo marca como la unica forma rellena (el ojo). */
export const circleShape = ({
  at,
  r,
  solid = false,
}: {
  at: Point;
  r: number;
  solid?: boolean;
}): Shape => ({
  tag: 'circle',
  cx: round(at.x),
  cy: round(at.y),
  r: round(r),
  solid,
  onCurve: [
    { x: round(at.x - r), y: round(at.y - r) },
    { x: round(at.x + r), y: round(at.y + r) },
  ],
  control: [],
});

type RelativeAnchors = Record<string, Point | Point[]>;

/** Convierte anclas relativas al origen en anclas absolutas de lienzo. */
export const place = (origin: Point, anchors: RelativeAnchors, scale = 1, flip = 1): Anchors => {
  const one = (a: Point): Point => ({
    x: round(origin.x + a.x * scale * flip),
    y: round(origin.y + a.y * scale),
  });
  return Object.fromEntries(
    Object.entries(anchors).map(([k, v]) => [k, Array.isArray(v) ? v.map(one) : one(v)]),
  ) as unknown as Anchors;
};

/** Extremos de un conjunto de figuras, separando puntos sobre curva y de control. */
export const extents = (
  shapes: Shape[],
): { onCurve: { min: number; max: number }; control: { min: number; max: number } } => {
  const gather = (key: 'onCurve' | 'control') => shapes.flatMap((s) => s[key] ?? []);
  const range = (points: Point[]) =>
    points.reduce(
      (acc, p) => ({
        min: Math.min(acc.min, p.x, p.y),
        max: Math.max(acc.max, p.x, p.y),
      }),
      { min: Infinity, max: -Infinity },
    );
  return { onCurve: range(gather('onCurve')), control: range(gather('control')) };
};
