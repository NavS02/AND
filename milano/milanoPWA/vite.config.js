import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Museo Diocesano di Milano",
        short_name: "Museo Diocesano",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",

        icons: [
          {
            src: "/MuseoDiocesano_CMYK (3).jpg",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      filename: "service-worker.js",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://www.directusmilano.ambientinarratividigitali.it/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        https: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
