/**
 * El emisor: Shape[] -> SVG. Es el UNICO lugar del proyecto donde los tokens de
 * presentacion se convierten en atributos. Cambiar stroke.width aqui no cambia
 * nada; cambiarlo en design-tokens.json lo cambia todo (ICON_SPEC.md §3, §10).
 */
import tokens from './tokens.mjs';

const { canvas, stroke, fill, eye } = tokens;

/** Atributos de presentacion de la raiz <svg>, derivados de los tokens. */
export const rootAttrs = ({ size = canvas.size, jsx = false } = {}) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: size,
  height: size,
  viewBox: `0 0 ${canvas.size} ${canvas.size}`,
  fill,
  stroke: stroke.color,
  [jsx ? 'strokeWidth' : 'stroke-width']: stroke.width,
  [jsx ? 'strokeLinecap' : 'stroke-linecap']: stroke.linecap,
  [jsx ? 'strokeLinejoin' : 'stroke-linejoin']: stroke.linejoin,
});

export const attrsToString = (attrs) =>
  Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');

/** Una figura -> un elemento SVG. El relleno solo existe para el ojo. */
export const shapeToSvg = (s) => {
  if (s.tag === 'path') return `<path d="${s.d}"/>`;
  if (s.tag === 'circle') {
    const solid = s.solid ? ` fill="${eye.fill}" stroke="none"` : '';
    return `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}"${solid}/>`;
  }
  throw new Error(`emisor: figura desconocida "${s.tag}"`);
};

/** Cuerpo del icono: solo geometria, sin presentacion ni <g> decorativos. */
export const body = (shapes) => shapes.map(shapeToSvg).join('');

/** Archivo .svg completo, con <title> para lectores de pantalla (§12). */
export const svgFile = (icon, shapes) =>
  `<svg ${attrsToString({ ...rootAttrs(), role: 'img' })}>` +
  `<title>${icon.name}</title>` +
  `${body(shapes)}</svg>\n`;

/** Simbolo del sprite. Los unicos id del proyecto viven aqui. */
export const symbol = (icon, shapes) =>
  `<symbol id="${tokens.namespace}-${icon.id}" viewBox="0 0 ${canvas.size} ${canvas.size}">` +
  `<title>${icon.name}</title>${body(shapes)}</symbol>`;

/** Data URI para el CSS de mascaras: el color lo pone background-color. */
export const dataUri = (shapes) => {
  const svg = `<svg ${attrsToString(rootAttrs())}>${body(shapes)}</svg>`
    .replace(new RegExp(stroke.color, 'g'), 'black')
    .replace(/fill="black"/g, `fill="black"`);
  return `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}")`;
};
