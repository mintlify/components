import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      outDir: "dist",
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: (id) => {
        return !id.startsWith(".") && !id.startsWith("/");
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return "assets/[name][extname]";

          if (assetInfo.name.endsWith(".css")) {
            return "[name][extname]";
          }

          return assetInfo.name || "assets/[name][extname]";
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
  },
});
