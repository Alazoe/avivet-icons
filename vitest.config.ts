import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@avivet/icons': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
    },
  },
  test: {
    root,
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    // Los tests leen los artefactos que acaba de escribir el build; en paralelo
    // se pisarian entre si al recorrer el mismo arbol.
    fileParallelism: false,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      include: ['packages/core/src/**/*.ts'],
      exclude: ['packages/core/src/icons/**'],
      reportsDirectory: './coverage',
    },
  },
});
