import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Santa Maria della Strada",
        short_name: "Santa Maria della Strada",
        description: "APP Santa Maria della Strada",
        theme_color: "#ffffff",
        start_url: "/app/#/",
        scope: "/app/",
        display: "standalone",
        orientation: "any",
        dir: "auto",
        lang: "it",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/directusmatrice\.vidimus\.it\/assets\/.*$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "directus-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 1, // 1 giorno
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
