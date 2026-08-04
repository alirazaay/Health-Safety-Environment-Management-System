import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
      plugins: [react()],
      resolve: {
            alias: {
<<<<<<< HEAD
                  '@cbl/auth': path.resolve(__dirname, '../../packages/auth/src'),
                  '@cbl/api': path.resolve(__dirname, '../../packages/api/src'),
                  '@cbl/ui': path.resolve(__dirname, '../../packages/ui'),
=======
      '@cbl/auth': path.resolve(__dirname, '../../packages/auth/src/index.tsx'),
      '@cbl/api': path.resolve(__dirname, '../../packages/api/src/index.ts'),
      '@cbl/ui': path.resolve(__dirname, '../../packages/ui/src/index.tsx'),
      '@cbl/ui/': path.resolve(__dirname, '../../packages/ui/'),
    },
  },
})
