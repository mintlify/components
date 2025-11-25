import fs from "node:fs/promises";
import path from "node:path";
import postcss, { AtRule, Root } from "postcss";

const LAYER_NAME = "mt-components";
const OUTPUT_FILE_NAME = "styles.nolayered.css";

async function main() {
  const distDir = path.resolve(new URL("..", import.meta.url).pathname, "dist");
  const inputPath = path.join(distDir, "styles.css");
  const outputPath = path.join(distDir, OUTPUT_FILE_NAME);

  const css = await fs.readFile(inputPath, "utf8");

  const result = await postcss([
    (root: Root) => {
      root.walkAtRules("layer", (atRule: AtRule) => {
        const params = (atRule.params || "").trim();
        if (params === LAYER_NAME) {
          atRule.each((node) => {
            root.insertBefore(atRule, node);
          });
          atRule.remove();
        }
      });
    },
  ]).process(css, {
    from: inputPath,
    to: outputPath,
  });

  await fs.writeFile(outputPath, result.css, "utf8");
  console.log(`✅ Generated dist/${OUTPUT_FILE_NAME} (no layer ${LAYER_NAME})`);
}

main().catch((err) => {
  console.error(
    `Failed to generate ${OUTPUT_FILE_NAME} (no layer ${LAYER_NAME})`,
    err
  );
  process.exit(1);
});
