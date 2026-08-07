import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';

/**
 * Build de biblioteca de @avivet/icons. Sin bundling de dependencias: svgo es
 * herramienta de build, no algo que deba viajar al consumidor.
 */
export default defineConfig({
  plugins: [dts({ tsconfigPath: './tsconfig.json', entryRoot: 'src' })],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: { external: ['svgo', /^node:/] },
    target: 'es2022',
    sourcemap: true,
    minify: false,
  },
});
