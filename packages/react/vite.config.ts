import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readdirSync, statSync } from "fs";
import { join } from "path";

function getComponentEntries() {
  const componentsDir = resolve(__dirname, "src/components");
  const entries: Record<string, string> = {
    index: resolve(__dirname, "src/index.ts"),
  };

  try {
    const items = readdirSync(componentsDir);
    items.forEach((item) => {
      const itemPath = join(componentsDir, item);
      const stat = statSync(itemPath);
      if (stat.isDirectory()) {
        const indexPath = join(itemPath, "index.ts");
        entries[item] = indexPath;
      }
    });
  } catch (e) {
    console.warn("Could not read components directory:", e);
  }

  return entries;
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: getComponentEntries(),
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: false,
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "[name][extname]";
          }
          return assetInfo.name || "";
        },
      },
    },
    sourcemap: false,
    minify: "esbuild",
    cssCodeSplit: true,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
