import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Honor a PORT env var when provided (e.g. preview harness), else 5173.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    open: true,
  },
});
