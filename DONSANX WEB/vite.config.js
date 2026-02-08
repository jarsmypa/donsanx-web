import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimizaciones de velocidad
    minify: 'esbuild', // Minificador rápido de Vite
    // Code splitting avanzado
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion'],
          'icons': ['lucide-react'],
        }
      }
    },
    // Reduce size limit warnings
    chunkSizeWarningLimit: 500,
    // Source maps solo en desarrollo
    sourcemap: false,
  },
  // Optimizaciones de desarrollo
  server: {
    middlewareMode: false,
  }
})
