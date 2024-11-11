import { resolve } from 'path';

import { defineConfig, LibraryFormats } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
    }),
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'build',
    sourcemap: true,

    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es', 'umd'] as LibraryFormats[],

      // @ts-ignore ModuleFormat is 'rollup' package type which is not directly used
      fileName: format => `index.${format}.js`,
    },
  },
});
