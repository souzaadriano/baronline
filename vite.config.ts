import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['**/src/core/**'],
    exclude: ['**/node_modules/**', '**/src/infra/**'],
  },
});
