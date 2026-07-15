import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Library build for design-sync: bundles the site's components (incl. the
// import.meta.glob'd markdown content) into one ES module the converter
// can consume. React stays external — the DS bundle provides it.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: '.design-sync/lib-entry.jsx',
      formats: ['es'],
      fileName: () => 'index.es.js',
    },
    outDir: 'dist-ds',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'],
    },
  },
})
