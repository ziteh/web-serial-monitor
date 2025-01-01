import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { version } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_NAME__: JSON.stringify("Web Serial Monitor"),
    __APP_VERSION__: JSON.stringify(version),
  },
});
