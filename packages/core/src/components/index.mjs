/**
 * EL LEGO — catalogo de componentes de AviVet Icons.
 * Documentado en ICON_SPEC.md §5. Una receta solo puede importar desde aqui.
 */

// Contorno: tramos que se encadenan en un unico <path> cerrado.
export { default as head } from './head.mjs';
export { default as body } from './body.mjs';
export { default as neck } from './neck.mjs';
export { default as silhouette } from './silhouette.mjs';

// Anatomia aviar.
export { default as eye } from './eye.mjs';
export { default as beak } from './beak.mjs';
export { default as comb } from './comb.mjs';
export { default as wattle } from './wattle.mjs';
export { default as wing } from './wing.mjs';
export { default as tail } from './tail.mjs';
export { default as leg } from './leg.mjs';
export { default as foot } from './foot.mjs';

// Formas genericas.
export { default as egg, widthOf as eggWidth } from './egg.mjs';
export { default as drop } from './drop.mjs';
export { default as arrow } from './arrow.mjs';
export { default as check } from './check.mjs';
export { default as cross } from './cross.mjs';
export { default as warning } from './warning.mjs';
export { default as circle } from './circle.mjs';
export { default as rectangle } from './rectangle.mjs';

// Geometria propia de un icono (ICON_SPEC.md §4.6, regla de las dos apariciones).
export { pen, draw, circleShape, CENTER } from '../../../../scripts/geometry.mjs';
