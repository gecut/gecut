import legacy from '@vitejs/plugin-legacy';
import minifyLitTemplates from 'rollup-plugin-minify-html-literals';
import Unfonts from 'unplugin-fonts/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { VitePWA as vitePWA } from 'vite-plugin-pwa';
import viteTsConfigPaths from 'vite-tsconfig-paths';

import project from './project.json';

import type { PluginOption } from 'vite';
import type { ManifestOptions } from 'vite-plugin-pwa';
import type { GenerateSWOptions } from 'workbox-build';

const DIST_PATH = project.targets.build.options.outputPath;

const serviceWorker: Partial<GenerateSWOptions> = {
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  swDest: `${DIST_PATH}/sw.js`,
  globDirectory: DIST_PATH,
  globPatterns: ['**/*.{html,js,css,woff,png,ico,svg,webp}'],
};
const manifestJson: Partial<ManifestOptions> = {
  /* url */
  scope: '/',
  start_url: '/?pwa',

  /* info */
  name: 'Hami PWA',
  short_name: 'Hami',
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
    port: 8010,
    open: true,
  },

  build: {
    outDir: DIST_PATH,
    reportCompressedSize: true,
    sourcemap: true,
    target: ['es2017', 'chrome100', 'firefox100', 'ios15'],
    minify: 'terser',
  },

  plugins: [
    {
      ...minifyLitTemplates(),
      enforce: 'post',
    } as unknown as PluginOption & { enforce: 'post' },

    viteTsConfigPaths({
      root: '../../',
      ignoreConfigErrors: true,
    }),

    Icons({
      autoInstall: true,
      compiler: 'raw',
      defaultStyle: 'display:block;margin:auto;width:100%;height:100%;',
      scale: 1,
    }),

    Unfonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@300',
            defer: true,
          },
        ],
        display: 'swap',
        injectTo: 'head-prepend',
        preconnect: true,
      },
      fontsource: {
        families: ['Vazirmatn'],
      },
    }),

    legacy({
      targets: [
        '>= 0.5% in IR',
        'ChromeAndroid >= 100',
        'Firefox >= 100',
        'iOS >= 15',
      ],
      modernPolyfills: true,
      renderLegacyChunks: false,
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
