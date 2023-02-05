import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    host: env.HOST || '0.0.0.0',
    preview: {
      port: Number(env.PORT || 4173),
      strictPort: true,
    },
    build: {
      emptyOutDir: true,
  },
  }
})
