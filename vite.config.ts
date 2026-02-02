import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: "PurpleSchool",
      short_name: "PurpleSchool",
      description: "AI learning platform",
      theme_color: "#7c3aed",
      icons: [
        {
          src: "/vite.svg",
          sizes: "192x192",
          type: "image/svg+xml",
        },
        {
          src: "/vite.svg",
          sizes: "512x512",
          type: "image/svg+xml",
        },
      ],
    },
    workbox: {
      runtimeCaching: [

        // 1. Cache API requests - NETWORK FIRST
        {
          urlPattern: ({ url }) =>
            url.origin.includes("purpleshoolserver.onrender.com"),
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60, // 1 hour
            },
          },
        },

        // 2. Cache JS and CSS - CACHE FIRST
        {
          urlPattern: ({ request }) =>
            request.destination === "script" ||
            request.destination === "style",
          handler: "CacheFirst",
          options: {
            cacheName: "assets-cache",
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },

        // 3. Cache images - CACHE FIRST
        {
          urlPattern: ({ request }) =>
            request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "images-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
          },
        },

        // 4. Cache fonts - CACHE FIRST
        {
          urlPattern: ({ request }) =>
            request.destination === "font",
          handler: "CacheFirst",
          options: {
            cacheName: "fonts-cache",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
          },
        },

        // 5. Cache page navigations (React routes)
        {
          urlPattern: ({ request }) =>
            request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            cacheName: "pages-cache",
          },
        },
      ],
    }

  }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },



})
