import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [dts({ tsconfigPath: './tsconfig.json', entryRoot: 'src' })],
  esbuild: { jsx: 'automatic' },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: { external: ['react', 'react/jsx-runtime'] },
    target: 'es2022',
    sourcemap: true,
    minify: false,
  },
});
