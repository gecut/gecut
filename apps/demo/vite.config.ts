import viteTsConfigPaths from 'vite-tsconfig-paths';
import Unfonts from 'unplugin-fonts/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { VitePWA as vitePWA } from 'vite-plugin-pwa';

import project from './project.json';

import type { ManifestOptions } from 'vite-plugin-pwa';
import type { GenerateSWOptions } from 'workbox-build';

const DIST_PATH = project.targets.build.options.outputPath;

const serviceWorker: Partial<GenerateSWOptions> = {
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  swDest: `${DIST_PATH}/sw.js`,
  globDirectory: DIST_PATH,
  globPatterns: ['**/*.{html,js,css,woff,png,ico,svg}'],
};
const manifestJson: Partial<ManifestOptions> = {
  /* url */
  scope: '/',
  start_url: '/?pwa',

  /* info */
  name: 'Demo PWA',
  short_name: 'Demo',
  description: '',

  /* screen */
  display: 'fullscreen',
  orientation: 'portrait',

  /* theming */
  theme_color: '#fff',
  background_color: '#fff',

  /* icons */
  icons: [
    {
      src: '/icon-192-maskable.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'maskable',
    },
    {
      src: '/icon-512-maskable.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'maskable',
    },
    { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
  ],
};

export default defineConfig({
  server: {
    hmr: true,
    open: true,
    host: '0.0.0.0',
    port: 8081,
    fs: {
      allow: ['..', '../../node_modules/'],
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 8080,
    https: true,
    open: true,
  },

  build: {
    outDir: DIST_PATH,
    reportCompressedSize: true,
  },

  plugins: [
    viteTsConfigPaths({
      root: '../../',
      ignoreConfigErrors: true,
      parseNative: true,
    }),

    Icons({
      autoInstall: true,
      compiler: 'raw',
      defaultStyle: 'display:block;margin:auto;width:100%;height:100%;',
    }),

    Unfonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',

            weights: [400],
          },
          'Vazirmatn',
        ],
      },
    }),

    vitePWA({
      workbox: serviceWorker,
      manifest: manifestJson,
      mode: 'production',
      outDir: DIST_PATH,
      useCredentials: true,
    }),
  ],
});
