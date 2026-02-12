import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true // auto-open browser on `npm run dev`
    },
    preview: {
        open: true // auto-open browser on `npm run preview`
    },
    base: (process.env.GITHUB_REPOSITORY) // Ensure correct base path for GitHub Pages and local development.
        ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
        : '/',
})
