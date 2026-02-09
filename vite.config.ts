import { defineConfig } from "vite";

export default defineConfig({
  base: "/linear-transform-visualizer/",
  build: {
    outDir: "docs",
    emptyOutDir: true
  }
});
