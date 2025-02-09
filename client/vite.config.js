// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      overlay: false // Disable the error overlay
    }
  },
  build: {
    sourcemap: false, // Disable sourcemaps in development
    minify: false // Disable minification in development
  }
})