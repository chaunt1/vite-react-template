import path from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const isProdMode = process.env.NODE_ENV === 'production';

export const aliases = {
  '@': path.resolve(__dirname, 'src'),
  '@providers': path.resolve(__dirname, 'src/providers'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@config': path.resolve(__dirname, 'src/config'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@layout': path.resolve(__dirname, 'src/layout'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@redux': path.resolve(__dirname, 'src/redux'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@styles': path.resolve(__dirname, 'src/styles'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '/^~/': '',
};

export default defineConfig({
  server: {
    host: '0.0.0.0',
    open: true,
    port: 8080,
  },
  preview: {
    open: true,
    port: 80,
  },
  envPrefix: 'chaunt',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.json'],
    alias: aliases,
  },
  build: {
    sourcemap: !isProdMode,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            'react',
            'react-dom',
            'react-i18next',
            'react-redux',
            'react-resize-detector',
            'react-router-dom',
            'redux-first-history',
          ],
          vendor: [
            'axios',
            'history',
            'i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
            'js-cookie',
            'lodash',
          ],
          // else: use index.[id].js
        },
      },
    },
    terserOptions: {
      format: {
        beautify: false,
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
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp|svg)$/i,
    }),
    VitePWA({
      mode: isProdMode ? 'production' : 'development',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      outDir: 'dist',
      devOptions: {
        enabled: false,
        type: 'module',
      },
      injectManifest: {
        swDest: 'dist/sw.js',
      },
      manifest: {
        name: 'ABS Invest',
        short_name: 'ABS',
        prefer_related_applications: true,

        related_applications: [
          {
            platform: 'play',
            url: 'https://play.google.com/store/apps/details?id=vn.abs.app',
          },
          {
            platform: 'itunes',
            url: 'https://apps.apple.com/vn/app/abs-invest/id1633376332',
          },
        ],
      },
    }),
  ],
});
