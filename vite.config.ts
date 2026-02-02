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

  }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },



})
