/**
 * El emisor: Shape[] -> SVG. Es el UNICO lugar del proyecto donde los tokens de
 * presentacion se convierten en atributos. Cambiar stroke.width aqui no cambia
 * nada; cambiarlo en design-tokens.json lo cambia todo (ICON_SPEC.md §3, §10).
 */
import tokens from './tokens.ts';
import type { IconRecipe, Shape } from './types.ts';

const { canvas, stroke, fill, eye } = tokens;

/** Atributos de presentacion de la raiz <svg>, derivados de los tokens. */
export const rootAttrs = ({
  size = canvas.size,
  jsx = false,
}: { size?: number | string; jsx?: boolean } = {}): Record<string, string | number> => ({
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

export const attrsToString = (attrs: Record<string, string | number>): string =>
  Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

/** Una figura -> un elemento SVG. El relleno solo existe para el ojo. */
export const shapeToSvg = (s: Shape): string => {
  if (s.tag === 'path') return `<path d="${s.d}"/>`;
  const solid = s.solid ? ` fill="${eye.fill}" stroke="none"` : '';
  return `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}"${solid}/>`;
};

/** Cuerpo del icono: solo geometria, sin presentacion ni <g> decorativos. */
export const body = (shapes: Shape[]): string => shapes.map(shapeToSvg).join('');

/** Archivo .svg completo, con <title> para lectores de pantalla (§12). */
export const svgFile = (icon: Pick<IconRecipe, 'name'>, shapes: Shape[]): string =>
  `<svg ${attrsToString({ ...rootAttrs(), role: 'img' })}>` +
  `<title>${icon.name}</title>` +
  `${body(shapes)}</svg>\n`;

/** Simbolo del sprite. Los unicos id del proyecto viven aqui. */
export const symbol = (icon: Pick<IconRecipe, 'id' | 'name'>, shapes: Shape[]): string =>
  `<symbol id="${tokens.namespace}-${icon.id}" viewBox="0 0 ${canvas.size} ${canvas.size}">` +
  `<title>${icon.name}</title>${body(shapes)}</symbol>`;

/** Data URI para el CSS de mascaras: el color lo pone background-color. */
export const dataUri = (shapes: Shape[]): string => {
  const svg = `<svg ${attrsToString(rootAttrs())}>${body(shapes)}</svg>`.replace(
    new RegExp(stroke.color, 'g'),
    'black',
  );
  return `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}")`;
};
