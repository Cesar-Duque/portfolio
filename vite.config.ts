import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("scheduler")) return "react"
            if (id.includes("framer-motion")) return "motion"
            if (id.includes("three")) return "three"
            if (id.includes("@phosphor-icons")) return "phosphor"
          }
          return undefined
        },
      },
    },
  },
})
