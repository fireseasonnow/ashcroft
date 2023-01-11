import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api': {
           target: 'https://query2.finance.yahoo.com',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, ""),  
       }
    }
  }
})
