import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["pewa-frontend.onrender.com"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["sockjs-client"],
  },
});
