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
        target: "https://xn--e1afagnzcbch.com",
        changeOrigin: true,
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
