import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
      { find: '@contants', replacement: path.resolve(__dirname, 'src/contants') },
      { find: '@locales', replacement: path.resolve(__dirname, 'src/locales') },
      { find: '@redux', replacement: path.resolve(__dirname, 'src/redux') },
      { find: '@services', replacement: path.resolve(__dirname, 'src/services') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      format: {
        beautify: true,
      },
      compress: {
        passes: 3,
      },
    },
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
