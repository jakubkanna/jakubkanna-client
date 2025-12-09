/// <reference types="node" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_URL || "/",
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
  };
});
