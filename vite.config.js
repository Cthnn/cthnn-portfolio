import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  publicDir: 'assets', // This will copy the entire assets folder to the dist folder
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});