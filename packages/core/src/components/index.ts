/**
 * EL LEGO — catalogo de componentes de AviVet Icons.
 * Documentado en ICON_SPEC.md §5. Una receta solo puede importar desde aqui.
 */

// Contorno: tramos que se encadenan en un unico <path> cerrado.
export { default as head } from './head.ts';
export { default as body } from './body.ts';
export { default as neck } from './neck.ts';
export { default as silhouette } from './silhouette.ts';

// Anatomia aviar.
export { default as eye } from './eye.ts';
export { default as beak } from './beak.ts';
export { default as comb } from './comb.ts';
export { default as wattle } from './wattle.ts';
export { default as wing } from './wing.ts';
export { default as tail } from './tail.ts';
export { default as leg } from './leg.ts';
export { default as foot } from './foot.ts';

// Formas genericas.
export { default as egg, widthOf as eggWidth } from './egg.ts';
export { default as drop } from './drop.ts';
export { default as arrow } from './arrow.ts';
export { default as check } from './check.ts';
export { default as cross } from './cross.ts';
export { default as warning } from './warning.ts';
export { default as circle } from './circle.ts';
export { default as rectangle } from './rectangle.ts';

// Geometria propia de un icono (ICON_SPEC.md §4.6, regla de las dos apariciones).
export { pen, draw, circleShape, CENTER, FACING } from '../geometry.ts';
