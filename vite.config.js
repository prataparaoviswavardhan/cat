import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built site work from any GitHub Pages sub-path
// (https://yourname.github.io/your-repo/) without further configuration.
export default defineConfig({
  plugins: [react()],
  base: './',
})
