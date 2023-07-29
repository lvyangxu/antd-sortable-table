import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: './',
    root: 'test',
    plugins: [react()],
    build: {
        rollupOptions: {
            input: ['./test/main.tsx', './test/index.html'],
        },
        outDir: '../docs',
    },
})
