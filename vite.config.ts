import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "404.html",
          dest: "",
        },
      ],
    }),
    // visualizer({
    //   filename: "./dist/stats.html",
    //   // open: true, // Automatically opens the stats in the browser
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "model-viewer": ["@google/model-viewer"],
        },
      },
    },
  },
});
