/**
 * @avivet/icons — superficie publica del paquete core.
 *
 * Lo que se exporta aqui es contrato: cambiarlo es una version major
 * (ICON_SPEC.md §14). Lo que no aparece aqui es interno y puede moverse.
 */

// El vocabulario del sistema.
export type * from './types.ts';

// Los valores de presentacion.
export { tokens, default as designTokens } from './tokens.ts';

// El lapiz y el modelo de figura.
export { pen, draw, circleShape, place, extents, round, CENTER, FACING } from './geometry.ts';

// El Lego.
export * from './components/index.ts';

// El emisor y el registro: los usan el build, los tests y cualquier
// herramienta que quiera generar SVG desde las recetas.
export { rootAttrs, attrsToString, shapeToSvg, body, svgFile, symbol, dataUri } from './emit.ts';
export { loadIcons, checkMetadata, pascal, CATEGORIES, ICONS_DIR } from './registry.ts';
export { paths, ROOT } from './paths.ts';
