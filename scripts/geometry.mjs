/**
 * El lapiz y el modelo de figura. Ver ICON_SPEC.md §4.2–4.4.
 *
 * Los componentes NO escriben cadenas de trayectoria: dibujan con `pen`, en
 * coordenadas relativas a su ancla. El lapiz traslada, escala, redondea a
 * `tokens.precision` y registra los puntos para que los tests puedan comprobar
 * el area viva sin volver a parsear el SVG.
 */
import tokens from './tokens.mjs';

const { precision } = tokens;

export const round = (n) => Number(n.toFixed(precision));

/** Centro del lienzo: origen por defecto de la geometria de un ave. */
export const CENTER = Object.freeze({ x: tokens.canvas.size / 2, y: tokens.canvas.size / 2 });

/**
 * pen({ at, scale }) — lapiz de trayectorias.
 * Comandos absolutos respecto del ancla: M, L, H, V, C, Q, Z.
 */
export function pen({ at = { x: 0, y: 0 }, scale = 1 } = {}) {
  let d = '';
  let cursor = { x: 0, y: 0 };
  const onCurve = [];
  const control = [];

  const X = (x) => round(at.x + x * scale);
  const Y = (y) => round(at.y + y * scale);
  const on = (x, y) => { cursor = { x, y }; const p = { x: X(x), y: Y(y) }; onCurve.push(p); return p; };
  const ctl = (x, y) => { const p = { x: X(x), y: Y(y) }; control.push(p); return p; };

  const api = {
    M(x, y) { const p = on(x, y); d += `M${p.x} ${p.y}`; return api; },
    L(x, y) { const p = on(x, y); d += `L${p.x} ${p.y}`; return api; },
    H(x) { return api.L(x, cursor.y); },
    V(y) { return api.L(cursor.x, y); },
    C(x1, y1, x2, y2, x, y) {
      const a = ctl(x1, y1); const b = ctl(x2, y2); const p = on(x, y);
      d += `C${a.x} ${a.y} ${b.x} ${b.y} ${p.x} ${p.y}`;
      return api;
    },
    Q(x1, y1, x, y) {
      const a = ctl(x1, y1); const p = on(x, y);
      d += `Q${a.x} ${a.y} ${p.x} ${p.y}`;
      return api;
    },
    Z() { d += 'Z'; return api; },
    /** Continua la trayectoria con otro tramo de contorno. Ver §4.5. */
    add(segment) { segment(api); return api; },
    d() { return d; },
    shape() { return { tag: 'path', d, onCurve, control }; },
  };
  return api;
}

/** Atajo: dibuja y devuelve una unica figura de trayectoria. */
export const draw = (opts, commands) => {
  const p = pen(opts);
  commands(p);
  return p.shape();
};

/** Circulo. `solid: true` lo marca como la unica forma rellena (el ojo). */
export const circleShape = ({ at, r, solid = false }) => ({
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

/** Convierte anclas relativas al origen en anclas absolutas de lienzo. */
export const place = (origin, anchors, scale = 1) => {
  const one = (a) => ({ x: round(origin.x + a.x * scale), y: round(origin.y + a.y * scale) });
  return Object.fromEntries(Object.entries(anchors).map(
    ([k, v]) => [k, Array.isArray(v) ? v.map(one) : one(v)]
  ));
};

/** Extremos de un conjunto de figuras, separando puntos sobre curva y de control. */
export const extents = (shapes) => {
  const gather = (key) => shapes.flatMap((s) => s[key] ?? []);
  const range = (points) => points.reduce(
    (acc, p) => ({
      min: Math.min(acc.min, p.x, p.y),
      max: Math.max(acc.max, p.x, p.y),
    }),
    { min: Infinity, max: -Infinity }
  );
  return { onCurve: range(gather('onCurve')), control: range(gather('control')) };
};
