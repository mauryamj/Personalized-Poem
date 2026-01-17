import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mongo-ecyxiqevg-mauryas-projects-f2e2c192.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
