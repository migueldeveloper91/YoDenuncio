import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "192.168.0.14", // ← Permite acceso externo desde emuladores/dispositivos
    port: 3000, // ← Puerto fijo (recomendado para Capacitor)
    strictPort: true, // ← Si el puerto está ocupado, Vite no buscará otro
  },
});
