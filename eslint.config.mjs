// eslint.config.mjs
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'] },

  // Next.js plugin + "core-web-vitals" rules (applies to all files)
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // JS files (no TS project needed)
  { files: ['**/*.{js,mjs,cjs,jsx}'], rules: {} },

  // TS files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: import.meta.dirname },
    },
    plugins: { '@typescript-eslint': tsPlugin, import: importPlugin, 'react-hooks': reactHooks },
    rules: {
      'no-unused-vars': 'off',
      // Hooks called conditionally break React; missing effect deps cause stale-state bugs.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
      // `@/…` path aliases are our own code ("internal" group in import/order).
      'import/internal-regex': '^@/',
    },
  },

  // Turn off rules that conflict with Prettier formatting
  eslintConfigPrettier,
];
