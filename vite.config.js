import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',  // Custom domain - use root path
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js into its own chunk
          three: ['three'],
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          // Animation libraries
          animations: ['gsap', 'canvas-confetti']
        }
      }
    },
    // Increase chunk warning limit since Three.js is large
    chunkSizeWarningLimit: 300
  }
})
