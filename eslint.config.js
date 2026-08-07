import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/**
 * Reglas propias de una biblioteca de iconos, ademas de las recomendadas.
 * Las tres primeras hacen cumplir el ADN de ICON_SPEC.md desde el linter, no
 * solo desde los tests: el error se ve mientras se escribe.
 */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'packages/core/svg/**',
      'packages/react/src/**',
      'packages/vue/src/**',
      'packages/sprite/sprite.svg',
      'website/icons.js',
      '.sketch/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      eqeqeq: ['error', 'smart'],
      'no-console': 'off',
    },
  },

  {
    // El ADN grafico, aplicado al codigo fuente de los dibujos.
    files: ['packages/core/src/components/**/*.ts', 'packages/core/src/icons/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'Color literal prohibido: los iconos usan currentColor (ICON_SPEC.md §3).',
        },
        {
          selector: "Literal[value='currentColor']",
          message:
            'No escribas currentColor a mano: sale de design-tokens.json via el emisor (ICON_SPEC.md §3).',
        },
        // Nota: se probo una tercera regla que prohibia el literal 2 en los
        // dibujos, para que el grosor saliera siempre del token. Es
        // inaplicable: un selector de AST no distingue un 2 de grosor de un
        // `width / 2` de geometria. Esa garantia la da el test §3 de
        // system.test.ts, que comprueba que el grosor EMITIDO sale del token.
      ],
    },
  },

  {
    // El sitio corre en el navegador: no comparte globals con Node.
    files: ['website/**/*.js', 'examples/**/*.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        fetch: 'readonly',
      },
    },
  },

  {
    files: ['scripts/**/*.ts', 'tests/**/*.ts', '*.config.ts', '*.config.js'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
);
