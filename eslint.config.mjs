// ESLint v9 flat config (ultra strict) for monorepo
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import promise from 'eslint-plugin-promise';
import security from 'eslint-plugin-security';
import regexp from 'eslint-plugin-regexp';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: [
      '**/*.md',
      'EasyDocs/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/out/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      unicorn,
      'jsx-a11y': jsxA11y,
      promise,
      security,
      regexp,
      '@next/next': nextPlugin,
    },
    rules: {
      // Next.js
      '@next/next/core-web-vitals': 'error',
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      // Imports
      'import/no-default-export': 'off', // enabled for app components via override below
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }],
      'import/no-duplicates': 'error',
      'import/export': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "ExportAllDeclaration",
          message: "Do not use `export *`; export named symbols explicitly.",
        },
      ],
      // General
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'eqeqeq': ['error', 'smart'],
      'curly': ['error', 'all'],
      'object-shorthand': ['error', 'always'],
      // Unicorn
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^page\\.tsx$', '^layout\\.tsx$', '^route\\.ts$', '^not-found\\.tsx$'] }],
      // A11y
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-static-element-interactions': 'warn',
      // Promises
      'promise/always-return': 'off',
      'promise/no-nesting': 'warn',
      // Security
      'security/detect-object-injection': 'off',
      // RegExp
      'regexp/no-super-linear-backtracking': 'error',
    },
  },
  {
    files: ['apps/web/src/app/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': 'error',
    },
  },
  {
    files: ['**/*.{config,setup}.{js,ts,cjs,mjs}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];

