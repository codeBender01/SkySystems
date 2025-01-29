import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://38.180.251.193",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/server/api"),
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
