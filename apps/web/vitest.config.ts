import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
    globals: true,
    coverage: {
      enabled: false,
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
});
