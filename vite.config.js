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
        target: "https://skyjacob.com/server",
        changeOrigin: true,
      },
    },
  },
  define: {
    "import.meta.env.VITE_BASE_URL": JSON.stringify(process.env.VITE_BASE_URL),
  },
});
