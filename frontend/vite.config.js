import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as process from 'process';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
})