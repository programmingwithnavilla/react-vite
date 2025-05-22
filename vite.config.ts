import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars from `.env`, `.env.production`, etc.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        include: /\.(jsx|tsx|ts|js)$/, // Optional: customize file matching
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@types': path.resolve(__dirname, 'src/types'),
      },
    },

    server: {
      port: 5173,
      open: true,
      proxy: {
        // Useful for local development APIs
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          // Add global SCSS vars if using Sass
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Create a separate chunk for vendor
              return 'vendor'
            }
          },
        },
      },
    },

    define: {
      // Define global constants
      __APP_ENV__: JSON.stringify(env.MODE),
    },
  }
})
