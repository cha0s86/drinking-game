import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

// "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "preview": "vite preview",
//     "tauri": "tauri"
//   },