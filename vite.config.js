import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base:'/smarthosp-quest/',
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
