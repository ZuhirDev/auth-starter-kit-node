import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@user": path.resolve(__dirname, "./src/modules/user"),
      "@auth": path.resolve(__dirname, "./src/modules/auth"),
      "@error": path.resolve(__dirname, "./src/modules/error"),
      "@landing": path.resolve(__dirname, "./src/modules/landing"),
    },
  },
});
