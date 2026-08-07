/**
 * Rutas del repositorio. Un solo sitio donde se sabe donde esta cada cosa,
 * para que scripts y tests no repitan `new URL('../../..')`.
 */
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

export const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

export const paths = {
  root: ROOT,
  tokens: join(ROOT, 'packages/core/design-tokens.json'),
  icons: join(ROOT, 'packages/core/src/icons'),
  svg: join(ROOT, 'packages/core/svg'),
  sprite: join(ROOT, 'packages/sprite/sprite.svg'),
  manifest: join(ROOT, 'packages/docs/manifest.json'),
  css: join(ROOT, 'packages/css/avivet-icons.css'),
  react: join(ROOT, 'packages/react/src'),
  vue: join(ROOT, 'packages/vue/src'),
  website: join(ROOT, 'website'),
  sketch: join(ROOT, '.sketch'),
} as const;

export default paths;
