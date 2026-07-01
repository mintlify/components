// Strips the indentation that leaks in from surrounding JSX/MDX when code is
// passed to a code block as a template literal, e.g.
//
//   <CodeBlock>
//     {`import {
//       a,
//     } from 'pkg';`}
//   </CodeBlock>
//
// In a template literal the first line sits flush against the opening backtick
// while every continuation line carries the JSX indentation. We therefore
// compute the shared indent from the continuation lines only (ignoring blank
// lines) and strip it from them, leaving the first line as-is. Leading and
// trailing blank lines are trimmed.
//
// This is a no-op for correctly-formatted code, which always has at least one
// continuation line back at the base column (a closing brace, a top-level
// statement, etc.), making the shared continuation indent 0. Only blocks where
// every continuation line is indented — the JSX-pollution signature — are
// changed. Indentation is measured in spaces to avoid corrupting mixed
// tab/space input.
//
// Limitation: when the first line is flush against the backtick AND is itself a
// parent of indentation-significant content (e.g. a top-level yaml key whose
// children never return to column 0), the intended first level of nesting is
// indistinguishable from JSX pollution and gets stripped. For such content,
// author with a leading newline so every line carries the shared indent.
//
// Stories for manual verification — paste any of these into
// code-block.stories.tsx and view in Storybook. Each should render with clean,
// author-intended indentation (except the documented limitation case).
//
// // Issue #226: flush first line, brace-terminated continuation lines.
// export const MDXStringChildrenIndentation: Story = {
//   render: () => (
//     <CodeBlock filename="example.ts" language="ts">
//       {`import {
//         a,
//         b,
//       } from 'pkg';
//
//       async function main() {
//         console.log('hello');
//       }`}
//     </CodeBlock>
//   ),
// };
//
// // Leading-newline env vars (no closing bracket).
// export const MDXStringChildrenLeadingNewline: Story = {
//   render: () => (
//     <CodeBlock language="bash">
//       {`
//         CLICKHOUSE_USERNAME=main
//         CLICKHOUSE_FRAGMENT=
//         CLICKHOUSE_IP=123.456.78.90
//       `}
//     </CodeBlock>
//   ),
// };
//
// // Leading-newline yaml — relative nesting is preserved.
// export const MDXStringChildrenYaml: Story = {
//   render: () => (
//     <CodeBlock filename="app.yaml" language="yaml">
//       {`
//         applications:
//           myapp:
//             source:
//               root: "/"
//       `}
//     </CodeBlock>
//   ),
// };
//
// // Deeply nested — the full indentation ladder is preserved.
// export const MDXStringChildrenDeeplyNested: Story = {
//   render: () => (
//     <CodeBlock filename="nested.ts" language="ts">
//       {`function outer() {
//         function middle() {
//           function inner() {
//             return 42;
//           }
//           return inner();
//         }
//         return middle();
//       }`}
//     </CodeBlock>
//   ),
// };
//
// // Limitation: a flush first line that is itself a parent of
// // indentation-significant content loses its first nesting level (myapp ends
// // up flush with applications). Author with a leading newline (see the yaml
// // story above) to avoid this.
// export const MDXStringChildrenFlushParentLimitation: Story = {
//   render: () => (
//     <CodeBlock filename="app.yaml" language="yaml">
//       {`applications:
//         myapp:
//           source:
//             root: "/"`}
//     </CodeBlock>
//   ),
// };
const LEADING_SPACES_REGEX = /^[ ]*/;

export function dedent(code: string): string {
  const lines = code.split("\n");
  if (lines.length <= 1) {
    return code;
  }

  const continuationIndents = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(LEADING_SPACES_REGEX)?.[0].length ?? 0);

  const minIndent = continuationIndents.length
    ? Math.min(...continuationIndents)
    : 0;

  const dedented =
    minIndent > 0
      ? lines.map((line, i) => (i === 0 ? line : line.slice(minIndent)))
      : lines.slice();

  while (dedented.length && dedented[0].trim() === "") {
    dedented.shift();
  }
  while (dedented.length && dedented.at(-1)?.trim() === "") {
    dedented.pop();
  }

  return dedented.join("\n");
}
