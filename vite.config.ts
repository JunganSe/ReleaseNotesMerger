import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true // auto-open browser on `npm run dev`
    },
    preview: {
        open: true // auto-open browser on `npm run preview`
    }
})
