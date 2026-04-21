import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
