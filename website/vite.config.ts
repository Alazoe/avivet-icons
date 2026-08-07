import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

/**
 * El sitio es HTML, CSS y JS sin framework, a proposito: la documentacion de
 * una biblioteca de iconos no deberia envejecer mas rapido que los iconos.
 * Vite esta aqui por el dev server y el hash de assets, no por el bundling.
 */
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
  },
});
